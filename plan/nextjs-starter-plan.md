# Next.js 15 Starter Plan — Radix UI, Framer Motion, GSAP Morphing, UnoCSS, Tokens, Storybook

Minimal, predictable, rigid-on-consumption; flexible-on-design. Optimized for pairing with ChatGPT.

---

## 0) Prereqs
Use Node 20+, pnpm 9+, and GitHub CLI (optional). Replace `pnpm` with your package manager if needed.

---

## 1) Repo bootstrap

```bash
pnpm create next-app@latest web --ts --app --eslint
cd web
pnpm add framer-motion gsap @radix-ui/react-slot @radix-ui/react-dialog @radix-ui/react-popover @radix-ui/react-dropdown-menu @radix-ui/react-tooltip @radix-ui/react-tabs
pnpm add -D unocss @unocss/postcss @unocss/reset style-dictionary prettier postcss autoprefixer @storybook/nextjs @storybook/test @types/gsap
git init
git branch -M main
echo "node_modules
.next
.storybook/out
dist
tokens/dist
" >> .gitignore
git add -A
git commit -m "chore: init Next.js 15 app"
```

---

## 2) UnoCSS (responsive-first utilities)

Create `uno.config.ts`. Rules bridge class names to CSS variables so tokens drive color.

```ts
// uno.config.ts
import { defineConfig, presetMini } from 'unocss';

export default defineConfig({
  presets: [presetMini()],
  theme: {
    breakpoints: { sm: '640px', md: '768px', lg: '1024px', xl: '1280px' },
    spacing: { 0: '0', 1: '0.25rem', 2: '0.5rem', 3: '0.75rem', 4: '1rem', 6: '1.5rem', 8: '2rem' }
  },
  rules: [
    [/^bg-(.+)$/, ([, v]) => ({ background: `var(--${v})` })],
    [/^text-(.+)$/, ([, v]) => ({ color: `var(--${v})` })],
    [/^border-(.+)$/, ([, v]) => ({ borderColor: `var(--${v})` })]
  ],
  shortcuts: {
    container: 'mx-auto px-4 md:px-6 lg:px-8 max-w-screen-lg',
    surface: 'bg-bg-elevated text-fg-primary border border-border shadow-1',
    'btn-base': 'inline-flex items-center justify-center h-10 px-4 rounded-md border'
  }
});
```

Add PostCSS config so UnoCSS runs with Next.

```ts
// postcss.config.mjs
export default {
  plugins: {
    '@unocss/postcss': {},
    autoprefixer: {}
  }
};
```

Create `app/globals.css`. Keep resets minimal; tokens will define colors later.

```css
/* app/globals.css */
@unocss all;
@import '@unocss/reset/tailwind.css';

:root,[data-theme="light"]{color-scheme:light}
[data-theme="dark"]{color-scheme:dark}

html,body{height:100%}
body{background:var(--bg-app);color:var(--fg-primary)}
```

Update package scripts to invoke tokens before build.

```json
// package.json (partial)
{
  "scripts": {
    "dev": "next dev",
    "build": "pnpm tokens && next build",
    "start": "next start",
    "tokens": "style-dictionary build --config sd.config.cjs && style-dictionary build --config sd.dark.cjs",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build"
  }
}
```

---

## 3) Design tokens (single JSON → CSS variables)

Create `tokens/tokens.json`. Values are placeholders; adjust to your brand.

