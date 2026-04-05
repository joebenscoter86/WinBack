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
  transaction_date?: number;
  card_brand?: string;
  card_last4?: string;
  billing_address?: string;
  charge_description?: string;
  receipt_url?: string;
  has_evidence: boolean;
  evidence_submission_count: number;
  is_charge_refundable: boolean;
  metadata: Record<string, string>;
  checklist_state?: Record<string, boolean>;
}

function flattenAddress(address: Stripe.Address | null | undefined): string | undefined {
  if (!address) return undefined;

  const statePostal = [address.state, address.postal_code].filter(Boolean).join(" ");
  const parts = [address.line1, address.line2, address.city, statePostal, address.country].filter(
    (p): p is string => Boolean(p)
  );

  return parts.length > 0 ? parts.join(", ") : undefined;
}

/**
 * Fallback reason codes for test mode, where Stripe doesn't populate
 * network_reason_code. Maps Stripe's generic reason to a representative
 * Visa code so playbook matching works during QA. Never fires in
 * production because real disputes always have network_reason_code.
 */
const TEST_MODE_REASON_CODE_MAP: Record<string, { network: string; code: string }> = {
  fraudulent: { network: "visa", code: "10.4" },
  product_not_received: { network: "visa", code: "13.1" },
  duplicate: { network: "visa", code: "13.2" },
  subscription_canceled: { network: "visa", code: "13.3" },
  credit_not_processed: { network: "visa", code: "13.6" },
  general: { network: "mastercard", code: "4853" },
  unrecognized: { network: "visa", code: "10.4" },
};

function hasAnyEvidence(evidence: Stripe.Dispute.Evidence | null | undefined): boolean {
  if (!evidence) return false;
  return Object.values(evidence).some((v) => v !== null && v !== undefined && v !== "");
}

export function normalizeDispute(d: Stripe.Dispute): WinBackDispute {
  const charge = typeof d.charge === "string" ? null : d.charge;
  const chargeId = typeof d.charge === "string" ? d.charge : d.charge?.id ?? "";
  const customer =
    charge && typeof charge.customer === "object" && charge.customer !== null
      ? charge.customer
      : null;
  const cardDetails = (
    charge?.payment_method_details as {
      card?: { brand?: string; last4?: string; network?: string };
    } | null
  )?.card;

  let network = cardDetails?.network ?? "unknown";
  let reasonCode = d.network_reason_code ?? "";

  // Fallback for test mode: fill in a representative reason code
  if (!reasonCode && d.reason) {
    const fallback = TEST_MODE_REASON_CODE_MAP[d.reason];
    if (fallback) {
      reasonCode = fallback.code;
      if (network === "unknown") network = fallback.network;
    }
  }

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
    reason_code: reasonCode,
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
    transaction_date: (charge as { created?: number } | null)?.created ?? undefined,
    card_brand: cardDetails?.brand ?? undefined,
    card_last4: cardDetails?.last4 ?? undefined,
    billing_address: flattenAddress(
      (charge as { billing_details?: { address?: Stripe.Address | null } } | null)?.billing_details
        ?.address
    ),
    charge_description:
      (charge as { description?: string | null } | null)?.description ?? undefined,
    receipt_url: (charge as { receipt_url?: string | null } | null)?.receipt_url ?? undefined,
    has_evidence: hasAnyEvidence(d.evidence),
    evidence_submission_count: d.evidence_details?.submission_count ?? 0,
    is_charge_refundable: d.is_charge_refundable ?? false,
    metadata: (charge as { metadata?: Record<string, string> } | null)?.metadata ?? {},
  };
}
