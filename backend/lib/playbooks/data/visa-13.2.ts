import type { PlaybookData } from "../types";

export const visa132: PlaybookData = {
  network: "visa",
  reason_code: "13.2",
  display_name: "Cancelled Recurring Transaction",
  category: "consumer",
  legacy_code: "41",
  description:
    "The cardholder claims they were charged for a recurring transaction (subscription, membership, installment) after they cancelled. This is extremely common with SaaS, streaming, and subscription box services. Many of these are \"friendly fraud\" -- the cardholder forgot they agreed to a billing cycle, or cancelled after the billing cutoff but before the next charge.",

  coach_headline: "The cardholder says they cancelled but were still charged.",
  coach_summary:
    "The bank wants to know: did the customer actually cancel, and did you process the cancellation correctly? If you can show the customer didn't cancel through your process, or that the charge was for a period before cancellation, you have a solid case.",
  coach_issuer_summary:
    "The bank checks: Did the customer follow your cancellation process? Was the cancellation request received before or after the billing date? Did you clearly communicate your cancellation policy at signup? Do your records show the subscription was still active when charged?",
  coach_acquirer_summary:
    "Your response goes through a compliance check before the bank sees it. You need to show your cancellation policy and proof the customer either didn't cancel or was billed for a valid period. Generic terms of service alone won't clear the check.",

  issuer_evaluation: `The issuer evaluates Visa 13.2 disputes using the following criteria:

1. Did the cardholder request cancellation? When and how?
2. Was the charge processed after the cancellation date? The bank compares the cancellation timestamp against the transaction date.
3. Did the merchant acknowledge the cancellation? Confirmation email, ticket, etc.
4. Were services used between the last billing cycle and cancellation? If yes, was the charge for that usage period?
5. Is this actually a recurring transaction? If it's an installment plan, 13.2 doesn't apply.
6. Filing window: 120 calendar days from transaction processing date.

The issuer is looking at the timeline: when did the cardholder cancel, when was the charge, and did the merchant honor the cancellation? If the charge was legitimate (services used before cancellation), documentation of the billing period is critical.`,

  acquirer_prereview: `Before your evidence reaches the issuing bank, it passes through your acquirer first. The acquirer reviews the package for completeness and formatting compliance with network rules. If your submission is incomplete or doesn't address the assigned reason code, it gets bounced before the issuer ever sees it. Merchants are rarely notified clearly when this happens -- the submission just fails.

This means:
- Your package must directly address reason code 13.2 (Cancelled Recurring Transaction) -- generic billing records won't clear pre-review.
- All required documents (see checklist below) must be present.
- Your acquirer may impose an internal deadline shorter than Visa's 30-day window.

Getting bounced at the acquirer stage is an automatic loss with no second chance. The checklist below tells you exactly what both the acquirer and issuer need to see.`,

  evidence_checklist: [
    {
      item: "Proof of active subscription at time of charge",
      category: "mandatory",
      context: "all",
      required: true,
      why_matters:
        "Shows the subscription was not cancelled when the charge was processed. This is the core factual question in every 13.2 dispute.",
      where_to_find:
        "Stripe Dashboard > Billing > Subscriptions > search by customer name or email. Click the subscription and screenshot the status history showing it was 'Active' on the charge date. If you use a separate billing tool (Chargebee, Recharge), check the subscription status there.",
      urgency_essential: true,
      urgency_order: 1,
    },
    {
      item: "Billing period covered by the disputed charge (service_date)",
      category: "mandatory",
      context: "all",
      required: true,
      why_matters:
        "Stripe's API expects a clear service_date field showing the exact billing period this charge covers. The issuer evaluates whether the charge was valid by comparing the cancellation date against the billing period. Without this, the timeline argument falls apart.",
      where_to_find:
        "Stripe Dashboard > Billing > Subscriptions > click the subscription > look at the billing period for the disputed invoice (e.g., 'Mar 1 - Apr 1'). If you use Chargebee or Recharge, check the invoice details for the period dates. This should show the charge covered a period that started before any cancellation.",
      urgency_essential: true,
      urgency_order: 2,
    },
    {
      item: "Customer email address tied to the subscription",
      category: "recommended",
      context: "all",
      required: false,
      why_matters:
        "Stripe marks the customer email as a priority field for recurring disputes. It ties the cancellation timeline directly to the customer's identity and shows where renewal reminders and cancellation confirmations were sent.",
      where_to_find:
        "Stripe Dashboard > Customers > search by name > the email is on the customer profile. Cross-reference with the email on the subscription and the email where you sent billing notifications. If the cardholder used a different email to contact support about cancellation, note both.",
      urgency_essential: false,
      urgency_order: null,
    },
    {
      item: "Cancellation policy (terms accepted at signup)",
      category: "mandatory",
      context: "all",
      required: true,
      why_matters:
        "Proves the cardholder agreed to billing terms, including cancellation notice requirements. Without this, you cannot enforce a billing-cycle-end cancellation policy.",
      where_to_find:
        "Screenshot your checkout or signup page where the cancellation policy is displayed. If you have a Terms of Service page, screenshot the cancellation section. If you log when customers accept terms (a clickwrap log), pull the acceptance record for this customer with its timestamp.",
      urgency_essential: true,
      urgency_order: 4,
    },
    {
      item: "Cancellation request timestamp vs. charge date",
      category: "recommended",
      context: "all",
      required: false,
      why_matters:
        "If the cancellation came AFTER the billing date, the charge was valid. Show the timeline side by side. This is your strongest argument when the charge preceded the cancellation.",
      where_to_find:
        "Check your app's admin panel or database for the cancellation request timestamp. If the customer cancelled through your helpdesk (Zendesk, Intercom, Freshdesk), pull the ticket creation date. Then compare it against the charge date in Stripe Dashboard > Payments > click the payment. Show both dates side by side.",
      urgency_essential: true,
      urgency_order: 3,
    },
    {
      item: "Cancellation confirmation sent to cardholder",
      category: "recommended",
      context: "all",
      required: false,
      why_matters:
        "Proves you acknowledged and processed the cancellation. If you sent a confirmation email with an effective date, it shows you acted on the cancellation and the disputed charge fell before that date.",
      where_to_find:
        "Search your email service provider (SendGrid, Postmark, Mailchimp) for the cancellation confirmation email sent to this customer. Look for the send timestamp and the effective cancellation date in the email body. Also check your helpdesk for any cancellation acknowledgment tickets.",
      urgency_essential: false,
      urgency_order: null,
    },
    {
      item: "Service usage logs after last billing cycle",
      category: "recommended",
      context: "all",
      required: false,
      why_matters:
        "If the cardholder used the service between billing cycles, the charge covers that usage. Login timestamps, feature access records, or download logs all qualify.",
      where_to_find:
        "Pull login and activity records from your app's admin panel or database for this customer during the disputed billing period. If you use analytics (Mixpanel, Amplitude, Google Analytics), search by user ID for sessions during that date range. Screenshot any logins, feature usage, or downloads that occurred after the last billing date.",
      urgency_essential: true,
      urgency_order: 5,
    },
    {
      item: "Subscription agreement / terms of service",
      category: "recommended",
      context: "all",
      required: false,
      why_matters:
        "Shows the billing terms the cardholder agreed to, including when charges are triggered and what the cancellation policy is. Reinforces the mandatory cancellation policy item.",
      where_to_find:
        "Screenshot your Terms of Service page, focusing on the billing and subscription sections. If you have a separate subscription agreement (common for SaaS), pull that document. Include the URL and the date the terms were last updated.",
      urgency_essential: false,
      urgency_order: null,
    },
    {
      item: "Communication history with cardholder",
      category: "recommended",
      context: "all",
      required: false,
      why_matters:
        "Any emails about the subscription, renewal reminders, or cancellation discussions. Renewal reminder emails sent before the charge are especially useful -- they show the cardholder was informed the charge was coming.",
      where_to_find:
        "Search your helpdesk (Zendesk, Intercom, Freshdesk) and email (Gmail > search by customer email) for any conversations about this subscription. Pay special attention to renewal reminder emails -- check your email service provider for the send/open timestamps on any pre-charge notification you sent.",
      urgency_essential: false,
      urgency_order: null,
    },
    {
      item: "Refund confirmation (if already refunded)",
      category: "situational",
      context: "refund_issued",
      required: false,
      why_matters:
        "If you already issued a refund, this ends the dispute. Submit the refund confirmation and the dispute should be closed in your favor automatically.",
      where_to_find:
        "Stripe Dashboard > Payments > click the original payment > look for the Refund section. It shows the refund date, amount, and status. Screenshot this. If you refunded outside Stripe, pull the refund confirmation from whatever processor you used.",
      urgency_essential: false,
      urgency_order: null,
    },
    {
      item: "Proof this is an installment plan, not a recurring transaction",
      category: "mandatory",
      context: "installment_defense",
      required: true,
      why_matters:
        "If the transaction is a fixed installment (e.g., 3 payments of $100), reason code 13.2 doesn't apply. Provide the installment agreement showing the fixed schedule. This is a threshold defense -- if successful, the dispute code itself is invalid.",
      where_to_find:
        "Pull the original order or agreement showing the fixed installment schedule (e.g., '3 payments of $100'). Check your e-commerce platform's order details or your payment plan tool. The key is showing a predetermined number of payments, not an open-ended subscription.",
      urgency_essential: false,
      urgency_order: null,
    },
  ],

  common_mistakes: [
    {
      mistake: "No cancellation confirmation email",
      explanation:
        "If you can't prove when the cardholder cancelled (or that they didn't), you have no defense. Always send cancellation confirmations with timestamps. Without this, the cardholder's claim of cancellation goes unchallenged.",
    },
    {
      mistake: "Continuing to charge after cancellation",
      explanation:
        "If the cardholder cancelled and you charged anyway -- even by one day -- you lose. Process cancellations immediately and do not queue billing runs that might catch a just-cancelled account.",
    },
    {
      mistake: "Unclear billing cycle dates",
      explanation:
        "If the cardholder doesn't know when their billing cycle starts and ends, they'll file a dispute when they see a charge they \"already cancelled.\" Communicate billing dates clearly in renewal reminder emails and on billing receipts.",
    },
    {
      mistake: "No renewal reminders",
      explanation:
        "Send an email 5-7 days before each recurring charge. This dramatically reduces disputes. The cardholder who sees the reminder can cancel before the charge -- the cardholder who is surprised becomes a chargeback.",
    },
    {
      mistake: "Making cancellation difficult",
      explanation:
        "If cancellation requires calling a phone number during business hours, the cardholder will file a chargeback instead. Make cancellation self-service. A 'cancel' button in account settings prevents chargebacks.",
    },
    {
      mistake: "Not tracking cancellation method and timestamp",
      explanation:
        "You need to prove when and how the cancellation happened. Log the exact timestamp and method (website, email, phone) for every cancellation. Without this log, you cannot establish the timeline that wins or loses the case.",
    },
  ],

  pro_tips: [
    {
      tip: "Send renewal reminders 5-7 days before each charge. This is the #1 way to prevent 13.2 disputes. The cardholder who sees the reminder can cancel before the charge -- the cardholder who is surprised becomes a chargeback.",
    },
    {
      tip: "Make cancellation easy and self-service. A 'cancel' button in account settings prevents chargebacks. Making it hard just pushes customers to their bank instead.",
    },
    {
      tip: "Log the exact cancellation timestamp with the method used (website, email, phone). This is your most important evidence when you need to show the cancellation came after the billing date.",
    },
    {
      tip: "Use Visa Account Updater to keep card details current. Expired cards on recurring transactions trigger confusion and disputes.",
    },
    {
      tip: "Clearly state in terms: 'Cancellations take effect at the end of the current billing period.' This covers legitimate charges between a cancellation request and the period end.",
    },
    {
      tip: "When you receive a cancellation, confirm it in writing immediately with the effective date and any remaining access period. This single email is often the difference between winning and losing a 13.2 dispute.",
    },
  ],

  urgency_essentials: {
    summary:
      "Focus on the billing timeline above all else. These items in order are your best chance of winning when you have less than 5 days to respond.",
    ordered_items: [
      "Subscription status at time of charge (active = valid charge)",
      "Billing period covered by the disputed charge (proves the charge covers a valid period)",
      "Cancellation timeline (if cancelled AFTER the charge, charge was valid)",
      "Terms of service showing billing and cancellation policy",
      "Any proof of service usage during the billing period",
    ],
  },

  narrative_template: `The cardholder claims this recurring transaction was processed after cancellation. Our records show the following:

**Subscription Details:**
- Service/product: [name]
- Subscription start date: [date]
- Billing cycle: [monthly/annual/etc.]
- Amount: [amount per cycle]

**Billing Timeline:**
- Last billing date: [date of disputed charge]
- Billing period covered: [start date] to [end date]
- Cancellation requested: [date, or "No cancellation on file"]
- Cancellation effective date: [date, per terms]

**Evidence of Valid Charge:**
[Choose applicable]:
- The cancellation was received on [date], which is after the billing date of [date]. Per our terms, the charge covers the billing period that was already in progress.
- Our records show no cancellation request was received prior to this charge. [Include screenshots of cancellation policy and account status]
- The cardholder continued to use the service during this billing period. [Include usage logs]

**Terms of Service:**
Per the terms accepted at signup on [date], cancellations take effect at the end of the current billing period. The disputed charge covers services through [end date].

We respectfully request this dispute be resolved in our favor.`,

  response_deadline_days: 30,
  filing_window_days: 120,
  key_differences: null,
};
