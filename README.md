# FuelEU Maritime Compliance Platform

A comprehensive full-stack application designed to manage FuelEU Maritime compliance. This platform enables shipping companies to manage routes, calculate Compliance Balances (CB), and optimize their compliance strategy through banking and pooling mechanisms.

## Project Overview

The **FuelEU Maritime Compliance Platform** is built to address the complex requirements of the FuelEU Maritime regulation. It provides a robust interface for:
- **Route Management**: Tracking voyages and their associated energy consumption.
- **Compliance Calculation**: Automatically calculating GHG intensity and Compliance Balance.
- **Banking**: Managing surplus compliance balances for future use.
- **Pooling**: Grouping ships to offset non-compliance with surplus from others.

## Tech Stack

### Backend
- **Runtime**: [Node.js](https://nodejs.org/) (v18+)
- **Framework**: [Express.js](https://expressjs.com/) - Minimalist web framework.
- **Language**: [TypeScript](https://www.typescriptlang.org/) - For type safety and developer experience.
- **Database**: [PostgreSQL](https://www.postgresql.org/) - Robust relational database.
- **ORM**: [Prisma](https://www.prisma.io/) - Next-generation Node.js and TypeScript ORM.
- **Architecture**: Hexagonal Architecture (Ports & Adapters) for maintainability and testability.

### Frontend
- **Framework**: [React](https://react.dev/) - Library for building user interfaces.
- **Build Tool**: [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework.
- **HTTP Client**: [Axios](https://axios-http.com/) - Promise based HTTP client.

## Project Structure

This project strictly follows **Hexagonal Architecture** (also known as Ports and Adapters) to decouple the core business logic from external concerns.

```
├── backend/
│   ├── src/
│   │   ├── core/           # Domain logic (Entities, Services, Ports)
│   │   ├── adapters/       # Implementation of ports (Controllers, Repositories)
│   │   └── infrastructure/ # Framework configuration (Express, Prisma)
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── core/           # Domain types and interfaces
│   │   ├── adapters/       # UI Components and API clients
│   │   └── ...
│   └── ...
└── ...
```

## Setup & Run

### Prerequisites
- **Node.js**: Version 18 or higher.
- **PostgreSQL**: A running instance of PostgreSQL.
- **Git**: For version control.

### 1. Clone the Repository
```bash
git clone <repository-url>
cd <repository-directory>
```

### 2. Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```

**Configuration:**
Create a `.env` file in the `backend` directory based on the example (if available) or add your database connection string:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/fueleu_db?schema=public"
PORT=3000
```

**Database Migration & Seeding:**
```bash
# Run migrations to create database tables
npx prisma migrate dev --name init

# Seed the database with initial data
npm run prisma:seed
```
*Troubleshooting*: If seeding fails, ensure `ts-node` is installed or try `npx ts-node prisma/seed.ts`.

**Start the Server:**
```bash
npm run dev
```
The backend server will start on `http://localhost:3000`.
<img width="611" height="227" alt="Screenshot 2025-12-04 144504" src="https://github.com/user-attachments/assets/fa06dd5c-ccef-4d34-8f70-38c678b2a9bb" />

### 3. Frontend Setup
Open a new terminal, navigate to the frontend directory, and install dependencies:
```bash
cd frontend
npm install
```

**Start the Application:**
```bash
npm run dev
```
The frontend application will start on `http://localhost:5173` (default Vite port).

## Features

### 1. Route Management
Visualize and manage shipping routes. Set baseline routes to compare performance.
<img width="1405" height="817" alt="Route Management Interface" src="https://github.com/user-attachments/assets/ad8b39f5-2cb3-45ee-a863-7460f05fb4ec" />

### 2. Compliance Comparison
Compare different routes against a baseline to analyze GHG intensity and potential penalties or savings.
<img width="1249" height="895" alt="Comparison Interface" src="https://github.com/user-attachments/assets/3834c1a0-bb61-43cc-afc4-d69c2ef7d4dc" />

### 3. Banking
View your current Compliance Balance and bank surplus for future compliance periods.
<img width="1237" height="911" alt="Banking Interface" src="https://github.com/user-attachments/assets/20ef1cc6-acb0-4721-a6f3-b4fed4389ea7" />

### 4. Pooling
Create and manage pools to reallocate compliance balances between ships, optimizing the fleet's overall standing.
<img width="1249" height="801" alt="Pooling Interface" src="https://github.com/user-attachments/assets/53e1a129-98f8-4e8a-a7ef-a8bf79884663" />

## AI Agent Workflow
This project was accelerated using AI agents. See [AGENT_WORKFLOW.md](./AGENT_WORKFLOW.md) for a detailed log of the prompts, outputs, and workflows used.

## Credits
Developed by **Rathod Shanker** (shankerr7780@gmail.com).
