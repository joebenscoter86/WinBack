# Mastercard 4853 — Cardholder Dispute (Not as Described / Defective)

> Draft playbook for Joe's review. Maps to PRD playbook schema.

## Metadata
- **Network:** Mastercard
- **Reason Code:** 4853
- **Display Name:** Cardholder Dispute — Not as Described / Defective
- **Category:** Consumer Dispute
- **Note:** 4853 is a broad umbrella code covering multiple sub-types (not received, recurring cancellation, addendum, no-show, counterfeit, digital goods, timeshare). This playbook focuses on the **Not as Described / Defective** sub-type, which is the MVP scope per PRD.

---

## Description (Plain English)

The cardholder claims the merchandise or service they received differs significantly from what was described at the time of purchase. This could mean the item arrived damaged, was defective, was the wrong product entirely, or the service quality didn't match what was promised. This is one of the most subjective dispute types — "not as described" is inherently a judgment call — which makes it both harder to win and a magnet for friendly fraud.

Unlike Visa 13.3 (which covers similar ground), Mastercard 4853 is a catch-all code that spans many dispute scenarios. The "Not as Described / Defective" sub-type is the one most relevant to product-selling merchants.

---

## Issuer Evaluation (What the Bank Looks At)

1. **Does the cardholder's description of what they received differ materially from the merchant's product listing?** The issuer compares the cardholder's claim against available product descriptions, images, and terms.
2. **Did the cardholder attempt to return the merchandise?** Mastercard expects the cardholder to attempt resolution with the merchant before filing. If the merchant has a return policy and the cardholder didn't follow it, this weakens the claim.
3. **Was the item returned?** If not, the issuer weighs whether the merchant offered a return path. If merchandise was returned, the issuer must wait at least **15 calendar days** before filing the chargeback.
4. **Is there documented communication between cardholder and merchant?** Evidence of the cardholder raising the issue and the merchant's response (or lack thereof) is heavily weighted.
5. **Filing window compliance:** 120 calendar days from the transaction processing date, delivery date, or service end date (maximum 540 days from original transaction).
6. **Is the claim subjective or objective?** "Wrong item shipped" is objective and easy to evaluate. "Quality wasn't what I expected" is subjective and harder — the issuer leans toward the cardholder in subjective cases unless the merchant provides strong documentary evidence.

The issuer is primarily looking for **whether the merchant's description was accurate and whether the merchant attempted to resolve the issue**. Unlike "not received" disputes where delivery proof is binary, "not as described" disputes are inherently more judgment-based.

---

## Evidence Checklist

### Mandatory Evidence
| Item | Required | Why It Matters |
|------|----------|----------------|
| Original product/service description (website listing, catalog page, order confirmation) | **Yes** | This is your baseline. The issuer compares what you described against what the cardholder claims they received. Screenshot the listing — don't just describe it. |
| Proof the item/service matched the description | **Yes** | Photos of the actual item shipped, quality control records, inspection documentation. For services: scope of work delivered vs. agreed scope. |
| Customer communication logs (emails, chat transcripts, support tickets) | **Yes** | Shows you were responsive and attempted resolution. If the cardholder never contacted you before filing, this is powerful evidence of friendly fraud. |

### Strongly Recommended
| Item | Required | Why It Matters |
|------|----------|----------------|
| Return/refund policy as displayed at checkout | Recommended | If your policy offered a return path and the cardholder didn't use it, this undercuts their claim. |
| Proof of delivery (tracking, signature) | Recommended | Establishes the item was delivered. Doesn't prove it matched the description, but prevents the dispute from pivoting to "not received." |
| Prior transaction history with the cardholder | Recommended | Repeat customer who bought the same product before? Hard to claim it's "not as described" on the 5th purchase. |
| Photos or video of item before shipment | Recommended | Timestamped packing photos/video showing the correct item in good condition going into the box. |
| Quality control or inspection records | Helpful | For manufacturers/producers: batch inspection reports, QC checklists. Shows systematic quality assurance. |
| Terms of service accepted at checkout | Helpful | Especially for services — establishes what was promised and agreed to. |

### For Services
| Item | Required | Why It Matters |
|------|----------|----------------|
| Signed scope of work or service agreement | **Yes** | Defines exactly what was promised. Without this, the cardholder's subjective expectations become the standard. |
| Proof of service delivery (reports, deliverables, login/access logs) | **Yes** | Concrete evidence that the work was performed as agreed. |
| Milestone sign-offs or approval emails from the customer | Recommended | If the customer approved deliverables along the way, it's hard to claim the final result wasn't as described. |

---

## Common Mistakes

