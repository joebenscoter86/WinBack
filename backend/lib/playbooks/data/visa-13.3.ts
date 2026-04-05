import type { PlaybookData } from "../types";

export const visa133: PlaybookData = {
  network: "visa",
  reason_code: "13.3",
  display_name: "Not as Described or Defective Merchandise/Services",
  category: "consumer",
  legacy_code: "53",
  description:
    "The cardholder claims the merchandise they received was defective, damaged, not as described, or that services didn't match what was promised. This is the most subjective dispute type -- 'not as described' is in the eye of the beholder. The good news: as of October 2024, cardholders must attempt to return the merchandise before filing, which gives merchants a stronger defense if no return was attempted.",

  coach_headline: "The cardholder says what they got wasn't what was advertised.",
  coach_summary:
    "The customer is claiming the product or service didn't match what you described. The bank will compare what you promised against what was delivered. Your product listing, photos, and any communication with the customer are key evidence here.",
  coach_issuer_summary:
    "The bank checks: Does the product match its description? Did the merchant misrepresent quality, features, or condition? Did the customer contact the merchant first and give them a chance to resolve it? Was a return offered and refused?",
  coach_acquirer_summary:
    "Your response goes through a compliance check before the bank sees it. You need your original product description, proof of what was delivered, and ideally any customer communication showing they were satisfied or didn't raise concerns through your support channels.",

  issuer_evaluation: `The issuer evaluates Visa 13.3 disputes using the following criteria:

1. Does the product match its description? The bank compares what was advertised/described against what was received.
2. Did the cardholder attempt to return the merchandise? (Required as of Oct 2024)
3. If no return attempt, why not? The cardholder must provide documented reasons why return was impossible.
4. Did the merchant offer a resolution? Replacement, repair, refund, store credit?
5. Was the merchant responsive to complaints? Unresponsive merchants lose by default.
6. Filing window: 120 calendar days from transaction date. Merchant has 30 days to respond.
7. For subjective claims: The issuer may require a neutral third-party opinion to corroborate the cardholder's claim.

The issuer leans toward the cardholder on quality disputes unless the merchant has firm evidence that the product matched its description. Your product listing and pre-shipment documentation are your primary defense.

The precise target for your representment: The issuer is checking whether the cardholder can prove you refused to remedy their complaint. If the cardholder has documentation showing they contacted you and you didn't resolve it, that satisfies the chargeback condition in their favor. Your job is not just to show you delivered the right product -- it's to directly refute their claim of unresolved contact, or prove they never contacted you at all. If they went straight to the bank without contacting you first, call it out explicitly. That undermines their entire filing.`,

  acquirer_prereview: `Before your evidence reaches the issuing bank, it passes through your acquirer first. The acquirer reviews the package for completeness and formatting compliance with network rules. If your submission is incomplete or doesn't address the assigned reason code, it gets bounced before the issuer ever sees it. Merchants are rarely notified clearly when this happens -- the submission just fails.

This means:
- Your package must directly address reason code 13.3 (Not as Described / Defective) -- generic evidence won't clear pre-review.
- All required documents (see checklist below) must be present.
- Your acquirer may impose an internal deadline shorter than Visa's 30-day window.

Getting bounced at the acquirer stage is an automatic loss with no second chance. The checklist below tells you exactly what both the acquirer and issuer need to see.`,

  evidence_checklist: [
    {
      item: "Product description as shown at time of purchase (screenshot, listing page)",
      category: "mandatory",
      context: "all",
      required: true,
      why_matters:
        "This is what the bank compares against the cardholder's claim. If the description matches what was sent, you win. Without this, you have no baseline to defend against 'not as described.'",
      urgency_essential: true,
      urgency_order: 1,
    },
    {
      item: "Proof of delivery (tracking number with delivery confirmation)",
      category: "mandatory",
      context: "physical_goods",
      required: true,
      why_matters:
        "Must first prove the item was delivered before you can argue it matched the description. No delivery proof means the dispute may shift to a 13.1 (not received) loss instead.",
      urgency_essential: true,
      urgency_order: 2,
    },
    {
      item: "Pre-shipment photos of the actual item",
      category: "recommended",
      context: "physical_goods",
      required: false,
      why_matters:
        "Proves the item was in good condition when shipped. Critical for 'arrived damaged' claims. Without photos, you can't rebut a claim that the item was defective from the start.",
      urgency_essential: true,
      urgency_order: 4,
    },
    {
      item: "Product specifications or detailed listing",
      category: "recommended",
      context: "physical_goods",
      required: false,
      why_matters:
        "The more specific your listing, the harder it is for the cardholder to claim 'not as described.' Vague marketing language is easy to dispute; specific dimensions, materials, and features are not.",
      urgency_essential: false,
      urgency_order: null,
    },
    {
      item: "Customer communications about the product (emails, chat logs)",
      category: "recommended",
      context: "all",
      required: false,
      why_matters:
        "Shows any discussions about the product, complaints, or resolution attempts. If the cardholder never contacted you before filing, document that absence. If they did contact you, show your responsive handling.",
      urgency_essential: true,
      urgency_order: 3,
    },
    {
      item: "Proof cardholder did NOT attempt to return the merchandise",
      category: "recommended",
      context: "physical_goods",
      required: false,
      why_matters:
        "As of October 2024, the cardholder must attempt a return before filing. If they didn't, this is a strong procedural defense. No return request in your records is evidence worth highlighting.",
      urgency_essential: false,
      urgency_order: null,
    },
    {
      item: "Return policy clearly stated at checkout (screenshot or policy page)",
      category: "recommended",
      context: "physical_goods",
      required: false,
      why_matters:
        "Proves the cardholder knew how to return the item. If your policy was visible at checkout and they bypassed it to file a chargeback, that weakens their case.",
      urgency_essential: false,
      urgency_order: null,
    },
    {
      item: "Refund or replacement confirmation (if already issued)",
      category: "recommended",
      context: "all",
      required: false,
      why_matters:
        "Ends the dispute immediately if you already resolved it. A chargeback filed after a resolution was issued is a duplicate recovery attempt, which issuers take seriously.",
      urgency_essential: false,
      urgency_order: null,
    },
    {
      item: "Service agreement or scope of work document",
      category: "mandatory",
      context: "services",
      required: true,
      why_matters:
        "Defines exactly what was promised. Without a written agreement, the cardholder can claim almost anything wasn't delivered. This document is the foundation of your services defense.",
      urgency_essential: true,
      urgency_order: 1,
    },
    {
      item: "Proof of service delivery (reports, access logs, deliverables, work product)",
      category: "mandatory",
      context: "services",
      required: true,
      why_matters:
        "Shows the service was performed as agreed. The bank needs to see what was actually delivered, not just what was promised.",
      urgency_essential: true,
      urgency_order: 2,
    },
    {
      item: "Client sign-off or acceptance documentation",
      category: "recommended",
      context: "services",
      required: false,
      why_matters:
        "If the client approved the work, they can't credibly claim it wasn't as described. Signed acceptance or approval emails are some of the strongest evidence in services disputes.",
      urgency_essential: false,
      urgency_order: null,
    },
  ],

  common_mistakes: [
    {
      mistake: "Vague or exaggerated product descriptions",
      explanation:
        "If your listing says 'premium quality' and the product is average, you've set yourself up to lose. Be accurate and specific. Specific dimensions, materials, and features are defensible; marketing superlatives are not.",
    },
    {
      mistake: "No pre-shipment documentation",
      explanation:
        "Without photos or inspection records, you can't prove the item was fine when it left your warehouse. Quick phone photos before sealing the box take 30 seconds and can save a dispute.",
    },
    {
      mistake: "Ignoring customer complaints",
      explanation:
        "If the cardholder emailed you about a defective product and you didn't respond, the bank will side with them. Always respond, even if you disagree. An unanswered complaint is close to an admission.",
    },
    {
      mistake: "Refusing to accept returns on defective merchandise",
      explanation:
        "If your return policy is 'no returns' but the item is defective, you lose. Visa's rules override your return policy for defective merchandise. A no-returns policy only protects you on non-defective goods that were accurately described.",
    },
    {
      mistake: "Not providing return instructions",
      explanation:
        "The cardholder must attempt a return, but they need to know how. If you didn't provide clear return instructions, the return-attempt requirement is weakened as a defense.",
    },
    {
      mistake: "Poor packaging causing transit damage",
      explanation:
        "If the item was fine when shipped but arrived damaged due to bad packaging, that's on you. Document your packaging process and use appropriate materials. A damage claim from bad packaging is hard to fight.",
    },
  ],

  pro_tips: [
    {
      tip: "Screenshot your product listings regularly. Listings change over time, but the bank evaluates against what was shown when the customer purchased. Save timestamped copies at the time of each order.",
    },
    {
      tip: "Photograph items before shipping. Quick phone photos showing item condition and packaging take 30 seconds and provide critical evidence against 'arrived damaged' or 'defective' claims.",
    },
    {
      tip: "Respond to every complaint within 24 hours. Even if you can't resolve it immediately, acknowledge the issue. 'We're looking into this' documented in email is evidence of responsiveness that goes directly to the issuer's evaluation criteria.",
    },
    {
      tip: "Leverage the October 2024 return requirement. If the cardholder filed without attempting a return, this is a strong procedural defense. In your narrative, explicitly note: 'The cardholder did not attempt to return the merchandise per Visa guidelines effective October 2024. Our return policy is clearly stated and we have no record of a return request.'",
    },
    {
      tip: "For subjective quality claims, neutral third-party opinions help. If you have professional quality certifications, testing reports, or industry standards compliance documentation, include them. A third-party opinion is the one thing that can rebut a 'quality not good enough' claim.",
    },
    {
      tip: "Offer a resolution before the dispute escalates. A $20 partial refund is cheaper than a $150 chargeback plus the dispute fee. The fastest path to winning is preventing the dispute from being filed in the first place.",
    },
  ],

  urgency_essentials: {
    summary:
      "Focus on matching product description to what was delivered, and document whether a return was attempted. These items in order are your best chance of winning when you have less than 5 days to respond.",
    ordered_items: [
      "Product listing or description at time of purchase",
      "Delivery confirmation",
      "Any customer communication (especially if no return was attempted)",
      "Pre-shipment photos if available",
    ],
  },

  narrative_template: `The cardholder claims the merchandise/service was not as described or defective. We respectfully disagree based on the following evidence:

**Order Details:**
- Product/service: [description]
- Order date: [date]
- Amount: [amount]
- Delivery date: [date]

**Product Description Accuracy:**
The product listing at the time of purchase described [specific description]. The item delivered matches this description exactly. [Reference attached product listing screenshot]

**Delivery and Condition:**
- Tracking: [number]
- Delivered: [date]
- Pre-shipment condition: [Reference attached photos showing item condition before shipping]

**Return Attempt:**
[Choose applicable]:
- The cardholder has not attempted to return the merchandise. Per Visa guidelines effective October 2024, the cardholder must attempt a return before filing a dispute. Our return policy is clearly stated at checkout and no return request was received.
- The cardholder contacted us on [date] about [issue]. We offered [resolution]. [Outcome of that communication]

**Customer Communication:**
[Summary of any communications, showing merchant responsiveness]

The merchandise delivered matches the description provided at purchase, and we have received no return request. We respectfully request this dispute be resolved in our favor.`,

  response_deadline_days: 30,
  filing_window_days: 120,
  key_differences:
    "Visa 13.3 is a dedicated reason code covering only 'Not as Described / Defective' disputes, while Mastercard 4853 is a broad umbrella code that spans 7 or more dispute sub-types including not received, recurring cancellations, no-shows, and counterfeit goods. The response deadline differs: merchants have 30 days to respond to a Visa 13.3, versus 45 days for a Mastercard 4853. Both networks use a 120-day filing window (max 540 days). On return requirements, Visa 13.3 does not specify a waiting period after a return, but Mastercard 4853 requires the issuer to wait 15 days after the item was returned before the dispute can proceed. On the customer contact requirement, Visa recommends that cardholders attempt merchant resolution first, while Mastercard requires it -- giving merchants slightly more procedural leverage on 4853 disputes. Both networks handle subjective quality claims similarly, though the Mastercard 'attempted resolution' requirement gives merchants a marginally stronger procedural defense.",
};
