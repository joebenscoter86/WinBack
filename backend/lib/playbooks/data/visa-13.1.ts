import type { PlaybookData } from "../types";

export const visa131: PlaybookData = {
  network: "visa",
  reason_code: "13.1",
  display_name: "Merchandise / Services Not Received",
  category: "consumer",
  legacy_code: "30",
  description:
    "The cardholder claims they paid for goods or services but never received them. This could mean a physical package never arrived, a digital product was never accessible, or a service was never performed. This is one of the most common dispute types and often one of the easiest to win -- if you have delivery proof.",

  coach_headline: "The cardholder says they never received what they paid for.",
  coach_summary:
    "This is one of the most winnable dispute types. If you can prove delivery, you're in a strong position. The bank's main question: was the item actually delivered to the right address? Tracking numbers and delivery confirmation are your best friends here.",
  coach_issuer_summary:
    "The bank checks: Was there a confirmed delivery date? Does tracking show it was delivered? Was it delivered to the correct address (the one on the order, not a random location)? For digital products, can you prove the customer accessed or downloaded it?",
  coach_acquirer_summary:
    "Your dispute response goes through a compliance check at your payment processor before the bank sees it. For this dispute type, delivery proof is non-negotiable. Without a tracking number or access log, your response will likely be rejected before the bank even reviews it.",

  issuer_evaluation: `The customer's bank evaluates Visa 13.1 disputes using the following criteria:

1. Was there an agreed delivery date? If yes, did the merchant meet it?
2. Is there carrier confirmation of delivery? Tracking number, delivery scan, signature.
3. Did the cardholder attempt to resolve with the merchant first? (Required before filing.)
4. Deadline compliance: The customer had 120 calendar days from the transaction date or expected delivery date to open this dispute (max 540 days from transaction).
5. For late delivery: Did the cardholder wait at least 10 days after expected delivery before filing?
6. If no delivery date specified: At least 15 calendar days must pass before the cardholder can file.

The bank is primarily looking for proof of delivery to the correct address. If you have it, you win. If you don't, the evidence burden shifts heavily in the cardholder's favor.`,

  acquirer_prereview: `Before your evidence reaches the customer's bank, it passes through your payment processor first. Your processor reviews the package for completeness and formatting compliance with network rules. If your submission is incomplete or doesn't address the assigned reason code, it gets bounced before the bank ever sees it. Merchants are rarely notified clearly when this happens -- the submission just fails.

This means:
- Your package must directly address reason code 13.1 (Merchandise/Services Not Received) -- generic transaction records won't clear pre-review.
- All required documents (see checklist below) must be present.
- Your processor may impose an internal deadline shorter than Visa's 30-day window.

Getting bounced at the processor stage is an automatic loss with no second chance. The checklist below tells you exactly what both your processor and the customer's bank need to see.`,

  evidence_checklist: [
    {
      item: "Carrier tracking confirmation with delivery scan",
      category: "mandatory",
      context: "physical_goods",
      required: true,
      why_matters:
        "This is the single most important piece of evidence. A tracking number showing 'delivered' to the correct address wins most cases.",
      where_to_find:
        "Go to your shipping provider's tracking page (UPS, FedEx, USPS, DHL) and pull up the tracking number from this order. Screenshot the page showing the delivery status, delivery date, and destination address or zip code. If you use a fulfillment service like ShipBob or ShipStation, the tracking info is in your fulfillment dashboard too.",
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
      where_to_find:
        "Compare the shipping address on the order (Shopify Admin > Orders > click the order, or WooCommerce > Orders) against the delivery address on the carrier tracking page. Screenshot both side by side.",
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
      where_to_find:
        "Request a proof of delivery (POD) from your carrier. UPS: ups.com > Tracking > click 'View Proof of Delivery'. FedEx: fedex.com > Tracking > 'Obtain Proof of Delivery'. USPS: go to usps.com and request a signature confirmation receipt. You may need to call the carrier if the POD isn't available online.",
      urgency_essential: false,
      urgency_order: null,
    },
    {
      item: "Order confirmation showing agreed delivery date",
      category: "recommended",
      context: "physical_goods",
      required: false,
      why_matters:
        "Establishes the timeline the bank will evaluate against. Without this, the bank has no reference for whether delivery was timely.",
      where_to_find:
        "Check your order confirmation email (search your sent folder for the order number) or your e-commerce platform's order details page. Shopify: Orders > click order > look for 'Estimated delivery'. If you quoted a delivery window on your product page or at checkout, screenshot that too.",
      urgency_essential: true,
      urgency_order: 3,
    },
    {
      item: "Screenshot of order details (items, quantities, shipping method)",
      category: "recommended",
      context: "physical_goods",
      required: false,
      why_matters:
        "Shows exactly what was ordered and how it was shipped. Gives the bank a complete picture of the transaction.",
      where_to_find:
        "Your e-commerce platform's order page. Shopify: Admin > Orders > click the order. WooCommerce: Orders > click the order. Screenshot the section showing line items, quantities, and shipping method selected.",
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
      where_to_find:
        "Search your helpdesk (Zendesk, Intercom, Freshdesk) or email (Gmail > search by customer name or email) for any conversations about this order. Look for shipping updates you sent, delivery inquiries from the customer, or any message where they acknowledged receiving the package.",
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
      where_to_find:
        "Check your app's admin panel or database for login records tied to this customer's account. Look for timestamps, IP addresses, and what they accessed. If you use analytics (Mixpanel, Amplitude, Google Analytics), search by user ID or email. For downloadable products, check your download logs or CDN access logs.",
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
      where_to_find:
        "Check your email service provider (SendGrid, Postmark, Mailchimp, or your transactional email tool) for the delivery confirmation sent to this customer. Look for the email containing the license key or download link, and pull the send timestamp and delivery status. If you use Shopify Digital Downloads or a similar plugin, check its delivery log.",
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
      where_to_find:
        "Screenshot your checkout page showing the terms of service checkbox or link. If you log when customers accept terms (a clickwrap log), pull the acceptance timestamp for this customer. Check your website's Terms of Service page for the section defining how digital goods are delivered.",
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
      where_to_find:
        "Pull the signed work order, completion report, or service receipt from your project management tool or CRM. If you use a scheduling tool (Calendly, Acuity, Square Appointments), export the appointment record showing the service date and status. For consulting or freelance work, grab the deliverable handoff email or signed statement of work.",
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
      where_to_find:
        "Check your scheduling tool (Calendly, Acuity, Square Appointments, Google Calendar) for the booking confirmation. Screenshot the appointment details showing the customer name, date, time, and service type. If the customer confirmed or checked in, include that record too.",
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

  narrative_template: `**Delivery Confirmation**
[The bank needs carrier proof that the order was delivered. This is the single most important piece of evidence for this dispute type.]
Tracking number: [from your carrier -- e.g., 1Z999AA10123456784]
Carrier: [e.g., UPS, FedEx, USPS]
Delivery date: [the date carrier shows "delivered"]
Delivery status: [e.g., "Delivered, left at front door"]
[For orders over $100: Signed by: [name from signature confirmation]]

**Address Verification**
[The bank checks that you shipped to the address the customer gave you.]
Shipping address on order: [from your order details page]
Delivery address confirmed by carrier: [from tracking page]
AVS result: {{avs_address_check}} (auto-filled from Stripe)
ZIP match: {{avs_zip_check}} (auto-filled from Stripe)

**Digital Access Proof**
[For digital goods only -- skip this section for physical goods.]
[The bank needs proof the customer accessed or downloaded the product.]
Access log timestamps: [dates and times the customer logged in or downloaded]
IP address: [the IP address used to access the product]
What was accessed: [describe what the customer did -- downloaded files, used features, etc.]
Email delivery confirmation: [date the license key or download link was sent]

**Service Completion**
[For services only -- skip this section for physical goods.]
Service performed on: [date]
Service documentation: [describe what was delivered -- reports, work product, etc.]

**Customer Communication**
[Any communication where the customer acknowledged receiving the item is especially valuable.]
[Describe: delivery notification emails sent, tracking shared, customer responses, etc.]

Based on the delivery confirmation and evidence above, the merchandise/service was delivered as ordered. We respectfully request this dispute be resolved in our favor.`,

  response_deadline_days: 30,
  filing_window_days: 120,
  key_differences: null,
};
