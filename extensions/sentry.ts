import { readFileSync } from "node:fs";
import { join } from "node:path";

import { getAgentDir, type ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { Effect } from "effect";

import {
  mcpUrl,
  type Registration,
  registerSentryMcp,
  resolveSettings,
} from "../src/sentry-mcp.ts";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const readJson = (path: string) => {
  try {
    return JSON.parse(readFileSync(path, "utf8")) as unknown;
  } catch {
    return undefined;
  }
};

const sentryMcpValue = (value: unknown) =>
  isRecord(value) ? value.sentryMcp : undefined;

export const loadSentryMcpValue = (cwd = process.cwd(), agentDir = getAgentDir()) =>
  sentryMcpValue(readJson(join(cwd, ".pi/settings.json"))) ??
  sentryMcpValue(readJson(join(agentDir, "settings.json")));

export default function (pi: ExtensionAPI) {
  let registration: Registration | undefined;

  pi.on("session_start", async (_event, ctx) => {
    if (registration) return;

    const program = resolveSettings(loadSentryMcpValue(), process.env).pipe(
      Effect.map(mcpUrl),
      Effect.flatMap((url) =>
        registerSentryMcp((channel, data) => pi.events.emit(channel, data), url),
      ),
      Effect.tap((next) =>
        Effect.sync(() => {
          registration = next;
        }),
      ),
      Effect.catchTag("AdapterMissing", (error) =>
        Effect.sync(() => {
          ctx.ui.notify(error.reason, "error");
        }),
      ),
      Effect.catchTag("ConfigInvalid", (error) =>
        Effect.sync(() => {
          ctx.ui.notify(`sentry mcp: ${error.reason}`, "error");
        }),
      ),
    );

    await Effect.runPromise(program);
  });

  pi.on("session_shutdown", async () => {
    const current = registration;
    registration = undefined;
    await current?.dispose();
  });
}
