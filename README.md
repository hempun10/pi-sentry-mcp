# pi-sentry-mcp

Pi package for [Sentry MCP](https://mcp.sentry.dev/). Ships the hosted HTTP server plus a Sentry skill. OAuth runs through [pi-mcp-adapter](https://github.com/nicobailon/pi-mcp-adapter).

## Install

```bash
pi install npm:pi-mcp-adapter
pi install npm:pi-sentry-mcp
```

Or from git:

```bash
pi install git:github.com/hempun10/pi-sentry-mcp
```

Restart Pi or `/reload`. First use: `/mcp-auth pi-sentry-mcp__sentry`.

## Scope (optional)

Default URL is unscoped (`https://mcp.sentry.dev/mcp`). Override in `.mcp.json` or `~/.pi/agent/mcp.json`:

```json
{
  "mcpServers": {
    "pi-sentry-mcp__sentry": {
      "url": "https://mcp.sentry.dev/mcp/{organizationSlug}/{projectSlug}"
    }
  }
}
```

## Publish

```bash
npm login
npm publish --access public
git tag v0.1.0
git push --tags
```

Then install with `pi install npm:pi-sentry-mcp@0.1.0`.

## Verify

```bash
npm test
```
