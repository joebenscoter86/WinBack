/**
 * Smoke test: hand-sign Stripe App requests against a deployed URL and assert
 * the live/test mode isolation fix actually holds at runtime, not just in the
 * test harness.
 *
 * Run:
 *   set -a && source backend/.env.local && set +a
 *   TARGET_URL=https://winbackpay.com npx tsx backend/scripts/smoke-livemode.ts
 *
 * The TARGET_URL can be a Vercel preview URL or the prod URL. The script
 * uses STRIPE_APP_SECRET to hand-sign each request the same way the iframe
 * SDK does. The body's `livemode` claim drives the route's mode selection.
 */
import Stripe from "stripe";

const TARGET_URL = process.env.TARGET_URL;
const APP_SECRET = process.env.STRIPE_APP_SECRET;

if (!TARGET_URL || !APP_SECRET) {
  console.error("Set TARGET_URL and STRIPE_APP_SECRET before running.");
  process.exit(2);
}

const ACCOUNT_ID = process.env.SMOKE_ACCOUNT_ID ?? "acct_1TIwcOCbmbWLiv6V";
const USER_ID = process.env.SMOKE_USER_ID ?? "usr_smoke";

const stripe = new Stripe("sk_test_dummy_for_signature_only");

type SignedFetchResult = {
  status: number;
  json: { data?: Array<{ id: string }>; error?: string } | null;
};

async function signedFetch(
  secret: string,
  path: string,
  body: Record<string, unknown>,
): Promise<SignedFetchResult> {
  const rawBody = JSON.stringify(body);
  const signedPayload = JSON.stringify({
    user_id: body.user_id,
    account_id: body.account_id,
  });
  const sig = stripe.webhooks.generateTestHeaderString({
    payload: signedPayload,
    secret,
  });
  const res = await fetch(`${TARGET_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Stripe-Signature": sig },
    body: rawBody,
  });
  const json = (await res.json().catch(() => null)) as SignedFetchResult["json"];
  return { status: res.status, json };
}

function summarizeData(json: SignedFetchResult["json"]): string {
  if (json && Array.isArray(json.data)) return `data.length=${json.data.length}`;
  return JSON.stringify(json);
}

async function main() {
  console.log(`Smoke target: ${TARGET_URL}\n`);

  const t1 = await signedFetch(APP_SECRET!, "/api/disputes", {
    user_id: USER_ID,
    account_id: ACCOUNT_ID,
    livemode: false,
  });
  console.log(`[t1] valid sig + livemode=false: ${t1.status} ${summarizeData(t1.json)}`);
  if (t1.status !== 200) throw new Error(`t1 failed: expected 200, got ${t1.status}`);

  const t2 = await signedFetch(APP_SECRET!, "/api/disputes", {
    user_id: USER_ID,
    account_id: ACCOUNT_ID,
    livemode: true,
  });
  console.log(`[t2] valid sig + livemode=true:  ${t2.status} ${summarizeData(t2.json)}`);
  if (t2.status !== 200) throw new Error(`t2 failed: expected 200, got ${t2.status}`);

  if (Array.isArray(t1.json?.data) && Array.isArray(t2.json?.data)) {
    const t1Ids = new Set(t1.json!.data!.map((d) => d.id));
    const t2Ids = new Set(t2.json!.data!.map((d) => d.id));
    const overlap = [...t1Ids].filter((id) => t2Ids.has(id));
    if (overlap.length > 0) {
      throw new Error(
        `mode isolation broken: dispute(s) appear in both modes: ${overlap.join(", ")}`,
      );
    }
    console.log(`[t1+t2] mode isolation: t1=${t1Ids.size} test, t2=${t2Ids.size} live, overlap=0`);
  }

  const t3 = await signedFetch(
    "absec_test_FORGED_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "/api/disputes",
    { user_id: USER_ID, account_id: ACCOUNT_ID, livemode: false },
  );
  console.log(`[t3] forged secret:               ${t3.status}`);
  if (t3.status !== 401) throw new Error(`t3 failed: expected 401, got ${t3.status}`);

  const t4 = await signedFetch(APP_SECRET!, "/api/disputes", {
    user_id: USER_ID,
    account_id: ACCOUNT_ID,
  });
  console.log(`[t4] missing livemode:            ${t4.status}`);
  if (t4.status !== 401) throw new Error(`t4 failed: expected 401, got ${t4.status}`);

  console.log("\nSmoke passed.");
}

main().catch((err) => {
  console.error("\nSmoke failed:", err);
  process.exit(1);
});
