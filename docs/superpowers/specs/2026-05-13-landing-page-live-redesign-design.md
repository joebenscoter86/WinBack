---
status: draft
date: 2026-05-13
topic: landing-page-live-redesign
related: docs/superpowers/specs/2026-03-25-landing-page-waitlist-design.md
---

# Landing Page: Live Launch Redesign + SEO Pass

## Context

WinBack was published live on the Stripe App Marketplace on 2026-05-11 at `https://marketplace.stripe.com/apps/winback`. The marketing page at `winbackpay.com` (served from [backend/app/page.tsx](backend/app/page.tsx)) still reads as a pre-launch waitlist: status badge says "Coming soon in Stripe Marketplace," every CTA is a `<WaitlistForm />` POSTing to `/api/waitlist`, and the FinalCTA paragraph still invites visitors to "join the waitlist."

This spec covers the redesign to (a) flip the page from "waitlist for launch" to "install now," (b) add a new walkthrough section showing what the live product looks like inside the Stripe Dashboard, and (c) fold in a high-leverage SEO pass while we are already touching the file.

The marketing site lives at the root of the Next.js backend in [backend/app/page.tsx](backend/app/page.tsx); there is no separate marketing repo. Backend pushes auto-deploy to Vercel prod, which serves `winbackpay.com`.

## Goals

1. Make it unambiguous within the first viewport that WinBack is live in the Stripe App Marketplace and installable today.
2. Replace every waitlist CTA with a path that lands the visitor on `marketplace.stripe.com/apps/winback`.
3. Show what the product actually looks like inside the Stripe Dashboard so visitors can self-qualify before clicking out.
4. Preserve the waitlist form as a low-key fallback for visitors without a Stripe account, but stop letting it dominate the page.
5. Address the high-leverage on-page SEO debt (metadata, structured data, FAQ, llms.txt, semantic HTML) in the same change.

## Non-Goals

- Wholesale visual redesign or new design system. The existing dark theme, tonal layering, and color tokens stay.
- New backend routes or schema changes. No new database tables, env vars, or API endpoints.
- Removing the `/api/waitlist` route, the Resend welcome email, or the Turnstile rate-limit infrastructure. The form is demoted, not deleted.
- Blog, programmatic SEO landing pages, educational content, or backlink campaigns. Separate efforts.
- Embedded demo video. Future swap path, not in this PR.
- Reworking the privacy or terms pages.

## Page Layout (top to bottom)

The order moved during spec review: walkthrough now lands before pricing/comparison, so the visitor sees the product before being asked to weigh a price. Codex flagged the original "Pricing first" order as a conversion hole.

| Section | State | Change |
|---|---|---|
| Navbar | Existing | CTA flips from "Join Waitlist" anchor to "Install from Stripe Marketplace" external link |
| Hero | Existing | Status badge text + hero CTA + subhead copy update; secondary "See how it works" link added |
| **InstallWalkthrough** | **New** | 4-tile screenshot strip showing install → open → playbook → submit. Ships only when screenshots are ready (no placeholder fallback). |
| FeatureGrid | Existing | Untouched (cards already showcase real product widgets) |
| PricingCallout | Existing | Untouched |
| ComparisonTable | Existing | "Available now" tag added to WinBack Integration cells; otherwise untouched |
| **FAQ** | **New** | 5-7 Q+A entries; doubles as `FAQPage` schema source. Placed before FinalCTA so objections are handled before the final install ask. |
| FinalCTA | Existing | Headline kept; waitlist form replaced with "Install from Stripe Marketplace" button; copy rewritten |
| **WaitlistFallback** | **New** | Small "Not on Stripe yet?" section above footer, wraps the existing `<WaitlistForm />` with new label/success-state props. Anchored at `#waitlist` for backward compatibility with any existing external links. |
| Footer | Existing | Marketplace link added next to Terms / Privacy / Contact |

## Section-by-Section Detail

(Section numbers below are stable references for cross-linking, not render order. The render order is the Page Layout table above. The page-layout reorder during spec review did not renumber these.)


### 1. Status signal and Navbar

**Hero status badge** ([backend/app/page.tsx](backend/app/page.tsx) lines 67-73):
- Text: `Coming soon in Stripe Marketplace` → `Live in the Stripe App Marketplace`
- Visual treatment unchanged: same pill, same `bg-surface-bright text-primary-container`, same green pulsing dot. The pulse reads as "active now," not "incoming," and stays consistent.
- No date stamp inside the badge. Date stamps age poorly.

