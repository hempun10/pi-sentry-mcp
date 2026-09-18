# Contributing

## Setup

```bash
npm install
npm run check
npm test
```

Use Node 20 or newer.

Landing page:

```bash
cd site
npm install
npm run dev
```

## What to change here

This package builds the MCP URL, reads settings and env, and registers the server with pi-mcp-adapter.

Do not add wrappers or tests for Sentry tools such as `search_issues`. Those live on `https://mcp.sentry.dev/mcp`.

The site lives in `site/` as Vite plus Svelte. It is not part of the npm tarball.

## Pull requests

1. Branch from `main`.
2. Keep the diff small.
3. `npm test` and `npm run check` must pass. If you touch `site/`, run `npm run build` there too.
4. Update README or CHANGELOG when behavior changes.

## Release for maintainers

```bash
npm version patch
git push --follow-tags
npm publish --access public
```

Install the published package with:

```bash
pi install npm:pi-sentry-mcp
```
