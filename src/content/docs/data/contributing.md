---
title: Contributing campus data
description: How to correct or extend canonical UTM campus facts without forking product truth.
---

Campus-data changes belong in [`GapwiseHQ/data`](https://github.com/GapwiseHQ/data), not in a downstream consumer.

## Entrance contributions

For a missing or incorrect UTM entrance, use the visual **Gapwise Data contributor** at [`data.gapwise.ca/contribute`](https://data.gapwise.ca/contribute).

You can choose a building, click the doorway on the map, drag the pin to refine its position, and record only the access, direction, or barrier-free facts you actually know. On a phone, the editor can optionally use browser location while you are surveying an entrance. Building-specific links such as `https://data.gapwise.ca/contribute?building=MN` open with that building already selected.

A public submission is **review evidence**, not an automatic mutation of canonical routing data. Unknown is a valid value, and submitted claims stay subject to validation and maintainer review before they can become canonical facts.

## Good contributions

Useful contributions include:

- missing or corrected entrances submitted through the visual contributor;
- corrected building names, aliases, or stable codes;
- source-backed coordinates or footprint improvements;
- verified entrance/accessibility evidence;
- routing graph corrections;
- provenance metadata and source identifiers;
- tests or validators that catch invalid campus facts;
- documentation of uncertainty or known limitations.

## Maintainer and code workflow

Use a Data repository pull request when the change affects canonical files, validators, schemas, data-production tooling, or other maintainer-owned implementation rather than a field observation that fits the visual contributor.

1. Change the canonical data or data-production tooling in `GapwiseHQ/data`.
2. Run the repository validator and integrity checks.
3. Let the core-consumer contract verify that current Gapwise can still compile and route against the candidate dataset.
4. Merge Data.
5. Sync/pin the validated snapshot into core through the supported synchronization path.
6. Let normal core CI validate product behavior before production deployment.

Do not make equivalent campus-fact edits independently in web, mobile, AI, or documentation repositories.

## Evidence expectations

Prefer official/source-linked evidence when available. If a useful value is inferred, mark it as inferred rather than upgrading it to verified simply because it appears plausible on the map. For field observations, use the visual contribution form's **Not sure** options instead of guessing.

For questions about how an artifact is represented or distributed, see [Dataset catalog](/data/datasets/) and [Distribution and versioning](/data/distribution/).
