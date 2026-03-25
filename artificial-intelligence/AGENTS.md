# AGENTS.md

This file is for coding agents working in `/Users/adri/Desktop/Adri/Dev/my-jscamp/artificial-intelligence`.

## Project Shape
- Package manager: `pnpm@10.30.0`
- Workspace file: `pnpm-workspace.yaml`
- Workspace packages: `frontend`, `backend`
- Extra folder: `examples` (standalone Express examples, not part of the workspace)
- Language: JavaScript only; no TypeScript is configured in this repo
- Module system: ESM (`"type": "module"` in app packages)

## Rule Files Scan
- No root `AGENTS.md` existed when this file was created.
- No `.cursorrules`, `.cursor/rules/`, or `.github/copilot-instructions.md` files were found.
- Do not assume hidden agent rules beyond what is written here.

## Install
- Install all dependencies from repo root: `pnpm install`
- Prefer running commands from repo root unless a package-local command is clearer.

## Build Commands
- Root build: `pnpm build`
- What it does: runs the frontend production build only
- Equivalent explicit command: `pnpm --filter @artificial-intelligence/frontend build`
- Frontend local build from package dir: `pnpm build` in `frontend/`
- Backend has no dedicated build step; it runs directly with Node.
- `examples/` also has no build step.

## Dev Commands
- Frontend dev server from root: `pnpm dev:frontend`
- Backend dev server from root: `pnpm dev:backend`
- Frontend dev server from package dir: `pnpm dev`
- Backend dev server from package dir: `pnpm dev`
- Examples app dev server: `pnpm dev` in `examples/`

## Lint Commands
- Frontend lint from root: `pnpm --filter @artificial-intelligence/frontend lint`
- Frontend lint from package dir: `pnpm lint`
- There is no configured backend linter.
- There is no configured formatter command.
- Current lint status: failing as of this scan.
- Known lint failures:
  - `frontend/src/components/Route.jsx`: unused `Component`
  - `frontend/src/context/AuthContext.jsx`: `react-refresh/only-export-components`
- If you touch linted frontend files, try to leave lint cleaner than you found it.

## Test Commands
- Root test: `pnpm test`
- What it does: runs backend tests only
- Equivalent explicit command: `pnpm --filter @artificial-intelligence/backend test`
- Backend test from package dir: `pnpm test`
- Backend watch mode: `pnpm run test:watch`
- Frontend currently has no test runner configured.
- `examples/` currently has no test script.

## Single-Test Commands
- Preferred single test command from `backend/`:
  - `node --test --test-name-pattern "creates a job when payload is valid" app.test.js`
- Equivalent from repo root:
  - `pnpm --filter @artificial-intelligence/backend exec node --test --test-name-pattern "creates a job when payload is valid" app.test.js`
- Run one test file with Node's test runner:
  - `node --test app.test.js`
- The package script uses `node app.test.js`, but for targeted execution prefer `node --test`.
- Match test names exactly or with a distinctive substring.

## Verified Commands
- `pnpm build` succeeds.
- `pnpm --filter @artificial-intelligence/backend test` succeeds.
- `node --test --test-name-pattern "creates a job when payload is valid" app.test.js` succeeds in `backend/`.
- `pnpm --filter @artificial-intelligence/frontend lint` currently fails with the issues listed above.

## Repository Map
- `backend/app.js`: Express app entrypoint
- `backend/routes/`, `backend/controllers/`, `backend/models/`, `backend/schemas/`: API layers
- `backend/app.test.js`: integration-style API tests using `node:test`
- `frontend/src/App.jsx`, `frontend/src/main.jsx`: app bootstrap and routes
- `frontend/src/components/`, `frontend/src/hooks/`, `frontend/src/context/`, `frontend/src/store/`, `frontend/src/pages/`: UI and client state

## General Style
- Follow existing repo style over personal preference.
- Use JavaScript/JSX, not TypeScript, unless the user explicitly asks for TS.
- Use ESM imports/exports everywhere.
- Omit semicolons.
- Use single quotes.
- Use 2-space indentation.
- Keep trailing commas only where the existing file already uses them; do not reformat unrelated code.
- Favor small, direct functions over abstraction-heavy patterns.
- Preserve the repo's current naming and file organization.

