import Stripe from "stripe";

export interface ClassifiedError {
  code: string;
  status: number;
  message: string;
}

export function classifyStripeError(err: Stripe.errors.StripeError): ClassifiedError {
  if (err instanceof Stripe.errors.StripeRateLimitError) {
    return { code: "rate_limit", status: 429, message: err.message };
  }

  if (err instanceof Stripe.errors.StripeInvalidRequestError) {
    if (err.code === "resource_missing") {
      return { code: "not_found", status: 404, message: err.message };
    }
    return { code: "invalid_request", status: 400, message: err.message };
  }

  if (err instanceof Stripe.errors.StripeAuthenticationError) {
    return { code: "auth_error", status: 403, message: err.message };
  }

  return { code: "stripe_error", status: 502, message: err.message };
}
