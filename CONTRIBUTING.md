# Contributing

## Setup

```bash
npm install
npm run check
npm test
```

Use Node 20 or newer.

## What to change here

This package builds the MCP URL, reads settings and env, and registers the server with pi-mcp-adapter.

Do not add wrappers or tests for Sentry tools such as `search_issues`. Those live on `https://mcp.sentry.dev/mcp`.

## Pull requests

1. Branch from `main`.
2. Keep the diff small.
3. `npm test` and `npm run check` must pass.
4. Update README or CHANGELOG when behavior changes.

## Release for maintainers

```bash
npm version patch
git push --follow-tags
npm publish --access public
```

Pin a git install with a tag:

```bash
pi install git:github.com/hempun10/pi-sentry-mcp@v0.2.0
```
