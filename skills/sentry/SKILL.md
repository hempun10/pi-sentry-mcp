---
name: sentry
description: Sentry production errors, issues, traces, performance, Seer, and docs via hosted MCP.
---

# Sentry

Reach Sentry through `pi-mcp-adapter`. Server name: `pi-sentry-mcp__sentry`.

## Auth

If MCP status is `needs-auth`, tell the user to run `/mcp-auth pi-sentry-mcp__sentry`. Do not invent a token.

## Calls

1. `mcp({ search: "<task>", server: "pi-sentry-mcp__sentry" })`
2. `mcp({ describe: "<path>" })` when args are unclear
3. `mcp({ tool: "<path>", args: { ... } })`

Several calls → `mcpScript`. Pass Sentry URLs through unchanged. `org/project` is organizationSlug/projectSlug — do not look them up first.

- grouped issues → `search_issues`
- counts, trends, logs, replays → `search_events`
- one issue/event/trace URL → `get_sentry_resource` or `get_issue_details`
- Seer / root cause → `analyze_issue_with_seer` only when asked or issue details are not enough
