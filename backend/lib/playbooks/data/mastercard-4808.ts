import type { PlaybookData } from "../types";

export const mastercard4808: PlaybookData = {
  network: "mastercard",
  reason_code: "4808",
  display_name: "Authorization-Related Dispute",
  category: "authorization",
  legacy_code: null,
  description:
    "The cardholder's bank claims the transaction lacked a valid authorization. This can mean no authorization was obtained, the authorization had already expired before settlement, the authorized amount doesn't match the settled amount, or the card network approved the transaction via stand-in processing after the issuer declined it (CNP transactions). Authorization disputes are different from fraud or consumer disputes -- the question isn't whether the cardholder made the purchase, it's whether the merchant followed proper authorization procedures. These are often technical processing errors rather than cardholder complaints.",

  coach_headline: "The bank says this transaction didn't have a valid authorization.",
  coach_summary:
    "This dispute is about process, not the purchase itself. The bank isn't questioning whether the customer bought something. They're saying the authorization paperwork wasn't in order: either it expired before you settled, the amounts didn't match, or the card was declined but the transaction went through anyway. The fix is almost always in your payment processor records.",
  coach_issuer_summary:
    "The bank checks: Was a valid authorization obtained before the charge settled? Does the authorized amount match the settled amount? Was the authorization still active (not expired) when you settled? If there's a currency conversion difference, does it fall within the allowed 10% range?",
  coach_acquirer_summary:
    "Your response goes through a compliance check before the bank sees it. This dispute type is won entirely on authorization records, not customer communications or delivery proof. If you can't produce the authorization record and settlement record together, your response will be rejected.",

  issuer_evaluation: `The issuer evaluates Mastercard 4808 disputes using the following criteria:

1. Was a valid authorization obtained before settlement? The auth must have been active (not expired) at the time of settlement.
2. Does the authorized amount match the settled amount? Within Mastercard's 10% currency conversion allowance, a mismatch is grounds for this dispute. If the difference between authorized and settled amounts is due to currency conversion and falls within 10% of the authorized amount, the dispute does not qualify as a 4808 chargeback -- call this out explicitly in your representment.
3. Was the authorization tied to the correct account? An auth obtained on one card number but settled against another is invalid.
4. For stand-in disputes: Was the transaction declined by the issuer and then approved through stand-in? If so, the merchant accepted a transaction the issuer explicitly declined.
5. Filing window: 90 calendar days from the transaction processing date.`,

  acquirer_prereview: `Before your evidence reaches the issuing bank, it passes through your acquirer first. The acquirer reviews the package for completeness and formatting compliance with network rules. If your submission is incomplete or doesn't address the assigned reason code, it gets bounced before the issuer ever sees it. Merchants are rarely notified clearly when this happens -- the submission just fails.

This means:
- Your package must directly address reason code 4808 (Authorization-Related Dispute) -- generic transaction records that don't address the authorization chain won't clear pre-review.
- All required documents (see checklist below) must be present.
- Your acquirer may impose an internal deadline shorter than Mastercard's 45-day response window.

Getting bounced at the acquirer stage is an automatic loss with no second chance. The checklist below tells you exactly what both the acquirer and issuer need to see.`,

  evidence_checklist: [
    {
      item: "Original authorization record with approval code and timestamp",
      category: "mandatory",
      context: "all",
      required: true,
      why_matters:
        "Shows the auth was obtained, the amount, the timestamp, and the approval code. This is the core of the dispute -- without it, you have no defense.",
      where_to_find:
        "Stripe Dashboard > Payments > click the payment > scroll to the Timeline section. The authorization details (approval code, timestamp, amount) are listed there. For more detailed processor-level data, check your payment processor's admin portal directly. Note: Stripe maps auth data to uncategorized_text in evidence submissions, so copy the approval code and timestamps.",
      urgency_essential: true,
      urgency_order: 1,
    },
    {
      item: "Settlement record tied to the authorization",
      category: "mandatory",
      context: "all",
      required: true,
      why_matters:
        "Proves the settlement matches the authorization. The issuer compares the authorization and settlement records directly -- both must be present.",
      where_to_find:
        "Stripe Dashboard > Payments > click the payment > Timeline section shows when the charge was captured/settled. Look for the 'Payment captured' or 'Charge succeeded' entry with its timestamp. Compare the settled amount against the authorized amount shown earlier in the timeline.",
      urgency_essential: true,
      urgency_order: 2,
    },
    {
      item: "Authorization approval code",
      category: "mandatory",
      context: "all",
      required: true,
      why_matters:
        "Links the specific auth to the specific transaction. The approval code is the primary identifier tying your authorization record to the settlement.",
      where_to_find:
        "Stripe Dashboard > Payments > click the payment > look in the Payment details or Timeline for 'Authorization code' or 'Approval code'. You can also find this in the Stripe API response under charges.data[0].outcome.network_advice_code or by expanding the payment's JSON data.",
      urgency_essential: false,
      urgency_order: null,
    },
    {
      item: "Currency conversion documentation",
      category: "mandatory",
      context: "amount_discrepancy",
      required: true,
      why_matters:
        "If the amount difference is currency-related and within 10% of the authorized amount, Mastercard's 10% allowance applies and the dispute should be denied. Without this documentation, you cannot invoke the rule.",
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
      item: "Re-authorization record (if original authorization expired before settlement)",
      category: "mandatory",
      context: "expired_auth",
      required: true,
      why_matters:
        "If the original auth expired and you obtained a new one before settlement, showing both records proves you followed proper procedure. Without the re-auth record, an expired authorization dispute is very difficult to defend.",
      where_to_find:
        "Check your payment processor's admin portal for the re-authorization record. In Stripe, look at the payment's Timeline for a second authorization event. If you use a booking or pre-order system that re-authorizes before capture, check that system's transaction logs for the re-auth approval code and timestamp.",
      urgency_essential: true,
      urgency_order: 3,
    },
    {
      item: "Timestamp proof that settlement occurred before authorization expiration",
      category: "mandatory",
      context: "expired_auth",
      required: true,
      why_matters:
        "Authorization timelines are the dispute. If your records show settlement happened before the auth expired, the dispute basis disappears. The issuer is looking specifically at this timeline.",
      where_to_find:
        "Stripe Dashboard > Payments > click the payment > Timeline section. Compare the authorization timestamp against the capture/settlement timestamp. Screenshot both entries showing the settlement happened within the auth window (typically 7 days for e-commerce, 30 days for some merchant categories).",
      urgency_essential: false,
      urgency_order: null,
    },
    {
      item: "Payment processor transaction log showing the full authorization-to-settlement chain",
      category: "recommended",
      context: "all",
      required: false,
      why_matters:
        "Shows the full authorization-to-settlement chain from your processor's records. More complete and more credible as evidence than a screenshot of a payment dashboard page.",
      where_to_find:
        "Your payment processor's admin portal (not just the Stripe Dashboard). For Stripe, you can use the API to pull the full charge object with all authorization events. If you use a separate gateway or terminal provider, check their reporting dashboard for the full transaction log including auth codes, amounts, and timestamps.",
      urgency_essential: true,
      urgency_order: 4,
    },
    {
      item: "Order details matching the authorized amount",
      category: "recommended",
      context: "all",
      required: false,
      why_matters:
        "Connects the authorization to an actual customer order, showing this was a legitimate transaction. Helps the issuer understand the transaction context.",
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
        "Stripe's standard dispute evidence API doesn't have dedicated fields for authorization records, approval codes, or currency conversion documentation. All of these technical logs must go into the uncategorized_text (for text summaries) and uncategorized_file (for screenshots/PDFs) fields. If you don't map them there, the evidence won't make it into your submission.",
      where_to_find:
        "When submitting evidence through Stripe (or through WinBack), paste your authorization chain summary into the uncategorized_text field and upload processor screenshots or PDF exports as uncategorized_file attachments. This is the only way auth-related evidence reaches the issuer through Stripe's system.",
      urgency_essential: false,
      urgency_order: null,
    },
  ],

  common_mistakes: [
    {
      mistake: "Settling after authorization expiration",
      explanation:
        "Mastercard authorization holds expire. If you pre-authorize at booking or order placement and settle days later, you must re-authorize before settlement. Missing this step makes a 4808 dispute nearly impossible to defend.",
    },
    {
      mistake: "Settling a different amount without re-authorization",
      explanation:
        "Even a small amount change (except currency conversion within 10%) can trigger a 4808. If the final amount differs from the auth, re-authorize for the correct amount before settlement.",
    },
    {
      mistake: "Not retaining authorization records",
      explanation:
        "Your payment processor retains these, but you need to know how to pull them. If you can't produce an authorization record, you have no defense. Pull processor-level auth data, not just dashboard screenshots.",
    },
    {
      mistake: "Accepting stand-in approvals on declined transactions",
      explanation:
        "If the issuer declined a transaction and it was approved through stand-in, you own the liability. Don't fulfill orders on stand-in approvals for CNP transactions -- let the customer re-try with a different card.",
    },
    {
      mistake: "Missing the 45-day response window",
      explanation:
        "Mastercard's filing window is 90 days from the transaction, but your response window from the chargeback date is 45 days. Miss it and you lose automatically.",
    },
    {
      mistake: "Not citing the 10% currency conversion rule",
      explanation:
        "If the amount difference is within 10% and currency-related, many merchants accept the chargeback without knowing this rule eliminates the dispute entirely. Always check whether the safe harbor applies before conceding.",
    },
  ],

  pro_tips: [
    {
      tip: "Know your authorization expiration windows. Mastercard standard auth holds are typically 30 days for most merchant categories. Hotels and car rentals have different rules. If you're not settling within a few days of auth, check your specific category's rules.",
    },
    {
      tip: "For delayed fulfillment businesses (pre-orders, custom goods, reservations): build re-authorization into your fulfillment workflow. Auth at order, re-auth before settlement if more than a day or two has passed.",
    },
    {
      tip: "The 10% currency conversion allowance is a specific Mastercard rule that most merchants and many acquirers don't cite proactively. If you process multi-currency transactions and get a 4808, check whether the amount difference falls within this safe harbor before accepting the loss.",
    },
    {
      tip: "Pull your authorization records from your processor dashboard, not just your payment platform's dispute interface. The processor-level auth data is more complete and more credible as evidence.",
    },
    {
      tip: "For restaurant and service merchants with tip lines: Mastercard allows tip adjustments up to 20% over the pre-auth amount. If your chargeback is on a tipped transaction and the amount difference is the tip, document this -- it's not a 4808 violation.",
    },
  ],

  urgency_essentials: {
    summary:
      "This dispute type is won on technical authorization records. Product descriptions, customer communications, and delivery proof are irrelevant -- the issuer only cares about whether you had a valid authorization. Focus on these in order.",
    ordered_items: [
      "Original authorization record with approval code and timestamp",
      "Settlement record showing the authorization code and settled amount",
      "If amount differs: currency conversion documentation (cite the 10% rule) or tip authorization",
      "Payment processor transaction log showing the full auth-to-settle chain",
    ],
  },

  narrative_template: `We are responding to chargeback reason code 4808 (Authorization-Related Dispute).

**Transaction Details:**
- Transaction date: [date]
- Settlement date: [date]
- Amount authorized: [amount]
- Amount settled: [amount]
- Authorization approval code: [code]

**Authorization Record:**
A valid authorization was obtained on [date] at [time] for [amount].
Authorization approval code: [code].
[Attach: authorization record from processor]

[If amounts differ due to currency conversion:]
**Currency Conversion Note:**
The difference between the authorized amount ([auth amount]) and the settled amount ([settled amount]) is [difference], representing [X]% of the authorized amount. This is within Mastercard's 10% currency conversion allowance and does not qualify as grounds for a 4808 chargeback.

[If tip adjustment:]
**Tip Authorization:**
This transaction included a tip of [amount], added by the cardholder at the point of interaction. Restaurant tip adjustments up to 20% of the pre-tip authorization are permitted under Mastercard rules.
[Attach: signed receipt with tip line]

[If re-authorization was obtained:]
**Re-Authorization:**
The original authorization was obtained on [date]. A re-authorization was obtained on [date] (approval code: [code]) prior to settlement on [date].
[Attach: re-authorization record]

The settlement falls within the valid authorization window and matches the authorized amount. We respectfully request this dispute be resolved in our favor.`,

  response_deadline_days: 45,
  filing_window_days: 90,
  key_differences: null,
};
