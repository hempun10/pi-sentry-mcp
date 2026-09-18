import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

test("package ships sentry MCP over OAuth", () => {
  const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
  assert.equal(pkg.pi.mcp, "./mcp.json");
  assert.deepEqual(pkg.pi.skills, ["./skills"]);
  assert.ok(pkg.keywords.includes("pi-package"));

  const mcp = JSON.parse(readFileSync(join(root, "mcp.json"), "utf8"));
  const sentry = mcp.mcpServers.sentry;
  assert.equal(sentry.url, "https://mcp.sentry.dev/mcp");
  assert.equal(sentry.auth, "oauth");
});
