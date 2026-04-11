import { NextRequest, NextResponse } from "next/server";
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

  // 2. Upsert merchant row
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

  // 6. Increment count
  const newCount = currentCount + 1;
  await supabase
    .from("disputes")
    .update({ narrative_generations_count: newCount })
    .eq("id", (dispute as { id: string }).id);

  // 7. Insert pending generation row
  const { data: generation, error: insertError } = await supabase
    .from("narrative_generations")
    .insert({
      dispute_id: (dispute as { id: string }).id,
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

  // 8. Fire background generation (non-blocking)
  const backgroundPromise = runBackgroundGeneration({
    generationId: (generation as { id: string }).id,
    disputeId: (dispute as { id: string }).id,
    stripeDisputeId: dispute_id,
    reasonCode: reason_code,
    network,
    merchantFeedback: merchant_feedback,
  });

  if (typeof (globalThis as Record<string, unknown>).waitUntil === "function") {
    (globalThis as Record<string, unknown> & { waitUntil: (p: Promise<unknown>) => void }).waitUntil(backgroundPromise);
  } else {
    backgroundPromise.catch((err) => {
      console.error("[WIN-18] Background generation error (dev mode):", err);
    });
  }

  // 9. Return 202 Accepted
  return NextResponse.json(
    { generation_id: (generation as { id: string }).id, status: "pending" },
    { status: 202 },
  );
});
