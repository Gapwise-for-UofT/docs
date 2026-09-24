---
title: Security overview
description: Gapwise architecture, security controls, trust boundaries, and current assurance limits.
---

import { Aside, Card, CardGrid } from '@astrojs/starlight/components';

**Document status:** public technical overview · **Reviewed:** 2026-08-28 · **Scope:** Gapwise web/PWA, public API, and optional Gapwise AI/MCP service

This overview is for students, developers, and institutional privacy or security reviewers. It describes controls supported by the current public implementation record without representing Gapwise as independently audited, certified, or endorsed by the University of Toronto.

<Aside type="caution" title="Precise encryption terminology">
Gapwise is **not described as end-to-end encrypted or zero knowledge**. Private state is encrypted in the browser before sync, but the first-party application and its same-origin JavaScript are inside the trust boundary. The server-side key broker also participates in authorized key release. A compromised authorized runtime could access plaintext while the application is using it.
</Aside>

## Claim key

Every substantive statement in this document uses one of these evidence classes:

| Marker | Meaning |
| --- | --- |
| **Implementation-verified** | Supported by current source, checked configuration, or a maintained machine-readable contract. |
| **Process commitment** | A practice Gapwise commits to follow; it is not an independent assessment or guarantee. |
| **Confirmation required** | Requires owner, provider, legal, operational, or independent-review evidence before a stronger public claim can be made. |

## Security posture at a glance

<CardGrid>
  <Card title="Local timetable import" icon="document">
    **Implementation-verified.** ACORN `.ics` parsing occurs in the browser. Gapwise does not ask for an ACORN password, and the original file is not sent through the public API or optional AI snapshot.
  </Card>
  <Card title="Private sync state" icon="lock">
    **Implementation-verified.** Supported private application state is encrypted by the browser before server storage. This is application-layer encryption with a server/key-broker boundary—not an end-to-end or zero-knowledge claim.
  </Card>
  <Card title="Separate developer surfaces" icon="seti:network">
    **Implementation-verified.** The unauthenticated v1 API serves public campus intelligence. Private AI access uses a distinct OAuth-protected resource plus an explicit, revocable Gapwise delegation.
  </Card>
  <Card title="Assurance status" icon="information">
    **Confirmation required.** No independent penetration-test result, formal security audit, SOC 2 or ISO 27001 certification, university approval, provider-residency claim, or availability commitment is asserted here.
  </Card>
</CardGrid>

See the [reviewer architecture and data-flow diagram](/platform/architecture/) for system boundaries and flows.

## Architecture and trust boundaries

**Implementation-verified.** Gapwise separates four principal surfaces:

1. the student's browser, where ACORN import and ordinary private-state use occur;
2. the core Gapwise boundary, including authentication, account-scoped APIs, encrypted-state storage, and authorized key brokering;
3. the unauthenticated public campus API, which does not read student sessions or private state; and
4. the optional Gapwise AI service, which receives only a permission-filtered snapshot and bounded queued actions after separate OAuth and student-delegation checks.

TLS protects network transport to deployed HTTPS services. Browser-side application-layer encryption additionally protects supported private sync payloads at rest in the database. It does not remove the browser, same-origin code, authentication service, key broker, or authorized runtime from the security model.

## Browser-local ACORN processing

**Implementation-verified.** The student selects an exported ACORN `.ics` file; parsing and normalization happen locally in the browser. The raw file is not an input to the public API, is excluded from AI delegation, and is not the synced private payload. Derived schedule data needed for product features may be represented in encrypted private state and, only when enabled, in a minimized AI snapshot.

**Process commitment.** Changes to timetable import should preserve local raw-file processing or explicitly update the privacy/security record before release.

## Authentication and sessions

**Implementation-verified.** Core account authentication is handled through the product's configured authentication provider. Requests for private account operations require an authenticated user context; authorization is not inferred from a client-supplied account identifier alone. Browser sessions and transport security are separate from private-state encryption.

