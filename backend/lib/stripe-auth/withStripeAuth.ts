import { NextRequest, NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";
import { verifyStripeAppSignature } from "./verify";
import type { StripeAppRequestBody, VerifiedRequest } from "./types";

/**
 * Route handler that receives verified identity and parsed body.
 */
type AuthenticatedHandler<
  T extends StripeAppRequestBody = StripeAppRequestBody,
> = (
  request: NextRequest,
  verified: VerifiedRequest<T>,
) => Promise<NextResponse> | NextResponse;

/**
 * Wraps a Next.js App Router route handler with Stripe App signature verification.
 *
 * Usage:
 *   export const POST = withStripeAuth(async (request, { identity, body }) => {
 *     // identity.userId, identity.accountId are verified
 *     return NextResponse.json({ ok: true });
 *   });
 */
export function withStripeAuth<
  T extends StripeAppRequestBody = StripeAppRequestBody,
>(handler: AuthenticatedHandler<T>) {
  return async (request: NextRequest): Promise<NextResponse> => {
    const signature = request.headers.get("stripe-signature");
    if (!signature) {
      return NextResponse.json(
        { error: "Missing Stripe-Signature header" },
        { status: 401 },
      );
    }

    let rawBody: string;
    try {
      rawBody = await request.text();
    } catch {
      return NextResponse.json(
        { error: "Unable to read request body" },
        { status: 400 },
      );
    }

    let verified: VerifiedRequest<T>;
    try {
      verified = verifyStripeAppSignature<T>(rawBody, signature);
    } catch (error) {
      // WIN-63: do not log rawBody, signature, or any STRIPE_APP_SECRET bytes
      // here. Even a 10-char prefix of `absec_...` is a secret fragment, and
      // rawBody can contain PII or session context. Sentry receives the
      // exception (with its own scrubbing hooks); that's the one audit trail.
      // The 401 response is intentionally minimal — no `debug` field — so the
      // iframe doesn't see internal stack context.
      Sentry.captureException(error, {
        tags: { auth_failure: "signature_verification", route: request.nextUrl.pathname },
      });
      return NextResponse.json(
        { error: "Invalid or expired signature" },
        { status: 401 },
      );
    }

    return Sentry.withScope(async (scope) => {
      scope.setUser({ id: verified.identity.userId });
      scope.setTag("merchant_id", verified.identity.accountId);
      scope.setTag("stripe_user_id", verified.identity.userId);
      return handler(request, verified);
    });
  };
}
