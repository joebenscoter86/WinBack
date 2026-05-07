---
status: submitted-draft
linear: WIN-71 (rewrite per Stripe v1.1.0 review feedback)
last-updated: 2026-04-27
submission-version: 1.1.6
---

# WinBack — Stripe App Marketplace Listing

This is the source-of-truth for the Stripe App Marketplace submission. Sections 1-6 reflect what is currently entered in the Stripe Apps publish form (Step 1 of 3) for v1.1.6. Sections 7-10 are internal scaffolding for the submission process.

Section-to-form-field mapping (Stripe Apps publish form, Step 1):
- Section 1 → App name (locked at "WinBack" in the form)
- Section 2 → **Subtitle** (short phrase shown on the listing tile)
- Section 3 → not a Stripe form field. Kept here as the canonical search/SEO blurb if used elsewhere.
- Section 4 → **About** (paragraph shown on the listing page). The current Stripe form only accepts a single paragraph here, not the multi-section structure originally drafted; the multi-section text is preserved as background reference but only the "About paragraph" subsection below is what appears on the listing.
- Section 5 → **Features** (3 cards on the listing, each with Title + Description + 1600x800 image)
- Section 6 → not a Stripe form field directly. Stripe takes a single Pricing-page URL; the detailed pricing copy below feeds winbackpay.com/#pricing.

Pricing source of truth: [.taskmaster/docs/pricing-strategy.md](../../.taskmaster/docs/pricing-strategy.md). If pricing changes there, update this file.

**Stripe v1.1.0 review feedback addressed:** the prior draft contained marketing-style language, unprovable claims (e.g., "10+ years of issuer experience"), and outcome promises ("win more chargebacks"). All sections below stay factual and descriptive of what the app does, not how well it works.

---

## 1. Listing title

**WinBack: Dispute response tools for Stripe merchants**

Stripe's listing title cap is 60 chars for the card view. Card-view short title:

**Short title:** `WinBack: Dispute response tools` (31 chars)

---

## 2. Subtitle (Stripe form field: "Subtitle")

**Step-by-step playbooks and AI-drafted narratives for responding to payment disputes**

