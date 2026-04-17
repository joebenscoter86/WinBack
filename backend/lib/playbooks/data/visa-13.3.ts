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

  issuer_evaluation: `The customer's bank evaluates Visa 13.3 disputes using the following criteria:

1. Does the product match its description? The bank compares what was advertised/described against what was received.
2. Did the cardholder attempt to return the merchandise? (Required as of Oct 2024)
3. If no return attempt, why not? The cardholder must provide documented reasons why return was impossible.
4. Did the merchant offer a resolution? Replacement, repair, refund, store credit?
5. Was the merchant responsive to complaints? Unresponsive merchants lose by default.
6. Deadline: The customer had 120 calendar days from the transaction date to open this dispute. You have 30 days to respond.
7. For subjective claims: The bank may require a neutral third-party opinion to corroborate the cardholder's claim.

The customer's bank leans toward the cardholder on quality disputes unless the merchant has firm evidence that the product matched its description. Your product listing and pre-shipment documentation are your primary defense.

The precise target for your dispute response: The bank is checking whether the cardholder can prove you refused to remedy their complaint. If the cardholder has documentation showing they contacted you and you didn't resolve it, that satisfies the dispute condition in their favor. Your job is not just to show you delivered the right product -- it's to directly refute their claim of unresolved contact, or prove they never contacted you at all. If they went straight to the bank without contacting you first, call it out explicitly. That undermines their entire filing.`,

  acquirer_prereview: `Before your evidence reaches the customer's bank, it passes through your payment processor first. Your processor reviews the package for completeness and formatting compliance with network rules. If your submission is incomplete or doesn't address the assigned reason code, it gets bounced before the bank ever sees it. Merchants are rarely notified clearly when this happens -- the submission just fails.

This means:
- Your package must directly address reason code 13.3 (Not as Described / Defective) -- generic evidence won't clear pre-review.
- All required documents (see checklist below) must be present.
- Your processor may impose an internal deadline shorter than Visa's 30-day window.

Getting bounced at the processor stage is an automatic loss with no second chance. The checklist below tells you exactly what both your processor and the customer's bank need to see.`,

  evidence_checklist: [
    {
      key: "product_description_at_purchase",
      item: "Product description as shown at time of purchase (screenshot, listing page)",
      category: "mandatory",
      context: "all",
      required: true,
      why_matters:
        "This is what the customer's bank compares against the cardholder's claim. If the description matches what was sent, you win. Without this, you have no baseline to defend against 'not as described.'",
      where_to_find:
        "Screenshot your product page on your website or e-commerce platform (Shopify, WooCommerce, Etsy, Amazon). If the listing has changed since the purchase, try the Wayback Machine (web.archive.org) to find the version from the order date. Include the full description, specs, photos, and any disclaimers.",
      stripe_evidence_field: "uncategorized_file",
      urgency_essential: true,
      urgency_order: 1,
    },
    {
      key: "delivery_proof",
      item: "Proof of delivery (tracking number with delivery confirmation)",
      category: "mandatory",
      context: "physical_goods",
      required: true,
      why_matters:
        "Must first prove the item was delivered before you can argue it matched the description. No delivery proof means the dispute may shift to a 13.1 (not received) loss instead.",
      where_to_find:
        "Go to your shipping provider's tracking page (UPS, FedEx, USPS, DHL) and screenshot the delivery confirmation. Also check your e-commerce platform's order page for the tracking number. You need the final delivery scan, not just 'in transit.'",
      stripe_evidence_field: "shipping_documentation",
      urgency_essential: true,
      urgency_order: 2,
    },
    {
      key: "pre_shipment_photos",
      item: "Pre-shipment photos of the actual item",
      category: "recommended",
      context: "physical_goods",
      required: false,
      why_matters:
        "Proves the item was in good condition when shipped. Critical for 'arrived damaged' claims. Without photos, you can't rebut a claim that the item was defective from the start.",
      where_to_find:
        "Check your phone's camera roll around the date you shipped this order. If your warehouse team photographs items before packing, pull from your warehouse management system or shared photo folder. For handmade or custom items, check your production documentation.",
      stripe_evidence_field: "uncategorized_file",
      urgency_essential: true,
      urgency_order: 4,
    },
    {
      key: "product_specifications",
      item: "Product specifications or detailed listing",
      category: "recommended",
      context: "physical_goods",
      required: false,
      why_matters:
        "The more specific your listing, the harder it is for the cardholder to claim 'not as described.' Vague marketing language is easy to dispute; specific dimensions, materials, and features are not.",
      where_to_find:
        "Pull the spec sheet or detailed product page from your website or supplier. If you sell on a marketplace (Amazon, Etsy), screenshot the listing's specifications tab. For products with manufacturer specs, grab those from the manufacturer's site or your purchasing records.",
      stripe_evidence_field: "uncategorized_file",
      urgency_essential: false,
      urgency_order: null,
    },
    {
      key: "customer_product_communications",
      item: "Customer communications about the product (emails, chat logs)",
      category: "recommended",
      context: "all",
      required: false,
      why_matters:
        "Shows any discussions about the product, complaints, or resolution attempts. If the cardholder never contacted you before filing, document that absence. If they did contact you, show your responsive handling.",
      where_to_find:
        "Search your helpdesk (Zendesk, Intercom, Freshdesk) or email (Gmail > search by customer name or email) for any conversations about this order. If there are zero results, that's actually useful -- it means the customer went straight to their bank without contacting you first.",
      stripe_evidence_field: "customer_communication",
      urgency_essential: true,
      urgency_order: 3,
    },
    {
      key: "no_return_attempt",
      item: "Proof cardholder did NOT attempt to return the merchandise",
      category: "recommended",
      context: "physical_goods",
      required: false,
      why_matters:
        "As of October 2024, the cardholder must attempt a return before filing. If they didn't, this is a strong procedural defense. No return request in your records is evidence worth highlighting.",
      where_to_find:
        "Search your helpdesk, email, and returns management system (Returnly, Loop Returns, or your platform's built-in returns) for any return requests from this customer. If you find nothing, document that search -- the absence of a return request is your evidence here.",
      narrative_only: true,
      narrative_fallback:
        "The merchant has no record in its helpdesk, returns system, or shipping logs of the cardholder attempting to return the merchandise prior to filing this dispute, which is required under Visa's October 2024 chargeback rules.",
      urgency_essential: false,
      urgency_order: null,
    },
    {
      key: "refund_refusal_explanation",
      item: "Refund refusal explanation (if you denied a return or refund request)",
      category: "recommended",
      context: "all",
      required: false,
      why_matters:
        "If the customer tried to return the item and you denied it, Stripe's API requires a specific text explanation of why. Without this, the bank only has the cardholder's side of the story. Be specific: 'outside the 30-day return window', 'item showed signs of use', 'missing original packaging.'",
      where_to_find:
        "Check your helpdesk or email for the message where you told the customer why their return or refund was denied. Pull the exact reason from that conversation. If you have a returns management system (Returnly, Loop), check the denial record there.",
      narrative_only: true,
      narrative_fallback:
        "The merchant's published return policy, accepted by the cardholder at checkout, did not cover the conditions of this return request, and the denial was communicated to the cardholder through the merchant's standard support channels.",
      urgency_essential: false,
      urgency_order: null,
    },
    {
      key: "return_policy_at_checkout",
      item: "Return policy clearly stated at checkout (screenshot or policy page)",
      category: "recommended",
      context: "physical_goods",
      required: false,
      why_matters:
        "Proves the cardholder knew how to return the item. If your policy was visible at checkout and they bypassed it to file a dispute, that weakens their case.",
      where_to_find:
        "Screenshot your checkout page showing where the return policy is displayed (footer link, checkbox, or sidebar). Also screenshot the return policy page itself. If you include return instructions in order confirmation emails, grab one of those too.",
      stripe_evidence_field: "refund_policy",
      urgency_essential: false,
      urgency_order: null,
    },
    {
      key: "refund_or_replacement_confirmation",
      item: "Refund or replacement confirmation (if already issued)",
      category: "recommended",
      context: "all",
      required: false,
      why_matters:
        "Ends the dispute immediately if you already resolved it. A dispute filed after a resolution was issued is a duplicate recovery attempt, which the bank takes seriously.",
      where_to_find:
        "Stripe Dashboard > Payments > click the original payment > check for a Refund entry. If you sent a replacement, pull the new tracking number from your shipping provider. Also check your helpdesk for the resolution ticket where you confirmed the refund or replacement to the customer.",
      stripe_field: "refund_data",
      urgency_essential: false,
      urgency_order: null,
    },
    {
      key: "service_agreement",
      item: "Service agreement or scope of work document",
      category: "mandatory",
      context: "services",
      required: true,
      why_matters:
        "Defines exactly what was promised. Without a written agreement, the cardholder can claim almost anything wasn't delivered. This document is the foundation of your services defense.",
      where_to_find:
        "Pull the signed contract, scope of work, or service agreement from your project management tool, CRM, or email. If you used a proposal tool (HoneyBook, Dubsado, PandaDoc), export the signed version. The document with the customer's signature or acceptance is what you need.",
      stripe_evidence_field: "customer_signature",
      urgency_essential: true,
      urgency_order: 1,
    },
    {
      key: "service_delivery_proof",
      item: "Proof of service delivery (reports, access logs, deliverables, work product)",
      category: "mandatory",
      context: "services",
      required: true,
      why_matters:
        "Shows the service was performed as agreed. The bank needs to see what was actually delivered, not just what was promised.",
      where_to_find:
        "Gather the deliverables you sent to the client -- reports, files, designs, completed work. Check your project management tool (Asana, Trello, Notion, Monday) for completed tasks and milestones. For digital services, pull access logs or usage records from your app's admin panel.",
      stripe_evidence_field: "service_documentation",
      urgency_essential: true,
      urgency_order: 2,
    },
    {
      key: "client_signoff",
      item: "Client sign-off or acceptance documentation",
      category: "recommended",
      context: "services",
      required: false,
      why_matters:
        "If the client approved the work, they can't credibly claim it wasn't as described. Signed acceptance or approval emails are some of the strongest evidence in services disputes.",
      where_to_find:
        "Search your email for approval messages from the client ('looks good', 'approved', 'go ahead'). Check your project management tool for completed/approved milestones. If you use a formal sign-off process (PandaDoc, DocuSign), pull the signed acceptance document.",
      stripe_evidence_field: "customer_communication",
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
      tip: "Respond to every complaint within 24 hours. Even if you can't resolve it immediately, acknowledge the issue. 'We're looking into this' documented in email is evidence of responsiveness that goes directly to the bank's evaluation criteria.",
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

  narrative_template: `**Product Description Accuracy**
[The bank checks: did the product match what was advertised at the time of purchase?]
Product listed as: [exact description from your product page or listing]
What was delivered: [describe what the customer actually received]
[If they match: "The product delivered matches the description provided at the time of purchase."]

**Customer Communication**
[The bank checks whether you tried to resolve the issue. Visa requires the cardholder to attempt merchant resolution before filing.]
Customer contacted us: [Yes on [date] / No -- no pre-dispute contact received]
Issue raised: [what the customer complained about]
Resolution offered: [what you offered -- replacement, return, partial refund, etc.]
Outcome: [what happened -- customer accepted/declined/did not respond]
[If no contact: "The cardholder did not contact us before filing this dispute. Visa requires the cardholder to attempt resolution with the merchant first."]

**Refund/Return Policy**
[The bank checks whether the customer had a path to resolve this without a dispute.]
Return policy: [your policy -- e.g., "30-day returns for any reason"]
How displayed: [e.g., "Shown at checkout and included in order confirmation email"]
Return attempted: [Yes/No]
[If refund denied: explain why -- e.g., "Return window expired" or "Item returned in used condition"]

**Shipping/Delivery Condition**
[For physical goods: delivery confirmation and condition at time of shipment.]
Tracking number: [from your carrier]
Delivery confirmed: [date]
Pre-shipment condition: [describe, reference photos if uploaded]

**Refund Denial Justification**
[If you denied a refund, explain the specific reason here.]
Reason: [e.g., "Return window expired", "Item not returned", "Item returned in unacceptable condition"]
Policy reference: [which policy term applies]

Based on the evidence above, the product/service matched its description. We respectfully request this dispute be resolved in our favor.`,

  response_deadline_days: 30,
  filing_window_days: 120,
  key_differences:
    "Visa 13.3 is a dedicated reason code covering only 'Not as Described / Defective' disputes, while Mastercard 4853 is a broad umbrella code that spans 7 or more dispute sub-types including not received, recurring cancellations, no-shows, and counterfeit goods. The dispute response deadline differs: merchants have 30 days to respond to a Visa 13.3, versus 45 days for a Mastercard 4853. Both networks give the customer a 120-day window to open a dispute (max 540 days). On return requirements, Visa 13.3 does not specify a waiting period after a return, but Mastercard 4853 requires the customer's bank to wait 15 days after the item was returned before the dispute can proceed. On the customer contact requirement, Visa recommends that cardholders attempt merchant resolution first, while Mastercard requires it -- giving merchants slightly more procedural leverage on 4853 disputes. Both networks handle subjective quality claims similarly, though the Mastercard 'attempted resolution' requirement gives merchants a marginally stronger procedural defense.",
};
