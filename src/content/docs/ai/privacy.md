---
title: Privacy & security
description: The private-data boundary for Gapwise AI integrations.
---

The public [Gapwise API](/api/) exposes campus intelligence and no student account data. Gapwise AI is a separate OAuth-protected path for **explicitly delegated** private context.

## What a student can delegate

The minimized Gapwise AI snapshot can expose only the categories enabled by the student's delegation and the tool being called. Depending on those permissions, that can include source-backed academic schedule facts, deterministic Gapwise gap-plan context, and selected planning/routing preferences.

Tool results are scoped interfaces to that delegated snapshot—not an unrestricted account export.

## What the delegated snapshot excludes

The current Gapwise AI boundary deliberately excludes:

- the original ACORN `.ics` file;
- friend and friend-overlap data;
- precise or live location;
- Supabase access and refresh tokens;
- Gapwise's primary private-data DEK/KEK encryption keys;
- unrestricted database credentials;
- unrelated browser state.

OAuth identity does not itself grant timetable or write access. Fine-grained authority is controlled separately by the student's Gapwise AI delegation.

## Storage and runtime boundary

Delegated snapshots and queued actions are encrypted before database storage using Gapwise AI's separate encryption domain. This is **not zero-knowledge encryption**: authorized plaintext exists transiently in the Gapwise AI runtime while an authorized tool request is processed.

Bearer tokens are not persisted by Gapwise AI.

The external AI provider may separately process prompts and tool results visible to its client. Students should review that provider's retention, training, and workspace policies; those provider policies are outside Gapwise's own delegation controls.

## Safe integration checklist

- Use the canonical MCP resource and browser-based OAuth flow.
- Ask for the least useful authority and prefer reads.
- Keep academic meetings read-only.
- Minimize private data copied into prompts, logs, and analytics.
- Never log credentials, authorization artifacts, or encryption material.
- Show the target and intended effect before a write when the client UX requires confirmation.
- Treat a successful write as **queued for Gapwise**, not immediately applied canonical state.
- Handle stale revisions by reading again, not force-overwriting.
- Stop on revocation or authorization failure.

For deeper review, see the [`ai` privacy model](https://github.com/GapwiseHQ/ai/blob/main/docs/PRIVACY.md), [threat model](https://github.com/GapwiseHQ/ai/blob/main/docs/THREAT_MODEL.md), and [security policy](https://github.com/GapwiseHQ/ai/blob/main/SECURITY.md).
