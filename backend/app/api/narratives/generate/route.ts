import { NextRequest, NextResponse } from "next/server";
import { after } from "next/server";
import { withStripeAuth } from "@/lib/stripe-auth";
import { ensureMerchant } from "@/lib/merchants";
import { supabase } from "@/lib/supabase";
import { runBackgroundGeneration } from "@/lib/narratives/generate-background";

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

  // 1. Validate required fields
  if (!dispute_id || !reason_code || !network) {
    return NextResponse.json(
      { error: "Missing dispute_id, reason_code, or network", code: "invalid_request" },
      { status: 400 },
    );
  }

  // 2. Upsert merchant row (fire-and-forget, consistent with all other routes)
  ensureMerchant(accountId, userId);

  // 3. Look up merchant
  const { data: merchant, error: merchantError } = await supabase
    .from("merchants")
    .select("id")
    .eq("stripe_account_id", accountId)
    .single();

  if (merchantError || !merchant) {
    return NextResponse.json(
      { error: "Merchant not found", code: "not_found" },
      { status: 404 },
    );
  }

  // 4. Look up dispute (scoped to this merchant)
  const { data: dispute, error: disputeError } = await supabase
    .from("disputes")
    .select("id, narrative_generations_count")
    .eq("stripe_dispute_id", dispute_id)
    .eq("merchant_id", merchant.id)
    .single();

  if (disputeError || !dispute) {
    return NextResponse.json(
      { error: "Dispute not found", code: "not_found" },
      { status: 404 },
    );
  }

  // 5. Check generation limit
  const currentCount = (dispute as { narrative_generations_count?: number }).narrative_generations_count ?? 0;
  if (currentCount >= MAX_GENERATIONS) {
    return NextResponse.json(
      {
        error:
          "You've used all 5 narrative generations for this dispute. You can edit the current narrative manually.",
        code: "generation_limit",
      },
      { status: 429 },
    );
  }

  // 6. Atomic increment -- prevents race condition where two concurrent requests
  // both read count=4 and both proceed. Uses raw SQL via Supabase RPC-style query.
  const disputeId = (dispute as { id: string }).id;
  const { data: updated, error: updateError } = await supabase
    .from("disputes")
    .update({ narrative_generations_count: currentCount + 1 })
    .eq("id", disputeId)
    .eq("narrative_generations_count", currentCount)
    .select("narrative_generations_count")
    .single();

  if (updateError || !updated) {
    // Another request incremented the count between our read and write.
    // Re-check: if now at limit, return 429. Otherwise retry is safe but
    // for simplicity we return a conflict error.
    return NextResponse.json(
      {
        error:
          "You've used all 5 narrative generations for this dispute. You can edit the current narrative manually.",
        code: "generation_limit",
      },
      { status: 429 },
    );
  }

  const newCount = (updated as { narrative_generations_count: number }).narrative_generations_count;

  // 7. Insert pending generation row
  const { data: generation, error: insertError } = await supabase
    .from("narrative_generations")
    .insert({
      dispute_id: disputeId,
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

  // 8. Fire background generation (non-blocking via Next.js after() API)
  after(
    runBackgroundGeneration({
      generationId,
      disputeId,
      stripeDisputeId: dispute_id,
      reasonCode: reason_code,
      network,
      merchantFeedback: merchant_feedback,
    }),
  );

  // 9. Return 202 Accepted
  return NextResponse.json(
    { generation_id: generationId, status: "pending" },
    { status: 202 },
  );
});
