# Fuze Dashboard

> A React-based admin dashboard framework that ships as both a **web app** and a **desktop app (Electron)** from a single codebase.

![Version](https://img.shields.io/badge/version-2.0.0-blue)
![React](https://img.shields.io/badge/React-19-61DAFB)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3)
![Vite](https://img.shields.io/badge/Vite-6-646CFF)
![Electron](https://img.shields.io/badge/Electron-42-47848F)
![License](https://img.shields.io/badge/license-private-lightgrey)

---

## What is this?

**Fuze Dashboard** (Fuze Project) is a front-end starter and demo admin panel built with React. It provides reusable UI patterns you can deploy to the browser or package as a native desktop app with Electron.

The app includes:

- **Authentication flow** — splash screen, login, and session handling via local storage
- **Dashboard home** — charts (AmCharts), data tables, calendar, stats cards, and modals
- **Bootstrap demos** — tabs, tables (simple, paginated, inline actions), forms (simple, validated, wizard), layouts, and modals/alerts
- **Sample applications** — a CRUD TODO list backed by REST-style API calls, and a nested application module pattern
- **Shared elements** — toast notifications, context menus, data-driven forms (Formik + Yup), and remote/local data tables (react-table)

Navigation is driven by a collapsible sidebar. The header shows breadcrumbs for nested sections. State is managed globally with Redux Toolkit so any module can dispatch alerts, load content, or handle auth.

---

## Architecture

One repo. One `src/`. Two build targets.

```
Dashboard-ReactJS/
├── electron/
│   ├── main.js          # Electron main process
│   └── preload.js       # Secure IPC bridge (contextBridge)
├── public/              # Static assets (favicon, manifest, etc.)
├── src/
│   ├── main.jsx         # React entry point (createRoot)
│   ├── index.css        # Global base styles
│   └── app/
│       ├── App.js       # Root layout, routing, global toast listener
│       ├── Store.js     # Redux Toolkit store
│       ├── components/  # Feature screens and UI modules
│       ├── reducers/    # Redux reducers (plain objects)
│       └── lib/         # Auth, HTTP, action types, mock data
├── index.html           # Vite HTML shell
├── vite.config.js
└── package.json
```

**Web:** Vite dev server or a static `dist/` build.

**Desktop:** Electron loads the Vite dev URL in development, or the built `dist/index.html` in production.

---

## Tech Stack

| Area | Libraries |
|------|-----------|
| **Core** | React 19, React DOM 19, React Router v6 |
| **State** | Redux Toolkit, react-redux |
| **UI** | Bootstrap 5.3, React Bootstrap 2.x, MUI Icons |
| **Forms** | Formik, Yup, react-bootstrap-typeahead |
| **Tables** | react-table v7 |
| **Charts / Maps** | AmCharts 4, amcharts4-geodata |
| **Calendar** | react-calendar |
| **HTTP** | Axios, axios-mock-adapter |
| **Build** | Vite 6 |
| **Desktop** | Electron 42, electron-builder |

---

## What's New in v2.0

This release modernizes the core stack for React 19 and Bootstrap 5 compatibility.

### Dependencies

| Before | After |
|--------|-------|
| React 18 | **React 19** |
| react-bootstrap 1.x (Bootstrap 4 API) | **react-bootstrap 2.x** (Bootstrap 5) |
| React Router v5 | **React Router v6** |
| redux + redux-thunk | **Redux Toolkit** |
| Immutable.js reducers | **Plain object reducers** |
| @material-ui/icons v4 | **@mui/icons-material** |
| react-bootstrap-typeahead 3.x | **6.x** |

### Removed

- `@material-ui/core`, `@material-ui/icons`
- `redux`, `redux-thunk`
- `immutable`
- `react-burger-menu` (unused)

### Code changes

- **Routing** — `<Route component={...}>` and `<Redirect>` replaced with `<Routes>`, `<Route element={...}>`, and `<Navigate>`
- **Redux** — `createStore` + thunk replaced with `configureStore`; all reducers use plain objects instead of `Immutable.Map`
- **React Bootstrap 2** — `Badge variant` → `Badge bg`, `Form.Row` → `Row`, `Form.Control as="select"` → `Form.Select`, Accordion API updated, Toast wrapped in `ToastContainer`
- **Bootstrap 5 utilities** — `pull-left/right`, `float-left/right`, `mr-*`, `ml-*`, `pl-*`, `pr-*` migrated to `float-start/end`, `me-*`, `ms-*`, `pe-*`, `ps-*`
- **React 19** — removed deprecated `componentWillUpdate`; `store.subscribe` moved to `componentDidMount` with cleanup in `componentWillUnmount`
- **react-table** — `key` extracted from spread props (`getHeaderProps`, `getCellProps`, etc.) for React 19 compatibility

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Setup

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd Dashboard-ReactJS
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   Open [http://localhost:5173](http://localhost:5173).

### Default login (demo)

The login form is pre-filled for local development:

- **Email:** `test_user@gmail.com`
- **Password:** `admin1234`

---

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Vite dev server at `localhost:5173` (web) |
| `npm run build` | Production web build → `dist/` |
| `npm run preview` | Preview the production web build locally |
| `npm run electron:dev` | Run Vite + Electron together with hot reload |
| `npm run electron:build` | Package the desktop app → `electron-dist/` |

---

## How It Works

### Web

```bash
npm run dev
# Vite serves at http://localhost:5173
```

```bash
npm run build
# Vite bundles to dist/ (ready to deploy)
```

### Electron (Desktop)

```bash
npm run electron:dev
# Starts Vite, waits for it, then opens Electron loading localhost:5173
# Hot reload works in the renderer (React)
```

```bash
npm run electron:build
# Builds the web bundle, then packages a native desktop app
# Output: electron-dist/ (.dmg on Mac, .exe on Windows, .AppImage on Linux)
```

---

## Project Structure (components)

| Path | Purpose |
|------|---------|
| `src/app/components/Dashboard/` | Main shell; switches modules by sidebar state |
| `src/app/components/Home/` | Dashboard home (charts, tables, calendar) |
| `src/app/components/Login/` | Auth screen |
| `src/app/components/Splash/` | App init / token check |
| `src/app/components/SideBarMenu/` | Icon sidebar + expandable submenus |
| `src/app/components/Header/` | Top nav and breadcrumbs |
| `src/app/components/TodoList/` | Sample CRUD app |
| `src/app/components/Bootstrap/` | Bootstrap UI demos (tables, forms, tabs, modals) |
| `src/app/components/Elements/` | Reusable pieces (Alert, DataTable, Chart, Forms) |
| `src/app/reducers/` | Redux reducers per feature |
| `src/app/lib/` | `AppAuth`, `AppHttp`, `AppActionTypes`, mock data |

---

## Related

| Repo | Description |
|------|-------------|
| **Dashboard-ReactJS** (this repo) | Unified web + desktop Fuze Dashboard |
