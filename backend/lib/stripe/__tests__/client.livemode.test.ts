import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock the stripe constructor so we can inspect which key was used.
vi.mock("stripe", () => {
  const ctor = vi.fn(function (this: unknown, key: string) {
    (this as { _key: string })._key = key;
    (this as { disputes: unknown }).disputes = {
      list: vi.fn(async () => ({ data: [{ _key: key }] })),
      retrieve: vi.fn(async () => ({ id: "dp_x", _key: key })),
    };
    (this as { charges: unknown }).charges = {
      retrieve: vi.fn(async () => ({ id: "ch_x", _key: key })),
    };
    (this as { customers: unknown }).customers = {
      retrieve: vi.fn(async () => ({ id: "cus_x", _key: key })),
    };
    (this as { paymentIntents: unknown }).paymentIntents = {
      retrieve: vi.fn(async () => ({ id: "pi_x", _key: key })),
    };
    (this as { files: unknown }).files = {
      retrieve: vi.fn(async () => ({ id: "file_x", url: "https://example.com/x", _key: key })),
      create: vi.fn(async () => ({ id: "file_combined", _key: key })),
    };
  });
  return { default: ctor as unknown as typeof import("stripe").default };
});

beforeEach(() => {
  process.env.STRIPE_SECRET_KEY = "sk_test_legacy";
  process.env.STRIPE_SECRET_KEY_LIVE = "sk_live_a";
  process.env.STRIPE_SECRET_KEY_TEST = "sk_test_a";
  vi.resetModules();
});

describe("stripe client (mode-aware)", () => {
  it("listDisputes uses live key when livemode=true", async () => {
    const { listDisputes } = await import("../client");
    const result = await listDisputes(true, "acct_1", { limit: 1 });
    expect((result[0] as { _key: string })._key).toBe("sk_live_a");
  });

  it("listDisputes uses test key when livemode=false", async () => {
    const { listDisputes } = await import("../client");
    const result = await listDisputes(false, "acct_1", { limit: 1 });
    expect((result[0] as { _key: string })._key).toBe("sk_test_a");
  });

  it("getDispute uses the matching mode's client", async () => {
    const { getDispute } = await import("../client");
    const live = await getDispute(true, "acct_1", "dp_1");
    const test = await getDispute(false, "acct_1", "dp_1");
    expect((live as unknown as { _key: string })._key).toBe("sk_live_a");
    expect((test as unknown as { _key: string })._key).toBe("sk_test_a");
  });
});
