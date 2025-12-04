# FuelEU Maritime Compliance - Backend

The backend service for the FuelEU Maritime Compliance Platform, built with Node.js, Express, and TypeScript. It uses a Hexagonal Architecture to separate domain logic from infrastructure.

## Features
- **RESTful API**: Endpoints for managing routes, compliance balances, and pools.
- **Database Integration**: PostgreSQL database access via Prisma ORM.
- **Domain Logic**: Encapsulated business rules for GHG intensity calculations and banking/pooling operations.

## Architecture
The backend is structured using **Hexagonal Architecture**:
- **`src/core`**: Contains the domain entities and business logic (Services).
- **`src/adapters`**: Contains the implementation of ports (Controllers, Repositories).
- **`src/infrastructure`**: Contains framework-specific configuration (Express app, Prisma client).

## API Endpoints

### Routes
- `GET /routes`: Retrieve all routes.
- `POST /routes`: Create a new route.
- `GET /routes/:id`: Get a specific route.

### Compliance
- `GET /compliance`: Get compliance balance for a ship/period.
- `POST /compliance/calculate`: Trigger calculation of compliance balance.

### Banking
- `POST /banking/bank`: Bank surplus compliance balance.
- `GET /banking/balance`: Get current banked balance.

### Pooling
- `POST /pools`: Create a new pool.
- `POST /pools/join`: Add a ship to a pool.
- `GET /pools/:id`: Get pool details.

## Database Schema
Key entities managed by Prisma:
- **Route**: Represents a voyage with distance, fuel consumption, etc.
- **ComplianceBalance**: Tracks the compliance status (surplus/deficit) for a ship.
- **Pool**: Represents a group of ships pooling their compliance balances.

## Scripts

| Script | Description |
| :--- | :--- |
| `npm run dev` | Starts the development server with hot-reloading (nodemon). |
| `npm run build` | Compiles TypeScript code to JavaScript. |
| `npm test` | Runs tests (currently a placeholder). |
| `npx prisma migrate dev` | Applies database migrations. |
| `npm run prisma:seed` | Seeds the database with initial data. |

## Environment Variables
Create a `.env` file in the root of the `backend` directory:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/fueleu_db?schema=public"
PORT=3000
```
