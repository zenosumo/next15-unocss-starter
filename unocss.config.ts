import { defineConfig, presetUno, presetIcons, transformerVariantGroup } from 'unocss';

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons(),
  ],
  transformers: [
    transformerVariantGroup(),
  ],
  theme: {
    fontFamily: {
      sans: 'var(--sys-font-sans)',
      code: 'var(--sys-font-code)',
      mono: 'var(--sys-font-mono)',
    },
  },
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
    // Semantic system variables
    'bg-sys-bg',
    'text-sys-fg',
    'bg-sys-content',
    'text-sys-accent',
    'border-sys-border',
    'text-sys-link',

    // Font families
    'font-sans',
    'font-code',
    'font-mono',

    // Layout colors
    'bg-color-background',
    'text-color-foreground',
    'border-color-divider',
    'text-color-link',
    'text-color-link-hover',

    // Brand scales (neutral, primary, secondary, ternary, action)
    ...['neutral', 'primary', 'secondary', 'ternary', 'action'].flatMap(brand =>
      ['base', '50', '100', '200', '300', '400', '500', '600', '700', '800', '900'].flatMap(n => [
        `bg-color-${brand}-${n}`,
        `text-color-${brand}-${n}`,
        `border-color-${brand}-${n}`
      ])
    ),

    // Semantic scales (success, warning, danger)
    ...['success', 'warning', 'danger'].flatMap(semantic =>
      ['base', '50', '100', '200', '300', '400', '500', '600', '700', '800', '900'].flatMap(n => [
        `bg-color-${semantic}-${n}`,
        `text-color-${semantic}-${n}`,
        `border-color-${semantic}-${n}`
      ])
    )
  ],
});