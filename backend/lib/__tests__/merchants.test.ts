import { describe, it, expect, vi, beforeEach } from "vitest";

const { mockUpsert, mockFrom } = vi.hoisted(() => {
  const mockUpsert = vi.fn().mockResolvedValue({ error: null });
  const mockFrom = vi.fn().mockReturnValue({ upsert: mockUpsert });
  return { mockUpsert, mockFrom };
});

vi.mock("@/lib/supabase", () => ({
  supabase: { from: mockFrom },
}));

import { ensureMerchant } from "../merchants";

describe("ensureMerchant", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUpsert.mockResolvedValue({ error: null });
    mockFrom.mockReturnValue({ upsert: mockUpsert });
  });

  it("should upsert merchant with stripe_account_id as conflict key", async () => {
    await ensureMerchant("acct_123", "usr_456");

    expect(mockFrom).toHaveBeenCalledWith("merchants");
    expect(mockUpsert).toHaveBeenCalledWith(
      expect.objectContaining({
        stripe_account_id: "acct_123",
      }),
      { onConflict: "stripe_account_id" },
    );
  });

  it("should include updated_at timestamp so the touch is recorded", async () => {
    await ensureMerchant("acct_123", "usr_456");

    const upsertArg = mockUpsert.mock.calls[0][0];
    expect(upsertArg.updated_at).toBeDefined();
    const ts = new Date(upsertArg.updated_at).getTime();
    expect(Date.now() - ts).toBeLessThan(5000);
  });

  it("should not write schema columns that do not exist", async () => {
    // Guards against the WIN-19 QA bug where ensureMerchant wrote
    // stripe_user_id and last_seen_at columns that do not exist in the
    // merchants table, causing the upsert to fail silently.
    await ensureMerchant("acct_123", "usr_456");

    const upsertArg = mockUpsert.mock.calls[0][0];
    expect(upsertArg.stripe_user_id).toBeUndefined();
    expect(upsertArg.last_seen_at).toBeUndefined();
  });

  it("should not throw on upsert error", async () => {
    mockUpsert.mockResolvedValueOnce({ error: { message: "db down" } });
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    await expect(ensureMerchant("acct_123", "usr_456")).resolves.not.toThrow();
    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });
});
