/**
 * Provisions (idempotently) the Stripe resources billing code expects:
 *   - Pro product + $79/mo price (lookup_key: winback_pro_monthly_v1)
 *   - Meter "dispute_won_fee" (aggregation=sum, customer mapping=payload.stripe_customer_id)
 *   - Usage product + metered price (lookup_key: winback_usage_fee_v1)
 *
 * Runs against whatever mode STRIPE_SECRET_KEY points at (test or live).
 *
 * Usage:
 *   cd backend && tsx scripts/provision-billing.ts
 *
 * Re-running the script finds existing resources by lookup_key / event_name and
 * short-circuits. To change a price, bump the lookup_key suffix (v1 -> v2) so
 * the old one stays archived for reference.
 */
import Stripe from "stripe";

const PRO_LOOKUP_KEY = "winback_pro_monthly_v1";
const USAGE_LOOKUP_KEY = "winback_usage_fee_v1";
const METER_EVENT_NAME = "dispute_won_fee";

async function main() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    console.error("Missing STRIPE_SECRET_KEY in env");
    process.exit(1);
  }
  const stripe = new Stripe(key);
  const mode = key.startsWith("sk_live_") ? "LIVE" : "TEST";
  console.error(`[provision] Running against ${mode} mode`);

  const proPriceId = await ensureProPrice(stripe);
  const meterId = await ensureMeter(stripe);
  const usagePriceId = await ensureUsagePrice(stripe, meterId);

  console.log("");
  console.log("# Copy these into your env (Vercel or .env.local)");
  console.log(`STRIPE_PRICE_PRO_MONTHLY=${proPriceId}`);
  console.log(`STRIPE_PRICE_USAGE_FEE=${usagePriceId}`);
  console.log(`# Meter id (informational): ${meterId}`);
}

async function ensureProPrice(stripe: Stripe): Promise<string> {
  const existing = await stripe.prices.list({
    lookup_keys: [PRO_LOOKUP_KEY],
    limit: 1,
    expand: ["data.product"],
  });
  if (existing.data.length > 0) {
    const p = existing.data[0];
    console.error(`[provision] Pro price exists: ${p.id}`);
    return p.id;
  }

  const product = await stripe.products.create({
    name: "WinBack Pro",
    metadata: { tier: "pro" },
  });
  const price = await stripe.prices.create({
    product: product.id,
    currency: "usd",
    unit_amount: 7900,
    recurring: { interval: "month" },
    lookup_key: PRO_LOOKUP_KEY,
    metadata: { tier: "pro" },
  });
  console.error(`[provision] Created Pro product=${product.id} price=${price.id}`);
  return price.id;
}

async function ensureMeter(stripe: Stripe): Promise<string> {
  const list = await stripe.billing.meters.list({ limit: 100 });
  const found = list.data.find((m) => m.event_name === METER_EVENT_NAME);
  if (found) {
    console.error(`[provision] Meter exists: ${found.id}`);
    return found.id;
  }
  const meter = await stripe.billing.meters.create({
    display_name: "Dispute won success fee (cents)",
    event_name: METER_EVENT_NAME,
    default_aggregation: { formula: "sum" },
    customer_mapping: {
      event_payload_key: "stripe_customer_id",
      type: "by_id",
    },
    value_settings: {
      event_payload_key: "value",
    },
  });
  console.error(`[provision] Created Meter ${meter.id}`);
  return meter.id;
}

async function ensureUsagePrice(stripe: Stripe, meterId: string): Promise<string> {
  const existing = await stripe.prices.list({
    lookup_keys: [USAGE_LOOKUP_KEY],
    limit: 1,
  });
  if (existing.data.length > 0) {
    console.error(`[provision] Usage price exists: ${existing.data[0].id}`);
    return existing.data[0].id;
  }
  const product = await stripe.products.create({
    name: "WinBack success fee",
    metadata: { tier: "usage" },
  });
  const price = await stripe.prices.create({
    product: product.id,
    currency: "usd",
    billing_scheme: "per_unit",
    unit_amount_decimal: "1", // 1 cent per unit; meter posts value-in-cents
    recurring: {
      interval: "month",
      usage_type: "metered",
      meter: meterId,
    },
    lookup_key: USAGE_LOOKUP_KEY,
    metadata: { tier: "usage" },
  });
  console.error(`[provision] Created Usage product=${product.id} price=${price.id}`);
  return price.id;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
