import type { PlaybookData } from "../types";

export const visa104: PlaybookData = {
  network: "visa",
  reason_code: "10.4",
  display_name: "Fraud -- Card Not Present",
  category: "fraud",
  legacy_code: "83",
  description:
    "The cardholder claims they didn't authorize a card-not-present transaction (online, phone, or mail order). This is either true fraud (someone stole the card and used it) or friendly fraud (the cardholder made the purchase but claims they didn't). This is the hardest dispute type to win because the burden of proof is entirely on the merchant -- in a CNP environment, you can't prove the cardholder was physically present. The good news: Visa Compelling Evidence 3.0 (CE3.0) gives merchants a powerful new tool. If you can show the same cardholder made previous undisputed purchases from the same device/IP, Visa presumes the disputed transaction is also legitimate.",

  coach_headline: "The cardholder says they didn't authorize this purchase.",
  coach_summary:
    "This is the most common type of dispute. The key question the bank will ask: can you prove this customer actually made the purchase? If you used 3D Secure, you're in great shape. If not, we'll focus on gathering verification data and any proof the customer engaged with your store.",
  coach_issuer_summary:
    "The bank checks six things: Did you use 3D Secure? (If yes, you almost certainly win.) Did you verify the billing address? Did the customer enter the CVV code? Is your store name recognizable on their statement? Is there a history of legitimate purchases from this customer? And was the dispute filed within 120 days?",
  coach_acquirer_summary:
    "Your response goes through a compliance check before the bank sees it. If anything is missing or doesn't address this specific dispute type, it gets rejected automatically and you don't get another chance. That's why we walk you through exactly what to include.",

  issuer_evaluation: `The issuer evaluates Visa 10.4 disputes using the following criteria:

1. Was the transaction authenticated? 3D Secure / Visa Secure shifts liability to the issuer. If you used it, this dispute shouldn't exist.
2. Was AVS (Address Verification) used? Did the billing address match?
3. Was CVV2 verified? Proves the cardholder (or someone with the physical card) entered the security code.
4. Does the billing descriptor match? Can the cardholder recognize your business name on their statement?
5. Is there a pattern of legitimate purchases? CE3.0 lets you prove this.
6. Filing window: 120 calendar days from transaction processing date.

The issuer's default assumption is that the cardholder is telling the truth. Your job is to present enough evidence to shift that assumption. Authentication (3D Secure) is the strongest defense; CE3.0 is second.`,

  acquirer_prereview: `Before your evidence reaches the issuing bank, it passes through your acquirer first. The acquirer reviews the package for completeness and formatting compliance with network rules. If your submission is incomplete or doesn't address the assigned reason code, it gets bounced before the issuer ever sees it. Merchants are rarely notified clearly when this happens -- the submission just fails.

This means:
- Your package must directly address reason code 10.4 (Fraud -- Card Not Present) -- generic order records without AVS/CVV data won't clear pre-review.
- All required documents (see checklist below) must be present.
- Your acquirer may impose an internal deadline shorter than Visa's 30-day window.

Getting bounced at the acquirer stage is an automatic loss with no second chance. The checklist below tells you exactly what both the acquirer and issuer need to see.`,

  evidence_checklist: [
    {
      item: "Transaction authorization record",
      category: "mandatory",
      context: "all",
      required: true,
      why_matters:
        "Proves the transaction was properly authorized through the payment network. Without this, the acquirer will bounce your submission before the issuer ever sees it.",
      where_to_find:
        "Stripe Dashboard > Payments > click the payment > look for the authorization details section. You can also find this in the payment's API response under `charges.data[0].outcome`.",
      urgency_essential: true,
      urgency_order: 2,
    },
    {
      item: "AVS (Address Verification) result",
      category: "mandatory",
      context: "all",
      required: true,
      why_matters:
        "Shows you verified the billing address. A match strengthens your case significantly and demonstrates you took steps to verify the cardholder's identity.",
      where_to_find:
        "Stripe Dashboard > Payments > click the payment > scroll to Payment method details. The AVS check result appears as 'Address line1 check' and 'ZIP check'. Stripe automatically includes this when you submit evidence.",
      urgency_essential: true,
      urgency_order: 2,
    },
    {
      item: "CVV2 verification result",
      category: "mandatory",
      context: "all",
      required: true,
      why_matters:
        "Proves the person had the physical card (or its details). A CVV2 match is one of the clearest signals that the legitimate cardholder -- or someone with access to the card -- made the purchase.",
      where_to_find:
        "Stripe Dashboard > Payments > click the payment > Payment method details section. The CVC check result shows as 'CVC check: pass/fail'. Stripe automatically includes this when you submit evidence.",
      urgency_essential: true,
      urgency_order: 2,
    },
    {
      item: "Two prior undisputed transactions from the same cardholder (120-365 days before disputed transaction)",
      category: "mandatory",
      context: "ce3",
      required: true,
      why_matters:
        "The foundation of CE3.0. Must be 120-365 days older than the disputed transaction, undisputed, and not reported as fraud. When CE3.0 criteria are met, Visa treats this as a liability shift similar to 3D Secure -- extremely powerful.",
      where_to_find:
        "Search your Stripe Dashboard by the customer's email or name. Filter payments to the 120-365 day window before the disputed transaction. Look for successful payments with no disputes. You need at least two.",
      urgency_essential: true,
      urgency_order: 3,
    },
    {
      item: "IP address or device ID/fingerprint matching across all 3 transactions (disputed + 2 historical)",
      category: "mandatory",
      context: "ce3",
      required: true,
      why_matters:
        "One of these MUST match across all three transactions to qualify for CE3.0: IP address, device ID, or device fingerprint. This is the primary linking element that proves the same person made all three purchases.",
      where_to_find:
        "If you use Stripe Radar, device fingerprints are captured automatically -- check the payment's Radar insights. For IP addresses, check your server logs or analytics platform (Google Analytics, Mixpanel, etc.) for the session that created each order.",
      urgency_essential: true,
      urgency_order: 3,
    },
    {
      item: "Second matching data element across all 3 transactions (user account ID, shipping address, or device ID/fingerprint)",
      category: "mandatory",
      context: "ce3",
      required: true,
      why_matters:
        "CE3.0 requires two matching elements. In addition to IP/device, one more must match: user account ID, shipping address, or device ID/fingerprint. Two matching elements across three transactions is very hard to fake.",
      where_to_find:
        "Check your order management system or database for the customer's user account ID and shipping addresses across the three transactions. If they logged in with the same account or shipped to the same address, you have your second element.",
      urgency_essential: true,
      urgency_order: 3,
    },
    {
      item: "3D Secure / Visa Secure authentication proof",
      category: "mandatory",
      context: "all",
      required: false,
      why_matters:
        "If you used 3D Secure, liability shifts to the issuer and this dispute shouldn't have reached you. Authentication proof is the single strongest piece of evidence -- it effectively ends the dispute.",
      where_to_find:
        "Stripe Dashboard > Payments > click the payment > look for '3D Secure' in the payment details. If it says 'Authenticated' or shows a 3DS result, you have it. Stripe includes this automatically in dispute evidence submissions.",
      urgency_essential: true,
      urgency_order: 1,
    },
    {
      item: "Delivery confirmation to cardholder's verified billing address",
      category: "recommended",
      context: "all",
      required: false,
      why_matters:
        "If the item was delivered to the cardholder's verified address, it weakens the fraud claim significantly. Why would a fraudster ship to the real cardholder's address?",
      where_to_find:
        "Your shipping provider's website (UPS, FedEx, USPS, DHL). Get a screenshot or PDF of the tracking page showing delivery confirmation, delivery date, and the delivery address. For digital goods, check your app's access logs.",
      urgency_essential: true,
      urgency_order: 4,
    },
    {
      item: "Customer account details (account creation date, purchase history, total prior orders)",
      category: "recommended",
      context: "all",
      required: false,
      why_matters:
        "An established account with purchase history suggests the cardholder is the buyer. New accounts with no history are a red flag; long-standing accounts with repeat purchases are a strong indicator of legitimacy.",
      where_to_find:
        "Your app's admin panel or database. Pull the customer's account creation date, total order count, and a summary of previous purchases. A screenshot of the customer profile page works well.",
      urgency_essential: true,
      urgency_order: 5,
    },
    {
      item: "Access/activity logs proving the customer used the product (for digital goods and SaaS)",
      category: "mandatory",
      context: "digital_goods",
      required: true,
      why_matters:
        "For digital goods, this is your delivery proof AND your fraud rebuttal in one. Server logs showing the customer logged in, downloaded, or used the product from a recognizable IP address prove both that the product was delivered and that the cardholder engaged with it.",
      where_to_find:
        "Check your app's admin panel or database for login records tied to this customer's account. Look for timestamps, IP addresses, and what they accessed. If you use analytics (Mixpanel, Amplitude), search by user ID or email. For downloadable products, check your download logs or CDN access logs.",
      urgency_essential: true,
      urgency_order: 5,
    },
    {
      item: "Device fingerprint and IP address of the transaction",
      category: "recommended",
      context: "all",
      required: false,
      why_matters:
        "Even without CE3.0, showing the IP matches the cardholder's geography helps your case. An IP in the same city as the billing address is very different from an IP in a foreign country.",
      where_to_find:
        "Stripe Radar captures device fingerprints automatically if enabled. For IP addresses, check your server access logs, analytics platform, or fraud prevention tool. You can geolocate the IP to show it matches the cardholder's area.",
      urgency_essential: false,
      urgency_order: null,
    },
    {
      item: "Billing descriptor screenshot showing recognizable business name",
      category: "recommended",
      context: "all",
      required: false,
      why_matters:
        "Proves your business name is clearly identifiable on the statement. Many 'fraud' disputes are simply cardholders who don't recognize the charge because the descriptor is cryptic. A clear descriptor eliminates this as a factor.",
      where_to_find:
        "Stripe Dashboard > Settings > Business settings > Statement descriptor. Take a screenshot showing your descriptor. Bonus: if you can show what it looks like on an actual bank statement, even better.",
      urgency_essential: false,
      urgency_order: null,
    },
    {
      item: "Communication with cardholder showing engagement (order confirmation emails opened/clicked, support contacts)",
      category: "recommended",
      context: "all",
      required: false,
      why_matters:
        "If the cardholder opened the order confirmation email, they knew about the purchase. Email engagement data (open timestamps, click data) is strong circumstantial evidence that the cardholder was involved.",
      where_to_find:
        "Your email service provider (Mailchimp, SendGrid, Postmark, etc.) -- look for open/click events on order confirmation and shipping notification emails. Also check your helpdesk (Zendesk, Intercom, etc.) for any support conversations with this customer.",
      urgency_essential: false,
      urgency_order: null,
    },
  ],

  common_mistakes: [
    {
      mistake: "Not using 3D Secure",
      explanation:
        "If you authenticate with 3D Secure, liability shifts to the issuer and you shouldn't even get these disputes. Enable it on all transactions. The friction cost is far lower than the dispute cost.",
    },
    {
      mistake: "Not collecting IP addresses and device data",
      explanation:
        "Without this data, you can't use CE3.0 -- your strongest defense against friendly fraud. Start logging IP addresses, device fingerprints, and user account IDs on every transaction today.",
    },
    {
      mistake: "Unclear billing descriptor",
      explanation:
        "If your statement descriptor says 'JKB TECH LLC' but your store is called something else entirely, the cardholder genuinely won't recognize the charge. Use a recognizable descriptor that matches your brand. Keep it consistent -- changing it breaks CE3.0 eligibility.",
    },
    {
      mistake: "Skipping AVS and CVV checks",
      explanation:
        "These are free verification tools. Not using them tells the bank you didn't try to verify the cardholder. Always collect and verify both. Transactions without AVS/CVV results are nearly impossible to defend.",
    },
    {
      mistake: "Not retaining transaction data long enough",
      explanation:
        "CE3.0 requires historical transactions from 120-365 days before the disputed transaction. If you purge data after 90 days, you permanently lose this defense for all future disputes.",
    },
    {
      mistake: "Treating all 10.4 disputes the same",
      explanation:
        "True fraud and friendly fraud require different strategies. If the shipping address is in a different country from the cardholder, it might be true fraud -- consider whether fighting is worth it. If the delivery address matches the billing address, it is almost certainly friendly fraud and worth fighting.",
    },
  ],

  pro_tips: [
    {
      tip: "Enable 3D Secure / Visa Secure on all transactions. This is the #1 defense. Liability shifts to the issuer, and most 10.4 disputes won't even reach you. The conversion rate impact is minimal on modern checkout flows.",
    },
    {
      tip: "Stripe Radar captures device fingerprints automatically. Make sure it is enabled -- this data is gold for CE3.0 and costs nothing extra.",
    },
    {
      tip: "Build a CE3.0 evidence pipeline now, before a dispute hits. Log IP address, device fingerprint, user account ID, and shipping address on every transaction. Store this data for 13+ months (365 days + buffer). When a 10.4 dispute arrives, you should be able to query matching historical transactions automatically.",
    },
    {
      tip: "Check if the delivery address matches the billing address. If it does and you have delivery confirmation, the fraud claim is very weak -- why would a fraudster ship to the real cardholder's address? This alone significantly strengthens your rebuttal.",
    },
    {
      tip: "Look at the email address and account history. If the account email matches the cardholder's name, has been active for months, and shows order history, include this context. Established accounts dispute at a much lower rate than new ones.",
    },
    {
      tip: "For true fraud (mismatched addresses, foreign IPs, brand-new account with no history): consider whether fighting is worth it. If the transaction looks genuinely fraudulent, a refund is cheaper than the dispute fee plus your time. Fight the ones that look like friendly fraud.",
    },
  ],

  urgency_essentials: {
    summary:
      "Focus on authentication proof and verification data first -- these carry the most weight with issuers. CE3.0 is your second line of attack if you have the historical data.",
    ordered_items: [
      "3D Secure authentication proof (if used -- this alone wins)",
      "AVS and CVV2 verification results",
      "CE3.0 package: 2 historical transactions + matching IP/device data",
      "Delivery confirmation to verified billing address",
      "Customer account history showing prior purchases",
    ],
  },

  narrative_template: `The cardholder claims this transaction was unauthorized. Our records indicate this is a legitimate transaction by the cardholder based on the following:

**Transaction Details:**
- Order date: [date]
- Amount: [amount]
- Order ID: [ID]
- Items/services: [description]

**Authentication & Verification:**
- 3D Secure: [Authenticated / Not used]
- AVS Result: [Match / Partial / No match]
- CVV2 Result: [Match / No match]
- IP Address: [IP] ([geographic location])

**Compelling Evidence 3.0:**
[If applicable: The cardholder has made prior undisputed purchases from our store using the same payment credentials and device:]

Transaction | Date | Amount | IP Address | Device ID | Status
Disputed | [date] | [amt] | [IP] | [device] | Disputed
Historical 1 | [date] | [amt] | [IP] | [device] | Undisputed
Historical 2 | [date] | [amt] | [IP] | [device] | Undisputed

Both historical transactions are between 120-365 days before the disputed transaction, undisputed, and share matching IP address and [second element] with the disputed transaction.

**Delivery:**
- Shipped to: [address]
- Tracking: [number]
- Delivered: [date]
- Address matches billing: [Yes/No]

**Customer Account:**
- Account created: [date]
- Total prior orders: [count]
- Account email: [email]

Based on the authentication data, matching purchase history, and delivery to the cardholder's verified address, we believe this transaction was authorized by the cardholder. We respectfully request this dispute be resolved in our favor.`,

  response_deadline_days: 30,
  filing_window_days: 120,
  key_differences: null,
};
