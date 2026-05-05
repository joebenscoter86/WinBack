import Stripe from "stripe";
import type {
  StripeAppIdentity,
  StripeAppRequestBody,
  VerifiedRequest,
} from "./types";

let _stripe: Stripe | null = null;

function getStripe(): Stripe {
  if (!_stripe) {
    // Used only for the verifyHeader call. Any valid Stripe key works
    // because verifyHeader is a pure HMAC compare; the key isn't sent
    // anywhere. We use STRIPE_SECRET_KEY since it's always present.
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  }
  return _stripe;
}

/**
 * Verifies a Stripe App signature against the single shared STRIPE_APP_SECRET.
 * Stripe Apps issues one signing secret per app (not one per mode).
 *
 * The signature only covers {user_id, account_id} per Stripe's spec, so it
 * proves the request came from a legitimate Stripe iframe but does not
 * cryptographically bind the `livemode` field. We read `livemode` from the
 * body, which the frontend sets from `context.environment.mode`. A malicious
 * client could lie about livemode, but the worst they would see is their
 * own account's data in the wrong mode (which they already have access to
 * via the Stripe Dashboard). No cross-tenant leak because account_id IS
 * signed.
 *
 * @returns Verified identity, parsed body, and the body's livemode claim.
 * @throws  When the signature is invalid, identity fields are missing, or
 *          livemode is missing/non-boolean from the body.
 */
export function verifyStripeAppSignature<
  T extends StripeAppRequestBody = StripeAppRequestBody,
>(rawBody: string, signature: string): VerifiedRequest<T> {
  const appSecret = process.env.STRIPE_APP_SECRET;
  if (!appSecret) {
    throw new Error("STRIPE_APP_SECRET is not configured");
  }

  const body = JSON.parse(rawBody) as T;
  if (!body.user_id || !body.account_id) {
    throw new Error("Missing user_id or account_id in request payload");
  }
  if (typeof body.livemode !== "boolean") {
    throw new Error("Missing or invalid livemode in request payload");
  }

  // Stripe signs only {user_id, account_id} in that exact order.
  const signedPayload = JSON.stringify({
    user_id: body.user_id,
    account_id: body.account_id,
  });

  // verifyHeader throws on invalid signatures.
  getStripe().webhooks.signature.verifyHeader(
    signedPayload,
    signature,
    appSecret,
  );

  const identity: StripeAppIdentity = {
    userId: body.user_id,
    accountId: body.account_id,
  };
  return { identity, body, livemode: body.livemode };
}
