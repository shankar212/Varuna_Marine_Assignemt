# FuelEU Maritime Compliance - Frontend

The frontend application for the FuelEU Maritime Compliance Platform, built with React, TypeScript, and Vite. It features a modern, responsive UI styled with Tailwind CSS.

## Tech Stack
- **React**: Component-based UI library.
- **Vite**: Fast build tool and development server.
- **TypeScript**: Statically typed JavaScript for better developer experience.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **Axios**: For making HTTP requests to the backend.

## Project Structure
- **`src/core`**: Domain types and interfaces shared with the backend concept.
- **`src/adapters`**:
  - **`ui`**: React components organized by feature (Routes, Compare, Banking, Pooling).
  - **`infrastructure`**: API clients and configuration.
- **`src/App.tsx`**: Main application component with tab-based navigation.

## Scripts

| Script | Description |
| :--- | :--- |
| `npm run dev` | Starts the development server at `http://localhost:5173`. |
| `npm run build` | Builds the application for production. |
| `npm run lint` | Runs ESLint to check for code quality issues. |
| `npm run preview` | Previews the production build locally. |

## Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```
