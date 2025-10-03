# Color Architecture Overview (Next.js + UnoCSS + Style Dictionary)

## Idea
Treat color as data. All colors live as design tokens (CSS variables) generated from one JSON file. The app never hard-codes hex; utilities (UnoCSS) only reference variables. Themes (light/dark/brand) are just mappings of those tokens—flip an attribute to switch the whole look at runtime.

## Why
- Single source of truth → no drift between design and code.
- Runtime theming → no rebuilds to change theme.
- Predictable cascade → load tokens first, map to runtime vars, then apply utilities.

## How to implement (high level)
### Tokens
Keep your palette in a JSON file. Use Style Dictionary to generate a `tokens.css` with variables (e.g., `--brand-primary-400`, `--layout-background`).

### Runtime variables
Create a thin `themes.css` that aliases tokens to stable app-facing names (e.g., `--sys-bg-app`, `--sys-fg-primary`, `--sys-accent`). Provide one block per theme (`:root` for default, `[data-theme="light"]`, `[data-theme="dark"]`, etc.).

### Global order
In a single `globals.css`, import in this order: tokens → themes → base (reset/typography). This locks the cascade so everything else just consumes variables.

### Utilities (UnoCSS)
Configure UnoCSS rules that map classes to variables (e.g., `bg-sys-bg-app` → `background: var(--sys-bg-app)`). Uno stays “dumb”: no colors in its config, only variable lookups.

### App wiring (Next.js)
Import `globals.css` and `uno.css` in `app/layout.tsx`. Set `data-theme` on `<html>` before paint (read system or saved user preference). No component-level color logic.

### Build pipeline
Add an npm script to generate tokens before dev/build. Result: tokens always fresh; themes switch instantly at runtime.

## Mental model
- Tokens = the palette (truth).
- Runtime vars = stable API for components.
- Utilities = mechanical translators from class names to `var(--*)`.
- Theme switching = remap vars via an attribute, not code changes.

---

## Where everything lives (Next.js App Router)

### Design tokens (source of truth)
`doc/color-system.json`  
Your only hand-edited palette + semantics. Style Dictionary reads this.

### Generated CSS (do not edit)
`src/styles/tokens.css`  
Emitted from the JSON. Contains `--layout-*`, `--brand-*-050…900`, `--semantic-*-*`.

### Runtime theme mapping
`src/styles/themes.css`  
Aliases tokens → stable app variables (`--sys-*`). One block per theme:

```
:root[data-theme="light"] { … }
:root[data-theme="dark"] { … }
```
Optional brand blocks (`[data-theme="brand-th"]`, etc.).

### Global cascade + base
`src/styles/globals.css`  
Imports in this strict order: tokens → themes → base.

`src/styles/base.css`  
Reset + primitives (background/text defaults, typography, etc.).

### UnoCSS config
`unocss.config.ts` (project root)  
Rules that map utilities → `var(--*)`. No hard-coded colors.

### Next.js wiring
`src/app/layout.tsx`  
`import '../styles/globals.css'` and `import 'uno.css'`.  
Inline a tiny script to set `document.documentElement.dataset.theme` before paint.

`next.config.ts` (project root)  
Add `@unocss/webpack` plugin in `webpack` hook.

### Build tooling (npm only)
`style-dictionary.config.cjs` (project root)  
Points to `doc/color-system.json`, outputs to `src/styles/tokens.css`.

`package.json` (project root)  
Scripts:
```json
{
  "scripts": {
    "tokens": "style-dictionary build",
    "dev": "npm run tokens && next dev",
    "build": "npm run tokens && next build",
    "start": "next start"
  }
}
```

### Optional (tests & DX)
`/.github/workflows/` or `/scripts/`  
Contrast checks, visual snapshots across `[data-theme]` variants.

---

## Folder snapshot
```
doc/
  color-system.json              ← edit me
src/
  app/
    layout.tsx                   ← imports globals + uno, sets data-theme
  styles/
    globals.css                  ← @layer tokens→theme→base
    tokens.css                   ← generated
    themes.css                   ← maps tokens → --sys-*
    base.css                     ← reset + primitives
unocss.config.ts                 ← utility→var(--*) rules
style-dictionary.config.cjs      ← JSON → tokens.css
next.config.ts                   ← UnoCSS webpack plugin
package.json                     ← npm scripts
```
