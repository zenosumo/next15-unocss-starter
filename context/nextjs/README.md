# Next.js Documentation Collection

This directory contains local copies of key Next.js documentation for offline reference and development.

## Getting Started Documentation

- **[Font Optimization](@context/nextjs/nextjs-fonts.md)** - Font optimization with next/font module
- **[Caching and Revalidating](@context/nextjs/nextjs-caching-revalidating.md)** - Data fetching, caching strategies, and revalidation
- **[Partial Prerendering](@context/nextjs/nextjs-partial-prerendering.md)** - Experimental PPR feature combining static and dynamic rendering

## API Reference - Directives

- **[use cache](@context/nextjs/nextjs-use-cache.md)** - Experimental caching directive for routes, components, and functions
- **[use client](@context/nextjs/nextjs-use-client.md)** - Client-side rendering directive for interactive components

## API Reference - File Conventions

- **[middleware.js](@context/nextjs/nextjs-middleware.md)** - Server-side middleware for request/response handling, authentication, and routing

## Configuration Documentation

- **[next.config.js](@context/nextjs/nextjs-config.md)** - Complete Next.js configuration reference with all available options
- **[cacheLife](@context/nextjs/nextjs-cache-life-config.md)** - Custom cache profiles configuration for use cache directive

## Quick Start

1. **Font Setup**: Start with [Font Optimization](@context/nextjs/nextjs-fonts.md) for Google Fonts and local font integration
2. **Caching Strategy**: Implement efficient data fetching with [Caching and Revalidating](@context/nextjs/nextjs-caching-revalidating.md)
3. **Client Components**: Use [use client](@context/nextjs/nextjs-use-client.md) for interactive UI components
4. **Advanced Features**:
   - Explore [use cache](@context/nextjs/nextjs-use-cache.md) for experimental caching (Next.js 15+)
   - Try [Partial Prerendering](@context/nextjs/nextjs-partial-prerendering.md) for hybrid static/dynamic rendering

## Related Project Files

- `/next.config.ts` - Next.js configuration with experimental features
- `/src/app/layout.tsx` - Root layout with font configuration
- `/src/app/providers.tsx` - Client-side providers setup
- `/postcss.config.mjs` - PostCSS configuration for styling

## Key Technologies Covered

- **Next.js 15.5+** with App Router
- **Font Optimization**: Google Fonts, local fonts, next/font module
- **Caching**: fetch API, unstable_cache, revalidateTag, revalidatePath
- **Directives**: use client, use cache (experimental)
- **Rendering**: Static, dynamic, partial prerendering (PPR)
- **Performance**: Streaming, Suspense boundaries, progressive loading
- **Middleware**: Server-side request/response handling, authentication, routing, CORS
- **Configuration**: Complete next.config.js options, experimental features

## External Resources

- [Official Next.js Documentation](https://nextjs.org/docs)
- [Next.js GitHub Repository](https://github.com/vercel/next.js)
- [Next.js Examples](https://github.com/vercel/next.js/tree/canary/examples)