## Import Conventions
- Put imports at the top of the file.
- Third-party imports usually come before local imports.
- Local imports are relative, usually with explicit file extensions in backend code.
- Frontend code often imports sibling modules first, then CSS modules nearby.
- Keep import groups compact; a blank line between external and local imports is common.
- Do not introduce path aliases unless the repo is configured for them.

## Naming Conventions
- React components: PascalCase (`JobCard`, `ProfilePage`, `ProtectedRoute`)
- Hooks: `useX` (`useFilters`, `useAISummary`, `useDebounce`)
- Contexts: PascalCase objects (`AuthContext`), provider components in PascalCase
- Stores: exported hook names start with `use` (`useFavoriteStore`)
- Classes: PascalCase (`JobController`, `JobModel`)
- Functions and variables: camelCase
- Constants: upper snake case only for true constants (`PORT`, `BASE_URL`, `RESULTS_PER_PAGE`)
- Route modules export named routers (`jobsRouter`, `aiRouter`)

## Types and Data Shape
- There is no static type checker; rely on Zod schemas and existing payload shapes.
- For backend input validation, extend `backend/schemas/*.js` rather than hand-rolling checks in controllers.
- Keep API response shapes consistent with current routes.
- Existing job payloads include top-level fields plus nested `data` and `content` objects.
- When adding new fields, update validation, model behavior, tests, and frontend consumers together.

## Backend Conventions
- Express handlers usually return early on validation/not-found cases.
- Controllers call model methods and respond with JSON directly.
- Validation is handled in route-local middleware using Zod `safeParse`.
- Invalid request bodies currently return `400` with `{ error, details }` or `{ message }` depending on the route.
- Not-found responses usually return `404` with `{ message: 'Job Not Found' }` or `{ error: 'Job Not Found' }`.
- Keep response codes explicit.
- Prefer simple, readable async functions over abstraction.
- The model layer is in-memory and mutates imported JSON-backed data.
- Avoid introducing database assumptions without a user request.
- Environment variables are used directly via `process.env`.

## Frontend Conventions
- Use functional React components only.
- Use named exports for most components/hooks; `App.jsx` and page files may default-export route pages.
- Routing uses `react-router` imports, not `react-router-dom`.
- Lazy-load route pages in `frontend/src/App.jsx`.
- Styling is a mix of global CSS and CSS Modules.
- Component-scoped styles usually live beside the component as `*.module.css`.
- Keep JSX straightforward; prefer readable props over dense inline logic.
- Use state hooks and effects directly; custom hooks encapsulate repeated behavior.
- Zustand is used for favorites state; React context is used for auth state.

## Error Handling
- Handle expected failure cases explicitly and early.
- In backend routes/controllers, return HTTP errors instead of throwing for common validation or lookup failures.
- In frontend async flows, set/loading clear/error state explicitly.
- Existing frontend code sometimes logs fetch failures with `console.error`; match local patterns unless you are improving the whole flow.
- Do not swallow errors silently.
- If you change an API error shape, update all affected callers and tests.

## Testing Conventions
- Backend tests use Node's built-in `node:test` and `node:assert`.
- Tests are integration-style and hit a real local server via `fetch`.
- Shared test helpers are plain functions in `backend/app.test.js`.
- Test names are sentence-style strings.
- When adding backend behavior, prefer adding or extending integration tests in `backend/app.test.js`.
- Keep tests deterministic and avoid external network dependencies.

## Agent Guidance
- Check whether a change belongs in `frontend/`, `backend/`, or both.
- For backend API changes, review route, controller, schema, model, and test coverage together.
- For frontend changes, check whether CSS Module, hook, store, and route updates are also needed.
- Avoid repo-wide formatting churn.
- Do not introduce new tooling unless the user asks for it.
- Mention known lint failures separately from failures caused by your own changes.
