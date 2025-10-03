export default {
  plugins: {
    '@unocss/postcss': {
      content: [
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/**/*.{js,ts,jsx,tsx,mdx}',
      ],
    },
    autoprefixer: {},
  },
};