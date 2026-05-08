import { describe, it, expect, vi, beforeEach } from "vitest";
import type Stripe from "stripe";

const { supabaseMock, listAllPagesMock, getDisputeMock, handleEventMock } =
  vi.hoisted(() => ({
    supabaseMock: { from: vi.fn() },
    listAllPagesMock: vi.fn(),
    getDisputeMock: vi.fn(),
    handleEventMock: vi.fn(),
  }));

vi.mock("@/lib/supabase", () => ({ supabase: supabaseMock }));
vi.mock("@/lib/stripe", () => ({
  listDisputesAllPages: listAllPagesMock,
  getDispute: getDisputeMock,
}));
vi.mock("../handle-dispute-event", () => ({
  handleDisputeEvent: handleEventMock,
}));

import { reconcileDisputes } from "../reconcile-disputes";

const ACCOUNT_ID = "acct_test_1";
const MERCHANT_ID = "merch-uuid-1";

function mockDispute(
  id: string,
  status: string,
  created = Math.floor(Date.now() / 1000) - 86400,
): Stripe.Dispute {
  return {
    id,
    status,
    created,
    livemode: false,
    amount: 1000,
    currency: "usd",
    charge: "ch_x",
    reason: "fraudulent",
    network_reason_code: "10.4",
    evidence_details: { due_by: 0, has_evidence: false, past_due: false, submission_count: 0 },
  } as unknown as Stripe.Dispute;
}

interface MerchantState {
  id: string;
  last_reconciled_at_test: string | null;
  last_reconciled_at_live: string | null;
}

function setup({
  merchant,
  localOpens = [],
}: {
  merchant: MerchantState | null;
  localOpens?: Array<{ stripe_dispute_id: string }>;
}) {
  const stampSpy = vi.fn(() => Promise.resolve({ error: null }));
  supabaseMock.from.mockImplementation((table: string) => {
    if (table === "merchants") {
      return {
        select: () => ({
          eq: () => ({
            maybeSingle: () => Promise.resolve({ data: merchant, error: null }),
          }),
        }),
        update: () => ({ eq: stampSpy }),
      };
    }
    if (table === "disputes") {
      return {
        select: () => ({
          eq: () => ({
            eq: () => ({
              in: () => Promise.resolve({ data: localOpens, error: null }),
            }),
          }),
        }),
      };
    }
    throw new Error(`unexpected table ${table}`);
  });
  return { stampSpy };
}

