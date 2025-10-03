# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 project using the App Router with TypeScript. The project is configured with:
- **Turbopack** for faster development and builds
- **UnoCSS** for atomic CSS utilities (PostCSS integration)
- **Design System** with manual token management
- **Storybook** for component development (installed but not configured)
- **ESLint** with Next.js TypeScript configuration
- **Prettier** for code formatting

## Development Commands

```bash
# Development server with Turbopack
npm run dev

# Production build with Turbopack
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Project Structure

- **Source files**: Located in `src/` directory
- **App directory**: `src/app/` using Next.js App Router
- **Path alias**: `@/*` maps to `./src/*`
- **Styling**: UnoCSS utilities with CSS variable architecture
- **Fonts**: Source Sans 3 (primary) and JetBrains Mono (monospace)

## Design System Architecture

### Color System
- **Source of truth**: `src/styles/tokens.css` (manually maintained)
- **Token naming**: `--color-{category}-{variant}` (e.g., `--color-primary-400`)
- **Semantic variables**: `--sys-*` prefix (e.g., `--sys-bg`, `--sys-fg`, `--sys-accent`)
- **Categories**:
  - Layout: foreground, background, content-{1-4}, divider, link
  - Brand: neutral, primary, secondary, ternary, action (scales: base, 50-900)
  - Semantic: success, warning, danger (scales: base, 50-900)

### CSS Architecture (Cascade Order)
1. **tokens.css** - Design token definitions
2. **themes.css** - Maps tokens to semantic variables (`--sys-*`)
3. **base.css** - Global resets and base styles
4. **utilities** - UnoCSS generated utilities via `@unocss` directive

### Typography
- **Sans serif**: `--sys-font-sans` → "Source Sans 3", "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif
- **Code**: `--sys-font-code` → 'SF Mono', 'Monaco', 'JetBrains Mono', 'Fira Code', monospace
- **Monospace**: `--sys-font-mono` → JetBrains Mono variable + fallbacks

### UnoCSS Utilities

**Colors (with optional opacity):**
```tsx
bg-sys-bg              // Background
text-sys-fg            // Foreground
text-color-primary-400 // Direct token access
bg-sys-accent/50       // 50% opacity
```

**Typography:**
```tsx
font-sans  // Source Sans 3 stack
font-code  // SF Mono, Monaco, JetBrains Mono, Fira Code
font-mono  // JetBrains Mono + monospace fallbacks
```

**Responsive breakpoints:**
- `sm:` - 640px
- `md:` - 768px
- `lg:` - 1024px
- `xl:` - 1280px

## Key Technologies

- **Next.js 15** with App Router
- **React 19**
- **TypeScript** with strict mode enabled
- **Turbopack** for fast bundling
- **UnoCSS** via PostCSS (Turbopack compatible)
- **Manual token management** (no Style Dictionary generation)
- **Storybook** for component development (installed but not configured)

## Development Notes

- Design tokens are manually maintained in `src/styles/tokens.css`
- UnoCSS uses PostCSS integration for Turbopack compatibility
- Semantic variables (`--sys-*`) provide stable API for components
- All color utilities support opacity modifiers via `color-mix()`
- Source Sans 3 loaded via `next/font/google`
- JetBrains Mono loaded via local font files in `src/fonts/`
- ESLint extends Next.js core web vitals and TypeScript configurations
- TypeScript path mapping allows `@/` imports from `src/`

## File References

- **Design tokens**: `src/styles/tokens.css`
- **Semantic mapping**: `src/styles/themes.css`
- **Base styles**: `src/styles/base.css`
- **Global entry**: `src/styles/globals.css`
- **UnoCSS config**: `unocss.config.ts`
- **PostCSS config**: `postcss.config.mjs`
- **Font setup**: `src/fonts/index.ts`
- **Color reference**: `doc/color-system.json`