(No trailing period to match Stripe's example formatting. "Disputes" rather than "chargebacks" because the app handles inquiries as well as chargebacks.)

---

## 3. Short description (search result blurb, ~160 chars)

> WinBack provides reason-code-specific evidence guidance and AI-drafted dispute response narratives. Review and submit directly from your Stripe Dashboard.

---

## 4. About (Stripe form field: "About")

### About paragraph (currently in the Stripe form)

> WinBack is built for Stripe merchants who respond to their own disputes. Open a dispute and the app surfaces the reason code, walks you through the evidence types issuers expect for that code, and uses Anthropic's Claude API to draft a response narrative built from the files and facts you uploaded. You review and edit every draft before it goes to Stripe. WinBack never auto-submits, and evidence files are never stored on our servers. They upload directly from your browser to Stripe.

### Background / extended description (not in the form, kept as reference)

The longer multi-section text below was the original draft. The Stripe Apps publish form only takes a single About paragraph (above), but this material may be useful for the marketing site, FAQ, or future Stripe field changes. Preserved as-is for reference.

#### What WinBack does

WinBack is a dispute response tool that runs inside the Stripe Dashboard. For each open dispute, it surfaces the reason code (e.g. Visa 13.1, Mastercard 4853, "fraudulent," "product not received," "duplicate") and walks you through a checklist of evidence types relevant to that code. After you upload your evidence, the app uses Anthropic's Claude API to draft a merchant response narrative grounded in the files and facts you provided. You review and edit the draft before submitting it through Stripe's standard dispute response flow.

The app does not auto-submit or take actions on your behalf. Every submission is reviewed and approved by you.

#### How it works

1. Open a dispute in the Stripe Dashboard. WinBack appears as a side panel.
2. The app identifies the reason code and shows the corresponding evidence checklist.
3. You upload supporting files (receipts, shipping confirmations, communication logs). Files are uploaded directly from your browser to Stripe's Files API. WinBack does not store the file contents on its servers.
4. The app generates a draft response narrative referencing the evidence you provided. Generated narratives are validated to remove references to evidence not actually present in your uploads.
5. You review and edit the draft, then submit through Stripe's dispute response flow.

#### Data handling

- Evidence files are uploaded directly from your browser to Stripe via the Files API. WinBack stores only the returned file ID and metadata (filename, size, MIME type), never the file contents.
- Dispute metadata stored by WinBack: reason code, status, outcome, recovered amount, narrative drafts. No cardholder PCI data is stored.
- Customer information (names, emails, transaction details) flows through the app only as needed to generate the narrative; it is not retained beyond the active dispute record.

#### Who it is for

Merchants on Stripe who handle payment disputes themselves and want a structured response process. The app is intended for active dispute response, not for portfolio management or chargeback prevention.

#### What it is not

WinBack is not a fully-managed service. The app does not negotiate with issuers, contact cardholders, or submit responses without your review. Outcomes depend on the quality of the evidence you provide and the issuer's evaluation, which WinBack does not control.

---

## 5. Features (Stripe form field: "Features", 3 cards)

The Stripe Apps publish form takes 3 features, each a Title + Description + 1600x800 image. Below is what is currently entered in the form for v1.1.6.

### Feature 1

**Title:** Reason-code-specific evidence checklists

**Description:**
> Open a Visa 13.1 product-not-received dispute and you see the checklist for Visa 13.1, including the specific fields issuers look for under that reason. Each item explains what to upload and where to find it, and WinBack combines all evidence into Stripe's submission categories for you.

**Image:** `stripe-app/src/product screens/feature evidence 1600x800.png`

### Feature 2

**Title:** AI-drafted response narratives

**Description:**
> Upload your evidence and the app drafts the response narrative for you using Anthropic's Claude API. The draft references your actual files, so what you read is what's true about your case. You can edit every word before the response goes to Stripe.

**Image:** `stripe-app/src/product screens/feature narrative 1600x800.png`

### Feature 3

**Title:** Win rate and pattern insights

**Description:**
> See your dispute win rate at a glance, broken out by reason code, so you know where your responses are landing and where they are not. When three or more disputes share a reason in the last 90 days, WinBack surfaces the pattern with prevention steps you can apply in your own checkout flow.

**Image:** `stripe-app/src/product screens/feature dispute trends 1600x800.png` (generated 2026-04-27)

### Capabilities not surfaced as Features (only 3 cards allowed)

These factual capabilities are part of the app but did not make the cut for the 3-card Features section:
- Inquiry vs chargeback stage detection with stage-appropriate copy and escalation handling
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

Merchants start on Pay-Per-Win. After the first dispute is resolved in your favor, the app surfaces a comparison of fees under each plan so you can choose what fits your dispute volume. Switching plans takes effect on the next billing cycle.

---

## 6a. What's new in this version (v1.1.6, resubmission)

For the "release notes" / "what's new" field on the marketplace submission. Reviewer-focused. What changed since v1.1.0 (the prior submission).

- Listing copy and About-tab copy rewritten per the v1.1.0 review feedback to remove marketing-style language and unprovable claims.
- Marketplace icon updated to match the listing.
- Inquiry vs chargeback stage handling: dispute cards now show an "Inquiry" pill, urgency copy is stage-appropriate, and inquiry-to-chargeback escalations are detected on webhook with a banner shown to the merchant.
- New Insights view: overall and per-reason dispute win rate across closed disputes, plus pattern alerts when three or more disputes share a reason in the last 90 days.
- Subscription management: merchants can now manage their plan via Stripe's Customer Portal from the app's Settings tab.
- Pay-per-recovered tier now collects a payment method via Stripe Setup Checkout before the merchant submits their first dispute response, so success-fee billing has a card on file.
- Various dashboard fixes: expired disputes are now read-only and sorted to the bottom, status badges no longer overflow the dispute card on inquiry escalations, and a "New" badge on the dispute list clears the first time the merchant opens the dispute in WinBack.

---

## 6b. Test plan and reviewer contacts (Stripe form Step 2)

Step 2 of the publish flow ("Submit for review") is what the Stripe reviewer reads. Captures the user journeys they walk through plus the contact channels Stripe uses for review communication. Not the same as Section 7 below, which is the public-facing support info on the listing itself.

### Testing credentials

- **App requires sign-in:** No (checkbox checked: "This app doesn't require users to sign in"). WinBack authenticates the merchant via the Stripe App signature passed by the iframe. There is no separate WinBack account.

### User journeys (3 entered)

#### User journey 1 — Respond to a payment dispute end-to-end

1. Install WinBack on a Stripe test account.
2. Generate a test dispute by running `stripe trigger charge.dispute.created` from the Stripe CLI.
3. Open the WinBack drawer from any page in the Stripe Dashboard. The new dispute appears in the "Disputes" tab with a "New" badge and "Needs Response" status.
4. Click the dispute to open the four-step wizard: Review, Evidence, Narrative, Submit.
5. On the Review step, confirm the dispute reason code, amount, and customer details are populated.
6. On the Evidence step, upload any sample PDF or image as a receipt. The file uploads directly to Stripe via the Files API; WinBack stores only the returned file ID and metadata.
7. On the Narrative step, click "Generate narrative." After approximately 5 to 15 seconds, an AI-drafted narrative appears. The merchant can edit it or click Regenerate to produce a new draft.
8. On the Submit step, review the response summary and click "Submit response." A confirmation banner appears once Stripe accepts the submission.

#### User journey 2 — Review dispute win rate and patterns in the Insights tab

1. Open the WinBack drawer from the Stripe Dashboard and click the "Insights" tab.
2. With at least one closed dispute in the test account, the Insights view shows the merchant's overall and per-reason win rate. To populate this in test mode, run `stripe trigger charge.dispute.closed` after submitting a response in Journey 1.
3. The "By reason" section breaks down won/lost counts for each reason code.
4. When three or more disputes share the same reason in the last 90 days, a "Patterns to watch" alert appears below with a prevention tip specific to that reason.

#### User journey 3 — Add a payment method for the Pay-Per-Win tier

1. After installing WinBack, open the Settings tab from the app drawer.
2. The Settings tab shows the current billing tier (Pay-Per-Win by default) and a banner prompting the merchant to add a payment method before submitting their first dispute response.
3. Click "Add payment method." A Stripe-hosted Setup Checkout opens in a new tab.
4. Complete the Setup Checkout using Stripe's test card 4242 4242 4242 4242, any future expiration date, and any 3-digit CVC.
5. The WinBack Settings tab updates to reflect the saved card on file. The merchant can now submit dispute responses, and the 15% success fee will be metered against this card on disputes that close as won.

### Reviewer contact information

- **Follow up email:** joe@winbackpay.com
- **Security incident email:** joe@winbackpay.com
- **Security phone:** +1 (805) 570-5829

---

## 7. Support contact info (public-facing, Stripe form Step 1)

These fields appear on the marketplace listing and are visible to merchants who install the app.

- **Legal entity:** JB Technology LLC (the publisher of record on the Stripe App Marketplace listing)
- **Public product name:** WinBack
- **Domain:** winbackpay.com (already owned)
- **Support email:** support@winbackpay.com
- **Support site (Stripe form: "Support site"):** https://winbackpay.com
- **Help center:** https://winbackpay.com/help *(stub page acceptable for review submission, expand post-launch)*
- **Response SLA:** Within 1 business day for all support tickets during launch period
- **Founder contact (escalation):** joe@winbackpay.com (also used as the Step 2 review/security contact, see 6b above)

---

## 8. Screenshot shot list

Stripe requires high-quality screenshots that show the app in real use. The 3 Feature images on the listing each take a 1600x800 PNG. Files live under `stripe-app/src/product screens/`.

| # | Used as | File | Status |
|---|---------|------|--------|
| 1 | Feature 1 image (Reason-code-specific evidence checklists) | `feature evidence 1600x800.png` | Uploaded to Stripe form |
| 2 | Feature 2 image (AI-drafted response narratives) | `feature narrative 1600x800.png` | Uploaded to Stripe form |
| 3 | Feature 3 image (Win rate and pattern insights) | `feature dispute trends 1600x800.png` | Generated 2026-04-27, uploaded to Stripe form |
| 4 | Reserved (legacy/extra) | `feature submission 1600x800.png` | In repo, not currently mapped to a Feature card |

Source single-page screenshots (raw, used to compose the 1600x800 feature images) also live in `stripe-app/src/product screens/`: `evidence 1.png`, `evidence screen 2.png`, `narrative 1.png`, `narrative 2.png`, `submission 1.png`, `submission 2.png`, `dispute trends.png`.

**Capture checklist (for any future screenshot replacements):**
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
- [ ] All 3 Feature images (1600x800 PNG) captured at 2x, masked, and uploaded
- [ ] Video walkthrough recorded (optional but increases approval odds; 60-90s screen recording showing one full dispute flow)

---

## 10. Open questions before submission

- **Trademark (DECIDED 2026-04-20, accepting risk):** A direct USPTO TESS search surfaced serial **99265618**, wordmark **WINBACK**, Class 042, filed 2025-07-03 by an unrelated applicant for AI-as-a-service software for Email and Customer retention. Application is Live/Pending but has been under suspension via office action since 2025-11-28 (over 4 months with no movement by the time of this decision). Joe has decided to move forward with the WinBack brand based on: (1) the other applicant's year-plus filing without securing registration, (2) the suspension signal, and (3) the strong product differentiation argument between AI customer-retention/email software and AI chargeback-recovery software. If a conflict materializes later, fallback path is to rebrand to WinBackPay (which also matches the owned domain) or file a narrow Class 036 (financial services) application emphasizing the chargeback-recovery distinction. No attorney opinion obtained; risk is accepted knowingly. Do not reopen this decision in future sessions without new information (e.g., the other mark advancing to registration, or a cease-and-desist letter).
- **Support inbox:** Gmail forwarding to joe@winbackpay.com, or dedicated helpdesk (e.g., Plain, Help Scout) before launch?
- **Privacy policy + ToS:** stub pages need to be drafted and hosted on winbackpay.com before submit. Acceptable for review but should be lawyer-reviewed before public launch.
- **Demo video:** record now or skip for v1? Recording recommended; reviewers can evaluate the flow without installing.
- **Review timeline:** Stripe marketplace review is 4-8 weeks. Submission target date?
