import type { PlaybookData } from "../types";

export const visa136: PlaybookData = {
  network: "visa",
  reason_code: "13.6",
  display_name: "Credit Not Processed",
  category: "consumer",
  legacy_code: null,
  description:
    "The cardholder returned merchandise or cancelled a service and is claiming the merchant never issued the promised refund (credit). This is one of the cleaner dispute types to defend -- if you issued the refund, prove it; if you didn't, the cardholder is probably right.\n\nCommon scenarios:\n- Merchant issued the refund, but it hasn't posted yet (timing lag)\n- Merchant issued the refund to the wrong account or card\n- Merchant promised a refund verbally or in writing but never processed it\n- Merchandise was returned but the merchant disputes the return condition\n\nThe deadline for cardholders to file is typically 120 calendar days from the date the credit was expected (or from the transaction date if no credit date was promised).",

  issuer_evaluation: `The issuer evaluates Visa 13.6 disputes using the following criteria:

1. Was a refund actually issued? The issuer checks whether a credit posting exists. If it does, the dispute should be withdrawn.
2. Was the refund issued to the correct account? A refund sent to an expired or closed card doesn't satisfy the obligation.
3. Is the refund still in transit? Some refunds take 5-10 business days to post. If the timing is the issue, showing the refund was processed (even if not yet posted) can resolve the dispute.
4. Did the merchant agree to a refund? Written confirmation of a promised refund is heavily weighted. If you said you'd refund and didn't, the dispute will go against you.
5. Was the return accepted? If the merchant claims the return was in unacceptable condition, they need documentation of that inspection.
6. What does the return/refund policy say? The issuer checks whether the refund was owed under the merchant's stated terms.`,

  acquirer_prereview: `Before your evidence reaches the issuing bank, it passes through your acquirer first. The acquirer reviews the package for completeness and formatting compliance with network rules. If your submission is incomplete or doesn't address the assigned reason code, it gets bounced before the issuer ever sees it. Merchants are rarely notified clearly when this happens -- the submission just fails.

This means:
- Your package must directly address Credit Not Processed -- generic responses won't clear pre-review.
- All required documents (see checklist below) must be present.
- Your acquirer may impose an internal deadline shorter than the network's 30-day response window.

Getting bounced at the acquirer stage is an automatic loss with no second chance. The checklist below tells you exactly what both the acquirer and issuer need to see.`,

  evidence_checklist: [
    {
      item: "Refund confirmation / transaction record",
      category: "mandatory",
      context: "refund_issued",
      required: true,
      why_matters:
        "Shows the refund was processed, the amount, and the date. This is usually sufficient to close the dispute on its own.",
      urgency_essential: true,
      urgency_order: 1,
    },
    {
      item: "Refund amount and date matching the dispute",
      category: "mandatory",
      context: "refund_issued",
      required: true,
      why_matters:
        "The amount and timing must be traceable back to this specific transaction. An unmatched refund record won't satisfy the issuer.",
      urgency_essential: true,
      urgency_order: 2,
    },
    {
      item: "Processor confirmation of the credit posting",
      category: "recommended",
      context: "refund_issued",
      required: false,
      why_matters:
        "If the refund has already posted, a processor screenshot showing the credit is conclusive. Removes any ambiguity about whether the funds reached the cardholder.",
      urgency_essential: false,
      urgency_order: null,
    },
    {
      item: "Return/refund policy as displayed at checkout",
      category: "mandatory",
      context: "refund_disputed",
      required: true,
      why_matters:
        "Establishes whether a refund was owed at all and under what conditions. If the cardholder couldn't reasonably find your refund terms at checkout, the issuer won't enforce them in your favor.",
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
      urgency_essential: false,
      urgency_order: null,
    },
    {
      item: "Customer communication denying the return",
      category: "recommended",
      context: "refund_disputed",
      required: false,
      why_matters:
        "If you notified the customer the return was rejected and why, show that communication. Demonstrates you followed your policy and informed the cardholder.",
      urgency_essential: false,
      urgency_order: null,
    },
    {
      item: "Order confirmation showing original terms",
      category: "recommended",
      context: "all",
      required: false,
      why_matters:
        "Establishes what the cardholder agreed to at time of purchase. Provides the baseline against which the return and refund obligation is evaluated.",
      urgency_essential: false,
      urgency_order: null,
    },
    {
      item: "Written communication about the return or refund",
      category: "recommended",
      context: "all",
      required: false,
      why_matters:
        "Email or chat showing the return discussion -- especially any acknowledgment from the cardholder. Any written refund promise you made is heavily weighted by the issuer.",
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
        "If the cardholder couldn't reasonably find your refund terms at checkout, the issuer won't enforce them in your favor. Your return policy must be visible and accepted at the point of purchase.",
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
      tip: "If a refund was issued but hasn't posted yet, call it out explicitly in your response. Show the refund was processed (processor record) and note the expected posting window. The issuer will verify on their side and withdraw the dispute.",
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
