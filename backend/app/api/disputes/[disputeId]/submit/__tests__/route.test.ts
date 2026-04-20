import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import Stripe from "stripe";

// ---------------------------------------------------------------------------
// Supabase mock — vi.hoisted ensures the object is available when vi.mock
// factories run (which are hoisted to the top of the module by vitest).
// ---------------------------------------------------------------------------
const { supabaseMock } = vi.hoisted(() => ({
  supabaseMock: { from: vi.fn() },
}));
vi.mock("@/lib/supabase", () => ({ supabase: supabaseMock }));

// ---------------------------------------------------------------------------
// Stripe lib mocks
// ---------------------------------------------------------------------------
vi.mock("@/lib/stripe", () => ({
  getDispute: vi.fn(),
  getCharge: vi.fn(),
  submitDispute: vi.fn(),
  classifyStripeError: (e: { message: string }) => ({
    code: "stripe_invalid_request",
    status: 400,
    message: e.message,
  }),
}));

// ---------------------------------------------------------------------------
// Auth HOC mock — injects a fixed identity
// ---------------------------------------------------------------------------
vi.mock("@/lib/stripe-auth", () => ({
  withStripeAuth: (
    handler: (
      req: NextRequest,
      ctx: { identity: { accountId: string; userId: string } },
    ) => Promise<Response>,
  ) =>
    (req: NextRequest) =>
      handler(req, { identity: { accountId: "acct_test", userId: "usr_test" } }),
}));

vi.mock("@/lib/merchants", () => ({
  ensureMerchant: vi.fn().mockResolvedValue(undefined),
}));

// WIN-42: the route now calls getDisputeForAccount (a helper that joins
// merchants -> disputes in one query). Stub it to return the canonical
// local dispute row so individual tests don't have to wire the chained
// supabase select any more.
const { getDisputeForAccountMock } = vi.hoisted(() => ({
  getDisputeForAccountMock: vi.fn(),
}));
vi.mock("@/lib/disputes", () => ({
  getDisputeForAccount: getDisputeForAccountMock,
}));

vi.mock("@/lib/playbooks", () => ({
  getPlaybook: vi.fn(),
}));

// ---------------------------------------------------------------------------
// Evidence assembler mock — the route now delegates payload building to
// lib/disputes/assemble-evidence. Default return yields a non-empty evidence
// object so the empty-payload guard does not fire.
// ---------------------------------------------------------------------------
vi.mock("@/lib/disputes/assemble-evidence", () => ({
  assembleEvidence: vi.fn(async () => ({
    evidence: { uncategorized_text: "mocked narrative" },
    warnings: [],
    concat_receipts: [],
  })),
}));

// Stripe client helpers used by the route — just need to exist as the route
// passes them into assembleEvidence (which is mocked above).
vi.mock("@/lib/stripe/client", () => ({
  downloadStripeFile: vi.fn(),
  uploadCombinedEvidence: vi.fn(),
}));

// ---------------------------------------------------------------------------
// Import the route AFTER all mocks are registered, and pull in the mocked fns
// ---------------------------------------------------------------------------
import { POST } from "../route";
import * as stripeMod from "@/lib/stripe";
import * as playbooksMod from "@/lib/playbooks";
import * as assembleMod from "@/lib/disputes/assemble-evidence";

const assembleEvidenceMock = assembleMod.assembleEvidence as ReturnType<typeof vi.fn>;

// Typed handles to the vi.fn() instances created in the factory above
const getDisputeMock = stripeMod.getDispute as ReturnType<typeof vi.fn>;
const getChargeMock = stripeMod.getCharge as ReturnType<typeof vi.fn>;
const submitDisputeMock = stripeMod.submitDispute as ReturnType<typeof vi.fn>;
const getPlaybookMock = playbooksMod.getPlaybook as ReturnType<typeof vi.fn>;

// ---------------------------------------------------------------------------
// Test fixtures
// ---------------------------------------------------------------------------
const DISPUTE_ID = "dp_test";
const LOCAL_DISPUTE_ID = "local-uuid-1";

function mkRequest(disputeId = DISPUTE_ID): NextRequest {
  return new NextRequest(
    new URL(`http://localhost/api/disputes/${disputeId}/submit`),
    { method: "POST" },
  );
}

