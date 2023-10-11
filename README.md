# super-fetch

Super fetch is a collection of fetch wrappers that make it easier to use fetch. It uses the decorator pattern to wrap fetch in a series of decorators that add functionality to fetch.

## Quick Usage

```ts
import { withRetry } from "super-fetch";

const fetchWithRetry = withRetry(fetch, { retries: 3, retryDelay: 1000, retryOn: [500, 502, 503, 504] });

// Use fetchWithRetry as you would use fetch
fetchWithRetry("https://example.com")
```

Decorators can be combined to add multiple features to fetch.

```ts
import { withCache, withRetry } from "super-fetch";

const fetchWithCacheAndRetry = withCache(withRetry(fetch, { retries: 3, retryOn: [500, 502] }), { ttl: 1000 });

// Use fetchWithCacheAndRetry as you would use fetch
This will retry until it gets a 200 response, and cache the response for future requests.
fetchWithCacheAndRetry("https://example.com")

```

## Decorators

These are the decorators that are currently included with super-fetch.

### withCache

### withRetry

### withTimeout

## Development

To install dependencies:

```bash
bun install
```

Run test:

```bash
bun test --watch
```

This project was created using `bun init` in bun v1.0.2. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