**Navbar CTA** ([backend/app/page.tsx](backend/app/page.tsx) lines 36-41):
- Label: `Join Waitlist` → `Install from Stripe Marketplace`
- `href`: `#waitlist` (anchor) → `https://marketplace.stripe.com/apps/winback` (external)
- Add `target="_blank"` + `rel="noopener noreferrer"` + small external-link icon to match Stripe's own conventions.
- Rendered through the new `<InstallCTA />` component, which reads the URL from a shared `MARKETPLACE_URL` constant (see Architecture below).

**No announcement bar.** Considered and rejected: the hero badge already communicates "live" within the first viewport. An announcement bar adds visual noise and gets cluttered. If a one-time launch celebration is desired later, a dismissible bar can be layered in; it is not load-bearing here.

### 2. Hero CTAs and waitlist fate

**Primary hero CTA** ([backend/app/page.tsx](backend/app/page.tsx) lines 88-90):
- Replace inline `<WaitlistForm />` with a single `<InstallCTA primary />` button.
- Label: `Install from Stripe Marketplace`
- Same gradient styling as today's waitlist submit (`primary-cta-gradient`).
- External link to `https://marketplace.stripe.com/apps/winback`.

**Secondary hero CTA** (new):
- Lower-weight text link next to or below the primary button.
- Label: `See how it works`
- Smooth-scrolls to `#walkthrough` (the new InstallWalkthrough section).

**Hero subhead copy** ([backend/app/page.tsx](backend/app/page.tsx) lines 81-86) rewrites from:
> You're losing disputes you should be winning. WinBack gives you step-by-step playbooks that show you exactly what to submit and why it wins. Pay 15% only when you win, or go flat at $79/month and keep every dollar you recover.

To:
> Live in the Stripe App Marketplace. Install WinBack from the marketplace, open any dispute in your Stripe Dashboard, and get a reason-code playbook plus an AI-drafted narrative ready for review. Pay 15% only when you win, or go flat at $79/month.

(Final phrasing may polish during implementation. The load-bearing parts are: "Live in the Stripe App Marketplace," the install action, and the pricing line. The phrase "Install in two clicks" was removed during spec review because the Stripe install/auth flow has more than two clicks; that copy is reserved for when verified.)

**Trust microcopy** below CTA ([backend/app/page.tsx](backend/app/page.tsx) lines 92-96) rewrites from:
> Lives in your Stripe Dashboard | No credit card required

To:
> Lives in your Stripe Dashboard | Stripe account required · No setup fee

(`No credit card required` was misleading under an install CTA: visitors need a Stripe account, and post-install they pay either 15% per win or $79/mo. `Stripe account required` is the honest version. `No setup fee` preserves the original reassurance.)

**Small below-CTA note (new):** Add a single short line of microcopy near the primary CTA: `Opens Stripe Marketplace in a new tab.` Sets expectations so visitors are not surprised by an external redirect.

**Waitlist form fate:**
- The `/api/waitlist` route, Resend welcome email, Turnstile widget, and rate-limit infrastructure all stay wired up unchanged.
- The `<WaitlistForm />` component gets new optional props for `submitLabel`, `placeholder`, and `successTitle` / `successBody`. Defaults preserve current behavior so any other caller is unaffected. The fallback section overrides them so the button no longer reads "Join Waitlist" and the success state no longer reads "You're on the list."
- The form is removed from the hero and the FinalCTA section.
- The form is rendered once on the page in a new compact `<WaitlistFallback />` block just above the footer, anchored at `#waitlist` (kept stable for backward compatibility with any external links), with the framing "Not on Stripe yet?" instead of "Join the waitlist."

### 3. ComparisonTable

Structurally identical. Same competitor rows (Smart Disputes, Chargeflow, DisputeNinja). Same WinBack Pay-Per-Win and WinBack Pro rows. Same numbers.

The only change: in the `Integration` column for both WinBack rows, the existing `1-Click Stripe App` text gets a small "Available now" green tag or checkmark icon next to it. Reinforces live status inside the comparison context without restructuring the table.

### 4. PricingCallout

Untouched. The 15% / $79/mo cards already match the live product. No copy or numeric changes.

