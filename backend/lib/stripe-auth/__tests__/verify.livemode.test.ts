import { describe, it, expect, beforeEach } from "vitest";
import Stripe from "stripe";
import { verifyStripeAppSignature } from "../verify";
import { __resetEnvCacheForTests } from "@/lib/env";

const APP_SECRET = "absec_test_SHARED_KEY_FOR_UNIT_TESTS_ONLY_xxxx";
const stripeForSigning = new Stripe("sk_test_fake_for_signing_only");

function signedRequest(body: object) {
  const raw = JSON.stringify(body);
  const signed = JSON.stringify({
    user_id: (body as { user_id: string }).user_id,
    account_id: (body as { account_id: string }).account_id,
  });
  const signature = stripeForSigning.webhooks.generateTestHeaderString({
    payload: signed,
    secret: APP_SECRET,
  });
  return { raw, signature };
}

describe("verifyStripeAppSignature", () => {
  beforeEach(() => {
    __resetEnvCacheForTests();
    process.env.STRIPE_APP_SECRET = APP_SECRET;
    process.env.STRIPE_SECRET_KEY = "sk_test_fake";
  });

  it("returns livemode=true when body claims live and signature verifies", () => {
    const body = { user_id: "usr_1", account_id: "acct_1", livemode: true };
    const { raw, signature } = signedRequest(body);
    const result = verifyStripeAppSignature(raw, signature);
    expect(result.livemode).toBe(true);
    expect(result.identity).toEqual({ userId: "usr_1", accountId: "acct_1" });
  });

  it("returns livemode=false when body claims test and signature verifies", () => {
    const body = { user_id: "usr_1", account_id: "acct_1", livemode: false };
    const { raw, signature } = signedRequest(body);
    const result = verifyStripeAppSignature(raw, signature);
    expect(result.livemode).toBe(false);
  });

  it("throws when livemode is missing from body", () => {
    const body = { user_id: "usr_1", account_id: "acct_1" };
    const { raw, signature } = signedRequest(body);
    expect(() => verifyStripeAppSignature(raw, signature)).toThrow(/livemode/);
  });

  it("throws when livemode is not a boolean", () => {
    const body = { user_id: "usr_1", account_id: "acct_1", livemode: "true" };
    const { raw, signature } = signedRequest(body);
    expect(() => verifyStripeAppSignature(raw, signature)).toThrow(/livemode/);
  });

  it("throws when signature is forged", () => {
    const body = { user_id: "usr_1", account_id: "acct_1", livemode: true };
    const raw = JSON.stringify(body);
    expect(() => verifyStripeAppSignature(raw, "t=0,v1=deadbeef")).toThrow(/signature/i);
  });

  it("throws on missing user_id or account_id", () => {
    const raw = JSON.stringify({ user_id: "usr_1", livemode: true });
    expect(() => verifyStripeAppSignature(raw, "t=0,v1=deadbeef")).toThrow(
      /user_id or account_id/,
    );
  });
});
