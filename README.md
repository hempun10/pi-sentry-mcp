# pi-sentry-mcp

[![CI](https://github.com/hempun10/pi-sentry-mcp/actions/workflows/ci.yml/badge.svg)](https://github.com/hempun10/pi-sentry-mcp/actions/workflows/ci.yml)

Talk to Sentry from Pi. After you sign in, the agent can search issues, events, and traces on Sentry's MCP at https://mcp.sentry.dev/mcp.

You need Pi, [pi-mcp-adapter](https://github.com/nicobailon/pi-mcp-adapter), and a Sentry account.

## Install

```bash
pi install npm:pi-mcp-adapter
pi install git:github.com/hempun10/pi-sentry-mcp@v0.2.0
```

Restart Pi or run `/reload`, then run `/mcp-auth sentry` and sign in in the browser.

pi-mcp-adapter stores the OAuth token. This repo never sees it.

If Pi says `pi-mcp-adapter is not installed`, install that package and reload.

## Limit to one org or project

The default URL is `https://mcp.sentry.dev/mcp`. That can reach every org your account can access.

Put `sentryMcp` in `.pi/settings.json` for this project, or in `~/.pi/agent/settings.json` for every project. `.pi/settings.json` overrides the user file.

| Field | Required | Source | What it does |
| --- | --- | --- | --- |
| `url` | no | settings | Full MCP URL. Ignores organization and project. |
| `organization` | no | settings or `SENTRY_ORG` | Uses `https://mcp.sentry.dev/mcp/{org}` |
| `project` | no | settings or `SENTRY_PROJECT` | Needs organization. Uses `https://mcp.sentry.dev/mcp/{org}/{project}` |
| `experimental` | no | settings or `SENTRY_MCP_EXPERIMENTAL=1` | Adds `?experimental=1` to the built URL |

```json
{
  "sentryMcp": {
    "organization": "my-org",
    "project": "my-project"
  }
}
```

If you set `project`, you must also set `organization`.

## Call it

The server name is `sentry`.

```text
mcp({ search: "unresolved issues", server: "sentry" })
mcp({ tool: "search_issues", args: { organizationSlug: "my-org", query: "is:unresolved" } })
```

Paste Sentry issue URLs as they are. Write `org/project` as organizationSlug/projectSlug.

Sentry lists tools at [mcp.sentry.dev](https://mcp.sentry.dev/). Sentry can add or remove tools without a change in this repo.

## What this repo does not do

It does not implement `search_issues` or other Sentry tools. Those run on Sentry's server.

It is not `sentry-cli`. It is not a self-hosted MCP. For self-hosted Sentry, set `sentryMcp.url` to your MCP endpoint.

## Develop

```bash
npm install
npm run check
npm test
```

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[MIT](LICENSE)