### 5. FeatureGrid

Untouched. The four cards (Reason-Code Playbooks, Real-time Alerts, Read-Only Access, AI-Generated Narratives) are still accurate. The embedded `<PlaybookCards />`, `<AlertFeed />`, and `<NarrativeDemo />` widgets already showcase real product behavior and serve as a kind of mini-walkthrough on their own.

### 6. InstallWalkthrough (new section)

New section inserted directly after the Hero (before FeatureGrid), anchored at `#walkthrough`. Showing the product before the visitor sees any pricing context is the biggest single conversion lift available from this redesign.

**Heading:** `See it in your Stripe Dashboard.`
**Lead paragraph (one sentence):** Brief context, e.g., "From the Stripe App Marketplace to a submitted dispute response, here's the four-step path."

**4 screenshot tiles**, displayed as a 4-across grid on desktop and a horizontal scroll on mobile:

| Tile | Filename | Caption |
|---|---|---|
| 1. Install | `public/walkthrough/01-install.png` | Install from the Stripe App Marketplace. |
| 2. Open a dispute | `public/walkthrough/02-open-dispute.png` | Open any dispute in your dashboard. WinBack is right there in the side panel. |
| 3. Get the playbook | `public/walkthrough/03-playbook.png` | Get the reason-code playbook: what evidence wins, what doesn't, and why. |
| 4. Submit with confidence | `public/walkthrough/04-submit.png` | Review your AI-drafted narrative, edit anything, submit on your terms. |

**Asset capture:** Joe captures the 4 PNGs from the live WinBack-on-WinBack QA install per CLAUDE.md. The installed app is v1.1.9 against Vercel prod against the live Stripe account. Screenshots should be at 2x resolution (Retina), cropped to the relevant UI region.

**If screenshots are not ready when implementation is complete:** the InstallWalkthrough section does not ship. A live-launch page with "Screenshot coming soon" placeholders reads as unfinished and undercuts the "we are live" signal that is the whole point of the redesign. The rest of the page ships without the walkthrough section, and the walkthrough lands in a follow-up PR once the four screenshots exist. The secondary "See how it works" hero link is hidden until the section exists (or removed and reinstated in the follow-up PR; pick during implementation).

**Component shape:** built as a self-contained `<InstallWalkthrough />` component. A future swap to an embedded video is a one-file change.

**Image requirements:**
- Use `next/image` for automatic WebP serving and responsive sizing.
- Explicit `width` and `height` attributes to prevent CLS.
- Meaningful `alt` text for each image (the captions above are a starting point).

### 7. FinalCTA

Headline `Stop losing disputes you should be winning.` stays.

Subhead copy ([backend/app/page.tsx](backend/app/page.tsx) lines 454-458) rewrites from:
> The system isn't rigged. You just need the right playbook. Join the waitlist and be first to get issuer-side expertise in your Stripe Dashboard.

To:
> The system isn't rigged. You just need the right playbook. Install WinBack from the Stripe App Marketplace and get a step-by-step response on every dispute.

The `<WaitlistForm />` is replaced with a single `<InstallCTA primary />` button (same as the hero primary CTA).

The microcopy below the button (`No credit card required · Secure Stripe connection`) is updated to `Stripe account required · No setup fee` for consistency with the hero microcopy and the same accuracy concerns documented in Section 2.

### 8. WaitlistFallback (new section)

New compact block rendered between FinalCTA and Footer, anchored at `#waitlist` (the original anchor, kept stable so any pre-existing external links to `winbackpay.com/#waitlist` still resolve).

- Single line of copy: `Not on Stripe yet? Get a heads up when we add general signup.`
- Same `<WaitlistForm />` component as today, now accepting new optional props (`submitLabel`, `placeholder`, `successTitle`, `successBody`). The fallback passes:
  - `submitLabel="Get notified"`
  - `placeholder="Enter your email"`
  - `successTitle="We'll let you know."`
  - `successBody="You're on the list for general signup."`
- Visually low-weight: smaller heading, no large hero treatment, no surrounding ribbon glow. Reads as an aside, not a primary action.

The italic `Not on Stripe yet?` link in the FinalCTA subhead links here via the `#waitlist` anchor.

### 9. FAQ (new section)

New section rendered between InstallWalkthrough and FinalCTA. Objection handling lands before the final install ask, so the "ready to install" moment hits a fully-primed visitor.

