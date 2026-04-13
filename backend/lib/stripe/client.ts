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
  _accountId: string,
  params?: Stripe.DisputeListParams,
): Promise<Stripe.Dispute[]> {
  const resp = await getStripe().disputes.list({ limit: 100, ...params });
  return resp.data;
}

export async function getDispute(
  _accountId: string,
  disputeId: string,
  expand?: string[],
): Promise<Stripe.Dispute> {
  return getStripe().disputes.retrieve(disputeId, { expand });
}

export async function getCharge(
  _accountId: string,
  chargeId: string,
): Promise<Stripe.Charge> {
  return getStripe().charges.retrieve(chargeId);
}

export async function getCustomer(
  _accountId: string,
  customerId: string,
): Promise<Stripe.Customer | Stripe.DeletedCustomer> {
  return getStripe().customers.retrieve(customerId);
}

export async function getPaymentIntent(
  _accountId: string,
  piId: string,
): Promise<Stripe.PaymentIntent> {
  return getStripe().paymentIntents.retrieve(piId);
}

export async function submitDispute(
  _accountId: string,
  disputeId: string,
  evidence: Stripe.DisputeUpdateParams.Evidence,
  idempotencyKey: string,
): Promise<Stripe.Dispute> {
  return getStripe().disputes.update(
    disputeId,
    { evidence, submit: true },
    { idempotencyKey },
  );
}

/**
 * Download an existing Stripe File by ID as a Buffer. Uses the file's short-lived
 * URL from files.retrieve(). The file must have been uploaded with a purpose
 * that grants read access to the platform account.
 */
export async function downloadStripeFile(fileId: string): Promise<Buffer> {
  const file = await getStripe().files.retrieve(fileId);
  if (!file.url) {
    throw new Error(`Stripe file ${fileId} has no URL`);
  }
  const res = await fetch(file.url, {
    headers: { Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}` },
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
 * Upload a combined PDF to Stripe Files as dispute evidence. Returns the new file_id.
 */
export async function uploadCombinedEvidence(
  pdf: Buffer,
  filename: string,
): Promise<string> {
  const file = await getStripe().files.create({
    purpose: "dispute_evidence",
    file: {
      data: pdf,
      name: filename,
      type: "application/pdf",
    },
  });
  return file.id;
}
