# Gapwise ecosystem integration

`docs` is the canonical public documentation surface for the seven-repository Gapwise product ecosystem. It describes released behavior and data owned elsewhere; it must not become an independent source of product semantics or campus facts.

All seven first-party product repositories are owned by the **Gapwise** GitHub organization (`GapwiseHQ`). Organization-wide community/default files live in `.github`. Andrew Muratov remains the creator and primary maintainer.

## Owning repositories

| Repository | Authoritative for |
| --- | --- |
| `GapwiseHQ/gapwise` | web/PWA behavior, student state, deterministic timetable/gap/routing algorithms, public API v1, OpenAPI, TypeScript + Python SDK source and release workflow, map/product presentation |
| `GapwiseHQ/android` | native Android implementation, Android device integration, persistence adapters, and Android distribution behavior |
| `GapwiseHQ/ios` | native iOS implementation, Apple-platform integration, persistence adapters, and iOS distribution behavior |
| `GapwiseHQ/ai` | OAuth/MCP delegation, tool schemas, permissions, bounded mutations, AI compatibility evidence |
| `GapwiseHQ/data` | **canonical public University of Toronto campus facts and geometry**, entrances, routing graph data, provenance, schemas, evidence, attribution, validation, and reuse |
| `GapwiseHQ/docs` | released public developer documentation and documentation information architecture |
| `GapwiseHQ/status` | operational health and incident communication |

`gapwise` vendors a validated build-time mirror of `data/utm` from the `data` repository at `src/data/utm`. That local path preserves existing imports and deterministic deployment behavior; it is not a second campus-data authority and does not create a runtime dependency on `data.gapwise.ca` or GitHub.

## Product scope

Gapwise timetable identity and web building maps support UTM, UTSG, UTSC, and mixed-campus schedules. The first-party public campus API, reviewed entrance and pedestrian route graph, places, and production raw-data distribution currently cover UTM. Documentation must preserve that specific boundary instead of implying equivalent routing coverage at all three campuses.

## Current developer-platform state

- GitHub organization: `https://github.com/GapwiseHQ`
- Public API: `https://api.gapwise.ca/v1`
- OpenAPI 3.1: `https://api.gapwise.ca/openapi.json`
- TypeScript SDK: `@gapwise/sdk`
  - npm `0.1.1` is published with provenance
  - JSR `0.1.1` is published with provenance through GitHub Actions OIDC
  - one TypeScript implementation targets Node, Bun, Deno, and browser portability rather than separate runtime SDKs
- Python SDK: `gapwise==0.1.0` is published on PyPI through Trusted Publishing
- Android source: `https://github.com/GapwiseHQ/android`
- iOS source: `https://github.com/GapwiseHQ/ios`
- Data: `https://data.gapwise.ca`
- AI/MCP: `https://ai.gapwise.ca/api/mcp`
- Status: `https://status.gapwise.ca`

TypeScript and Python are equal first-party SDKs. Documentation should provide comparable conceptual coverage, examples, error/uncertainty guidance, and release-state accuracy for both.

## Documentation rules

1. OpenAPI + core implementation own public HTTP behavior and deterministic calculations.
2. `data` owns raw public University of Toronto campus facts, geometry, routing graph data, provenance, and evidence.
3. SDK docs follow released package/source behavior and never invent methods or types.
4. Registry claims are evidence-based: reserved/configured is not the same as published.
5. Runtime claims are evidence-based: Node/Bun/Deno/browser support should reflect CI/release verification rather than assumptions.
6. Private AI behavior is documented from `ai` and remains separate from the public campus SDKs.
7. Data provenance/uncertainty statements link back to `data` and preserve unknown/inferred states.
8. Operations/status guidance links to `status`; docs do not duplicate live incident state.
9. Android behavior links to `android` when Android-specific implementation/distribution matters.
10. iOS behavior links to `ios` when iOS-specific implementation/distribution matters.
11. All-campus timetable support must not be documented as all-campus map/routing coverage.
12. Documentation must not imply that core routing performs a runtime fetch from the data portal; deployed core contains the tested snapshot.

## Change-impact rule

A docs change that alters a contract or data claim should name the owning repository/evidence. A source change in any owning repository should trigger a docs review when it changes a public API, SDK, data schema, AI tool/permission, Android/iOS integration requirement, or operational surface.

The goal is connected documentation without duplicated authority.
