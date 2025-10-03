# Next.js Caching and Revalidating

Caching is a technique for storing the result of data fetching and other computations so that future requests for the same data can be served faster, without doing the work again. While revalidation allows you to update cache entries without having to rebuild your entire application.

Next.js provides a few APIs to handle caching and revalidation. This guide will walk you through when and how to use them.

- [`fetch`](#fetch)
- [`unstable_cache`](#unstable_cache)
- [`revalidatePath`](#revalidatepath)
- [`revalidateTag`](#revalidatetag)

## `fetch`

By default, [`fetch`](@context/nextjs/nextjs-fetch-api.md) requests are not cached. You can cache individual requests by setting the `cache` option to `'force-cache'`.

```typescript
// app/page.tsx
export default async function Page() {
  const data = await fetch('https://...', { cache: 'force-cache' })
}
```

> **Good to know**: Although `fetch` requests are not cached by default, Next.js will [prerender](@context/nextjs/nextjs-partial-prerendering.md#static-rendering) routes that have `fetch` requests and cache the HTML. If you want to guarantee a route is [dynamic](@context/nextjs/nextjs-partial-prerendering.md#dynamic-rendering), use the [`connection` API](@context/nextjs/nextjs-connection-api.md).

To revalidate the data returned by a `fetch` request, you can use the `next.revalidate` option.

```typescript
// app/page.tsx
export default async function Page() {
  const data = await fetch('https://...', { next: { revalidate: 3600 } })
}
```

This will revalidate the data after a specified amount of seconds.

See the [`fetch` API reference](@context/nextjs/nextjs-fetch-api.md) to learn more.

## `unstable_cache`

`unstable_cache` allows you to cache the result of database queries and other async functions. To use it, wrap `unstable_cache` around the function. For example:

```typescript
// app/lib/data.ts
import { db } from '@/lib/db'
export async function getUserById(id: string) {
  return db
    .select()
    .from(users)
    .where(eq(users.id, id))
    .then((res) => res[0])
}
```

```typescript
// app/page.tsx
import { unstable_cache } from 'next/cache'
import { getUserById } from '@/app/lib/data'

export default async function Page({
  params,
}: {
  params: Promise<{ userId: string }>
}) {
  const { userId } = await params

  const getCachedUser = unstable_cache(
    async () => {
      return getUserById(userId)
    },
    [userId] // add the user ID to the cache key
  )
}
```

The function accepts a third optional object to define how the cache should be revalidated. It accepts:

- `tags`: an array of tags used by Next.js to revalidate the cache.
- `revalidate`: the number of seconds after cache should be revalidated.

```typescript
// app/page.tsx
const getCachedUser = unstable_cache(
  async () => {
    return getUserById(userId)
  },
  [userId],
  {
    tags: ['user'],
    revalidate: 3600,
  }
)
```

See the [`unstable_cache` API reference](@context/nextjs/nextjs-unstable-cache-api.md) to learn more.

## `revalidateTag`

`revalidateTag` is used to revalidate cache entries based on a tag and following an event. To use it with `fetch`, start by tagging the function with the `next.tags` option:

```typescript
// app/lib/data.ts
export async function getUserById(id: string) {
  const data = await fetch(`https://...`, {
    next: {
      tags: ['user'],
    },
  })
}
```

Alternatively, you can mark an `unstable_cache` function with the `tags` option:

```typescript
// app/lib/data.ts
export const getUserById = unstable_cache(
  async (id: string) => {
    return db.query.users.findFirst({ where: eq(users.id, id) })
  },
  ['user'], // Needed if variables are not passed as parameters
  {
    tags: ['user'],
  }
)
```

Then, call `revalidateTag` in a [Route Handler](@context/nextjs/nextjs-route-handlers.md) or Server Action:

```typescript
// app/lib/actions.ts
import { revalidateTag } from 'next/cache'

export async function updateUser(id: string) {
  // Mutate data
  revalidateTag('user')
}
```

You can reuse the same tag in multiple functions to revalidate them all at once.

See the [`revalidateTag` API reference](@context/nextjs/nextjs-revalidate-tag-api.md) to learn more.

## `revalidatePath`

`revalidatePath` is used to revalidate a route and following an event. To use it, call it in a [Route Handler](@context/nextjs/nextjs-route-handlers.md) or Server Action:

```typescript
// app/lib/actions.ts
import { revalidatePath } from 'next/cache'

export async function updateUser(id: string) {
  // Mutate data
  revalidatePath('/profile')
}
```

See the [`revalidatePath` API reference](@context/nextjs/nextjs-revalidate-path-api.md) to learn more.

## API Reference

Learn more about the features mentioned in this page by reading the API Reference.

- [**fetch** - API reference for the extended fetch function](@context/nextjs/nextjs-fetch-api.md)
- [**unstable_cache** - API Reference for the unstable_cache function](@context/nextjs/nextjs-unstable-cache-api.md)
- [**revalidatePath** - API Reference for the revalidatePath function](@context/nextjs/nextjs-revalidate-path-api.md)
- [**revalidateTag** - API Reference for the revalidateTag function](@context/nextjs/nextjs-revalidate-tag-api.md)