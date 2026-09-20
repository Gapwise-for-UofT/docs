---
title: Gapwise Data
description: Canonical University of Toronto campus data, schemas, provenance, distribution, and reuse.
---

Gapwise Data is the canonical public source for University of Toronto campus facts and geometry used across the Gapwise ecosystem. Building identity and map geometry cover UTM, UTSG, and UTSC; the current reviewed entrance/routing pipeline and production raw-data distribution are UTM-specific.

- **Portal:** `https://data.gapwise.ca`
- **Entrance contributor:** `https://data.gapwise.ca/contribute`
- **Canonical repository:** `Gapwise-for-UofT/data`
- **Raw distribution:** `https://data.gapwise.ca/datasets/utm/latest/`
- **Distribution manifest:** `https://data.gapwise.ca/datasets/utm/latest/manifest.json`
- **Stable application API:** `https://api.gapwise.ca/v1`

## Source of truth

`Gapwise-for-UofT/data` owns public campus facts: building identity, coordinates and footprints, entrances, routing graph inputs, available indoor data, provenance, evidence, uncertainty, and generated data audits.

The main `gapwise` repository owns deterministic behavior: route calculation, timetable semantics, gap planning, API orchestration, SDK contracts, and product presentation.

> **Gapwise Data owns campus facts. Gapwise owns product behavior.**

## Does the app fetch Data at runtime?

No. Gapwise web and API builds contain a tested snapshot of the canonical dataset. That means an outage of `data.gapwise.ca` or GitHub does not make a student's campus routing fail.

The relationship is:

```text
Gapwise-for-UofT/data canonical tree
        ↓ validate / pin
Gapwise build snapshot
        ↓
web app + API + deterministic engine
```

External developers can use the first-party Data distribution directly when raw artifacts are appropriate.

## Choose the right surface

| Need | Use |
| --- | --- |
| Stable building/routing/gap semantics | Public API or official SDK |
| Raw GeoJSON / graph / audit artifacts | Gapwise Data distribution |
| Provenance and uncertainty explanation | These docs + Data portal |
| Add or correct a UTM entrance | [Visual entrance contributor](https://data.gapwise.ca/contribute) |
| Change validators, schemas, canonical tooling, or other campus facts | [`Gapwise-for-UofT/data`](https://github.com/Gapwise-for-UofT/data) |
| Permissioned private student context | Gapwise AI / MCP |

Entrance submissions from the visual contributor are review evidence; they do not write directly to canonical routing data. See [Contributing campus data](/data/contributing/) for the evidence and review workflow.

Start with [Dataset catalog](/data/datasets/) or [Distribution and versioning](/data/distribution/).