For optional AI access, a valid OAuth credential for the protected MCP resource authenticates the caller, while a separate Gapwise delegation determines permitted private categories and actions. OAuth identity alone is not timetable permission. Revocation removes delegated state/actions and subsequent private calls fail closed. See [Authentication & delegation](/ai/authentication/).

**Confirmation required.** Provider-console session settings, production identity-provider settings, and operational access reviews require current provider/dashboard evidence before an institutional review relies on them.

## Encrypted private-state design

**Implementation-verified.** The browser encrypts supported private state before synchronization. The stored record is associated with the authenticated account, and authorized key-broker behavior is required for normal recovery/use across sessions or devices. Cryptographic keys are not part of the public API or the Gapwise AI delegated snapshot. Gapwise AI uses a separate encryption domain for its own snapshots and queued actions.

This design reduces exposure from direct database-record disclosure. It does **not** protect against every first-party runtime compromise: plaintext necessarily exists in an authorized browser while features operate, and authorized server-side components participate in key release. Malicious same-origin JavaScript is therefore **inside**, not outside, the trust boundary.

## Authorization and account isolation

**Implementation-verified.** Private operations bind authorization to the authenticated account, and database policies/account-scoped access provide an additional isolation layer. Privileged service access is reserved for bounded server-side paths rather than shipped to browsers. AI snapshot and action records are bound to a delegation and checked for current authority.

**Process commitment.** New private tables and server operations must receive explicit ownership/authorization review, least-privilege access, and negative cross-account tests before release.

**Confirmation required.** These controls have not been represented as independently penetration-tested. Production policy parity and privileged access membership require provider/owner confirmation.

## AI and MCP permission boundary

**Implementation-verified.** Private MCP execution requires both verified OAuth authority and an active student grant. Results are tool-scoped rather than unrestricted account exports. The delegated snapshot excludes the raw ACORN file, friends, precise/live location, core session tokens, primary private-state keys, unrestricted database credentials, and unrelated browser state.

Academic timetable meetings are read-only. The sole current write capability updates gap preferences with the relevant permission and current revision, queuing typed intent for the first-party app rather than directly rewriting canonical encrypted state. Personal Item tools are retired. See [Permissions & writes](/ai/permissions/) and the CI-checked [tool catalog](/ai/tools/).

Authorized plaintext exists transiently in the Gapwise AI runtime during a permitted request, so this service is not zero knowledge. The external AI client/provider may separately process content visible in prompts and tool results under its own policies.

## Secure development and delivery

**Implementation-verified (this documentation service).** Pull-request and main-branch CI installs the locked dependency graph, validates Astro content/types, verifies the MCP contract and brand invariants, audits configured deployment headers, audits production dependencies at high severity, and builds the production site. Workflow actions and direct package versions are pinned. Deployment configuration sets HSTS, anti-sniffing, framing, referrer, cross-domain, and restrictive browser capability headers.

**Process commitment (ecosystem).** Security-relevant changes should receive focused review, preserve fail-closed authorization, add regression coverage, and reconcile public claims with authoritative implementation before release. Dependencies and reported vulnerabilities are triaged by reachability, impact, and remediation availability; urgent fixes may be released outside a normal cadence.

**Confirmation required.** CI success is not an independent code audit, penetration test, certification, or proof that all vulnerability classes are absent.

## Secrets, logs, and errors

**Process commitment.** Secrets belong in managed runtime configuration, never source, browser bundles, examples, tickets, logs, or documentation. Access should be least-privileged and credentials rotated when exposure is suspected. Public error responses should be useful but avoid credentials, cryptographic material, private payloads, stack traces, and internal infrastructure detail. Operational logs should minimize personal content, use structured security-relevant events where needed, and avoid authorization artifacts and encryption material.

**Confirmation required.** Production secret-store configuration, log destinations, retention, access membership, alert routing, and deletion behavior require owner/provider console evidence. No provider residency or retention duration is claimed here.

## Vulnerability and incident management

