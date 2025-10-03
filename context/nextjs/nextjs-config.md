# Next.js Configuration (next.config.js)

Next.js can be configured through a `next.config.js` file in the root of your project directory (for example, by `package.json`) with a default export.

```javascript
// next.config.js
// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
}

module.exports = nextConfig
```

## ECMAScript Modules

`next.config.js` is a regular Node.js module, not a JSON file. It gets used by the Next.js server and build phases, and it's not included in the browser build.

If you need [ECMAScript modules](https://nodejs.org/api/esm.html), you can use `next.config.mjs`:

```javascript
// next.config.mjs
// @ts-check

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  /* config options here */
}

export default nextConfig
```

> **Good to know**: `next.config` with the `.cjs`, `.cts`, or `.mts` extensions are currently **not** supported.

## Configuration as a Function

You can also use a function:

```javascript
// next.config.mjs
// @ts-check

export default (phase, { defaultConfig }) => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    /* config options here */
  }
  return nextConfig
}
```

### Async Configuration

Since Next.js 12.1.0, you can use an async function:

```javascript
// next.config.js
// @ts-check

module.exports = async (phase, { defaultConfig }) => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    /* config options here */
  }
  return nextConfig
}
```

### Phase

`phase` is the current context in which the configuration is loaded. You can see the available phases. Phases can be imported from `next/constants`:

```javascript
// next.config.js
// @ts-check

const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      /* development only config options here */
    }
  }

  return {
    /* config options for all phases except development here */
  }
}
```

## TypeScript

If you are using TypeScript in your project, you can use `next.config.ts` to use TypeScript in your configuration:

```typescript
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
}

export default nextConfig
```

The commented lines are the place where you can put the configs allowed by `next.config.js`, which are defined in this file.

However, none of the configs are required, and it's not necessary to understand what each config does. Instead, search for the features you need to enable or modify in this section and they will show you what to do.

> Avoid using new JavaScript features not available in your target Node.js version. `next.config.js` will not be parsed by Webpack or Babel.

This page documents all the available configuration options:

## Unit Testing (experimental)

Starting in Next.js 15.1, the `next/experimental/testing/server` package contains utilities to help unit test `next.config.js` files.

The `unstable_getResponseFromNextConfig` function runs the [`headers`](@context/nextjs/nextjs-headers-config.md), [`redirects`](@context/nextjs/nextjs-redirects-config.md), and [`rewrites`](@context/nextjs/nextjs-rewrites-config.md) functions from `next.config.js` with the provided request information and returns `NextResponse` with the results of the routing.

> The response from `unstable_getResponseFromNextConfig` only considers `next.config.js` fields and does not consider middleware or filesystem routes, so the result in production may be different than the unit test.

```javascript
import {
  getRedirectUrl,
  unstable_getResponseFromNextConfig,
} from 'next/experimental/testing/server'

const response = await unstable_getResponseFromNextConfig({
  url: 'https://nextjs.org/test',
  nextConfig: {
    async redirects() {
      return [{ source: '/test', destination: '/test2', permanent: false }]
    },
  },
})
expect(response.status).toEqual(307)
expect(getRedirectUrl(response)).toEqual('https://nextjs.org/test2')
```

## Configuration Options

The following configuration options are available:

### Core Configuration
- [**appDir**](@context/nextjs/nextjs-app-dir-config.md) - Enable the App Router to use layouts, streaming, and more
- [**assetPrefix**](@context/nextjs/nextjs-asset-prefix-config.md) - Learn how to use the assetPrefix config option to configure your CDN
- [**basePath**](@context/nextjs/nextjs-base-path-config.md) - Use `basePath` to deploy a Next.js application under a sub-path of a domain
- [**distDir**](@context/nextjs/nextjs-dist-dir-config.md) - Set a custom build directory to use instead of the default .next directory
- [**env**](@context/nextjs/nextjs-env-config.md) - Learn to add and access environment variables in your Next.js application at build time
- [**output**](@context/nextjs/nextjs-output-config.md) - Next.js automatically traces which files are needed by each page to allow for easy deployment of your application

### Experimental Features
- [**cacheComponents**](@context/nextjs/nextjs-cache-components-config.md) - Learn how to enable the cacheComponents flag in Next.js
- [**cacheLife**](@context/nextjs/nextjs-cache-life-config.md) - Learn how to set up cacheLife configurations in Next.js
- [**ppr**](@context/nextjs/nextjs-ppr-config.md) - Learn how to enable Partial Prerendering in Next.js
- [**useCache**](@context/nextjs/nextjs-use-cache-config.md) - Learn how to enable the useCache flag in Next.js
- [**authInterrupts**](@context/nextjs/nextjs-auth-interrupts-config.md) - Learn how to enable the experimental `authInterrupts` configuration option
- [**reactCompiler**](@context/nextjs/nextjs-react-compiler-config.md) - Enable the React Compiler to automatically optimize component rendering

### Performance & Optimization
- [**compress**](@context/nextjs/nextjs-compress-config.md) - Next.js provides gzip compression to compress rendered content and static files
- [**images**](@context/nextjs/nextjs-images-config.md) - Custom configuration for the next/image loader
- [**optimizePackageImports**](@context/nextjs/nextjs-optimize-package-imports-config.md) - API Reference for optimizePackageImports Next.js Config Option
- [**transpilePackages**](@context/nextjs/nextjs-transpile-packages-config.md) - Automatically transpile and bundle dependencies from local packages or external dependencies
- [**turbopack**](@context/nextjs/nextjs-turbopack-config.md) - Configure Next.js with Turbopack-specific options
- [**turbopackPersistentCaching**](@context/nextjs/nextjs-turbopack-persistent-caching-config.md) - Learn how to enable Persistent Caching for Turbopack builds

### Routing & Navigation
- [**headers**](@context/nextjs/nextjs-headers-config.md) - Add custom HTTP headers to your Next.js app
- [**redirects**](@context/nextjs/nextjs-redirects-config.md) - Add redirects to your Next.js app
- [**rewrites**](@context/nextjs/nextjs-rewrites-config.md) - Add rewrites to your Next.js app
- [**trailingSlash**](@context/nextjs/nextjs-trailing-slash-config.md) - Configure Next.js pages to resolve with or without a trailing slash
- [**typedRoutes**](@context/nextjs/nextjs-typed-routes-config.md) - Enable support for statically typed links

### Development & Debugging
- [**devIndicators**](@context/nextjs/nextjs-dev-indicators-config.md) - Configuration options for the on-screen indicator that gives context about the current route
- [**eslint**](@context/nextjs/nextjs-eslint-config.md) - Next.js reports ESLint errors and warnings during builds by default
- [**logging**](@context/nextjs/nextjs-logging-config.md) - Configure how data fetches are logged to the console when running Next.js in development mode
- [**productionBrowserSourceMaps**](@context/nextjs/nextjs-production-browser-source-maps-config.md) - Enables browser source map generation during the production build
- [**typescript**](@context/nextjs/nextjs-typescript-config.md) - Next.js reports TypeScript errors by default
- [**browserDebugInfoInTerminal**](@context/nextjs/nextjs-browser-debug-info-config.md) - Forward browser console logs and errors to your terminal during development

### Runtime & Server
- [**reactStrictMode**](@context/nextjs/nextjs-react-strict-mode-config.md) - The complete Next.js runtime is now Strict Mode-compliant
- [**serverActions**](@context/nextjs/nextjs-server-actions-config.md) - Configure Server Actions behavior in your Next.js application
- [**serverExternalPackages**](@context/nextjs/nextjs-server-external-packages-config.md) - Opt-out specific dependencies from the Server Components bundling
- [**serverComponentsHmrCache**](@context/nextjs/nextjs-server-components-hmr-cache-config.md) - Configure whether fetch responses in Server Components are cached across HMR refresh requests
- [**httpAgentOptions**](@context/nextjs/nextjs-http-agent-options-config.md) - Next.js will automatically use HTTP Keep-Alive by default

### Styling & Assets
- [**cssChunking**](@context/nextjs/nextjs-css-chunking-config.md) - Use the `cssChunking` option to control how CSS files are chunked in your Next.js application
- [**inlineCss**](@context/nextjs/nextjs-inline-css-config.md) - Enable inline CSS support
- [**mdxRs**](@context/nextjs/nextjs-mdx-rs-config.md) - Use the new Rust compiler to compile MDX files in the App Router
- [**sassOptions**](@context/nextjs/nextjs-sass-options-config.md) - Configure Sass options
- [**useLightningcss**](@context/nextjs/nextjs-use-lightningcss-config.md) - Enable experimental support for Lightning CSS

### Caching & Performance
- [**cacheHandler**](@context/nextjs/nextjs-cache-handler-config.md) - Configure the Next.js cache used for storing and revalidating data
- [**expireTime**](@context/nextjs/nextjs-expire-time-config.md) - Customize stale-while-revalidate expire time for ISR enabled pages
- [**generateEtags**](@context/nextjs/nextjs-generate-etags-config.md) - Next.js will generate etags for every page by default
- [**staleTimes**](@context/nextjs/nextjs-stale-times-config.md) - Learn how to override the invalidation time of the Client Router Cache
- [**staticGeneration**](@context/nextjs/nextjs-static-generation-config.md) - Learn how to configure static generation in your Next.js application

### Security & Headers
- [**crossOrigin**](@context/nextjs/nextjs-cross-origin-config.md) - Use the `crossOrigin` option to add a crossOrigin tag on the `script` tags generated by `next/script`
- [**poweredByHeader**](@context/nextjs/nextjs-powered-by-header-config.md) - Next.js will add the `x-powered-by` header by default
- [**reactMaxHeadersLength**](@context/nextjs/nextjs-react-max-headers-length-config.md) - The maximum length of the headers that are emitted by React and added to the response
- [**taint**](@context/nextjs/nextjs-taint-config.md) - Enable tainting Objects and Values

### Advanced Configuration
- [**allowedDevOrigins**](@context/nextjs/nextjs-allowed-dev-origins-config.md) - Use `allowedDevOrigins` to configure additional origins that can request the dev server
- [**exportPathMap**](@context/nextjs/nextjs-export-path-map-config.md) - Customize the pages that will be exported as HTML files when using `next export`
- [**generateBuildId**](@context/nextjs/nextjs-generate-build-id-config.md) - Configure the build id, which is used to identify the current build
- [**htmlLimitedBots**](@context/nextjs/nextjs-html-limited-bots-config.md) - Specify a list of user agents that should receive blocking metadata
- [**onDemandEntries**](@context/nextjs/nextjs-on-demand-entries-config.md) - Configure how Next.js will dispose and keep in memory pages created in development
- [**pageExtensions**](@context/nextjs/nextjs-page-extensions-config.md) - Extend the default page extensions used by Next.js when resolving pages in the Pages Router
- [**urlImports**](@context/nextjs/nextjs-url-imports-config.md) - Configure Next.js to allow importing modules from external URLs
- [**viewTransition**](@context/nextjs/nextjs-view-transition-config.md) - Enable ViewTransition API from React in App Router
- [**webpack**](@context/nextjs/nextjs-webpack-config.md) - Learn how to customize the webpack config used by Next.js
- [**webVitalsAttribution**](@context/nextjs/nextjs-web-vitals-attribution-config.md) - Learn how to use the webVitalsAttribution option to pinpoint the source of Web Vitals issues