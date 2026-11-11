const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { URL } = require('node:url');

const port = Number(process.env.PORT || 8766);
const root = __dirname;
const allowedSymbols = new Set(['TSLA', 'AAPL', 'NVDA', 'GC=F', '^GSPC', '^NDX', 'BTC-USD', 'EURUSD=X', 'USDKZT=X']);
const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8'
};

function send(response, status, body, contentType = 'text/plain; charset=utf-8') {
  response.writeHead(status, { 'Content-Type': contentType, 'Cache-Control': 'no-store' });
  response.end(body);
}

async function handleMarket(request, response, requestUrl) {
  const symbol = requestUrl.searchParams.get('symbol');
  const range = requestUrl.searchParams.get('range');
  const interval = requestUrl.searchParams.get('interval');
  if (!allowedSymbols.has(symbol) || !['10y', '2y'].includes(range) || !['1mo', '1d'].includes(interval)) {
    send(response, 400, JSON.stringify({ error: 'Нарық деректерінің параметрлері жарамсыз.' }), 'application/json; charset=utf-8');
    return;
  }

  const upstreamUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?range=${range}&interval=${interval}&events=history`;
  try {
    const upstream = await fetch(upstreamUrl, { headers: { 'User-Agent': 'FinPath-KZ/1.0' } });
    const body = await upstream.text();
    send(response, upstream.status, body, 'application/json; charset=utf-8');
  } catch (error) {
    send(response, 502, JSON.stringify({ error: `Нарық деректерін алу мүмкін болмады: ${error.message}` }), 'application/json; charset=utf-8');
  }
}

const server = http.createServer((request, response) => {
  const requestUrl = new URL(request.url, `http://${request.headers.host}`);
  if (requestUrl.pathname === '/api/market') {
    handleMarket(request, response, requestUrl);
    return;
  }
  const requestedPath = requestUrl.pathname === '/' ? '/index.html' : requestUrl.pathname;
  const filePath = path.resolve(root, `.${requestedPath}`);
  if (!filePath.startsWith(root + path.sep)) {
    send(response, 403, 'Forbidden');
    return;
  }
  fs.readFile(filePath, (error, content) => {
    if (error) {
      send(response, error.code === 'ENOENT' ? 404 : 500, error.code === 'ENOENT' ? 'Not found' : error.message);
      return;
    }
    send(response, 200, content, contentTypes[path.extname(filePath)] || 'application/octet-stream');
  });
});

const host = process.env.HOST || '0.0.0.0';
server.listen(port, host, () => {
  console.log(`FinPath KZ server listening on ${host}:${port}`);
});
