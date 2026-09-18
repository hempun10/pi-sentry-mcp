import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [svelte()],
  base: process.env.GITHUB_PAGES === "1" ? "/pi-sentry-mcp/" : "/",
});
