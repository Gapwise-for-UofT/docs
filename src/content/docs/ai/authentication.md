---
title: Authentication & delegation
description: How Gapwise separates OAuth client authorization from student-granted AI authority.
---

Connecting an MCP transport does not by itself grant access to private Gapwise data. Private requests cross two separate boundaries:

1. **OAuth authorization:** the client proves that it may call the protected MCP resource.
2. **Gapwise delegation:** the signed-in student explicitly chooses which Gapwise capabilities and data categories the integration may exercise.

The canonical protected resource is:

```text
https://ai.gapwise.ca/api/mcp
```

Its discovery metadata is published at:

```text
https://ai.gapwise.ca/.well-known/oauth-protected-resource
```

Compatible clients should follow that metadata and the browser authorization flow rather than constructing authorization URLs themselves.

## OAuth does not equal timetable permission

Gapwise AI's protected resource requires a valid third-party OAuth credential for the canonical MCP audience. The minimal advertised OAuth identity scope is `email`, but that scope is **not** a timetable or write permission.

Fine-grained authority lives in the student's explicit Gapwise AI delegation. A client can therefore be correctly OAuth-authenticated and still be refused a schedule read or write that the student did not delegate.

## Cross-account isolation

Private AI access is intentionally protected by overlapping controls rather than one database rule.

- Supabase RLS binds AI rows to `auth.uid()` and separately restricts OAuth-client access to explicitly approved user/client pairs.
- The MCP resource server verifies the Supabase token, subject, issuer, expiry, OAuth client identity, protected-resource audience, and required scope before a private tool runs.
- Gapwise AI independently checks returned delegation, pending-action, and approved-client rows and rejects any row whose `user_id` does not exactly match the cryptographically verified caller.
- Delegation and action inserts are rejected if application code attempts to use an owner ID different from the authenticated caller.
- Delegated snapshots/actions are cryptographically bound to the caller identity in their separate encryption domain.

The application ownership assertion is defense in depth: it does not replace RLS or OAuth policy. Its purpose is to make a hypothetical upstream/RLS regression fail closed before another user's row can be consumed by the AI service.

## Read and write authority

Read and write access are separate. A read grant does not imply write access. The current bounded write covers gap preferences; imported academic timetable meetings remain read-only.

See [Permissions & writes](/ai/permissions/) for the `expectedRevision`, queueing, and stale-write contract.

## Discovery without private data

The MCP transport allows unauthenticated initialization and tool discovery so a compatible client can discover the service and its authentication requirement without receiving timetable content. Protected tool execution remains fail-closed until the caller is verified and the relevant delegation is active.

## Revocation and reauthorization

Revoking delegation removes the student's delegated snapshot/actions and later private access fails closed. A previously authorized client cannot treat its old authority as still valid for Gapwise private data.

Reauthorization is a fresh decision. The student reviews permissions again, and the integration must use the newly issued authority and current state. Old queued intent must not be silently replayed under the new grant.

## Verification status

The code/database isolation boundary has automated cross-account and ownership regression coverage. Named external clients are a separate evidence gate: ChatGPT, Claude, or another product is not described as fully verified until its real OAuth/read/write/revoke, cross-account refusal, stale-write, and re-auth matrix has completed against the release state.

The [`ai` authentication documentation](https://github.com/GapwiseHQ/ai/blob/main/docs/AUTH.md) contains deeper resource-server and token-validation details for maintainers and security review.
