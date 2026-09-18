import { Data, Effect, ParseResult, Schema } from "effect";

export const SERVER_NAME = "sentry";
export const DEFAULT_MCP_URL = "https://mcp.sentry.dev/mcp";
export const MCP_RUNTIME_REGISTER_EVENT = "pi-mcp-adapter:runtime-register:v1";

export class ConfigInvalid extends Data.TaggedError("ConfigInvalid")<{
  reason: string;
}> {}

export class AdapterMissing extends Data.TaggedError("AdapterMissing")<{
  reason: string;
}> {}

export const SentryMcpSettings = Schema.Struct({
  url: Schema.optional(Schema.String),
  organization: Schema.optional(Schema.String),
  project: Schema.optional(Schema.String),
  experimental: Schema.optional(Schema.Boolean),
});

type Env = Record<string, string | undefined>;

export type Registration = { dispose(): Promise<void> };

export type RuntimeRegistrationRequest = {
  version: 1;
  name: string;
  definition: { url: string; auth: "oauth" };
  result?:
    | { ok: true; registration: Registration }
    | { ok: false; error: Error };
};

const blank = (value?: string) => {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
};

export const resolveSettings = (value: unknown = {}, env: Env = {}) =>
  Schema.decodeUnknown(SentryMcpSettings)(value).pipe(
    Effect.mapError(
      (error) =>
        new ConfigInvalid({
          reason: ParseResult.TreeFormatter.formatErrorSync(error),
        }),
    ),
    Effect.flatMap((settings) => {
      const url = blank(settings.url);
      const organization = blank(settings.organization) ?? blank(env.SENTRY_ORG);
      const project = blank(settings.project) ?? blank(env.SENTRY_PROJECT);
      const experimental =
        settings.experimental === true || env.SENTRY_MCP_EXPERIMENTAL === "1";

      if (project && !organization) {
        return Effect.fail(
          new ConfigInvalid({ reason: "project requires organization" }),
        );
      }

      return Effect.succeed({ url, organization, project, experimental });
    }),
  );

export const mcpUrl = (settings: {
  url?: string;
  organization?: string;
  project?: string;
  experimental?: boolean;
}) => {
  if (settings.url) return settings.url;

  let url = DEFAULT_MCP_URL;
  if (settings.organization) {
    url += `/${settings.organization}`;
    if (settings.project) url += `/${settings.project}`;
  }
  if (settings.experimental) url += "?experimental=1";
  return url;
};

export const registerSentryMcp = (
  emit: (channel: string, data: RuntimeRegistrationRequest) => void,
  url: string,
) =>
  Effect.try({
    try: () => {
      const request: RuntimeRegistrationRequest = {
        version: 1,
        name: SERVER_NAME,
        definition: { url, auth: "oauth" },
      };
      emit(MCP_RUNTIME_REGISTER_EVENT, request);
      if (!request.result) {
        throw new Error("pi-mcp-adapter is not installed");
      }
      if (!request.result.ok) throw request.result.error;
      return request.result.registration;
    },
    catch: (error) =>
      new AdapterMissing({
        reason: error instanceof Error ? error.message : String(error),
      }),
  });
