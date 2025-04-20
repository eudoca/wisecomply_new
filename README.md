# WiseComply - Incorporated Society Compliance Management

## Overview

WiseComply is a web application designed to assist incorporated societies in New Zealand with managing their compliance obligations and generating/updating their constitutions in line with the Incorporated Societies Act 2022. It provides guided workflows and tools to streamline administrative tasks.

## Tech Stack

*   **Framework:** React
*   **Build Tool:** Vite
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS
*   **UI Components:** shadcn/ui
*   **Routing:** React Router DOM
*   **State Management:** React Context API (likely, based on usage in Constitution Wizard) / Local Component State (`useState`)

## Project Structure

```
wisecomply_new/
├── public/             # Static assets
├── src/
│   ├── assets/         # Images, fonts, etc.
│   ├── components/     # Reusable UI components & feature components
│   │   ├── compliance/   # Components for compliance activities feature
│   │   │   └── activities/ # Components for individual compliance steps
│   │   ├── constitution/ # Components for constitution wizard feature
│   │   │   └── blocks/     # Components for individual constitution blocks
│   │   ├── disputes/     # Components for disputes management feature
│   │   ├── officers/     # Components for officer management feature
│   │   ├── ui/           # Core UI components (likely shadcn/ui based)
│   │   └── wizard/       # Shared components for wizard interfaces
│   ├── hooks/          # Custom React hooks (if any)
│   ├── layouts/        # Layout components (e.g., MainAppLayout)
│   ├── lib/            # Utility functions or libraries
│   ├── pages/          # Top-level page components mapped to routes
│   ├── types/          # TypeScript type definitions (e.g., dispute types)
│   ├── utils/          # Utility functions (e.g., cn for classnames)
│   ├── App.tsx         # Main application component (routing setup)
│   ├── index.css       # Global CSS and Tailwind directives
│   └── main.tsx        # Application entry point
├── .eslintrc.cjs       # ESLint configuration
├── index.html          # HTML entry point for Vite
├── package.json        # Project dependencies and scripts
├── postcss.config.js   # PostCSS configuration (for Tailwind)
├── tailwind.config.js  # Tailwind CSS configuration
├── tsconfig.json       # TypeScript configuration
└── vite.config.ts      # Vite configuration
```

## Core Features / Pages

The application is structured around several key features accessible via routing:

1.  **Dashboard:** (Assumed home page) Provides an overview or entry point to other features.
2.  **Compliance Activities:** A guided, multi-step process (likely using `src/components/compliance/activities/`) to walk users through various compliance tasks.
3.  **Constitution Wizard:** A multi-block wizard (`src/components/constitution/blocks/`) allowing users to generate or update their society's constitution based on guided inputs.
4.  **Disputes Management:** Functionality for logging, tracking, and managing disputes within the society (`src/components/disputes/`).
5.  **Officer Management:** Tools for managing committee members/officers, potentially including eligibility checks and contact details (`src/components/officers/`).
6.  **Settings:** (Assumed) Configuration options for the society or application.

## Key Component Areas

*   **`components/ui`:** Contains foundational UI elements like `Button`, `Input`, `Select`, `RadioGroup`, `Checkbox`, `Tooltip`, `Badge`, `Calendar`, `Popover`, `Textarea`, `Label` used throughout the application. Built using `shadcn/ui`.
*   **`components/wizard`:** Provides reusable components tailored for multi-step wizard interfaces, such as `RadioGroup`, `Alert`, `InfoBox`.
*   **`components/compliance/activities`:** Houses individual components for each step of the compliance workflow (e.g., `Step1Planning`, `Step2Committee`, `Step3ContactPerson`).
*   **`components/constitution/blocks`:** Contains components for each section/block of the constitution wizard (e.g., `Block1Foundation`, `Block3Committee`, `Block8Finances`). These components manage local state and validation for their respective sections.
*   **`components/disputes`:** Includes components for displaying dispute lists (`DisputesList`), viewing case details (`CaseDetails`), and adding new cases (`AddDisputeForm`).
*   **`components/officers`:** (Assumed based on navigation links) Components for listing, adding, or editing officer details.
*   **`layouts`:** Defines the overall page structure, potentially including sidebars, headers, and content areas.
*   **`pages`:** Top-level components rendered by the router for each main section of the application.

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/eudoca/wisecomply_new.git
    cd wisecomply_new
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    This will start the Vite development server, typically available at `http://localhost:5173` (or the next available port).

## Contributing

(Add contribution guidelines if applicable)

## License

(Add license information if applicable) 