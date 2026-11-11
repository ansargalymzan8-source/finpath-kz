# FinPath KZ

## GitHub Pages

The site and its local browser accounts work as static files; no account API, Node.js host, or backend database is needed. Publish `index.html`, `styles.css`, and `script.js` to GitHub Pages and open the HTTPS Pages URL.

Accounts, password hashes, portfolios, goals, academy progress, and notes are stored in that browser's local storage. They do not sync to another device or browser. Clearing site data removes them. Passwords are hashed in the browser, but this is not server-side authentication and should not be used to protect sensitive information.

## Optional local server

Requires Node.js 18 or newer. Run `npm start`; the default address is `http://localhost:8766/`. The optional server serves the website and proxies market-data requests. Browser accounts do not depend on this server.
