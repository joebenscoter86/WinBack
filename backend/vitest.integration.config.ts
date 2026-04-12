import { defineConfig } from "vitest/config";
import path from "path";

// Load .env.local so the test can talk to real dev Supabase.
// process.loadEnvFile is built into Node 20.12+, no dotenv dependency needed.
process.loadEnvFile(path.resolve(__dirname, ".env.local"));

export default defineConfig({
  test: {
    globals: true,
    include: ["__tests__/integration/**/*.test.ts"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
});
