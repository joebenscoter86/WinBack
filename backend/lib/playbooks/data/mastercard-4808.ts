import type { PlaybookData } from "../types";

export const mastercard4808: PlaybookData = {
  network: "mastercard",
  reason_code: "4808",
  display_name: "Authorization-Related Dispute",
  category: "authorization",
  legacy_code: null,
  description:
    "The customer's bank claims the transaction didn't have a valid authorization (payment approval). This can mean no authorization was obtained, the authorization had already expired before the charge was finalized, the authorized amount doesn't match the final charge amount, or the card network approved the transaction via a backup approval after the bank declined it (online/phone order transactions). Authorization disputes are different from fraud or consumer disputes -- the question isn't whether the customer made the purchase, it's whether the merchant followed proper authorization procedures. These are often technical processing errors rather than customer complaints.",

  coach_headline: "The bank says this transaction didn't have a valid authorization (payment approval).",
  coach_summary:
    "This dispute is about process, not the purchase itself. The bank isn't questioning whether the customer bought something. They're saying the authorization paperwork wasn't in order: either it expired before the charge was finalized, the amounts didn't match, or the card was declined but the transaction went through anyway. The fix is almost always in your payment processor's records.",
  coach_issuer_summary:
    "The customer's bank checks: Was a valid authorization obtained before the charge was finalized? Does the authorized amount match the final charge amount? Was the authorization still active (not expired) when the charge was finalized? If there's a currency conversion difference, does it fall within the allowed 10% range (Mastercard allows up to a 10% difference when amounts are converted between currencies)?",
  coach_acquirer_summary:
    "Your dispute response goes through a compliance check at your payment processor before the customer's bank sees it. This dispute type is won entirely on authorization records, not customer communications or delivery proof. If you can't produce the authorization record and the final charge record together, your response will be rejected.",

  issuer_evaluation: `The customer's bank evaluates Mastercard 4808 disputes using the following criteria:

1. Was a valid authorization obtained before the charge was finalized? The authorization must have been active (not expired) at the time of the final charge.
2. Does the authorized amount match the final charge amount? Mastercard allows up to a 10% difference when amounts are converted between currencies -- outside that range, a mismatch is grounds for this dispute. If the difference between authorized and final charge amounts is due to currency conversion and falls within that 10% allowance, the dispute does not qualify -- call this out explicitly in your dispute response.
3. Was the authorization tied to the correct account? An authorization obtained on one card number but charged against another is invalid.
4. For backup-approval disputes: Was the transaction declined by the customer's bank and then approved through a backup approval the card network granted? If so, the merchant accepted a transaction the bank explicitly declined.
5. Dispute deadline: The customer had 90 calendar days from the transaction processing date to open this dispute.`,

  acquirer_prereview: `Before your evidence reaches the customer's bank, it passes through your payment processor first. Your processor reviews the package for completeness and formatting compliance with network rules. If your submission is incomplete or doesn't address the assigned reason code, it gets bounced before the bank ever sees it. Merchants are rarely notified clearly when this happens -- the submission just fails.

This means:
- Your package must directly address reason code 4808 (Authorization-Related Dispute) -- generic transaction records that don't address the full record from approval to final charge won't clear pre-review.
- All required documents (see checklist below) must be present.
- Your processor may impose an internal deadline shorter than Mastercard's 45-day response window.

Getting bounced at the processor stage is an automatic loss with no second chance. The checklist below tells you exactly what both your processor and the customer's bank need to see.`,

  evidence_checklist: [
    {
      item: "Original authorization record with transaction approval number and timestamp",
      category: "mandatory",
      context: "all",
      required: true,
      why_matters:
        "Shows the authorization was obtained, the amount, the timestamp, and the transaction approval number. This is the core of the dispute -- without it, you have no defense.",
      where_to_find:
        "Stripe Dashboard > Payments > click the payment > scroll to the Timeline section. The authorization details (transaction approval number, timestamp, amount) are listed there. For more detailed processor-level data, check your payment processor's admin portal directly. Note: Stripe maps authorization data to uncategorized_text in evidence submissions, so copy the approval number and timestamps.",
      stripe_field: "authorization",
      urgency_essential: true,
      urgency_order: 1,
    },
    {
      item: "Final charge record tied to the authorization",
      category: "mandatory",
      context: "all",
      required: true,
      why_matters:
        "Proves the final charge matches the authorization. The customer's bank compares the authorization and final charge records directly -- both must be present.",
      where_to_find:
        "Stripe Dashboard > Payments > click the payment > Timeline section shows when the charge was captured/finalized. Look for the 'Payment captured' or 'Charge succeeded' entry with its timestamp. Compare the final charge amount against the authorized amount shown earlier in the timeline.",
      urgency_essential: true,
      urgency_order: 2,
    },
    {
      item: "Transaction approval number",
      category: "mandatory",
      context: "all",
      required: true,
      why_matters:
        "Links the specific authorization to the specific transaction. The transaction approval number is the primary identifier tying your authorization record to the final charge.",
      where_to_find:
        "Stripe Dashboard > Payments > click the payment > look in the Payment details or Timeline for 'Authorization code' or 'Approval code'. You can also find this in the Stripe API response under charges.data[0].outcome.network_advice_code or by expanding the payment's JSON data.",
      stripe_field: "authorization",
      urgency_essential: false,
      urgency_order: null,
    },
    {
      item: "Currency conversion documentation",
      category: "mandatory",
      context: "amount_discrepancy",
      required: true,
      why_matters:
        "If the amount difference is currency-related and within 10% of the authorized amount, Mastercard's currency conversion allowance (up to 10% difference when converting between currencies) applies and the dispute should be denied. Without this documentation, you cannot invoke the rule.",
      where_to_find:
        "Stripe Dashboard > Payments > click the payment > compare the 'Amount' and 'Converted amount' fields (visible on multi-currency transactions). Calculate the percentage difference. If it's within 10%, cite Mastercard's currency conversion safe harbor in your response.",
      urgency_essential: true,
      urgency_order: 3,
    },
    {
      item: "Tip or gratuity authorization documentation (for restaurant and service merchants)",
      category: "mandatory",
      context: "amount_discrepancy",
      required: true,
      why_matters:
        "Mastercard allows tip adjustments up to 20% over the authorized amount for restaurants with tip lines. Document the tip authorization separately -- this explains the amount difference and eliminates the dispute basis.",
      where_to_find:
        "Pull the signed receipt showing the tip line and total from your POS system (Square, Toast, Clover). If you use a terminal that captures digital signatures, export the receipt image. The signed receipt showing the customer wrote in the tip amount is your evidence.",
      urgency_essential: true,
      urgency_order: 3,
    },
    {
      item: "Renewed payment approval record (if original authorization expired before the charge was finalized)",
      category: "mandatory",
      context: "expired_auth",
      required: true,
      why_matters:
        "If the original authorization expired and you obtained a renewed payment approval before finalizing the charge, showing both records proves you followed proper procedure. Without the renewed approval record, an expired authorization dispute is very difficult to defend.",
      where_to_find:
        "Check your payment processor's admin portal for the renewed authorization record. In Stripe, look at the payment's Timeline for a second authorization event. If you use a booking or pre-order system that re-authorizes before capture, check that system's transaction logs for the renewed approval number and timestamp.",
      urgency_essential: true,
      urgency_order: 3,
    },
    {
      item: "Timestamp proof that the charge was finalized before the authorization expired",
      category: "mandatory",
      context: "expired_auth",
      required: true,
      why_matters:
        "Authorization timelines are the dispute. If your records show the charge was finalized before the authorization expired, the dispute basis disappears. The customer's bank is looking specifically at this timeline.",
      where_to_find:
        "Stripe Dashboard > Payments > click the payment > Timeline section. Compare the authorization timestamp against the capture/final charge timestamp. Screenshot both entries showing the charge was finalized within the authorization window (typically 7 days for e-commerce, 30 days for some merchant categories).",
      urgency_essential: false,
      urgency_order: null,
    },
    {
      item: "Payment processor transaction log showing the full record from approval to final charge",
      category: "recommended",
      context: "all",
      required: false,
      why_matters:
        "Shows the full record from approval to final charge from your processor's records. More complete and more credible as evidence than a screenshot of a payment dashboard page.",
      where_to_find:
        "Your payment processor's admin portal (not just the Stripe Dashboard). For Stripe, you can use the API to pull the full charge object with all authorization events. If you use a separate gateway or terminal provider, check their reporting dashboard for the full transaction log including approval numbers, amounts, and timestamps.",
      urgency_essential: true,
      urgency_order: 4,
    },
    {
      item: "Order details matching the authorized amount",
      category: "recommended",
      context: "all",
      required: false,
      why_matters:
        "Connects the authorization to an actual customer order, showing this was a legitimate transaction. Helps the customer's bank understand the transaction context.",
      where_to_find:
        "Your e-commerce platform's order page (Shopify Admin > Orders, WooCommerce > Orders) showing the order total matches the authorized amount. Screenshot the order summary with line items and totals. If the amounts differ, document why (tax adjustment, shipping change, etc.).",
      urgency_essential: false,
      urgency_order: null,
    },
    {
      item: "Stripe evidence field mapping (uncategorized_text and uncategorized_file)",
      category: "recommended",
      context: "all",
      required: false,
      why_matters:
        "Stripe's standard dispute evidence API doesn't have dedicated fields for authorization records, transaction approval numbers, or currency conversion documentation. All of these technical logs must go into the uncategorized_text (for text summaries) and uncategorized_file (for screenshots/PDFs) fields. If you don't map them there, the evidence won't make it into your submission.",
      where_to_find:
        "When submitting evidence through Stripe (or through WinBack), paste your authorization summary into the uncategorized_text field and upload processor screenshots or PDF exports as uncategorized_file attachments. This is the only way authorization-related evidence reaches the customer's bank through Stripe's system.",
      urgency_essential: false,
      urgency_order: null,
    },
  ],

  common_mistakes: [
    {
      mistake: "Finalizing the charge after the authorization expires",
      explanation:
        "Mastercard authorization holds expire. If you authorize at booking or order placement and finalize the charge days later, you must get a renewed authorization before finalizing. Missing this step makes a 4808 dispute nearly impossible to defend.",
    },
    {
      mistake: "Finalizing a different amount without a renewed authorization",
      explanation:
        "Even a small amount change (except currency conversion within 10%) can trigger a 4808. If the final charge amount differs from the authorization, get a renewed authorization for the correct amount before finalizing the charge.",
    },
    {
      mistake: "Not retaining authorization records",
      explanation:
        "Your payment processor retains these, but you need to know how to pull them. If you can't produce an authorization record, you have no defense. Pull processor-level authorization data, not just dashboard screenshots.",
    },
    {
      mistake: "Accepting backup network approvals on declined transactions",
      explanation:
        "If the customer's bank declined a transaction and it was approved through a backup network approval, you own the liability. Don't fulfill orders on backup approvals for online/phone transactions -- let the customer re-try with a different card.",
    },
    {
      mistake: "Missing the 45-day response window",
      explanation:
        "The customer's deadline to open this dispute is 90 days from the transaction, but your response window from the dispute date is 45 days. Miss it and you lose automatically.",
    },
    {
      mistake: "Not citing the 10% currency conversion rule",
      explanation:
        "If the amount difference is within 10% and currency-related, many merchants accept the chargeback without knowing this rule eliminates the dispute entirely. Always check whether the safe harbor applies before conceding.",
    },
  ],

  pro_tips: [
    {
      tip: "Know your authorization expiration windows. Mastercard standard authorization holds are typically 30 days for most merchant categories. Hotels and car rentals have different rules. If you're not finalizing the charge within a few days of authorization, check your specific category's rules.",
    },
    {
      tip: "For delayed fulfillment businesses (pre-orders, custom goods, reservations): build renewed authorizations into your fulfillment workflow. Authorize at order, get a renewed authorization before finalizing the charge if more than a day or two has passed.",
    },
    {
      tip: "The 10% currency conversion allowance (Mastercard allows up to 10% difference when amounts are converted between currencies) is a specific rule that most merchants and many processors don't cite proactively. If you process multi-currency transactions and get a 4808, check whether the amount difference falls within this safe harbor before accepting the loss.",
    },
    {
      tip: "Pull your authorization records from your processor dashboard, not just your payment platform's dispute interface. The processor-level authorization data is more complete and more credible as evidence.",
    },
    {
      tip: "For restaurant and service merchants with tip lines: Mastercard allows tip adjustments up to 20% over the pre-tip authorization amount. If your chargeback is on a tipped transaction and the amount difference is the tip, document this -- it's not a 4808 violation.",
    },
  ],

  urgency_essentials: {
    summary:
      "This dispute type is won on technical authorization records. Product descriptions, customer communications, and delivery proof are irrelevant -- the customer's bank only cares about whether you had a valid payment approval. Focus on these in order.",
    ordered_items: [
      "Original authorization record with transaction approval number and timestamp",
      "Final charge record showing the authorization code and charged amount",
      "If amount differs: currency conversion documentation (cite the 10% rule) or tip authorization",
      "Payment processor transaction log showing the full record from approval to final charge",
    ],
  },

  narrative_template: `**Authorization Confirmation**
[The bank's main question: was a valid authorization obtained for this transaction?]
Authorization code: {{authorization_code}} (auto-filled from Stripe)
Network status: {{network_status}} (auto-filled from Stripe)
Transaction date: [date]
Amount authorized: [amount]
Amount charged: [amount]

**Transaction Authentication**
[Security verification results from the payment network.]
AVS address check: {{avs_address_check}} (auto-filled from Stripe)
AVS zip check: {{avs_zip_check}} (auto-filled from Stripe)
CVC check: {{cvc_check}} (auto-filled from Stripe)
3D Secure: {{three_d_secure_result}} (auto-filled from Stripe)

**Transaction Details**
[The bank checks that the final charge matches what was authorized.]
Transaction date: [date]
Authorized amount: [amount]
Final charge amount: [amount]
[If amounts match: "The final charge matches the authorized amount."]
[If amounts differ due to currency conversion: "The difference of [amount] ([X]%) is within Mastercard's 10% currency conversion allowance."]
[If tip adjustment: "The tip of [amount] was added by the customer. This is within Mastercard's 20% restaurant tip allowance."]

**Customer Identity**
[Ties the transaction to the cardholder.]
Customer name: [name on the order]
Customer email: [email used at checkout]
Billing address: [address on file]

**Supporting Documentation**
[Any additional records that corroborate the authorization.]
[Describe: receipts, order confirmations, processor transaction logs]

The transaction was properly authorized and the final charge matches the authorization. We respectfully request this dispute be resolved in our favor.`,

  response_deadline_days: 45,
  filing_window_days: 90,
  key_differences: null,
};
