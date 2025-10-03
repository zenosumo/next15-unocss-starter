# Next.js cacheLife Configuration

> This feature is currently available in the canary channel and subject to change. Try it out by upgrading Next.js, and share your feedback on GitHub.

The `cacheLife` option allows you to define **custom cache profiles** when using the [`cacheLife`](@context/nextjs/nextjs-cache-life-api.md) function inside components or functions, and within the scope of the [`use cache` directive](@context/nextjs/nextjs-use-cache.md).

## Usage

To define a profile, enable the [`cacheComponents` flag](@context/nextjs/nextjs-cache-components-config.md) and add the cache profile in the `cacheLife` object in the `next.config.js` file. For example, a `blog` profile:

```typescript
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    cacheComponents: true,
    cacheLife: {
      blog: {
        stale: 3600, // 1 hour
        revalidate: 900, // 15 minutes
        expire: 86400, // 1 day
      },
    },
  },
}

export default nextConfig
```

You can now use this custom `blog` configuration in your component or function as follows:

```typescript
// app/actions.ts
import { unstable_cacheLife as cacheLife } from 'next/cache'

export async function getCachedData() {
  'use cache'
  cacheLife('blog')
  const data = await fetch('/api/data')
  return data
}
```

## Reference

The configuration object has key values with the following format:

| **Property** | **Value** | **Description** | **Requirement** |
| --- | --- | --- | --- |
| `stale` | `number` | Duration the client should cache a value without checking the server. | Optional |
| `revalidate` | `number` | Frequency at which the cache should refresh on the server; stale values may be served while revalidating. | Optional |
| `expire` | `number` | Maximum duration for which a value can remain stale before switching to dynamic. | Optional - Must be longer than `revalidate` |