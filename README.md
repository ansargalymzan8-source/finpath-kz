# FinPath KZ

## Run locally

Requires Node.js 22.13 or newer. Run `npm start`; the default address is `http://localhost:8766/`. Set `PORT` or `HOST` to override the listener.

## Accounts and saved data

Accounts use SQLite and server-side sessions. Passwords are stored as salted scrypt hashes, not as plain text. On Windows, the database defaults to `%LOCALAPPDATA%\FinPath KZ\finpath.sqlite`; set `FINPATH_DATA_DIR` to choose another data directory. Keep this directory outside the web root.

For a public deployment, use HTTPS and configure `FINPATH_DATA_DIR` to point to persistent storage so accounts survive restarts or redeployments. Account profile details and onboarding answers are stored on the server. Portfolio entries, goal amounts, academy progress, and notes remain in that user's browser and are not synchronized across devices.
