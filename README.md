# FuelEU Maritime Compliance Platform

A full-stack application for managing FuelEU Maritime compliance, featuring Route management, Compliance Balance (CB) calculation, Banking, and Pooling.

## Architecture

This project follows a **Hexagonal Architecture** (Ports & Adapters) to ensure separation of concerns and testability.

### Backend (`/backend`)
- **Core**: Domain entities (`Route`, `ComplianceBalance`, `Pool`) and business logic services.
- **Ports**: Interfaces for repositories (`RouteRepository`, etc.).
- **Adapters**:
  - **Inbound**: Express.js controllers (`RoutesController`, etc.).
  - **Outbound**: PostgreSQL repositories using Prisma.
- **Infrastructure**: Express server setup and Prisma client.

### Frontend (`/frontend`)
- **Core**: Domain types and API interfaces.
- **Adapters**:
  - **Infrastructure**: Axios API client.
  - **UI**: React components organized by feature tabs.
- **Tech Stack**: React, TypeScript, TailwindCSS.

## Setup & Run

### Prerequisites
- Node.js (v18+)
- PostgreSQL

### Backend Setup
1. Navigate to `backend`:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure `.env`:
   Ensure `DATABASE_URL` points to your PostgreSQL instance.
4. Run Migrations & Seed Data:
   ```bash
   npx prisma migrate dev --name init
   npm run prisma:seed
   ```
   *(Note: If `npm run prisma:seed` fails, try `npx ts-node prisma/seed.ts`)*
5. Start Server:
   ```bash
   npm run dev
   ```
   Server runs on `http://localhost:3000`.
<img width="611" height="227" alt="image" src="https://github.com/user-attachments/assets/6ea0f6f1-0858-4395-93de-d123a5f048fa" />

### Frontend Setup
1. Navigate to `frontend`:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start Dev Server:
   ```bash
   npm run dev
   ```
   App runs on `http://localhost:5173`.

## Features

1. **Routes Tab**: View route data, set baseline route.
  <img width="1851" height="792" alt="image" src="https://github.com/user-attachments/assets/383968fc-7b7d-4558-9400-25d31823c0ac" />

2. **Compare Tab**: Compare routes against the selected baseline (GHG intensity).
   <img width="1871" height="807" alt="image" src="https://github.com/user-attachments/assets/8a875b75-6ac2-4d07-bdeb-b1ee66bcc61c" />

3. **Banking Tab**: View Compliance Balance, bank surplus.
 <img width="1859" height="784" alt="image" src="https://github.com/user-attachments/assets/443e164f-858e-4a95-82e7-54d65735cceb" />
  
4. **Pooling Tab**: Create pools, view reallocation of compliance balances.
<img width="1879" height="778" alt="image" src="https://github.com/user-attachments/assets/ddebe187-3dc3-4367-98b1-0e6bd2e5f93e" />


## Testing

- **Backend**: `npm test` (Placeholder)
- **Frontend**: Manual verification via UI.

## AI Agent Usage

See `AGENT_WORKFLOW.md` for details on how AI agents were used in this project.

## Credits

Done by Rathod Shanker , email:shankerr7780@gmail.com
