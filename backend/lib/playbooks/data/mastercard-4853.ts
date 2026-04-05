import type { PlaybookData } from "../types";

export const mastercard4853: PlaybookData = {
  network: "mastercard",
  reason_code: "4853",
  display_name: "Cardholder Dispute -- Not as Described / Defective",
  category: "consumer",
  legacy_code: null,
  description:
    "The cardholder claims the merchandise or service they received differs significantly from what was described at the time of purchase. This could mean the item arrived damaged, was defective, was the wrong product entirely, or the service quality didn't match what was promised. This is one of the most subjective dispute types -- 'not as described' is inherently a judgment call -- which makes it both harder to win and a magnet for friendly fraud.\n\nUnlike Visa 13.3 (which covers similar ground), Mastercard 4853 is a catch-all code that spans many dispute scenarios. The 'Not as Described / Defective' sub-type is the one most relevant to product-selling merchants.",

  issuer_evaluation: `The issuer evaluates Mastercard 4853 disputes using the following criteria:

1. Does the cardholder's description of what they received differ materially from the merchant's product listing? The issuer compares the cardholder's claim against available product descriptions, images, and terms.
2. Did the cardholder attempt to return the merchandise? Mastercard expects the cardholder to attempt resolution with the merchant before filing. If the merchant has a return policy and the cardholder didn't follow it, this weakens the claim.
3. Was the item returned? If not, the issuer weighs whether the merchant offered a return path. If merchandise was returned, the issuer must wait at least 15 calendar days before filing the chargeback.
4. Is there documented communication between cardholder and merchant? Evidence of the cardholder raising the issue and the merchant's response (or lack thereof) is heavily weighted.
5. Filing window compliance: 120 calendar days from the transaction processing date, delivery date, or service end date (maximum 540 days from original transaction).
6. Is the claim subjective or objective? "Wrong item shipped" is objective and easy to evaluate. "Quality wasn't what I expected" is subjective and harder -- the issuer leans toward the cardholder in subjective cases unless the merchant provides strong documentary evidence.

The issuer is primarily looking for whether the merchant's description was accurate and whether the merchant attempted to resolve the issue. Unlike "not received" disputes where delivery proof is binary, "not as described" disputes are inherently more judgment-based.

The precise target for your representment: The issuer is checking whether the cardholder can prove you refused to remedy their complaint. Under Mastercard rules, the cardholder must attempt to resolve the issue with the merchant before filing -- if they have documentation showing they contacted you and you didn't resolve it, that satisfies the chargeback condition. Your job is to directly refute their claimed contact (show they never reached out, or show you did resolve it), not just to prove your product was good. If they never contacted you before filing, say so explicitly and prominently -- Mastercard requires merchant contact first, and skipping that step is a filing defect that works in your favor.`,

  acquirer_prereview: `Before your evidence reaches the issuing bank, it passes through your acquirer first. The acquirer reviews the package for completeness and formatting compliance with network rules. If your submission is incomplete or doesn't address the assigned reason code, it gets bounced before the issuer ever sees it. Merchants are rarely notified clearly when this happens -- the submission just fails.

This means:
- Your package must directly address reason code 4853 (Cardholder Dispute -- Not as Described / Defective) -- generic evidence won't clear pre-review.
- All required documents (see checklist below) must be present.
- Your acquirer may impose an internal deadline shorter than Mastercard's 45-day window.

Getting bounced at the acquirer stage is an automatic loss with no second chance. The checklist below tells you exactly what both the acquirer and issuer need to see.`,

  evidence_checklist: [
    {
      item: "Original product/service description (website listing, catalog page, or order confirmation)",
      category: "mandatory",
      context: "all",
      required: true,
      why_matters:
        "This is your baseline. The issuer compares what you described against what the cardholder claims they received. Screenshot the listing -- don't just describe it.",
      urgency_essential: true,
      urgency_order: 1,
    },
    {
      item: "Proof the item or service matched the description (photos of actual item shipped, quality control records, inspection documentation)",
      category: "mandatory",
      context: "all",
      required: true,
      why_matters:
        "Directly refutes the cardholder's claim that what they received differed from what was described. For services, this means scope of work delivered vs. agreed scope.",
      urgency_essential: false,
      urgency_order: null,
    },
    {
      item: "Customer communication logs (emails, chat transcripts, support tickets)",
      category: "mandatory",
      context: "all",
      required: true,
      why_matters:
        "Shows you were responsive and attempted resolution. If the cardholder never contacted you before filing, this is powerful evidence of friendly fraud -- Mastercard requires merchant contact first.",
      urgency_essential: true,
      urgency_order: 2,
    },
    {
      item: "Return/refund policy as displayed at checkout",
      category: "recommended",
      context: "all",
      required: false,
      why_matters:
        "If your policy offered a return path and the cardholder didn't use it, this undercuts their claim. Either way, a visible, accessible return policy helps you.",
      urgency_essential: true,
      urgency_order: 5,
    },
    {
      item: "Proof of delivery (tracking confirmation, signature)",
      category: "recommended",
      context: "all",
      required: false,
      why_matters:
        "Establishes the item was delivered. Doesn't prove it matched the description, but prevents the dispute from pivoting to 'not received.'",
      urgency_essential: true,
      urgency_order: 3,
    },
    {
      item: "Prior transaction history with the cardholder",
      category: "recommended",
      context: "all",
      required: false,
      why_matters:
        "A repeat customer who bought the same product before is hard-pressed to claim it's 'not as described' on the 5th purchase. Demonstrates established expectations.",
      urgency_essential: false,
      urgency_order: null,
    },
    {
      item: "Photos or video of item before shipment (timestamped packing photos showing correct item in good condition)",
      category: "recommended",
      context: "all",
      required: false,
      why_matters:
        "Proves the item was in good condition and matched the description when it left your facility. Especially critical for fragile, handmade, or high-value items.",
      urgency_essential: true,
      urgency_order: 4,
    },
    {
      item: "Quality control or inspection records (batch inspection reports, QC checklists)",
      category: "recommended",
      context: "all",
      required: false,
      why_matters:
        "For manufacturers and producers: shows systematic quality assurance. Demonstrates this isn't a one-off error but a documented, repeatable process.",
      urgency_essential: false,
      urgency_order: null,
    },
    {
      item: "Terms of service accepted at checkout",
      category: "recommended",
      context: "all",
      required: false,
      why_matters:
        "Especially for services -- establishes what was promised and agreed to. Useful when the cardholder claims subjective expectations that differ from the written agreement.",
      urgency_essential: false,
      urgency_order: null,
    },
    {
      item: "Signed scope of work or service agreement",
      category: "mandatory",
      context: "services",
      required: true,
      why_matters:
        "Defines exactly what was promised. Without this, the cardholder's subjective expectations become the standard for evaluation.",
      urgency_essential: false,
      urgency_order: null,
    },
    {
      item: "Proof of service delivery (reports, deliverables, login/access logs)",
      category: "mandatory",
      context: "services",
      required: true,
      why_matters:
        "Concrete evidence that the work was performed as agreed. For digital or software services, access logs and login timestamps serve this purpose.",
      urgency_essential: false,
      urgency_order: null,
    },
    {
      item: "Milestone sign-offs or approval emails from the customer",
      category: "recommended",
      context: "services",
      required: false,
      why_matters:
        "If the customer approved deliverables along the way, it is hard to claim the final result wasn't as described. Interim approvals are extremely strong evidence.",
      urgency_essential: false,
      urgency_order: null,
    },
  ],

  common_mistakes: [
    {
      mistake: "Relying on generic product descriptions",
      explanation:
        "'High quality item' means nothing in a dispute. Specific dimensions, materials, features, and limitations are what the issuer compares against. The more precise your listing, the easier it is to prove you delivered what you described.",
    },
    {
      mistake: "Not photographing items before shipment",
      explanation:
        "You can't prove the item was in good condition when it left your facility if you don't have photos. This is especially critical for fragile, handmade, or high-value items.",
    },
    {
      mistake: "Ignoring or delaying responses to customer complaints",
      explanation:
        "If the cardholder contacted you about the issue and you didn't respond (or took days to respond), the issuer assumes you're unresponsive. Prompt, documented communication is your strongest defense.",
    },
    {
      mistake: "Telling the customer to contact the manufacturer",
      explanation:
        "Mastercard holds the merchant responsible, not the manufacturer. Referring the customer elsewhere doesn't satisfy your obligation and makes you look evasive to the issuer.",
    },
    {
      mistake: "Accepting chargebacks for subjective 'not as described' claims",
      explanation:
        "'Not as described' chargebacks are disproportionately friendly fraud. A customer who says 'the color was slightly different' or 'it felt cheaper than expected' may be fishing. Challenge these through representment with your product documentation.",
    },
    {
      mistake: "Not having a clear return policy",
      explanation:
        "If you don't offer returns, the issuer sees a dead end for the cardholder. If you do offer returns but the cardholder didn't use them, that's evidence in your favor. Either way, a visible, accessible return policy helps you.",
    },
    {
      mistake: "Missing the 45-day response window",
      explanation:
        "Mastercard gives 45 calendar days from the chargeback processing date. Miss it and you lose automatically, even with perfect evidence. Your acquirer may impose a shorter internal deadline.",
    },
  ],

  pro_tips: [
    {
      tip: "Screenshot your product listings regularly. Product pages change over time, but the dispute references what was listed when the cardholder purchased. Keep dated screenshots or use the Wayback Machine.",
    },
    {
      tip: "For handmade or custom goods, document the production process. Photos at each stage prove the item was made to spec. This is gold in 'not as described' disputes.",
    },
    {
      tip: "Respond to customer complaints within 24 hours, even if you can't resolve immediately. 'We received your concern and are looking into it' documented in writing is worth more than a perfect response 5 days later.",
    },
    {
      tip: "If a customer claims the item is defective, ask for photos. A customer who can't produce photos of the alleged defect is likely committing friendly fraud. Their refusal to document the issue is evidence you can submit.",
    },
    {
      tip: "For high-value items ($500+), consider requiring signed delivery plus unboxing acknowledgment. Some merchants include a card in the package: 'Please inspect your order and contact us within 48 hours if anything is wrong.' A customer who waited 60 days to complain looks less credible.",
    },
    {
      tip: "Track your 'not as described' disputes by product or SKU. If one product generates disproportionate disputes, fix the listing or fix the product -- don't keep fighting the same battle.",
    },
    {
      tip: "The cardholder must attempt resolution with you first. If they went straight to the bank without contacting you, say so explicitly in your response. This is a Mastercard requirement and undermines their filing.",
    },
  ],

  urgency_essentials: {
    summary:
      "Focus on documentation quality above all else. These items in order are your best chance of winning when you have less than 5 days to respond.",
    ordered_items: [
      "Original product listing or description (screenshot or catalog page)",
      "Customer communication logs (or evidence of no customer contact prior to chargeback)",
      "Proof of delivery confirming the item was received",
      "Photos of the item before shipment (if available)",
      "Return policy showing the cardholder had a resolution path",
    ],
  },

  narrative_template: `The cardholder claims the merchandise/service did not match the description provided at the time of purchase. We respectfully dispute this claim based on the following evidence:

**Transaction Details:**
- Order placed: [date]
- Items ordered: [description]
- Order total: [amount]
- Delivery address: [address]

**Product/Service Description:**
The item/service was listed as: [exact description from listing]
[Attach: screenshot of product listing at time of purchase]

**What Was Delivered:**
- Shipped: [date]
- Carrier: [carrier name]
- Tracking: [number]
- Delivery confirmed: [date]
[Attach: photos of item before shipment, packing documentation]

**Customer Communication:**
[If customer contacted merchant:]
The cardholder contacted us on [date] regarding [issue]. We responded on [date] and offered [resolution -- replacement, return, or refund].
[Describe outcome of communication]

[If customer did NOT contact merchant:]
Our records show no communication from the cardholder regarding any issue with this order prior to the chargeback filing. The cardholder did not attempt to resolve this matter with us directly, as required by Mastercard dispute guidelines.

**Return Policy:**
Our return policy, displayed at checkout and included in the order confirmation email, allows returns within [X] days for any reason. The cardholder did not initiate a return.
[Attach: screenshot of return policy]

**Additional Context:**
[Prior purchase history, quality control records, or other supporting evidence]

Based on the evidence provided, the merchandise/service delivered matched the description provided at the time of purchase. The cardholder had access to our return process but did not utilize it. We respectfully request this dispute be resolved in our favor.`,

  response_deadline_days: 45,
  filing_window_days: 120,
  key_differences:
    "Mastercard 4853 vs. Visa 13.3 -- key differences for merchants:\n\nScope: Visa 13.3 is a dedicated code for 'Not as Described' disputes only. Mastercard 4853 is an umbrella code covering 7+ dispute sub-types; this playbook focuses on the Not as Described / Defective sub-type.\n\nResponse deadline: Visa 13.3 gives merchants 30 days to respond. Mastercard 4853 gives 45 days -- more time to build your case.\n\nFiling window: Both networks use 120 days (maximum 540 days from original transaction).\n\nReturn waiting period: Visa 13.3 has no specified waiting period. Under Mastercard 4853, if the merchandise was returned, the issuer must wait at least 15 calendar days before filing the chargeback.\n\nCustomer contact requirement: Visa 13.3 recommends the cardholder attempt merchant resolution. Mastercard 4853 requires it -- the cardholder must attempt to resolve with the merchant first. If they skipped this step and went straight to the bank, say so explicitly in your response. This is a filing defect that works in your favor.\n\nSubjectivity handling: Both networks lean toward the cardholder in subjective cases. However, Mastercard's required merchant contact step gives merchants slightly more leverage -- if the cardholder can't document that they tried to resolve the issue with you, their filing is procedurally weaker.",
};
