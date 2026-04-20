---
status: draft
linear: WIN-28
last-updated: 2026-04-19
---

# WinBack — Stripe App Marketplace Listing (Draft)

This is the source-of-truth draft for the Stripe App Marketplace submission. Copy is final-ready; screenshots are specced as a shot list and captured in a follow-up step once the UI is locked.

Pricing source of truth: [.taskmaster/docs/pricing-strategy.md](../../.taskmaster/docs/pricing-strategy.md). If pricing changes there, update this file.

---

## 1. Listing title

**WinBack: Win More Chargebacks — 15% of what you recover, or $79/month flat**

Character budget: Stripe's listing title cap is 60 chars for the card view. The full title above is for the listing page; the short title (card view) is:

**Short title:** `WinBack — Win Chargebacks. Keep More.` (38 chars)

---

## 2. Lead line / tagline

**Stop giving Stripe 30% of your recovered disputes. We charge half that — or a flat monthly fee, and you keep everything.**

Alt (no em dash, per house style):

**Stop giving Stripe 30% of your recovered disputes. We charge half that, or a flat monthly fee and you keep everything.**

Use the alt version. Em dashes are banned in WinBack copy.

---

## 3. Short description (search result blurb, ~160 chars)

> Guided dispute playbooks built from 10+ years of issuer and payments experience. Win more chargebacks, keep more of what you recover. Pay per win, or go flat-rate.

---

## 4. Long description (listing page body)

### What WinBack does

WinBack walks you through every chargeback the way an expert would. Each dispute reason code has its own playbook, built from 10+ years of payments experience, telling you exactly which evidence to gather and how to frame it. AI drafts the merchant narrative for you. You review, edit, and submit in minutes.

This is not an automated black box. You stay in control of every submission. We just make sure you do not lose disputes you should have won.

### Why merchants pick WinBack

- **Half the price of Stripe Smart Disputes.** Stripe takes 30% of what you recover. We take 15%. Or skip the percentage entirely with a flat monthly plan.
- **You keep control.** Every piece of evidence and every word of the narrative is shown to you before submission. Nothing goes to the issuer without your approval.
- **Reason-code playbooks.** Visa 13.1, MC 4853, "product not received," "fraudulent," "duplicate" — each has its own evidence checklist and winning-argument template.
- **AI narrative, grounded in your evidence.** Claude drafts the response using only the files and facts you uploaded. We strip any reference the AI tries to fabricate.
- **Your evidence never touches our servers.** Files go straight from your browser to Stripe. We only keep dispute metadata (reason code, status, win/loss) so we can show you your history and win rate. No customer files, no receipts, no shipping docs stored on our side.

### Who it's for

Small and mid-size merchants on Stripe who lose disputes because the response process is confusing, time-consuming, or both. If you are giving up on disputes under $200 because they are not worth your time, WinBack is for you.

### What it's not

Not a fully-managed service. Not "set it and forget it." We empower you to win disputes yourself, faster, with better evidence. You learn the patterns over time. The merchant who has run 10 disputes through WinBack is a better merchant.

---

## 5. Feature list (bullet form for listing UI)

- Reason-code-specific evidence playbooks (Visa, Mastercard, Amex, Discover)
- AI-generated merchant narrative grounded in your uploaded evidence
- Step-by-step evidence checklist with examples for every reason code
- Win-rate dashboard tracking your performance over time
- Flat-fee plan available — no percentage taken from your recoveries
- Evidence files never stored on our servers (uploaded directly to Stripe)
- Native Stripe Dashboard integration (nothing to install outside Stripe)
- Submission preview showing exactly what Stripe will see before you submit

---

## 6. Pricing section

WinBack offers two plans. Both are billed through Stripe.

### Pay-Per-Win — $0/month + 15% of recovered amount

- No monthly fee. No charge unless you win.
- Half the price of Stripe Smart Disputes (30%).
- Best for merchants with occasional disputes who want to try WinBack risk-free.

### Pro — $79/month flat

- Unlimited disputes. Zero success fee. Keep 100% of what you recover.
- Annual option: $59/month billed annually ($708/year).
- Pays for itself after roughly one to two recovered disputes per month.
- Best for merchants with recurring chargebacks who want predictable cost.

You start on Pay-Per-Win. After your first win, the app shows you what Pro would have saved you. Upgrade in one click whenever the math makes sense.

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
| 1 | Dispute list (home) | "Every open dispute, prioritized by deadline." | At least 3 open disputes with reason codes, due dates, "New" badges, win-rate header |
| 2 | Evidence checklist | "Reason-code playbooks tell you exactly what evidence wins." | Visa 13.1 or similar checklist with 4-6 items, some checked, examples expanded |
| 3 | AI narrative review | "AI drafts the merchant response. You review every word." | Generated narrative in editable view, regenerate button, feedback chips visible |
| 4 | Win-rate dashboard | "Track your performance and see what's working." | Win rate %, disputes won/lost, recovered $ total, trend over time |
| 5 | Pro upgrade prompt | "Upgrade to flat-fee Pro after your first win." | Post-win modal/banner showing "$X saved at 15%, $0 saved on Pro" math |

**Capture checklist:**
- Use a populated test account with realistic dispute data (not lorem ipsum, not "Test Merchant").
- Mask any real card numbers, customer names, emails. Use plausible fake data.
- 2x resolution minimum (Retina).
- PNG, no JPEG compression artifacts.
- Crop tightly to the app surface — do not include the surrounding Stripe chrome unless it adds context.
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
- [ ] Listing copy reviewed for em dashes (none allowed) and brand consistency ("WinBack", never "Dispute Buddy" or "Win Back")
- [ ] Pricing in listing matches `pricing-strategy.md` exactly
- [ ] All 5 screenshots captured at 2x, masked, and uploaded
- [ ] Video walkthrough recorded (optional but increases approval odds — 60-90s screen recording showing one full dispute flow)

---

## 10. Open questions before submission

- **Trademark (DECIDED 2026-04-20, accepting risk):** A direct USPTO TESS search surfaced serial **99265618**, wordmark **WINBACK**, Class 042, filed 2025-07-03 by an unrelated applicant for AI-as-a-service software for Email and Customer retention. Application is Live/Pending but has been under suspension via office action since 2025-11-28 (over 4 months with no movement by the time of this decision). Joe has decided to move forward with the WinBack brand based on: (1) the other applicant's year-plus filing without securing registration, (2) the suspension signal, and (3) the strong product differentiation argument between AI customer-retention/email software and AI chargeback-recovery software. If a conflict materializes later, fallback path is to rebrand to WinBackPay (which also matches the owned domain) or file a narrow Class 036 (financial services) application emphasizing the chargeback-recovery distinction. No attorney opinion obtained; risk is accepted knowingly. Do not reopen this decision in future sessions without new information (e.g., the other mark advancing to registration, or a cease-and-desist letter).
- **Support inbox:** Gmail forwarding to joe@winbackpay.com, or dedicated helpdesk (e.g., Plain, Help Scout) before launch?
- **Privacy policy + ToS:** stub pages need to be drafted and hosted on winbackpay.com before submit. Acceptable for review but should be lawyer-reviewed before public launch.
- **Demo video:** record now or skip for v1? Strongly recommend recording — Stripe reviewers approve apps faster when they can see the flow without installing.
- **Review timeline:** Stripe marketplace review is 4-8 weeks. Submission target date?