**Heading:** `Common questions.`

**Initial question set (final wording to polish during implementation):**

1. **Is WinBack live in the Stripe App Marketplace?**
   Yes. WinBack was published live on the Stripe App Marketplace and is available to install today.

2. **How does WinBack price?**
   Two options. Pay-Per-Win is $0/month and a 15% success fee on disputes you win. Pro is $79/month flat with zero success fee. You pick which fits your dispute volume.

3. **What dispute reason codes do you cover?**
   The major card-network dispute reason codes across Visa, Mastercard, Amex, and Discover. Each covered reason code gets its own playbook with the evidence the issuer actually evaluates. (Wording deliberately scoped to "major" rather than "full set" so a niche edge-case code does not turn this into a false claim.)

4. **Where are evidence files stored?**
   Evidence files go directly from your browser to Stripe. WinBack never stores file bytes on its servers. We keep the dispute metadata and the Stripe file ID, nothing else.

5. **Do I need a Stripe account to use WinBack?**
   Yes. WinBack is a Stripe App that runs inside the Stripe Dashboard. If you process payments on Stripe, you can install WinBack today.

6. **How long does setup take?**
   A few minutes. Install from the Stripe App Marketplace, grant the requested permissions, and WinBack is ready the next time a dispute lands. (Specific click count omitted because Stripe's install/auth flow has more than two clicks and we do not want to make a claim we cannot verify.)

7. **Can WinBack move money out of my Stripe account?**
   No. WinBack cannot initiate charges, refunds, or transfers. The only write WinBack makes to your Stripe account is your dispute response, and only when you choose to submit it.

This section doubles as the source for the `FAQPage` JSON-LD schema (see SEO section below). Each question is exposed as an accordion or static block; accordion preferred for scannability.

### 10. Footer

Existing layout preserved. Add one entry next to Terms / Privacy / Contact: `Stripe Marketplace` linking to `https://marketplace.stripe.com/apps/winback` (external, new tab, with external-link icon).

### 11. Copy sweep

One pass through the page during implementation to scrub residual "join the waitlist," "early access," "coming soon," or "be first to" phrasing. Any remaining references get rewritten to live-product language.

The hero subhead and FinalCTA paragraph above are the main two; expect 1-2 more incidental mentions.

## SEO Pass (in scope for this PR)

The redesign also lands the high-leverage on-page SEO debt. The `/seo` skill is best run against the deployed result for verification; this section lists what gets built in upfront.

### Metadata ([backend/app/layout.tsx](backend/app/layout.tsx))

Current state contains a claim ("10+ years of payments experience") that mirrors language Stripe rejected in the v1.1.0 listing review. Rewrite to remove unprovable / personal-credential claims:

- **`title`:** Current `WinBack: Win Your Stripe Disputes. Keep Every Dollar.` → tighten to a target-keyword-aligned form, e.g. `WinBack: Stripe App for Chargebacks and Dispute Response`. Length under 60 chars.
- **`description`:** Rewrite without the "10+ years" claim, target the searcher intent, e.g. `Respond to Stripe disputes with reason-code playbooks and AI-drafted narratives. Install the WinBack app from the Stripe App Marketplace. Pay 15% per win or $79/month flat.` Under 160 chars where possible.
- **`keywords`:** Add an explicit keywords array even though Google ignores it; some non-Google engines and AI crawlers still parse it. Target keywords: `Stripe disputes, Stripe chargebacks, chargeback response, dispute playbook, Stripe app for disputes, reason code playbook`.
- **`authors`:** `[{ name: "JB Technology LLC", url: "https://winbackpay.com" }]`
- **`canonical`:** keep `/` (already correct).
- **Open Graph:** keep existing fields; rewrite the title/description to match the new metadata. Add `og:image` pointing to `/og-card.png` (1200x630 PNG) and `og:image:alt`. If the OG card asset is not ready at implementation time, ship with a placeholder generated from the WinBack logo on the brand color background and upgrade later.
- **Twitter:** add `twitter:image` to match the og:image.

### Structured Data (JSON-LD)

JSON-LD is **emitted from [backend/app/page.tsx](backend/app/page.tsx), not from [backend/app/layout.tsx](backend/app/layout.tsx)**. The `SoftwareApplication` and `FAQPage` schemas describe the homepage, not `/terms`, `/privacy`, or `/setup-billing` / `/upgrade`. Putting them in `layout.tsx` would falsely advertise those routes as the same software product. Emit via a colocated `<Script type="application/ld+json">` block on the homepage only. `Organization` is the only schema appropriate for `layout.tsx`.

**`SoftwareApplication`** (page-level, on `/` only):
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "WinBack",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "url": "https://winbackpay.com",
  "installUrl": "https://marketplace.stripe.com/apps/winback",
  "offers": [
    {
      "@type": "Offer",
      "name": "Pay-Per-Win",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "url": "https://marketplace.stripe.com/apps/winback",
      "description": "$0/month base price. 15% success fee on disputes you win, charged through Stripe billing. No fee on disputes you lose."
    },
    {
      "@type": "Offer",
      "name": "Pro",
      "price": "79",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "url": "https://marketplace.stripe.com/apps/winback",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "79",
        "priceCurrency": "USD",
        "billingDuration": "P1M",
        "unitText": "MONTH"
      },
      "description": "Flat $79 per month, zero success fee, unlimited disputes."
    }
  ],
  "provider": {
    "@type": "Organization",
    "name": "JB Technology LLC",
    "url": "https://winbackpay.com"
  }
}
```

The Pay-Per-Win `description` field is now explicit about the 15% success fee. A bare `price: "0"` without that context could read as "free product" and is the kind of claim Google can penalize as misleading.

Do NOT add `aggregateRating` unless backed by real review data. Fabricated ratings are a manual-action risk under Google's structured data policy.

**`FAQPage`** (page-level, on `/` only, built from the shared FAQ data module): one `Question` + `Answer` entry per item. Single source of truth, see Architecture below.

**`Organization`** (in [backend/app/layout.tsx](backend/app/layout.tsx) only, applies site-wide): basic publisher info for JB Technology LLC + the marketing site URL. Add `sameAs` links to any social profiles that exist; omit otherwise rather than ship empty fields.

### Semantic HTML audit

During implementation:
- Confirm exactly one `<h1>` (the hero headline). Demote any stray `<h1>` in subsections to `<h2>`.
- Confirm a clean h2 / h3 hierarchy through the page. Section headings are h2; tile headings inside a section are h3.
- Confirm every `<img>` has meaningful `alt` text or an empty `alt=""` if decorative (ribbon background).
- Confirm icon-only links have `aria-label`.
- Wrap each top-level section in a `<section>` with a stable `id` for anchor links.

### `robots.txt` and `sitemap.xml`

- Verify `backend/public/robots.txt` (or `backend/app/robots.ts`) exists, allows all, and points to the sitemap. Add if missing.
- Verify a sitemap exists at `/sitemap.xml`. If not, add `backend/app/sitemap.ts` (Next.js convention) that lists `/`, `/terms`, `/privacy`. If a `/install` route is added later it joins the sitemap then.

### `llms.txt`

Add `backend/public/llms.txt` (the emerging AI-search convention). Plain text, structured summary:

```
# WinBack

