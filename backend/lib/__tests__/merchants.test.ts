import { describe, it, expect, vi, beforeEach } from "vitest";

const {
  mockSelect,
  mockInsert,
  mockUpdate,
  mockMaybeSingle,
  mockEq,
  mockFrom,
  mockNotifyNewInstall,
  mockAfter,
} = vi.hoisted(() => {
  const mockMaybeSingle = vi.fn();
  const mockEq = vi.fn();
  const mockSelect = vi.fn();
  const mockInsert = vi.fn();
  const mockUpdate = vi.fn();
  const mockFrom = vi.fn();
  const mockNotifyNewInstall = vi.fn();
  // Default: invoke the deferred callback synchronously so unit tests can
  // assert on its observable side effects without a real request lifecycle.
  // Individual tests can override (e.g. to assert that ensureMerchant returns
  // before the callback runs).
  const mockAfter = vi.fn((cb: () => unknown | Promise<unknown>) => {
    void Promise.resolve().then(cb);
  });
  return {
    mockSelect,
    mockInsert,
    mockUpdate,
    mockMaybeSingle,
    mockEq,
    mockFrom,
    mockNotifyNewInstall,
    mockAfter,
  };
});

vi.mock("next/server", () => ({
  after: mockAfter,
}));

vi.mock("@/lib/supabase", () => ({
  supabase: { from: mockFrom },
}));

vi.mock("@/lib/install-notifier", () => ({
  notifyNewInstall: mockNotifyNewInstall,
}));

import { ensureMerchant } from "../merchants";

function setExistingRow(row: { id: string } | null) {
  // SELECT path: from("merchants").select("id").eq("stripe_account_id", x).maybeSingle()
  mockMaybeSingle.mockResolvedValue({ data: row, error: null });
  mockEq.mockReturnValue({ maybeSingle: mockMaybeSingle });
  mockSelect.mockReturnValue({ eq: mockEq });
}

function setInsertResult(result: { error: { code?: string; message: string } | null }) {
  mockInsert.mockResolvedValue(result);
}

function setUpdateResult(result: { error: { message: string } | null }) {
  // UPDATE path: from("merchants").update({...}).eq("stripe_account_id", x)
  const eqAfterUpdate = vi.fn().mockResolvedValue(result);
  mockUpdate.mockReturnValue({ eq: eqAfterUpdate });
}

