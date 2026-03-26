import Stripe from "stripe";
import type {
  StripeAppIdentity,
  StripeAppRequestBody,
  VerifiedRequest,
} from "./types";

let _stripe: Stripe | null = null;

function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  }
  return _stripe;
}

/**
 * Verifies a Stripe App signature and extracts merchant identity.
 *
 * Uses the same HMAC mechanism as webhook verification, but with the
 * app signing secret (absec_...) instead of the webhook secret (whsec_...).
 *
 * @param rawBody  - Raw request body string (from request.text())
 * @param signature - Value of the Stripe-Signature header
 * @returns Verified identity and parsed body
 * @throws On missing config, invalid signature, or missing identity fields
 */
export function verifyStripeAppSignature<
  T extends StripeAppRequestBody = StripeAppRequestBody,
>(rawBody: string, signature: string): VerifiedRequest<T> {
  const appSecret = process.env.STRIPE_APP_SECRET;
  if (!appSecret) {
    throw new Error("STRIPE_APP_SECRET is not configured");
  }

  // verifyHeader throws StripeSignatureVerificationError on invalid signatures.
  // Default tolerance is 300 seconds (5 min), appropriate for app requests.
  getStripe().webhooks.signature.verifyHeader(rawBody, signature, appSecret);

  // Parse JSON only after signature is verified — never process tampered payloads.
  const body = JSON.parse(rawBody) as T;

  if (!body.user_id || !body.account_id) {
    throw new Error("Missing user_id or account_id in verified payload");
  }

  const identity: StripeAppIdentity = {
    userId: body.user_id,
    accountId: body.account_id,
  };

  return { identity, body };
}
