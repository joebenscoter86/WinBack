import { NextResponse } from "next/server";
import type Stripe from "stripe";

export const SUBMITTABLE_STATUSES = new Set<string>([
  "needs_response",
  "warning_needs_response",
]);

export function isDisputeSubmittable(stripeDispute: Stripe.Dispute): boolean {
  return SUBMITTABLE_STATUSES.has(stripeDispute.status);
}

export function disputeExpiredResponse(stripeDispute: Stripe.Dispute) {
  return NextResponse.json(
    {
      error: `This dispute is no longer accepting evidence. Current status: ${stripeDispute.status}.`,
      code: "dispute_not_submittable",
      dispute_status: stripeDispute.status,
    },
    { status: 409 },
  );
}
