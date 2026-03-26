import { describe, it, expect, beforeAll } from "vitest";
import Stripe from "stripe";

const TEST_APP_SECRET = "absec_test_secret_for_unit_tests";

// Set env before importing the module under test
process.env.STRIPE_APP_SECRET = TEST_APP_SECRET;
process.env.STRIPE_SECRET_KEY = "sk_test_fake";

import { verifyStripeAppSignature } from "../verify";

const stripe = new Stripe("sk_test_fake");

function generateSignature(payload: string): string {
  return stripe.webhooks.generateTestHeaderString({
    payload,
    secret: TEST_APP_SECRET,
  });
}

describe("verifyStripeAppSignature", () => {
  it("should verify a valid signature and return identity", () => {
    const body = JSON.stringify({
      user_id: "usr_123",
      account_id: "acct_456",
    });
    const signature = generateSignature(body);

    const result = verifyStripeAppSignature(body, signature);

    expect(result.identity.userId).toBe("usr_123");
    expect(result.identity.accountId).toBe("acct_456");
    expect(result.body.user_id).toBe("usr_123");
    expect(result.body.account_id).toBe("acct_456");
  });

  it("should verify signature with additional payload fields", () => {
    const body = JSON.stringify({
      user_id: "usr_123",
      account_id: "acct_456",
      dispute_id: "dp_789",
    });
    const signature = generateSignature(body);

    const result = verifyStripeAppSignature(body, signature);

    expect(result.identity.userId).toBe("usr_123");
    expect(result.body.dispute_id).toBe("dp_789");
  });

  it("should reject an invalid signature", () => {
    const body = JSON.stringify({
      user_id: "usr_123",
      account_id: "acct_456",
    });

    expect(() =>
      verifyStripeAppSignature(body, "t=1234567890,v1=invalid_value"),
    ).toThrow();
  });

  it("should reject a tampered body", () => {
    const originalBody = JSON.stringify({
      user_id: "usr_123",
      account_id: "acct_456",
    });
    const signature = generateSignature(originalBody);
    const tamperedBody = JSON.stringify({
      user_id: "usr_HACKER",
      account_id: "acct_456",
    });

    expect(() =>
      verifyStripeAppSignature(tamperedBody, signature),
    ).toThrow();
  });

  it("should reject body missing user_id", () => {
    const body = JSON.stringify({ account_id: "acct_456" });
    const signature = generateSignature(body);

    expect(() => verifyStripeAppSignature(body, signature)).toThrow(
      "Missing user_id or account_id",
    );
  });

  it("should reject body missing account_id", () => {
    const body = JSON.stringify({ user_id: "usr_123" });
    const signature = generateSignature(body);

    expect(() => verifyStripeAppSignature(body, signature)).toThrow(
      "Missing user_id or account_id",
    );
  });
});
