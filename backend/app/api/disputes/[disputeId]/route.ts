import { NextRequest, NextResponse } from "next/server";
import { withStripeAuth } from "@/lib/stripe-auth";
import { getDispute, normalizeDispute, classifyStripeError } from "@/lib/stripe";
import { ensureMerchant } from "@/lib/merchants";
import { supabase } from "@/lib/supabase";
import { getDisputeForAccount } from "@/lib/disputes";
import { disputeToRow } from "@/lib/disputes/to-row";
import Stripe from "stripe";

export const POST = withStripeAuth(async (
  request: NextRequest,
  { identity, livemode },
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
    const dispute = await getDispute(livemode, accountId, disputeId, [
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
        const transactionDate = normalized.transaction_date
          ? new Date(normalized.transaction_date * 1000).toISOString()
          : null;

        // Base fields (status, response_deadline, charge_id, amount,
        // currency) come from the shared disputeToRow so the webhook and
        // on-view backfill paths can't silently disagree on `status` --
        // that's what the Insights aggregator buckets resolved/won/lost
        // counts on, and any drift here would miscount.
        const baseRow = disputeToRow(dispute);

        // disputeToRow writes the canonical reason_code (Stripe coarse) and
        // network_reason_code (preferring top-level d.network_reason_code,
        // else nested payment_method_details.card.network_reason_code, else
        // null). For webhook-only payloads where Stripe hasn't yet populated
        // either field, those land as null in baseRow. We must NOT spread
        // those nulls into the upsert -- that would clobber a previously-good
        // DB value (e.g. one written by an earlier view-backfill or by the
        // submit self-heal path). Strip nulls first, then layer on the
        // normalize-derived overrides only when normalize produced a usable
        // value. (WIN-78)
        const { network: baseNetwork, network_reason_code: baseNetworkCode, ...baseRest } =
          baseRow;
        const cleanRow: Record<string, unknown> = { ...baseRest };
        if (baseNetwork) cleanRow.network = baseNetwork;
        if (baseNetworkCode) cleanRow.network_reason_code = baseNetworkCode;
        if (normalized.network && normalized.network !== "unknown") {
          cleanRow.network = normalized.network;
        }
        if (normalized.reason_code) {
          cleanRow.network_reason_code = normalized.reason_code;
        }

        const { error: upsertError } = await supabase.from("disputes").upsert(
          {
            ...cleanRow,
            merchant_id: (merchant as { id: string }).id,
            customer_name: normalized.customer_name ?? null,
            transaction_date: transactionDate,
            livemode,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "stripe_dispute_id" },
        );

        if (upsertError) {
          console.error("Failed to backfill dispute row:", upsertError.message);
        }

        // WIN-26: mark the dispute as viewed the first time the merchant
        // opens it. Done via a guarded update rather than the upsert above
        // so webhook retries or Stripe-driven updates never re-clear the
        // timestamp.
        await supabase
          .from("disputes")
          .update({ viewed_at: new Date().toISOString() })
          .eq("stripe_dispute_id", normalized.id)
          .eq("livemode", livemode)
          .is("viewed_at", null);

        // Hydrate persisted narrative + submission + checklist state so the
        // wizard can resume a dispute across sessions AND across tab switches
        // within the same session. (WIN-20, WIN-49)
        const { data: localRow } = await getDisputeForAccount<{
          narrative_text: string | null;
          evidence_submitted_at: string | null;
          checklist_state: Record<string, boolean> | null;
          checklist_notes: Record<string, string> | null;
        }>(
          livemode,
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
  { identity, body, livemode },
) => {
  const { accountId, userId } = identity;
  const disputeId = request.nextUrl.pathname.split("/").at(-1);

  if (!disputeId) {
    return NextResponse.json(
      { error: "Missing dispute ID", code: "invalid_request" },
      { status: 400 },
    );
  }

  // Ensure the caller's merchant row exists for downstream code paths --
  // PATCH itself does not insert merchants, but other routes co-running
  // for this user expect the row to be present (WIN-42).
  await ensureMerchant(accountId, userId);

  // Use the body parsed by withStripeAuth -- the request body stream was
  // consumed during signature verification and cannot be re-read here.
  // (WIN-49: discovered during QA when checklist notes were silently failing
  // to persist with TypeError: unusable.)
  const { checklist_state, checklist_notes, narrative_text } = body as {
    checklist_state?: Record<string, boolean>;
    checklist_notes?: Record<string, string>;
    narrative_text?: string | null;
  };

  const updatePayload: Record<string, unknown> = {};
  if (checklist_state && typeof checklist_state === "object") {
    updatePayload.checklist_state = checklist_state;
  }
  if (checklist_notes && typeof checklist_notes === "object") {
    updatePayload.checklist_notes = checklist_notes;
  }
  // Mirrors the WIN-49 lesson: persist user-edited narrative drafts on every
  // keystroke so closing the FocusView mid-edit does not silently discard
  // text. Only string and explicit null are honored; anything else is ignored.
  if (typeof narrative_text === "string" || narrative_text === null) {
    updatePayload.narrative_text = narrative_text;
  }

  if (Object.keys(updatePayload).length === 0) {
    return NextResponse.json(
      { error: "No valid fields to update", code: "invalid_request" },
      { status: 400 },
    );
  }

  // WIN-79: PATCH must require an already-scoped dispute row. The previous
  // implementation fell through to an upsert keyed on the globally-unique
  // stripe_dispute_id when getDisputeForAccount returned null, with a
  // payload that set merchant_id to the caller. That meant any
  // authenticated merchant could rewrite another merchant's row by
  // PATCHing their du_* id (the service-role client bypasses RLS). The
  // canonical entry point is POST /api/disputes/[id], which backfills
  // through a Stripe-account-scoped path; legit clients always POST
  // before they PATCH.
  const { data: scoped } = await getDisputeForAccount<{ id: string }>(
    livemode,
    disputeId,
    accountId,
    "id",
  );

  if (!scoped) {
    return NextResponse.json(
      { error: "Dispute not found", code: "not_found" },
      { status: 404 },
    );
  }

  const { data, error } = await supabase
    .from("disputes")
    .update(updatePayload)
    .eq("id", scoped.id)
    .select()
    .single();

  if (error) {
    console.error("Failed to update dispute:", error);
    return NextResponse.json(
      { error: "Failed to save changes", code: "db_error" },
      { status: 500 },
    );
  }

  return NextResponse.json({ data });
});
