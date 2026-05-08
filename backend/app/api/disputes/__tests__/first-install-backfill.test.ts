import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/stripe-auth", () => ({
  withStripeAuth:
    (handler: (req: Request, ctx: unknown) => Promise<Response>) =>
    async (req: Request) => {
      const body = await req.clone().json();
      return handler(req, {
        identity: { userId: "usr_1", accountId: "acct_test_x" },
        body,
        livemode: body.livemode === true,
      });
    },
}));

const listDisputesMock = vi.fn();
vi.mock("@/lib/stripe", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/stripe")>();
  return {
    ...actual,
    listDisputes: listDisputesMock,
  };
});

vi.mock("@/lib/merchants", () => ({
  ensureMerchant: vi.fn(async () => undefined),
}));

const reconcileMock = vi.fn();
vi.mock("@/lib/webhooks/reconcile-disputes", () => ({
  reconcileDisputes: reconcileMock,
}));

const sentryMock = vi.fn();
vi.mock("@/lib/sentry", () => ({ captureRouteError: sentryMock }));

interface MerchantRow {
  id: string;
  disputes_backfilled_at_test: string | null;
  disputes_backfilled_at_live: string | null;
}

const supabaseState: { merchant: MerchantRow | null } = { merchant: null };
const updateSpy = vi.fn(() => Promise.resolve({ error: null }));

vi.mock("@/lib/supabase", () => ({
  supabase: {
    from: (table: string) => {
      if (table === "merchants") {
        return {
          select: () => ({
            eq: () => ({
              maybeSingle: async () => ({
                data: supabaseState.merchant,
                error: null,
              }),
            }),
          }),
          update: (payload: Record<string, unknown>) => {
            updateSpy.mockClear();
            updateSpy.mockImplementationOnce(() => {
              // Capture which column is being stamped.
              (updateSpy as unknown as { lastPayload?: unknown }).lastPayload = payload;
              return Promise.resolve({ error: null });
            });
            return { eq: updateSpy };
          },
        };
      }
      if (table === "disputes") {
        return {
          select: () => ({
            eq: () => ({
              eq: () => ({
                in: async () => ({ data: [], error: null }),
              }),
            }),
          }),
        };
      }
      throw new Error(`unexpected table ${table}`);
    },
  },
}));

beforeEach(() => {
  listDisputesMock.mockReset();
  listDisputesMock.mockResolvedValue([]);
  reconcileMock.mockReset();
  reconcileMock.mockResolvedValue({
    merchant_count: 1,
    disputes_seen: 0,
    disputes_upserted: 0,
    status_refreshes: 0,
    truncated: false,
    errors: [],
  });
  sentryMock.mockReset();
  updateSpy.mockClear();
});

async function callRoute(livemode: boolean) {
  const { POST } = await import("../route");
  const req = new Request("https://x/api/disputes", {
    method: "POST",
    headers: { "stripe-signature": "stub" },
    body: JSON.stringify({
      user_id: "usr_1",
      account_id: "acct_test_x",
      livemode,
    }),
  });
  return POST(req as unknown as import("next/server").NextRequest);
}

describe("/api/disputes first-install backfill", () => {
  it("runs backfill once when disputes_backfilled_at_test is null", async () => {
    supabaseState.merchant = {
      id: "merch-1",
      disputes_backfilled_at_test: null,
      disputes_backfilled_at_live: null,
    };
    await callRoute(false);
    expect(reconcileMock).toHaveBeenCalledOnce();
    expect(reconcileMock).toHaveBeenCalledWith(false, "acct_test_x");
    // Stamps the test column on the merchant row.
    expect(
      (updateSpy as unknown as { lastPayload?: Record<string, unknown> })
        .lastPayload,
    ).toHaveProperty("disputes_backfilled_at_test");
  });

  it("stamps disputes_backfilled_at_live on a livemode call", async () => {
    supabaseState.merchant = {
      id: "merch-1",
      disputes_backfilled_at_test: null,
      disputes_backfilled_at_live: null,
    };
    await callRoute(true);
    expect(reconcileMock).toHaveBeenCalledWith(true, "acct_test_x");
    expect(
      (updateSpy as unknown as { lastPayload?: Record<string, unknown> })
        .lastPayload,
    ).toHaveProperty("disputes_backfilled_at_live");
  });

  it("does NOT re-run backfill once the stamp is set", async () => {
    supabaseState.merchant = {
      id: "merch-1",
      disputes_backfilled_at_test: "2026-04-01T00:00:00Z",
      disputes_backfilled_at_live: null,
    };
    await callRoute(false);
    expect(reconcileMock).not.toHaveBeenCalled();
    expect(updateSpy).not.toHaveBeenCalled();
  });

  it("backfill failure does not break the list response", async () => {
    supabaseState.merchant = {
      id: "merch-1",
      disputes_backfilled_at_test: null,
      disputes_backfilled_at_live: null,
    };
    reconcileMock.mockRejectedValueOnce(new Error("stripe down"));
    const res = await callRoute(false);
    expect(res.status).toBe(200);
    expect(sentryMock).toHaveBeenCalled();
    // We still stamp so retries don't loop forever; alternatively this could
    // be argued the other way (retry next call) but stamping is safer
    // because the merchant can always trigger the same flow via the
    // daily cron, and the inline path is just a UX nicety.
    expect(updateSpy).toHaveBeenCalled();
  });

  it("test and live stamps are independent", async () => {
    // Test mode already backfilled, live mode not yet.
    supabaseState.merchant = {
      id: "merch-1",
      disputes_backfilled_at_test: "2026-04-01T00:00:00Z",
      disputes_backfilled_at_live: null,
    };
    await callRoute(true);
    expect(reconcileMock).toHaveBeenCalledOnce();
    expect(reconcileMock).toHaveBeenCalledWith(true, "acct_test_x");
  });
});
