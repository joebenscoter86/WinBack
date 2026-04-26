---
status: draft
linear: WIN-71 (rewrite per Stripe v1.1.0 review feedback)
last-updated: 2026-04-26
---

# WinBack — Stripe App Marketplace Listing (Draft)

This is the source-of-truth draft for the Stripe App Marketplace submission. Sections 1-6 are the customer-facing copy; sections 7-10 are internal scaffolding for the submission process.

Pricing source of truth: [.taskmaster/docs/pricing-strategy.md](../../.taskmaster/docs/pricing-strategy.md). If pricing changes there, update this file.

**Stripe v1.1.0 review feedback addressed:** the prior draft contained marketing-style language, unprovable claims (e.g., "10+ years of issuer experience"), and outcome promises ("win more chargebacks"). All sections below have been rewritten to be factual and descriptive of what the app does, not how well it works.

---

## 1. Listing title

**WinBack: Dispute response tools for Stripe merchants**

Stripe's listing title cap is 60 chars for the card view. Card-view short title:

**Short title:** `WinBack: Dispute response tools` (31 chars)

---

## 2. Lead line / tagline

**Reason-code-specific guidance for responding to payment disputes, with an AI-drafted response narrative you review and submit from your Stripe Dashboard.**

---

## 3. Short description (search result blurb, ~160 chars)

> WinBack provides reason-code-specific evidence guidance and AI-drafted dispute response narratives. Review and submit directly from your Stripe Dashboard.

---

## 4. Long description (listing page body)

### What WinBack does

WinBack is a dispute response tool that runs inside the Stripe Dashboard. For each open dispute, it surfaces the reason code (e.g. Visa 13.1, Mastercard 4853, "fraudulent," "product not received," "duplicate") and walks you through a checklist of evidence types relevant to that code. After you upload your evidence, the app uses Anthropic's Claude API to draft a merchant response narrative grounded in the files and facts you provided. You review and edit the draft before submitting it through Stripe's standard dispute response flow.

The app does not auto-submit or take actions on your behalf. Every submission is reviewed and approved by you.

### How it works

1. Open a dispute in the Stripe Dashboard. WinBack appears as a side panel.
2. The app identifies the reason code and shows the corresponding evidence checklist.
3. You upload supporting files (receipts, shipping confirmations, communication logs). Files are uploaded directly from your browser to Stripe's Files API. WinBack does not store the file contents on its servers.
4. The app generates a draft response narrative referencing the evidence you provided. Generated narratives are validated to remove references to evidence not actually present in your uploads.
5. You review and edit the draft, then submit through Stripe's dispute response flow.

### Data handling

- Evidence files are uploaded directly from your browser to Stripe via the Files API. WinBack stores only the returned file ID and metadata (filename, size, MIME type), never the file contents.
- Dispute metadata stored by WinBack: reason code, status, outcome, recovered amount, narrative drafts. No cardholder PCI data is stored.
- Customer information (names, emails, transaction details) flows through the app only as needed to generate the narrative; it is not retained beyond the active dispute record.

### Who it is for

Merchants on Stripe who handle payment disputes themselves and want a structured response process. The app is intended for active dispute response, not for portfolio management or chargeback prevention.

### What it is not

WinBack is not a fully-managed service. The app does not negotiate with issuers, contact cardholders, or submit responses without your review. Outcomes depend on the quality of the evidence you provide and the issuer's evaluation, which WinBack does not control.

---

## 5. Feature list (bullet form for listing UI)

- Reason-code-specific evidence checklists (Visa, Mastercard, American Express, Discover)
- AI-drafted response narrative grounded in your uploaded evidence, with reference validation
- Editable narrative review before submission
- Submission preview matching Stripe's dispute response format
- Dispute history view tracking status and outcomes per dispute
- Direct upload to Stripe Files API (no third-party file storage)
- Two billing options: pay-per-recovered ($0/month + 15% per recovered amount) or flat monthly ($79/month, no per-recovery fee)
- Native Stripe Dashboard integration

---

## 6. Pricing section

WinBack is billed through Stripe. Two plans:

### Pay-Per-Win — $0 monthly fee, 15% of recovered amount

- No monthly subscription. A 15% fee is charged only when a dispute is resolved in your favor and funds are returned.
- Charged via Stripe metered billing on a monthly cycle.

### Pro — $79/month flat

- Flat monthly subscription. No per-recovery fees.
- Annual option: $59/month billed annually ($708/year).

Merchants start on Pay-Per-Win. After the first dispute is resolved in your favor, the app surfaces a comparison of fees under each plan so you can choose what fits your dispute volume. Switching plans takes effect on the next billing cycle.

---

## 7. Support contact info

