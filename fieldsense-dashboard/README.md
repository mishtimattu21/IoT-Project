# FieldSense Dashboard

FieldSense is a smart irrigation and farm monitoring web dashboard built with React, TypeScript, Vite, and Tailwind CSS.  
It helps monitor soil and weather-related conditions in real time, visualize trends, review alerts, and support data-driven irrigation decisions.

## Key Features

- Real-time sensor simulation for:
  - Soil moisture
  - Temperature
  - Humidity
  - Pump status
- Live monitoring dashboard with:
  - Status cards and health indicators
  - Auto-updating trend charts
  - Irrigation control panel
  - Smart alerts feed
- Analytics workspace with:
  - Time-period filtering (day/week/month)
  - Historical trend visualization
  - AI-generated summary report
- Modular architecture with reusable UI components and route-based pages.

## Tech Stack

- **Frontend:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS + shadcn/ui patterns
- **Charts:** Recharts
- **Routing:** React Router
- **State/Data Utilities:** TanStack React Query (available), React hooks
- **Testing:** Vitest, Testing Library, Playwright

## Project Structure

```text
fieldsense-dashboard/
  src/
    components/        # Reusable UI and navigation components
    hooks/             # Shared hooks
    lib/               # Mock data, helpers, utilities
    pages/             # Route pages (Dashboard, Analytics, etc.)
    main.tsx           # App bootstrap
    App.tsx            # Router and layout shell
  public/              # Static assets
  index.html           # App metadata and root HTML
  vite.config.ts       # Vite configuration
  playwright.config.ts # Playwright end-to-end config
```

## Getting Started

### 1) Prerequisites

- Node.js 18+ (recommended Node.js 20 LTS)
- npm 9+

### 2) Install Dependencies

```bash
npm install
```

### 3) Run the Development Server

```bash
npm run dev
```

The app runs on `http://localhost:8080`.

### 4) Build for Production

```bash
npm run build
```

### 5) Preview Production Build

```bash
npm run preview
```

### 6) Lint the Codebase

```bash
npm run lint
```

### 7) Run Unit Tests

```bash
npm run test
```

## Available Scripts

- `npm run dev` - Start Vite dev server
- `npm run build` - Generate production build
- `npm run build:dev` - Build with development mode
- `npm run preview` - Preview built output locally
- `npm run lint` - Run ESLint
- `npm run test` - Run Vitest tests once
- `npm run test:watch` - Run Vitest in watch mode

## Configuration Notes

- `vite.config.ts` defines:
  - local dev server host/port
  - path aliases (e.g., `@` -> `src`)
  - React SWC plugin integration
- `index.html` contains SEO/social metadata and app title.
- `playwright.config.ts` is prepared for browser E2E tests with `baseURL` set to `http://localhost:8080`.

## Current Data Source

The current dashboard uses mocked/generated sensor data from `src/lib`.  
To connect real IoT hardware or cloud telemetry:

1. Replace mock generators with API calls or MQTT/WebSocket streams.
2. Add environment-specific endpoints using Vite env vars (`.env`).
3. Normalize incoming sensor payloads in a single data access layer.
4. Keep UI components presentational and data-source agnostic.

## Recommended Next Improvements

- Integrate real field sensor feeds
- Add authentication and role-based access
- Add persistent storage for historical records
- Export analytics reports as real downloadable PDF/CSV
- Add alert acknowledgment/workflow states
- Add CI checks for lint, test, and build

## Troubleshooting

- **Port 8080 already in use**  
  Change the port in `vite.config.ts` or stop the conflicting process.

- **Dependency install errors**  
  Clear lockfile and reinstall:
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```

- **Type or lint failures**  
  Run `npm run lint` and fix reported issues first before building.

## License

This project currently has no explicit license file.  
Add a `LICENSE` file before public distribution.
