# pi-sentry-mcp

[![CI](https://github.com/hempun10/pi-sentry-mcp/actions/workflows/ci.yml/badge.svg)](https://github.com/hempun10/pi-sentry-mcp/actions/workflows/ci.yml)

Pi package that connects [Pi](https://pi.dev) to [Sentry's hosted MCP](https://mcp.sentry.dev/) (`https://mcp.sentry.dev/mcp`). It registers that server at runtime through [pi-mcp-adapter](https://github.com/nicobailon/pi-mcp-adapter) and ships a skill so the agent knows when to search Sentry.

This package does not implement Sentry tools. Issue search, event lookup, Seer, docs, and project management stay on Sentry's server. After OAuth, Pi calls them through the adapter's `mcp` tool.

## When to use it

Use this when you already run Pi and want the agent to read or triage Sentry data in the same session as your code.

Do not use this as a Sentry API client, a replacement for `sentry-cli`, or a self-hosted MCP server. For self-hosted Sentry, point `sentryMcp.url` at your own MCP endpoint or use Sentry's stdio server.

## Prerequisites

- [Pi](https://github.com/earendil-works/pi-mono) with [pi-mcp-adapter](https://github.com/nicobailon/pi-mcp-adapter) installed
- A Sentry account
- Node.js 20+ only if you are developing this repo

## Install

```bash
pi install npm:pi-mcp-adapter
pi install git:github.com/hempun10/pi-sentry-mcp@v0.2.0
```

Restart Pi or run `/reload`.

## Authenticate

The first connection opens a browser OAuth flow:

```text
/mcp-auth sentry
```

The adapter stores tokens. This repo never sees them.

If Pi reports `pi-mcp-adapter is not installed`, install that package first and reload.

## Configure

Default URL: `https://mcp.sentry.dev/mcp` (all orgs you can access).

Optional `sentryMcp` in `.pi/settings.json` (project) or `~/.pi/agent/settings.json` (user). Project wins.

| Field | Required | Source | Effect |
| --- | --- | --- | --- |
| `url` | no | settings | Full MCP URL. Wins over org/project. |
| `organization` | no | settings or `SENTRY_ORG` | Scopes to `.../mcp/{org}` |
| `project` | no | settings or `SENTRY_PROJECT` | Requires organization. Scopes to `.../mcp/{org}/{project}` |
| `experimental` | no | settings or `SENTRY_MCP_EXPERIMENTAL=1` | Appends `?experimental=1` on the built URL |

```json
{
  "sentryMcp": {
    "organization": "my-org",
    "project": "my-project"
  }
}
```

`project` without `organization` is rejected.

## Use from Pi

Server name: `sentry`.

```text
mcp({ search: "unresolved issues", server: "sentry" })
mcp({ tool: "search_issues", args: { organizationSlug: "my-org", query: "is:unresolved" } })
```

Pass Sentry issue URLs through unchanged. `org/project` means organizationSlug/projectSlug.

Sentry's current tools (issues, events, traces, Seer, docs, projects) are listed at [mcp.sentry.dev](https://mcp.sentry.dev/). They change on Sentry's side.

## Development

```bash
npm install
npm run check
npm test
```

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[MIT](LICENSE)