**Process commitment.** Reports should be sent through the current repository [security reporting path](https://github.com/Gapwise-for-UofT/gapwise/security). Gapwise will validate scope, preserve evidence, contain exposure, rotate affected credentials where appropriate, remediate, test, and coordinate communication based on impact. Reporters should not include unnecessary student data in a report. AI-service findings can also follow its [security policy](https://github.com/Gapwise-for-UofT/ai/blob/main/SECURITY.md).

Incident handling prioritizes student safety and data protection: identify affected boundaries, limit further access, preserve a decision log, involve relevant providers, assess notification obligations, restore safely, and document follow-up work. These are process commitments, not guaranteed response times or a claim about historical incident counts. Formal public vulnerability-disclosure and incident-response materials will remain linked here as those separately reviewed artifacts are published.

## Data minimization and third parties

**Implementation-verified.** The public API is intentionally limited to campus intelligence and accepts no account session for v1 resources. Raw ACORN files remain browser-local. AI access is optional, category-limited, revocable, and separated from core keys/tokens. Tool schemas reject arbitrary execution primitives and constrain supported inputs/actions.

**Process commitment.** A third party should be introduced only for a defined purpose and minimum data category, with changes reflected in the maintained trust inventory and user-facing material. Contractual terms, retention, security posture, jurisdiction, and deletion support require review appropriate to the data involved.

**Confirmation required.** Provider processing/storage regions, contractual safeguards, subprocessor chains, backups, recovery targets, and deletion completion cannot be inferred from application source and need current owner/provider evidence.

## Limitations and validation register

The following are deliberately **not claimed**:

- end-to-end encryption or zero-knowledge architecture;
- protection from malicious same-origin/authorized first-party JavaScript;
- independent penetration testing or a completed third-party audit;
- SOC 2, ISO 27001, or another certification;
- a particular provider data-residency region, backup/recovery objective, or uptime level;
- University of Toronto or UTM approval, affiliation, procurement acceptance, or endorsement.

Before an institutional decision, a human reviewer should confirm production configuration parity, provider and contractual facts, privileged-access membership, logging/retention settings, incident contacts, recovery evidence, and any independent assessment results. Gapwise is an independent service, not an official University of Toronto service.

## Evidence map

| Topic | Public evidence | Class |
| --- | --- | --- |
| Public/private API separation and local import | [Platform privacy](/platform/privacy/) | Implementation-verified |
| OAuth plus student delegation | [Authentication & delegation](/ai/authentication/) | Implementation-verified |
| AI exclusions and encryption boundary | [AI privacy & security](/ai/privacy/) | Implementation-verified |
| Read-only academics and bounded queued writes | [Permissions & writes](/ai/permissions/) and [live tool manifest](https://github.com/Gapwise-for-UofT/docs/blob/main/contracts/mcp-live-surface.json) | Implementation-verified |
| Core maintainer security policy | [`SECURITY.md`](https://github.com/Gapwise-for-UofT/gapwise/blob/main/SECURITY.md) | Implementation/process evidence |
| Private-cloud design record | [`docs/architecture/private-cloud.md`](https://github.com/Gapwise-for-UofT/gapwise/blob/main/docs/architecture/private-cloud.md) | Implementation design evidence |
| AI threat and privacy model | [Threat model](https://github.com/Gapwise-for-UofT/ai/blob/main/docs/THREAT_MODEL.md) and [privacy model](https://github.com/Gapwise-for-UofT/ai/blob/main/docs/PRIVACY.md) | Implementation/process evidence |
| Docs CI and deployment headers | [Docs CI](https://github.com/Gapwise-for-UofT/docs/blob/main/.github/workflows/ci.yml) and [deployment configuration](https://github.com/Gapwise-for-UofT/docs/blob/main/vercel.json) | Implementation-verified |

Public records explain design and checked behavior; they do not turn process evidence into independent assurance. This page should be reviewed whenever a trust boundary, processor, authentication flow, encryption design, or AI permission changes.
