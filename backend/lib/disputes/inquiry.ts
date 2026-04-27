/**
 * Stripe disputes have two stages:
 *   - Inquiry: pre-dispute warning. status starts with `warning_`. No funds held.
 *   - Chargeback: formal dispute. status is needs_response/under_review/won/lost/charge_refunded.
 *
 * An inquiry can escalate to a chargeback. When it does, the merchant must
 * submit evidence again — the inquiry response and chargeback response are
 * separate submissions (per Stripe docs).
 */

export function isInquiry(status: string): boolean {
  return status.startsWith("warning_");
}

/**
 * True only when an inquiry transitions to an open chargeback. We use this
 * in the webhook handler to clear `evidence_submitted_at` so the merchant
 * sees the re-submission prompt rather than a stale "already submitted"
 * state.
 */
export function isInquiryToChargebackEscalation(
  oldStatus: string | null | undefined,
  newStatus: string,
): boolean {
  if (!oldStatus) return false;
  return oldStatus.startsWith("warning_") && newStatus === "needs_response";
}
