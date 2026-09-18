# Security

This package registers Sentry's hosted MCP URL with [pi-mcp-adapter](https://github.com/nicobailon/pi-mcp-adapter). The adapter stores OAuth tokens. This repo does not.

Do not commit Sentry auth tokens, `.env` files, or `settings.json` dumps.

## Report a vulnerability

File a [GitHub security advisory](https://github.com/hempun10/pi-sentry-mcp/security/advisories/new). Do not open a public issue for token leaks or auth bugs.

For bugs in Sentry's MCP server, report them to [Sentry](https://sentry.io/security/).
