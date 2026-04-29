# Drags Frontend (React + Vite)

This repository contains a React single-page application built with Vite. It provides a customs/border operations dashboard UI with authentication, transport workflows, security camera management, control type management, and schedule management screens.

## Tech stack

- **Build tool:** Vite
- **Frontend framework:** React
- **Routing:** React Router DOM
- **UI library:** React Bootstrap + Bootstrap CSS
- **Icons:** React Icons
- **Styling:** CSS + Sass support
- **Linting:** ESLint (with React hooks and React refresh plugins)

## Dependencies

### Runtime dependencies (`dependencies`)

- `react`: Core UI library for building components.
- `react-dom`: DOM renderer for React apps.
- `react-router-dom`: Client-side routing and navigation.
- `bootstrap`: Base CSS framework for layout/components.
- `react-bootstrap`: React component wrappers for Bootstrap.
- `react-icons`: Icon pack integration for React components.

### Development dependencies (`devDependencies`)

- `vite`: Development server and production bundler.
- `@vitejs/plugin-react`: Official Vite plugin for React.
- `eslint`: Linting engine.
- `@eslint/js`: Base ESLint JavaScript config.
- `eslint-plugin-react-hooks`: Lint rules for React hooks best practices.
- `eslint-plugin-react-refresh`: Lint support for React Fast Refresh patterns.
- `globals`: Shared global variable definitions for lint config.
- `sass`: Sass/SCSS compiler support.
- `@types/react`: Type definitions for React (useful for tooling).
- `@types/react-dom`: Type definitions for React DOM (useful for tooling).

## Requirements

- **Node.js** 20+ (recommended)
- **npm** 10+

## Project setup

```bash
npm install
```

## Run the project

### Start development server

```bash
npm run dev
```

By default, Vite serves the app on `http://localhost:5173`.

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Run lint checks

```bash
npm run lint
```

## API configuration

The frontend expects backend endpoints under `/api/*`.

- **Local development:** Vite proxies `/api` to `http://localhost:5000`.
- **Non-local/deployed env:** define `VITE_API_BASE_URL` in your `.env` file (example: `VITE_API_BASE_URL=http://localhost:5000`).

## Testing (Vitest-ready setup for CI/CD pipeline)

This project now includes starter test files prepared for Vitest usage in a future pipeline rollout.

### Test commands

```bash
npm run test
```

- Runs Vitest when it is available.
- Falls back to Node.js smoke tests when Vitest is not installed in restricted environments.

```bash
npm run test:vitest
```

- Forces Vitest execution (for CI/pipeline environments where dependencies are installed).

### Included test files

- `src/test/App.test.jsx` (Vitest + Testing Library UI test)
- `src/test/setupTests.js` (jest-dom setup for Vitest)
- `tests/smoke.test.js` (Node.js fallback smoke test)

### Notes

- If your environment blocks npm registry access, use `npm run test` fallback locally and run `npm run test:vitest` in CI or an unrestricted environment.

## Suggested CI pipeline steps

1. `npm ci`
2. `npm run lint`
3. `npm run test`
4. `npm run build`

## Repository structure (high level)

- `src/` application source code
- `public/` static assets
- `vite.config.js` Vite config (includes `/api` proxy)
- `eslint.config.js` lint configuration
