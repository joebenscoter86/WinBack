import { describe, it, expect, vi, beforeEach } from "vitest";

const updateMock = vi.fn();

vi.mock("stripe", () => {
  function StripeMock(_key: string) {
    // @ts-expect-error constructor mock
    this.disputes = { update: updateMock };
  }
  return { default: StripeMock };
});

import { submitDispute, __resetStripeClientsForTests } from "../client";

describe("submitDispute", () => {
  beforeEach(() => {
    updateMock.mockReset();
    process.env.STRIPE_SECRET_KEY_TEST = "sk_test_123";
    process.env.STRIPE_SECRET_KEY_LIVE = "sk_live_123";
    __resetStripeClientsForTests();
  });

  it("calls stripe.disputes.update with submit:true and idempotency key", async () => {
    updateMock.mockResolvedValue({ id: "dp_1", status: "under_review" });
    const result = await submitDispute(
      false,
      "acct_123",
      "dp_1",
      { uncategorized_text: "defense" },
      "idem_abc",
    );
    expect(updateMock).toHaveBeenCalledWith(
      "dp_1",
      { evidence: { uncategorized_text: "defense" }, submit: true },
      { idempotencyKey: "idem_abc", stripeAccount: "acct_123" },
    );
    expect(result.status).toBe("under_review");
  });
});
