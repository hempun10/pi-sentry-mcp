# pi-sentry-mcp

Pi package for [Sentry MCP](https://mcp.sentry.dev/). Registers the hosted HTTP server at runtime through [pi-mcp-adapter](https://github.com/nicobailon/pi-mcp-adapter) and ships a Sentry skill.

Config is Effect Schema. URL is built from settings or env.

## Install

```bash
pi install npm:pi-mcp-adapter
pi install git:github.com/hempun10/pi-sentry-mcp@v0.2.0
```

Restart Pi or `/reload`. First use: `/mcp-auth sentry`.

## Scope

Default URL is `https://mcp.sentry.dev/mcp`. Optional `sentryMcp` in `~/.pi/agent/settings.json` or `.pi/settings.json`:

```json
{
  "sentryMcp": {
    "organization": "my-org",
    "project": "my-project"
  }
}
```

Env fallbacks: `SENTRY_ORG`, `SENTRY_PROJECT`, `SENTRY_MCP_EXPERIMENTAL=1`. A full `url` in settings wins.

## Publish

```bash
npm login
npm publish --access public
git tag v0.2.0
git push --tags
```

## Verify

```bash
npm install
npm run check
npm test
```
