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
 * Stripe Apps issues a single STRIPE_APP_SECRET per app (not per mode), so
 * the signature only proves the request came from a legitimate Stripe iframe
 * for the given user_id+account_id. `livemode` comes from the request body,
 * which the frontend sets from `context.environment.mode`. A merchant could
 * lie about livemode on their own account, but the worst they would see is
 * their own data in the wrong mode (which they already access via the Stripe
 * Dashboard). No cross-tenant leak because account_id IS signed.
 */
export interface VerifiedRequest<T = Record<string, unknown>> {
  identity: StripeAppIdentity;
  body: T;
  livemode: boolean;
}

/**
 * The raw body shape sent by the Stripe App frontend.
 * user_id and account_id are signed by fetchStripeSignature.
 * livemode is required and used by the backend to select Stripe API keys
 * and filter DB queries. See VerifiedRequest above for the trust model.
 */
export interface StripeAppRequestBody {
  user_id: string;
  account_id: string;
  livemode: boolean;
  [key: string]: unknown;
}
