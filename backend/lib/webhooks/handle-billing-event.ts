import Stripe from "stripe";
import { supabase } from "@/lib/supabase";
import { cancelUsageSubscription } from "@/lib/billing";
import { env } from "@/lib/env";

/**
 * WIN-24: Apply a Stripe Billing subscription webhook event to merchants.
 * Handles the Pro upgrade lifecycle and payment state changes.
 *
 * Caller is responsible for idempotency (via the webhook_events table).
 */
export async function handleBillingEvent(event: Stripe.Event): Promise<void> {
  switch (event.type) {
    case "customer.subscription.created":
    case "customer.subscription.updated": {
      await applySubscriptionState(event.data.object as Stripe.Subscription);
      return;
    }
    case "customer.subscription.deleted": {
      await applySubscriptionDeletion(event.data.object as Stripe.Subscription);
      return;
    }
    case "invoice.payment_succeeded":
    case "invoice.payment_failed": {
      // Subscription.status (set on the linked subscription) carries the
      // post-invoice state, so the `customer.subscription.updated` event that
      // accompanies these handles the tier/status change. We log-only here.
      return;
    }
    default:
      return;
  }
}

function subscriptionIsPro(sub: Stripe.Subscription): boolean {
  // Prefer metadata tag set at creation time; fall back to matching the Pro
  // price so subscriptions created outside our code path still classify.
  if (sub.metadata?.tier === "pro") return true;
  const priceId = env().STRIPE_PRICE_PRO_MONTHLY;
  return sub.items.data.some((item) => item.price.id === priceId);
}

async function findMerchantByCustomer(
  customerId: string,
): Promise<{ id: string; pro_since_at: string | null } | null> {
  const { data } = await supabase
    .from("merchants")
    .select("id, pro_since_at")
    .eq("stripe_billing_customer_id", customerId)
    .maybeSingle();
  return (data as { id: string; pro_since_at: string | null } | null) ?? null;
}

async function applySubscriptionState(sub: Stripe.Subscription): Promise<void> {
  if (!subscriptionIsPro(sub)) {
    // Usage subscriptions don't drive tier changes — they exist to collect
    // meter events. Ignore their lifecycle events here.
    return;
  }

  const customerId = typeof sub.customer === "string" ? sub.customer : sub.customer.id;
  const merchant = await findMerchantByCustomer(customerId);
  if (!merchant) return;

  // `active` or `trialing` → merchant is Pro. Other statuses (past_due,
  // canceled, unpaid, incomplete) we persist as-is but the merchant stays
  // on Pro until period end — cancellation is handled by the `deleted` event.
  const isActive = sub.status === "active" || sub.status === "trialing";

  const update: Record<string, unknown> = {
    stripe_subscription_id: sub.id,
    subscription_status: sub.status,
  };

  if (isActive) {
    update.billing_tier = "pro";
    if (!merchant.pro_since_at) {
      update.pro_since_at = new Date().toISOString();
    }
  }

  const { error } = await supabase
    .from("merchants")
    .update(update)
    .eq("id", merchant.id);
  if (error) throw new Error(`Update merchant billing: ${error.message}`);

  // Cancel the dormant usage subscription once Pro is live. Safe to call
  // repeatedly — cancelUsageSubscription is idempotent.
  if (isActive) {
    await cancelUsageSubscription(merchant.id);
  }
}

async function applySubscriptionDeletion(sub: Stripe.Subscription): Promise<void> {
  if (!subscriptionIsPro(sub)) {
    // Usage subscription cancellation (e.g. from applySubscriptionState after
    // upgrade) — clear the stored id so the next win re-creates it if the
    // merchant ever reverts to usage tier.
    const customerId = typeof sub.customer === "string" ? sub.customer : sub.customer.id;
    await supabase
      .from("merchants")
      .update({ stripe_usage_subscription_id: null })
      .eq("stripe_billing_customer_id", customerId)
      .eq("stripe_usage_subscription_id", sub.id);
    return;
  }

  const customerId = typeof sub.customer === "string" ? sub.customer : sub.customer.id;
  const merchant = await findMerchantByCustomer(customerId);
  if (!merchant) return;

  // Pro canceled → revert to usage tier. A new usage subscription will be
  // lazily created on the next win (see reportDisputeWonFee).
  const { error } = await supabase
    .from("merchants")
    .update({
      billing_tier: "usage",
      subscription_status: "canceled",
      stripe_subscription_id: null,
      pro_since_at: null,
    })
    .eq("id", merchant.id);
  if (error) throw new Error(`Revert merchant to usage: ${error.message}`);
}
