import { NextRequest, NextResponse } from "next/server";
import { withStripeAuth } from "@/lib/stripe-auth";
import { getDispute, normalizeDispute, classifyStripeError } from "@/lib/stripe";
import { ensureMerchant } from "@/lib/merchants";
import { supabase } from "@/lib/supabase";
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

export const PATCH = withStripeAuth(async (
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

  const body = JSON.parse(await request.clone().text());
  const { checklist_state, checklist_notes } = body;

  // Build update payload from provided fields
  const updatePayload: Record<string, unknown> = {};
  if (checklist_state && typeof checklist_state === "object") {
    updatePayload.checklist_state = checklist_state;
  }
  if (checklist_notes && typeof checklist_notes === "object") {
    updatePayload.checklist_notes = checklist_notes;
  }

  if (Object.keys(updatePayload).length === 0) {
    return NextResponse.json(
      { error: "No valid fields to update", code: "invalid_request" },
      { status: 400 },
    );
  }

  const { data, error } = await supabase
    .from("disputes")
    .update(updatePayload)
    .eq("stripe_dispute_id", disputeId)
    .select()
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      const { data: merchant } = await supabase
        .from("merchants")
        .select("id")
        .eq("stripe_account_id", accountId)
        .single();

      const { data: inserted, error: insertError } = await supabase
        .from("disputes")
        .upsert(
          {
            stripe_dispute_id: disputeId,
            merchant_id: merchant?.id,
            amount: 0,
            reason_code: "",
            ...updatePayload,
          },
          { onConflict: "stripe_dispute_id" },
        )
        .select()
        .single();

      if (insertError) {
        console.error("Failed to upsert dispute checklist:", insertError);
        return NextResponse.json(
          { error: "Failed to save checklist", code: "db_error" },
          { status: 500 },
        );
      }

      return NextResponse.json({ data: inserted });
    }

    console.error("Failed to update checklist:", error);
    return NextResponse.json(
      { error: "Failed to save checklist", code: "db_error" },
      { status: 500 },
    );
  }

  return NextResponse.json({ data });
});
