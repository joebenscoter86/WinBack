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
  return getStripe().charges.retrieve(chargeId, {
    stripeAccount: accountId,
  });
}

export async function getCustomer(
  accountId: string,
  customerId: string,
): Promise<Stripe.Customer | Stripe.DeletedCustomer> {
  return getStripe().customers.retrieve(customerId, {
    stripeAccount: accountId,
  });
}

export async function getPaymentIntent(
  accountId: string,
  piId: string,
): Promise<Stripe.PaymentIntent> {
  return getStripe().paymentIntents.retrieve(piId, {
    stripeAccount: accountId,
  });
}
