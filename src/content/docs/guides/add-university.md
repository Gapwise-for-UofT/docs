---
title: Add a university
description: Add a timetable adapter and reviewed campus data to the shared Gapwise web application.
---

Gapwise has one web application in `gapwise`. The manifest selects an institution by hostname. Timetable adapters return the shared meeting model; Today, Timetable, Gap Plan, Campus Map, and Day Route consume that model and the selected campus catalog. University facts and routing evidence belong in `data`.

Gapwise currently supports 7 universities across Canada: University of Toronto (`gapwise.ca`), Carleton University (`carleton.gapwise.ca`), Toronto Metropolitan University (`tmu.gapwise.ca`), Queen's University (`queens.gapwise.ca`), Wilfrid Laurier University (`laurier.gapwise.ca`), York University (`york.gapwise.ca`), and McMaster University (`mcmaster.gapwise.ca`). All editions are built from the unified `gapwise` and `data` codebase.

## Create a scaffold

Check out `gapwise`, `data`, and `cli` as sibling repositories. From `cli`:

```sh
node bin/gapwise.mjs university create example-university --dry-run
node bin/gapwise.mjs university create tmu \
  --name "Toronto Metropolitan University" --short-name TMU
```

The command adds one entry to `gapwise/universities.json`, a timetable adapter and failing fixture test, and empty campus/academic snapshots. It creates no product screen or style copy. The new entry has `status: scaffold`, routing disabled, and no invented buildings, entrances, or paths.

## Add evidence and ingestion

1. Confirm the timetable export format and implement `gapwise/src/universities/<id>/adapter.ts`. Return canonical `ParsedTimetable` meetings with stable identifiers, weekdays, times, campus, location, and date ranges. Keep source-specific interpretation inside the adapter.
2. Add source-backed buildings, aliases, footprints, entrances, and pedestrian edges to `data/universities/<id>/campus.json`. Preserve source IDs, attribution, rights, and unknown access values. Follow the shared schemas in `data/schemas/universities/`.
3. Optionally run `gapwise data osm <id> --bbox=west,south,east,north`. This creates unreviewed OpenStreetMap candidates only. Inspect their provenance and geometry; do not promote candidate entrances or routes without review.
4. Run the campus sync in `gapwise`: `bun scripts/sync-campus-data.ts --write`. This mirrors validated snapshots and generates the compact map catalog. The routing graph is loaded separately when needed.
5. Add a real timetable fixture test and review the manifest's host, campus list, feature flags, and status. Enable routing only where path connectivity and access evidence justify it.

## Verify and deploy

```sh
node cli/bin/gapwise.mjs data validate tmu
node cli/bin/gapwise.mjs university validate tmu
node cli/bin/gapwise.mjs university test tmu
node cli/bin/gapwise.mjs university dev tmu
```

Run the `gapwise` typecheck, lint, unit tests, production build, and browser tests. Check desktop and mobile map selection, timetable import, Today, gap calculations, and route states. The local development URL uses `?university=tmu`; production host resolution uses the manifest. Configure DNS and the hosting provider for `tmu.gapwise.ca`, then verify the preview and live host before announcing support.

Changes to Today, TimetableGrid, GapPlan, CampusMap, DayRoute, shared navigation, or global CSS should be justified as product-wide changes. Adding another institution ordinarily changes the manifest, adapter, data, fixtures, and deployment configuration only.