> Stripe App for dispute response. Reason-code playbooks and AI-drafted narratives, installed directly from the Stripe App Marketplace.

## What it does
- Guides Stripe merchants through responding to payment disputes
- Provides reason-code-specific playbooks (Visa, Mastercard, Amex, Discover)
- Drafts a dispute narrative using uploaded evidence
- Lives in the merchant's Stripe Dashboard via the Stripe App Marketplace

## Pricing
- Pay-Per-Win: $0/month, 15% success fee on disputes you win
- Pro: $79/month flat, zero success fee

## Links
- Install: https://marketplace.stripe.com/apps/winback
- Site: https://winbackpay.com
- Terms: https://winbackpay.com/terms
- Privacy: https://winbackpay.com/privacy
```

### Image optimization

- New walkthrough screenshots use `next/image` with `width` + `height` set.
- Existing ribbon background `<img>` ([backend/app/page.tsx](backend/app/page.tsx) lines 52-57) stays raw (decorative, must not block paint, must not be optimized into a different aspect ratio).
- OG card image is a static asset in `backend/public/og-card.png`.

### Core Web Vitals checks (verification, not new build)

- LCP candidate is the hero headline (text). Should render sub-second on Vercel edge.
- CLS: font loading is already handled via `next/font/google` with `display: swap`. New walkthrough images get explicit dimensions to prevent shift.
- INP: page is mostly static. Verify the FAQ accordion (if interactive) does not introduce input delay above the threshold.

The full `/seo` skill audit runs against the staging build after implementation. Anything it flags gets fixed before merge.

### Out of scope (defer)

- Blog / educational content
- Programmatic SEO landing pages (e.g., `/disputes/visa-13-1`)
- Backlink campaign
- Performance work beyond CWV verification

## Architecture

### File changes

**Modified:**
- [backend/app/page.tsx](backend/app/page.tsx), Navbar, Hero, ComparisonTable, FinalCTA, Footer edits. New sections wired into the layout in the new section order. Page-level JSON-LD (`SoftwareApplication`, `FAQPage`) emitted from a colocated `<Script>` block.
- [backend/app/layout.tsx](backend/app/layout.tsx), Metadata rewrite (title, description, keywords, OG, Twitter). Site-wide `Organization` JSON-LD only. Does NOT host page-specific schemas.
- [backend/app/components/waitlist-form.tsx](backend/app/components/waitlist-form.tsx), Accept new optional props: `submitLabel`, `placeholder`, `successTitle`, `successBody`. Defaults preserve current behavior. Internal logic, API call, and Turnstile wiring untouched.

**New shared modules (server-safe constants, importable from both server and client):**
- `backend/app/lib/marketing.ts`, Shared constants used by the install CTA, metadata, JSON-LD schemas, and footer link:
  - `MARKETPLACE_URL = "https://marketplace.stripe.com/apps/winback"`
  - `SITE_URL = "https://winbackpay.com"`
  - `PRICING.payPerWin`, `PRICING.pro` (display labels, prices, descriptions) so JSON-LD and visible copy never diverge.
- `backend/app/content/faq.ts`, The FAQ data: an exported `FAQ_ITEMS: { question: string, answer: string }[]` array. Imported by both `faq.tsx` (rendered accordion) and the JSON-LD `FAQPage` emitter in `page.tsx`. Single source of truth, no two-place drift.

**New components:**
- `backend/app/components/install-cta.tsx`, Primary install button. Reads `MARKETPLACE_URL` from `lib/marketing.ts`. Props: `{ primary?: boolean, label?: string }`. Reused in navbar, hero, FinalCTA. Renders an `<a>` with `target="_blank" rel="noopener noreferrer"` and a small external-link icon. The icon is `aria-hidden="true"` since the link has visible text; no separate `aria-label` required.
- `backend/app/components/install-walkthrough.tsx`, The 4-tile screenshot section. Pure presentational. Reads PNGs from `/walkthrough/*.png` via `next/image`. Future video swap edits this one file.
- `backend/app/components/waitlist-fallback.tsx`, Wraps the existing `<WaitlistForm />` with the new "Not on Stripe yet?" framing and passes the override prop set documented in Section 8.
- `backend/app/components/faq.tsx`, Accordion-rendered FAQ section (client component). Imports `FAQ_ITEMS` from `content/faq.ts`. Does NOT export the data; the data lives in the content module to keep it server-safe and avoid pulling a client component into `page.tsx`'s server tree.

**New static assets** (Joe captures, drops into `backend/public/`):
- `walkthrough/01-install.png`
- `walkthrough/02-open-dispute.png`
- `walkthrough/03-playbook.png`
- `walkthrough/04-submit.png`
- `og-card.png` (1200x630, optional; placeholder if not ready)
- `llms.txt`

**Possibly new (verify before adding):**
- `backend/app/sitemap.ts`, only if no sitemap exists.
- `backend/app/robots.ts` or `backend/public/robots.txt`, only if missing.

**Unchanged:**
- `WaitlistForm` component, `/api/waitlist` route, Resend welcome email, Turnstile widget, rate-limit infrastructure. All still wired up.
- `PlaybookCards`, `AlertFeed`, `NarrativeDemo`, `HeroWidget`, `RibbonBackground`.
- `PricingCallout`, `FeatureGrid`.

### Boundaries

- `lib/marketing.ts` owns `MARKETPLACE_URL`, `SITE_URL`, and the pricing labels. `<InstallCTA />`, the metadata in `layout.tsx`, the JSON-LD emitter in `page.tsx`, and the footer link all import from this module. No file outside `lib/marketing.ts` hard-codes the marketplace URL or pricing strings.
- `content/faq.ts` owns the FAQ data. `faq.tsx` (rendered accordion) and the JSON-LD `FAQPage` emitter in `page.tsx` both consume `FAQ_ITEMS`. The FAQ component is client-side; the data is server-safe.
- `<InstallWalkthrough />` owns the screenshot paths. Page composition never references PNG filenames directly. Future video swap is a single-file change.
- `<WaitlistForm />` owns form submission, validation, Turnstile, and API call wiring. New label/copy props let callers override surface text without forking the component. `<WaitlistFallback />` is the only caller that overrides the defaults; the form's other usages (currently none after this redesign) inherit the original waitlist defaults.

## Risks and Open Questions

- **Screenshot capture timing.** If Joe cannot capture all 4 walkthrough screenshots before implementation completes, the InstallWalkthrough section ships in a follow-up PR rather than going live with placeholder boxes. The rest of the redesign ships either way. The hero's secondary "See how it works" link is hidden until the walkthrough exists.
- **OG card asset.** If a designed 1200x630 OG card is not ready at implementation time, ship with a clean logo-on-brand-color placeholder generated to spec, not a missing asset. Upgrade later.
- **Marketplace URL.** `https://marketplace.stripe.com/apps/winback` was provided by Joe. If Stripe ever changes the URL slug, the constant `MARKETPLACE_URL` in `backend/app/lib/marketing.ts` is the single place to update.
- **FAQ accuracy.** All seven FAQ answers above are factual against the live product as of 2026-05-13. If any product detail shifts before merge (e.g., pricing change, new reason code coverage), the FAQ copy in `content/faq.ts` must shift with it. Because that file feeds both the rendered FAQ and the JSON-LD schema, one edit propagates to both surfaces.
- **Backwards compatibility on `#waitlist`.** Earlier draft proposed `#waitlist-fallback`. Reverted to `#waitlist` (the original anchor) so any external links to `winbackpay.com/#waitlist` (e.g., from Stripe marketplace listing, email signatures, social posts) still resolve to a working in-page target.
- **Install click count.** Hero subhead and FAQ Q6 previously said "two clicks." Stripe's marketplace install + auth flow has more than two clicks. The spec now says "Install WinBack from the marketplace" and "a few minutes" instead. If implementation determines a precise click count, update both places together.
- **WinBack permissions framing.** WinBack does write dispute responses to Stripe (it is not literally read-only at the API surface). The marketing line is that WinBack cannot move money: no charges, refunds, or transfers. FAQ Q7 was rewritten to reflect that distinction precisely. The existing FeatureGrid "Read-Only Access" card was already approved by Stripe in the v1.1.9 listing review and stays untouched; it speaks to money movement, not the API verb set. If a Stripe reviewer pushes back on the FeatureGrid copy in a future submission, fix the card and the FAQ together.
- **`<WaitlistForm />` callers.** The new optional props default to current behavior, so any other caller continues to work. Only `<WaitlistFallback />` overrides them in this redesign. Adding new props is a non-breaking change.

## Testing

- **Visual review:** Joe runs through the full page on desktop and mobile before merge.
- **External link behavior:** Click each `Install from Stripe Marketplace` button (navbar, hero, FinalCTA), verify each opens `marketplace.stripe.com/apps/winback` in a new tab.
- **Waitlist form still works:** Submit a test email via the WaitlistFallback section, verify it lands in Supabase and triggers the Resend welcome email.
- **SEO audit:** Run the `/seo` skill against the staging deployment. Address findings before merge.
- **Structured data validation:** Paste rendered HTML into Google's Rich Results Test and Schema.org validator. Both must pass.
- **Lighthouse:** Run on a clean Chrome profile against the staging URL. Performance, Accessibility, Best Practices, SEO scores should all be 90+; investigate any regression.
- **No regressions in backend tests:** Run `cd backend && npm run test:integration` before push per CLAUDE.md pre-PR checklist.

## Rollout

- Single PR against `main`.
- Push merges to Vercel prod (`winbackpay.com`) automatically. No staged rollout needed; the page is static and the change is content + SEO + presentation only.
- Post-deploy, request reindex of `winbackpay.com` via Google Search Console so the new metadata + structured data get crawled quickly.
- If anything goes wrong, revert is a single `git revert` + auto-redeploy.