/** A minimal Stripe Dispute with needs_response status */
function makeStripeDispute(overrides: Partial<Stripe.Dispute> = {}): Stripe.Dispute {
  return {
    id: DISPUTE_ID,
    object: "dispute",
    amount: 1000,
    charge: "ch_test",
    currency: "usd",
    status: "needs_response",
    reason: "fraudulent",
    evidence: {},
    evidence_details: {
      due_by: Math.floor(Date.now() / 1000) + 86400, // future
      has_evidence: false,
      past_due: false,
      submission_count: 0,
    },
    is_charge_refundable: true,
    livemode: false,
    metadata: {},
    network_reason_code: null,
    payment_intent: null,
    created: Math.floor(Date.now() / 1000),
    balance_transactions: [],
    ...overrides,
  } as unknown as Stripe.Dispute;
}

/** A minimal Stripe Charge */
function makeStripeCharge(overrides: Partial<Stripe.Charge> = {}): Stripe.Charge {
  return {
    id: "ch_test",
    object: "charge",
    amount: 1000,
    currency: "usd",
    billing_details: {
      name: "John Doe",
      email: "john@example.com",
      address: null,
      phone: null,
    },
    description: "Test purchase",
    ...overrides,
  } as unknown as Stripe.Charge;
}

/** A minimal playbook */
function makePlaybook() {
  return {
    network: "visa",
    reason_code: "10.4",
    evidence_checklist: [],
    display_name: "Fraud - Card Absent",
  };
}

// ---------------------------------------------------------------------------
// Supabase chain builder helpers
// ---------------------------------------------------------------------------

/**
 * Build a chain stub that resolves to a single row (for .single() and .maybeSingle()).
 */
function singleRow(data: Record<string, unknown> | null, error: unknown = null) {
  const base = {
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    in: vi.fn().mockReturnThis(),
    order: vi.fn().mockReturnThis(),
    limit: vi.fn().mockReturnThis(),
    single: vi.fn().mockResolvedValue({ data, error }),
    maybeSingle: vi.fn().mockResolvedValue({ data, error }),
    update: vi.fn().mockReturnThis(),
    insert: vi.fn().mockReturnThis(),
  };
  return base;
}

/**
 * Build a chain stub that resolves to an array of rows (for multi-row queries).
 */
function multiRow(data: unknown[], error: unknown = null) {
  return {
    select: vi.fn().mockResolvedValue({ data, error }),
    eq: vi.fn().mockReturnThis(),
    in: vi.fn().mockReturnThis(),
    order: vi.fn().mockReturnThis(),
    limit: vi.fn().mockReturnThis(),
    single: vi.fn().mockResolvedValue({ data: data[0] ?? null, error }),
    maybeSingle: vi.fn().mockResolvedValue({ data: data[0] ?? null, error }),
  };
}

/**
 * Build a chain stub for an update operation.
 */
function updateChain(data: unknown = null, error: unknown = null) {
  const chain = {
    update: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    single: vi.fn().mockResolvedValue({ data, error }),
  };
  return chain;
}

/**
 * Build a chain for .insert().select().single() that resolves with data.
 */
