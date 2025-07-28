# Fake Backend

This is a simple Node.js backend using Express. It provides hardcoded endpoints for `/users` and `/accounts`.

## Usage

1. Install dependencies:
   ```sh
   npm install
   ```
2. Install nodemon:
   ```sh
   npm install -g nodemon # or using yarn: yarn global add nodemon
   ```
3. Start the server:
   ```sh
   nodemon ./index.js 3000    
   ```
4. Endpoints:
   - `POST /api/auth/login` login user
   - `POST /api/auth/logout` logout authentication
   - `GET /api/account-balance` returns customer account balance in dashboard
   - `POS /api/transfer` perform fund transfer

## Notes
- No database is used; all data is hardcoded.
