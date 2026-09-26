---
title: JavaScript & TypeScript SDK
description: Use the portable typed Gapwise client across Node.js, Bun, Deno, browsers, and compatible runtimes.
---

The official JavaScript/TypeScript client lives in `sdk/javascript` in the Gapwise repository and targets the canonical `https://api.gapwise.ca/v1` contract. It is one portable TypeScript implementation, not separate Node, Bun, and Deno SDKs.

> Registry status: `@gapwise/sdk@0.1.1` is published on npm and JSR with provenance. The same verified JavaScript SDK is also mirrored on GitHub Packages under `@gapwisehq/sdk` (historically published as `@gapwise-for-uoft/sdk@0.1.1`). The different GitHub Packages scope is required by the `GapwiseHQ` organization namespace; it is not a separate SDK.

Python is an equal first-party SDK implementation of the same public v1 semantics. See [Python SDK](/sdk/python/).

## Distribution and runtimes

| Target | Distribution | Status |
| --- | --- | --- |
| Node.js | npm `@gapwise/sdk` | primary first-party npm-compatible package target; Node 20+ |
| Bun | npm/portable source | first-party test/runtime target |
| Deno | JSR `@gapwise/sdk` | first-party JSR/runtime target verified by the shared release gate |
| Browser bundlers | npm | dependency-free client using Web `fetch` semantics |
| GitHub ecosystem | GitHub Packages `@gapwisehq/sdk` | public source-adjacent mirror of the same JavaScript SDK artifact (historical 0.1.1 under `@gapwise-for-uoft/sdk`) |
| Other edge-style runtimes | npm/JSR where compatible | compatibility should be claimed only after environment-specific evidence |

JSR publishes the TypeScript source entry point directly. npm publishes the compiled package artifact. GitHub Packages mirrors the verified JavaScript SDK under the organization-compatible scope. These distribution channels represent the same SDK API and version line; npm remains the primary npm-compatible installation channel.

## Install from npm

```bash
npm install @gapwise/sdk@0.1.1
```

## Install from JSR / Deno

```bash
deno add jsr:@gapwise/sdk@0.1.1
```

You can also import the exact released JSR version directly:

```ts
import { Gapwise } from "jsr:@gapwise/sdk@0.1.1";
```

## GitHub Packages mirror

The verified JavaScript artifact is also available from GitHub Packages as `@gapwisehq/sdk` (historical 0.1.1 published under `@gapwise-for-uoft/sdk@0.1.1`). GitHub requires package scopes to match the owning organization, so the mirror cannot use the canonical `@gapwise/sdk` registry identity.

Consumers choosing GitHub Packages must configure the `@gapwisehq` scope for `https://npm.pkg.github.com` and follow GitHub's npm-registry authentication requirements. Use npm or JSR when you do not specifically need the source-adjacent GitHub registry mirror.

## Create a client

```ts
import { Gapwise } from "@gapwise/sdk";

const gapwise = new Gapwise();
```

No API key is required for the public v1 campus surface.

## Buildings

```ts
const page = await gapwise.buildings.list({
  q: "instructional",
  category: "academic",
  limit: 20,
});

const mn = await gapwise.buildings.get("MN");
```

## Places

```ts
const places = await gapwise.places.list({
  building: "HM",
  openNow: "unknown",
});

const place = await gapwise.places.get("davis-food-court");
```

Availability is `open`, `closed`, or `unknown`. Treat `unknown` as an explicit state, not as `closed`.

## Routing

```ts
const route = await gapwise.routes.calculate({
  from: "MN",
  to: "IB",
  preferences: {
    mode: "fastest",
  },
});

console.log(route.status, route.accuracy);
```

Supported route modes are `fastest`, `prefer-indoor`, and `step-free`. Route preferences live under the `preferences` object. A successful HTTP request can still describe an approximate or unavailable route; inspect the route result instead of assuming complete coverage.

## Gap planning

```ts
const plan = await gapwise.gaps.plan({
  from: "MN",
  to: "IB",
  term: "Fall",
  weekday: "Wednesday",
  startTime: 660,
  endTime: 780,
});
```

The public client plans only the explicit interval you provide. It does not read a student timetable.

## Client options

The client supports a custom base URL, custom `fetch`, request timeout, request headers, and `AbortSignal`. This makes it usable in browsers, Node, Bun, Deno-compatible environments, tests, proxies, and controlled server environments without changing the API surface.

## Release verification

The shared SDK release gate validates the TypeScript package before registry publication with:

- Bun build/tests and npm package inspection;
- clean npm consumer installation and import under Node;
- JSR `publish --dry-run` validation of the TypeScript module graph/package contents;
- Deno type/runtime checks against the TypeScript source;
- repository contract checks that keep OpenAPI, TypeScript, Python, and maintained docs aligned.

npm and JSR publishing use GitHub Actions OIDC rather than long-lived registry credentials. The GitHub Packages mirror is a deliberate manual release target that uses the job-scoped `GITHUB_TOKEN` with `packages: write`, checks for an already-published exact version, and does not store a long-lived package token.

## Errors

Non-success responses throw typed Gapwise errors containing the HTTP status, structured API error code, human-readable message, optional details, and request ID. Preserve the request ID in logs or bug reports so a failing request can be correlated with server diagnostics.

See [Errors](/api/errors/) for the wire format and retry guidance.
