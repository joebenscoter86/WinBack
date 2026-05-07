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
    process.env.STRIPE_SECRET_KEY_LIVE = "sk_live_x";
    process.env.STRIPE_SECRET_KEY_TEST = "sk_test_x";
    process.env.STRIPE_APP_SECRET = "absec_x";
    process.env.STRIPE_WEBHOOK_SECRET_LIVE = "whsec_live_x";
    process.env.STRIPE_WEBHOOK_SECRET_TEST = "whsec_test_x";
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

  it("trims whitespace from webhook secrets so a Vercel-paste newline doesn't break verification", async () => {
    // Stripe's SDK explicitly diagnoses whitespace in signing secrets; we
    // normalize at the env boundary so every consumer is safe.
    setRequiredVars();
    process.env.STRIPE_WEBHOOK_SECRET_LIVE = "  whsec_live_x\n";
    process.env.STRIPE_WEBHOOK_SECRET_TEST = "\nwhsec_test_x  ";
    process.env.STRIPE_BILLING_WEBHOOK_SECRET = "whsec_b\n";
    const { readEnv } = await import("../env");
    const e = readEnv();
    expect(e.STRIPE_WEBHOOK_SECRET_LIVE).toBe("whsec_live_x");
    expect(e.STRIPE_WEBHOOK_SECRET_TEST).toBe("whsec_test_x");
    expect(e.STRIPE_BILLING_WEBHOOK_SECRET).toBe("whsec_b");
  });

  describe("livemode env vars", () => {
    // Override with distinguishable values so the assertion proves we're returning the right slot
    function setModeScopedVars() {
      process.env.STRIPE_SECRET_KEY_LIVE = "sk_live_a";
      process.env.STRIPE_SECRET_KEY_TEST = "sk_test_a";
      process.env.STRIPE_WEBHOOK_SECRET_LIVE = "whsec_live_a";
      process.env.STRIPE_WEBHOOK_SECRET_TEST = "whsec_test_a";
    }

    it("requires STRIPE_SECRET_KEY_LIVE/_TEST and STRIPE_WEBHOOK_SECRET_LIVE/_TEST", async () => {
      setRequiredVars();
      delete process.env.STRIPE_SECRET_KEY_LIVE;
      delete process.env.STRIPE_SECRET_KEY_TEST;
      delete process.env.STRIPE_WEBHOOK_SECRET_LIVE;
      delete process.env.STRIPE_WEBHOOK_SECRET_TEST;
      const { readEnv } = await import("../env");
      // All four missing-var names should appear in the single error message.
      expect(() => readEnv()).toThrow(
        /STRIPE_SECRET_KEY_LIVE.*STRIPE_SECRET_KEY_TEST.*STRIPE_WEBHOOK_SECRET_LIVE.*STRIPE_WEBHOOK_SECRET_TEST/
      );
    });

    it("returns the mode-scoped values when present", async () => {
      setRequiredVars();
      setModeScopedVars();
      const { readEnv } = await import("../env");
      const e = readEnv();
      expect(e.STRIPE_SECRET_KEY_LIVE).toBe("sk_live_a");
      expect(e.STRIPE_SECRET_KEY_TEST).toBe("sk_test_a");
      expect(e.STRIPE_WEBHOOK_SECRET_LIVE).toBe("whsec_live_a");
      expect(e.STRIPE_WEBHOOK_SECRET_TEST).toBe("whsec_test_a");
    });
  });
});
