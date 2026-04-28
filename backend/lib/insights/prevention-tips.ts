/**
 * Stripe high-level dispute reason -> human-friendly label.
 * Keys must match `disputes.reason_code` (which stores `Stripe.Dispute.reason`,
 * not the network reason code -- see lib/webhooks/handle-dispute-event.ts).
 */
export const REASON_LABELS: Record<string, string> = {
  fraudulent: "Fraudulent",
  product_not_received: "Product not received",
  product_unacceptable: "Product unacceptable",
  duplicate: "Duplicate charge",
  subscription_canceled: "Subscription canceled",
  credit_not_processed: "Credit not processed",
  unrecognized: "Unrecognized charge",
  general: "General dispute",
  bank_cannot_process: "Bank cannot process",
  check_returned: "Check returned",
  customer_initiated: "Customer initiated",
  debit_not_authorized: "Debit not authorized",
  incorrect_account_details: "Incorrect account details",
  insufficient_funds: "Insufficient funds",
};

/**
 * Prevention tips keyed by Stripe reason. Only includes reasons where there is
 * a clear merchant-side action that reduces future occurrences. Reasons without
 * an entry (e.g. `general`) are intentionally not surfaced as patterns -- a
 * generic tip is worse than no tip.
 */
export const PREVENTION_TIPS: Record<string, string> = {
  product_not_received:
    "Require signature confirmation on higher-value orders and email tracking links the moment a label is created.",
  product_unacceptable:
    "Photograph products before shipping and put a clear return policy on the receipt or order confirmation.",
  fraudulent:
    "Enable 3D Secure for higher-risk transactions and require both AVS and CVC matches at checkout.",
  duplicate:
    "Add a confirmation step after checkout and de-dupe identical amounts to the same customer within a short window.",
  subscription_canceled:
    "Send a cancellation confirmation email, and verify your in-app cancel flow actually cancels the Stripe subscription.",
  credit_not_processed:
    "Process refunds within five business days and email customers a refund confirmation with the expected settlement window.",
  unrecognized:
    "Use a statement descriptor that matches the brand name customers see at checkout so charges are recognizable on bank statements.",
};

export function getReasonLabel(reasonCode: string): string {
  return REASON_LABELS[reasonCode] ?? reasonCode;
}

export function getPreventionTip(reasonCode: string): string | null {
  return PREVENTION_TIPS[reasonCode] ?? null;
}
