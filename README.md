# Fuze Framework

> React-based admin dashboard framework — runs as a **Web app** and a **Desktop app (Electron)** from a single codebase.

![Version](https://img.shields.io/badge/version-2.0.0-blue)
![React](https://img.shields.io/badge/React-18-61DAFB)
![Vite](https://img.shields.io/badge/Vite-6-646CFF)
![Electron](https://img.shields.io/badge/Electron-35-47848F)
![License](https://img.shields.io/badge/license-private-lightgrey)

---

## Architecture

One repo. One `src/`. Two build targets.

```
Dashboard-ReactJS-Web/
├── electron/
│   ├── main.js          # Electron main process
│   └── preload.js       # Secure IPC bridge (contextBridge)
├── public/              # Static assets (favicon, manifest, etc.)
├── src/
│   ├── main.jsx         # React 18 entry point (createRoot)
│   ├── index.css        # Global base styles
│   └── app/             # App source — git submodule (Dashboard-ReactJS)
│       ├── App.js
│       ├── Store.js
│       ├── App.css
│       ├── AppOverride.css
│       ├── components/
│       ├── reducers/
│       └── lib/
├── index.html           # Vite entry template
├── vite.config.js       # Vite configuration
└── package.json
```

The `src/app` directory is a **git submodule** pointing to `git@github.com:jovanjay/Dashboard-ReactJS.git`. It contains all UI components, routes, Redux store, and business logic.

---

## Tech Stack

- **Core:** React 18, Redux + redux-thunk, Immutable.js, React Router v6
- **UI:** Material UI v4, Bootstrap 5, React Bootstrap, react-burger-menu
- **Data / Forms:** react-table v7, Formik + Yup, react-calendar, react-bootstrap-typeahead
- **Charts / Maps:** AmCharts 4 + amcharts4-geodata
- **HTTP:** Axios + axios-mock-adapter
- **Build:** Vite 6
- **Desktop:** Electron 35 + electron-builder

---

## Getting Started

### Prerequisites

- Node.js v18+
- npm

### Setup

1. Clone the repo with submodules:
   ```bash
   git clone --recurse-submodules <repo-url>
   cd Dashboard-ReactJS-Web
   ```

   Or, if you've already cloned without submodules:
   ```bash
   git submodule update --init --recursive
   ```

2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

---

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start Vite dev server at `localhost:5173` (web) |
| `npm run build` | Production web build → `dist/` |
| `npm run preview` | Preview the production web build locally |
| `npm run electron:dev` | Run Vite + Electron together with hot reload |
| `npm run electron:build` | Package the desktop app → `electron-dist/` |

---

## How it works

### Web

```bash
npm run dev
# → Vite serves at http://localhost:5173
```

```bash
npm run build
# → Vite bundles to dist/ (ready to deploy)
```

### Electron (Desktop)

```bash
npm run electron:dev
# → Starts Vite, waits for it, then opens Electron loading localhost:5173
# → Hot reload works in both the renderer (React) and main process
```

```bash
npm run electron:build
# → Builds the web bundle first, then packages it into a native desktop app
# → Output: electron-dist/ (.dmg on Mac, .exe on Windows, .AppImage on Linux)
```

---

## Updating the App Submodule

The `src/app` submodule is an independent git repo. To pull the latest changes:

```bash
git submodule update --remote src/app
git add src/app
git commit -m "Update src/app to latest"
```

---

## Related

| Repo | Description |
|---|---|
| **Dashboard-ReactJS-Web** (this repo) | Unified web + desktop shell |
| **Dashboard-ReactJS** | Shared app source (`src/app` submodule) |
