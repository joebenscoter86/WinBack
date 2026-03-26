import { NextResponse } from "next/server";
import { withStripeAuth } from "@/lib/stripe-auth";
import { listDisputes, normalizeDispute, classifyStripeError } from "@/lib/stripe";
import { ensureMerchant } from "@/lib/merchants";
import Stripe from "stripe";

export const POST = withStripeAuth(async (_request, { identity }) => {
  const { accountId, userId } = identity;

  // Fire-and-forget merchant upsert
  ensureMerchant(accountId, userId);

  try {
    const disputes = await listDisputes(accountId, {
      limit: 100,
      expand: ["data.charge.customer"],
    });

    const normalized = disputes.map(normalizeDispute);

    return NextResponse.json({ data: normalized });
  } catch (err) {
    if (err instanceof Stripe.errors.StripeError) {
      const classified = classifyStripeError(err);
      return NextResponse.json(
        { error: classified.message, code: classified.code },
        { status: classified.status },
      );
    }
    console.error("Unexpected error listing disputes:", err);
    return NextResponse.json(
      { error: "Internal server error", code: "internal_error" },
      { status: 500 },
    );
  }
});
