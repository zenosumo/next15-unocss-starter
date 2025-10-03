# Color System Implementation Plan

## Current State Analysis

### ✅ Completed
1. **Design Tokens Source**: `doc/color-system.json` exists with comprehensive dark theme
2. **Generated Tokens**: `src/styles/tokens.css` manually created with proper naming (`--color-*`)
3. **Base Styles**: `src/styles/base.css` exists with UnoCSS reset import
4. **Dependencies**: All required packages installed (unocss, @unocss/webpack, @unocss/reset, style-dictionary)
5. **Layout Import**: `src/app/layout.tsx` imports `@/styles/globals.css`

### ❌ Missing Components

#### 1. Runtime Theme Mapping (`src/styles/themes.css`)
**Status**: Does not exist
**Purpose**: Map design tokens to stable semantic variables for runtime theme switching

#### 2. Global CSS Layer Order (`src/styles/globals.css`)
**Status**: Exists but incomplete
**Issue**: Contains old Next.js defaults, missing proper @layer imports

#### 3. UnoCSS Configuration (`unocss.config.ts`)
**Status**: Does not exist
**Purpose**: Configure utility class mappings to CSS variables

#### 4. Style Dictionary Config (`style-dictionary.config.cjs`)
**Status**: Does not exist
**Purpose**: Automate token generation from JSON

#### 5. Next.js Webpack Plugin (`next.config.ts`)
**Status**: Missing UnoCSS plugin
**Current**: Empty config

#### 6. Build Scripts (`package.json`)
**Status**: Missing token generation scripts
**Current**: Basic dev/build scripts without token pipeline

#### 7. UnoCSS Import (`src/app/layout.tsx`)
**Status**: Missing `import 'uno.css'`

---

## Implementation Plan

### Phase 1: Foundation (Config Files)

#### Task 1.1: Create `style-dictionary.config.cjs`
```javascript
const path = require('path');

module.exports = {
  source: ['doc/color-system.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'src/styles/',
      files: [{
        destination: 'tokens.css',
        format: 'css/variables'
      }],
      options: {
        outputReferences: true,
        selector: ':root'
      }
    }
  }
};
```

**Acceptance Criteria**:
- File created at project root
- Points to correct source and output paths
- Can run `npx style-dictionary build` successfully

---

#### Task 1.2: Create `unocss.config.ts`
```typescript
import { defineConfig, presetUno, presetIcons, transformerVariantGroup } from 'unocss';

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons(),
  ],
  transformers: [
    transformerVariantGroup(),
  ],
  rules: [
    // Background colors with optional opacity
    [/^bg-([a-z0-9-]+)(?:\/(\d{1,3}))?$/, ([, v, a]) => ({
      background: a
        ? `color-mix(in oklab, var(--${v}) ${a}%, transparent)`
        : `var(--${v})`
    })],
    // Text colors with optional opacity
    [/^text-([a-z0-9-]+)(?:\/(\d{1,3}))?$/, ([, v, a]) => ({
      color: a
        ? `color-mix(in oklab, var(--${v}) ${a}%, transparent)`
        : `var(--${v})`
    })],
    // Border colors with optional opacity
    [/^border-([a-z0-9-]+)(?:\/(\d{1,3}))?$/, ([, v, a]) => ({
      borderColor: a
        ? `color-mix(in oklab, var(--${v}) ${a}%, transparent)`
        : `var(--${v})`
    })],
  ],
  safelist: [
    // Semantic variables
    'bg-bg', 'text-fg', 'bg-content', 'text-accent', 'border-border',
    // Layout colors
    'bg-color-background', 'text-color-foreground', 'border-color-divider',
    'text-color-link', 'text-color-link-hover',
    // Brand scales
    ...['neutral', 'primary', 'secondary', 'ternary', 'action'].flatMap(brand =>
      ['base', '50', '100', '200', '300', '400', '500', '600', '700', '800', '900'].flatMap(n => [
        `bg-color-${brand}-${n}`,
        `text-color-${brand}-${n}`,
        `border-color-${brand}-${n}`
      ])
    ),
    // Semantic scales
    ...['success', 'warning', 'danger'].flatMap(semantic =>
      ['base', '50', '100', '200', '300', '400', '500', '600', '700', '800', '900'].flatMap(n => [
        `bg-color-${semantic}-${n}`,
        `text-color-${semantic}-${n}`,
        `border-color-${semantic}-${n}`
      ])
    )
  ],
});
```

**Acceptance Criteria**:
- File created at project root
- Rules map class names to CSS variables
- Safelist includes all color tokens
- Supports opacity via `/` syntax (e.g., `bg-color-primary-400/50`)

---

### Phase 2: CSS Architecture

#### Task 2.1: Create `src/styles/themes.css`
```css
/**
 * Runtime Theme Mapping
 * Maps design tokens to stable semantic variables
 */

:root {
  /* Layout */
  --fg: var(--color-foreground);
  --bg: var(--color-background);
  --content: var(--color-content-1);
  --content-2: var(--color-content-2);
  --content-3: var(--color-content-3);
  --content-4: var(--color-content-4);
  --border: var(--color-divider);

  /* Links */
  --link: var(--color-link);
  --link-hover: var(--color-link-hover);
  --link-visited: var(--color-link-visited);

  /* Semantic shortcuts */
  --accent: var(--color-primary-400);
  --accent-hover: var(--color-primary-500);
  --success: var(--color-success-400);
  --warning: var(--color-warning-400);
  --danger: var(--color-danger-400);
}

/* Future: Add [data-theme="light"] when light colors are added to color-system.json */
```

