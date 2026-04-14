import type { Dispute, EvidenceChecklistItem } from './types';

/**
 * Status of a stripe_field-linked checklist item:
 * - 'positive': data exists and helps the case (auto-check, show value)
 * - 'unavailable': verification wasn't collected at checkout (grey out, explain)
 * - 'negative': verification failed, hurts the case (warn merchant)
 * - null: no stripe_field or not a mapped item
 */
export type StripeFieldStatus = 'positive' | 'unavailable' | 'negative';

export interface StripeFieldResult {
  status: StripeFieldStatus;
  value: string;
  guidance: string;
}

function formatCheckValue(raw: string | null | undefined): string {
  if (!raw) return 'Not checked';
  switch (raw) {
    case 'pass': return 'Match';
    case 'fail': return 'No match';
    case 'unavailable': return 'Not checked';
    case 'unchecked': return 'Not checked';
    default: return raw;
  }
}

function formatDate(ts: number): string {
  return new Date(ts * 1000).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });
}

function formatCurrency(amount: number, currency?: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency ?? 'usd',
  }).format(amount / 100);
}

/**
 * Given a checklist item and a dispute, compute the auto-fill status for any
 * item that maps to a stripe_field. Returns null for items not mapped or with
 * no auto-fill data available.
 */
export function getStripeFieldResult(
  item: EvidenceChecklistItem,
  dispute: Dispute,
): StripeFieldResult | null {
  const field = item.stripe_field;
  if (!field) return null;

  switch (field) {
    case 'avs_result': {
      const addr = dispute.avs_address_check;
      const zip = dispute.avs_zip_check;
      if (!addr && !zip) return {
        status: 'unavailable',
        value: 'Not collected at checkout',
        guidance: "Address verification wasn't run on this transaction. This can't be added after the fact -- focus your energy on the other evidence items instead.",
      };
      const addrFail = addr === 'fail';
      const zipFail = zip === 'fail';
      if (addrFail && zipFail) return {
        status: 'negative',
        value: 'Address: no match, ZIP: no match',
        guidance: "The billing address didn't match what the bank has on file. The issuer will see this automatically -- it weakens your case. Focus on strengthening other evidence to compensate.",
      };
      if (addrFail || zipFail) return {
        status: 'negative',
        value: `Address: ${formatCheckValue(addr)}, ZIP: ${formatCheckValue(zip)}`,
        guidance: "Partial address match -- one element didn't match. The issuer will see this. It's not as damaging as a full mismatch, but strengthen your other evidence to compensate.",
      };
      return {
        status: 'positive',
        value: `Address: ${formatCheckValue(addr)}, ZIP: ${formatCheckValue(zip)}`,
        guidance: "We pulled this from your transaction -- you're covered here.",
      };
    }
    case 'cvc_check': {
      const cvc = dispute.cvc_check;
      if (!cvc || cvc === 'unavailable' || cvc === 'unchecked') return {
        status: 'unavailable',
        value: 'Not collected at checkout',
        guidance: "The security code (CVV) wasn't verified on this transaction. This can't be added after the fact -- focus your energy on the other evidence items instead.",
      };
      if (cvc === 'fail') return {
        status: 'negative',
        value: 'CVV: no match',
        guidance: "The CVV check failed on this transaction -- the code entered didn't match. The issuer will see this automatically and it hurts your case. Focus on strengthening other evidence to compensate.",
      };
      return {
        status: 'positive',
        value: 'CVV verified',
        guidance: "We pulled this from your transaction -- you're covered here.",
      };
    }
    case 'three_d_secure': {
      const result = dispute.three_d_secure_result;
      if (!result) return {
        status: 'unavailable',
        value: 'Not used on this transaction',
        guidance: "3D Secure wasn't used on this transaction. This is the single strongest defense for fraud disputes -- consider enabling it for future transactions. For this dispute, focus on the other evidence items.",
      };
      const version = dispute.three_d_secure_version;
      if (result === 'authenticated') return {
        status: 'positive',
        value: version ? `Verified by bank (3DS v${version})` : 'Verified by bank (3DS)',
        guidance: "We pulled this from your transaction -- you're covered here. This is your strongest piece of evidence.",
      };
      if (result === 'attempt_acknowledged') return {
        status: 'positive',
        value: 'Bank verification attempted',
        guidance: "We pulled this from your transaction -- the bank acknowledged the 3DS attempt, which still provides liability shift in most cases.",
      };
      return {
        status: 'positive',
        value: `3DS result: ${result}`,
        guidance: "We pulled this from your transaction -- you're covered here.",
      };
    }
    case 'authorization': {
      const code = dispute.authorization_code;
      const status = dispute.network_status;
      if (!code && !status) return null;
      if (status === 'declined_by_network') return {
        status: 'negative',
        value: 'Declined by network',
        guidance: "The authorization was declined by the network. This is unusual for a completed charge -- contact support if this doesn't look right.",
      };
      if (code && status === 'approved_by_network') return {
        status: 'positive',
        value: `Approved (auth code: ${code})`,
        guidance: "We pulled this from your transaction -- you're covered here.",
      };
      if (code) return {
        status: 'positive',
        value: `Auth code: ${code}`,
        guidance: "We pulled this from your transaction -- you're covered here.",
      };
      if (status === 'approved_by_network') return {
        status: 'positive',
        value: 'Approved by network',
        guidance: "We pulled this from your transaction -- you're covered here.",
      };
      return {
        status: 'positive',
        value: `Network status: ${status}`,
        guidance: "We pulled this from your transaction -- you're covered here.",
      };
    }
    case 'customer_email':
      if (!dispute.customer_email) return null;
      return {
        status: 'positive',
        value: dispute.customer_email,
        guidance: "We pulled this from your transaction -- you're covered here.",
      };
    case 'billing_address':
      if (!dispute.billing_address) return null;
      return {
        status: 'positive',
        value: dispute.billing_address,
        guidance: "We pulled this from your transaction -- you're covered here.",
      };
    case 'transaction_date':
      if (!dispute.transaction_date) return null;
      return {
        status: 'positive',
        value: formatDate(dispute.transaction_date),
        guidance: "We pulled this from your transaction -- you're covered here.",
      };
    case 'receipt_url':
      if (!dispute.receipt_url) return null;
      return {
        status: 'positive',
        value: 'Receipt available',
        guidance: "We pulled this from your transaction -- you're covered here.",
      };
    case 'refund_data': {
      const refunds = dispute.refunds;
      if (!refunds || refunds.length === 0) return null;
      const r = refunds[0];
      return {
        status: 'positive',
        value: `Refund of ${formatCurrency(r.amount, dispute.currency)} on ${formatDate(r.created)}`,
        guidance: "We pulled this from your transaction -- you're covered here.",
      };
    }
    case 'calculated_statement_descriptor':
      return {
        status: 'positive',
        value: 'Covered by your Stripe transaction data',
        guidance: "We pulled this from your transaction -- you're covered here.",
      };
    default:
      // Any stripe_field value the renderer doesn't have custom copy for still
      // means the data is autofilled from the transaction. Show a generic
      // hint so the upload UI stays hidden and the merchant doesn't try to
      // attach a file that would be silently dropped by the assembler.
      return {
        status: 'positive',
        value: 'Covered by your Stripe transaction data',
        guidance: "We pulled this from your transaction -- you're covered here.",
      };
  }
}
