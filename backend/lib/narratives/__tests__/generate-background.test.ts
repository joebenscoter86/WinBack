import { describe, it, expect, vi, beforeEach } from "vitest";

// Hoisted mocks
const { mockGenerateNarrative, mockBuildPrompt, mockGetPlaybook } = vi.hoisted(
  () => {
    return {
      mockGenerateNarrative: vi.fn(),
      mockBuildPrompt: vi.fn(),
      mockGetPlaybook: vi.fn(),
    };
  },
);

vi.mock("@/lib/claude", () => ({
  generateNarrative: mockGenerateNarrative,
}));

vi.mock("@/lib/prompts", () => ({
  buildPrompt: mockBuildPrompt,
}));

vi.mock("@/lib/playbooks", () => ({
  getPlaybook: mockGetPlaybook,
}));

// Mock @/lib/stripe — keep normalizeDispute real (pure function), stub getDispute.
const mockGetDispute = vi.fn();
vi.mock("@/lib/stripe", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/stripe")>();
  return {
    ...actual,
    getDispute: (...args: unknown[]) => mockGetDispute(...args),
  };
});

const MOCK_STRIPE_DISPUTE = {
  id: "dp_test_001",
  amount: 4999,
  currency: "usd",
  reason: "fraudulent",
  status: "needs_response",
  network_reason_code: "4853",
  evidence_details: { due_by: 1735689600, submission_count: 0 },
  payment_intent: null,
  charge: {
    id: "ch_test_001",
    created: 1735516800,
    description: "Order #1234",
    billing_details: {
      address: {
        line1: "123 Main St",
        city: "Springfield",
        state: "IL",
        postal_code: "62704",
        country: "US",
      },
    },
    customer: { name: "Jane Smith", email: "jane@example.com" },
    outcome: { network_status: "approved_by_network" },
    payment_method_details: {
      card: {
        brand: "visa",
        network: "visa",
        last4: "4242",
        authorization_code: "AUTH123",
        checks: {
          address_line1_check: "pass",
          address_postal_code_check: "pass",
          cvc_check: "pass",
        },
      },
    },
    refunds: { data: [] },
  },
  evidence: null,
  is_charge_refundable: false,
};

const mockFrom = vi.fn();
vi.mock("@/lib/supabase", () => ({
  supabase: { from: (...args: any[]) => mockFrom(...args) },
}));

import { runBackgroundGeneration } from "../generate-background";
import type { BackgroundGenerationParams } from "../generate-background";

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

const PARAMS: BackgroundGenerationParams = {
  generationId: "gen-uuid-001",
  accountId: "acct_test_001",
  disputeId: "dispute-uuid-001",
  stripeDisputeId: "dp_test_001",
  reasonCode: "4853",
  network: "visa",
  merchantFeedback: "Please be more specific about the delivery date.",
};

const MOCK_PLAYBOOK = {
  id: "playbook-uuid-001",
  network: "visa",
  reason_code: "4853",
  display_name: "Cardholder Dispute - Not as Described",
  issuer_evaluation: "The issuer looks for proof of service/goods as described.",
};

const MOCK_DISPUTE = {
  id: "dispute-uuid-001",
  stripe_dispute_id: "dp_test_001",
  reason_code: "4853",
  network: "visa",
  amount: 4999,
  currency: "usd",
  transaction_date: "2024-01-15T00:00:00Z",
  customer_name: "Jane Smith",
  customer_email: "jane@example.com",
  checklist_notes: { service_terms: "Customer agreed on signup" },
};

const MOCK_EVIDENCE_FILES = [
  { checklist_item_key: "service_terms", file_name: "terms.pdf" },
  { checklist_item_key: "delivery_receipt", file_name: "receipt.pdf" },
];

const MOCK_PROMPT_RESULT = {
  system: "You are a dispute expert.",
  user: "Here is the dispute context.",
};

