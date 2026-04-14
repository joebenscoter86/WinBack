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

  // Must await -- we depend on the merchant row existing below for the
  // dispute upsert's merchant_id. See WIN-42.
  await ensureMerchant(accountId, userId);

  try {
    const dispute = await getDispute(accountId, disputeId, [
      "charge.customer",
      "payment_intent",
    ]);
    const normalized = normalizeDispute(dispute);
    let localFields: {
      narrative_text: string | null;
      evidence_submitted_at: string | null;
    } = { narrative_text: null, evidence_submitted_at: null };

    // Backfill the dispute row in our database so downstream routes
    // (narrative generate, evidence upload) can trust it exists with
    // real data. This is the canonical entry point for a dispute -- the
    // wizard opens on the Review tab, which calls this route first.
    try {
      const { data: merchant } = await supabase
        .from("merchants")
        .select("id")
        .eq("stripe_account_id", accountId)
        .single();

      if (merchant) {
        const responseDeadline = normalized.evidence_due_by
          ? new Date(normalized.evidence_due_by * 1000).toISOString()
          : null;
        const transactionDate = normalized.transaction_date
          ? new Date(normalized.transaction_date * 1000).toISOString()
          : null;

        const { error: upsertError } = await supabase.from("disputes").upsert(
          {
            merchant_id: merchant.id,
            stripe_dispute_id: normalized.id,
            stripe_charge_id: normalized.charge_id,
            amount: normalized.amount,
            currency: normalized.currency,
            reason_code: normalized.reason_code,
            network: normalized.network,
            status: normalized.status,
            customer_name: normalized.customer_name ?? null,
            transaction_date: transactionDate,
            response_deadline: responseDeadline,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "stripe_dispute_id" },
        );

        if (upsertError) {
          console.error("Failed to backfill dispute row:", upsertError.message);
        }

        // Hydrate persisted narrative + submission state so the wizard can
        // resume a dispute across sessions (WIN-20).
        const { data: localRow } = await supabase
          .from("disputes")
          .select("narrative_text, evidence_submitted_at")
          .eq("stripe_dispute_id", normalized.id)
          .eq("merchant_id", (merchant as { id: string }).id)
          .maybeSingle();
        if (localRow) {
          localFields = localRow as typeof localFields;
        }
      }
    } catch (backfillErr) {
      // Never fail the request because of a backfill error -- the
      // merchant can still read the dispute from Stripe.
      console.error("Dispute backfill unexpected error:", backfillErr);
    }

    return NextResponse.json({ data: { ...normalized, ...localFields } });
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
