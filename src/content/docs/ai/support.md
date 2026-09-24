---
title: Support & troubleshooting
description: Connect, revoke, and troubleshoot Gapwise AI connectors without exposing credentials or private student data.
---

For ordinary Gapwise help, use [gapwise.ca/support](https://gapwise.ca/support) or email `support@gapwise.ca`. For suspected security vulnerabilities, follow the private reporting path at [gapwise.ca/security](https://gapwise.ca/security) or email `security@gapwise.ca`.

Never send passwords, OAuth authorization codes, bearer tokens, encryption keys, or another student's private timetable information in a support request.

## Connector will not link

1. Sign in to Gapwise.
2. Enable Gapwise AI delegation.
3. Add/connect the canonical MCP service: `https://ai.gapwise.ca/api/mcp` when the client asks for a custom remote MCP URL.
4. Complete the Gapwise OAuth consent flow.
5. Approve only the Gapwise permissions you want the client to receive.

Supported clients should discover OAuth from the MCP service. Do not paste a Supabase/Gapwise access token into a connector configuration field.

## Schedule information is missing

Confirm that the timetable is current inside Gapwise and that the corresponding AI read permission is enabled. Gapwise deliberately does not guess missing classes, rooms, availability, routes, or gap assessments.

## A write fails

Gap-preference changes require explicit write permission and the current Gapwise AI snapshot revision. A stale, conflicting, or semantically unsafe write is expected to fail closed. Refresh the current context and retry only if the requested change still fits. Personal Item writes are retired.

Imported/source-backed academic meetings cannot be created, edited, or deleted through the AI connector.

## Revoke and reconnect

Revoke AI access from Gapwise to remove delegated connector state/actions and client approval. Private MCP reads/writes should then fail until the user explicitly authorizes again. If reconnecting, repeat the normal client OAuth flow rather than reusing an old token.

## Public campus tools

The UTM building/routing/gap-window tools are stateless public campus intelligence. They do not indicate that a client has access to the user's private timetable or live location.

## Service health

Check [status.gapwise.ca](https://status.gapwise.ca/) for current service information and `https://ai.gapwise.ca/api/health` when diagnosing the MCP service itself.
