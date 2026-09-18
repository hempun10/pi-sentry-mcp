---
name: sentry
description: Sentry production errors, issues, traces, performance, Seer, and docs via hosted MCP.
---

# Sentry

Reach Sentry through `pi-mcp-adapter`. Server name: `sentry`.

## Auth

If MCP status is `needs-auth`, tell the user to run `/mcp-auth sentry`. Do not invent a token.

## Calls

1. `mcp({ search: "<task>", server: "sentry" })`
2. `mcp({ describe: "<path>" })` when args are unclear
3. `mcp({ tool: "<path>", args: { ... } })`

If you need several calls, use `mcpScript`. Pass Sentry URLs through unchanged. `org/project` is organizationSlug/projectSlug. Do not look them up first.

- Grouped issues: `search_issues`
- Counts, trends, logs, replays: `search_events`
- One issue, event, or trace URL: `get_sentry_resource` or `get_issue_details`
- Seer or root cause: `analyze_issue_with_seer` only when asked, or when issue details are not enough
