# Visa 10.4 — Other Fraud: Card-Absent Environment

> Draft playbook for Joe's review. Maps to PRD playbook schema.

## Metadata
- **Network:** Visa
- **Reason Code:** 10.4
- **Display Name:** Fraud — Card Not Present
- **Legacy Code:** 83

---

## Description (Plain English)

The cardholder claims they didn't authorize a card-not-present transaction (online, phone, or mail order). This is either **true fraud** (someone stole the card and used it) or **friendly fraud** (the cardholder made the purchase but claims they didn't). This is the hardest dispute type to win because the burden of proof is entirely on the merchant — in a CNP environment, you can't prove the cardholder was physically present.

The good news: **Visa Compelling Evidence 3.0** (CE3.0) gives merchants a powerful new tool. If you can show the same cardholder made previous undisputed purchases from the same device/IP, Visa presumes the disputed transaction is also legitimate.

---

## Issuer Evaluation (What the Bank Looks At)

1. **Was the transaction authenticated?** 3D Secure / Visa Secure shifts liability to the issuer. If you used it, this dispute shouldn't exist.
2. **Was AVS (Address Verification) used?** Did the billing address match?
3. **Was CVV2 verified?** Proves the cardholder (or someone with the physical card) entered the security code.
4. **Does the billing descriptor match?** Can the cardholder recognize your business name on their statement?
5. **Is there a pattern of legitimate purchases?** CE3.0 lets you prove this.
6. **Filing window:** 120 calendar days from transaction processing date.

The issuer's default assumption is that the cardholder is telling the truth. Your job is to present enough evidence to shift that assumption. Authentication (3D Secure) is the strongest defense; CE3.0 is second.

---

## Evidence Checklist

### Mandatory Evidence
| Item | Required | Why It Matters |
|------|----------|----------------|
| Transaction authorization record | **Yes** | Proves the transaction was properly authorized through the payment network. |
| AVS (Address Verification) result | **Yes** | Shows you verified the billing address. A match strengthens your case significantly. |
| CVV2 verification result | **Yes** | Proves the person had the physical card (or its details). |

### Compelling Evidence 3.0 (Strongest Defense)
| Item | Required | Why It Matters |
|------|----------|----------------|
| Two prior undisputed transactions from same cardholder | **CE3.0** | Must be 120-365 days older than the disputed transaction, undisputed, and not reported as fraud. |
| IP address match across all 3 transactions | **CE3.0** | One of: IP address, device ID, or device fingerprint must match across disputed + 2 historical transactions. |
| Second matching data element | **CE3.0** | In addition to IP/device, one more must match: user account ID, shipping address, or device ID/fingerprint. |

### Strongly Recommended
| Item | Required | Why It Matters |
|------|----------|----------------|
| 3D Secure / Visa Secure authentication proof | Recommended | If you used 3D Secure, liability shifts to the issuer. This should prevent the dispute entirely. |
| Delivery confirmation to cardholder's address | Recommended | If the item was delivered to the cardholder's verified address, it weakens the fraud claim. |
| Customer account details (account creation date, purchase history) | Recommended | An established account with purchase history suggests the cardholder is the buyer. |
| Device fingerprint / IP address of the transaction | Recommended | Even without CE3.0, showing the IP matches the cardholder's geography helps. |
| Billing descriptor screenshot | Helpful | Proves your business name is clearly identifiable on the statement. |
| Communication with cardholder (order confirmation emails opened/clicked) | Helpful | If the cardholder opened the order confirmation email, they knew about the purchase. |

---

## Compelling Evidence 3.0 — Deep Dive

CE3.0 is specifically for reason code 10.4 and is the most powerful tool against friendly fraud.

### Requirements
1. **Two historical transactions** from the same card/cardholder
2. **Age:** Between 120 and 365 days before the disputed transaction
3. **Clean history:** Both must be undisputed and not flagged as fraud
4. **Matching elements (at least 2 across all 3 transactions):**
   - **One MUST be:** IP address OR device ID/fingerprint
   - **Plus one more of:** User account ID, shipping address, device ID/fingerprint
