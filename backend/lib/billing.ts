/**
 * WIN-24: Hybrid billing (15% success fee + $79/mo Pro).
 *
 * The merchant's Stripe Connect account (where disputes live) is separate from
 * their WinBack billing customer (which lives on OUR platform Stripe account).
 * Everything in this file uses the platform Stripe client — never a Connect
 * stripeAccount header.
 *
 * Tier model:
 *  - `usage`: no recurring fee. On each won dispute, we report a meter event
 *    for 15% of the recovered amount. A dormant usage subscription is lazily
 *    created the first time a merchant wins.
 *  - `pro`: $79/month flat, no success fee. From `pro_since_at` forward we
 *    skip usage metering. The usage subscription is canceled on upgrade so
 *    it doesn't keep producing $0 invoices.
 */
import Stripe from "stripe";
import { supabase } from "@/lib/supabase";
import { env } from "@/lib/env";

export const SUCCESS_FEE_RATE = 0.15;
export const METER_EVENT_NAME = "dispute_won_fee";

let _stripe: Stripe | null = null;
function getStripe(): Stripe {
  if (!_stripe) {
    const key = env().STRIPE_SECRET_KEY;
    _stripe = new Stripe(key);
  }
  return _stripe;
}

export function calculateSuccessFeeCents(amountRecoveredCents: number): number {
  return Math.round(amountRecoveredCents * SUCCESS_FEE_RATE);
}

type MerchantBillingRow = {
  id: string;
  stripe_account_id: string;
  email: string | null;
  business_name: string | null;
  billing_tier: "usage" | "pro";
  stripe_billing_customer_id: string | null;
  stripe_usage_subscription_id: string | null;
  stripe_subscription_id: string | null;
  subscription_status: string | null;
  pro_since_at: string | null;
};

async function getMerchant(merchantId: string): Promise<MerchantBillingRow> {
  const { data, error } = await supabase
    .from("merchants")
    .select(
      "id, stripe_account_id, email, business_name, billing_tier, stripe_billing_customer_id, stripe_usage_subscription_id, stripe_subscription_id, subscription_status, pro_since_at",
    )
    .eq("id", merchantId)
    .maybeSingle();
  if (error) throw new Error(`Merchant lookup failed: ${error.message}`);
  if (!data) throw new Error(`Merchant not found: ${merchantId}`);
  return data as MerchantBillingRow;
}

/**
 * Ensure the merchant has a Stripe Customer on OUR platform account. Idempotent.
 * Returns the customer ID. Writes it back to merchants on first create.
 */
export async function getOrCreateBillingCustomer(
  merchantId: string,
): Promise<string> {
  const merchant = await getMerchant(merchantId);
  if (merchant.stripe_billing_customer_id) {
    return merchant.stripe_billing_customer_id;
  }

  const customer = await getStripe().customers.create({
    email: merchant.email ?? undefined,
    name: merchant.business_name ?? undefined,
    metadata: {
      merchant_id: merchant.id,
      stripe_account_id: merchant.stripe_account_id,
    },
  });

  const { error } = await supabase
    .from("merchants")
    .update({ stripe_billing_customer_id: customer.id })
    .eq("id", merchantId);
  if (error) throw new Error(`Failed to persist billing customer: ${error.message}`);

  return customer.id;
}

/**
 * Ensure the merchant has an active usage-tier subscription so meter events
 * are billable. Idempotent. Only call for usage-tier merchants.
 */
export async function getOrCreateUsageSubscription(
  merchantId: string,
): Promise<string> {
  const merchant = await getMerchant(merchantId);
  if (merchant.stripe_usage_subscription_id) {
    return merchant.stripe_usage_subscription_id;
  }

  const customerId = await getOrCreateBillingCustomer(merchantId);
  const priceId = env().STRIPE_PRICE_USAGE_FEE;

  const subscription = await getStripe().subscriptions.create({
    customer: customerId,
    items: [{ price: priceId }],
    metadata: { merchant_id: merchantId, tier: "usage" },
  });

  const { error } = await supabase
    .from("merchants")
    .update({ stripe_usage_subscription_id: subscription.id })
    .eq("id", merchantId);
  if (error) {
    throw new Error(`Failed to persist usage subscription: ${error.message}`);
  }

  return subscription.id;
}

/**
 * Report a won-dispute success fee as a Stripe meter event. Idempotent via the
 * `identifier` field (keyed by dispute id), so webhook retries or reconciliation
 * re-plays never double-charge.
 *
 * Only call when `billing_tier === 'usage'` AND the transition is to `won`.
 */
export async function reportDisputeWonFee(params: {
  merchantId: string;
  disputeId: string;
  amountRecoveredCents: number;
}): Promise<{ feeCents: number; identifier: string }> {
  const { merchantId, disputeId, amountRecoveredCents } = params;
  const feeCents = calculateSuccessFeeCents(amountRecoveredCents);

  // Ensure customer + subscription exist before posting the meter event,
  // otherwise the event has nowhere to bill against.
  const customerId = await getOrCreateBillingCustomer(merchantId);
  await getOrCreateUsageSubscription(merchantId);

  const identifier = `dispute_won:${disputeId}`;

  await getStripe().billing.meterEvents.create({
    event_name: METER_EVENT_NAME,
    payload: {
      stripe_customer_id: customerId,
      value: String(feeCents),
    },
    identifier,
  });

  return { feeCents, identifier };
}

/**
 * Create a Stripe Checkout session for upgrading to Pro. Returns the hosted URL.
 * The caller (iframe UI) opens this URL in a new tab — Checkout cannot render
 * inside the Stripe Dashboard iframe.
 */
export async function createProCheckoutSession(params: {
  merchantId: string;
  successUrl: string;
  cancelUrl: string;
}): Promise<{ url: string; sessionId: string }> {
  const customerId = await getOrCreateBillingCustomer(params.merchantId);
  const priceId = env().STRIPE_PRICE_PRO_MONTHLY;

  const session = await getStripe().checkout.sessions.create({
    mode: "subscription",
    customer: customerId,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: params.successUrl,
    cancel_url: params.cancelUrl,
    subscription_data: {
      metadata: { merchant_id: params.merchantId, tier: "pro" },
    },
    metadata: { merchant_id: params.merchantId },
  });

  if (!session.url) {
    throw new Error("Stripe did not return a Checkout URL");
  }
  return { url: session.url, sessionId: session.id };
}

/**
 * Cancel the usage subscription when a merchant upgrades to Pro. Safe to call
 * if no usage subscription exists. We cancel at period end so any unbilled
 * meter events in the current period still settle.
 */
export async function cancelUsageSubscription(
  merchantId: string,
): Promise<void> {
  const merchant = await getMerchant(merchantId);
  if (!merchant.stripe_usage_subscription_id) return;

  try {
    await getStripe().subscriptions.update(
      merchant.stripe_usage_subscription_id,
      { cancel_at_period_end: true },
    );
  } catch (err) {
    // Subscription may already be canceled. Non-fatal — log and continue.
    const msg = err instanceof Error ? err.message : String(err);
    console.warn(
      `[WIN-24] cancelUsageSubscription merchant=${merchantId}: ${msg}`,
    );
  }
}