```json
{
  "$schema": "https://design-tokens.org/schema.json",
  "color": {
    "brand": { "7": { "value": "hsl(250 70% 50%)" }, "3": { "value": "hsl(250 90% 85%)" } },
    "neutral": { "1": { "value": "hsl(0 0% 100%)" }, "2": { "value": "hsl(220 20% 98%)" }, "9": { "value": "hsl(220 14% 20%)" }, "10": { "value": "hsl(220 18% 12%)" } },
    "semantic": {
      "bg": { "app": { "value": "{color.neutral.2}" }, "elevated": { "value": "{color.neutral.1}" }, "subtle": { "value": "hsl(220 18% 95%)" } },
      "fg": { "primary": { "value": "hsl(220 20% 10%)" }, "secondary": { "value": "hsl(220 10% 35%)" }, "inverse": { "value": "hsl(0 0% 100%)" } },
      "border": { "default": { "value": "hsl(220 15% 85%)" }, "strong": { "value": "hsl(220 15% 75%)" } },
      "accent": { "default": { "value": "{color.brand.7}" }, "contrast": { "value": "hsl(0 0% 100%)" }, "muted": { "value": "{color.brand.3}" } },
      "state": { "success": { "value": "hsl(150 55% 38%)" }, "warning": { "value": "hsl(42 85% 45%)" }, "danger": { "value": "hsl(8 70% 52%)" }, "info": { "value": "hsl(210 80% 45%)" } },
      "outline": { "focus": { "value": "hsl(250 85% 60%)" } },
      "overlay": { "backdrop": { "value": "hsl(220 20% 10% / 0.5)" } }
    }
  },
  "radius": { "sm": { "value": "8px" }, "md": { "value": "12px" }, "lg": { "value": "16px" } },
  "shadow": {
    "1": { "value": "0 1px 2px hsl(220 30% 10% / 0.06), 0 2px 8px hsl(220 30% 10% / 0.08)" },
    "2": { "value": "0 6px 18px hsl(220 10% 2% / 0.12), 0 18px 36px hsl(220 10% 2% / 0.10)" }
  },
  "motion": {
    "duration": { "xs": { "value": "120ms" }, "sm": { "value": "200ms" }, "md": { "value": "280ms" } },
    "easing": { "standard": { "value": "cubic-bezier(.2,.8,.2,1)" }, "emphasized": { "value": "cubic-bezier(.2,0,0,1)" } }
  },
  "media": { "breakpoint": { "sm": { "value": "640px" }, "md": { "value": "768px" }, "lg": { "value": "1024px" }, "xl": { "value": "1280px" } } }
}
```

Create dark overrides `tokens/tokens.dark.json`.

```json
{
  "color": {
    "semantic": {
      "bg": { "app": { "value": "{color.neutral.10}" }, "elevated": { "value": "{color.neutral.9}" }, "subtle": { "value": "hsl(220 16% 16%)" } },
      "fg": { "primary": { "value": "hsl(0 0% 100%)" }, "secondary": { "value": "hsl(220 10% 75%)" }, "inverse": { "value": "hsl(220 20% 10%)" } },
      "border": { "default": { "value": "hsl(220 12% 25%)" }, "strong": { "value": "hsl(220 12% 35%)" } },
      "accent": { "default": { "value": "hsl(250 80% 70%)" }, "contrast": { "value": "hsl(240 50% 10%)" }, "muted": { "value": "hsl(250 50% 25%)" } },
      "overlay": { "backdrop": { "value": "hsl(220 10% 5% / 0.6)" } },
      "outline": { "focus": { "value": "hsl(250 85% 70%)" } }
    }
  }
}
```

Create Style Dictionary configs `sd.config.cjs` and `sd.dark.cjs`.

```js
// sd.config.cjs
module.exports = {
  source: ['tokens/tokens.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'tokens/dist/',
      files: [
        { destination: 'tokens.css', format: 'css/variables' },
        { destination: 'media.css', format: 'custom/media' }
      ]
    }
  }
};
```

```js
// sd.dark.cjs
const base = require('./sd.config.cjs');
base.source = ['tokens/tokens.json', 'tokens/tokens.dark.json'];
base.platforms.css.files = [{ destination: 'tokens.dark.css', format: 'css/variables' }];
module.exports = base;
```

Import tokens in `app/globals.css`.

```css
@import '../tokens/dist/tokens.css';
@import '../tokens/dist/media.css';
```

