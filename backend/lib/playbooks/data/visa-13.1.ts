import type { PlaybookData } from "../types";

export const visa131: PlaybookData = {
  network: "visa",
  reason_code: "13.1",
  display_name: "Merchandise / Services Not Received",
  category: "consumer",
  legacy_code: "30",
  description:
    "The cardholder claims they paid for goods or services but never received them. This could mean a physical package never arrived, a digital product was never accessible, or a service was never performed. This is one of the most common dispute types and often one of the easiest to win -- if you have delivery proof.",

  issuer_evaluation: `The issuer evaluates Visa 13.1 disputes using the following criteria:

1. Was there an agreed delivery date? If yes, did the merchant meet it?
2. Is there carrier confirmation of delivery? Tracking number, delivery scan, signature.
3. Did the cardholder attempt to resolve with the merchant first? (Required before filing.)
4. Filing window compliance: 120 calendar days from transaction date or expected delivery date (max 540 days from transaction).
5. For late delivery: Did the cardholder wait at least 10 days after expected delivery before filing?
6. If no delivery date specified: At least 15 calendar days must pass before the cardholder can file.

The issuer is primarily looking for proof of delivery to the correct address. If you have it, you win. If you don't, the evidence burden shifts heavily in the cardholder's favor.`,

  acquirer_prereview: `Before your evidence reaches the issuing bank, it passes through your acquirer first. The acquirer reviews the package for completeness and formatting compliance with network rules. If your submission is incomplete or doesn't address the assigned reason code, it gets bounced before the issuer ever sees it. Merchants are rarely notified clearly when this happens -- the submission just fails.

This means:
- Your package must directly address reason code 13.1 (Merchandise/Services Not Received) -- generic transaction records won't clear pre-review.
- All required documents (see checklist below) must be present.
- Your acquirer may impose an internal deadline shorter than Visa's 30-day window.

Getting bounced at the acquirer stage is an automatic loss with no second chance. The checklist below tells you exactly what both the acquirer and issuer need to see.`,

  evidence_checklist: [
    {
      item: "Carrier tracking confirmation with delivery scan",
      category: "mandatory",
      context: "physical_goods",
      required: true,
      why_matters:
        "This is the single most important piece of evidence. A tracking number showing 'delivered' to the correct address wins most cases.",
      urgency_essential: true,
      urgency_order: 1,
    },
    {
      item: "Delivery address verification (matches billing or shipping address on order)",
      category: "mandatory",
      context: "physical_goods",
      required: true,
      why_matters:
        "Proves you shipped to the address the customer provided. If the addresses don't match, you lose regardless of delivery confirmation.",
      urgency_essential: true,
      urgency_order: 2,
    },
    {
      item: "Signed delivery confirmation (for orders over $100)",
      category: "recommended",
      context: "physical_goods",
      required: false,
      why_matters:
        "Signature proof eliminates 'package stolen' claims. Visa gives extra weight to signed delivery. Without a signature on high-value orders, the cardholder can claim the package was stolen after delivery.",
      urgency_essential: false,
      urgency_order: null,
    },
    {
      item: "Order confirmation showing agreed delivery date",
      category: "recommended",
      context: "physical_goods",
      required: false,
      why_matters:
        "Establishes the timeline the bank will evaluate against. Without this, the issuer has no reference for whether delivery was timely.",
      urgency_essential: true,
      urgency_order: 3,
    },
    {
      item: "Screenshot of order details (items, quantities, shipping method)",
      category: "recommended",
      context: "physical_goods",
      required: false,
      why_matters:
        "Shows exactly what was ordered and how it was shipped. Gives the issuer a complete picture of the transaction.",
      urgency_essential: false,
      urgency_order: null,
    },
    {
      item: "Communication with customer about delivery (emails, chat logs)",
      category: "recommended",
      context: "physical_goods",
      required: false,
      why_matters:
        "Shows you were responsive and proactive. Any customer acknowledgment of receipt is especially valuable.",
      urgency_essential: true,
      urgency_order: 4,
    },
    {
      item: "Access logs showing customer used the product/service (IP address, login timestamps, download confirmation)",
      category: "mandatory",
      context: "digital_goods",
      required: true,
      why_matters:
        "This IS your delivery proof for digital goods. Access logs showing the customer logged in, downloaded, or used the product demonstrate delivery as conclusively as a carrier scan.",
      urgency_essential: true,
      urgency_order: 1,
    },
    {
      item: "Email delivery confirmation (license key, download link sent to customer's email)",
      category: "mandatory",
      context: "digital_goods",
      required: true,
      why_matters:
        "Proves the digital good was delivered to the customer's email address on file. Without this, there is no paper trail that delivery was even attempted.",
      urgency_essential: true,
      urgency_order: 2,
    },
    {
      item: "Terms of service / delivery terms accepted at checkout",
      category: "recommended",
      context: "digital_goods",
      required: false,
      why_matters:
        "Establishes what 'delivery' means for your product and that the customer agreed to those terms. Useful when the customer claims they didn't receive something that your ToS defines as delivered.",
      urgency_essential: false,
      urgency_order: null,
    },
    {
      item: "Service completion documentation or proof of performance",
      category: "mandatory",
      context: "services",
      required: true,
      why_matters:
        "For services, you must demonstrate the service was actually performed. This could be a completion report, signed work order, appointment records, or any documentation showing the service took place.",
      urgency_essential: true,
      urgency_order: 1,
    },
    {
      item: "Appointment or scheduling records confirming service date",
      category: "recommended",
      context: "services",
      required: false,
      why_matters:
        "Shows the customer was scheduled and (if you have attendance records) appeared for the service. Especially useful for in-person services.",
      urgency_essential: false,
      urgency_order: null,
    },
  ],

  common_mistakes: [
    {
      mistake: "Processing payment before shipping",
      explanation:
        "If you charge before the item ships, you have no delivery proof for the period between charge and shipment. The cardholder can file immediately. Best practice is to charge at the time of shipment, not at the time of order.",
    },
    {
      mistake: "No tracking on low-value orders",
      explanation:
        "Merchants skip tracking to save $1-2 on shipping, then lose $50-200 disputes. Always use tracked shipping. The cost of one lost dispute pays for hundreds of tracking numbers.",
    },
    {
      mistake: "Shipping to an address different from what the customer provided",
      explanation:
        "If the customer gave Address A and you shipped to Address B (even if B is 'correct'), you lose. Ship to the address on file. If the customer wants a different address, get written confirmation and update the order before shipping.",
    },
    {
      mistake: "Assuming 'shipped' equals 'delivered'",
      explanation:
        "A tracking number showing 'in transit' or 'out for delivery' is NOT proof of delivery. You need the final delivery scan showing the package was delivered. Screenshot carrier tracking pages immediately after delivery.",
    },
    {
      mistake: "Missing the 30-day response window",
      explanation:
        "You have 30 days to respond. Many merchants miss this deadline entirely. Set calendar reminders the moment a dispute is filed. An unanswered dispute is an automatic loss.",
    },
    {
      mistake: "Not requiring signature on high-value orders",
      explanation:
        "For orders over $100, delivery confirmation without a signature is weak. The cardholder can claim the package was stolen after delivery. The extra $2-3 cost for signature confirmation is insurance against a $100+ chargeback.",
    },
  ],

  pro_tips: [
    {
      tip: "Always use tracked shipping with delivery confirmation. This single practice wins most 13.1 disputes. Untracked shipping is essentially a donation to dispute filers.",
    },
    {
      tip: "For orders over $100, require signature confirmation. The extra $2-3 cost is insurance against a $100+ chargeback.",
    },
    {
      tip: "Save screenshots of carrier tracking pages -- carriers sometimes purge tracking data after 90-120 days, but the dispute window extends to 120+ days. Screenshot and store tracking confirmations as soon as delivery is confirmed.",
    },
    {
      tip: "For digital goods, log IP address and timestamps of first access. This is your equivalent of a delivery signature. Without access logs, a digital delivery claim is nearly impossible to prove.",
    },
    {
      tip: "If the customer contacts you about non-delivery, respond immediately and offer to reship or refund. A resolved complaint never becomes a chargeback. The fastest path to winning is preventing the dispute from being filed.",
    },
    {
      tip: "Pre-shipment: Send a shipping confirmation email with the tracking number. This proves the customer was informed of shipment and gives them a reference to track -- reducing 'where is my order' disputes.",
    },
  ],

  urgency_essentials: {
    summary:
      "Focus on delivery proof above all else. These items in order are your best chance of winning when you have less than 5 days to respond.",
    ordered_items: [
      "Carrier tracking confirmation showing delivery",
      "Delivery address matches order address",
      "Order confirmation with item details",
      "Any customer communication acknowledging receipt",
    ],
  },

  narrative_template: `The cardholder claims merchandise/services were not received. However, our records confirm delivery was completed as follows:

**Order Details:**
- Order placed: [date]
- Items ordered: [description]
- Shipping address: [address]
- Shipping method: [carrier + service level]

**Delivery Confirmation:**
- Tracking number: [number]
- Carrier: [carrier name]
- Delivery date: [date]
- Delivery status: [status from carrier]
[If signed: Signed by: [name]]

**Additional Context:**
[Any relevant customer communications, access logs for digital goods, or other supporting evidence]

Based on the carrier confirmation, the merchandise was delivered to the address provided by the cardholder on [date]. We respectfully request this dispute be resolved in our favor.`,

  response_deadline_days: 30,
  filing_window_days: 120,
  key_differences: null,
};
