---
title: Python SDK
description: Use the equal first-party synchronous and asynchronous Gapwise Python clients.
---

The official Python package lives in `sdk/python` in the Gapwise repository, targets the canonical v1 API, and is published on PyPI as `gapwise`. Python and TypeScript are equal first-party SDK implementations: public API additions should receive equivalent model, example, error, and release-validation coverage in both.

> Release status: `gapwise==0.1.0` is live on PyPI through Trusted Publishing and was verified from a clean Python environment against the production Gapwise API. The matching `python-v0.1.0` GitHub Release mirrors the built wheel, source distribution, and SHA-256 checksums for source-adjacent artifact access.

The TypeScript peer is `@gapwise/sdk@0.1.1`, published canonically on npm and JSR. The same JavaScript artifact is also mirrored on GitHub Packages as `@gapwisehq/sdk` (historical 0.1.1 under `@gapwise-for-uoft/sdk`). See [JavaScript & TypeScript SDK](/sdk/javascript/).

## Install from PyPI

```bash
python -m pip install gapwise
```

To pin the current release:

```bash
python -m pip install gapwise==0.1.0
```

Python 3.11 or newer is required.

## GitHub Release mirror

GitHub Packages does not provide a PyPI-compatible Python registry, so Python distribution uses PyPI as the canonical package registry and GitHub Releases as the source-adjacent mirror. The `python-v0.1.0` release contains:

- `gapwise-0.1.0-py3-none-any.whl`
- `gapwise-0.1.0.tar.gz`
- `SHA256SUMS.txt`

Normal Python consumers should install from PyPI. The GitHub Release mirror is useful when you need the exact built artifacts or their published checksums alongside the source repository.

Future `python-v<version>` releases are produced from the corresponding reviewed Git tag and mirror the exact release artifacts after the shared SDK verification gate passes.

## Synchronous client

```py
from gapwise import Gapwise

with Gapwise() as gapwise:
    buildings = gapwise.buildings.list(q="instructional")
    route = gapwise.routes.calculate(
        from_building="MN",
        to_building="IB",
    )
```

## Async client

```py
from gapwise import AsyncGapwise

async with AsyncGapwise() as gapwise:
    places = await gapwise.places.list(building="HM")
    plan = await gapwise.gaps.plan(
        from_building="MN",
        to_building="IB",
        term="Fall",
        weekday="Wednesday",
        start_time=660,
        end_time=780,
    )
```

The sync and async clients expose equivalent resources and typed result models.

## Parity with TypeScript

The Python SDK and `@gapwise/sdk` use language-appropriate naming and transport libraries, but represent the same public v1 capabilities and bounded values. OpenAPI remains the authoritative HTTP contract. A public capability should not be considered SDK-complete until both implementations and their documentation have been reviewed for parity.

Runtime expansion on the TypeScript side (Node, Bun, Deno, browsers/edge environments) does not reduce Python's first-party status or create additional API authority; it is distribution/portability work around the same contract.

## Typing

The wheel includes `py.typed`, so type checkers can consume the package's inline annotations. Public models use concrete types and literal values for bounded fields such as route status and availability state rather than falling back to unstructured dictionaries.

## HTTP behavior

The client uses `httpx` and supports custom base URLs, timeouts, headers, and transport behavior. Context managers close owned clients cleanly; applications that manage a longer-lived client can keep a Gapwise instance alive for reuse.

## Errors

API failures raise typed Gapwise exceptions with the status code, API error code, message, optional details, and request ID. Do not retry validation failures. For transient platform failures or a `429`, use bounded exponential backoff and respect any response guidance available at the time.

## Release and provenance

Python releases originate from reviewed `python-v<version>` Git tags. The release workflow builds and verifies the Python distributions, publishes the canonical package to PyPI through Trusted Publishing when appropriate, and mirrors the exact wheel/source artifacts plus checksums on the matching GitHub Release. No long-lived PyPI publishing token is required in the repository.

The shared SDK release verification also checks the TypeScript/npm/JSR side, so release infrastructure keeps both official implementations visible in one platform gate rather than treating Python as a secondary package.

See [Errors](/api/errors/) and [Rate limits](/api/rate-limits/).
