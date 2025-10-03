# Repository Guidelines

## Project Structure & Module Organization
- `src/app`: Next.js App Router entry; keep route handlers and top-level pages.
- `src/lib`: Shared utilities (`utils.ts`) and data fixtures; reuse rather than duplicating helpers.
- `src/fonts`: Local font definitions consumed via Next's font loader; update alongside design token tweaks.
- `public`: Static assets served from root; organize by feature and keep exports under 1 MB.
- `examples/`: Sandbox demos; refresh when component APIs change to avoid drift.
- `doc/`: Design reference files such as `color-system.json`; sync values with implemented themes.
- `context/`: Research notes and agent personas; treat as read-only background material.

## Build, Test, and Development Commands
- `npm run dev`: Start the Turbopack-powered dev server on http://localhost:3000 for iterative UI work.
- `npm run build`: Create the production bundle; fails on type errors or unresolved imports.
- `npm run start`: Serve the compiled build locally; mirrors the deployment runtime.
- `npm run lint`: Execute ESLint with the Next.js config; required before submitting a PR.

## Coding Style & Naming Conventions
- Stick to TypeScript; avoid plain `.js` files unless interoperability demands it.
- Name components in PascalCase (`CardGrid.tsx`) and hooks/utilities in camelCase (`useDataSync.ts`).
- Co-locate styles with components; prefer CSS modules or UnoCSS utility classes over global styles.
- Use Prettier defaults (2-space indent, semicolons, single quotes); let editors format on save.
- Run `npm run lint` prior to commits to enforce hook rules, import order, and no-unused-vars.

## Testing Guidelines
- Automated tests are not yet wired in; when adding, adopt `@testing-library/react` with Vitest or Jest.
- Place specs beside their sources as `*.test.tsx` or group shared suites under `src/__tests__/`.
- Target key UI flows and shared utilities; note uncovered scenarios in the PR description until CI coverage lands.

## Commit & Pull Request Guidelines
- Write imperative, present-tense commit titles under 72 characters (e.g., `Fix popover alignment`).
- Keep commits focused; separate behavior changes from stylistic updates to simplify review.
- Pull requests must include a summary, motivation or linked issue, screenshots for UI changes, and manual test notes.
- Move TODOs into `doc/todo.txt` or open an issue before merging to avoid orphaned tasks.
