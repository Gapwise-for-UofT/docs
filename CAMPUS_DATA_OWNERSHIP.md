# Campus data ownership

Canonical public University of Toronto campus facts and geometry live in `GapwiseHQ/data`. UTM's reviewed entrance/routing dataset lives under `data/utm`; UTSG and UTSC identities and geometry live in their own campus directories.

`gapwise` consumes a validated build-time snapshot and remains authoritative for deterministic routing/gap-planning behavior, the public API/OpenAPI contract, SDK semantics, and product presentation. `docs` documents released contracts; it must not become an independent source of campus facts or product behavior.

## Documentation rules

- Link raw UTM data, provenance, confidence/evidence, geometry, entrances, and routing graph sources to `data`.
- Document routing behavior, API response semantics, OpenAPI, and SDK behavior from released `gapwise` contracts.
- Do not copy a campus dataset into this repository merely to make documentation convenient.
- Do not imply that `data.gapwise.ca` must be reachable for the product/API to route; core uses a vendored build-time snapshot.
- Preserve the distinction between canonical **facts** (`data`) and deterministic **calculations/contracts** (`gapwise`).

The machine-readable ecosystem contract in `gapwise.ecosystem.json` records the same ownership boundary and canonical GitHub organization.
