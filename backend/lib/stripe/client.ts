import Stripe from "stripe";

let _stripe: Stripe | null = null;

function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      throw new Error("Missing STRIPE_SECRET_KEY");
    }
    _stripe = new Stripe(key);
  }
  return _stripe;
}

export async function listDisputes(
  accountId: string,
  params?: Stripe.DisputeListParams,
): Promise<Stripe.Dispute[]> {
  const resp = await getStripe().disputes.list(
    { limit: 100, ...params },
    { stripeAccount: accountId },
  );
  return resp.data;
}

export async function getDispute(
  accountId: string,
  disputeId: string,
  expand?: string[],
): Promise<Stripe.Dispute> {
  return getStripe().disputes.retrieve(
    disputeId,
    { expand },
    { stripeAccount: accountId },
  );
}

export async function getCharge(
  accountId: string,
  chargeId: string,
): Promise<Stripe.Charge> {
  return getStripe().charges.retrieve(
    chargeId,
    undefined,
    { stripeAccount: accountId },
  );
}

export async function getCustomer(
  accountId: string,
  customerId: string,
): Promise<Stripe.Customer | Stripe.DeletedCustomer> {
  return getStripe().customers.retrieve(
    customerId,
    undefined,
    { stripeAccount: accountId },
  );
}

export async function getPaymentIntent(
  accountId: string,
  piId: string,
): Promise<Stripe.PaymentIntent> {
  return getStripe().paymentIntents.retrieve(
    piId,
    undefined,
    { stripeAccount: accountId },
  );
}

export async function submitDispute(
  accountId: string,
  disputeId: string,
  evidence: Stripe.DisputeUpdateParams.Evidence,
  idempotencyKey: string,
): Promise<Stripe.Dispute> {
  return getStripe().disputes.update(
    disputeId,
    { evidence, submit: true },
    { idempotencyKey, stripeAccount: accountId },
  );
}

/**
 * Download an existing Stripe File by ID as a Buffer. Uses the file's short-lived
 * URL from files.retrieve(). The file lives on the installing merchant's
 * account, so both the retrieve call and the URL fetch must be scoped via
 * Stripe-Account.
 */
export async function downloadStripeFile(
  accountId: string,
  fileId: string,
): Promise<Buffer> {
  const file = await getStripe().files.retrieve(
    fileId,
    undefined,
    { stripeAccount: accountId },
  );
  if (!file.url) {
    throw new Error(`Stripe file ${fileId} has no URL`);
  }
  const res = await fetch(file.url, {
    headers: {
      Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
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

/**
 * Upload a combined PDF to Stripe Files as dispute evidence on the installing
 * merchant's account. Returns the new file_id.
 */
export async function uploadCombinedEvidence(
  accountId: string,
  pdf: Buffer,
  filename: string,
): Promise<string> {
  const file = await getStripe().files.create(
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
