import { NextRequest, NextResponse } from "next/server";
import { after } from "next/server";
import Stripe from "stripe";
import { withStripeAuth } from "@/lib/stripe-auth";
import { ensureMerchant } from "@/lib/merchants";
import { supabase } from "@/lib/supabase";
import {
  getDisputeForAccount,
  incrementNarrativeGenerations,
} from "@/lib/disputes";
import { runBackgroundGeneration } from "@/lib/narratives/generate-background";
import { getDispute } from "@/lib/stripe";
import {
  disputeExpiredResponse,
  isDisputeSubmittable,
} from "@/lib/disputes/expired-guard";

const MAX_GENERATIONS = 5;

export const POST = withStripeAuth(async (
  _request: NextRequest,
  { identity, body },
) => {
  const { accountId, userId } = identity;
  const { dispute_id, reason_code, network, merchant_feedback } = body as {
    dispute_id?: string;
    reason_code?: string;
    network?: string;
    merchant_feedback?: string;
  };

  if (!dispute_id || !reason_code || !network) {
    return NextResponse.json(
      { error: "Missing dispute_id, reason_code, or network", code: "invalid_request" },
      { status: 400 },
    );
  }

  await ensureMerchant(accountId, userId);

  // Merchant-scoped dispute lookup in a single query (WIN-42).
  const { data: dispute, error: disputeError } = await getDisputeForAccount<{
    id: string;
    narrative_generations_count: number;
  }>(dispute_id, accountId, "id, narrative_generations_count");

  if (disputeError || !dispute) {
    return NextResponse.json(
      { error: "Dispute not found", code: "not_found" },
      { status: 404 },
    );
  }

  // Expired/closed guard (WIN-48) -- don't burn a generation count on a
  // dispute Stripe will no longer accept evidence for.
  try {
    const stripeDispute = await getDispute(accountId, dispute_id);
    if (!isDisputeSubmittable(stripeDispute)) {
      return disputeExpiredResponse(stripeDispute);
    }
  } catch (err) {
    if (err instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: err.message, code: "stripe_error" },
        { status: err.statusCode ?? 502 },
      );
    }
    console.error("[WIN-48] Failed to fetch dispute for expiry check:", err);
    return NextResponse.json(
      { error: "Failed to verify dispute status", code: "internal_error" },
      { status: 500 },
    );
  }

  // Atomic increment via RPC (WIN-42). null means already at limit.
  const { newCount, error: incError } = await incrementNarrativeGenerations(
    dispute.id,
    MAX_GENERATIONS,
  );

  if (incError) {
    console.error("[WIN-18] incrementNarrativeGenerations failed:", incError);
    return NextResponse.json(
      { error: "Failed to start generation", code: "db_error" },
      { status: 500 },
    );
  }

  if (newCount === null) {
    return NextResponse.json(
      {
        error:
          "You've used all 5 narrative generations for this dispute. You can edit the current narrative manually.",
        code: "generation_limit",
      },
      { status: 429 },
    );
  }

  // Insert pending generation row
  const { data: generation, error: insertError } = await supabase
    .from("narrative_generations")
    .insert({
      dispute_id: dispute.id,
      status: "pending",
      generation_number: newCount,
      merchant_feedback: merchant_feedback ?? null,
    })
    .select("id")
    .single();

  if (insertError || !generation) {
    console.error("[WIN-18] Failed to insert narrative_generation row:", insertError);
    return NextResponse.json(
      { error: "Failed to start generation", code: "db_error" },
      { status: 500 },
    );
  }

  const generationId = (generation as { id: string }).id;

  // Fire background generation (non-blocking via Next.js after() API).
  // We await after() so that in test environments the mocked after()
  // (which returns the promise directly) propagates the background work
  // inline. In production, after() returns void and awaiting void is a no-op.
  await after(
    runBackgroundGeneration({
      generationId,
      accountId,
      disputeId: dispute.id,
      stripeDisputeId: dispute_id,
      reasonCode: reason_code,
      network,
      merchantFeedback: merchant_feedback,
    }),
  );

  return NextResponse.json(
    { generation_id: generationId, status: "pending" },
    { status: 202 },
  );
});
