---
title: Gapwise AI & MCP
description: Connect AI clients to public UTM campus intelligence and explicitly delegated Gapwise context without turning deterministic facts into model guesses.
---

Gapwise AI is the **remote Model Context Protocol (MCP) integration boundary** between an AI client and Gapwise. It exposes stateless public UTM campus intelligence plus narrowly permissioned private student context without giving a client unrestricted account access.

The client supplies the model and reasoning layer. **Gapwise supplies the canonical facts, permissions, and bounded actions.**

## Start here

| Goal | Guide |
| --- | --- |
| Connect a remote MCP client | **[Connect an AI client](/ai/connect/)** |
| Understand OAuth and explicit delegation | [Authentication & delegation](/ai/authentication/) |
| See every currently exposed tool | [Tools](/ai/tools/) |
| Understand what AI may write | [Permissions & writes](/ai/permissions/) |
| Review the data boundary | [Privacy & security](/ai/privacy/) |
| Check ChatGPT / Claude / other client status | [Client compatibility](/ai/compatibility/) |
| See realistic requests | [Examples](/ai/examples/) |
| Diagnose unsupported or failed flows | [Support & troubleshooting](/ai/support/) |

## Canonical service endpoints

Remote MCP resource:

```text
https://ai.gapwise.ca/api/mcp
```

OAuth protected-resource metadata for private tools:

```text
https://ai.gapwise.ca/.well-known/oauth-protected-resource
```

Service identity:

```text
https://ai.gapwise.ca
```

Implementation source: [github.com/GapwiseHQ/ai](https://github.com/GapwiseHQ/ai)

## Current live surface

The release surface registers **20 tools**:

- seven stateless public UTM campus-intelligence reads;
- twelve OAuth-protected private schedule/status/planning reads; and
- one bounded OAuth-protected private write.

Important boundaries:

- Public campus tools do not read a Gapwise account, private timetable, friends, or precise live location.
- Academic timetable meetings are **read-only** through AI.
- The sole current write updates delegated gap preferences with the corresponding granted permission; Personal Item tools are retired.
- Writes are revision-aware; stale state is not silently overwritten.
- Write success means Gapwise accepted a typed queued action. It does not mean the AI client directly rewrote canonical timetable state.

## API or AI & MCP?

Use the **public API / SDKs** when a conventional application integration needs UTM buildings, places, deterministic routes, or gap assessment without an MCP client.

Use **Gapwise AI & MCP** when an AI client should access the same public campus intelligence and/or explicitly delegated Gapwise student context through one tool-oriented protocol surface.

Do not use public campus tools as a way to infer private schedule state. A client can combine private availability with public routing only after private context was independently authorized and returned by a private tool.

## Two different responsibilities

**Gapwise computes facts.** Schedule state, gap calculation, availability, campus places, and routing come from Gapwise's deterministic systems.

**The AI client reasons about intent.** A model can choose which available tool to call and explain the result, but it must not present an invented schedule, route, leave-by time, or availability window as a Gapwise result.

Gapwise remains the source of truth for schedules and private state.

## Delegation and safety model

- Public campus intelligence is stateless and does not require private delegation.
- Private access starts only after the student explicitly delegates authority.
- The client receives tool results, not Gapwise encryption keys or unrestricted account access.
- Delegated state excludes the raw ACORN `.ics` file, friend data, precise/live location, account credentials, and Gapwise's primary private-state encryption keys.
- Any preference write is bounded by its granted permission.
- Revocation removes the delegated authority. A later authorization is a new grant, not silent restoration of the old one.
- A legitimate integration never needs the student's Gapwise password, a private encryption key, or a copied browser-session token.

## Client support status

The MCP service is live and public-source, but **protocol availability is not the same as verified named-client support**. Broad ChatGPT, Claude, and other external-client compatibility remains gated on current production OAuth/read/write/revoke validation.

Until those matrices are complete, these docs deliberately avoid claiming a named client is fully verified. See [Client compatibility](/ai/compatibility/) for the current status and validation expectations.

**Ready to try the protocol flow? [Connect an AI client →](/ai/connect/)**
