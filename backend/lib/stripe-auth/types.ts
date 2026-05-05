/**
 * Identity extracted from a verified Stripe App signature.
 */
export interface StripeAppIdentity {
  userId: string;
  accountId: string;
}

/**
 * Result of successful signature verification.
 *
 * `livemode` is derived authoritatively from which mode-scoped
 * STRIPE_APP_SECRET (`_LIVE` or `_TEST`) verified the signature. The
 * frontend may also include a `livemode` field in the body for telemetry,
 * but the backend never trusts that. It uses the value here.
 */
export interface VerifiedRequest<T = Record<string, unknown>> {
  identity: StripeAppIdentity;
  body: T;
  livemode: boolean;
}

/**
 * The raw body shape sent by the Stripe App frontend.
 * user_id and account_id are always present (signed by fetchStripeSignature).
 * livemode is informational only. See VerifiedRequest above.
 */
export interface StripeAppRequestBody {
  user_id: string;
  account_id: string;
  livemode?: boolean;
  [key: string]: unknown;
}
