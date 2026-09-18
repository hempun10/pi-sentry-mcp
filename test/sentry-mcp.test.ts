import assert from "node:assert/strict";
import test from "node:test";

import { Effect } from "effect";

import {
  AdapterMissing,
  ConfigInvalid,
  DEFAULT_MCP_URL,
  MCP_RUNTIME_REGISTER_EVENT,
  mcpUrl,
  type RuntimeRegistrationRequest,
  registerSentryMcp,
  resolveSettings,
  SERVER_NAME,
} from "../src/sentry-mcp.ts";

test("builds hosted MCP url from org, project, experimental", () => {
  assert.equal(mcpUrl({}), DEFAULT_MCP_URL);
  assert.equal(
    mcpUrl({ organization: "acme" }),
    "https://mcp.sentry.dev/mcp/acme",
  );
  assert.equal(
    mcpUrl({ organization: "acme", project: "web" }),
    "https://mcp.sentry.dev/mcp/acme/web",
  );
  assert.equal(
    mcpUrl({ organization: "acme", project: "web", experimental: true }),
    "https://mcp.sentry.dev/mcp/acme/web?experimental=1",
  );
  assert.equal(
    mcpUrl({ url: "https://mcp.sentry.dev/mcp/other", organization: "acme" }),
    "https://mcp.sentry.dev/mcp/other",
  );
});

test("merges settings and env, fails closed on project without org", async () => {
  const merged = await Effect.runPromise(
    resolveSettings({ organization: " acme " }, { SENTRY_PROJECT: "web" }),
  );
  assert.deepEqual(merged, {
    url: undefined,
    organization: "acme",
    project: "web",
    experimental: false,
  });

  const missingOrg = await Effect.runPromise(
    resolveSettings({ project: "web" }, {}).pipe(Effect.flip),
  );
  assert.ok(missingOrg instanceof ConfigInvalid);
  assert.equal(missingOrg.reason, "project requires organization");
});

test("registers sentry MCP over the adapter event bus", async () => {
  const dispose = async () => {};
  let captured:
    | { channel: string; data: RuntimeRegistrationRequest }
    | undefined;

  const registration = await Effect.runPromise(
    registerSentryMcp((channel, data) => {
      captured = { channel, data };
      data.result = { ok: true, registration: { dispose } };
    }, DEFAULT_MCP_URL),
  );

  assert.ok(captured);
  assert.equal(registration.dispose, dispose);
  assert.equal(captured.channel, MCP_RUNTIME_REGISTER_EVENT);
  assert.equal(captured.data.name, SERVER_NAME);
  assert.equal(captured.data.definition.url, DEFAULT_MCP_URL);
  assert.equal(captured.data.definition.auth, "oauth");

  const missing = await Effect.runPromise(
    registerSentryMcp(() => {}, DEFAULT_MCP_URL).pipe(Effect.flip),
  );
  assert.ok(missing instanceof AdapterMissing);
  assert.equal(missing.reason, "pi-mcp-adapter is not installed");
});
