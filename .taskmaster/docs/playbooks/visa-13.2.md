# Visa 13.2 — Cancelled Recurring Transaction

> Draft playbook for Joe's review. Maps to PRD playbook schema.

## Metadata
- **Network:** Visa
- **Reason Code:** 13.2
- **Display Name:** Cancelled Recurring Transaction
- **Legacy Code:** 41

---

## Description (Plain English)

The cardholder claims they were charged for a recurring transaction (subscription, membership, installment) after they cancelled. This is extremely common with SaaS, streaming, and subscription box services. Many of these are "friendly fraud" — the cardholder forgot they agreed to a billing cycle, or cancelled after the billing cutoff but before the next charge.

---

## Issuer Evaluation (What the Bank Looks At)

1. **Did the cardholder request cancellation?** When and how?
2. **Was the charge processed after the cancellation date?** The bank compares the cancellation timestamp against the transaction date.
3. **Did the merchant acknowledge the cancellation?** Confirmation email, ticket, etc.
4. **Were services used between the last billing cycle and cancellation?** If yes, was the charge for that usage period?
5. **Is this actually a recurring transaction?** If it's an installment plan, 13.2 doesn't apply.
6. **Filing window:** 120 calendar days from transaction processing date.

The issuer is looking at the **timeline**: when did the cardholder cancel, when was the charge, and did the merchant honor the cancellation? If the charge was legitimate (services used before cancellation), documentation of the billing period is critical.

---

## Evidence Checklist

### Mandatory Evidence
| Item | Required | Why It Matters |
|------|----------|----------------|
| Proof of active subscription at time of charge | **Yes** | Shows the subscription was not cancelled when the charge was processed. |
| Cancellation policy (terms accepted at signup) | **Yes** | Proves the cardholder agreed to billing terms, including cancellation notice requirements. |

### Strongly Recommended
| Item | Required | Why It Matters |
|------|----------|----------------|
| Cancellation request timestamp vs. charge date | Recommended | If the cancellation came AFTER the billing date, the charge was valid. Show the timeline. |
| Cancellation confirmation sent to cardholder | Recommended | Proves you acknowledged and processed the cancellation. |
| Service usage logs after last billing cycle | Recommended | If the cardholder used the service between billing cycles, the charge covers that usage. |
| Subscription agreement / terms of service | Recommended | Shows the billing terms the cardholder agreed to. |
| Communication history with cardholder | Helpful | Any emails about the subscription, renewal reminders, or cancellation discussions. |
| Refund confirmation (if already refunded) | Helpful | If you already issued a refund, this ends the dispute. |

### For "Not Actually Recurring" Defense
| Item | Required | Why It Matters |
|------|----------|----------------|
| Proof this is an installment plan, not recurring | **Yes** | If the transaction is a fixed installment (e.g., 3 payments of $100), reason code 13.2 doesn't apply. Provide the installment agreement. |

---

## Common Mistakes

| Mistake | Explanation |
|---------|-------------|
| No cancellation confirmation email | If you can't prove when the cardholder cancelled (or that they didn't), you have no defense. Always send cancellation confirmations with timestamps. |
| Continuing to charge after cancellation | If the cardholder cancelled and you charged anyway — even by one day — you lose. Process cancellations immediately. |
| Unclear billing cycle dates | If the cardholder doesn't know when their billing cycle starts/ends, they'll file a dispute when they see a charge they "already cancelled." Communicate billing dates clearly. |
| No renewal reminders | Send an email 5-7 days before each recurring charge. This dramatically reduces disputes. |
| Making cancellation difficult | If cancellation requires calling a phone number during business hours, the cardholder will file a chargeback instead. Make cancellation self-service. |
| Not tracking cancellation method and timestamp | You need to prove when and how the cancellation happened. Log everything. |

---

## Pro Tips

- **Send renewal reminders 5-7 days before each charge.** This is the #1 way to prevent 13.2 disputes.
- **Make cancellation easy and self-service.** A "cancel" button in account settings prevents chargebacks. Making it hard just pushes customers to their bank instead.
- **Log the exact cancellation timestamp** with the method used (website, email, phone). This is your most important evidence.
- **Use Visa Account Updater** to keep card details current. Expired cards on recurring transactions trigger confusion and disputes.
- **Clearly state in terms:** "Cancellations take effect at the end of the current billing period." This covers charges between cancellation and period end.
- **When you get a cancellation, confirm it in writing immediately** with the effective date and any remaining access period.

---

## Urgency Essentials (When Deadline is <5 Days)

Focus on these in order:
1. Subscription status at time of charge (active = valid charge)
2. Cancellation timeline (if cancelled AFTER the charge, charge was valid)
3. Terms of service showing billing/cancellation policy
4. Any proof of service usage during the billing period

---

## Narrative Template Structure

```
The cardholder claims this recurring transaction was processed after cancellation.
Our records show the following:

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
- The cancellation was received on [date], which is after the billing date of
  [date]. Per our terms, the charge covers the billing period that was already
  in progress.
- Our records show no cancellation request was received prior to this charge.
  [Include screenshots of cancellation policy and account status]
- The cardholder continued to use the service during this billing period.
  [Include usage logs]

**Terms of Service:**
Per the terms accepted at signup on [date], cancellations take effect at the
end of the current billing period. The disputed charge covers services through
[end date].

We respectfully request this dispute be resolved in our favor.
```
