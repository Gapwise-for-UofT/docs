---
title: Dataset catalog
description: Major canonical UTM campus datasets published by Gapwise Data.
---

The currently published canonical UTM subtree lives under `data/utm`. Production Data builds distribute that validated tree at `https://data.gapwise.ca/datasets/utm/latest/`. Canonical UTSG and UTSC identity and geometry datasets live in their own repository directories but are not yet included in this raw production channel.

## Major surfaces

| Dataset | Typical artifact | Purpose |
| --- | --- | --- |
| Building registry | `building-registry.ts` | Canonical building/facility codes, names, aliases, categories, and normalization rules |
| Campus buildings | `buildings.geojson` | Navigation points and canonical spatial building metadata |
| Building footprints | `footprints/*.geojson` | Source-linked polygons used for campus map presentation |
| Entrances | `entrances.geojson` and entrance registries | Exterior entrance evidence and approach geometry |
| Outdoor routing graph | generated node/edge artifacts | Deterministic walking graph inputs |
| Indoor data | `indoor/` | Available building-level indoor graph/evidence data |
| Access audit | `generated/campus-access-audit.json` | Coverage and verification state for exterior access |
| Routing audit | generated audit artifacts | Coverage, confidence, and routing evidence checks |
| Integrity manifest | `SHA256SUMS` | Repository-level integrity verification |

## Canonical versus derived

A file being published by Gapwise Data does **not** mean every value is a directly observed fact. Gapwise keeps provenance and evidence state so derived or inferred geometry does not masquerade as direct observation.

Consumers should preserve confidence, verification, and unknown states rather than collapsing them into a single boolean such as `known = true`.

## Language-neutral direction

The long-term canonical representation favors JSON, GeoJSON, stable identifiers, enums, declarative rules, and machine-readable schemas. Some current canonical records are still TypeScript modules because they originated in the core application. Those are being treated as migration-era representations, not a reason for external consumers to couple themselves to TypeScript internals.

For stable application behavior, use the [public API](/api/) instead of importing repository modules directly.