| Mistake | Explanation |
|---------|-------------|
| Relying on generic product descriptions | "High quality item" means nothing in a dispute. Specific dimensions, materials, features, and limitations are what the issuer compares against. The more precise your listing, the easier it is to prove you delivered what you described. |
| Not photographing items before shipment | You can't prove the item was in good condition when it left your facility if you don't have photos. This is especially critical for fragile, handmade, or high-value items. |
| Ignoring customer complaints | If the cardholder contacted you about the issue and you didn't respond (or took days to respond), the issuer assumes you're unresponsive. Prompt, documented communication is your strongest defense. |
| Telling the customer to contact the manufacturer | Mastercard holds the merchant responsible, not the manufacturer. Referring the customer elsewhere doesn't satisfy your obligation and makes you look evasive. |
| Accepting the chargeback for subjective claims | "Not as described" chargebacks are disproportionately friendly fraud. A customer who says "the color was slightly different" or "it felt cheaper than expected" may be fishing. Challenge these through representment with your product documentation. |
| Not having a clear return policy | If you don't offer returns, the issuer sees a dead end for the cardholder. If you do offer returns but the cardholder didn't use them, that's evidence in your favor. Either way, a visible, accessible return policy helps you. |
| Missing the 45-day response window | Mastercard gives 45 calendar days from the chargeback processing date. Miss it and you lose automatically, even with perfect evidence. Your acquirer may impose a shorter internal deadline. |

---

## Pro Tips

- **Screenshot your product listings regularly.** Product pages change over time, but the dispute references what was listed when the cardholder purchased. Keep dated screenshots or use the Wayback Machine.
- **For handmade/custom goods, document the production process.** Photos at each stage prove the item was made to spec. This is gold in "not as described" disputes.
- **Respond to customer complaints within 24 hours**, even if you can't resolve immediately. "We received your concern and are looking into it" documented in writing is worth more than a perfect response 5 days later.
- **If a customer claims the item is defective, ask for photos.** A customer who can't produce photos of the alleged defect is likely committing friendly fraud. Their refusal to document the issue is evidence you can submit.
- **For high-value items ($500+), consider requiring signed delivery + unboxing acknowledgment.** Some merchants include a card in the package: "Please inspect your order and contact us within 48 hours if anything is wrong." A customer who waited 60 days to complain looks less credible.
- **Track your "not as described" disputes by product/SKU.** If one product generates disproportionate disputes, fix the listing or fix the product — don't keep fighting the same battle.
- **The cardholder must attempt resolution with you first.** If they went straight to the bank without contacting you, say so explicitly in your response. This is a Mastercard requirement and undermines their filing.

---

## Urgency Essentials (When Deadline is <5 Days)

Focus on these in order:
1. Original product listing / description (screenshot or catalog page)
2. Customer communication logs (or evidence of no customer contact)
3. Proof of delivery to confirm receipt
4. Photos of the item before shipment (if available)
5. Return policy showing the cardholder had a resolution path

The "not as described" dispute is won on documentation quality. If you can show what you described, what you shipped, and that the customer never tried to resolve it with you — that's your strongest position.

---

## Narrative Template Structure

```
The cardholder claims the merchandise/service did not match the description
provided at the time of purchase. We respectfully dispute this claim based
on the following evidence:

**Transaction Details:**
- Order placed: [date]
- Items ordered: [description]
- Order total: [amount]
- Delivery address: [address]

**Product/Service Description:**
The item/service was listed as: [exact description from listing]
[Attach: screenshot of product listing at time of purchase]

**What Was Delivered:**
- Shipped: [date]
- Carrier: [carrier name]
- Tracking: [number]
- Delivery confirmed: [date]
[Attach: photos of item before shipment, packing documentation]

**Customer Communication:**
[If customer contacted merchant:]
The cardholder contacted us on [date] regarding [issue]. We responded
on [date] and offered [resolution — replacement, return, refund].
[Describe outcome of communication]

[If customer did NOT contact merchant:]
Our records show no communication from the cardholder regarding any
issue with this order prior to the chargeback filing. The cardholder
did not attempt to resolve this matter with us directly, as required
by Mastercard dispute guidelines.

**Return Policy:**
Our return policy, displayed at checkout and included in the order
confirmation email, allows returns within [X] days for any reason.
The cardholder did not initiate a return.
[Attach: screenshot of return policy]

**Additional Context:**
[Prior purchase history, quality control records, or other
supporting evidence]

Based on the evidence provided, the merchandise/service delivered matched
the description provided at the time of purchase. The cardholder had access
to our return process but did not utilize it. We respectfully request this
dispute be resolved in our favor.
```

---

## Key Differences from Visa 13.3

| Aspect | Visa 13.3 | Mastercard 4853 |
|--------|-----------|-----------------|
| Scope | Dedicated code for "Not as Described" | Umbrella code covering 7+ dispute sub-types |
| Response deadline | 30 days | 45 days |
| Filing window | 120 days (max 540) | 120 days (max 540) |
| Return waiting period | None specified | Issuer must wait 15 days if item was returned |
| Customer contact requirement | Recommended | Required — cardholder must attempt merchant resolution first |
| Subjectivity handling | Similar — favors cardholder | Similar — but "attempted resolution" requirement gives merchant slightly more leverage |
