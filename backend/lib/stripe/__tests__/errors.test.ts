import { describe, it, expect } from "vitest";
import Stripe from "stripe";
import { classifyStripeError } from "../errors";

describe("classifyStripeError", () => {
  it("should return 429 for rate limit errors", () => {
    const err = new Stripe.errors.StripeRateLimitError({
      message: "Too many requests",
    });
    const result = classifyStripeError(err);
    expect(result).toEqual({
      code: "rate_limit",
      status: 429,
      message: "Too many requests",
    });
  });

  it("should return 404 for resource_missing errors", () => {
    const err = new Stripe.errors.StripeInvalidRequestError({
      message: "No such dispute",
      type: "invalid_request_error",
    });
    err.code = "resource_missing";
    const result = classifyStripeError(err);
    expect(result).toEqual({
      code: "not_found",
      status: 404,
      message: "No such dispute",
    });
  });

  it("should return 400 for other invalid request errors", () => {
    const err = new Stripe.errors.StripeInvalidRequestError({
      message: "Invalid param",
      type: "invalid_request_error",
    });
    const result = classifyStripeError(err);
    expect(result).toEqual({
      code: "invalid_request",
      status: 400,
      message: "Invalid param",
    });
  });

  it("should return 403 for auth errors", () => {
    const err = new Stripe.errors.StripeAuthenticationError({
      message: "Invalid API Key",
    });
    const result = classifyStripeError(err);
    expect(result).toEqual({
      code: "auth_error",
      status: 403,
      message: "Invalid API Key",
    });
  });

  it("should return 502 for unknown Stripe errors", () => {
    const err = new Stripe.errors.StripeAPIError({
      message: "Internal error",
    });
    const result = classifyStripeError(err);
    expect(result).toEqual({
      code: "stripe_error",
      status: 502,
      message: "Internal error",
    });
  });
});