- **Legal entity:** JB Technology LLC (the publisher of record on the Stripe App Marketplace listing)
- **Public product name:** WinBack
- **Domain:** winbackpay.com (already owned)
- **Support email:** support@winbackpay.com
- **Help center:** https://winbackpay.com/help *(stub page acceptable for review submission, expand post-launch)*
- **Response SLA:** Within 1 business day for all support tickets during launch period
- **Founder contact (escalation):** joe@winbackpay.com

---

## 8. Screenshot shot list (capture after final UI lock)

Stripe requires high-quality screenshots that show the app in real use. Five screenshots, all captured at 2x resolution from the live Stripe Dashboard with the app installed in test mode.

| # | Screen | Caption (under image) | What must be visible |
|---|--------|------------------------|----------------------|
| 1 | Dispute list (home) | "Open disputes, ordered by response deadline." | At least 3 open disputes with reason codes and due dates |
| 2 | Evidence checklist | "Reason-code-specific evidence checklist." | Visa 13.1 or similar checklist with 4-6 items, some checked, examples expanded |
| 3 | AI narrative review | "Drafted response narrative, reviewed before submission." | Generated narrative in editable view, regenerate button, feedback chips visible |
| 4 | Dispute history | "History of disputes and outcomes." | Disputes table with reason codes, outcomes, recovered amounts |
| 5 | Pro upgrade prompt | "Compare plans after your first resolved dispute." | Post-win banner showing fee comparison under each plan |

**Capture checklist:**
- Use a populated test account with realistic dispute data (not lorem ipsum, not "Test Merchant").
- Mask any real card numbers, customer names, emails. Use plausible fake data.
- 2x resolution minimum (Retina).
- PNG, no JPEG compression artifacts.
- Crop tightly to the app surface; do not include the surrounding Stripe chrome unless it adds context.
- Light mode (Stripe's default for marketplace screenshots).

---

## 9. Stripe submission requirements checklist

Pre-submission gates per Stripe App Marketplace docs. Verify each before clicking submit.

- [ ] App passes Stripe's automated review checks (run `stripe apps validate` from `stripe-app/`)
- [ ] All listed permissions are actually used by the app (no over-requested scopes)
- [ ] Privacy policy URL live and accessible
- [ ] Terms of service URL live and accessible
- [ ] Support email monitored and responsive
- [ ] App functions correctly in both test and live mode
- [ ] No console errors in the Stripe Dashboard with the app installed
- [ ] Auth middleware verified on every backend route (WIN-31)
- [ ] Evidence submission idempotency tested (WIN-20)
- [ ] Webhook signature verification in place
- [ ] Billing flow verified end-to-end (WIN-72 follow-ups + verify-billing.ts pass)
- [ ] Listing copy reviewed for em dashes (none allowed), no marketing-style language, no unprovable claims, no comparative pricing claims
- [ ] Manifest icon and listing icon match byte-for-byte
- [ ] Pricing in listing matches `pricing-strategy.md` exactly
- [ ] All 5 screenshots captured at 2x, masked, and uploaded
- [ ] Video walkthrough recorded (optional but increases approval odds; 60-90s screen recording showing one full dispute flow)

---

## 10. Open questions before submission

- **Trademark (DECIDED 2026-04-20, accepting risk):** A direct USPTO TESS search surfaced serial **99265618**, wordmark **WINBACK**, Class 042, filed 2025-07-03 by an unrelated applicant for AI-as-a-service software for Email and Customer retention. Application is Live/Pending but has been under suspension via office action since 2025-11-28 (over 4 months with no movement by the time of this decision). Joe has decided to move forward with the WinBack brand based on: (1) the other applicant's year-plus filing without securing registration, (2) the suspension signal, and (3) the strong product differentiation argument between AI customer-retention/email software and AI chargeback-recovery software. If a conflict materializes later, fallback path is to rebrand to WinBackPay (which also matches the owned domain) or file a narrow Class 036 (financial services) application emphasizing the chargeback-recovery distinction. No attorney opinion obtained; risk is accepted knowingly. Do not reopen this decision in future sessions without new information (e.g., the other mark advancing to registration, or a cease-and-desist letter).
- **Support inbox:** Gmail forwarding to joe@winbackpay.com, or dedicated helpdesk (e.g., Plain, Help Scout) before launch?
- **Privacy policy + ToS:** stub pages need to be drafted and hosted on winbackpay.com before submit. Acceptable for review but should be lawyer-reviewed before public launch.
- **Demo video:** record now or skip for v1? Recording recommended; reviewers can evaluate the flow without installing.
- **Review timeline:** Stripe marketplace review is 4-8 weeks. Submission target date?
