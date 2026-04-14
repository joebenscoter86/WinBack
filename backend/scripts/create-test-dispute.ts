/**
 * WIN-20 QA helper: creates a disputable test charge with AVS check data
 * populated, then waits for Stripe to auto-create the dispute.
 *
 * Usage: set -a && source .env.local && set +a && npx tsx scripts/create-test-dispute.ts
 */

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-09-30.clover" as Stripe.LatestApiVersion,
});

// Ordered list of test card tokens that create auto-disputing charges.
// We try them in order — the first that works wins.
const CANDIDATE_TOKENS = [
  "tok_createDispute",
  "tok_visa_chargeFraudulent",
  "tok_chargeDeclinedFraudulent",
];

async function tryCreatePI(token: string): Promise<Stripe.PaymentIntent> {
  return stripe.paymentIntents.create({
    amount: 4999,
    currency: "usd",
    confirm: true,
    description: "WIN-20 QA test charge (AVS + fraudulent auto-dispute)",
    payment_method_data: {
      type: "card",
      card: { token } as unknown as Stripe.PaymentMethodCreateParams.Card,
      billing_details: {
        name: "Jane QA Tester",
        email: "jane.qa@example.com",
        address: {
          line1: "510 Townsend St",
          city: "San Francisco",
          state: "CA",
          postal_code: "94103",
          country: "US",
        },
      },
    },
    automatic_payment_methods: { enabled: true, allow_redirects: "never" },
  });
}

async function main() {
  let pi: Stripe.PaymentIntent | null = null;
  let usedToken: string | null = null;
  for (const tok of CANDIDATE_TOKENS) {
    try {
      console.log(`Trying test token: ${tok}`);
      pi = await tryCreatePI(tok);
      usedToken = tok;
      break;
    } catch (err: unknown) {
      const msg = (err as Error).message ?? String(err);
      console.log(`  failed: ${msg.slice(0, 120)}`);
    }
  }

  if (!pi || !usedToken) {
    throw new Error("None of the test card tokens worked. Need to use another path.");
  }

  console.log(`\nPI created with ${usedToken}: ${pi.id} status=${pi.status}`);

  const chargeId = typeof pi.latest_charge === "string" ? pi.latest_charge : pi.latest_charge?.id;
  if (!chargeId) throw new Error("No charge attached to PI");

  const charge = await stripe.charges.retrieve(chargeId);
  console.log(`charge: ${charge.id}`);
  console.log(
    `  avs_line1=${charge.payment_method_details?.card?.checks?.address_line1_check} avs_postal=${charge.payment_method_details?.card?.checks?.address_postal_code_check} cvc=${charge.payment_method_details?.card?.checks?.cvc_check}`,
  );
  console.log(`  billing_details: ${JSON.stringify(charge.billing_details)}`);

  console.log("\nWaiting for dispute to appear (poll up to 60s)...");
  let dispute: Stripe.Dispute | null = null;
  for (let i = 0; i < 12; i++) {
    const list = await stripe.disputes.list({ charge: charge.id, limit: 1 });
    if (list.data.length > 0) {
      dispute = list.data[0];
      break;
    }
    process.stdout.write(".");
    await new Promise((r) => setTimeout(r, 5000));
  }
  console.log("");

  if (!dispute) {
    console.log(`\nNo dispute yet. Charge: ${charge.id}`);
    return;
  }

  console.log("\n=== DISPUTE CREATED ===");
  console.log(`  id:         ${dispute.id}`);
  console.log(`  charge:     ${dispute.charge}`);
  console.log(`  reason:     ${dispute.reason}`);
  console.log(`  status:     ${dispute.status}`);
  console.log(`  amount:     ${dispute.amount} ${dispute.currency}`);
  console.log(`  due_by:     ${new Date(dispute.evidence_details.due_by * 1000).toISOString()}`);
  console.log(`\nOpen in WinBack app to walk the Task 15 QA wizard.`);
}

main().catch((err) => {
  console.error("Failed:", err.message ?? err);
  if (err.raw) console.error("  raw:", err.raw.message);
  process.exit(1);
});
