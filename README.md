<div align="center">

<img src="public/logo-mark-white.svg" width="116" alt="Gapwise deer mark" />

# Gapwise Developer Documentation

### Build on the deterministic platform behind Gapwise.

**Official documentation for Gapwise: multi-university web architecture, public campus API, SDKs, data provenance, security, native clients, and permissioned AI/MCP integration.**

[![Live Docs](https://img.shields.io/badge/Live_Docs-docs.gapwise.ca-111111?style=for-the-badge&logo=vercel&logoColor=white)](https://docs.gapwise.ca)
[![OpenAPI 3.1](https://img.shields.io/badge/OpenAPI-3.1-6BA539?style=for-the-badge&logo=openapiinitiative&logoColor=white)](https://api.gapwise.ca/openapi.json)

<sub>Astro · Starlight · TypeScript · Vercel</sub>

<br />

**[Gapwise](https://gapwise.ca)** · **[Android](https://github.com/GapwiseHQ/android)** · **[iOS](https://github.com/GapwiseHQ/ios)** · **[API](https://api.gapwise.ca/v1)** · **[AI](https://ai.gapwise.ca)** · **[Data](https://data.gapwise.ca)** · **[Docs](https://docs.gapwise.ca)** · **[Status](https://status.gapwise.ca)**

</div>

---

## What this repository is

This repository is the canonical public developer-documentation surface for **Gapwise**, a privacy-first timetable and campus-intelligence platform created and engineered by **Andrew Muratov**. U of T is live; Carleton is being migrated into the shared web application.

Gapwise timetable identity and web building maps support **UTM, UTSG, UTSC, and mixed-campus schedules**. The public campus API, reviewed entrance and pedestrian route graph, campus places, and production raw-data distribution documented here currently cover UTM. The docs preserve that distinction without presenting Gapwise itself as a UTM product.

The ecosystem includes the core web/PWA, native Android and iOS clients, deterministic public API and published SDKs, canonical campus-data/provenance layer, permissioned OAuth/MCP AI integration, these developer docs, and an independent operational status service.

The docs follow released first-party contracts rather than inventing parallel behavior:

- [`gapwise`](https://github.com/GapwiseHQ/gapwise) owns canonical product semantics, public API/OpenAPI, and SDK source;
- [`android`](https://github.com/GapwiseHQ/android) owns the native Android implementation;
- [`ios`](https://github.com/GapwiseHQ/ios) owns the native iOS implementation;
- [`ai`](https://github.com/GapwiseHQ/ai) owns live MCP/OAuth delegation behavior;
- [`data`](https://github.com/GapwiseHQ/data) owns canonical public campus facts and provenance for supported universities;
- [`cli`](https://github.com/GapwiseHQ/cli) scaffolds new university adapters and campus datasets;
- [`status`](https://github.com/GapwiseHQ/status) owns operational state and incident communication.

---

## Canonical developer surfaces

```text
App       https://gapwise.ca
API       https://api.gapwise.ca/v1
OpenAPI   https://api.gapwise.ca/openapi.json
Docs      https://docs.gapwise.ca
Data      https://data.gapwise.ca
AI / MCP  https://ai.gapwise.ca/api/mcp
Status    https://status.gapwise.ca
```

Published SDKs:

```bash
npm install @gapwise/sdk@0.1.1
# JSR: @gapwise/sdk@0.1.1
python -m pip install gapwise==0.1.0
```

The JavaScript/TypeScript package is published on npm and JSR. The Python package is published on PyPI through Trusted Publishing. Registry and runtime claims remain evidence-based and must stay synchronized with actual releases.

---

## Documentation map

| Area | Covers |
| --- | --- |
| **Start** | Platform overview, architecture, and quickstart |
| **SDKs** | JavaScript/TypeScript and Python clients |
| **API** | Buildings, places, routing, gap planning, errors, envelopes, and defensive rate-limit handling |
| **Guides** | Integration recipes and common workflows |
| **Data** | Dataset identity, provenance, uncertainty, attribution, and Gapwise Data |
| **AI & MCP** | OAuth/delegation, tools, permissions, privacy, mutation boundaries, and compatibility |
| **Security** | Trust boundaries, threat model, privacy architecture, evidence, and validation limits |
| **Platform** | Ecosystem ownership, versioning, provenance, uncertainty, and changelog |
| **Operations** | Independent Gapwise Status and incident communication |

The public API exposes campus intelligence only. It does not expose student timetables, accounts, friends, private sync state, credentials, AI delegation state, or precise live location. Private AI access exists behind a separate OAuth-protected, explicitly delegated boundary.

---

## Source-of-truth rules

- `gapwise` + OpenAPI 3.1 are authoritative for public HTTP behavior and deterministic timetable/gap/routing/product semantics.
- `android` consumes those semantics for the native Android experience without creating a second product engine.
- `ios` consumes those semantics for the native iOS experience without creating a second product engine.
- `ai` is authoritative for the live MCP/OAuth tool, permission, delegation, and bounded-mutation behavior.
- `data` owns canonical public University of Toronto campus facts, geometry, provenance, evidence, schemas, and distribution.
- `status` owns current operational monitoring and incident-communication state.
- `docs` describes released behavior and preserves uncertainty rather than turning unknown facts into confident claims.
- University-wide timetable support must not be documented as equivalent university-wide campus-routing coverage.
- Named AI clients should not be described as verified until end-to-end production evidence exists.
- Public v1 must never imply private student-data access.

---

## Gapwise ecosystem

| Repository | Role | Primary surface |
| --- | --- | --- |
| **[`gapwise`](https://github.com/GapwiseHQ/gapwise)** | Core web/PWA, canonical timetable/gap/routing semantics, public API, OpenAPI, and SDK source | [gapwise.ca](https://gapwise.ca) / [api.gapwise.ca](https://api.gapwise.ca/v1) |
| **[`android`](https://github.com/GapwiseHQ/android)** | Native Kotlin + Jetpack Compose Android client | Android app |
| **[`ios`](https://github.com/GapwiseHQ/ios)** | Native Swift + SwiftUI iOS client | iOS app |
| **[`ai`](https://github.com/GapwiseHQ/ai)** | OAuth/MCP layer for explicitly delegated student context and bounded actions | [ai.gapwise.ca](https://ai.gapwise.ca) |
| **[`data`](https://github.com/GapwiseHQ/data)** | Canonical public University of Toronto campus data, provenance, schemas, validation, and distribution | [data.gapwise.ca](https://data.gapwise.ca) |
| **[`docs`](https://github.com/GapwiseHQ/docs)** | Canonical public developer documentation | [docs.gapwise.ca](https://docs.gapwise.ca) |
| **[`status`](https://github.com/GapwiseHQ/status)** | Independent service-health monitoring and incident communication | [status.gapwise.ca](https://status.gapwise.ca) |

These seven first-party product repositories form one ecosystem with deliberate separation of concerns, consistent links, trust boundaries, and source-of-truth ownership. Organization-wide GitHub defaults live separately in [`.github`](https://github.com/GapwiseHQ/.github).

---

## Local development

Requires Node.js 22 or newer.

```bash
git clone https://github.com/GapwiseHQ/docs.git
cd docs
npm ci
npm run check
npm run build
npm run dev
```

`main` is the production documentation branch and deploys to `docs.gapwise.ca`. The status service is deployed independently from [`status`](https://github.com/GapwiseHQ/status); documentation links to it rather than becoming a second status source.

---

## Independent project

> **Gapwise is an independent student software project created by Andrew Muratov. It is not affiliated with, endorsed by, or an official service of the University of Toronto.**

Original documentation and site code are available under the [MIT License](LICENSE).

<div align="center">

**One ecosystem. Explicit owners. Documentation that follows the evidence.**

[Read the docs →](https://docs.gapwise.ca)

</div>

## Updating the AI tool catalog

AI owns tool registration and the generated `contracts/mcp-live-surface.json` manifest.
With `ai` and `docs` checked out as siblings:

```bash
# In ai, after editing registrations:
npm run contract:generate
npm run contract:check
# In docs:
npm run mcp-contract:sync
npm run verify:mcp-contract
npm run mcp-contract:check
npm run check
npm run build
```

Update the tool and permission guides when verification identifies drift. CI checks the
vendored manifest against AI `main`; merge the AI producer PR before the Docs consumer PR.
Docs builds use the checked-in manifest and do not fetch AI at runtime. For another checkout
layout, pass `-- --source=<path/to/mcp-live-surface.json>` to the sync/check command.
