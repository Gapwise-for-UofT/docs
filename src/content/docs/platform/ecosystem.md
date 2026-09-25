---
title: Ecosystem architecture
description: How the Gapwise application, university adapters, public SDKs, data, mobile, AI, docs, and status surfaces fit together.
---

Gapwise is one product ecosystem. `gapwise` contains the single web application for all university editions. Repository boundaries separate deployment, trust, and ownership; they do not create parallel sources of truth.

All canonical repositories are owned by the **Gapwise** GitHub organization at `https://github.com/Gapwise-for-UofT`. Andrew Muratov remains the creator and primary maintainer.

## Repository ownership

| Repository | Owns |
| --- | --- |
| `Gapwise-for-UofT/gapwise` | web/PWA behavior, canonical student-state semantics, deterministic timetable/gap/routing logic, public API v1, OpenAPI, and both official SDK implementations |
| `Gapwise-for-UofT/android` | native Android UX, device integration, secure mobile persistence, and Android distribution |
| `Gapwise-for-UofT/ios` | native iOS UX, device integration, secure mobile persistence, and iOS distribution |
| `Gapwise-for-UofT/ai` | OAuth/MCP delegation, permission checks, minimized delegated snapshots, and bounded AI actions |
| `Gapwise-for-UofT/data` | campus-data provenance, evidence, schemas, attribution, transformations, and reuse guidance |
| `Gapwise-for-UofT/cli` | repeatable university scaffolding and validation commands |
| `Gapwise-for-UofT/docs` | canonical public documentation of released first-party contracts |
| `Gapwise-for-UofT/status` | independently deployed service health and incident communication |

The `carleton` and `carleton-data` repositories remain available as transitional references and rollback sources. The canonical web implementation and campus data are moving into `gapwise` and `data`, respectively. The JavaScript and Python SDKs remain in `gapwise/sdk`; a separate SDK repository would duplicate stable published source.

## University edition flow

```text
hostname -> universities.json -> university timetable adapter -> shared meetings
                                                     |                   |
data/universities/<id>/campus.json -> campus catalog + path graph -> shared UI/routing
```

U of T is selected at `gapwise.ca`. The Carleton host is registered in the manifest, but public deployment must be verified before describing it as live. See [Add a university](/guides/add-university/) for the scaffold, data, testing, and deployment workflow.

## Source-of-truth flow

```text
campus evidence / canonical data
            |
            v
        gapwise core
 deterministic product semantics
       /      |       \
      /       |        \
 student    public     mobile
   web       API       client
              |
        +-----+-----+
        |           |
        v           v
 TypeScript SDK   Python SDK
   npm + JSR        PyPI

private student state
        |
        | explicit minimized delegation
        v
  ai repository OAuth/MCP

released contracts ---> docs repository
provenance/evidence --> data repository
public service health -> status repository
```

## SDK distribution model

Gapwise maintains **two SDK implementations**, not one SDK per runtime:

- TypeScript: `@gapwise/sdk`
  - npm `0.1.1` is published with provenance;
  - JSR `0.1.1` is published with provenance through the core repository's GitHub Actions OIDC publisher;
  - Node, Bun, and Deno are runtime/portability targets for this same implementation.
- Python: `gapwise==0.1.0`
  - published on PyPI through Trusted Publishing;
  - synchronous and asynchronous clients expose the same public v1 resources.

TypeScript and Python are equal first-party SDKs. Language-appropriate naming is expected, but capabilities, bounded enum values, uncertainty semantics, errors, and examples should stay aligned with OpenAPI v1.

## Cross-repository rules

1. OpenAPI and the core implementation own public HTTP behavior.
2. Mobile consumes canonical semantics instead of reimplementing timetable/routing truth.
3. AI receives explicit delegated context and does not become an authoritative timetable engine.
4. Data explains where campus facts came from and preserves fact/inference/uncertainty distinctions.
5. Docs describe released behavior and link to owning repositories rather than inventing contracts.
6. Status reports operational evidence and does not infer package/product truth from uptime.
7. Registry, runtime, app-store, and AI-client compatibility claims require external evidence.
8. A meaningful contract change should be reviewed for downstream effects in every affected repository.

## Canonical public surfaces

- GitHub: `https://github.com/Gapwise-for-UofT`
- App: `https://gapwise.ca`
- API: `https://api.gapwise.ca/v1`
- OpenAPI: `https://api.gapwise.ca/openapi.json`
- Docs: `https://docs.gapwise.ca`
- Data: `https://data.gapwise.ca`
- AI/MCP: `https://ai.gapwise.ca/api/mcp`
- Status: `https://status.gapwise.ca`

The public API and SDKs expose campus intelligence only. Private student context remains behind separate authentication/delegation boundaries.

## Change-impact checklist

Before calling an ecosystem change complete, check whether it affects:

- OpenAPI/public API behavior;
- TypeScript SDK code/types/examples and npm/JSR distribution;
- Python SDK code/types/examples and PyPI distribution;
- native mobile semantics or adapters;
- data schemas/provenance/uncertainty;
- AI delegated schemas/permissions/tools;
- public documentation;
- status probes, canonical endpoints, or incident terminology;
- privacy, security, accessibility, attribution, or source-of-truth statements.

Connected does not mean duplicated: every surface should know how it relates to the others while preserving clear ownership.