Theme boot script in `app/layout.tsx` to prevent FOUC. It sets `data-theme` early.

```tsx
<script dangerouslySetInnerHTML={{__html:`(function(){try{var k='theme';var s=localStorage.getItem(k);var sys=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.setAttribute('data-theme',s||sys)}catch(e){}})()`}} />
```

Dark token injection using a style tag. Place after the boot script.

```tsx
// app/token-dark-style.tsx
import fs from 'node:fs';
export function TokenDarkStyle() {
  const css = fs.readFileSync('./tokens/dist/tokens.dark.css','utf8').replace(':root{','').replace('}','');
  return <style dangerouslySetInnerHTML={{__html:`:root[data-theme="dark"]{${css}}`}} />;
}
```

Use it in `app/layout.tsx`.

```tsx
// app/layout.tsx (excerpt)
import { TokenDarkStyle } from './token-dark-style';
```

```tsx
// app/layout.tsx (body content placement)
<TokenDarkStyle />
```

Run token build once before `dev` if needed.

```bash
pnpm tokens
```

---

## 4) Fonts (next/font, variable, subset)

Add a variable font to `public/fonts` and wire `next/font`.

```tsx
// app/fonts.ts
import localFont from 'next/font/local';

export const Sans = localFont({
  src: [{ path: '../public/fonts/InterVariable.woff2', style: 'normal', weight: '100 900' }],
  display: 'swap',
  variable: '--font-sans'
});
```

Apply to `<html>`.

```tsx
// app/layout.tsx (excerpt)
import { Sans } from './fonts';
```

```tsx
// app/layout.tsx (html tag)
<html lang="en" className={Sans.variable}>
```

Add basic default element styles using tokens.

```css
/* app/base.css */
:root{--font-family-sans: var(--font-sans, ui-sans-serif)}
h1,h2,h3,h4{font-family:var(--font-family-sans)}
p{font-size:1rem;line-height:1.55}
```

Include in `app/globals.css` under the token imports.

```css
@import './base.css';
```

---

## 5) Radix UI + UnoCSS + tokens (Button)

```tsx
// components/Button.tsx
'use client';
import * as React from 'react';

type Tone = 'accent'|'neutral'|'danger';
export function Button({tone='accent', className='', ...props}: React.ComponentProps<'button'> & {tone?:Tone}) {
  const toneCls = {
    accent: 'bg-accent text-accent-contrast border-border',
    neutral: 'bg-bg-elevated text-fg-primary border-border',
    danger: 'bg-state-danger text-fg-inverse border-border'
  }[tone];
  return <button {...props} className={`btn-base ${toneCls} hover:brightness-105 active:brightness-95 focus-visible:outline-2 focus-visible:outline-[var(--outline-focus)] ${className}`} />;
}
```

---

## 6) Framer Motion + GSAP MorphSVG (true morphs)

MorphSVG is a paid plugin; if you prefer OSS-only, use the Flubber variant below.

```tsx
// components/MorphDemo.tsx
'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
gsap.registerPlugin(MorphSVGPlugin);

export function MorphDemo() {
  const [open,setOpen]=useState(false);
  const pathRef=useRef<SVGPathElement>(null);
  useEffect(()=>{
    if(!pathRef.current) return;
    const to = open ? 'M10,80 Q52,10 95,80 T180,80' : 'M10,50 L90,50 L90,90 L10,90Z';
    gsap.to(pathRef.current,{ duration: 0.5, ease: 'power2.inOut', morphSVG: to });
  },[open]);
  return (
    <div className="grid place-items-center gap-4">
      <button className="btn-base bg-accent text-accent-contrast" onClick={()=>setOpen(v=>!v)}>{open?'Morph Back':'Morph'}</button>
      <AnimatePresence>
        <motion.svg width="200" height="100" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
          <path ref={pathRef} d="M10,50 L90,50 L90,90 L10,90Z" fill="var(--accent)"/>
        </motion.svg>
      </AnimatePresence>
    </div>
  );
}
```

