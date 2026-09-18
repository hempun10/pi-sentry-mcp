# Contributing

## Setup

```bash
npm install
npm run check
npm test
```

Node 20+.

## What to change here

This package owns URL building, settings/env merge, and runtime registration with pi-mcp-adapter.

Do not add wrappers or tests for Sentry tools such as `search_issues`. Those live on `https://mcp.sentry.dev/mcp`.

## Pull requests

1. Branch from `main`.
2. Keep the diff small.
3. `npm test` and `npm run check` must pass.
4. Update README or CHANGELOG when behavior changes.

## Release (maintainers)

```bash
npm version patch
git push --follow-tags
npm publish --access public
```

Git installs can pin a tag: `pi install git:github.com/hempun10/pi-sentry-mcp@v0.2.0`.
