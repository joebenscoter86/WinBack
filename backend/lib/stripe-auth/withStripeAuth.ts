import { NextRequest, NextResponse } from "next/server";
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

    try {
      const verified = verifyStripeAppSignature<T>(rawBody, signature);
      return await handler(request, verified);
    } catch (error) {
      console.error("Stripe App signature verification failed:", error);
      console.error("Raw body:", rawBody);
      console.error("Signature header:", signature?.substring(0, 50) + "...");
      console.error("APP_SECRET set:", !!process.env.STRIPE_APP_SECRET);
      console.error("APP_SECRET prefix:", process.env.STRIPE_APP_SECRET?.substring(0, 10));
      return NextResponse.json(
        { error: "Invalid or expired signature", debug: String(error) },
        { status: 401 },
      );
    }
  };
}
