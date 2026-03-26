import { NextRequest, NextResponse } from "next/server";
import { withStripeAuth } from "@/lib/stripe-auth";
import { getDispute, normalizeDispute, classifyStripeError } from "@/lib/stripe";
import { ensureMerchant } from "@/lib/merchants";
import Stripe from "stripe";

export const POST = withStripeAuth(async (
  request: NextRequest,
  { identity },
) => {
  const { accountId, userId } = identity;
  const disputeId = request.nextUrl.pathname.split("/").at(-1);

  if (!disputeId) {
    return NextResponse.json(
      { error: "Missing dispute ID", code: "invalid_request" },
      { status: 400 },
    );
  }

  ensureMerchant(accountId, userId);

  try {
    const dispute = await getDispute(accountId, disputeId, [
      "charge.customer",
    ]);
    const normalized = normalizeDispute(dispute);

    return NextResponse.json({ data: normalized });
  } catch (err) {
    if (err instanceof Stripe.errors.StripeError) {
      const classified = classifyStripeError(err);
      return NextResponse.json(
        { error: classified.message, code: classified.code },
        { status: classified.status },
      );
    }
    console.error("Unexpected error fetching dispute:", err);
    return NextResponse.json(
      { error: "Internal server error", code: "internal_error" },
      { status: 500 },
    );
  }
});
