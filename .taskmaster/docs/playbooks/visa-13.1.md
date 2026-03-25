# Visa 13.1 — Merchandise / Services Not Received

> Draft playbook for Joe's review. Maps to PRD playbook schema.

## Metadata
- **Network:** Visa
- **Reason Code:** 13.1
- **Display Name:** Merchandise / Services Not Received
- **Legacy Code:** 30

---

## Description (Plain English)

The cardholder claims they paid for goods or services but never received them. This could mean a physical package never arrived, a digital product was never accessible, or a service was never performed. This is one of the most common dispute types and often one of the easiest to win — *if* you have delivery proof.

---

## Issuer Evaluation (What the Bank Looks At)

1. **Was there an agreed delivery date?** If yes, did the merchant meet it?
2. **Is there carrier confirmation of delivery?** Tracking number, delivery scan, signature
3. **Did the cardholder attempt to resolve with the merchant first?** (Required before filing)
4. **Filing window compliance:** 120 calendar days from transaction date or expected delivery date (max 540 days from transaction)
5. **For late delivery:** Did the cardholder wait at least 10 days after expected delivery before filing?
6. **If no delivery date specified:** At least 15 calendar days must pass before the cardholder can file

The issuer is primarily looking for **proof of delivery to the correct address**. If you have it, you win. If you don't, the evidence burden shifts heavily in the cardholder's favor.

---

## Evidence Checklist

### Mandatory Evidence
| Item | Required | Why It Matters |
|------|----------|----------------|
| Carrier tracking confirmation with delivery scan | **Yes** | This is the single most important piece of evidence. A tracking number showing "delivered" to the correct address wins most cases. |
| Delivery address verification (matches billing or shipping address on order) | **Yes** | Proves you shipped to the address the customer provided. |

### Strongly Recommended
| Item | Required | Why It Matters |
|------|----------|----------------|
| Signed delivery confirmation (for orders >$100) | Recommended | Signature proof eliminates "package stolen" claims. Visa gives extra weight to signed delivery. |
| Order confirmation showing agreed delivery date | Recommended | Establishes the timeline the bank will evaluate against. |
| Screenshot of order details (items, quantities, shipping method) | Recommended | Shows exactly what was ordered and how it was shipped. |
| Communication with customer about delivery (emails, chat logs) | Helpful | Shows you were responsive and proactive. |

### For Digital Goods / Services
| Item | Required | Why It Matters |
|------|----------|----------------|
| Access logs showing customer used the product/service | **Yes** | IP address, login timestamps, download confirmation. This IS your "delivery proof." |
| Email delivery confirmation (license key, download link sent) | **Yes** | Proves the digital good was delivered to the customer's email. |
| Terms of service / delivery terms accepted at checkout | Recommended | Establishes what "delivery" means for your product. |

---

## Common Mistakes

| Mistake | Explanation |
|---------|-------------|
| Processing payment before shipping | If you charge before the item ships, you have no delivery proof for the period between charge and shipment. The cardholder can file immediately. |
| No tracking on low-value orders | Merchants skip tracking to save $1-2 on shipping, then lose $50-200 disputes. Always use tracked shipping. |
| Shipping to an address different from what the customer provided | If the customer gave Address A and you shipped to Address B (even if B is "correct"), you lose. Ship to the address on file. |
| Assuming "shipped" = "delivered" | A tracking number showing "in transit" or "out for delivery" is NOT proof of delivery. You need the final delivery scan. |
| Missing the 30-day response window | You have 30 days to respond. Many merchants miss this deadline. Set a reminder. |
| Not requiring signature on high-value orders | For orders over $100, delivery confirmation without a signature is weak. The cardholder can claim the package was stolen. |

---

## Pro Tips

- **Always use tracked shipping with delivery confirmation.** This single practice wins most 13.1 disputes.
- **For orders over $100, require signature confirmation.** The extra $2-3 cost is insurance against a $100+ chargeback.
- **Save screenshots of carrier tracking pages** — carriers sometimes purge tracking data after 90-120 days, but the dispute window extends to 120+ days.
- **For digital goods, log IP address and timestamps** of first access. This is your equivalent of a delivery signature.
- **If the customer contacts you about non-delivery, respond immediately** and offer to reship or refund. A resolved complaint never becomes a chargeback.
- **Pre-shipment: Send shipping confirmation email with tracking number.** This proves the customer was informed of shipment.

---

## Urgency Essentials (When Deadline is <5 Days)

Focus on these in order:
1. Carrier tracking confirmation showing delivery
2. Delivery address matches order address
3. Order confirmation with item details
4. Any customer communication acknowledging receipt

Skip the nice-to-haves. Delivery proof is what wins this case.

---

## Narrative Template Structure

```
The cardholder claims merchandise/services were not received. However, our records
confirm delivery was completed as follows:

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
[Any relevant customer communications, access logs for digital goods,
or other supporting evidence]

Based on the carrier confirmation, the merchandise was delivered to the address
provided by the cardholder on [date]. We respectfully request this dispute be
resolved in our favor.
```
