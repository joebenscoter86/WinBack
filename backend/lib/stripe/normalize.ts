import type Stripe from "stripe";

export interface WinBackDispute {
  id: string;
  amount: number;
  currency: string;
  reason: string;
  status: string;
  due_by: string;
  reason_code: string;
  network: string;
  payment_intent?: string;
  charge_id: string;
  customer_name?: string;
  customer_email?: string;
  created: number;
  evidence_due_by: number;
}

export function normalizeDispute(d: Stripe.Dispute): WinBackDispute {
  const charge = typeof d.charge === "string" ? null : d.charge;
  const chargeId = typeof d.charge === "string" ? d.charge : d.charge?.id ?? "";
  const customer =
    charge && typeof charge.customer === "object" && charge.customer !== null
      ? charge.customer
      : null;
  const network =
    (charge?.payment_method_details as { card?: { network?: string } })?.card
      ?.network ?? "unknown";

  const dueBySec = d.evidence_details?.due_by ?? 0;
  const dueByDate = dueBySec
    ? new Date(dueBySec * 1000).toISOString().split("T")[0]
    : "";

  return {
    id: d.id,
    amount: d.amount,
    currency: d.currency,
    reason: d.reason,
    status: d.status,
    due_by: dueByDate,
    reason_code: d.network_reason_code ?? "",
    network,
    payment_intent:
      typeof d.payment_intent === "string"
        ? d.payment_intent
        : d.payment_intent?.id,
    charge_id: chargeId,
    customer_name: (customer as { name?: string })?.name ?? undefined,
    customer_email: (customer as { email?: string })?.email ?? undefined,
    created: d.created,
    evidence_due_by: dueBySec,
  };
}
