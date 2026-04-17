import { NextRequest, NextResponse } from "next/server";
import { withStripeAuth } from "@/lib/stripe-auth";
import { getDispute, normalizeDispute, classifyStripeError } from "@/lib/stripe";
import { ensureMerchant } from "@/lib/merchants";
import { supabase } from "@/lib/supabase";
import { getDisputeForAccount } from "@/lib/disputes";
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

  // This route is the canonical entry point for a dispute -- it backfills
  // the local row from Stripe. We need the merchant row to exist before
  // the upsert can reference its id, so await is mandatory (WIN-42).
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
      checklist_state: Record<string, boolean>;
      checklist_notes: Record<string, string>;
    } = {
      narrative_text: null,
      evidence_submitted_at: null,
      checklist_state: {},
      checklist_notes: {},
    };

    // Backfill the dispute row in our database so downstream routes
    // (narrative generate, evidence upload) can trust it exists with
    // real data. This is the only route that needs the raw merchant.id
    // (to populate the upsert payload's merchant_id); every other route
    // uses getDisputeForAccount to scope in a single query.
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
            merchant_id: (merchant as { id: string }).id,
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

        // Hydrate persisted narrative + submission + checklist state so the
        // wizard can resume a dispute across sessions AND across tab switches
        // within the same session. (WIN-20, WIN-49)
        const { data: localRow } = await getDisputeForAccount<{
          narrative_text: string | null;
          evidence_submitted_at: string | null;
          checklist_state: Record<string, boolean> | null;
          checklist_notes: Record<string, string> | null;
        }>(
          normalized.id,
          accountId,
          "narrative_text, evidence_submitted_at, checklist_state, checklist_notes",
        );
        if (localRow) {
          localFields = {
            narrative_text: localRow.narrative_text,
            evidence_submitted_at: localRow.evidence_submitted_at,
            checklist_state: localRow.checklist_state ?? {},
            checklist_notes: localRow.checklist_notes ?? {},
          };
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
  { identity, body },
) => {
  const { accountId, userId } = identity;
  const disputeId = request.nextUrl.pathname.split("/").at(-1);

  if (!disputeId) {
    return NextResponse.json(
      { error: "Missing dispute ID", code: "invalid_request" },
      { status: 400 },
    );
  }

  // Await -- the PATCH may fall back to upserting a row with merchant_id,
  // which requires the merchant row to exist (WIN-42).
  await ensureMerchant(accountId, userId);

  // Use the body parsed by withStripeAuth -- the request body stream was
  // consumed during signature verification and cannot be re-read here.
  // (WIN-49: discovered during QA when checklist notes were silently failing
  // to persist with TypeError: unusable.)
  const { checklist_state, checklist_notes } = body as {
    checklist_state?: Record<string, boolean>;
    checklist_notes?: Record<string, string>;
  };

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

  // Verify the dispute belongs to this merchant before updating (WIN-42).
  const { data: scoped } = await getDisputeForAccount<{ id: string }>(
    disputeId,
    accountId,
    "id",
  );

  if (scoped) {
    const { data, error } = await supabase
      .from("disputes")
      .update(updatePayload)
      .eq("id", scoped.id)
      .select()
      .single();

    if (error) {
      console.error("Failed to update checklist:", error);
      return NextResponse.json(
        { error: "Failed to save checklist", code: "db_error" },
        { status: 500 },
      );
    }

    return NextResponse.json({ data });
  }

  // Dispute row doesn't exist yet for this merchant -- fall back to an
  // upsert so checklist state saved before the Review tab loaded isn't
  // silently dropped. This matches the pre-WIN-42 behavior.
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
        merchant_id: (merchant as { id: string } | null)?.id,
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
});
