# Mastercard 4808 — Authorization-Related Dispute

> Playbook derived from Highnote internal dispute handling documentation (issuer-side perspective).

## Metadata
- **Network:** Mastercard
- **Reason Code:** 4808
- **Display Name:** Authorization-Related Dispute
- **Category:** Authorization
- **Sub-types covered:** Authorization not obtained; expired/invalid authorization; multiple authorization requests (CNP declined, approved via stand-in)

---

## Description (Plain English)

The cardholder's bank claims the transaction lacked a valid authorization. This can mean:
- **No authorization obtained** -- the merchant processed the transaction without getting a proper approval from the issuer
- **Expired authorization** -- the merchant used an authorization that had already expired before settlement
- **Invalid authorization** -- the authorization amount or account doesn't match the settled transaction
- **Stand-in processing issue** -- the card network approved the transaction via stand-in processing after the issuer declined it (CNP transactions)

Authorization disputes are different from fraud or consumer disputes. The question isn't whether the cardholder made the purchase -- it's whether the merchant followed proper authorization procedures. These are often technical processing errors rather than cardholder complaints.

Authorization disputes represent roughly 10-15% of total dispute volume and are frequently overlooked by small merchants who focus entirely on fraud and consumer dispute defenses.

---

## Issuer Evaluation (What the Bank Looks At)

1. **Was a valid authorization obtained before settlement?** The auth must have been active (not expired) at the time of settlement.
2. **Does the authorized amount match the settled amount?** Within Mastercard's 10% currency conversion allowance (see below), a mismatch is grounds for this dispute.
3. **Was the authorization tied to the correct account?** An auth obtained on one card number but settled against another is invalid.
4. **For stand-in disputes:** Was the transaction declined by the issuer and then approved through stand-in? If so, the merchant accepted a transaction the issuer explicitly declined.
5. **Filing window:** 90 calendar days from the transaction processing date.

---

## The 10% Currency Conversion Allowance

Mastercard provides a specific rule for currency conversion situations: **a transaction settled within 10% of the authorized amount does not qualify as a 4808 chargeback on authorization grounds.** This applies when the difference between authorized and settled amounts is due to currency conversion.

If the disputed amount difference is within 10% of the authorization and the variation is currency-related, you have grounds to deny the dispute entirely by citing this rule. Call it out explicitly in your representment.

---

## Acquirer Pre-Review

Before your evidence reaches the issuing bank, it passes through your acquirer first. The acquirer reviews the package for completeness and formatting compliance with network rules. **If your submission is incomplete or doesn't address the assigned reason code, it gets bounced before the issuer ever sees it.** Merchants are rarely notified clearly when this happens -- the submission just fails.

This means:
- Your package must directly address reason code **4808 (Authorization-Related Dispute)** -- generic transaction records that don't address the authorization chain won't clear pre-review
- All required documents (see checklist below) must be present
- Your acquirer may impose an internal deadline shorter than Mastercard's 45-day response window

Getting bounced at the acquirer stage is an automatic loss with no second chance.

---

## Evidence Checklist

### Mandatory Evidence
| Item | Required | Why It Matters |
|------|----------|----------------|
| Original authorization record | **Yes** | Shows the auth was obtained, the amount, the timestamp, and the approval code. This is the entire dispute. |
| Settlement record tied to the authorization | **Yes** | Proves the settlement matches the authorization. |
| Authorization approval code | **Yes** | Links the specific auth to the specific transaction. |

### For Amount Discrepancy Disputes
| Item | Required | Why It Matters |
|------|----------|----------------|
| Currency conversion documentation | **Yes (if applicable)** | If the amount difference is currency-related and within 10% of the authorized amount, the 10% allowance applies and the dispute should be denied. |
| Tip or gratuity authorization (for restaurant/service merchants) | **Yes (if applicable)** | Mastercard allows tip adjustments up to 20% over the authorized amount for restaurants with tip lines. Document the tip authorization separately. |

### For Expired Authorization Disputes
| Item | Required | Why It Matters |
|------|----------|----------------|
| Re-authorization record (if applicable) | **Yes** | If the original auth expired and you obtained a new one before settlement, show both. |
| Timestamp showing settlement occurred before expiration | **Yes** | Authorization timelines are the dispute. Prove yours was still valid. |

### Strongly Recommended
| Item | Required | Why It Matters |
|------|----------|----------------|
| Payment processor transaction log | Recommended | Shows the full authorization-to-settlement chain from your processor's records. |
| Order details matching the authorized amount | Recommended | Connects the authorization to an actual customer order, showing this was a legitimate transaction. |

