import type { PlaybookData } from "../types";

export const visa136: PlaybookData = {
  network: "visa",
  reason_code: "13.6",
  display_name: "Credit Not Processed",
  category: "consumer",
  legacy_code: null,
  description:
    "The cardholder returned merchandise or cancelled a service and is claiming the merchant never issued the promised refund (credit). This is one of the cleaner dispute types to defend -- if you issued the refund, prove it; if you didn't, the cardholder is probably right.\n\nCommon scenarios:\n- Merchant issued the refund, but it hasn't posted yet (timing lag)\n- Merchant issued the refund to the wrong account or card\n- Merchant promised a refund verbally or in writing but never processed it\n- Merchandise was returned but the merchant disputes the return condition\n\nThe customer had 120 calendar days from the date the credit was expected (or from the transaction date if no credit date was promised) to open this dispute.",

  coach_headline: "The cardholder says they returned the item but never got a refund.",
  coach_summary:
    "The customer claims they're owed a refund that was never processed. If you already issued the refund, show proof. If the return doesn't qualify under your policy, you'll need to show the customer agreed to that policy at purchase.",
  coach_issuer_summary:
    "The customer's bank checks: Was a refund actually issued? If not, does the merchant's return policy apply? Did the customer follow the return process? Was the return policy clearly disclosed before purchase?",
  coach_acquirer_summary:
    "Your response goes through a compliance check by your payment processor before the customer's bank sees it. Either show proof the refund was already processed (with date and amount) or provide your return policy and evidence it was disclosed to the customer at checkout.",

  issuer_evaluation: `The customer's bank evaluates Visa 13.6 disputes using the following criteria:

1. Was a refund actually issued? The bank checks whether a credit posting exists. If it does, the dispute should be withdrawn.
2. Was the refund issued to the correct account? A refund sent to an expired or closed card doesn't satisfy the obligation.
3. Is the refund still in transit? Some refunds take 5-10 business days to post. If the timing is the issue, showing the refund was processed (even if not yet posted) can resolve the dispute.
4. Did the merchant agree to a refund? Written confirmation of a promised refund is heavily weighted. If you said you'd refund and didn't, the dispute will go against you.
5. Was the return accepted? If the merchant claims the return was in unacceptable condition, they need documentation of that inspection.
6. What does the return/refund policy say? The bank checks whether the refund was owed under the merchant's stated terms.`,

  acquirer_prereview: `Before your evidence reaches the customer's bank, it passes through your payment processor (also called an acquirer) first. Your processor reviews the package for completeness and formatting compliance with network rules. If your submission is incomplete or doesn't address the assigned reason code, it gets bounced before the bank ever sees it. Merchants are rarely notified clearly when this happens -- the submission just fails.

This means:
- Your package must directly address Credit Not Processed -- generic responses won't clear pre-review.
- All required documents (see checklist below) must be present.
- Your processor may impose an internal deadline shorter than the network's 30-day response window.

Getting bounced at the processor stage is an automatic loss with no second chance. The checklist below tells you exactly what both your processor and the customer's bank need to see.`,

  evidence_checklist: [
    {
      item: "Refund confirmation / transaction record",
      category: "mandatory",
      context: "refund_issued",
      required: true,
      why_matters:
        "Shows the refund was processed, the amount, and the date. This is usually sufficient to close the dispute on its own.",
      where_to_find:
        "Stripe Dashboard > Payments > click the original payment > look for the Refund section. Screenshot showing the refund date, amount, and status ('Succeeded'). This is usually the only thing you need to submit.",
      stripe_field: "refund_data",
      urgency_essential: true,
      urgency_order: 1,
    },
    {
      item: "Refund amount and date matching the dispute",
      category: "mandatory",
      context: "refund_issued",
      required: true,
      why_matters:
        "The amount and timing must be traceable back to this specific transaction. An unmatched refund record won't satisfy the customer's bank.",
      where_to_find:
        "Same Stripe payment detail page as above. Make sure the refund amount matches the disputed amount and the refund is linked to this specific payment (not a different transaction). If you issued a partial refund, note the amount difference and why.",
      stripe_field: "refund_data",
      urgency_essential: true,
      urgency_order: 2,
    },
    {
      item: "Processor confirmation of the credit posting",
      category: "recommended",
      context: "refund_issued",
      required: false,
      why_matters:
        "If the refund has already posted, a processor screenshot showing the credit is conclusive. Removes any ambiguity about whether the funds reached the customer.",
      where_to_find:
        "Stripe Dashboard > Payments > click the payment > check if the refund status shows 'Succeeded' (meaning the credit has posted). If you process through a different gateway, check that processor's dashboard for the credit posting confirmation.",
      urgency_essential: false,
      urgency_order: null,
    },
    {
      item: "Return/refund policy as displayed at checkout",
      category: "mandatory",
      context: "refund_disputed",
      required: true,
      why_matters:
        "Establishes whether a refund was owed at all and under what conditions. If the customer couldn't reasonably find your refund terms at checkout, the bank won't enforce them in your favor.",
      where_to_find:
        "Screenshot your checkout page showing the return/refund policy link or text. Then screenshot the policy page itself. Shopify: Settings > Policies > Refund policy. If the policy is in your footer or a terms page, grab that too. The bank needs to see the customer could have found it before buying.",
      urgency_essential: true,
      urgency_order: 2,
    },
    {
      item: "Return condition documentation (photos or inspection records)",
      category: "mandatory",
      context: "refund_disputed",
      required: true,
      why_matters:
        "Photos or inspection records showing the returned item was not in acceptable condition per your policy. Without this, you cannot dispute a return condition claim.",
      where_to_find:
        "Check your phone's camera roll or warehouse documentation for photos taken when you received the returned item. If your team fills out inspection forms or checklists on returns, pull the record for this order. The photos should show the condition that caused you to deny the refund.",
      urgency_essential: true,
      urgency_order: 4,
    },
    {
      item: "Evidence the item was not returned",
      category: "mandatory",
      context: "refund_disputed",
      required: true,
      why_matters:
        "Any documentation showing no return was initiated or received. If no return occurred, you have no obligation to issue a refund.",
      where_to_find:
        "Search your returns management system (Returnly, Loop Returns, or your platform's built-in returns), helpdesk, and email for any return requests from this customer. If you find nothing, document that search. Also check your shipping/receiving logs for any inbound packages from this customer.",
      urgency_essential: false,
      urgency_order: null,
    },
    {
      item: "Customer communication denying the return",
      category: "recommended",
      context: "refund_disputed",
      required: false,
      why_matters:
        "If you notified the customer the return was rejected and why, show that communication. Demonstrates you followed your policy and informed the customer.",
      where_to_find:
        "Search your helpdesk or email for the message where you told the customer their return was denied (or their refund was reduced). Include the reason you gave them. This shows you communicated the decision, not just made it silently.",
      urgency_essential: false,
      urgency_order: null,
    },
    {
      item: "Order confirmation showing original terms",
      category: "recommended",
      context: "all",
      required: false,
      why_matters:
        "Establishes what the customer agreed to at time of purchase. Provides the baseline against which the return and refund obligation is evaluated.",
      where_to_find:
        "Check your email service provider (SendGrid, Postmark) for the order confirmation email sent to this customer. Alternatively, pull the order details from your e-commerce platform (Shopify Admin > Orders, WooCommerce > Orders). The confirmation should show what was purchased and any terms referenced at checkout.",
      urgency_essential: false,
      urgency_order: null,
    },
    {
      item: "Cancellation policy disclosure (if the missing credit relates to a cancelled subscription)",
      category: "recommended",
      context: "all",
      required: false,
      why_matters:
        "Stripe treats the refund/return policy and the proof of disclosure as two separate things. You need to show not just what your policy says, but how and when the customer was shown it. A clickwrap log or checkbox timestamp at checkout is ideal. Without disclosure proof, the bank may not enforce your policy.",
      where_to_find:
        "Screenshot your checkout page showing where the cancellation/refund policy appears (checkbox, footer link, terms acceptance). If you log clickwrap acceptance (when the customer checked the 'I agree to terms' box), pull that record with its timestamp. For subscriptions, also check whether your signup flow showed the cancellation policy before the customer entered payment details.",
      urgency_essential: false,
      urgency_order: null,
    },
    {
      item: "Written communication about the return or refund",
      category: "recommended",
      context: "all",
      required: false,
      why_matters:
        "Email or chat showing the return discussion -- especially any acknowledgment from the customer. Any written refund promise you made is heavily weighted by the customer's bank.",
      where_to_find:
        "Search your helpdesk (Zendesk, Intercom, Freshdesk) and email (Gmail > search by customer name) for any conversations about a return or refund for this order. Pay special attention to any message where you or the customer discussed refund terms, timing, or conditions.",
      urgency_essential: true,
      urgency_order: 3,
    },
  ],

  common_mistakes: [
    {
      mistake: "Issuing a refund to the wrong card",
      explanation:
        "If the customer's card changed (expired, re-issued), a refund to the old card may not reach them. Verify the refund destination before processing. If the card changed, contact the customer to confirm the correct account.",
    },
    {
      mistake: "Not sending a refund confirmation email",
      explanation:
        "If you processed the refund but didn't email the customer, they often file a dispute assuming you never did it. A refund confirmation email with the amount and expected posting timeframe prevents most of these disputes.",
    },
    {
      mistake: "Verbal refund promises without follow-through",
      explanation:
        "If a customer service rep promised a refund and it wasn't processed, you will lose the dispute. Always process what you promise, and document the promise in writing so it can be tracked.",
    },
    {
      mistake: "Refund policy buried or unclear",
      explanation:
        "If the customer couldn't reasonably find your refund terms at checkout, the bank won't enforce them in your favor. Your return policy must be visible and accepted at the point of purchase.",
    },
    {
      mistake: "Accepting a return without inspecting it",
      explanation:
        "If you accept a return without documenting its condition, you lose the ability to dispute a refund based on condition. Always photograph returned merchandise on receipt, even if you intend to issue the refund.",
    },
    {
      mistake: "Missing the response deadline",
      explanation:
        "The chargeback response window is 30 days for Visa. An unanswered dispute is an automatic loss. Set calendar reminders the moment a dispute is filed.",
    },
  ],

  pro_tips: [
    {
      tip: "Process refunds the same day you confirm a return. Delay between return receipt and refund processing is the single biggest cause of credit not processed disputes. Same-day processing creates a clean, unambiguous paper trail.",
    },
    {
      tip: "Send a refund confirmation email immediately after processing. Include the amount, the date, and a note that it may take 5-10 business days to appear. This eliminates most disputes before they start.",
    },
    {
      tip: "If a refund was issued but hasn't posted yet, call it out explicitly in your dispute response. Show the refund was processed (processor record) and note the expected posting window. The customer's bank will verify on their side and withdraw the dispute.",
    },
    {
      tip: "Photograph every returned item on receipt. Even if you accept the return and issue the refund, having photos protects you if the customer later disputes the refund amount or claims something else was returned.",
    },
    {
      tip: "For subscription cancellations that result in refunds: process the refund immediately on cancellation and send confirmation. Don't wait for the billing cycle to close.",
    },
  ],

  urgency_essentials: {
    summary:
      "If you issued the refund, that single document usually wins this. Get it and submit it. These items in order are your best chance of winning when you have less than 5 days to respond.",
    ordered_items: [
      "Refund confirmation / transaction record (if refund was issued)",
      "Return/refund policy showing whether refund was owed",
      "Any written communication about the return or refund promise",
      "Return condition documentation (if disputing the return)",
    ],
  },

  narrative_template: `We are responding to a Credit Not Processed dispute (Visa 13.6).

[If refund was already issued:]
**Refund Already Processed:**
A refund of [amount] was processed on [date] to the cardholder's account.
Refund confirmation ID: [ID]
[Attach: refund transaction record from processor]

Please note that refunds may take 5-10 business days to appear on the cardholder's statement depending on their bank's processing timeline. We respectfully request this dispute be withdrawn.

[If disputing that a refund is owed:]
**Return/Refund Policy:**
Our return policy, accepted at checkout on [date], states: [policy terms].
[Attach: screenshot of return policy at checkout]

**Return Status:**
[Choose applicable:]
- No return was received from the cardholder as of [date]. Our return policy requires merchandise to be returned before a refund is issued.
- A return was received on [date]. Upon inspection, the merchandise was found to be [condition -- damaged / used / missing components], which does not meet the condition required for a refund under our stated policy.
  [Attach: photos of returned merchandise, return inspection record]

**Customer Communication:**
[Summary of any communications regarding the return/refund, including any notifications sent to the cardholder about the return status]

Based on the above, [a refund is not owed under our stated return policy / the refund has already been issued]. We respectfully request this dispute be resolved in our favor.`,

  response_deadline_days: 30,
  filing_window_days: 120,
  key_differences: null,
};
