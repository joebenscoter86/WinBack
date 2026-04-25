import { describe, it, expect, beforeEach, afterEach } from "vitest";

describe("env module", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    // Start from a clean slate each test.
    for (const k of Object.keys(process.env)) {
      delete process.env[k];
    }
  });

  afterEach(() => {
    for (const k of Object.keys(process.env)) {
      delete process.env[k];
    }
    Object.assign(process.env, originalEnv);
  });

  function setRequiredVars() {
    process.env.STRIPE_SECRET_KEY = "sk_test_x";
    process.env.STRIPE_APP_SECRET = "absec_x";
    process.env.STRIPE_WEBHOOK_SECRET = "whsec_x";
    process.env.STRIPE_BILLING_WEBHOOK_SECRET = "whsec_b";
    process.env.STRIPE_PRICE_PRO_MONTHLY = "price_pro";
    process.env.STRIPE_PRICE_USAGE_FEE = "price_usage";
    process.env.UPGRADE_LINK_SECRET = "a".repeat(32);
    process.env.SUPABASE_URL = "https://x.supabase.co";
    process.env.SUPABASE_SERVICE_ROLE_KEY = "svc-key";
    process.env.ANTHROPIC_API_KEY = "sk-ant-x";
  }

  it("readEnv returns all required vars when present", async () => {
    setRequiredVars();
    const { readEnv } = await import("../env");
    const env = readEnv();
    expect(env.STRIPE_SECRET_KEY).toBe("sk_test_x");
    expect(env.STRIPE_PRICE_PRO_MONTHLY).toBe("price_pro");
    expect(env.UPGRADE_LINK_SECRET).toHaveLength(32);
  });

  it("readEnv throws when a required var is missing", async () => {
    setRequiredVars();
    delete process.env.STRIPE_PRICE_PRO_MONTHLY;
    const { readEnv } = await import("../env");
    expect(() => readEnv()).toThrow(/STRIPE_PRICE_PRO_MONTHLY/);
  });

  it("readEnv throws when a required var is empty string", async () => {
    setRequiredVars();
    process.env.STRIPE_APP_SECRET = "";
    const { readEnv } = await import("../env");
    expect(() => readEnv()).toThrow(/STRIPE_APP_SECRET/);
  });

  it("readEnv error lists all missing vars at once", async () => {
    setRequiredVars();
    delete process.env.STRIPE_PRICE_PRO_MONTHLY;
    delete process.env.STRIPE_PRICE_USAGE_FEE;
    const { readEnv } = await import("../env");
    try {
      readEnv();
      throw new Error("expected readEnv to throw");
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      expect(msg).toMatch(/STRIPE_PRICE_PRO_MONTHLY/);
      expect(msg).toMatch(/STRIPE_PRICE_USAGE_FEE/);
    }
  });

  it("SENTRY_DSN is optional and returns undefined when absent", async () => {
    setRequiredVars();
    const { readEnv } = await import("../env");
    const env = readEnv();
    expect(env.SENTRY_DSN).toBeUndefined();
  });

  it("UPGRADE_LINK_SECRET must be at least 32 chars", async () => {
    setRequiredVars();
    process.env.UPGRADE_LINK_SECRET = "tooshort";
    const { readEnv } = await import("../env");
    expect(() => readEnv()).toThrow(/UPGRADE_LINK_SECRET.*32/);
  });
});
