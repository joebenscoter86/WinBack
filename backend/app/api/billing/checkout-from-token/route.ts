import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { verifyToken } from "@/lib/upgrade-token";
import { createProCheckoutSession } from "@/lib/billing";
import { captureRouteError } from "@/lib/sentry";
import { checkBillingTokenRateLimit, getClientIp } from "@/lib/rate-limit";

/**
 * Public (token-gated) endpoint hit by the /upgrade confirmation page.
 * Verifies the HMAC-signed token, resolves the merchant, creates a Stripe
 * Checkout session, and returns the hosted Checkout URL.
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  // Rate limit before any work — this route is unauthenticated (token-gated)
  // and reachable from any IP. Bail at the cheapest possible point.
  const clientIp = getClientIp(request);
  const rl = await checkBillingTokenRateLimit(clientIp);
  if (!rl.success) {
    return NextResponse.json(
      { error: "Too many requests. Try again shortly.", code: "rate_limited" },
      {
        status: 429,
        headers: {
          "Retry-After": Math.max(
            1,
            Math.ceil((rl.reset - Date.now()) / 1000),
          ).toString(),
        },
      },
    );
  }

  let body: { token?: unknown } = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON", code: "invalid_request" },
      { status: 400 },
    );
  }
  const token = typeof body.token === "string" ? body.token : "";
  if (!token) {
    return NextResponse.json(
      { error: "Missing token", code: "invalid_request" },
      { status: 400 },
    );
  }

  let payload;
  try {
    payload = verifyToken(token);
  } catch (err) {
    return NextResponse.json(
      {
        error: err instanceof Error ? err.message : "Invalid token",
        code: "invalid_token",
      },
      { status: 401 },
    );
  }

  if (payload.kind !== "upgrade") {
    return NextResponse.json(
      { error: "Token is not an upgrade token", code: "invalid_token_kind" },
      { status: 400 },
    );
  }

  const { data: merchant, error } = await supabase
    .from("merchants")
    .select("id, billing_tier")
    .eq("id", payload.merchant_id)
    .maybeSingle();

  if (error || !merchant) {
    return NextResponse.json(
      { error: "Merchant not found", code: "not_found" },
      { status: 404 },
    );
  }

  const row = merchant as { id: string; billing_tier: "usage" | "pro" };
  if (row.billing_tier === "pro") {
    return NextResponse.json(
      { error: "Already on Pro", code: "already_pro" },
      { status: 409 },
    );
  }

  try {
    const { url, sessionId } = await createProCheckoutSession({
      merchantId: row.id,
      successUrl: "https://winbackpay.com/upgrade/success",
      cancelUrl: "https://winbackpay.com/upgrade/cancelled",
    });
    return NextResponse.json({ url, session_id: sessionId });
  } catch (err) {
    captureRouteError(err, {
      route: "billing.checkout-from-token",
      extra: { merchant_id: row.id },
    });
    return NextResponse.json(
      { error: "Failed to create checkout session", code: "internal_error" },
      { status: 500 },
    );
  }
}