OSS-only alternative using Flubber.

```tsx
// components/MorphDemoFlubber.tsx
'use client';
import { useMemo, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { interpolate } from 'flubber';

export function MorphDemoFlubber() {
  const [open,setOpen]=useState(false);
  const from = 'M10,50 L90,50 L90,90 L10,90Z';
  const to = 'M10,80 Q52,10 95,80 T180,80';
  const t = useMotionValue(0);
  const interp = useMemo(()=>interpolate(from,to,{maxSegmentLength:2}),[]);
  const d = useTransform(t,v=>interp(v));
  return (
    <div className="grid place-items-center gap-4">
      <button className="btn-base bg-accent text-accent-contrast" onClick={()=>{setOpen(v=>!v);t.set(open?0:1)}}>{open?'Morph Back':'Morph'}</button>
      <motion.svg width="200" height="100">
        <motion.path style={{ d: d as any }} fill="var(--accent)" />
      </motion.svg>
    </div>
  );
}
```

---

## 7) Example page for sanity check

```tsx
// app/page.tsx
import { Button } from '@/components/Button';
import { MorphDemo } from '@/components/MorphDemo';

export default function Home() {
  return (
    <main className="container py-8">
      <h1 className="text-fg-primary text-3xl font-bold">Starter Check</h1>
      <p className="mt-2 text-fg-secondary">Tokens, UnoCSS, Radix-ready components, Framer + GSAP.</p>
      <div className="mt-6 flex gap-4">
        <Button>Primary</Button>
        <Button tone="neutral">Neutral</Button>
        <Button tone="danger">Danger</Button>
      </div>
      <div className="mt-10">
        <MorphDemo />
      </div>
    </main>
  );
}
```

---

## 8) Storybook (Next-compatible playground)

```bash
pnpm dlx storybook@latest init --builder webpack5 --type nextjs
```

Ensure global CSS is loaded.

```ts
// .storybook/preview.ts
import '../app/globals.css';
export const parameters = { controls: { expanded: true } };
```

Simple story.

```tsx
// stories/Button.stories.tsx
import { Button } from '../components/Button';
export default { title: 'Core/Button', component: Button };
export const Primary = { args: { children: 'Click me' } };
```

Run Storybook.

```bash
pnpm storybook
```

---

## 9) GitHub remote and first push

Using GitHub CLI.

```bash
gh repo create kris-next-starter --private --source=. --remote=origin --push
git push -u origin main
```

Manual alternative.

```bash
git remote add origin git@github.com:<you>/kris-next-starter.git
git push -u origin main
```

---

## 10) Daily commands

```bash
pnpm tokens
pnpm dev
```

Build and run.

```bash
pnpm build && pnpm start
```

Storybook.

```bash
pnpm storybook
```

---

## 11) Quick acceptance checklist
- Light/dark switch via `data-theme` has no FOUC.
- Uno utilities `sm: md: lg:` work; colors read from tokens.
- Button uses semantic colors; focus outline visible in both themes.
- Morph demo performs smoothly; `prefers-reduced-motion` respected if you clamp durations later.
- Storybook renders Button and respects global styles.

---

## 12) Next steps
- Add typography roles and map elements to roles.
- Add ESLint/Stylelint rules to ban non-token colors and raw transitions.
- Add Playwright + axe for a11y and visual regression.
- Extend Radix primitives (menu, popover, dialog, combobox) with tokenized styles.

---

## 5 clarifying questions
1) GSAP MorphSVG license acceptable, or lock OSS-only with Flubber?  
2) Do you want container queries via `@custom-media` and Uno shortcuts immediately?  
3) Should we generate density tokens for compact dashboards out of the gate?  
4) Theme switching UI or system-preference only for now?  
5) Any locales (IT/TH) to set up per-locale font subsets and fallbacks?  