---

## Common Mistakes

| Mistake | Explanation |
|---------|-------------|
| Settling after authorization expiration | Mastercard authorization holds expire. If you pre-authorize at booking or order placement and settle days later, you must re-authorize before settlement. |
| Settling a different amount without re-authorization | Even a small amount change (except currency conversion within 10%) can trigger a 4808. If the final amount differs from the auth, re-authorize for the correct amount. |
| Not retaining authorization records | Your payment processor retains these, but you need to know how to pull them. If you can't produce an authorization record, you have no defense. |
| Accepting stand-in approvals on declined transactions | If the issuer declined a transaction and it was approved through stand-in, you own the liability. Don't fulfill orders on stand-in approvals for CNP transactions -- let the customer re-try with a different card. |
| Missing the 45-day response window | Mastercard's filing window is 90 days from the transaction, but your response window from the chargeback date is 45 days. Miss it and you lose automatically. |
| Not citing the 10% currency conversion rule | If the amount difference is within 10% and currency-related, many merchants just accept the chargeback without knowing this rule eliminates the dispute. |

---

## Pro Tips

- **Know your authorization expiration windows.** Mastercard standard auth holds are typically 30 days for most merchant categories. Hotels and car rentals have different rules. If you're not settling within a few days of auth, check your specific category's rules.
- **For delayed fulfillment businesses (pre-orders, custom goods, reservations):** Build re-authorization into your fulfillment workflow. Auth at order, re-auth before settlement if more than a day or two has passed.
- **The 10% currency conversion allowance is a specific Mastercard rule that most merchants and many acquirers don't cite proactively.** If you process multi-currency transactions and get a 4808, check whether the amount difference falls within this safe harbor before accepting the loss.
- **Pull your authorization records from your processor dashboard, not Stripe's dispute interface.** The processor-level auth data is more complete and more credible as evidence than a screenshot of a Stripe payment page.
- **For restaurant/service merchants with tip lines:** Mastercard allows tip adjustments up to 20% over the pre-auth amount. If your chargeback is on a tipped transaction and the amount difference is the tip, document this -- it's not a 4808 violation.

---

## Urgency Essentials (When Deadline is <5 Days)

Focus on these in order:
1. Original authorization record with approval code and timestamp
2. Settlement record showing the authorization code and settled amount
3. If amount differs: currency conversion documentation (cite 10% rule) or tip authorization
4. Payment processor transaction log showing the full auth-to-settle chain

This dispute type is won on technical authorization records. Product descriptions, customer communications, and delivery proof are irrelevant here -- the issuer only cares about whether you had a valid authorization.

---

## Narrative Template Structure

```
We are responding to chargeback reason code 4808 (Authorization-Related Dispute).

**Transaction Details:**
- Transaction date: [date]
- Settlement date: [date]
- Amount authorized: [amount]
- Amount settled: [amount]
- Authorization approval code: [code]

**Authorization Record:**
A valid authorization was obtained on [date] at [time] for [amount].
Authorization approval code: [code].
[Attach: authorization record from processor]

[If amounts differ due to currency conversion:]
**Currency Conversion Note:**
The difference between the authorized amount ([auth amount]) and the settled
amount ([settled amount]) is [difference], representing [X]% of the authorized
amount. This is within Mastercard's 10% currency conversion allowance and does
not qualify as grounds for a 4808 chargeback.

[If tip adjustment:]
**Tip Authorization:**
This transaction included a tip of [amount], added by the cardholder at the
point of interaction. Restaurant tip adjustments up to 20% of the pre-tip
authorization are permitted under Mastercard rules.
[Attach: signed receipt with tip line]

[If re-authorization was obtained:]
**Re-Authorization:**
The original authorization was obtained on [date]. A re-authorization was
obtained on [date] (approval code: [code]) prior to settlement on [date].
[Attach: re-authorization record]

The settlement falls within the valid authorization window and matches the
authorized amount. We respectfully request this dispute be resolved in our favor.
```

---

## Sources

- Highnote internal Confluence: [Acquiring: Merchant Chargeback](https://bay1.atlassian.net/wiki/spaces/PE/pages/3230072836/Acquiring+Merchant+Chargeback)
- Highnote internal Confluence: [Documents Recommended by Disputes Reason](https://bay1.atlassian.net/wiki/spaces/RISK/pages/998703216/Documents+Recommended+by+Disputes+Reason)
- Mastercard Chargeback Guide (reason code 4808 section)
