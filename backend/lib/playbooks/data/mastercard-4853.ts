import type { PlaybookData } from "../types";

export const mastercard4853: PlaybookData = {
  network: "mastercard",
  reason_code: "4853",
  display_name: "Cardholder Dispute -- Not as Described / Defective",
  category: "consumer",
  legacy_code: null,
  description:
    "The cardholder claims the merchandise or service they received differs significantly from what was described at the time of purchase. This could mean the item arrived damaged, was defective, was the wrong product entirely, or the service quality didn't match what was promised. This is one of the most subjective dispute types -- 'not as described' is inherently a judgment call -- which makes it both harder to win and a magnet for friendly fraud.\n\nUnlike Visa 13.3 (which covers similar ground), Mastercard 4853 is a catch-all code that spans many dispute scenarios. The 'Not as Described / Defective' sub-type is the one most relevant to product-selling merchants.",

  coach_headline: "The cardholder says what they received didn't match what was promised.",
  coach_summary:
    "Similar to a Visa 'not as described' dispute. The bank will look at whether your product matched its listing and whether the customer tried to resolve it with you first. Clear product descriptions and customer communication records are your best defense.",
  coach_issuer_summary:
    "The customer's bank checks: Does the product match the description provided at the time of purchase? Did the cardholder attempt to return the merchandise or resolve the issue with the merchant? Was the merchandise or service received at all?",
  coach_acquirer_summary:
    "Your response goes through a compliance check by your payment processor before the customer's bank sees it. You need the original product description, proof of delivery, and evidence of any customer interaction. If the customer never contacted you before filing the dispute, that works in your favor.",

  issuer_evaluation: `The customer's bank evaluates Mastercard 4853 disputes using the following criteria:

1. Does the cardholder's description of what they received differ materially from the merchant's product listing? The bank compares the cardholder's claim against available product descriptions, images, and terms.
2. Did the cardholder attempt to return the merchandise? Mastercard expects the cardholder to attempt resolution with the merchant before filing. If the merchant has a return policy and the cardholder didn't follow it, this weakens the claim.
3. Was the item returned? If not, the bank weighs whether the merchant offered a return path. If merchandise was returned, the bank must wait at least 15 calendar days before filing the dispute.
4. Is there documented communication between cardholder and merchant? Evidence of the cardholder raising the issue and the merchant's response (or lack thereof) is heavily weighted.
5. Deadline compliance: The customer had 120 calendar days from the transaction processing date, delivery date, or service end date to open this dispute (maximum 540 days from original transaction).
6. Is the claim subjective or objective? "Wrong item shipped" is objective and easy to evaluate. "Quality wasn't what I expected" is subjective and harder -- the bank leans toward the cardholder in subjective cases unless the merchant provides strong documentary evidence.

The customer's bank is primarily looking for whether the merchant's description was accurate and whether the merchant attempted to resolve the issue. Unlike "not received" disputes where delivery proof is binary, "not as described" disputes are inherently more judgment-based.

The precise target for your dispute response: The customer's bank is checking whether the cardholder can prove you refused to remedy their complaint. Under Mastercard rules, the cardholder must attempt to resolve the issue with the merchant before filing -- if they have documentation showing they contacted you and you didn't resolve it, that satisfies the dispute condition. Your job is to directly refute their claimed contact (show they never reached out, or show you did resolve it), not just to prove your product was good. If they never contacted you before filing, say so explicitly and prominently -- Mastercard requires merchant contact first, and skipping that step is a filing defect that works in your favor.`,

  acquirer_prereview: `Before your evidence reaches the customer's bank, it passes through your payment processor first. Your processor (sometimes called an acquirer) reviews the package for completeness and formatting compliance with network rules. If your submission is incomplete or doesn't address the assigned reason code, it gets bounced before the bank ever sees it. Merchants are rarely notified clearly when this happens -- the submission just fails.

This means:
- Your package must directly address reason code 4853 (Cardholder Dispute -- Not as Described / Defective) -- generic evidence won't clear pre-review.
- All required documents (see checklist below) must be present.
- Your processor may impose an internal deadline shorter than Mastercard's 45-day window.

Getting bounced at the processor stage is an automatic loss with no second chance. The checklist below tells you exactly what both your processor and the customer's bank need to see.`,

  evidence_checklist: [
    {
      item: "Original product/service description (website listing, catalog page, or order confirmation)",
      category: "mandatory",
      context: "all",
      required: true,
      why_matters:
        "This is your baseline. The customer's bank compares what you described against what the cardholder claims they received. Screenshot the listing -- don't just describe it.",
      where_to_find:
        "Screenshot your product page on your website or platform (Shopify, WooCommerce, Etsy, Amazon). If the listing changed since the purchase date, try the Wayback Machine (web.archive.org) for the original version. Include the full description, photos, specs, and any disclaimers.",
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
      where_to_find:
        "For physical goods: check your phone's camera roll or warehouse system for pre-shipment photos. For services: pull deliverables, reports, or completed work product from your project management tool. Quality control records, batch inspection reports, or QC checklists from your production process also work.",
      urgency_essential: false,
      urgency_order: null,
    },
    {
      item: "Customer communication logs (emails, chat transcripts, support tickets)",
      category: "mandatory",
      context: "all",
      required: true,
      why_matters:
        "Shows you were responsive and attempted resolution. If the cardholder never contacted you before filing, this is powerful evidence of friendly fraud -- Mastercard requires the customer to contact you first.",
      where_to_find:
        "Search your helpdesk (Zendesk, Intercom, Freshdesk) by customer name or email. Check Gmail sent/received for any conversations about this order. If you find zero contact from the customer, that's actually your strongest evidence -- Mastercard requires them to contact you first, and skipping that step weakens their case.",
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
      where_to_find:
        "Screenshot your checkout page showing the return policy link or text. Shopify: Settings > Policies > Refund policy. Also screenshot the full return policy page. If the customer had a clear return path and didn't use it, that's your argument.",
      urgency_essential: true,
      urgency_order: 5,
    },
    {
      item: "Refund refusal explanation (if you denied a return or refund request)",
      category: "recommended",
      context: "all",
      required: false,
      why_matters:
        "If the customer attempted a return and you denied it, Stripe's API requires a specific text explanation of why you refused. The customer's bank needs to hear your side. Be concrete: 'returned after the 30-day window', 'item showed clear signs of use', 'missing components.'",
      where_to_find:
        "Check your helpdesk or email for the message where you told the customer why their return or refund was denied. Pull the exact reason. If you use a returns management system (Returnly, Loop), check the denial record with its timestamp and reason code.",
      urgency_essential: false,
      urgency_order: null,
    },
    {
      item: "Proof of delivery (tracking confirmation, signature)",
      category: "recommended",
      context: "all",
      required: false,
      why_matters:
        "Establishes the item was delivered. Doesn't prove it matched the description, but prevents the dispute from pivoting to 'not received.'",
      where_to_find:
        "Your shipping provider's tracking page (UPS, FedEx, USPS, DHL). Screenshot the delivery confirmation showing status, delivery date, and destination. For signed deliveries, request the proof of delivery document from the carrier.",
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
      where_to_find:
        "Stripe Dashboard > Customers > search by email or name > click the customer to see their full payment history. Also check your e-commerce platform's customer profile for order history. If they bought the same product before without complaint, screenshot that.",
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
      where_to_find:
        "Check your phone's camera roll around the ship date for this order. If your team photographs items during packing, check your warehouse system or shared photo folder. For handmade/custom items, check your production documentation. Timestamped photos are best.",
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
      where_to_find:
        "Pull from your production or inventory management system. If you do batch inspections, find the QC report covering this product's batch or lot number. Third-party testing certificates or compliance documents also work here.",
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
      where_to_find:
        "Screenshot your checkout page showing the Terms of Service checkbox or link. If you log when customers accept terms, pull the acceptance record with its timestamp for this customer. Also screenshot the relevant sections of your ToS page.",
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
      where_to_find:
        "Pull the signed contract or scope of work from your CRM, project management tool, or email. If you used a proposal tool (HoneyBook, Dubsado, PandaDoc, DocuSign), export the signed version with the customer's signature and date.",
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
      where_to_find:
        "Gather the deliverables you sent -- reports, files, designs, completed work. Check your project management tool (Asana, Trello, Notion) for completed milestones. For software/SaaS services, pull login and usage logs from your admin panel showing the customer accessed the service.",
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
      where_to_find:
        "Search your email for approval messages from the client at each project milestone ('looks good', 'approved', 'let's move forward'). Check your project management tool for tasks marked as approved or signed off. Formal sign-off documents from PandaDoc or DocuSign are ideal.",
      urgency_essential: false,
      urgency_order: null,
    },
  ],

  common_mistakes: [
    {
      mistake: "Relying on generic product descriptions",
      explanation:
        "'High quality item' means nothing in a dispute. Specific dimensions, materials, features, and limitations are what the customer's bank compares against. The more precise your listing, the easier it is to prove you delivered what you described.",
    },
    {
      mistake: "Not photographing items before shipment",
      explanation:
        "You can't prove the item was in good condition when it left your facility if you don't have photos. This is especially critical for fragile, handmade, or high-value items.",
    },
    {
      mistake: "Ignoring or delaying responses to customer complaints",
      explanation:
        "If the cardholder contacted you about the issue and you didn't respond (or took days to respond), the bank assumes you're unresponsive. Prompt, documented communication is your strongest defense.",
    },
    {
      mistake: "Telling the customer to contact the manufacturer",
      explanation:
        "Mastercard holds the merchant responsible, not the manufacturer. Referring the customer elsewhere doesn't satisfy your obligation and makes you look evasive to the bank.",
    },
    {
      mistake: "Accepting chargebacks for subjective 'not as described' claims",
      explanation:
        "'Not as described' disputes are disproportionately friendly fraud. A customer who says 'the color was slightly different' or 'it felt cheaper than expected' may be fishing. Challenge these with a strong dispute response backed by your product documentation.",
    },
    {
      mistake: "Not having a clear return policy",
      explanation:
        "If you don't offer returns, the bank sees a dead end for the cardholder. If you do offer returns but the cardholder didn't use them, that's evidence in your favor. Either way, a visible, accessible return policy helps you.",
    },
    {
      mistake: "Missing the 45-day response window",
      explanation:
        "Mastercard gives 45 calendar days from the dispute processing date. Miss it and you lose automatically, even with perfect evidence. Your payment processor may impose a shorter internal deadline.",
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
      "Customer communication logs (or evidence of no customer contact prior to the dispute)",
      "Proof of delivery confirming the item was received",
      "Photos of the item before shipment (if available)",
      "Return policy showing the cardholder had a resolution path",
    ],
  },

  narrative_template: `**Product/Service Description**
[The bank checks: did the merchandise match the description at time of purchase?]
Product listed as: [exact description from your product page, catalog, or order confirmation]
What was delivered: [describe what the customer actually received]
Supporting documentation: [reference product listing screenshots, photos of actual item, quality control records]

**Customer Communication**
[Mastercard requires the cardholder to attempt merchant resolution before filing. If they didn't, say so.]
Customer contacted us: [Yes on [date] / No -- no pre-dispute contact received]
[If yes: describe the issue raised, your response, and the outcome]
[If no: "The cardholder did not contact us before filing this dispute. Mastercard requires the cardholder to attempt resolution with the merchant first. This is a procedural defect in the filing."]

**Return/Refund Policy**
[The bank checks whether the customer had a path to resolve this.]
Return policy: [your policy]
How displayed: [e.g., "Shown at checkout, included in order confirmation, accepted in Terms of Service"]
Return attempted: [Yes/No]
[If refund denied: explain why]

**Delivery and Condition**
[Delivery confirmation and condition at time of shipment.]
Tracking number: [from your carrier]
Delivery confirmed: [date]
Pre-shipment photos: [describe if available -- timestamped packing photos, QC records]

**Dispute Rebuttal**
[Your specific response to the customer's claim.]
[Address the exact complaint and explain why the product/service matched its description]
[If the customer did not attempt a return, note this]

Based on the evidence above, the product/service matched its description. We respectfully request this dispute be resolved in our favor.`,

  response_deadline_days: 45,
  filing_window_days: 120,
  key_differences:
    "Mastercard 4853 vs. Visa 13.3 -- key differences for merchants:\n\nScope: Visa 13.3 is a dedicated code for 'Not as Described' disputes only. Mastercard 4853 is an umbrella code covering 7+ dispute sub-types; this playbook focuses on the Not as Described / Defective sub-type.\n\nResponse deadline: Visa 13.3 gives merchants 30 days to respond. Mastercard 4853 gives 45 days -- more time to build your case.\n\nDeadline to file: Both networks give the customer 120 days to open a dispute (maximum 540 days from original transaction).\n\nReturn waiting period: Visa 13.3 has no specified waiting period. Under Mastercard 4853, if the merchandise was returned, the customer's bank must wait at least 15 calendar days before filing the dispute.\n\nCustomer contact requirement: Visa 13.3 recommends the cardholder attempt merchant resolution. Mastercard 4853 requires it -- the cardholder must attempt to resolve with the merchant first. If they skipped this step and went straight to the bank, say so explicitly in your dispute response. This is a filing defect that works in your favor.\n\nSubjectivity handling: Both networks lean toward the cardholder in subjective cases. However, Mastercard's required merchant contact step gives merchants slightly more leverage -- if the cardholder can't document that they tried to resolve the issue with you, their filing is procedurally weaker.",
};