describe("ensureMerchant", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockNotifyNewInstall.mockResolvedValue(undefined);
    // Re-install the default after() implementation. vi.clearAllMocks()
    // strips call history but also any per-test overrides — the default
    // synchronous-invoke shape is what every test except the explicit
    // "deferred" case wants.
    mockAfter.mockImplementation((cb: () => unknown | Promise<unknown>) => {
      void Promise.resolve().then(cb);
    });

    // Default `from()` returns an object with all four DSL methods so the
    // call order in the implementation can wire them up however it likes.
    mockFrom.mockReturnValue({
      select: mockSelect,
      insert: mockInsert,
      update: mockUpdate,
    });

    setExistingRow(null);
    setInsertResult({ error: null });
    setUpdateResult({ error: null });
  });

  describe("when the merchant row does not exist (first install)", () => {
    beforeEach(() => {
      setExistingRow(null);
    });

    it("inserts a new merchant row keyed on stripe_account_id", async () => {
      await ensureMerchant("acct_123", "usr_456");

      expect(mockFrom).toHaveBeenCalledWith("merchants");
      expect(mockInsert).toHaveBeenCalledWith({ stripe_account_id: "acct_123" });
    });

    it("fires the install notification exactly once", async () => {
      await ensureMerchant("acct_123", "usr_456");

      // The deferred callback runs on a microtask, so let it drain.
      await new Promise((resolve) => setImmediate(resolve));

      expect(mockNotifyNewInstall).toHaveBeenCalledTimes(1);
      expect(mockNotifyNewInstall).toHaveBeenCalledWith("acct_123");
    });

    it("schedules the notification through after() so the response can flush first", async () => {
      // Capture the callback without invoking it -- ensureMerchant must NOT
      // wait on it. This guards against a regression to plain
      // fire-and-forget, which Vercel can drop when the function is torn
      // down between response-flush and microtask drain.
      let captured: (() => unknown) | null = null;
      mockAfter.mockImplementationOnce((cb: () => unknown) => {
        captured = cb;
      });

      await ensureMerchant("acct_123", "usr_456");

      expect(mockAfter).toHaveBeenCalledTimes(1);
      // Notification has NOT fired yet -- ensureMerchant returned without it.
      expect(mockNotifyNewInstall).not.toHaveBeenCalled();

      // Simulate Next.js running the deferred callback after the response.
      expect(captured).not.toBeNull();
      await captured!();

      expect(mockNotifyNewInstall).toHaveBeenCalledTimes(1);
      expect(mockNotifyNewInstall).toHaveBeenCalledWith("acct_123");
    });

    it("does NOT notify if the insert hits a unique-violation race (23505)", async () => {
      // Concurrent first-touch: another request inserted between our SELECT
      // and INSERT. Postgres rejects ours; we must NOT double-notify.
      setInsertResult({ error: { code: "23505", message: "duplicate key" } });

      await ensureMerchant("acct_123", "usr_456");
      await new Promise((resolve) => setImmediate(resolve));

      expect(mockNotifyNewInstall).not.toHaveBeenCalled();
    });

    it("does NOT throw if the insert fails for other reasons", async () => {
      setInsertResult({ error: { message: "db down" } });
      const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

      await expect(ensureMerchant("acct_123", "usr_456")).resolves.not.toThrow();

      expect(consoleSpy).toHaveBeenCalled();
      expect(mockNotifyNewInstall).not.toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe("when the merchant row already exists (returning user)", () => {
    beforeEach(() => {
      setExistingRow({ id: "merch_existing" });
    });

    it("does NOT fire the install notification", async () => {
      await ensureMerchant("acct_123", "usr_456");
      await new Promise((resolve) => setImmediate(resolve));

      expect(mockNotifyNewInstall).not.toHaveBeenCalled();
    });

    it("does NOT insert a new row", async () => {
      await ensureMerchant("acct_123", "usr_456");

      expect(mockInsert).not.toHaveBeenCalled();
    });

    it("touches updated_at on the existing row", async () => {
      await ensureMerchant("acct_123", "usr_456");

      expect(mockUpdate).toHaveBeenCalledTimes(1);
      const updateArg = mockUpdate.mock.calls[0][0];
      expect(updateArg.updated_at).toBeDefined();
      const ts = new Date(updateArg.updated_at).getTime();
      expect(Date.now() - ts).toBeLessThan(5000);
    });

    it("does NOT throw if the update fails", async () => {
      setUpdateResult({ error: { message: "db down" } });
      const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

      await expect(ensureMerchant("acct_123", "usr_456")).resolves.not.toThrow();

      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  it("does NOT throw if the SELECT itself fails", async () => {
    mockMaybeSingle.mockResolvedValue({ data: null, error: { message: "db down" } });
    mockEq.mockReturnValue({ maybeSingle: mockMaybeSingle });
    mockSelect.mockReturnValue({ eq: mockEq });
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    await expect(ensureMerchant("acct_123", "usr_456")).resolves.not.toThrow();

    expect(mockInsert).not.toHaveBeenCalled();
    expect(mockUpdate).not.toHaveBeenCalled();
    expect(mockNotifyNewInstall).not.toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it("does NOT propagate notifier failures", async () => {
    setExistingRow(null);
    mockNotifyNewInstall.mockRejectedValue(new Error("Resend down"));
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    await expect(ensureMerchant("acct_123", "usr_456")).resolves.not.toThrow();
    await new Promise((resolve) => setImmediate(resolve));

    expect(consoleSpy).toHaveBeenCalledWith(
      "notifyNewInstall failed:",
      expect.any(Error),
    );
    consoleSpy.mockRestore();
  });
});
