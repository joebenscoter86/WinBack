# Highnote Dispute & Representment Investigation

**Research date:** March 26, 2026
**Sources:** Highnote internal Confluence (bay1.atlassian.net)

---

## Overview

When a merchant sends in a representment, Highnote's Disputes team acts as the issuer and arbiter. They review the merchant's evidence package against the cardholder's original claim and decide whether that evidence is compelling enough to invalidate the claim. If it is, the chargeback is reversed. If it isn't, the chargeback is upheld and the cardholder wins.

The Disputes team (Mitch Aranda, Disputes Manager; Amanda Evans, Senior Dispute Analyst) owns this end-to-end through Quavo (their dispute management platform), VROL for Visa cases, and MasterCom for Mastercard cases.

---

## The Four Dispute Families (Mastercard; largely mirrors Visa)

1. **Authorization** - disputes around whether a valid authorization existed
2. **Fraud** - unauthorized transaction claims
3. **Cardholder Dispute** - broad consumer category (not as described, not received, recurring cancellation, credit not processed, etc.)
4. **Point of Interaction Error** - processing errors like duplicate charges, paid by other means, incorrect amounts

---

## What Makes a Representment Win (Chargeback Reversed)

Evidence must be tailored to the specific reason code on the chargeback. A generic response won't hold up. Key criteria by dispute type:

### Product Not Received
- Tracking number with confirmed "delivered" status
- Signature confirmation from recipient
- Shipping confirmation tied to the cardholder's address on file

### Transaction Not Recognized / Fraud
- AVS (Address Verification Service) match results
- CVV match confirmation
- IP address of device that placed the order
- Customer account history showing prior transactions that establish the cardholder's involvement
- EMV chip compliance matters here: if the terminal was chip-capable and was used, liability stays with issuer. If the terminal didn't support chip but the card was chip-capable, liability shifts to the acquirer/merchant.

### Product Not as Described or Defective
- Customer communications (emails, chat logs) showing satisfaction with the product
- Evidence the cardholder never attempted to return per the merchant's stated return policy
- Documentation that the product actually matches the merchant's listing or description

### Credit Not Processed
- Proof that a refund was already issued (refund confirmation, transaction record)
- Copy of the return/refund policy the customer agreed to at time of purchase

### Authorization Disputes
- Clean authorization data (correct amount, non-expired, tied to the right account)
- Note: on Mastercard, a 10% currency conversion allowance applies. A charge within 10% of the authorized amount does not qualify for a chargeback on authorization grounds.

---

## What Makes a Representment Fail (Chargeback Upheld)

### Missing the deadline
Automatic loss. Merchants typically have 20-45 days to respond depending on the network. No exceptions.

### Evidence not matched to the reason code
The entire representment must address the specific reason code assigned. Submitting generic transaction records when the dispute is "product not received" does not satisfy the burden.

### Incomplete package
Before Highnote sees the evidence, the acquirer reviews it for completeness and formatting compliance with network rules. An incomplete submission gets bounced before it reaches Highnote's issuer review stage.

### Fraud disputes without verification data
If the merchant can't show that AVS, CVV, or device/IP data links the actual cardholder to the transaction, the representment is very weak. The cardholder's claim plus the absence of verification data generally favors the cardholder.

### Consumer dispute types (not as described, recurring cancellation, etc.)
If the cardholder has documentation showing they contacted the merchant and the merchant refused to remedy the issue, that satisfies the chargeback condition. The merchant's representment needs to directly refute that contact or show the issue was resolved. If they can't, the issuer sides with the cardholder.

---

## Regulatory Overlay: Reg E

For consumer prepaid programs (which many Highnote subscribers run), Regulation E (12 CFR 1005) governs alongside network rules. Key points:

- Reg E timelines and provisional credit obligations always take priority over network dispute timelines
- Provisional credit must be issued when a Reg E dispute is received and the investigation cannot be completed within required timelines (generally 10 business days)
- If the investigation resolves in the cardholder's favor, finalize the provisional credit
- If denied or the chargeback is lost, reverse the provisional credit and send a Reg E-compliant notice explaining the outcome
- Commercial/fleet programs not covered by consumer regs operate on pure network rules

---

## Chargeback Cycle: How Money Moves

Understanding this is useful context for explaining dispute outcomes to subscribers:

- **Initial chargeback:** Funds move to ICA (Highnote/issuer)
- **Representment:** Funds move back to the merchant if successful
- **Pre-arbitration:** Does not move money (dual message only, some codes)
- **Arbitration:** Does not move money; outcome determines final winner
- **Accepting the case:** Merchant moves money back to the processor
- **Withdrawing the case:** Funds move back to the merchant
- **Case ruling:** Funds move to either merchant or processor per ruling
- Fees related to chargebacks settle at month-end, not per event

---

## Mastercard Reason Code Reference (Partial)

| Dispute Type | Reason Code | Timing | Supporting Docs Required | Notes |
|---|---|---|---|---|
| Authorization not obtained | 4808 | 90 days from transaction | None | 10% currency conversion allowance does not qualify |
| Expired authorization / closed account | 4808 | 90 days from transaction | None | Some debt recovery transactions may be excluded |
| Multiple authorization requests (CNP declined, approved via stand-in) | 4808 | 90 days from transaction | None | |
| Goods/services not as described or defective | (Cardholder Dispute) | Varies | Cardholder correspondence | Cardholder must have attempted to resolve with merchant first |

---

## Internal Escalation Path

For any dispute outcome question, the escalation path is directly to the Disputes Operations team via #disputes (Slack) or disputes@highnote.com. The Disputes team is the final authority on dispute decisions and network compliance.

---

## Sources

- [Documents Recommended by Disputes Reason](https://bay1.atlassian.net/wiki/spaces/RISK/pages/998703216/Documents+Recommended+by+Disputes+Reason) (Risk Product space)
- [Acquiring: Merchant Chargeback](https://bay1.atlassian.net/wiki/spaces/PE/pages/3230072836/Acquiring+Merchant+Chargeback) (Product Engineering space)
- [Disputes Team Hub](https://bay1.atlassian.net/wiki/spaces/SUP/pages/3462627402/Disputes+Team+Hub) (Highnote Operations space)
- [Disputes Program Handling Hub](https://bay1.atlassian.net/wiki/spaces/DPHH/overview) (DPHH space)
- [Customer Support as a Product](https://bay1.atlassian.net/wiki/spaces/PE/pages/926384174/Customer+Support+as+a+Product) (Product Engineering space)
- [CT Payer Consumer Prepaid Program Overview and Dispute Handling Guidelines](https://bay1.atlassian.net/wiki/spaces/DPHH/pages/3547594852/CT+Payer+Consumer+Prepaid+Program+Overview+and+Dispute+Handling+Guidelines) (DPHH space)
