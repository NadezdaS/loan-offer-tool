# Loan Offer Tool

This is a monorepo full-stack application that allows users to enter their personal and loan-related details through a form and get a result as a list of loan offers from multiple lenders based on the submitted details.
<br />
### 🧰 Tech Stack
- <b>Frontend</b>: React, Vite, TypeScript, Cypress
- <b>Backend</b>: Node.js, Express, TypeScript, Jest
- <b>Data storage</b>: in-memory Array stores the data while application is running
<br />

## ✨ Prerequisites

- `Node.js` (v18+ recommended)
- `npm`, `yarn`, or `pnpm` as your package manager
<br />

## 📦 Install Dependencies

Run the following from the root to install dependencies for both frontend and backend:

```bash
# Using npm workspaces (recommended)
npm install

# OR manually install in each subfolder
cd ./client && npm install
cd ./server && npm install
```
<br />

## 🚀 Running the App
### Start the backend
```bash
cd server
npm run dev
```
Runs the backend on: http://localhost:8080

### Start the front-end
```bash
cd client
npm run dev
```
Runs the frontend on: http://localhost:5173 (Vite default)

```Make sure the frontend is configured to talk to the backend (e.g., via a proxy or VITE_API_URL in .env).```

<br />


## 🧪 Running Tests

### Unit tests
run from the root folder
```bash
npm test
```
### E2E with Cypress
```bash
cd client
npx cypress open --config-file cypress.config.mts
```
<br />

## 📁 Environment Variables
You can configure environment variables in:

- ```client/.env – for Vite (use VITE_ prefix)```
- ```server/.env – for Node.js```

<br />

## 📦 Build for Production
```bash
# Build backend
cd server
npm run build
```

```bash
# Build frontend
cd client
npm run build
```
