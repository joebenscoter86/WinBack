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
