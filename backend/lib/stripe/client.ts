import Stripe from "stripe";

const _clients: { live: Stripe | null; test: Stripe | null } = {
  live: null,
  test: null,
};

function getStripe(livemode: boolean): Stripe {
  const slot = livemode ? "live" : "test";
  const cached = _clients[slot];
  if (cached) return cached;

  const key = livemode
    ? process.env.STRIPE_SECRET_KEY_LIVE
    : process.env.STRIPE_SECRET_KEY_TEST;
  if (!key) {
    throw new Error(
      `Missing ${livemode ? "STRIPE_SECRET_KEY_LIVE" : "STRIPE_SECRET_KEY_TEST"}`,
    );
  }
  const fresh = new Stripe(key);
  _clients[slot] = fresh;
  return fresh;
}

export async function listDisputes(
  livemode: boolean,
  accountId: string,
  params?: Stripe.DisputeListParams,
): Promise<Stripe.Dispute[]> {
  const resp = await getStripe(livemode).disputes.list(
    { limit: 100, ...params },
    { stripeAccount: accountId },
  );
  return resp.data;
}

/**
 * Paginated list. Walks Stripe's `has_more` cursor up to `maxPages` (default
 * 10 → 1000 disputes) so reconciliation can't silently truncate at the first
 * 100 results. Used by the daily reconcile cron and the first-install
 * backfill, both of which need to see every dispute in their window.
 *
 * The cap is intentional: a runaway pagination loop on a misbehaving Stripe
 * response would otherwise burn rate-limit quota indefinitely. 1000 disputes
 * in a 90-day window is well past anything a real merchant on this product
 * would hit; if we ever do, the explicit cap surfaces it instead of hiding it.
 */
export async function listDisputesAllPages(
  livemode: boolean,
  accountId: string,
  params: Stripe.DisputeListParams = {},
  maxPages = 10,
): Promise<{ disputes: Stripe.Dispute[]; truncated: boolean }> {
  const out: Stripe.Dispute[] = [];
  let starting_after: string | undefined;
  let page = 0;
  while (page < maxPages) {
    const resp = await getStripe(livemode).disputes.list(
      { limit: 100, ...params, starting_after },
      { stripeAccount: accountId },
    );
    out.push(...resp.data);
    if (!resp.has_more || resp.data.length === 0) {
      return { disputes: out, truncated: false };
    }
    starting_after = resp.data[resp.data.length - 1].id;
    page++;
  }
  return { disputes: out, truncated: true };
}

export async function getDispute(
  livemode: boolean,
  accountId: string,
  disputeId: string,
  expand?: string[],
): Promise<Stripe.Dispute> {
  return getStripe(livemode).disputes.retrieve(
    disputeId,
    { expand },
    { stripeAccount: accountId },
  );
}

export async function getCharge(
  livemode: boolean,
  accountId: string,
  chargeId: string,
): Promise<Stripe.Charge> {
  return getStripe(livemode).charges.retrieve(
    chargeId,
    undefined,
    { stripeAccount: accountId },
  );
}

export async function getCustomer(
  livemode: boolean,
  accountId: string,
  customerId: string,
): Promise<Stripe.Customer | Stripe.DeletedCustomer> {
  return getStripe(livemode).customers.retrieve(
    customerId,
    undefined,
    { stripeAccount: accountId },
  );
}

export async function getPaymentIntent(
  livemode: boolean,
  accountId: string,
  piId: string,
): Promise<Stripe.PaymentIntent> {
  return getStripe(livemode).paymentIntents.retrieve(
    piId,
    undefined,
    { stripeAccount: accountId },
  );
}

export async function submitDispute(
  livemode: boolean,
  accountId: string,
  disputeId: string,
  evidence: Stripe.DisputeUpdateParams.Evidence,
  idempotencyKey: string,
): Promise<Stripe.Dispute> {
  return getStripe(livemode).disputes.update(
    disputeId,
    { evidence, submit: true },
    { idempotencyKey, stripeAccount: accountId },
  );
}

export async function downloadStripeFile(
  livemode: boolean,
  accountId: string,
  fileId: string,
): Promise<Buffer> {
  const file = await getStripe(livemode).files.retrieve(
    fileId,
    undefined,
    { stripeAccount: accountId },
  );
  if (!file.url) {
    throw new Error(`Stripe file ${fileId} has no URL`);
  }
  const key = livemode
    ? process.env.STRIPE_SECRET_KEY_LIVE
    : process.env.STRIPE_SECRET_KEY_TEST;
  const res = await fetch(file.url, {
    headers: {
      Authorization: `Bearer ${key}`,
      "Stripe-Account": accountId,
    },
  });
  if (!res.ok) {
    throw new Error(
      `Failed to download Stripe file ${fileId}: ${res.status} ${res.statusText}`,
    );
  }
  const arrayBuffer = await res.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

export async function uploadCombinedEvidence(
  livemode: boolean,
  accountId: string,
  pdf: Buffer,
  filename: string,
): Promise<string> {
  const file = await getStripe(livemode).files.create(
    {
      purpose: "dispute_evidence",
      file: {
        data: pdf,
        name: filename,
        type: "application/pdf",
      },
    },
    { stripeAccount: accountId },
  );
  return file.id;
}

/**
 * Test-only: drop the cached Stripe instances. Lets unit tests swap env
 * values between cases without seeing a stale client.
 */
export function __resetStripeClientsForTests(): void {
  _clients.live = null;
  _clients.test = null;
}
