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
import {
  extractNetworkReasonCode,
  extractNetwork,
} from "@/lib/disputes/to-row";
import { runBackgroundGeneration } from "@/lib/narratives/generate-background";
import { getDispute } from "@/lib/stripe";
import { captureRouteError } from "@/lib/sentry";
import {
  disputeExpiredResponse,
  isDisputeSubmittable,
} from "@/lib/disputes/expired-guard";
import {
  sanitizeFeedbackTags,
  composeFeedback,
} from "@/lib/narratives/feedback-tags";

const MAX_GENERATIONS = 5;

export const POST = withStripeAuth(async (
  _request: NextRequest,
  { identity, body, livemode },
) => {
  const { accountId, userId } = identity;
  const {
    dispute_id,
    reason_code,
    network,
    merchant_feedback,
    merchant_feedback_tags,
  } = body as {
    dispute_id?: string;
    reason_code?: string;
    network?: string;
    merchant_feedback?: string;
    merchant_feedback_tags?: unknown;
  };

  // Drop unknown values silently so a malformed UI payload doesn't block
  // regeneration. Invalid tag strings are filtered out; valid ones survive.
  const tags = sanitizeFeedbackTags(merchant_feedback_tags);
  const composedFeedback = composeFeedback(tags, merchant_feedback);

  if (!dispute_id) {
    return NextResponse.json(
      { error: "Missing dispute_id", code: "invalid_request" },
      { status: 400 },
    );
  }

  await ensureMerchant(accountId, userId);

  // Merchant-scoped dispute lookup in a single query (WIN-42).
  // WIN-78: also pull network + network_reason_code + reason_code so we can
  // resolve the network code server-side instead of trusting client-supplied
  // values (which may be stale or wrong post-WIN-78 for old iframe builds).
  const { data: dispute, error: disputeError } = await getDisputeForAccount<{
    id: string;
    narrative_generations_count: number;
    network: string | null;
    network_reason_code: string | null;
    reason_code: string;
  }>(
    livemode,
    dispute_id,
    accountId,
    "id, narrative_generations_count, network, network_reason_code, reason_code",
  );

  if (disputeError || !dispute) {
    return NextResponse.json(
      { error: "Dispute not found", code: "not_found" },
      { status: 404 },
    );
  }

  // Expired/closed guard (WIN-48) -- don't burn a generation count on a
  // dispute Stripe will no longer accept evidence for. We also reuse the
  // fetched dispute for WIN-78 self-heal below.
  let stripeDispute: Stripe.Dispute;
  try {
    stripeDispute = await getDispute(livemode, accountId, dispute_id);
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
    captureRouteError(err, { route: "narratives.generate.expiry_check", disputeId: dispute_id });
    return NextResponse.json(
      { error: "Failed to verify dispute status", code: "internal_error" },
      { status: 500 },
    );
  }

  // WIN-78: resolve network + network_reason_code server-side. Self-heal
  // from the live Stripe dispute when DB has nulls (webhook-only rows,
  // pre-migration legacy rows). Mirrors the submit route's self-heal.
  let resolvedNetwork = dispute.network;
  let resolvedCode = dispute.network_reason_code;
  if (!resolvedNetwork || !resolvedCode) {
    const healedNetwork = resolvedNetwork ?? extractNetwork(stripeDispute);
    const healedCode = resolvedCode ?? extractNetworkReasonCode(stripeDispute);

    const persistPayload: Record<string, string> = {};
    if (!resolvedNetwork && healedNetwork) persistPayload.network = healedNetwork;
    if (!resolvedCode && healedCode) persistPayload.network_reason_code = healedCode;

    if (Object.keys(persistPayload).length > 0) {
      let q = supabase
        .from("disputes")
        .update(persistPayload)
        .eq("id", dispute.id)
        .eq("livemode", livemode);
      if (persistPayload.network !== undefined) q = q.is("network", null);
      if (persistPayload.network_reason_code !== undefined) {
        q = q.is("network_reason_code", null);
      }
      const { error: persistErr } = await q;
      if (persistErr) {
        captureRouteError(persistErr, {
          route: "narratives.generate.self_heal_persist",
          disputeId: dispute_id,
          extra: { fields: Object.keys(persistPayload) },
        });
      }
    }

    resolvedNetwork = healedNetwork ?? null;
    resolvedCode = healedCode ?? null;
  }

  if (!resolvedNetwork || !resolvedCode) {
    captureRouteError(
      new Error(
        `Cannot resolve network/network_reason_code for narrative generation on dispute ${dispute_id}: missing on both DB and live Stripe dispute (network=${resolvedNetwork ?? "null"}, network_reason_code=${resolvedCode ?? "null"}, reason=${dispute.reason_code})`,
      ),
      {
        route: "narratives.generate.network_reason_code_unresolved",
        disputeId: dispute_id,
        extra: {
          network: dispute.network,
          reason_code: dispute.reason_code,
          stripe_dispute_status: stripeDispute.status,
        },
      },
    );
    return NextResponse.json(
      {
        error:
          "We can't generate a response for this dispute. This usually means it's an unsupported card network or dispute type. Contact support and we'll help you respond manually.",
        code: "unsupported_dispute",
      },
      { status: 422 },
    );
  }

  // Body-supplied reason_code/network are silently ignored when we have DB
  // values; if the iframe ever sends stale values, server-side wins.
  void reason_code;
  void network;

  // Atomic increment via RPC (WIN-42). null means already at limit.
  const { newCount, error: incError } = await incrementNarrativeGenerations(
    dispute.id,
    MAX_GENERATIONS,
  );

  if (incError) {
    console.error("[WIN-18] incrementNarrativeGenerations failed:", incError);
    captureRouteError(incError, { route: "narratives.generate.increment", disputeId: dispute_id });
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
      merchant_feedback: composedFeedback ?? null,
      merchant_feedback_tags: tags ?? null,
      livemode,
    })
    .select("id")
    .single();

  if (insertError || !generation) {
    console.error("[WIN-18] Failed to insert narrative_generation row:", insertError);
    captureRouteError(insertError ?? new Error("insert returned no row"), {
      route: "narratives.generate.insert",
      disputeId: dispute_id,
    });
    return NextResponse.json(
      { error: "Failed to start generation", code: "db_error" },
      { status: 500 },
    );
  }

  const generationId = (generation as { id: string }).id;

  // WIN-60: fire background generation via the callback form of after().
  // Passing a thunk lets Vercel's runtime start the work *after* the response
  // is flushed and hold the function alive until it resolves. The previous
  // `after(runBackgroundGeneration(...))` shape invoked the promise inline on
  // the request's event loop, so on cold / serverless instances the function
  // could terminate before Claude's 3-15s call completed — stranding the
  // narrative_generations row as `pending` forever and burning a generation
  // from the 5-per-dispute cap with no output.
  //
  // The `await` is intentional: in production after() returns void and
  // awaiting void is a no-op. In tests the mocked after() invokes the thunk
  // and returns its promise, so awaiting here lets integration tests observe
  // the resulting DB state before this response resolves (without this the
  // background write races the test's next assertion in CI).
  await after(() =>
    runBackgroundGeneration({
      generationId,
      livemode,
      accountId,
      disputeId: dispute.id,
      stripeDisputeId: dispute_id,
      reasonCode: resolvedCode,
      network: resolvedNetwork,
      merchantFeedback: composedFeedback,
    }),
  );

  return NextResponse.json(
    { generation_id: generationId, status: "pending" },
    { status: 202 },
  );
});
