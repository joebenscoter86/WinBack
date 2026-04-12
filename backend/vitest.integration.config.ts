import { defineConfig } from "vitest/config";
import path from "path";

// Load .env.local so the test can talk to real dev Supabase.
// process.loadEnvFile is built into Node 20.12+, no dotenv dependency needed.
// In CI, .env.local doesn't exist — env vars are injected by the workflow,
// so swallow ENOENT and let the test's own assertion in dispute-wizard-flow.test.ts
// surface a clear error if required vars are actually missing.
try {
  process.loadEnvFile(path.resolve(__dirname, ".env.local"));
} catch (err) {
  if ((err as NodeJS.ErrnoException).code !== "ENOENT") throw err;
}

export default defineConfig({
  test: {
    globals: true,
    include: ["__tests__/integration/**/*.test.ts"],
    // Integration tests hit real dev Supabase and walk multiple routes
    // end-to-end. Vitest's default 5s per-test timeout is too tight —
    // runs clock between 3s and 8s depending on network latency, and
    // flaked during initial verification. Give generous headroom.
    testTimeout: 30_000,
    hookTimeout: 30_000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
});
