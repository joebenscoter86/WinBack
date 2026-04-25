import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { supabase } from "@/lib/supabase";
import { handleBillingEvent } from "@/lib/webhooks/handle-billing-event";
import { captureRouteError } from "@/lib/sentry";
import { env } from "@/lib/env";

/**
 * WIN-24: Stripe Billing webhook. Separate from the dispute webhook (/api/webhooks/stripe)
 * because it runs against a different Stripe endpoint with its own signing
 * secret, and its events target the platform account (subscription lifecycle)
 * rather than Connect accounts (dispute events).
 */
const HANDLED_EVENT_TYPES = new Set<Stripe.Event.Type>([
  "customer.subscription.created",
  "customer.subscription.updated",
  "customer.subscription.deleted",
  "invoice.payment_succeeded",
  "invoice.payment_failed",
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

  const webhookSecret = env().STRIPE_BILLING_WEBHOOK_SECRET;

  const rawBody = await request.text();

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    captureRouteError(err, {
      route: "webhooks.stripe_billing.signature",
      extra: { signature_prefix: signature.substring(0, 20) },
    });
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const { error: insertErr } = await supabase
    .from("webhook_events")
    .insert({
      event_id: event.id,
      event_type: event.type,
      account_id: null,
      status: "pending",
    });

  if (insertErr) {
    if (insertErr.code === "23505") {
      return NextResponse.json({ ok: true, deduped: true });
    }
    captureRouteError(insertErr, {
      route: "webhooks.stripe_billing.dedup_insert",
      extra: { event_id: event.id, event_type: event.type },
    });
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }

  if (!HANDLED_EVENT_TYPES.has(event.type)) {
    await supabase
      .from("webhook_events")
      .update({ status: "processed", processed_at: new Date().toISOString() })
      .eq("event_id", event.id);
    return NextResponse.json({ ok: true, ignored: true });
  }

  try {
    await handleBillingEvent(event);
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
      route: "webhooks.stripe_billing.handler",
      extra: { event_id: event.id, event_type: event.type },
    });
    return NextResponse.json({ error: "Handler failed" }, { status: 500 });
  }
}
