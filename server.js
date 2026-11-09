const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { DatabaseSync } = require('node:sqlite');
const { URL } = require('node:url');

const port = Number(process.env.PORT || 8766);
const host = process.env.HOST || '0.0.0.0';
const root = __dirname;
const allowedSymbols = new Set(['TSLA', 'AAPL', 'NVDA', 'GC=F', '^GSPC', '^NDX', 'BTC-USD', 'EURUSD=X', 'USDKZT=X']);
const allowedInterests = new Set(['budget', 'learn', 'portfolio', 'goals', 'curious']);
const sessionCookie = 'finpath_session';
const sessionLifetimeSeconds = 60 * 60 * 24 * 30;
const authRateLimit = new Map();
const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8'
};

const dataDirectory = process.env.FINPATH_DATA_DIR || path.join(process.env.LOCALAPPDATA || path.dirname(root), 'FinPath KZ');
fs.mkdirSync(dataDirectory, { recursive: true });
const database = new DatabaseSync(path.join(dataDirectory, 'finpath.sqlite'));
database.exec(`
  PRAGMA journal_mode = WAL;
  PRAGMA foreign_keys = ON;
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    interest TEXT NOT NULL,
    plan TEXT NOT NULL,
    password_salt TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    created_at INTEGER NOT NULL
  );
  CREATE TABLE IF NOT EXISTS sessions (
    token_hash TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    expires_at INTEGER NOT NULL
  );
  CREATE INDEX IF NOT EXISTS sessions_expiration ON sessions(expires_at);
`);

