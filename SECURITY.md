# Security

This package registers Sentry's hosted MCP URL with [pi-mcp-adapter](https://github.com/nicobailon/pi-mcp-adapter). OAuth tokens are stored by the adapter, not by this repo.

Do not commit Sentry auth tokens, `.env` files, or `settings.json` dumps.

## Report a vulnerability

Use [GitHub Security Advisories](https://github.com/hempun10/pi-sentry-mcp/security/advisories/new). Do not open a public issue for token leaks or auth bugs.

For Sentry MCP server issues, report them to [Sentry](https://sentry.io/security/).
