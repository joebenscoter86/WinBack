/**
 * Identity extracted from a verified Stripe App signature.
 */
export interface StripeAppIdentity {
  userId: string;
  accountId: string;
}

/**
 * Result of successful signature verification.
 * T is the type of the full parsed request body.
 */
export interface VerifiedRequest<T = Record<string, unknown>> {
  identity: StripeAppIdentity;
  body: T;
}

/**
 * The raw body shape sent by the Stripe App frontend.
 * user_id and account_id are always present (signed by fetchStripeSignature).
 */
export interface StripeAppRequestBody {
  user_id: string;
  account_id: string;
  [key: string]: unknown;
}
