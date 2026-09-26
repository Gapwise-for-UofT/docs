---
title: Tools
description: "The 20 tools in the Gapwise AI MCP surface: seven public UTM campus tools and thirteen permissioned student-context tools."
---

The Gapwise AI MCP surface contains **20 tools**: seven stateless public UTM campus-intelligence tools, twelve permissioned private read/status/planning tools, and one bounded private write tool.

This catalog is checked against a synchronized copy of AI's [machine-readable live-surface manifest](https://github.com/GapwiseHQ/ai/blob/main/contracts/mcp-live-surface.json). The AI runtime remains authoritative for schemas returned by MCP discovery.

Academic meetings remain source-backed and read-only. Tool handlers do not accept arbitrary SQL, JavaScript, URLs, graph nodes, or generic execute instructions.

## Public campus intelligence

Public tools do **not** require a Gapwise account and do not read a student's timetable, account, friends, precise location, or private sync state.

| Tool | Purpose |
| --- | --- |
| `list_utm_buildings` | List canonical UTM buildings with Gapwise routing/accessibility coverage and provenance. |
| `search_utm_buildings` | Search canonical buildings by code, official name, or alias with deterministic ranking and match reasons. |
| `get_utm_building` | Resolve a canonical UTM building by code, official name, or known alias; unknown or ambiguous values fail closed. |
| `search_utm_places` | Search canonical UTM places with bounded results and explicit provenance. |
| `get_utm_place` | Retrieve a canonical place by stable identifier without inventing missing access or location facts. |
| `route_between_utm_buildings` | Run Gapwise's deterministic building-to-building routing engine and preserve routed/approximate/unavailable status, verification, time/distance, accessibility state, confidence, and warnings. |
| `plan_utm_gap_window` | Run Gapwise's deterministic gap-assessment engine for an explicit free window between two UTM buildings and explicit supplied preferences. It does not discover a user's private free time. |

## Private read, status, and planning tools

Private tools require a verified OAuth caller and the relevant non-revoked Gapwise AI delegation permissions.

| Tool | Purpose |
| --- | --- |
| `get_ai_delegation_status` | Return delegation state, revision, and permissions without timetable content. |
| `get_my_day` | Return source-backed academic meetings, reserved assessment placeholders, and delegated deterministic gap context for one calendar date. |
| `get_my_week` | Return the normalized delegated timetable for one academic term, with reserved assessment placeholders separate from hard commitments and delegated gap context. |
| `search_my_schedule` | Search delegated meetings by course, section, building, or room and distinguish hard commitments from assessment placeholders. |
| `get_my_course_context` | Resolve a delegated course, report ambiguity and data-quality flags, and separate academic meetings from assessment placeholders. |
| `get_my_schedule_range` | Return date-specific occurrences for 1–14 days, respecting recurrence ranges and exclusions. |
| `get_my_gap_plan` | Return the exact delegated Gapwise assessment for one named gap window, including route/timing/confidence facts already computed by Gapwise. |
| `get_my_ai_preferences` | Return only planning/routing preferences explicitly delegated to AI. |
| `get_my_decision_context` | Return compact term-level planning context: hard schedule load, assessment placeholders, Gapwise gap opportunities, route uncertainty, revision/freshness, and permitted preferences. |
| `find_my_available_windows` | Find source-backed free windows for one date or term weekday. Without explicit bounds, it does not invent wake/sleep or edge-of-day availability. |
| `find_my_weekly_opportunities` | Search all seven weekdays (Monday–Sunday) for usable planning windows while respecting delegated Gapwise activity budgets and route state. |
| `check_my_plan_feasibility` | Check a proposed personal block against delegated hard conflicts and, when applicable, the authoritative activity envelope/transition state for a delegated Gapwise gap. |

## Bounded private write tools

| Tool | Purpose |
| --- | --- |
| `update_gap_preferences` | Queue a bounded partial gap-preference update. Requires preference-write delegation and the current `expectedRevision`. |

A successful write means **queued for Gapwise**, not that an AI client directly rewrote the student's canonical encrypted state. Personal Item tools are retired; legacy compatibility schemas do not expose them. Optional idempotency keys support safe exact retries.

Models should read again before making a dependent change because a queued action is not equivalent to immediate canonical-state mutation.

## Combining private and public tools

A client can first use delegated schedule/availability tools to establish a user's exact free window and surrounding buildings, then call the stateless public route or explicit gap-window tools. The public tools must not be represented as having discovered private timetable or location information themselves.

For machine-readable argument and output schemas, use the schemas returned by MCP tool discovery from the [canonical service](/ai/connect/). For deeper implementation detail, see the [`ai` tool contract](https://github.com/GapwiseHQ/ai/blob/main/docs/TOOL_CONTRACT.md).
