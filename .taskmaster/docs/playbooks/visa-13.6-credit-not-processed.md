# Visa 13.6 / Mastercard Credit Not Processed

> Playbook derived from Highnote internal dispute handling documentation (issuer-side perspective).

## Metadata
- **Networks:** Visa (13.6) and Mastercard (4853 sub-type: Credit Not Processed)
- **Reason Code:** Visa 13.6 / Mastercard 4853
- **Display Name:** Credit Not Processed
- **Category:** Consumer Dispute

---

## Description (Plain English)

The cardholder returned merchandise or cancelled a service and is claiming the merchant never issued the promised refund (credit). This is one of the cleaner dispute types to defend -- if you issued the refund, prove it; if you didn't, the cardholder is probably right.

Common scenarios:
- Merchant issued the refund, but it hasn't posted yet (timing lag)
- Merchant issued the refund to the wrong account or card
- Merchant promised a refund verbally or in writing but never processed it
- Merchandise was returned but the merchant disputes the return condition

The deadline for cardholders to file is typically **120 calendar days from the date the credit was expected** (or from the transaction date if no credit date was promised).

---

## Issuer Evaluation (What the Bank Looks At)

1. **Was a refund actually issued?** The issuer checks whether a credit posting exists. If it does, the dispute should be withdrawn.
2. **Was the refund issued to the correct account?** A refund sent to an expired or closed card doesn't satisfy the obligation.
3. **Is the refund still in transit?** Some refunds take 5-10 business days to post. If the timing is the issue, showing the refund was processed (even if not yet posted) can resolve the dispute.
4. **Did the merchant agree to a refund?** Written confirmation of a promised refund is heavily weighted. If you said you'd refund and didn't, the dispute will go against you.
5. **Was the return accepted?** If the merchant claims the return was in unacceptable condition, they need documentation of that inspection.
6. **What does the return/refund policy say?** The issuer checks whether the refund was owed under the merchant's stated terms.

---

## Acquirer Pre-Review

Before your evidence reaches the issuing bank, it passes through your acquirer first. The acquirer reviews the package for completeness and formatting compliance with network rules. **If your submission is incomplete or doesn't address the assigned reason code, it gets bounced before the issuer ever sees it.** Merchants are rarely notified clearly when this happens -- the submission just fails.

This means:
- Your package must directly address **Credit Not Processed** -- generic responses won't clear pre-review
- All required documents (see checklist below) must be present
- Your acquirer may impose an internal deadline shorter than the network's 30-day response window

Getting bounced at the acquirer stage is an automatic loss with no second chance.

---

## Evidence Checklist

### If You Already Issued the Refund
| Item | Required | Why It Matters |
|------|----------|----------------|
| Refund confirmation / transaction record | **Yes** | Shows the refund was processed, the amount, and the date. This is usually sufficient to close the dispute. |
| Refund amount and date matching the dispute | **Yes** | The amount and timing must be traceable back to this specific transaction. |
| Processor confirmation of the credit posting | Recommended | If the refund has posted, a processor screenshot showing the credit is conclusive. |

### If You Have Not Issued a Refund (Disputing the Return/Refund Claim)
| Item | Required | Why It Matters |
|------|----------|----------------|
| Return/refund policy as displayed at checkout | **Yes** | Establishes whether a refund was owed at all and under what conditions. |
| Return condition documentation | **Yes (if return was received)** | Photos or inspection records showing the returned item was not in acceptable condition per your policy. |
| Evidence the item was not returned | **Yes (if no return received)** | Any documentation showing no return was initiated or received. |
| Customer communication denying the return | Recommended | If you notified the customer the return was rejected and why, show that communication. |

### Strongly Recommended (All Cases)
| Item | Required | Why It Matters |
|------|----------|----------------|
| Order confirmation showing original terms | Recommended | Establishes what the cardholder agreed to at time of purchase. |
| Any written communication about the return/refund | Recommended | Email or chat showing the return discussion -- especially any acknowledgment from the cardholder. |

---

## Common Mistakes

| Mistake | Explanation |
|---------|-------------|
| Issuing a refund to the wrong card | If the customer's card changed (expired, re-issued), a refund to the old card may not reach them. Verify the refund destination before processing. |
| Not sending a refund confirmation email | If you processed the refund but didn't email the customer, they often file a dispute assuming you never did it. A refund confirmation email prevents most of these disputes. |
| Verbal refund promises without follow-through | If a customer service rep promised a refund and it wasn't processed, you will lose the dispute. Always process what you promise, and document the promise in writing. |
| Refund policy buried or unclear | If the cardholder couldn't reasonably find your refund terms at checkout, the issuer won't enforce them in your favor. |
| Accepting a return without inspecting it | If you accept a return without documenting its condition, you lose the ability to dispute a refund. Always photograph returned merchandise on receipt. |
| Missing the response deadline | The chargeback response window is 30 days (Visa) or 45 days (Mastercard). Auto-loss if missed. |

---

## Pro Tips

- **Process refunds the same day you confirm a return.** Delay between return receipt and refund processing is the single biggest cause of "credit not processed" disputes. Same-day is clean, and the paper trail is clear.
- **Send a refund confirmation email immediately after processing.** Include the amount, the date, and a note that it may take 5-10 business days to appear. This eliminates most disputes before they start.
- **If a refund was issued but hasn't posted yet, call it out.** Show the refund was processed (processor record) and note the expected posting window. The issuer will verify on their side and withdraw the dispute.
- **Photograph every returned item on receipt.** Even if you accept the return and issue the refund, having photos protects you if the customer later disputes the refund amount or claims something else was returned.
- **For subscription cancellations that result in refunds:** Process the refund immediately on cancellation and send confirmation. Don't wait for the billing cycle to close.

---

## Urgency Essentials (When Deadline is <5 Days)

Focus on these in order:
1. Refund confirmation / transaction record (if issued)
2. Return/refund policy showing whether refund was owed
3. Any written communication about the return or refund promise
4. Return condition documentation (if disputing the return)

If you issued the refund, that single document usually wins this. Get it and submit it.

---

## Narrative Template Structure

```
We are responding to a Credit Not Processed dispute.

[If refund was already issued:]
**Refund Already Processed:**
A refund of [amount] was processed on [date] to the cardholder's account.
Refund confirmation ID: [ID]
[Attach: refund transaction record from processor]

Please note that refunds may take 5-10 business days to appear on the
cardholder's statement depending on their bank's processing timeline.
We respectfully request this dispute be withdrawn.

[If disputing that a refund is owed:]
**Return/Refund Policy:**
Our return policy, accepted at checkout on [date], states: [policy terms].
[Attach: screenshot of return policy at checkout]

**Return Status:**
[Choose applicable:]
- No return was received from the cardholder as of [date]. Our return policy
  requires merchandise to be returned before a refund is issued.
- A return was received on [date]. Upon inspection, the merchandise was found
  to be [condition -- damaged / used / missing components], which does not
  meet the condition required for a refund under our stated policy.
  [Attach: photos of returned merchandise, return inspection record]

**Customer Communication:**
[Summary of any communications regarding the return/refund, including any
notifications sent to the cardholder about the return status]

Based on the above, [a refund is not owed under our stated return policy /
the refund has already been issued]. We respectfully request this dispute be
resolved in our favor.
```

---

## Sources

- Highnote internal Confluence: [Documents Recommended by Disputes Reason](https://bay1.atlassian.net/wiki/spaces/RISK/pages/998703216/Documents+Recommended+by+Disputes+Reason)
- Visa Core Rules (Reason Code 13.6)
- Mastercard Chargeback Guide (4853: Credit Not Processed sub-type)
