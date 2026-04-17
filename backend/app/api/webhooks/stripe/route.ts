import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { supabase } from "@/lib/supabase";
import { handleDisputeEvent } from "@/lib/webhooks/handle-dispute-event";
import { captureRouteError } from "@/lib/sentry";

const HANDLED_EVENT_TYPES = new Set<Stripe.Event.Type>([
  "charge.dispute.created",
  "charge.dispute.updated",
  "charge.dispute.closed",
]);

let _stripe: Stripe | null = null;
function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error("Missing STRIPE_SECRET_KEY");
    _stripe = new Stripe(key);
  }
  return _stripe;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("[WIN-21] STRIPE_WEBHOOK_SECRET not configured");
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  const rawBody = await request.text();

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    captureRouteError(err, {
      route: "webhooks.stripe.signature",
      extra: { signature_prefix: signature.substring(0, 20) },
    });
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // Idempotency: insert event id; if conflict, we've seen this event before.
  const accountId = event.account ?? null;
  const { error: insertErr } = await supabase
    .from("webhook_events")
    .insert({
      event_id: event.id,
      event_type: event.type,
      account_id: accountId,
      status: "pending",
    });

  if (insertErr) {
    // Duplicate key = already processed (or in flight). Stripe expects 2xx.
    if (insertErr.code === "23505") {
      return NextResponse.json({ ok: true, deduped: true });
    }
    captureRouteError(insertErr, {
      route: "webhooks.stripe.dedup_insert",
      extra: { event_id: event.id, event_type: event.type },
    });
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }

  if (!HANDLED_EVENT_TYPES.has(event.type)) {
    // Mark processed so we don't retry on next delivery.
    await supabase
      .from("webhook_events")
      .update({ status: "processed", processed_at: new Date().toISOString() })
      .eq("event_id", event.id);
    return NextResponse.json({ ok: true, ignored: true });
  }

  if (!accountId) {
    // Connect dispute events should always have event.account set. If not,
    // something is misconfigured upstream — surface it but don't 500 (Stripe
    // would retry forever).
    await supabase
      .from("webhook_events")
      .update({
        status: "failed",
        error_message: "missing event.account",
        processed_at: new Date().toISOString(),
      })
      .eq("event_id", event.id);
    captureRouteError(new Error("Webhook event missing account"), {
      route: "webhooks.stripe.missing_account",
      extra: { event_id: event.id, event_type: event.type },
    });
    return NextResponse.json({ ok: true, error: "missing account" });
  }

  try {
    await handleDisputeEvent(event, accountId);
    await supabase
      .from("webhook_events")
      .update({ status: "processed", processed_at: new Date().toISOString() })
      .eq("event_id", event.id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    await supabase
      .from("webhook_events")
      .update({
        status: "failed",
        error_message: err instanceof Error ? err.message : String(err),
        processed_at: new Date().toISOString(),
      })
      .eq("event_id", event.id);
    captureRouteError(err, {
      route: "webhooks.stripe.handler",
      extra: { event_id: event.id, event_type: event.type, merchant_id: accountId },
    });
    // 500 → Stripe retries. We only return 500 for transient errors; the
    // signature/dedup paths above return 2xx so Stripe stops retrying.
    return NextResponse.json({ error: "Handler failed" }, { status: 500 });
  }
}