describe("reconcileDisputes", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    handleEventMock.mockResolvedValue(undefined);
    listAllPagesMock.mockResolvedValue({ disputes: [], truncated: false });
    getDisputeMock.mockReset();
  });

  it("returns empty result when merchant doesn't exist", async () => {
    setup({ merchant: null });
    const result = await reconcileDisputes(false, ACCOUNT_ID);
    expect(result.disputes_seen).toBe(0);
    expect(listAllPagesMock).not.toHaveBeenCalled();
  });

  it("uses 90-day window when last_reconciled_at_{mode} is null", async () => {
    setup({
      merchant: {
        id: MERCHANT_ID,
        last_reconciled_at_test: null,
        last_reconciled_at_live: null,
      },
    });
    await reconcileDisputes(false, ACCOUNT_ID);
    const params = listAllPagesMock.mock.calls[0][2];
    const ninetyDaysAgo = Math.floor((Date.now() - 90 * 86_400_000) / 1000);
    // gte is the 90-day floor when no prior reconcile exists. Allow a few
    // seconds of slack for test execution.
    expect(params.created.gte).toBeGreaterThanOrEqual(ninetyDaysAgo - 5);
    expect(params.created.gte).toBeLessThanOrEqual(ninetyDaysAgo + 5);
  });

  it("uses last_reconciled_at minus 1d overlap when set and inside the 90d floor", async () => {
    const oneDayAgoIso = new Date(Date.now() - 86_400_000).toISOString();
    setup({
      merchant: {
        id: MERCHANT_ID,
        last_reconciled_at_test: oneDayAgoIso,
        last_reconciled_at_live: null,
      },
    });
    await reconcileDisputes(false, ACCOUNT_ID);
    const params = listAllPagesMock.mock.calls[0][2];
    const expected = Math.floor((Date.now() - 2 * 86_400_000) / 1000);
    expect(params.created.gte).toBeGreaterThanOrEqual(expected - 5);
    expect(params.created.gte).toBeLessThanOrEqual(expected + 5);
  });

  it("floors the window at 90 days even when last_reconciled_at is much older", async () => {
    // 200d ago — older than the 90-day floor. We must NOT scan all 200d.
    const twoHundredDaysAgo = new Date(Date.now() - 200 * 86_400_000).toISOString();
    setup({
      merchant: {
        id: MERCHANT_ID,
        last_reconciled_at_test: twoHundredDaysAgo,
        last_reconciled_at_live: null,
      },
    });
    await reconcileDisputes(false, ACCOUNT_ID);
    const params = listAllPagesMock.mock.calls[0][2];
    const ninetyDaysAgo = Math.floor((Date.now() - 90 * 86_400_000) / 1000);
    expect(params.created.gte).toBeGreaterThanOrEqual(ninetyDaysAgo - 5);
  });

  it("upserts every dispute returned by the listing pass", async () => {
    setup({
      merchant: {
        id: MERCHANT_ID,
        last_reconciled_at_test: null,
        last_reconciled_at_live: null,
      },
    });
    listAllPagesMock.mockResolvedValueOnce({
      disputes: [
        mockDispute("dp_1", "needs_response"),
        mockDispute("dp_2", "lost"),
      ],
      truncated: false,
    });
    const result = await reconcileDisputes(false, ACCOUNT_ID);
    expect(handleEventMock).toHaveBeenCalledTimes(2);
    expect(result.disputes_upserted).toBe(2);
    expect(result.disputes_seen).toBe(2);
  });

  it("refreshes locally-known opens that the listing pass didn't touch (status drift)", async () => {
    setup({
      merchant: {
        id: MERCHANT_ID,
        last_reconciled_at_test: null,
        last_reconciled_at_live: null,
      },
      localOpens: [
        { stripe_dispute_id: "dp_old_open" }, // outside listing window
        { stripe_dispute_id: "dp_recent" }, // already in listing pass
      ],
    });
    listAllPagesMock.mockResolvedValueOnce({
      disputes: [mockDispute("dp_recent", "needs_response")],
      truncated: false,
    });
    getDisputeMock.mockResolvedValueOnce(mockDispute("dp_old_open", "lost"));

    const result = await reconcileDisputes(false, ACCOUNT_ID);

    // Only dp_old_open should be re-fetched -- dp_recent was already in the list.
    expect(getDisputeMock).toHaveBeenCalledOnce();
    expect(getDisputeMock).toHaveBeenCalledWith(false, ACCOUNT_ID, "dp_old_open");
    expect(result.status_refreshes).toBe(1);
    // Two upserts total: one from list pass, one from drift pass.
    expect(handleEventMock).toHaveBeenCalledTimes(2);
  });

  it("surfaces truncated=true when pagination cap is hit", async () => {
    setup({
      merchant: {
        id: MERCHANT_ID,
        last_reconciled_at_test: null,
        last_reconciled_at_live: null,
      },
    });
    listAllPagesMock.mockResolvedValueOnce({
      disputes: [mockDispute("dp_1", "lost")],
      truncated: true,
    });
    const result = await reconcileDisputes(false, ACCOUNT_ID);
    expect(result.truncated).toBe(true);
  });

  it("stamps last_reconciled_at_test on a test-mode pass", async () => {
    const { stampSpy } = setup({
      merchant: {
        id: MERCHANT_ID,
        last_reconciled_at_test: null,
        last_reconciled_at_live: null,
      },
    });
    await reconcileDisputes(false, ACCOUNT_ID);
    // The stamp is the final `.eq("id", MERCHANT_ID)` of the update chain.
    expect(stampSpy).toHaveBeenCalledOnce();
  });

  it("does not run drift pass if listing pass throws", async () => {
    setup({
      merchant: {
        id: MERCHANT_ID,
        last_reconciled_at_test: null,
        last_reconciled_at_live: null,
      },
      localOpens: [{ stripe_dispute_id: "dp_open" }],
    });
    listAllPagesMock.mockRejectedValueOnce(new Error("stripe down"));
    const result = await reconcileDisputes(false, ACCOUNT_ID);
    expect(getDisputeMock).not.toHaveBeenCalled();
    expect(result.errors[0].message).toMatch(/stripe down/);
  });

  it("continues drift pass even if a single per-id refresh throws", async () => {
    setup({
      merchant: {
        id: MERCHANT_ID,
        last_reconciled_at_test: null,
        last_reconciled_at_live: null,
      },
      localOpens: [
        { stripe_dispute_id: "dp_a" },
        { stripe_dispute_id: "dp_b" },
      ],
    });
    listAllPagesMock.mockResolvedValueOnce({ disputes: [], truncated: false });
    getDisputeMock
      .mockRejectedValueOnce(new Error("retrieve failed"))
      .mockResolvedValueOnce(mockDispute("dp_b", "lost"));
    const result = await reconcileDisputes(false, ACCOUNT_ID);
    expect(getDisputeMock).toHaveBeenCalledTimes(2);
    // dp_b succeeded.
    expect(result.status_refreshes).toBe(1);
    expect(result.errors.some((e) => /retrieve failed/.test(e.message))).toBe(true);
  });
});
