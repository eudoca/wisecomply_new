# WiseComply Dashboard

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) <!-- [Placeholder: Update license if different] -->

## Overview

WiseComply is a web application designed to help New Zealand Non-Profits and Incorporated Societies manage their compliance requirements. It provides features like intelligent document generation (Constitution Wizard), role management (Officers), dispute/complaint tracking, and compliance activity monitoring.

This README provides instructions for setting up the development environment, understanding the project structure, and contributing to the codebase, with a focus on helping new developers get started quickly.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Cloning the Repository](#cloning-the-repository)
  - [Environment Variables](#environment-variables)
  - [Installing Dependencies](#installing-dependencies)
- [Running the Application](#running-the-application)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Architecture Overview](#architecture-overview)
  - [Frontend](#frontend)
  - [Backend](#backend)
  - [API Communication](#api-communication)
- [API Documentation](#api-documentation)
- [Database](#database)
- [UI Components](#ui-components)
- [Environment Variables Details](#environment-variables-details)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
  - [Branching Strategy](#branching-strategy)
  - [Pull Requests](#pull-requests)
  - [Coding Standards](#coding-standards)
- [License](#license)

## Features

*   User Authentication (Login/Registration - Implied)
*   Compliance Dashboard Overview
*   Constitution Wizard (Multi-step form for document generation)
*   Officer Management (Add, View, Edit Officers)
*   Dispute & Complaint Management (Add, View, Track Cases)
*   Compliance Activity Tracking (Multi-step workflows)
*   Membership Management (Implied)
*   Settings Management (Implied)

## Tech Stack

*   **Frontend:**
    *   Framework: React (`v18.x`)
    *   Language: TypeScript (`v5.x`)
    *   Build Tool: Vite (`v5.x`)
    *   Routing: React Router DOM (`v6.x`)
    *   Styling: Tailwind CSS (`v3.x`)
    *   UI Components: shadcn/ui (using Radix UI primitives)
    *   State Management: React Context API / Local Component State (or specify global state manager if added)
    *   Form Handling: React Hook Form (`v7.x`) with Zod (`v3.x`) for validation
    *   Icons: Lucide React
*   **Backend:**
    *   Language: `[TODO: Backend Team - Specify Language (e.g., Node.js, Python, Go)]`
    *   Framework: `[TODO: Backend Team - Specify Framework (e.g., Express, NestJS, Flask, Gin)]`
    *   Authentication: `[TODO: Backend Team - Specify Auth strategy (e.g., JWT, OAuth, Session)]`
*   **Database:**
    *   Type: `[TODO: Backend Team - Specify Database (e.g., PostgreSQL, MongoDB, MySQL)]`
    *   ORM/Driver: `[TODO: Backend Team - Specify ORM/Driver (e.g., Prisma, TypeORM, Mongoose, node-postgres)]`
*   **Development Tools:**
    *   Linting: ESLint
    *   Formatting: Prettier

## Prerequisites

Before you begin, ensure you have the following installed on your system:

*   **Node.js:** >= v18.x (LTS recommended). Check with `node -v`.
*   **npm:** (Usually comes with Node.js). Check with `npm -v`. (or Yarn/pnpm if used)
*   **Git:** For version control.
*   `[TODO: Backend Team - Add any backend-specific prerequisites (e.g., Docker, specific database client)]`

## Getting Started

Follow these steps to set up the project locally for development.

### Cloning the Repository

```bash
git clone https://github.com/eudoca/wisecomply_new.git # [Placeholder: Verify repo URL]
cd wisecomply_new
```

### Environment Variables

This project uses environment variables for configuration, especially for connecting to backend services and managing secrets.

1.  **Create an environment file:** Copy the example environment file (if one exists) or create a new one.
    ```bash
    # If .env.example exists:
    cp .env.example .env
    # Otherwise, create an empty file:
    touch .env
    ```
    *Note: The `.env` file is listed in `.gitignore` and should **never** be committed to the repository.*

2.  **Populate `.env`:** Fill in the necessary environment variables in the `.env` file. See the [Environment Variables Details](#environment-variables-details) section below for required variables. You will need values for backend API endpoints, potential database connections (if running backend locally), and any other required secrets. Consult with the backend team for the correct values for your local setup.

### Installing Dependencies

Install the project dependencies using npm:

```bash
npm install
```
*(If the project uses Yarn or pnpm, use `yarn install` or `pnpm install` instead)*

`[TODO: Backend Team - Add steps for setting up the backend service locally, if applicable (e.g., `cd backend && npm install`, database migrations)]`

## Running the Application

To run the frontend development server:

```bash
npm run dev
```

This will start the Vite development server, typically available at `http://localhost:4001` (check the terminal output for the exact URL). The server supports Hot Module Replacement (HMR) for faster development.

`[TODO: Backend Team - Add command(s) to run the backend development server]`

## Available Scripts

The following scripts are available in `package.json`:

*   `npm run dev`: Starts the Vite development server for the frontend.
*   `npm run build`: Builds the production-ready frontend application (outputs to `dist/`).
*   `npm run lint`: Runs ESLint to check for code quality and style issues.
*   `npm run format`: Runs Prettier to automatically format the codebase.
*   `npm run preview`: Serves the production build locally for previewing.

`[TODO: Backend Team - Add relevant backend scripts (e.g., `npm run dev:server`, `npm run db:migrate`)]`

## Project Structure

The frontend codebase is organized within the `src/` directory:

```
src/
├── assets/         # Static assets like images, fonts
├── components/     # Reusable UI and feature-specific components
│   ├── ui/         # Core shared UI components (Button, Card, etc. - shadcn/ui based)
│   ├── constitution/ # Components specific to the Constitution Wizard
│   ├── compliance/   # Components specific to Compliance Activities
│   ├── disputes/     # Components specific to Dispute Management
│   ├── officers/     # Components specific to Officer Management
│   └── ...           # Other feature-specific component directories
├── hooks/          # Custom React hooks
├── layouts/        # Layout components (e.g., MainLayout, AuthLayout)
├── pages/          # Page components corresponding to routes
├── services/       # API service functions for backend communication [Placeholder: Confirm location]
├── types/          # TypeScript type definitions (e.g., officer.d.ts, dispute.d.ts)
├── utils/          # Utility functions (e.g., cn for classnames)
├── App.tsx         # Main application component, sets up routing
└── main.tsx        # Entry point of the application
```

`[TODO: Backend Team - Add description of the backend project structure]`

## Architecture Overview

### Frontend

*   Built with **React** and **TypeScript**, bundled using **Vite**.
*   Uses **Tailwind CSS** for styling, often applied via **shadcn/ui** components.
*   **React Router DOM** handles client-side routing.
*   State is managed primarily through local component state (`useState`, `useReducer`) and potentially React Context for shared state. [Placeholder: Update if a global state manager like Redux/Zustand is used].
*   Forms are managed using **React Hook Form** with **Zod** for robust validation.

### Backend

`[TODO: Backend Team - Describe backend architecture: Framework patterns (MVC, etc.), key modules, how requests are processed, authentication flow, background jobs, etc.]`

### API Communication

*   The frontend interacts with the backend via API calls.
*   `[TODO: Backend Team - Specify API type (e.g., REST, GraphQL)]`
*   `[Placeholder: Describe where API client/service functions are located (e.g., `src/services/`)]`
*   `[Placeholder: Mention base API URL configuration (likely via environment variables)]`

## API Documentation

`[TODO: Backend Team - Provide a link to API documentation (e.g., Swagger/OpenAPI spec, Postman collection) or describe how to access/generate it.]`

## Database

`[TODO: Backend Team - Describe the database schema, key tables/collections, relationships, and how migrations (if any) are handled.]`

## UI Components

This project uses **shadcn/ui** for its core component library. These are unstyled components built using Radix UI primitives and styled with Tailwind CSS.

*   Find the core components in `src/components/ui/`.
*   Refer to the [shadcn/ui documentation](https://ui.shadcn.com/) for component APIs and usage.
*   To add new shadcn/ui components, use their CLI: `npx shadcn-ui@latest add [component-name]`

## Environment Variables Details

The following environment variables are needed in your `.env` file for local development:

| Variable                    | Description                                                                      | Example Value                      | Required |
| :-------------------------- | :------------------------------------------------------------------------------- | :--------------------------------- | :------- |
| `VITE_API_BASE_URL`         | The base URL for the backend API endpoint.                                         | `http://localhost:8000/api`        | Yes      |
| `[TODO: Add Backend Vars]`  | `[E.g., Database connection string, JWT secret, external service API keys, etc.]` | `[Provide realistic examples]`       | `[...]`    |
| `[TODO: Add DB Vars]`       | `[E.g., DATABASE_URL for Prisma/ORM]`                                             | `postgresql://user:pass@host:port/db` | `[...]`    |

*Consult with the team for the appropriate values for your local setup.*

## Testing

`[TODO: Describe the testing strategy: Unit tests, integration tests, end-to-end tests. Specify frameworks (e.g., Jest, Vitest, React Testing Library, Cypress) and how to run tests (e.g., `npm test`).]`

## Deployment

*   The application is automatically deployed from the `master` branch via **Vercel**.
*   Production URL: `[Placeholder: Add production URL]`
*   Staging/Preview URLs are generated by Vercel for pull requests and specific branches.
*   `[TODO: Add any backend deployment details/links if separate]`

## Contributing

Contributions are welcome! Please follow these guidelines:

### Branching Strategy

*   Create feature branches from the `master` branch (or `develop` if used).
*   Use a descriptive naming convention, e.g., `feat/add-dispute-filtering`, `fix/login-button-casing`.

### Pull Requests

*   Ensure your code lints (`npm run lint`) and formats (`npm run format`) correctly before pushing.
*   Create a Pull Request (PR) targeting the `master` branch (or `develop`).
*   Provide a clear description of the changes in the PR.
*   Link any relevant issues.
*   Request review from team members.
*   `[TODO: Add backend-specific contribution points if necessary (e.g., database migrations)]`

### Coding Standards

*   Follow existing code style and patterns.
*   Use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for commit messages (e.g., `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`).
*   Write clear, understandable code with comments where necessary.

## License

`[Placeholder: Specify the project license, e.g., This project is licensed under the MIT License - see the LICENSE file for details.]` 