**Acceptance Criteria**:
- File created in `src/styles/`
- Maps all layout tokens to semantic names
- Provides convenient shortcuts for common use cases
- Documents future light theme addition

---

#### Task 2.2: Update `src/styles/globals.css`
```css
/**
 * Global CSS Entry Point
 * Load order: tokens → themes → base → utilities
 */

@layer tokens;
@layer theme;
@layer base;
@layer utilities;

/* Import in strict cascade order */
@import url('./tokens.css') layer(tokens);
@import url('./themes.css') layer(theme);
@import url('./base.css') layer(base);
```

**Acceptance Criteria**:
- Replace existing content entirely
- Enforce proper cascade order via @layer
- All imports use relative paths
- No inline styles or media queries

---

#### Task 2.3: Update `src/styles/base.css`
```css
@import '@unocss/reset/eric-meyer.css';

:root {
  color-scheme: light dark;
}

html,
body {
  height: 100%;
  max-width: 100vw;
  overflow-x: hidden;
}

body {
  background: var(--bg);
  color: var(--fg);
  font-family: Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

a {
  color: var(--link);
  text-decoration: none;
}

a:hover {
  color: var(--link-hover);
}

a:visited {
  color: var(--link-visited);
}
```

**Acceptance Criteria**:
- Uses semantic variables (`--bg`, `--fg`, `--link`)
- Includes link state styles
- Maintains existing reset and primitives

---

### Phase 3: Build Pipeline

#### Task 3.1: Update `next.config.ts`
```typescript
import type { NextConfig } from 'next';
import UnoCSS from '@unocss/webpack';

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.plugins.push(UnoCSS());
    return config;
  },
};

export default nextConfig;
```

**Acceptance Criteria**:
- UnoCSS webpack plugin added
- Config preserves any existing options
- No TypeScript errors

---

#### Task 3.2: Update `package.json` scripts
```json
{
  "scripts": {
    "tokens": "style-dictionary build",
    "dev": "npm run tokens && next dev --turbopack",
    "build": "npm run tokens && next build --turbopack",
    "start": "next start",
    "lint": "eslint"
  }
}
```

**Acceptance Criteria**:
- `tokens` script runs Style Dictionary
- `dev` and `build` generate tokens before running
- Turbopack flags preserved

---

#### Task 3.3: Update `src/app/layout.tsx`
```typescript
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import "uno.css"; // ← Add this

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={\`\${geistSans.variable} \${geistMono.variable}\`}>
        {children}
      </body>
    </html>
  );
}
```

**Acceptance Criteria**:
- `uno.css` import added after globals
- No other changes to layout
- TypeScript compiles without errors

---

### Phase 4: Verification

#### Task 4.1: Test Token Generation
```bash
npm run tokens
```

**Expected Output**:
- `src/styles/tokens.css` regenerated
- File matches current manual version
- No errors in console

---

#### Task 4.2: Test Development Build
```bash
npm run dev
```

**Expected Behavior**:
- Tokens generate before dev server starts
- UnoCSS utilities available in components
- No console errors
- Styles load in correct cascade order

---

#### Task 4.3: Create Test Component
Create a simple component using the new system:

```tsx
// Example usage in a component
<div className="bg-bg text-fg p-4">
  <h1 className="text-color-primary-400">Hello</h1>
  <p className="text-color-neutral-600">World</p>
  <button className="bg-accent text-color-primary-900 hover:bg-accent-hover">
    Click Me
  </button>
</div>
```

**Acceptance Criteria**:
- All utility classes work
- Colors match design tokens
- No hard-coded hex values needed
- Opacity modifiers work (e.g., `bg-accent/50`)

---

## Success Criteria

- [ ] Style Dictionary auto-generates tokens from JSON
- [ ] UnoCSS utilities reference CSS variables only
- [ ] Proper cascade order enforced via @layer
- [ ] Semantic variables provide stable API
- [ ] No hard-coded colors in app code
- [ ] Dev/build scripts generate tokens automatically
- [ ] Component utilities work with opacity modifiers
- [ ] Architecture matches `doc/color-architecture-overview.md`

---

## File Checklist

- [ ] `style-dictionary.config.cjs` (create)
- [ ] `unocss.config.ts` (create)
- [ ] `src/styles/themes.css` (create)
- [ ] `src/styles/globals.css` (replace)
- [ ] `src/styles/base.css` (update)
- [ ] `next.config.ts` (update)
- [ ] `package.json` (update scripts)
- [ ] `src/app/layout.tsx` (add uno.css import)

---

## Notes

- Current `color-system.json` only defines dark theme
- Light theme support requires adding light variants to JSON first
- Token naming convention: `--color-{category}-{variant}`
- Semantic naming convention: `--{purpose}` (e.g., `--bg`, `--fg`, `--accent`)
- UnoCSS rules support opacity via `/` syntax using `color-mix()`