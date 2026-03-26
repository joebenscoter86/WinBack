import { NextRequest, NextResponse } from "next/server";
import { withStripeAuth } from "@/lib/stripe-auth";
import { listDisputes, normalizeDispute, classifyStripeError } from "@/lib/stripe";
import { ensureMerchant } from "@/lib/merchants";
import Stripe from "stripe";

export const POST = withStripeAuth(async (
  request: NextRequest,
  { identity },
) => {
  const { accountId, userId } = identity;
  const piId = request.nextUrl.pathname.split("/").at(-1);

  if (!piId) {
    return NextResponse.json(
      { error: "Missing payment intent ID", code: "invalid_request" },
      { status: 400 },
    );
  }

  ensureMerchant(accountId, userId);

  try {
    const disputes = await listDisputes(accountId, {
      payment_intent: piId,
      limit: 1,
      expand: ["data.charge.customer"],
    });

    if (disputes.length === 0) {
      return NextResponse.json(
        { error: "No dispute found for this payment", code: "not_found" },
        { status: 404 },
      );
    }

    const normalized = normalizeDispute(disputes[0]);
    return NextResponse.json({ data: normalized });
  } catch (err) {
    if (err instanceof Stripe.errors.StripeError) {
      const classified = classifyStripeError(err);
      return NextResponse.json(
        { error: classified.message, code: classified.code },
        { status: classified.status },
      );
    }
    console.error("Unexpected error looking up dispute by PI:", err);
    return NextResponse.json(
      { error: "Internal server error", code: "internal_error" },
      { status: 500 },
    );
  }
});