5. **Billing descriptor:** First 6 characters must be identical across all transactions

### What CE3.0 Does
When CE3.0 criteria are met, Visa treats it as a **liability shift** — the issuer bears the liability, similar to 3D Secure authentication. This is extremely powerful.

### How to Prepare
- **Start collecting now:** IP addresses, device fingerprints, and user account IDs on every transaction
- **Retain data for 13+ months** (365 days + buffer)
- **Keep billing descriptors consistent** — changing your descriptor breaks CE3.0 eligibility
- **Use a fraud tool that captures device fingerprints** (Stripe Radar does this)

---

## Common Mistakes

| Mistake | Explanation |
|---------|-------------|
| Not using 3D Secure | If you authenticate with 3D Secure, liability shifts to the issuer and you shouldn't even get these disputes. Enable it. |
| Not collecting IP addresses and device data | Without this data, you can't use CE3.0 — your strongest defense. Start logging now. |
| Unclear billing descriptor | If "JKB TECH LLC" shows on the statement but your store is "WinBack," the cardholder genuinely won't recognize the charge. Use a recognizable descriptor. |
| Skipping AVS and CVV checks | These are free verification tools. Not using them tells the bank you didn't try to verify the cardholder. |
| Not retaining transaction data long enough | CE3.0 requires transactions from 120-365 days ago. If you purge data after 90 days, you lose this defense. |
| Treating all 10.4 disputes the same | True fraud and friendly fraud require different strategies. If the shipping address is in a different country from the cardholder, it might be true fraud — refund instead of fighting. |

---

## Pro Tips

- **Enable 3D Secure / Visa Secure on all transactions.** This is the #1 defense. Liability shifts to the issuer, and most 10.4 disputes won't even reach you.
- **Stripe Radar captures device fingerprints automatically.** Make sure it's enabled — this data is gold for CE3.0.
- **Build a CE3.0 evidence pipeline:** Log IP, device fingerprint, user ID, and shipping address on every transaction. Store for 13+ months. When a 10.4 dispute hits, query for matching historical transactions automatically.
- **Check if the delivery address matches the billing address.** If it does and you have delivery confirmation, the fraud claim is very weak — why would a fraudster ship to the real cardholder's address?
- **Look at the email address.** If the account email matches the cardholder's name and has order history, include this context.
- **For true fraud (mismatched addresses, foreign IPs, new account):** Consider whether fighting is worth it. If the transaction looks genuinely fraudulent, a refund is cheaper than the dispute fee + time.

---

## Urgency Essentials (When Deadline is <5 Days)

Focus on these in order:
1. 3D Secure authentication proof (if used — this alone wins)
2. AVS and CVV2 verification results
3. CE3.0 package: 2 historical transactions + matching IP/device data
4. Delivery confirmation to verified address
5. Customer account history showing prior purchases

---

## Narrative Template Structure

```
The cardholder claims this transaction was unauthorized. Our records indicate
this is a legitimate transaction by the cardholder based on the following:

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
[If applicable]:
The cardholder has made prior undisputed purchases from our store using the
same payment credentials and device:

| Transaction | Date | Amount | IP Address | Device ID | Status |
|------------|------|--------|------------|-----------|--------|
| Disputed    | [date] | [amt] | [IP] | [device] | Disputed |
| Historical 1 | [date] | [amt] | [IP] | [device] | Undisputed |
| Historical 2 | [date] | [amt] | [IP] | [device] | Undisputed |

Both historical transactions are between 120-365 days before the disputed
transaction, undisputed, and share matching IP address and [second element]
with the disputed transaction.

**Delivery:**
- Shipped to: [address]
- Tracking: [number]
- Delivered: [date]
- Address matches billing: [Yes/No]

**Customer Account:**
- Account created: [date]
- Total prior orders: [count]
- Account email: [email]

Based on the authentication data, matching purchase history, and delivery to
the cardholder's verified address, we believe this transaction was authorized
by the cardholder. We respectfully request this dispute be resolved in our favor.
```