const MOCK_NARRATIVE_OUTPUT = {
  narrative: "The merchant provided strong evidence of service delivery.",
  annotations: [
    {
      section: "Service Evidence",
      reasoning: "Terms and receipt confirm service was rendered as described.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Supabase chainable mock builder
// ---------------------------------------------------------------------------

/**
 * Creates a chainable Supabase query mock where:
 * - table names can route to different resolved values
 * - Each call to .from() returns chainable { select, eq, single, update }
 */
function buildSupabaseMock({
  disputeResult,
  evidenceResult,
  updateResult,
}: {
  disputeResult?: { data: unknown; error: unknown };
  evidenceResult?: { data: unknown; error: unknown };
  updateResult?: { data: unknown; error: unknown };
}) {
  return (tableName: string) => {
    const chain: Record<string, any> = {};

    chain.select = (_cols?: string) => {
      if (tableName === "disputes") {
        return {
          eq: (_col: string, _val: string) => ({
            single: () =>
              Promise.resolve(
                disputeResult ?? { data: MOCK_DISPUTE, error: null },
              ),
          }),
        };
      }
      if (tableName === "evidence_files") {
        return {
          eq: (_col: string, _val: string) =>
            Promise.resolve(
              evidenceResult ?? { data: MOCK_EVIDENCE_FILES, error: null },
            ),
        };
      }
      return { eq: () => chain };
    };

    chain.update = (_data: unknown) => ({
      eq: (_col: string, _val: string) =>
        Promise.resolve(updateResult ?? { data: null, error: null }),
    });

    return chain;
  };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("runBackgroundGeneration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetDispute.mockResolvedValue(MOCK_STRIPE_DISPUTE);
  });

  it("happy path: completes generation and updates dispute narrative_text", async () => {
    mockGetPlaybook.mockResolvedValue(MOCK_PLAYBOOK);
    mockBuildPrompt.mockReturnValue(MOCK_PROMPT_RESULT);
    mockGenerateNarrative.mockResolvedValue(MOCK_NARRATIVE_OUTPUT);

    mockFrom.mockImplementation(
      buildSupabaseMock({
        disputeResult: { data: MOCK_DISPUTE, error: null },
        evidenceResult: { data: MOCK_EVIDENCE_FILES, error: null },
        updateResult: { data: null, error: null },
      }),
    );

    await runBackgroundGeneration(PARAMS);

    // Verify playbook lookup
    expect(mockGetPlaybook).toHaveBeenCalledWith("visa", "4853");

    // Verify Claude was called
    expect(mockGenerateNarrative).toHaveBeenCalledWith(MOCK_PROMPT_RESULT);

    // Verify narrative_generations was updated with "completed"
    const narrativeGenCalls = mockFrom.mock.calls.filter(
      ([t]: [string]) => t === "narrative_generations",
    );
    expect(narrativeGenCalls.length).toBeGreaterThanOrEqual(1);

    // Verify disputes was updated with narrative_text
    const disputeCalls = mockFrom.mock.calls.filter(
      ([t]: [string]) => t === "disputes",
    );
    expect(disputeCalls.length).toBeGreaterThanOrEqual(2); // select + update
  });

  it("WIN-44: populates PromptContext with live Stripe AVS/CVC/auth/network data", async () => {
    mockGetPlaybook.mockResolvedValue(MOCK_PLAYBOOK);
    mockBuildPrompt.mockReturnValue(MOCK_PROMPT_RESULT);
    mockGenerateNarrative.mockResolvedValue(MOCK_NARRATIVE_OUTPUT);

    mockFrom.mockImplementation(
      buildSupabaseMock({
        disputeResult: { data: MOCK_DISPUTE, error: null },
        evidenceResult: { data: MOCK_EVIDENCE_FILES, error: null },
        updateResult: { data: null, error: null },
      }),
    );

    await runBackgroundGeneration(PARAMS);

    expect(mockGetDispute).toHaveBeenCalledWith(
      "acct_test_001",
      "dp_test_001",
      ["charge.customer", "payment_intent"],
    );

    expect(mockBuildPrompt).toHaveBeenCalledTimes(1);
    const context = mockBuildPrompt.mock.calls[0][0];
    expect(context.avs_address_check).toBe("pass");
    expect(context.avs_zip_check).toBe("pass");
    expect(context.cvc_check).toBe("pass");
    expect(context.authorization_code).toBe("AUTH123");
    expect(context.network_status).toBe("approved_by_network");
    expect(context.card_brand).toBe("visa");
    expect(context.card_last4).toBe("4242");
    expect(context.billing_address).toContain("123 Main St");
    expect(context.charge_description).toBe("Order #1234");
    expect(context.customer_name).toBe("Jane Smith");
    expect(context.customer_email).toBe("jane@example.com");
    expect(context.amount).toBe(4999);
  });

  it("WIN-44: buildPrompt output for full Stripe context includes concrete field values", async () => {
    mockGetPlaybook.mockResolvedValue(MOCK_PLAYBOOK);
    mockGenerateNarrative.mockResolvedValue(MOCK_NARRATIVE_OUTPUT);

    // Use the real buildPrompt for this assertion.
    const { buildPrompt: realBuildPrompt } = await vi.importActual<
      typeof import("@/lib/prompts")
    >("@/lib/prompts");
    mockBuildPrompt.mockImplementation(realBuildPrompt);

    // Use reason code 13.1 (known playbook) so the real template is found.
    mockGetPlaybook.mockResolvedValue({
      ...MOCK_PLAYBOOK,
      reason_code: "13.1",
      display_name: "Merchandise Not Received",
    });

    const stripeDispute = {
      ...MOCK_STRIPE_DISPUTE,
      network_reason_code: "13.1",
      reason: "product_not_received",
    };
    mockGetDispute.mockResolvedValue(stripeDispute);

    mockFrom.mockImplementation(
      buildSupabaseMock({
        disputeResult: { data: MOCK_DISPUTE, error: null },
        evidenceResult: { data: MOCK_EVIDENCE_FILES, error: null },
        updateResult: { data: null, error: null },
      }),
    );

    await runBackgroundGeneration({
      ...PARAMS,
      reasonCode: "13.1",
    });

    expect(mockGenerateNarrative).toHaveBeenCalledTimes(1);
    const promptArg = mockGenerateNarrative.mock.calls[0][0];
    const user = promptArg.user as string;
    expect(user).toContain("AVS address check: pass");
    expect(user).toContain("AVS zip check: pass");
    expect(user).toContain("CVC check: pass");
    expect(user).toContain("Network status: approved_by_network");
    expect(user).toContain("Authorization code: AUTH123");
    expect(user).not.toContain("AVS address check: not available");
  });

  it("marks failed when generateNarrative throws a rate-limit error", async () => {
    mockGetPlaybook.mockResolvedValue(MOCK_PLAYBOOK);
    mockBuildPrompt.mockReturnValue(MOCK_PROMPT_RESULT);
    mockGenerateNarrative.mockRejectedValue(
      new Error("rate limit exceeded, status 429"),
    );

    let capturedUpdateData: unknown = null;

    mockFrom.mockImplementation((tableName: string) => {
      const chain: Record<string, any> = {};

      chain.select = (_cols?: string) => {
        if (tableName === "disputes") {
          return {
            eq: () => ({
              single: () =>
                Promise.resolve({ data: MOCK_DISPUTE, error: null }),
            }),
          };
        }
        if (tableName === "evidence_files") {
          return {
            eq: () =>
              Promise.resolve({ data: MOCK_EVIDENCE_FILES, error: null }),
          };
        }
        return { eq: () => chain };
      };

      chain.update = (data: unknown) => {
        if (tableName === "narrative_generations") {
          capturedUpdateData = data;
        }
        return {
          eq: () => Promise.resolve({ data: null, error: null }),
        };
      };

      return chain;
    });

    await runBackgroundGeneration(PARAMS);

    // Should not throw
    expect(capturedUpdateData).toBeTruthy();

    const updatePayload = capturedUpdateData as Record<string, unknown>;
    expect(updatePayload.status).toBe("failed");
    expect(typeof updatePayload.error).toBe("string");
    expect(updatePayload.error).toMatch(/busy|try again/i);

    // narrative_generations must have been touched
    const narrativeGenCalls = mockFrom.mock.calls.filter(
      ([t]: [string]) => t === "narrative_generations",
    );
    expect(narrativeGenCalls.length).toBeGreaterThanOrEqual(1);
  });

  it("marks failed when playbook is not found", async () => {
    mockGetPlaybook.mockResolvedValue(null);

    let capturedUpdateData: unknown = null;

    mockFrom.mockImplementation((tableName: string) => {
      return {
        select: () => ({ eq: () => ({ single: () => Promise.resolve({ data: null, error: null }) }) }),
        update: (data: unknown) => {
          if (tableName === "narrative_generations") {
            capturedUpdateData = data;
          }
          return { eq: () => Promise.resolve({ data: null, error: null }) };
        },
      };
    });

    await runBackgroundGeneration(PARAMS);

    // Should never call Claude
    expect(mockGenerateNarrative).not.toHaveBeenCalled();

    expect(capturedUpdateData).toBeTruthy();
    const updatePayload = capturedUpdateData as Record<string, unknown>;
    expect(updatePayload.status).toBe("failed");
    expect(typeof updatePayload.error).toBe("string");
    expect(updatePayload.error).toMatch(/playbook/i);

    // narrative_generations must have been touched
    const narrativeGenCalls = mockFrom.mock.calls.filter(
      ([t]: [string]) => t === "narrative_generations",
    );
    expect(narrativeGenCalls.length).toBeGreaterThanOrEqual(1);
  });
});
