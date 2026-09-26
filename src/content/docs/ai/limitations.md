---
title: Limitations & troubleshooting
description: Current boundaries and safe recovery steps for Gapwise AI.
---

## Current boundaries

- Named third-party clients are not publicly marked verified until an end-to-end production test is recorded.
- Available capabilities are limited to tools registered by the deployed MCP handler and the student's delegation.
- Academic timetable meetings are read-only.
- Routing and gap results inherit the coverage and uncertainty documented by the [public API](/api/).
- An AI explanation can still be wrong; distinguish model commentary from structured Gapwise results.

## Connection fails

Confirm that the client supports remote protected MCP resources and browser-based authorization. Restart from service discovery at [ai.gapwise.ca](https://ai.gapwise.ca); do not work around the flow by pasting credentials.

## A tool is missing

Reconnect or refresh tool discovery, then check the granted permissions. A function visible in source or old documentation may be experimental, deprecated, or not registered in production.

## A write is refused

Check that the delegation includes the required write capability and that the target is writable. Academic meetings cannot be edited. For a stale-revision response, read current state and have the student reconsider the change.

## Access stops after revocation

That is expected. If the student chooses to reconnect, complete a fresh authorization and permission review. Discard old queued work; do not replay it under the new grant.

For reproducible service or security issues, use the reporting guidance in the [AI repository](https://github.com/GapwiseHQ/ai) without including private student data.
