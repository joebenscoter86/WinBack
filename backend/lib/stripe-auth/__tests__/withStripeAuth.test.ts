import { describe, it, expect } from "vitest";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const TEST_APP_SECRET = "absec_test_secret_for_unit_tests";

process.env.STRIPE_APP_SECRET = TEST_APP_SECRET;
process.env.STRIPE_SECRET_KEY = "sk_test_fake";

import { withStripeAuth } from "../withStripeAuth";

const stripe = new Stripe("sk_test_fake");

function makeRequest(body: string, signature?: string): NextRequest {
  const headers: Record<string, string> = {
    "content-type": "application/json",
  };
  if (signature) {
    headers["stripe-signature"] = signature;
  }

  return new NextRequest("http://localhost:3000/api/test", {
    method: "POST",
    body,
    headers,
  });
}

describe("withStripeAuth", () => {
  const handler = withStripeAuth(async (_req, { identity }) => {
    return NextResponse.json({ userId: identity.userId });
  });

  it("should return 401 when Stripe-Signature header is missing", async () => {
    const request = makeRequest("{}");
    const response = await handler(request);

    expect(response.status).toBe(401);
    const data = await response.json();
    expect(data.error).toContain("Missing Stripe-Signature");
  });

  it("should return 401 when signature is invalid", async () => {
    const request = makeRequest("{}", "t=123,v1=bad");
    const response = await handler(request);

    expect(response.status).toBe(401);
    const data = await response.json();
    expect(data.error).toContain("Invalid or expired");
  });

  it("should call handler with verified identity on valid signature", async () => {
    const body = JSON.stringify({
      user_id: "usr_123",
      account_id: "acct_456",
    });
    const sig = stripe.webhooks.generateTestHeaderString({
      payload: body,
      secret: TEST_APP_SECRET,
    });
    const request = makeRequest(body, sig);

    const response = await handler(request);

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.userId).toBe("usr_123");
  });
});
