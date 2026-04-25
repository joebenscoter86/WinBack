/**
 * Centralized env validation. `readEnv()` throws if any required var is
 * missing or empty, listing every missing var in a single error.
 *
 * Import from route handlers and long-lived modules at top level so the
 * failure surfaces at cold-start rather than at the first user action that
 * happens to read a missing var.
 */

export type Env = {
  STRIPE_SECRET_KEY: string;
  STRIPE_APP_SECRET: string;
  STRIPE_WEBHOOK_SECRET: string;
  STRIPE_BILLING_WEBHOOK_SECRET: string;
  STRIPE_PRICE_PRO_MONTHLY: string;
  STRIPE_PRICE_USAGE_FEE: string;
  UPGRADE_LINK_SECRET: string;
  SUPABASE_URL: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
  ANTHROPIC_API_KEY: string;
  SENTRY_DSN: string | undefined;
};

const REQUIRED_KEYS = [
  "STRIPE_SECRET_KEY",
  "STRIPE_APP_SECRET",
  "STRIPE_WEBHOOK_SECRET",
  "STRIPE_BILLING_WEBHOOK_SECRET",
  "STRIPE_PRICE_PRO_MONTHLY",
  "STRIPE_PRICE_USAGE_FEE",
  "UPGRADE_LINK_SECRET",
  "SUPABASE_URL",
  "SUPABASE_SERVICE_ROLE_KEY",
  "ANTHROPIC_API_KEY",
] as const;

export function readEnv(): Env {
  const missing: string[] = [];
  const tooShort: string[] = [];

  for (const key of REQUIRED_KEYS) {
    const v = process.env[key];
    if (!v || v === "") missing.push(key);
  }

  const secret = process.env.UPGRADE_LINK_SECRET;
  if (secret && secret !== "" && secret.length < 32) {
    tooShort.push("UPGRADE_LINK_SECRET must be at least 32 chars");
  }

  if (missing.length > 0 || tooShort.length > 0) {
    const parts: string[] = [];
    if (missing.length > 0) {
      parts.push(`Missing required env vars: ${missing.join(", ")}`);
    }
    if (tooShort.length > 0) {
      parts.push(tooShort.join("; "));
    }
    throw new Error(parts.join(". "));
  }

  return {
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY!,
    STRIPE_APP_SECRET: process.env.STRIPE_APP_SECRET!,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET!,
    STRIPE_BILLING_WEBHOOK_SECRET: process.env.STRIPE_BILLING_WEBHOOK_SECRET!,
    STRIPE_PRICE_PRO_MONTHLY: process.env.STRIPE_PRICE_PRO_MONTHLY!,
    STRIPE_PRICE_USAGE_FEE: process.env.STRIPE_PRICE_USAGE_FEE!,
    UPGRADE_LINK_SECRET: process.env.UPGRADE_LINK_SECRET!,
    SUPABASE_URL: process.env.SUPABASE_URL!,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY!,
    ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY!,
    SENTRY_DSN: process.env.SENTRY_DSN,
  };
}

/**
 * Cached read — call once in module scope to fail fast at boot.
 * Safe to import anywhere; throws synchronously if env is bad.
 */
let _cached: Env | null = null;
export function env(): Env {
  if (_cached) return _cached;
  _cached = readEnv();
  return _cached;
}

/** Test-only: reset the cache so tests can mutate env between cases. */
export function __resetEnvCacheForTests(): void {
  _cached = null;
}