function send(response, status, body, contentType = 'application/json; charset=utf-8', headers = {}) {
  response.writeHead(status, { 'Content-Type': contentType, 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', ...headers });
  response.end(body);
}

function sendJson(response, status, value, headers) {
  send(response, status, JSON.stringify(value), 'application/json; charset=utf-8', headers);
}

function parseCookies(header = '') {
  return Object.fromEntries(header.split(';').map((part) => {
    const separator = part.indexOf('=');
    if (separator < 0) return ['', ''];
    return [part.slice(0, separator).trim(), part.slice(separator + 1).trim()];
  }).filter(([key]) => key));
}

function cookieOptions(request, maxAge) {
  const forwardedProtocol = request.headers['x-forwarded-proto']?.split(',')[0].trim();
  const secure = request.socket.encrypted || forwardedProtocol === 'https';
  return `${sessionCookie}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=${maxAge}${secure ? '; Secure' : ''}`;
}

function isSameOrigin(request) {
  const origin = request.headers.origin;
  if (!origin || !request.headers.host) return false;
  try {
    return new URL(origin).host === request.headers.host;
  } catch {
    return false;
  }
}

function isRateLimited(request) {
  const now = Date.now();
  const key = request.socket.remoteAddress || 'unknown';
  const current = authRateLimit.get(key);
  if (!current || now - current.startedAt >= 15 * 60 * 1000) {
    authRateLimit.set(key, { startedAt: now, count: 1 });
    return false;
  }
  current.count += 1;
  return current.count > 20;
}

function readJson(request) {
  return new Promise((resolve, reject) => {
    let body = '';
    let tooLarge = false;
    request.on('data', (chunk) => {
      if (tooLarge) return;
      body += chunk;
      if (body.length > 16 * 1024) tooLarge = true;
    });
    request.on('end', () => {
      if (tooLarge) {
        reject(Object.assign(new Error('Сұрау көлемі тым үлкен.'), { status: 413 }));
        return;
      }
      try {
        resolve(JSON.parse(body));
      } catch {
        reject(Object.assign(new Error('JSON деректері жарамсыз.'), { status: 400 }));
      }
    });
    request.on('error', reject);
  });
}

function passwordHash(password, salt) {
  return new Promise((resolve, reject) => {
    crypto.scrypt(password, salt, 64, (error, derivedKey) => {
      if (error) reject(error);
      else resolve(derivedKey);
    });
  });
}

function publicUser(user) {
  return { id: user.id, username: user.username, name: user.name, interest: user.interest, plan: user.plan };
}

function getSessionUser(request) {
  database.prepare('DELETE FROM sessions WHERE expires_at <= ?').run(Date.now());
  const token = parseCookies(request.headers.cookie)[sessionCookie];
  if (!token || !/^[A-Za-z0-9_-]{40,60}$/.test(token)) return null;
  const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
  const session = database.prepare(`
    SELECT users.id, users.username, users.name, users.interest, users.plan, sessions.expires_at
    FROM sessions JOIN users ON users.id = sessions.user_id
    WHERE sessions.token_hash = ?
  `).get(tokenHash);
  if (!session || session.expires_at <= Date.now()) {
    database.prepare('DELETE FROM sessions WHERE token_hash = ?').run(tokenHash);
    return null;
  }
  return session;
}

function createSession(response, request, userId) {
  const token = crypto.randomBytes(32).toString('base64url');
  const expiresAt = Date.now() + sessionLifetimeSeconds * 1000;
  const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
  database.prepare('INSERT INTO sessions (token_hash, user_id, expires_at) VALUES (?, ?, ?)').run(tokenHash, userId, expiresAt);
  response.setHeader('Set-Cookie', `${sessionCookie}=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${sessionLifetimeSeconds}${request.socket.encrypted || request.headers['x-forwarded-proto']?.split(',')[0].trim() === 'https' ? '; Secure' : ''}`);
}

async function handleAuth(request, response, requestUrl) {
  if (request.method === 'GET' && requestUrl.pathname === '/api/auth/session') {
    const user = getSessionUser(request);
    sendJson(response, 200, { user: user ? publicUser(user) : null });
    return;
  }

  if (request.method !== 'POST' || !['/api/auth/register', '/api/auth/login', '/api/auth/logout'].includes(requestUrl.pathname)) {
    sendJson(response, 404, { error: 'API жолы табылмады.' });
    return;
  }
  if (!isSameOrigin(request)) {
    sendJson(response, 403, { error: 'Сұраудың шығу көзі тексеруден өтпеді.' });
    return;
  }
  if (isRateLimited(request)) {
    sendJson(response, 429, { error: 'Тым көп әрекет жасалды. Біраздан кейін қайталап көріңіз.' }, { 'Retry-After': '900' });
    return;
  }

  if (requestUrl.pathname === '/api/auth/logout') {
    const token = parseCookies(request.headers.cookie)[sessionCookie];
    if (token) {
      const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
      database.prepare('DELETE FROM sessions WHERE token_hash = ?').run(tokenHash);
    }
    sendJson(response, 200, { ok: true }, { 'Set-Cookie': cookieOptions(request, 0) });
    return;
  }

  const body = await readJson(request);
  const username = typeof body.username === 'string' ? body.username.trim().toLowerCase() : '';
  const password = typeof body.password === 'string' ? body.password : '';

  if (requestUrl.pathname === '/api/auth/register') {
    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const interest = typeof body.interest === 'string' ? body.interest : '';
    const plan = typeof body.plan === 'string' ? body.plan.trim() : '';
    if (!name || name.length > 60 || /[\u0000-\u001f\u007f]/.test(name)) {
      sendJson(response, 400, { error: 'Атыңызды 1–60 таңба аралығында енгізіңіз.' });
      return;
    }
    if (!/^[a-z0-9._-]{3,32}$/.test(username)) {
      sendJson(response, 400, { error: 'Логин 3–32 таңбадан тұрып, латын әрпі, сан, нүкте, сызықша немесе _ белгісін қолдануы керек.' });
      return;
    }
    if (password.length < 10 || password.length > 128) {
      sendJson(response, 400, { error: 'Құпиясөз 10–128 таңбадан тұруы керек.' });
      return;
    }
    if (!allowedInterests.has(interest) || plan.length < 5 || plan.length > 1000) {
      sendJson(response, 400, { error: 'Қызығушылығыңызды таңдап, қаржылық мақсатыңызды 5–1000 таңбамен жазыңыз.' });
      return;
    }
    const salt = crypto.randomBytes(16);
    const hash = await passwordHash(password, salt);
    try {
      const result = database.prepare(`
        INSERT INTO users (username, name, interest, plan, password_salt, password_hash, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `).run(username, name, interest, plan, salt.toString('hex'), hash.toString('hex'), Date.now());
      const user = { id: Number(result.lastInsertRowid), username, name, interest, plan };
      createSession(response, request, user.id);
      sendJson(response, 201, { user: publicUser(user) });
    } catch (error) {
      if (error.errcode === 2067) {
        sendJson(response, 409, { error: 'Бұл логин бос емес. Басқа логин таңдаңыз.' });
        return;
      }
      throw error;
    }
    return;
  }

  if (username.length > 32 || password.length > 128) {
    sendJson(response, 400, { error: 'Логин немесе құпиясөз жарамсыз.' });
    return;
  }
  const user = database.prepare('SELECT * FROM users WHERE username = ?').get(username);
  const salt = user ? Buffer.from(user.password_salt, 'hex') : Buffer.alloc(16);
  const expectedHash = user ? Buffer.from(user.password_hash, 'hex') : Buffer.alloc(64);
  const actualHash = await passwordHash(password, salt);
  if (!user || !crypto.timingSafeEqual(actualHash, expectedHash)) {
    sendJson(response, 401, { error: 'Логин немесе құпиясөз қате.' });
    return;
  }
  createSession(response, request, user.id);
  sendJson(response, 200, { user: publicUser(user) });
}

async function handleMarket(request, response, requestUrl) {
  const symbol = requestUrl.searchParams.get('symbol');
  const range = requestUrl.searchParams.get('range');
  const interval = requestUrl.searchParams.get('interval');
  if (!allowedSymbols.has(symbol) || !['10y', '2y'].includes(range) || !['1mo', '1d'].includes(interval)) {
    sendJson(response, 400, { error: 'Нарық деректерінің параметрлері жарамсыз.' });
    return;
  }

  const upstreamUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?range=${range}&interval=${interval}&events=history`;
  try {
    const upstream = await fetch(upstreamUrl, { headers: { 'User-Agent': 'FinPath-KZ/1.0' } });
    const body = await upstream.text();
    send(response, upstream.status, body, 'application/json; charset=utf-8');
  } catch (error) {
    sendJson(response, 502, { error: `Нарық деректерін алу мүмкін болмады: ${error.message}` });
  }
}

async function handleRequest(request, response) {
  const requestUrl = new URL(request.url, `http://${request.headers.host || 'localhost'}`);
  if (requestUrl.pathname.startsWith('/api/auth/')) {
    await handleAuth(request, response, requestUrl);
    return;
  }
  if (requestUrl.pathname === '/api/market') {
    await handleMarket(request, response, requestUrl);
    return;
  }

  const requestedPath = requestUrl.pathname === '/' ? '/index.html' : requestUrl.pathname;
  const filePath = path.resolve(root, `.${requestedPath}`);
  if (!filePath.startsWith(root + path.sep)) {
    send(response, 403, 'Forbidden', 'text/plain; charset=utf-8');
    return;
  }
  fs.readFile(filePath, (error, content) => {
    if (error) {
      send(response, error.code === 'ENOENT' ? 404 : 500, error.code === 'ENOENT' ? 'Not found' : error.message, 'text/plain; charset=utf-8');
      return;
    }
    send(response, 200, content, contentTypes[path.extname(filePath)] || 'application/octet-stream');
  });
}

const server = http.createServer((request, response) => {
  handleRequest(request, response).catch((error) => {
    console.error('Request failed:', error);
    if (!response.headersSent) sendJson(response, error.status || 500, { error: error.status ? error.message : 'Сервер қатесі орын алды.' });
    else response.destroy(error);
  });
});

server.listen(port, host, () => {
  console.log(`FinPath KZ server listening on ${host}:${port}`);
});