function insertChain(data: Record<string, unknown> | null, error: unknown = null) {
  const chain = {
    insert: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    single: vi.fn().mockResolvedValue({ data, error }),
  };
  return chain;
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("POST /api/disputes/[disputeId]/submit", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    getPlaybookMock.mockResolvedValue(makePlaybook());
    getChargeMock.mockResolvedValue(makeStripeCharge());
    assembleEvidenceMock.mockResolvedValue({
      evidence: { uncategorized_text: "mocked narrative" },
      warnings: [],
      concat_receipts: [],
    });
    // Default: getDisputeForAccount returns a valid local dispute row.
    // Tests that need a different behavior (e.g. 404) override per-test.
    getDisputeForAccountMock.mockResolvedValue({
      data: {
        id: LOCAL_DISPUTE_ID,
        stripe_dispute_id: DISPUTE_ID,
        network: "visa",
        reason_code: "10.4",
        narrative_text: "Merchant narrative text",
      },
      error: null,
    });
  });

  // -------------------------------------------------------------------------
  // 1. Happy path
  // -------------------------------------------------------------------------
  it("happy path — returns 200 with submission_id and dispute_status", async () => {
    const stripeDispute = makeStripeDispute();
    const stripeCharge = makeStripeCharge();

    // submitDispute returns "under_review"
    const submittedDispute = makeStripeDispute({ status: "under_review" });
    submitDisputeMock.mockResolvedValueOnce(submittedDispute);

    getDisputeMock.mockResolvedValueOnce({
      ...stripeDispute,
      charge: stripeCharge, // expanded inline
    });

    // Track insert call to capture submission ID
    let capturedSubmissionId: string | null = null;

    supabaseMock.from.mockImplementation((table: string) => {
      if (table === "merchants") {
        return {
          select: vi.fn().mockReturnThis(),
          eq: vi.fn().mockReturnThis(),
          single: vi.fn().mockResolvedValue({ data: { id: "merchant-uuid" }, error: null }),
        };
      }
      if (table === "disputes") {
        // Shared chain: select returns dispute row OR handles updates
        const chain: Record<string, ReturnType<typeof vi.fn>> = {
          select: vi.fn(),
          eq: vi.fn(),
          update: vi.fn(),
          single: vi.fn(),
          maybeSingle: vi.fn(),
        };
        chain.select.mockReturnThis.call(chain);
        chain.eq.mockReturnThis.call(chain);
        chain.update.mockReturnThis.call(chain);
        // Select dispute row
        chain.select = vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({
                data: {
                  id: LOCAL_DISPUTE_ID,
                  stripe_dispute_id: DISPUTE_ID,
                  network: "visa",
                  reason_code: "10.4",
                  narrative_text: "Merchant narrative text",
                },
                error: null,
              }),
            }),
          }),
        });
        // Update disputes (for success path)
        chain.update = vi.fn().mockReturnValue({
          eq: vi.fn().mockResolvedValue({ error: null }),
        });
        return chain;
      }
      if (table === "evidence_files") {
        return {
          select: vi.fn().mockReturnValue({
            eq: vi.fn().mockResolvedValue({
              data: [
                { checklist_item_key: "receipt", stripe_file_id: "file_receipt" },
              ],
              error: null,
            }),
          }),
        };
      }
      if (table === "dispute_submissions") {
        // No existing submissions
        const submissionsSelect = {
          select: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              in: vi.fn().mockReturnValue({
                order: vi.fn().mockReturnValue({
                  limit: vi.fn().mockResolvedValue({ data: [], error: null }),
                }),
              }),
            }),
          }),
          insert: vi.fn().mockReturnValue({
            select: vi.fn().mockReturnValue({
              single: vi.fn().mockImplementation(async () => {
                capturedSubmissionId = "sub-uuid-1";
                return { data: { id: "sub-uuid-1" }, error: null };
              }),
            }),
          }),
          update: vi.fn().mockReturnValue({
            eq: vi.fn().mockResolvedValue({ error: null }),
          }),
        };
        return submissionsSelect;
      }
      return {};
    });

    const res = await POST(mkRequest());
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.data).toBeDefined();
    expect(body.data.submission_id).toBe("sub-uuid-1");
    expect(body.data.dispute_status).toBe("under_review");
    expect(submitDisputeMock).toHaveBeenCalledTimes(1);
  });

  // -------------------------------------------------------------------------
  // 2. dispute_not_submittable — Stripe status is not needs_response
  // -------------------------------------------------------------------------
  it("dispute_not_submittable — returns 409 when Stripe status is under_review", async () => {
    const stripeDispute = makeStripeDispute({ status: "under_review" });
    const stripeCharge = makeStripeCharge();

    getDisputeMock.mockResolvedValueOnce({
      ...stripeDispute,
      charge: stripeCharge,
    });

    supabaseMock.from.mockImplementation((table: string) => {
      if (table === "merchants") {
        return {
          select: vi.fn().mockReturnThis(),
          eq: vi.fn().mockReturnThis(),
          single: vi.fn().mockResolvedValue({ data: { id: "merchant-uuid" }, error: null }),
        };
      }
      if (table === "disputes") {
        return {
          select: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              eq: vi.fn().mockReturnValue({
                single: vi.fn().mockResolvedValue({
                  data: {
                    id: LOCAL_DISPUTE_ID,
                    stripe_dispute_id: DISPUTE_ID,
                    network: "visa",
                    reason_code: "10.4",
                    narrative_text: "some narrative",
                  },
                  error: null,
                }),
              }),
            }),
          }),
        };
      }
      if (table === "evidence_files") {
        return {
          select: vi.fn().mockReturnValue({
            eq: vi.fn().mockResolvedValue({ data: [], error: null }),
          }),
        };
      }
      if (table === "dispute_submissions") {
        return {
          select: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              in: vi.fn().mockReturnValue({
                order: vi.fn().mockReturnValue({
                  limit: vi.fn().mockResolvedValue({ data: [], error: null }),
                }),
              }),
            }),
          }),
        };
      }
      return {};
    });

    const res = await POST(mkRequest());
    const body = await res.json();

    expect(res.status).toBe(409);
    expect(body.code).toBe("dispute_not_submittable");
    expect(submitDisputeMock).not.toHaveBeenCalled();
  });

  // -------------------------------------------------------------------------
  // 3. validation_failed — no evidence files and narrative is null
  // -------------------------------------------------------------------------
  it("validation_failed — returns 422 when no evidence and no narrative", async () => {
    const stripeDispute = makeStripeDispute();
    const stripeCharge = makeStripeCharge();

    getDisputeMock.mockResolvedValueOnce({
      ...stripeDispute,
      charge: stripeCharge,
    });

    // Override default: this test needs narrative_text to be null so the
    // validation guard triggers.
    getDisputeForAccountMock.mockResolvedValueOnce({
      data: {
        id: LOCAL_DISPUTE_ID,
        stripe_dispute_id: DISPUTE_ID,
        network: "visa",
        reason_code: "10.4",
        narrative_text: null,
      },
      error: null,
    });

    supabaseMock.from.mockImplementation((table: string) => {
      if (table === "merchants") {
        return {
          select: vi.fn().mockReturnThis(),
          eq: vi.fn().mockReturnThis(),
          single: vi.fn().mockResolvedValue({ data: { id: "merchant-uuid" }, error: null }),
        };
      }
      if (table === "disputes") {
        return {
          select: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              eq: vi.fn().mockReturnValue({
                single: vi.fn().mockResolvedValue({
                  data: {
                    id: LOCAL_DISPUTE_ID,
                    stripe_dispute_id: DISPUTE_ID,
                    network: "visa",
                    reason_code: "10.4",
                    narrative_text: null,
                  },
                  error: null,
                }),
              }),
            }),
          }),
        };
      }
      if (table === "evidence_files") {
        return {
          select: vi.fn().mockReturnValue({
            eq: vi.fn().mockResolvedValue({ data: [], error: null }),
          }),
        };
      }
      if (table === "narrative_generations") {
        return {
          select: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              eq: vi.fn().mockReturnValue({
                order: vi.fn().mockReturnValue({
                  limit: vi.fn().mockReturnValue({
                    maybeSingle: vi.fn().mockResolvedValue({ data: null, error: null }),
                  }),
                }),
              }),
            }),
          }),
        };
      }
      if (table === "dispute_submissions") {
        // No prior submissions — idempotency check finds nothing and falls through to guard
        return {
          select: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              in: vi.fn().mockReturnValue({
                order: vi.fn().mockReturnValue({
                  limit: vi.fn().mockResolvedValue({ data: [], error: null }),
                }),
              }),
            }),
          }),
        };
      }
      return {};
    });

    const res = await POST(mkRequest());
    const body = await res.json();

    expect(res.status).toBe(422);
    expect(body.code).toBe("validation_failed");
    expect(submitDisputeMock).not.toHaveBeenCalled();
  });

  // -------------------------------------------------------------------------
  // 4. Idempotent replay — succeeded submission row exists
  // -------------------------------------------------------------------------
  it("idempotent replay — returns 200 from cached succeeded row, no Stripe call", async () => {
    const stripeDispute = makeStripeDispute();
    const stripeCharge = makeStripeCharge();

    getDisputeMock.mockResolvedValueOnce({
      ...stripeDispute,
      charge: stripeCharge,
    });

    const completedAt = new Date().toISOString();
    const succeededRow = {
      id: "sub-prev-uuid",
      status: "succeeded",
      stripe_response: { status: "under_review" },
      created_at: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      completed_at: completedAt,
      warnings: [],
    };

    supabaseMock.from.mockImplementation((table: string) => {
      if (table === "merchants") {
        return {
          select: vi.fn().mockReturnThis(),
          eq: vi.fn().mockReturnThis(),
          single: vi.fn().mockResolvedValue({ data: { id: "merchant-uuid" }, error: null }),
        };
      }
      if (table === "disputes") {
        return {
          select: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              eq: vi.fn().mockReturnValue({
                single: vi.fn().mockResolvedValue({
                  data: {
                    id: LOCAL_DISPUTE_ID,
                    stripe_dispute_id: DISPUTE_ID,
                    network: "visa",
                    reason_code: "10.4",
                    narrative_text: "some narrative",
                  },
                  error: null,
                }),
              }),
            }),
          }),
        };
      }
      if (table === "evidence_files") {
        return {
          select: vi.fn().mockReturnValue({
            eq: vi.fn().mockResolvedValue({
              data: [{ checklist_item_key: "receipt", stripe_file_id: "file_receipt" }],
              error: null,
            }),
          }),
        };
      }
      if (table === "dispute_submissions") {
        return {
          select: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              in: vi.fn().mockReturnValue({
                order: vi.fn().mockReturnValue({
                  limit: vi.fn().mockResolvedValue({ data: [succeededRow], error: null }),
                }),
              }),
            }),
          }),
        };
      }
      return {};
    });

    const res = await POST(mkRequest());
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.data.submission_id).toBe("sub-prev-uuid");
    expect(submitDisputeMock).not.toHaveBeenCalled();
  });

  // -------------------------------------------------------------------------
  // 5. submission_in_progress — fresh pending row (< 60s old)
  // -------------------------------------------------------------------------
  it("submission_in_progress — returns 409 for fresh pending row", async () => {
    const stripeDispute = makeStripeDispute();
    const stripeCharge = makeStripeCharge();

    getDisputeMock.mockResolvedValueOnce({
      ...stripeDispute,
      charge: stripeCharge,
    });

    const freshPendingRow = {
      id: "sub-pending-uuid",
      status: "pending",
      stripe_response: null,
      created_at: new Date(Date.now() - 5000).toISOString(), // 5 seconds old
      completed_at: null,
      warnings: [],
    };

    supabaseMock.from.mockImplementation((table: string) => {
      if (table === "merchants") {
        return {
          select: vi.fn().mockReturnThis(),
          eq: vi.fn().mockReturnThis(),
          single: vi.fn().mockResolvedValue({ data: { id: "merchant-uuid" }, error: null }),
        };
      }
      if (table === "disputes") {
        return {
          select: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              eq: vi.fn().mockReturnValue({
                single: vi.fn().mockResolvedValue({
                  data: {
                    id: LOCAL_DISPUTE_ID,
                    stripe_dispute_id: DISPUTE_ID,
                    network: "visa",
                    reason_code: "10.4",
                    narrative_text: "narrative",
                  },
                  error: null,
                }),
              }),
            }),
          }),
        };
      }
      if (table === "evidence_files") {
        return {
          select: vi.fn().mockReturnValue({
            eq: vi.fn().mockResolvedValue({
              data: [{ checklist_item_key: "receipt", stripe_file_id: "file_receipt" }],
              error: null,
            }),
          }),
        };
      }
      if (table === "dispute_submissions") {
        return {
          select: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              in: vi.fn().mockReturnValue({
                order: vi.fn().mockReturnValue({
                  limit: vi.fn().mockResolvedValue({
                    data: [freshPendingRow],
                    error: null,
                  }),
                }),
              }),
            }),
          }),
        };
      }
      return {};
    });

    const res = await POST(mkRequest());
    const body = await res.json();

    expect(res.status).toBe(409);
    expect(body.code).toBe("submission_in_progress");
    expect(submitDisputeMock).not.toHaveBeenCalled();
  });

  // -------------------------------------------------------------------------
  // 6. deadline_passed warning — happy path with past due_by
  // -------------------------------------------------------------------------
  it("deadline_passed — returns 200 with warning when due_by is in the past", async () => {
    const stripeDispute = makeStripeDispute({
      evidence_details: {
        due_by: Math.floor(Date.now() / 1000) - 86400, // yesterday
        has_evidence: false,
        past_due: true,
        submission_count: 0,
      } as Stripe.Dispute["evidence_details"],
    });
    const stripeCharge = makeStripeCharge();
    const submittedDispute = makeStripeDispute({ status: "under_review" });

    getDisputeMock.mockResolvedValueOnce({
      ...stripeDispute,
      charge: stripeCharge,
    });
    submitDisputeMock.mockResolvedValueOnce(submittedDispute);

    supabaseMock.from.mockImplementation((table: string) => {
      if (table === "merchants") {
        return {
          select: vi.fn().mockReturnThis(),
          eq: vi.fn().mockReturnThis(),
          single: vi.fn().mockResolvedValue({ data: { id: "merchant-uuid" }, error: null }),
        };
      }
      if (table === "disputes") {
        return {
          select: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              eq: vi.fn().mockReturnValue({
                single: vi.fn().mockResolvedValue({
                  data: {
                    id: LOCAL_DISPUTE_ID,
                    stripe_dispute_id: DISPUTE_ID,
                    network: "visa",
                    reason_code: "10.4",
                    narrative_text: "Narrative for past-deadline dispute",
                  },
                  error: null,
                }),
              }),
            }),
          }),
          update: vi.fn().mockReturnValue({
            eq: vi.fn().mockResolvedValue({ error: null }),
          }),
        };
      }
      if (table === "evidence_files") {
        return {
          select: vi.fn().mockReturnValue({
            eq: vi.fn().mockResolvedValue({
              data: [{ checklist_item_key: "receipt", stripe_file_id: "file_receipt" }],
              error: null,
            }),
          }),
        };
      }
      if (table === "dispute_submissions") {
        return {
          select: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              in: vi.fn().mockReturnValue({
                order: vi.fn().mockReturnValue({
                  limit: vi.fn().mockResolvedValue({ data: [], error: null }),
                }),
              }),
            }),
          }),
          insert: vi.fn().mockReturnValue({
            select: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({ data: { id: "sub-deadline-uuid" }, error: null }),
            }),
          }),
          update: vi.fn().mockReturnValue({
            eq: vi.fn().mockResolvedValue({ error: null }),
          }),
        };
      }
      return {};
    });

    const res = await POST(mkRequest());
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.data.warnings).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ code: "deadline_passed" }),
      ]),
    );
    expect(submitDisputeMock).toHaveBeenCalledTimes(1);
  });

  // -------------------------------------------------------------------------
  // 7. 5xx retry — first call throws StripeAPIError, second call succeeds
  // -------------------------------------------------------------------------
  it("5xx retry — retries with same idempotency key and returns 200", async () => {
    const stripeDispute = makeStripeDispute();
    const stripeCharge = makeStripeCharge();
    const submittedDispute = makeStripeDispute({ status: "under_review" });

    getDisputeMock.mockResolvedValueOnce({
      ...stripeDispute,
      charge: stripeCharge,
    });

    // First call throws a StripeAPIError; second call succeeds
    const stripeApiErr = new Stripe.errors.StripeAPIError({
      message: "server error",
      type: "api_error",
    } as never);
    submitDisputeMock
      .mockRejectedValueOnce(stripeApiErr)
      .mockResolvedValueOnce(submittedDispute);

    supabaseMock.from.mockImplementation((table: string) => {
      if (table === "merchants") {
        return {
          select: vi.fn().mockReturnThis(),
          eq: vi.fn().mockReturnThis(),
          single: vi.fn().mockResolvedValue({ data: { id: "merchant-uuid" }, error: null }),
        };
      }
      if (table === "disputes") {
        return {
          select: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              eq: vi.fn().mockReturnValue({
                single: vi.fn().mockResolvedValue({
                  data: {
                    id: LOCAL_DISPUTE_ID,
                    stripe_dispute_id: DISPUTE_ID,
                    network: "visa",
                    reason_code: "10.4",
                    narrative_text: "Merchant narrative text",
                  },
                  error: null,
                }),
              }),
            }),
          }),
          update: vi.fn().mockReturnValue({
            eq: vi.fn().mockResolvedValue({ error: null }),
          }),
        };
      }
      if (table === "evidence_files") {
        return {
          select: vi.fn().mockReturnValue({
            eq: vi.fn().mockResolvedValue({ data: [], error: null }),
          }),
        };
      }
      if (table === "dispute_submissions") {
        return {
          select: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              in: vi.fn().mockReturnValue({
                order: vi.fn().mockReturnValue({
                  limit: vi.fn().mockResolvedValue({ data: [], error: null }),
                }),
              }),
            }),
          }),
          insert: vi.fn().mockReturnValue({
            select: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({ data: { id: "sub-retry-uuid" }, error: null }),
            }),
          }),
          update: vi.fn().mockReturnValue({
            eq: vi.fn().mockResolvedValue({ error: null }),
          }),
        };
      }
      return {};
    });

    const res = await POST(mkRequest());
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(submitDisputeMock).toHaveBeenCalledTimes(2);

    // Both calls must use the same idempotency key (4th positional argument)
    const firstCallKey = submitDisputeMock.mock.calls[0][3];
    const secondCallKey = submitDisputeMock.mock.calls[1][3];
    expect(firstCallKey).toBe(secondCallKey);
  });

  // -------------------------------------------------------------------------
  // 8-10. WIN-20 assembler integration — warnings, hard-fail, receipts
  // -------------------------------------------------------------------------

  /**
   * Build a happy-path Supabase mock that returns callbacks to capture the
   * submissions.update payload. Returns { setup, captured } so each test can
   * install it on supabaseMock.from and read what the route tried to persist.
   */
  function buildSuccessSupabaseMock(
    evidenceFilesRows: Array<{ checklist_item_key: string; stripe_file_id: string }> = [
      { checklist_item_key: "receipt", stripe_file_id: "file_receipt" },
    ],
  ) {
    const captured: {
      submissionsUpdate: Record<string, unknown> | null;
      submissionsInsert: Record<string, unknown> | null;
      evidenceFilesUpdate: Record<string, unknown> | null;
      evidenceFilesUpdateIn: { column: string; values: unknown[] } | null;
    } = {
      submissionsUpdate: null,
      submissionsInsert: null,
      evidenceFilesUpdate: null,
      evidenceFilesUpdateIn: null,
    };

    const setup = (table: string) => {
      if (table === "merchants") {
        return {
          select: vi.fn().mockReturnThis(),
          eq: vi.fn().mockReturnThis(),
          single: vi.fn().mockResolvedValue({
            data: { id: "merchant-uuid" },
            error: null,
          }),
        };
      }
      if (table === "disputes") {
        return {
          select: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              eq: vi.fn().mockReturnValue({
                single: vi.fn().mockResolvedValue({
                  data: {
                    id: LOCAL_DISPUTE_ID,
                    stripe_dispute_id: DISPUTE_ID,
                    network: "visa",
                    reason_code: "10.4",
                    narrative_text: "Narrative",
                  },
                  error: null,
                }),
              }),
            }),
          }),
          update: vi.fn().mockReturnValue({
            eq: vi.fn().mockResolvedValue({ error: null }),
          }),
        };
      }
      if (table === "evidence_files") {
        return {
          select: vi.fn().mockReturnValue({
            eq: vi.fn().mockResolvedValue({
              data: evidenceFilesRows,
              error: null,
            }),
          }),
          update: vi.fn().mockImplementation((row: Record<string, unknown>) => {
            captured.evidenceFilesUpdate = row;
            return {
              eq: vi.fn().mockReturnValue({
                in: vi.fn().mockImplementation((column: string, values: unknown[]) => {
                  captured.evidenceFilesUpdateIn = { column, values };
                  return Promise.resolve({ error: null });
                }),
              }),
            };
          }),
        };
      }
      if (table === "dispute_submissions") {
        return {
          select: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              in: vi.fn().mockReturnValue({
                order: vi.fn().mockReturnValue({
                  limit: vi.fn().mockResolvedValue({ data: [], error: null }),
                }),
              }),
            }),
          }),
          insert: vi.fn().mockImplementation((row: Record<string, unknown>) => {
            captured.submissionsInsert = row;
            return {
              select: vi.fn().mockReturnValue({
                single: vi.fn().mockResolvedValue({
                  data: { id: "sub-new-uuid" },
                  error: null,
                }),
              }),
            };
          }),
          update: vi.fn().mockImplementation((row: Record<string, unknown>) => {
            // Capture the first UPDATE (success path). Later calls (if any)
            // for failure or disputes table are handled on their own mocks.
            if (!captured.submissionsUpdate) {
              captured.submissionsUpdate = row;
            }
            return {
              eq: vi.fn().mockResolvedValue({ error: null }),
            };
          }),
        };
      }
      return {};
    };

    return { setup, captured };
  }

  it("propagates concat_skipped warnings to the success response", async () => {
    assembleEvidenceMock.mockResolvedValueOnce({
      evidence: { uncategorized_text: "n" },
      warnings: [
        {
          code: "concat_skipped",
          file_name: "bad.jpg",
          slot: "customer_communication",
          reason: "corrupt",
        },
      ],
      concat_receipts: [],
    });

    const stripeDispute = makeStripeDispute();
    getDisputeMock.mockResolvedValueOnce({
      ...stripeDispute,
      charge: makeStripeCharge(),
    });
    submitDisputeMock.mockResolvedValueOnce(
      makeStripeDispute({ status: "under_review" }),
    );

    const { setup } = buildSuccessSupabaseMock();
    supabaseMock.from.mockImplementation(setup);

    const res = await POST(mkRequest());
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(
      (body.data.warnings as SubmissionWarning[]).some(
        (w) => w.code === "concat_skipped",
      ),
    ).toBe(true);
  });

  it("returns 502 concat_failed when the assembler throws", async () => {
    assembleEvidenceMock.mockRejectedValueOnce(
      new Error("Stripe Files upload failed"),
    );

    const stripeDispute = makeStripeDispute();
    getDisputeMock.mockResolvedValueOnce({
      ...stripeDispute,
      charge: makeStripeCharge(),
    });

    const { setup } = buildSuccessSupabaseMock();
    supabaseMock.from.mockImplementation(setup);

    const res = await POST(mkRequest());
    const body = await res.json();

    expect(res.status).toBe(502);
    expect(body.code).toBe("concat_failed");
    expect(submitDisputeMock).not.toHaveBeenCalled();
    // Per Task 9 architecture: assembly runs BEFORE the dispute_submissions
    // row is inserted, so no row should have been created or updated.
  });

  it("persists concat_receipts to the dispute_submissions row on success", async () => {
    const receipts = [
      {
        slot: "customer_communication" as const,
        input_file_ids: ["file_a", "file_b"],
        combined_file_id: "file_merged",
      },
    ];
    assembleEvidenceMock.mockResolvedValueOnce({
      evidence: { customer_communication: "file_merged" },
      warnings: [],
      concat_receipts: receipts,
    });

    const stripeDispute = makeStripeDispute();
    getDisputeMock.mockResolvedValueOnce({
      ...stripeDispute,
      charge: makeStripeCharge(),
    });
    submitDisputeMock.mockResolvedValueOnce(
      makeStripeDispute({ status: "under_review" }),
    );

    const { setup, captured } = buildSuccessSupabaseMock();
    supabaseMock.from.mockImplementation(setup);

    const res = await POST(mkRequest());
    expect(res.status).toBe(200);

    expect(captured.submissionsUpdate).toMatchObject({
      status: "succeeded",
      concat_receipts: receipts,
    });
  });

  it("flags submitted evidence_files rows as submitted_to_stripe after a successful submission", async () => {
    // Mixed scenario: one single-file slot passes through, one multi-file slot
    // is concat'd. The submitted_to_stripe flag should flip on ALL three source
    // file rows (single pass-through + two concat inputs).
    const concatReceipts = [
      {
        slot: "service_documentation" as const,
        input_file_ids: ["file_svc_a", "file_svc_b"],
        combined_file_id: "file_svc_merged",
      },
    ];
    assembleEvidenceMock.mockResolvedValueOnce({
      evidence: {
        receipt: "file_receipt_single",
        service_documentation: "file_svc_merged",
      },
      warnings: [],
      concat_receipts: concatReceipts,
    });

    const stripeDispute = makeStripeDispute();
    getDisputeMock.mockResolvedValueOnce({
      ...stripeDispute,
      charge: makeStripeCharge(),
    });
    submitDisputeMock.mockResolvedValueOnce(
      makeStripeDispute({ status: "under_review" }),
    );

    const { setup, captured } = buildSuccessSupabaseMock([
      { checklist_item_key: "ce3_prior_transactions", stripe_file_id: "file_receipt_single" },
      { checklist_item_key: "customer_account_details", stripe_file_id: "file_svc_a" },
      { checklist_item_key: "digital_access_logs", stripe_file_id: "file_svc_b" },
    ]);
    supabaseMock.from.mockImplementation(setup);

    const res = await POST(mkRequest());
    expect(res.status).toBe(200);

    expect(captured.evidenceFilesUpdate).toMatchObject({ submitted_to_stripe: true });
    expect(captured.evidenceFilesUpdateIn?.column).toBe("stripe_file_id");
    expect(new Set(captured.evidenceFilesUpdateIn?.values ?? [])).toEqual(
      new Set(["file_receipt_single", "file_svc_a", "file_svc_b"]),
    );
  });
});

// Local type import for the test assertions above.
type SubmissionWarning = { code: string; [k: string]: unknown };
