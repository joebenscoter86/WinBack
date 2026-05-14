# Landing Page Live-Launch Redesign + SEO Pass Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Flip winbackpay.com from waitlist framing to "live in Stripe App Marketplace" framing, add an install walkthrough section, add an FAQ, demote the existing waitlist form to a small fallback, and fold in a high-leverage on-page SEO pass.

**Architecture:** Single Next.js app in `backend/`. Shared constants in `app/lib/marketing.ts`, FAQ data in `app/content/faq.ts`, four new components in `app/components/`, the existing `WaitlistForm` gets non-breaking optional props. Page-level JSON-LD emits from `app/page.tsx`; site-wide `Organization` JSON-LD lives in `app/layout.tsx`. New SEO files: `app/sitemap.ts`, `app/robots.ts`, `public/llms.txt`, `public/og-card.png`.

**Tech Stack:** Next.js 15 App Router, TypeScript, Tailwind (existing tokens), Vitest, `next/image`, `next/font/google`. No new dependencies.

**Spec:** [docs/superpowers/specs/2026-05-13-landing-page-live-redesign-design.md](../specs/2026-05-13-landing-page-live-redesign-design.md) (committed at `0f5c1bd`).

---

## File Structure

**New files:**
- `backend/app/lib/marketing.ts`, shared constants (`MARKETPLACE_URL`, `SITE_URL`, `PRICING`, `ORGANIZATION`).
- `backend/app/content/faq.ts`, FAQ data; one source for the rendered accordion and the JSON-LD `FAQPage` schema.
- `backend/app/components/install-cta.tsx`, primary install button. Reads `MARKETPLACE_URL` from `lib/marketing.ts`.
- `backend/app/components/install-walkthrough.tsx`, 4-tile screenshot section. Uses `next/image`.
- `backend/app/components/waitlist-fallback.tsx`, small section that wraps `WaitlistForm` with override props.
- `backend/app/components/faq.tsx`, client component, FAQ accordion. Imports `FAQ_ITEMS` from `content/faq.ts`.
- `backend/app/sitemap.ts`, Next.js sitemap route.
- `backend/app/robots.ts`, Next.js robots route.
- `backend/public/llms.txt`, AI-search-engine summary.
- `backend/public/og-card.png`, 1200x630 social card. Placeholder is acceptable for v1.
- `backend/public/walkthrough/01-install.png` (and 02/03/04), captured from live install. Skipped if not ready (walkthrough section ships in a follow-up PR per spec).
- `backend/app/components/__tests__/waitlist-form.test.tsx`, verify the new optional props.

**Modified files:**
- `backend/app/page.tsx`, Navbar, Hero, ComparisonTable, FinalCTA, Footer edits; new section order; page-level JSON-LD.
- `backend/app/layout.tsx`, metadata rewrite + Organization JSON-LD.
- `backend/app/components/waitlist-form.tsx`, extend with optional props (`submitLabel`, `placeholder`, `successTitle`, `successBody`); defaults preserve current behavior.

---

## Task 1: Create feature branch

**Files:** None.

- [ ] **Step 1: Create branch**

```bash
cd /Users/joeb/Projects/WinBack
git checkout main
git pull origin main
git checkout -b feat/landing-page-live-redesign
```

Expected: `Switched to a new branch 'feat/landing-page-live-redesign'`.

- [ ] **Step 2: Verify clean state**

```bash
git status
```

Expected: `nothing to commit, working tree clean`.

---

## Task 2: Create shared marketing constants module

**Files:**
- Create: `backend/app/lib/marketing.ts`

- [ ] **Step 1: Verify `backend/app/lib/` exists**

```bash
ls /Users/joeb/Projects/WinBack/backend/app/lib/ 2>/dev/null || mkdir -p /Users/joeb/Projects/WinBack/backend/app/lib/
```

- [ ] **Step 2: Write `marketing.ts`**

```typescript
// backend/app/lib/marketing.ts

export const MARKETPLACE_URL =
  "https://marketplace.stripe.com/apps/winback";

export const SITE_URL = "https://winbackpay.com";

export const SUPPORT_EMAIL = "support@winbackpay.com";

export const PRICING = {
  payPerWin: {
    name: "Pay-Per-Win",
    monthlyPriceUsd: 0,
    description:
      "$0/month base price. 15% success fee on disputes you win, charged through Stripe billing. No fee on disputes you lose.",
    shortLabel: "15%",
    shortNote: "$0/month. Only pay when you win.",
  },
  pro: {
    name: "Pro",
    monthlyPriceUsd: 79,
    description:
      "Flat $79 per month, zero success fee, unlimited disputes.",
    shortLabel: "$79",
    shortNote: "Unlimited disputes. Zero success fee.",
  },
} as const;

export const ORGANIZATION = {
  legalName: "JB Technology LLC",
  url: SITE_URL,
} as const;
```

- [ ] **Step 3: Typecheck**

```bash
cd /Users/joeb/Projects/WinBack/backend && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
cd /Users/joeb/Projects/WinBack
git add backend/app/lib/marketing.ts
git commit -m "feat(backend): add shared marketing constants module"
```

---

## Task 3: Create FAQ data module

**Files:**
- Create: `backend/app/content/faq.ts`

- [ ] **Step 1: Create `app/content/` directory**

```bash
mkdir -p /Users/joeb/Projects/WinBack/backend/app/content/
```

- [ ] **Step 2: Write `faq.ts`**

```typescript
// backend/app/content/faq.ts

export type FaqItem = {
  question: string;
  answer: string;
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Is WinBack live in the Stripe App Marketplace?",
    answer:
      "Yes. WinBack was published live on the Stripe App Marketplace and is available to install today.",
  },
  {
    question: "How does WinBack price?",
    answer:
      "Two options. Pay-Per-Win is $0/month and a 15% success fee on disputes you win. Pro is $79/month flat with zero success fee. You pick which fits your dispute volume.",
  },
  {
    question: "What dispute reason codes do you cover?",
    answer:
      "The major card-network dispute reason codes across Visa, Mastercard, Amex, and Discover. Each covered reason code gets its own playbook with the evidence the issuer actually evaluates.",
  },
  {
    question: "Where are evidence files stored?",
    answer:
      "Evidence files go directly from your browser to Stripe. WinBack never stores file bytes on its servers. We keep the dispute metadata and the Stripe file ID, nothing else.",
  },
  {
    question: "Do I need a Stripe account to use WinBack?",
    answer:
      "Yes. WinBack is a Stripe App that runs inside the Stripe Dashboard. If you process payments on Stripe, you can install WinBack today.",
  },
  {
    question: "How long does setup take?",
    answer:
      "A few minutes. Install from the Stripe App Marketplace, grant the requested permissions, and WinBack is ready the next time a dispute lands.",
  },
  {
    question: "Can WinBack move money out of my Stripe account?",
    answer:
      "No. WinBack cannot initiate charges, refunds, or transfers. The only write WinBack makes to your Stripe account is your dispute response, and only when you choose to submit it.",
  },
];
```

- [ ] **Step 3: Typecheck**

```bash
cd /Users/joeb/Projects/WinBack/backend && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add backend/app/content/faq.ts
git commit -m "feat(backend): add FAQ content module"
```

---

## Task 4: Create InstallCTA component

**Files:**
- Create: `backend/app/components/install-cta.tsx`

- [ ] **Step 1: Write the component**

```tsx
// backend/app/components/install-cta.tsx

import { MARKETPLACE_URL } from "../lib/marketing";

type InstallCTAProps = {
  primary?: boolean;
  label?: string;
};

export function InstallCTA({
  primary = false,
  label = "Install from Stripe Marketplace",
}: InstallCTAProps) {
  const classes = primary
    ? "primary-cta-gradient text-on-primary-container px-8 py-4 rounded-xl font-[family-name:var(--font-plus-jakarta)] font-bold tracking-tight hover:shadow-[0_0_20px_rgba(0,209,255,0.4)] transition-all whitespace-nowrap inline-flex items-center justify-center gap-2"
    : "primary-cta-gradient text-on-primary-container px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl font-[family-name:var(--font-plus-jakarta)] font-bold text-xs sm:text-sm tracking-tight hover:opacity-90 transition-opacity inline-flex items-center gap-2";

  return (
    <a
      href={MARKETPLACE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={classes}
    >
      {label}
      <svg
        aria-hidden="true"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
      </svg>
    </a>
  );
}
```

- [ ] **Step 2: Typecheck**

```bash
cd /Users/joeb/Projects/WinBack/backend && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add backend/app/components/install-cta.tsx
git commit -m "feat(backend): add InstallCTA component"
```

---

## Task 5: Create InstallWalkthrough component

Note: this component references screenshots at `/walkthrough/*.png`. The screenshots are captured in Task 23 (or deferred). The component itself ships, but is only rendered on the page if screenshots exist (handled in Task 14).

**Files:**
- Create: `backend/app/components/install-walkthrough.tsx`

- [ ] **Step 1: Write the component**

```tsx
// backend/app/components/install-walkthrough.tsx

import Image from "next/image";

type Tile = {
  src: string;
  alt: string;
  caption: string;
};

const TILES: Tile[] = [
  {
    src: "/walkthrough/01-install.png",
    alt: "WinBack listing in the Stripe App Marketplace with the Install button visible",
    caption: "Install from the Stripe App Marketplace.",
  },
  {
    src: "/walkthrough/02-open-dispute.png",
    alt: "Stripe Dashboard dispute view with WinBack open in the side panel",
    caption:
      "Open any dispute in your dashboard. WinBack is right there in the side panel.",
  },
  {
    src: "/walkthrough/03-playbook.png",
    alt: "WinBack reason-code playbook open inside the dispute view",
    caption:
      "Get the reason-code playbook: what evidence wins, what doesn't, and why.",
  },
  {
    src: "/walkthrough/04-submit.png",
    alt: "WinBack narrative preview with AI-drafted dispute response ready to submit",
    caption:
      "Review your AI-drafted narrative, edit anything, submit on your terms.",
  },
];

export function InstallWalkthrough() {
  return (
    <section
      id="walkthrough"
      className="max-w-7xl mx-auto px-6 py-16 md:py-32"
    >
      <div className="text-center mb-10 md:mb-16 space-y-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-[family-name:var(--font-plus-jakarta)] font-extrabold text-white tracking-tighter">
          See it in your Stripe Dashboard.
        </h2>
        <p className="text-on-surface-variant max-w-2xl mx-auto">
          From the Stripe App Marketplace to a submitted dispute response, the
          four-step path.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {TILES.map((tile) => (
          <figure
            key={tile.src}
            className="bg-surface-low rounded-2xl border border-white/5 p-2 flex flex-col gap-3"
          >
            <div className="aspect-[4/3] relative bg-surface-container rounded-xl overflow-hidden">
              <Image
                src={tile.src}
                alt={tile.alt}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              />
            </div>
            <figcaption className="text-on-surface-variant text-sm px-2 pb-2">
              {tile.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Typecheck**

```bash
cd /Users/joeb/Projects/WinBack/backend && npx tsc --noEmit
```

Expected: no errors. (The `next/image` references resolve to PNG paths that may not exist yet; Next compiles fine without the actual assets, only runtime rendering would fail. The page integration in Task 14 will guard against rendering this section when screenshots are absent.)

- [ ] **Step 3: Commit**

```bash
git add backend/app/components/install-walkthrough.tsx
git commit -m "feat(backend): add InstallWalkthrough component"
```

---

## Task 6: Create FAQ accordion component

**Files:**
- Create: `backend/app/components/faq.tsx`

- [ ] **Step 1: Write the component**

```tsx
// backend/app/components/faq.tsx
"use client";

import { useState } from "react";
import { FAQ_ITEMS } from "../content/faq";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="max-w-4xl mx-auto px-6 py-16 md:py-32">
      <div className="text-center mb-10 md:mb-16 space-y-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-[family-name:var(--font-plus-jakarta)] font-extrabold text-white tracking-tighter">
          Common questions.
        </h2>
      </div>
      <div className="space-y-3">
        {FAQ_ITEMS.map((item, index) => {
          const isOpen = openIndex === index;
          const panelId = `faq-panel-${index}`;
          return (
            <div
              key={item.question}
              className="bg-surface-low rounded-2xl border border-white/5 overflow-hidden"
            >
              <button
                type="button"
                onClick={() =>
                  setOpenIndex(isOpen ? null : index)
                }
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 text-white font-[family-name:var(--font-plus-jakarta)] font-semibold"
                aria-expanded={isOpen}
                aria-controls={panelId}
              >
                <span>{item.question}</span>
                <span
                  aria-hidden="true"
                  className={`text-on-surface-variant transition-transform ${
                    isOpen ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
              {isOpen && (
                <div
                  id={panelId}
                  className="px-6 pb-6 text-on-surface-variant"
                >
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Typecheck**

```bash
cd /Users/joeb/Projects/WinBack/backend && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add backend/app/components/faq.tsx
git commit -m "feat(backend): add FAQ accordion component"
```

---

## Task 7: Extend WaitlistForm with optional override props (TDD)

**Files:**
- Modify: `backend/app/components/waitlist-form.tsx`
- Create: `backend/app/components/__tests__/waitlist-form.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// backend/app/components/__tests__/waitlist-form.test.tsx

import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { WaitlistForm } from "../waitlist-form";

// next/font is not available in test runtime; mock the env var read.
vi.stubEnv("NEXT_PUBLIC_TURNSTILE_SITE_KEY", "");

describe("WaitlistForm", () => {
  it("renders default copy when no props are passed", () => {
    render(<WaitlistForm />);
    expect(
      screen.getByRole("button", { name: /join waitlist/i })
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/enter your work email/i)
    ).toBeInTheDocument();
  });

  it("renders override copy when props are passed", () => {
    render(
      <WaitlistForm
        submitLabel="Get notified"
        placeholder="Enter your email"
        successTitle="We'll let you know."
        successBody="You're on the list for general signup."
      />
    );
    expect(
      screen.getByRole("button", { name: /get notified/i })
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/^enter your email$/i)
    ).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Confirm the project already has testing-library/react and jsdom set up, or set them up**

```bash
cd /Users/joeb/Projects/WinBack/backend && cat package.json | grep -E "@testing-library/react|jsdom"
```

If both are present, skip to Step 4. If missing:

```bash
cd /Users/joeb/Projects/WinBack/backend && npm install --save-dev @testing-library/react @testing-library/jest-dom jsdom
```

Then check `vitest.config.ts` for `environment: "jsdom"`. If absent, add `environment: "jsdom"` to the `test` config block and add `import "@testing-library/jest-dom/vitest"` to a setup file (or inline at top of the test). If `@testing-library/react` is already a dependency in this codebase, the existing setup should work, adopt the existing pattern instead of inventing new infrastructure.

- [ ] **Step 3: Run the test to verify it fails**

```bash
cd /Users/joeb/Projects/WinBack/backend && npx vitest run app/components/__tests__/waitlist-form.test.tsx
```

Expected: FAIL on the "override copy" case because the form does not yet accept those props.

- [ ] **Step 4: Modify `WaitlistForm` to accept optional props**

Replace the contents of [backend/app/components/waitlist-form.tsx](backend/app/components/waitlist-form.tsx) with:

```tsx
"use client";

import { useState, useRef, FormEvent } from "react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";

type FormState = "idle" | "submitting" | "success" | "error";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

type WaitlistFormProps = {
  submitLabel?: string;
  placeholder?: string;
  successTitle?: string;
  successBody?: string;
};

export function WaitlistForm({
  submitLabel = "Join Waitlist",
  placeholder = "Enter your work email",
  successTitle = "You're on the list.",
  successBody = "We'll be in touch.",
}: WaitlistFormProps = {}) {
  const [email, setEmail] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileInstance | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!email.trim()) return;

    if (TURNSTILE_SITE_KEY && !turnstileToken) {
      setFormState("error");
      setErrorMessage("Please complete the verification.");
      return;
    }

    setFormState("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          turnstileToken,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setFormState("success");
      } else {
        setFormState("error");
        setErrorMessage(
          data.error || "Something went wrong. Please try again."
        );
        turnstileRef.current?.reset();
        setTurnstileToken(null);
      }
    } catch {
      setFormState("error");
      setErrorMessage("Something went wrong. Please try again.");
      turnstileRef.current?.reset();
      setTurnstileToken(null);
    }
  }

  if (formState === "success") {
    return (
      <div className="text-center w-full">
        <p className="text-primary text-lg font-semibold font-[family-name:var(--font-plus-jakarta)]">
          {successTitle}
        </p>
        <p className="text-on-surface-variant text-sm mt-2">
          {successBody}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          required
          className="flex-1 bg-surface-highest/40 border border-outline-variant/30 rounded-xl px-4 py-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
        />
        <button
          type="submit"
          disabled={formState === "submitting"}
          className="primary-cta-gradient text-on-primary-container px-8 py-4 rounded-xl font-[family-name:var(--font-plus-jakarta)] font-bold tracking-tight hover:shadow-[0_0_20px_rgba(0,209,255,0.4)] transition-all disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed whitespace-nowrap"
        >
          {formState === "submitting" ? (
            <span className="flex items-center gap-2">
              <svg
                className="animate-spin h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              {submitLabel === "Join Waitlist" ? "Joining..." : "Submitting..."}
            </span>
          ) : (
            submitLabel
          )}
        </button>
      </div>
      {TURNSTILE_SITE_KEY && (
        <div className="mt-4">
          <Turnstile
            ref={turnstileRef}
            siteKey={TURNSTILE_SITE_KEY}
            options={{ theme: "dark", size: "flexible" }}
            onSuccess={(token) => setTurnstileToken(token)}
            onExpire={() => setTurnstileToken(null)}
            onError={() => setTurnstileToken(null)}
          />
        </div>
      )}
      {formState === "error" && (
        <p className="text-error text-sm mt-3">{errorMessage}</p>
      )}
    </form>
  );
}
```

- [ ] **Step 5: Run the test to verify it passes**

```bash
cd /Users/joeb/Projects/WinBack/backend && npx vitest run app/components/__tests__/waitlist-form.test.tsx
```

Expected: PASS for both cases.

- [ ] **Step 6: Run full unit-test suite to ensure no regression**

```bash
cd /Users/joeb/Projects/WinBack/backend && npm test
```

Expected: PASS, including the new test.

- [ ] **Step 7: Commit**

```bash
git add backend/app/components/waitlist-form.tsx backend/app/components/__tests__/waitlist-form.test.tsx
git commit -m "feat(backend): extend WaitlistForm with optional label/copy props"
```

---

## Task 8: Create WaitlistFallback component

**Files:**
- Create: `backend/app/components/waitlist-fallback.tsx`

- [ ] **Step 1: Write the component**

```tsx
// backend/app/components/waitlist-fallback.tsx

import { WaitlistForm } from "./waitlist-form";

export function WaitlistFallback() {
  return (
    <section
      id="waitlist"
      className="max-w-2xl mx-auto px-6 py-12 md:py-16 text-center"
    >
      <h3 className="text-xl md:text-2xl font-[family-name:var(--font-plus-jakarta)] font-bold text-white mb-2">
        Not on Stripe yet?
      </h3>
      <p className="text-on-surface-variant text-sm mb-6">
        Get a heads up when we add general signup.
      </p>
      <div className="flex justify-center">
        <WaitlistForm
          submitLabel="Get notified"
          placeholder="Enter your email"
          successTitle="We'll let you know."
          successBody="You're on the list for general signup."
        />
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Typecheck**

```bash
cd /Users/joeb/Projects/WinBack/backend && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add backend/app/components/waitlist-fallback.tsx
git commit -m "feat(backend): add WaitlistFallback section component"
```

---

## Task 9: Update Navbar in page.tsx

**Files:**
- Modify: `backend/app/page.tsx` (the `Navbar` function, lines 7-45 in current HEAD)

- [ ] **Step 1: Add the `InstallCTA` import at the top of `page.tsx`**

Add this line near the existing imports (top of file):

```tsx
import { InstallCTA } from "./components/install-cta";
```

- [ ] **Step 2: Replace the Navbar CTA anchor with `<InstallCTA />`**

In the `Navbar` function, replace this block:

```tsx
<a
  href="#waitlist"
  className="primary-cta-gradient text-on-primary-container px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl font-[family-name:var(--font-plus-jakarta)] font-bold text-xs sm:text-sm tracking-tight hover:opacity-90 transition-opacity"
>
  Join Waitlist
</a>
```

With:

```tsx
<InstallCTA />
```

- [ ] **Step 3: Typecheck**

```bash
cd /Users/joeb/Projects/WinBack/backend && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add backend/app/page.tsx
git commit -m "feat(backend): replace navbar waitlist CTA with install CTA"
```

---

## Task 10: Update Hero in page.tsx

**Files:**
- Modify: `backend/app/page.tsx` (the `Hero` function, lines 62-105 in current HEAD)

- [ ] **Step 1: Replace the status badge text**

In the `Hero` function, find:

```tsx
Coming soon in Stripe Marketplace
```

Replace with:

```tsx
Live in the Stripe App Marketplace
```

- [ ] **Step 2: Replace the hero subhead `<p>` content**

Find the `<p>` containing "You're losing disputes…" and replace its text content with:

```tsx
Live in the Stripe App Marketplace. Install WinBack from the marketplace,
open any dispute in your Stripe Dashboard, and get a reason-code playbook
plus an AI-drafted narrative ready for review. Pay 15% only when you win,
or go flat at $79/month.
```

- [ ] **Step 3: Replace the hero CTA `<WaitlistForm />` block with the install CTA + secondary link**

Find:

```tsx
<div className="flex flex-col sm:flex-row gap-4 max-w-md" id="waitlist">
  <WaitlistForm />
</div>
```

Replace with:

```tsx
<div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
  <InstallCTA primary />
  <a
    href="#walkthrough"
    className="text-on-surface-variant hover:text-white transition-colors font-[family-name:var(--font-inter)] text-sm underline-offset-4 hover:underline"
  >
    See how it works
  </a>
</div>
<p className="text-slate-500 font-[family-name:var(--font-inter)] text-xs">
  Opens Stripe Marketplace in a new tab.
</p>
```

- [ ] **Step 4: Update the trust microcopy below the CTA**

Find:

```tsx
<span>Lives in your Stripe Dashboard</span>
<span className="hidden sm:block w-12 h-px bg-outline-variant/30" />
<span>No credit card required</span>
```

Replace `No credit card required` with `Stripe account required · No setup fee`:

```tsx
<span>Lives in your Stripe Dashboard</span>
<span className="hidden sm:block w-12 h-px bg-outline-variant/30" />
<span>Stripe account required · No setup fee</span>
```

- [ ] **Step 5: Remove the now-unused `WaitlistForm` import from the Hero scope**

If the only remaining `WaitlistForm` usage is in `FinalCTA`, leave the import. Task 12 removes it from `FinalCTA`, after which an import cleanup happens in Task 16.

- [ ] **Step 6: Typecheck**

```bash
cd /Users/joeb/Projects/WinBack/backend && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 7: Commit**

```bash
git add backend/app/page.tsx
git commit -m "feat(backend): flip hero to install CTA + live status badge"
```

---

## Task 11: Update ComparisonTable in page.tsx

**Files:**
- Modify: `backend/app/page.tsx` (the `ComparisonTable` function)

- [ ] **Step 1: Add an "Available now" tag to the two WinBack Integration cells**

Find the WinBack Pay-Per-Win row's Integration cell:

```tsx
<td className="px-4 sm:px-8 py-5 sm:py-8 text-primary/90 font-medium hidden sm:table-cell">
  1-Click Stripe App
</td>
```

Replace with:

```tsx
<td className="px-4 sm:px-8 py-5 sm:py-8 text-primary/90 font-medium hidden sm:table-cell">
  <span className="inline-flex items-center gap-2">
    1-Click Stripe App
    <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 text-primary text-[10px] font-bold uppercase tracking-wider px-2 py-0.5">
      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
      Available now
    </span>
  </span>
</td>
```

Do the same for the WinBack Pro row (same change, same cell shape).

- [ ] **Step 2: Typecheck**

```bash
cd /Users/joeb/Projects/WinBack/backend && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add backend/app/page.tsx
git commit -m "feat(backend): add Available now tag to WinBack comparison rows"
```

---

## Task 12: Update FinalCTA in page.tsx

**Files:**
- Modify: `backend/app/page.tsx` (the `FinalCTA` function)

- [ ] **Step 1: Replace the FinalCTA subhead copy**

Find:

```tsx
The system isn&apos;t rigged. You just need the right playbook.
Join the waitlist and be first to get issuer-side expertise in your
Stripe Dashboard.
```

Replace with:

```tsx
The system isn&apos;t rigged. You just need the right playbook.
Install WinBack from the Stripe App Marketplace and get a step-by-step
response on every dispute.
```

- [ ] **Step 2: Replace the FinalCTA form block with the install CTA**

Find:

```tsx
<div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mt-12">
  <WaitlistForm />
</div>
```

Replace with:

```tsx
<div className="flex justify-center mt-12">
  <InstallCTA primary />
</div>
```

- [ ] **Step 3: Update the microcopy below the button**

Find:

```tsx
No credit card required &bull; Secure Stripe connection
```

Replace with:

```tsx
Stripe account required &bull; No setup fee
```

- [ ] **Step 4: Typecheck**

```bash
cd /Users/joeb/Projects/WinBack/backend && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add backend/app/page.tsx
git commit -m "feat(backend): flip final CTA to install action"
```

---

## Task 13: Reorder page sections and insert new sections

**Files:**
- Modify: `backend/app/page.tsx` (the default-exported `Home` function at the bottom)

This is the load-bearing structural change. Verify the result matches the page-layout table in the spec.

- [ ] **Step 1: Add imports for the new section components**

Near the existing component imports at the top of `page.tsx`:

```tsx
import { InstallWalkthrough } from "./components/install-walkthrough";
import { FAQ } from "./components/faq";
import { WaitlistFallback } from "./components/waitlist-fallback";
```

- [ ] **Step 2: Replace the `Home` function body**

Current:

```tsx
export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative overflow-hidden pt-24">
        <RibbonBackground />
        <Hero />
        <PricingCallout />
        <ComparisonTable />
        <FeatureGrid />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
```

Replace with:

```tsx
export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative overflow-hidden pt-24">
        <RibbonBackground />
        <Hero />
        <InstallWalkthrough />
        <FeatureGrid />
        <PricingCallout />
        <ComparisonTable />
        <FAQ />
        <FinalCTA />
        <WaitlistFallback />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 3: Typecheck**

```bash
cd /Users/joeb/Projects/WinBack/backend && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add backend/app/page.tsx
git commit -m "feat(backend): reorder sections and insert walkthrough, FAQ, waitlist fallback"
```

---

## Task 14: Add page-level JSON-LD to page.tsx

**Files:**
- Modify: `backend/app/page.tsx` (the `Home` function)

- [ ] **Step 1: Add imports needed for the schemas**

At the top of `page.tsx`, alongside existing imports:

```tsx
import {
  MARKETPLACE_URL,
  SITE_URL,
  PRICING,
  ORGANIZATION,
} from "./lib/marketing";
import { FAQ_ITEMS } from "./content/faq";
```

- [ ] **Step 2: Define the schema objects inside the `Home` function**

Add at the top of the `Home` function (before the `return`):

```tsx
const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "WinBack",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: SITE_URL,
  installUrl: MARKETPLACE_URL,
  offers: [
    {
      "@type": "Offer",
      name: PRICING.payPerWin.name,
      price: PRICING.payPerWin.monthlyPriceUsd.toString(),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: MARKETPLACE_URL,
      description: PRICING.payPerWin.description,
    },
    {
      "@type": "Offer",
      name: PRICING.pro.name,
      price: PRICING.pro.monthlyPriceUsd.toString(),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: MARKETPLACE_URL,
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: PRICING.pro.monthlyPriceUsd.toString(),
        priceCurrency: "USD",
        billingDuration: "P1M",
        unitText: "MONTH",
      },
      description: PRICING.pro.description,
    },
  ],
  provider: {
    "@type": "Organization",
    name: ORGANIZATION.legalName,
    url: ORGANIZATION.url,
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};
```

- [ ] **Step 3: Render the JSON-LD blocks inside the page output**

Inside the returned JSX, add the two `<script>` tags inside the `<main>` or just before it:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(softwareApplicationSchema),
  }}
/>
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(faqSchema),
  }}
/>
```

Place these immediately after `<RibbonBackground />` so they render in the main DOM tree but do not affect layout.

- [ ] **Step 4: Typecheck**

```bash
cd /Users/joeb/Projects/WinBack/backend && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add backend/app/page.tsx
git commit -m "feat(backend): emit SoftwareApplication + FAQPage JSON-LD on homepage"
```

---

## Task 15: Update Footer in page.tsx

**Files:**
- Modify: `backend/app/page.tsx` (the `Footer` function)

- [ ] **Step 1: Add a Stripe Marketplace link to the footer**

Find the existing footer link list (Terms / Privacy / Contact). Add a fourth `<a>` for the marketplace, sourced from `MARKETPLACE_URL`:

```tsx
<a
  href={MARKETPLACE_URL}
  target="_blank"
  rel="noopener noreferrer"
  className="text-slate-500 hover:text-cyan-400 transition-colors font-[family-name:var(--font-inter)] tracking-widest uppercase text-[10px] opacity-80 hover:opacity-100 inline-flex items-center gap-1"
>
  Stripe Marketplace
  <svg
    aria-hidden="true"
    width="10"
    height="10"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
</a>
```

`MARKETPLACE_URL` is already imported in Task 14; no new import needed.

- [ ] **Step 2: Typecheck**

```bash
cd /Users/joeb/Projects/WinBack/backend && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add backend/app/page.tsx
git commit -m "feat(backend): add Stripe Marketplace link to footer"
```

---

## Task 16: Copy sweep and remove unused WaitlistForm import in page.tsx

**Files:**
- Modify: `backend/app/page.tsx`

- [ ] **Step 1: Remove the `WaitlistForm` import**

`WaitlistForm` is no longer used in `page.tsx` directly (it's now only consumed via `<WaitlistFallback />`). Remove this line:

```tsx
import { WaitlistForm } from "./components/waitlist-form";
```

- [ ] **Step 2: Search for residual stale phrasing**

```bash
cd /Users/joeb/Projects/WinBack/backend && grep -nE "waitlist|early access|coming soon|be first to|join the waitlist" app/page.tsx
```

Expected: only matches inside the `WaitlistFallback` framing ("Get a heads up when we add general signup" is allowed; "Not on Stripe yet?" is allowed). Any other surfaced text needs to be reworded to live-product language. If a match shows in Hero / FinalCTA / Navbar / FeatureGrid, fix it.

- [ ] **Step 3: Typecheck**

```bash
cd /Users/joeb/Projects/WinBack/backend && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add backend/app/page.tsx
git commit -m "chore(backend): remove unused WaitlistForm import and finish copy sweep"
```

---

## Task 17: Rewrite layout.tsx metadata

**Files:**
- Modify: `backend/app/layout.tsx`

- [ ] **Step 1: Replace the `metadata` export**

Find the existing `export const metadata: Metadata = { ... };` block (lines 25-47 in current HEAD) and replace with:

```tsx
export const metadata: Metadata = {
  title: "WinBack: Stripe App for Chargebacks and Dispute Response",
  description:
    "Respond to Stripe disputes with reason-code playbooks and AI-drafted narratives. Install WinBack from the Stripe App Marketplace. Pay 15% per win or $79/month flat.",
  keywords: [
    "Stripe disputes",
    "Stripe chargebacks",
    "chargeback response",
    "dispute playbook",
    "Stripe app for disputes",
    "reason code playbook",
  ],
  authors: [{ name: "JB Technology LLC", url: "https://winbackpay.com" }],
  metadataBase: new URL("https://winbackpay.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "WinBack: Stripe App for Chargebacks and Dispute Response",
    description:
      "Respond to Stripe disputes with reason-code playbooks and AI-drafted narratives. Pay 15% per win or $79/month flat.",
    url: "https://winbackpay.com",
    siteName: "WinBack",
    type: "website",
    images: [
      {
        url: "/og-card.png",
        width: 1200,
        height: 630,
        alt: "WinBack: Stripe App for Chargebacks and Dispute Response",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WinBack: Stripe App for Chargebacks and Dispute Response",
    description:
      "Respond to Stripe disputes with reason-code playbooks and AI-drafted narratives. Pay 15% per win or $79/month flat.",
    images: ["/og-card.png"],
  },
};
```

- [ ] **Step 2: Typecheck**

```bash
cd /Users/joeb/Projects/WinBack/backend && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add backend/app/layout.tsx
git commit -m "feat(backend): rewrite layout metadata for live launch + OG card"
```

---

## Task 18: Add Organization JSON-LD to layout.tsx

**Files:**
- Modify: `backend/app/layout.tsx`

- [ ] **Step 1: Add the ORGANIZATION import at the top of `layout.tsx`**

```tsx
import { ORGANIZATION } from "./lib/marketing";
```

- [ ] **Step 2: Add the Organization schema to the layout body**

Inside the `<body>` element in `RootLayout`, add a `<script>` tag just before `{children}`:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: ORGANIZATION.legalName,
      url: ORGANIZATION.url,
    }),
  }}
/>
{children}
```

- [ ] **Step 2: Typecheck**

```bash
cd /Users/joeb/Projects/WinBack/backend && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add backend/app/layout.tsx
git commit -m "feat(backend): add Organization JSON-LD to layout"
```

---

## Task 19: Add llms.txt

**Files:**
- Create: `backend/public/llms.txt`

- [ ] **Step 1: Write `llms.txt`**

```text
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

- [ ] **Step 2: Verify the file is reachable in dev**

```bash
cd /Users/joeb/Projects/WinBack/backend && npm run dev &
DEV_PID=$!
sleep 8
curl -s http://localhost:3000/llms.txt | head -3
kill $DEV_PID 2>/dev/null
```

Expected: the file content prints.

- [ ] **Step 3: Commit**

```bash
git add backend/public/llms.txt
git commit -m "feat(backend): add llms.txt for AI search engine discovery"
```

---

## Task 20: Add sitemap.ts

**Files:**
- Create: `backend/app/sitemap.ts`

- [ ] **Step 1: Write the sitemap route**

```typescript
// backend/app/sitemap.ts

import type { MetadataRoute } from "next";
import { SITE_URL } from "./lib/marketing";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];
}
```

- [ ] **Step 2: Typecheck**

```bash
cd /Users/joeb/Projects/WinBack/backend && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Verify the sitemap renders correctly**

```bash
cd /Users/joeb/Projects/WinBack/backend && npm run dev &
DEV_PID=$!
sleep 8
curl -s http://localhost:3000/sitemap.xml | head -10
kill $DEV_PID 2>/dev/null
```

Expected: XML output containing `<url><loc>https://winbackpay.com</loc>...`.

- [ ] **Step 4: Commit**

```bash
git add backend/app/sitemap.ts
git commit -m "feat(backend): add sitemap.ts for crawler discovery"
```

---

## Task 21: Add robots.ts

**Files:**
- Create: `backend/app/robots.ts`

- [ ] **Step 1: Write the robots route**

```typescript
// backend/app/robots.ts

import type { MetadataRoute } from "next";
import { SITE_URL } from "./lib/marketing";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/setup-billing", "/upgrade"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
```

- [ ] **Step 2: Typecheck**

```bash
cd /Users/joeb/Projects/WinBack/backend && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Verify the robots renders correctly**

```bash
cd /Users/joeb/Projects/WinBack/backend && npm run dev &
DEV_PID=$!
sleep 8
curl -s http://localhost:3000/robots.txt
kill $DEV_PID 2>/dev/null
```

Expected: text output containing `User-agent: *`, `Allow: /`, `Disallow: /api/`, `Sitemap: https://winbackpay.com/sitemap.xml`.

- [ ] **Step 4: Commit**

```bash
git add backend/app/robots.ts
git commit -m "feat(backend): add robots.ts allowing crawl with Disallow on /api"
```

---

## Task 22: Add OG card asset

**Files:**
- Create: `backend/public/og-card.png`

This task is a one-time asset drop. Joe generates a 1200x630 PNG and places it at `backend/public/og-card.png`. The placeholder version is acceptable for v1: a clean WinBack logo on the brand color background (no marketing claims rendered into the image).

- [ ] **Step 1: Confirm asset exists**

```bash
ls -la /Users/joeb/Projects/WinBack/backend/public/og-card.png
```

Expected: file exists, size > 10KB and < 8MB.

- [ ] **Step 2: Verify accessibility from dev server**

```bash
cd /Users/joeb/Projects/WinBack/backend && npm run dev &
DEV_PID=$!
sleep 8
curl -sI http://localhost:3000/og-card.png | head -3
kill $DEV_PID 2>/dev/null
```

Expected: `HTTP/1.1 200` and `Content-Type: image/png`.

- [ ] **Step 3: Commit**

```bash
git add backend/public/og-card.png
git commit -m "feat(backend): add og-card.png for social share previews"
```

If the OG card is not ready when this task runs, ship the page without the file. Open Graph image lookups will 404 on social shares until the asset lands; not a blocker for the landing-page redesign itself.

---

## Task 23: Capture walkthrough screenshots (conditional)

**Files:**
- Create: `backend/public/walkthrough/01-install.png`
- Create: `backend/public/walkthrough/02-open-dispute.png`
- Create: `backend/public/walkthrough/03-playbook.png`
- Create: `backend/public/walkthrough/04-submit.png`

This task is owned by Joe and uses the live WinBack install on WinBack's own Stripe account (acct_1TIwcOCbmbWLiv6V, per CLAUDE.md QA topology). Captures should be 2x (Retina) PNGs, cropped to the relevant UI region. If screenshots are not ready when the rest of the implementation is complete, skip this task, the spec says the `InstallWalkthrough` section ships in a follow-up PR rather than landing with placeholders.

- [ ] **Step 1: Capture and place screenshots**

Capture each of the four screenshots per the spec's caption / alt-text description, save as `01-install.png` / `02-open-dispute.png` / `03-playbook.png` / `04-submit.png` in `backend/public/walkthrough/`.

- [ ] **Step 2: If screenshots are ready, commit them and keep `<InstallWalkthrough />` in `page.tsx`**

```bash
mkdir -p /Users/joeb/Projects/WinBack/backend/public/walkthrough
# (copy/save the four PNGs into that directory)
git add backend/public/walkthrough/
git commit -m "feat(backend): add walkthrough screenshots from live install"
```

- [ ] **Step 3: If screenshots are NOT ready, remove the walkthrough from the page composition**

Edit `backend/app/page.tsx`:

- Remove `<InstallWalkthrough />` from the `Home` function's JSX.
- Remove the `import { InstallWalkthrough } from "./components/install-walkthrough";` line.
- In `Hero`, remove or hide the secondary `See how it works` link (delete the entire `<a href="#walkthrough">…</a>` block).

Then commit:

```bash
git add backend/app/page.tsx
git commit -m "chore(backend): defer InstallWalkthrough to follow-up PR (no screenshots yet)"
```

The `install-walkthrough.tsx` component itself stays in the codebase, dormant, ready for a follow-up PR that re-adds the import + render when screenshots land.

---

## Task 24: Typecheck the full backend

**Files:** None.

- [ ] **Step 1: Run `tsc --noEmit`**

```bash
cd /Users/joeb/Projects/WinBack/backend && npx tsc --noEmit
```

Expected: no errors. (CLAUDE.md memory `feedback_backend_tsc_before_push` says to run this before pushing backend code.)

If any error appears, fix it before continuing. Do not push backend code with a red typecheck.

---

## Task 25: Run backend unit tests

**Files:** None.

- [ ] **Step 1: Run `npm test`**

```bash
cd /Users/joeb/Projects/WinBack/backend && npm test
```

Expected: PASS, including the new `waitlist-form.test.tsx`.

If anything fails, fix before continuing.

---

## Task 26: Run backend integration tests (CLAUDE.md pre-PR checklist)

**Files:** None.

CLAUDE.md mandates this for any PR touching `backend/**`.

- [ ] **Step 1: Run integration tests**

```bash
cd /Users/joeb/Projects/WinBack/backend && npm run test:integration
```

Expected: PASS in ~3 seconds. The dispute wizard E2E flow exercises the routes this redesign does not touch, but a red integration test still blocks the merge.

If anything fails, diagnose and fix before continuing.

---

## Task 27: Local visual review

**Files:** None.

- [ ] **Step 1: Start the dev server**

```bash
cd /Users/joeb/Projects/WinBack/backend && npm run dev
```

- [ ] **Step 2: Walk through the page in the browser at http://localhost:3000**

Verify each of the following:

- Status badge in hero reads "Live in the Stripe App Marketplace" with the green pulsing dot.
- Navbar "Install from Stripe Marketplace" button opens `marketplace.stripe.com/apps/winback` in a new tab.
- Hero primary CTA opens the same URL in a new tab.
- Hero secondary "See how it works" link smooth-scrolls to the InstallWalkthrough section (only if Task 23 captured the screenshots; otherwise this link should have been removed in Task 23 Step 3).
- Hero microcopy reads "Stripe account required · No setup fee" (NOT "No credit card required").
- The "Opens Stripe Marketplace in a new tab" note appears below the primary CTA.
- Section order is Hero → InstallWalkthrough (if present) → FeatureGrid → PricingCallout → ComparisonTable → FAQ → FinalCTA → WaitlistFallback → Footer.
- ComparisonTable WinBack rows show the green "Available now" tag in the Integration column on desktop (≥640px).
- FAQ accordion: clicking a question expands it, clicking again collapses, clicking another question switches.
- WaitlistFallback section reads "Not on Stripe yet?", submit button reads "Get notified", placeholder reads "Enter your email".
- FinalCTA button reads "Install from Stripe Marketplace" (NOT "Join Waitlist"). Microcopy reads "Stripe account required · No setup fee".
- Footer has a "Stripe Marketplace" link with an external-link icon, opening in a new tab.
- View page source (Cmd+U on Chrome). Confirm three `<script type="application/ld+json">` blocks render: Organization (from layout), SoftwareApplication (from page), FAQPage (from page).
- Resize the window to mobile width (375px). Confirm hero CTA stacks above the secondary link, walkthrough tiles stack to one column, FAQ remains usable.

- [ ] **Step 3: Submit a test email through the WaitlistFallback to confirm the form still works**

In the page, scroll to the "Not on Stripe yet?" section. Enter a real test email (e.g., `joeb+landingtest@winbackpay.com`). Submit. Expected success message: `We'll let you know.` / `You're on the list for general signup.`

Then verify the email row landed in Supabase by querying the `waitlist` table (use the Supabase Dashboard SQL editor or the MCP `execute_sql` tool against the `Winback Dev` project), and confirm the Resend welcome email was triggered (visible in the Resend dashboard).

If the form fails silently or the success state is wrong, the WaitlistForm prop changes from Task 7 broke something. Diagnose and fix.

- [ ] **Step 4: Semantic HTML quick audit**

In the browser DevTools, run this in the console on the homepage:

```javascript
{
  h1: document.querySelectorAll("h1").length,
  h2: document.querySelectorAll("h2").length,
  h3: document.querySelectorAll("h3").length,
  imgsWithoutAlt: [...document.querySelectorAll("img")].filter(i => !i.hasAttribute("alt")).length,
  iconLinksWithoutLabel: [...document.querySelectorAll("a")].filter(a => !a.textContent.trim() && !a.getAttribute("aria-label")).length,
}
```

Expected:
- `h1: 1`, exactly one h1, in the hero.
- `h2: ≥ 5`, section headings.
- `h3: ≥ 1`, sub-headings.
- `imgsWithoutAlt: 0`, every image has alt text (decorative images use `alt=""`).
- `iconLinksWithoutLabel: 0`, every icon-only link has an aria-label.

If any number is wrong, fix in the relevant component before continuing.

- [ ] **Step 5: Stop the dev server**

`Ctrl+C` in the dev server terminal.

If anything in Step 2 is wrong, fix in the relevant component, re-verify, then continue.

---

## Task 28: Run the /seo skill audit against the staging build

**Files:** None.

- [ ] **Step 1: Push the branch to the Vercel preview environment**

```bash
cd /Users/joeb/Projects/WinBack && git push -u origin feat/landing-page-live-redesign
```

Vercel auto-creates a preview deployment for the branch. Wait ~1-2 minutes for the build to finish; the preview URL is visible in the Vercel dashboard under the branch.

- [ ] **Step 2: Run the `/seo` skill against the preview URL**

In the Claude Code session:

```
/seo <preview-url>
```

The `/seo` skill audits metadata, structured data, performance, accessibility, and SEO basics against the rendered page.

- [ ] **Step 3: Address findings**

Any P1 or P2 issue surfaced by the skill must be fixed before the PR is merged. P3 / informational findings are optional follow-ups.

Repeat Steps 1-3 after each fix (push → re-audit → fix → push) until `/seo` returns clean.

---

## Task 29: Validate JSON-LD with Google Rich Results Test + Schema.org validator

**Files:** None.

- [ ] **Step 1: Open Google Rich Results Test**

Visit `https://search.google.com/test/rich-results` and paste the Vercel preview URL.

Expected: at least one valid item is detected (the `SoftwareApplication` and/or `FAQPage` schema). No errors. Warnings about optional fields (e.g., `aggregateRating`) are acceptable because we explicitly do not ship fabricated ratings.

- [ ] **Step 2: Open Schema.org validator**

Visit `https://validator.schema.org/` and paste the same preview URL.

Expected: all three schemas (`Organization`, `SoftwareApplication`, `FAQPage`) parse cleanly. No errors.

- [ ] **Step 3: Fix anything flagged as error (not warning)**

Errors in schema shape (e.g., missing required `name` on an Offer, malformed `priceCurrency`) must be fixed in `app/lib/marketing.ts`, `app/content/faq.ts`, or the schema object in `page.tsx` / `layout.tsx`. Warnings about optional fields are informational.

---

## Task 30: Lighthouse check

**Files:** None.

- [ ] **Step 1: Run Lighthouse against the preview URL**

Open Chrome DevTools → Lighthouse tab → run a Performance + Accessibility + Best Practices + SEO audit against the Vercel preview URL on the Desktop preset.

Expected: all four scores ≥ 90. If any score drops below 90, inspect the report:

- **Performance drop:** most likely the walkthrough images. Verify each PNG is < 500KB and that `next/image` is doing its WebP conversion. If a single PNG is > 1MB, recompress before re-running.
- **Accessibility drop:** Lighthouse will name the offending element. Common issue: missing `alt` on the OG card image (only in the source HTML, not user-visible); set a non-empty `alt` value.
- **SEO drop:** Lighthouse should now be clean because metadata, canonical, robots, and sitemap are all wired up.
- **Best Practices drop:** check console errors on the preview build. Missing assets (e.g., walkthrough PNGs if they did not ship) can land here.

Fix and re-run until all scores ≥ 90.

---

## Task 31: Open the pull request

**Files:** None.

- [ ] **Step 1: Confirm the branch is up to date with main**

```bash
cd /Users/joeb/Projects/WinBack
git fetch origin
git log --oneline main..feat/landing-page-live-redesign
git log --oneline feat/landing-page-live-redesign..origin/main
```

Expected: the first command lists this branch's commits (one per task); the second command is empty. If `main` has moved, rebase onto it: `git rebase origin/main`.

- [ ] **Step 2: Push the latest state**

```bash
git push
```

- [ ] **Step 3: Create the PR**

```bash
gh pr create --title "feat: landing page live-launch redesign + SEO pass" --body "$(cat <<'EOF'
## Summary

- Flips winbackpay.com from waitlist framing to "live in Stripe App Marketplace" framing
- Replaces every waitlist CTA with an Install CTA pointed at marketplace.stripe.com/apps/winback
- Adds new sections: InstallWalkthrough, FAQ, WaitlistFallback (above the footer)
- Reorders the page so the walkthrough lands before pricing and comparison
- Demotes the existing waitlist form to a small fallback for visitors without a Stripe account
- Folds in an on-page SEO pass: metadata rewrite, JSON-LD SoftwareApplication + FAQPage + Organization, llms.txt, sitemap.ts, robots.ts, OG card

Spec: docs/superpowers/specs/2026-05-13-landing-page-live-redesign-design.md
Codex review applied: page flow re-ordered, CTA copy fixed, walkthrough placeholder policy enforced, JSON-LD moved to page-level.

## Test plan

- [x] Backend typecheck: `cd backend && npx tsc --noEmit`
- [x] Backend unit tests: `cd backend && npm test`
- [x] Backend integration tests: `cd backend && npm run test:integration`
- [x] Local visual review on desktop + mobile widths
- [x] `/seo` skill audit on Vercel preview deployment
- [x] Google Rich Results Test + Schema.org validator on preview deployment
- [x] Lighthouse on preview deployment (Performance / Accessibility / Best Practices / SEO all ≥ 90)
- [ ] Walkthrough screenshots captured and placed (or section deferred to follow-up PR if not ready)
- [ ] OG card asset placed at `backend/public/og-card.png` (placeholder acceptable for v1)
EOF
)"
```

- [ ] **Step 4: Wait for Vercel preview check to pass**

`gh pr checks` until the Vercel preview deployment shows green.

- [ ] **Step 5: Hand off to Joe**

Stop. Do not merge or push to `main` autonomously per CLAUDE.md guidance ("Pushing to `main` is a deploy action. Treat it as risky/visible … confirm before pushing, even for 'ready to ship' PRs"). Joe reviews the preview, confirms screenshots/OG card are acceptable, and triggers the merge.

---

## Post-merge follow-ups (not part of this PR)

These are noted here for handoff after the redesign ships. They are not part of the merge gate.

- Request reindex of `winbackpay.com` via Google Search Console so the new metadata + structured data are crawled quickly.
- If walkthrough screenshots were not ready at merge time: capture them, add them to `backend/public/walkthrough/`, re-add `<InstallWalkthrough />` to `page.tsx`, re-add the `See how it works` hero link, ship as a follow-up PR.
- If the OG card was a placeholder at merge time: replace `backend/public/og-card.png` with the final design and re-deploy. Re-share on any social channels that already cached the placeholder.
- If `/seo` flagged P3 findings, triage and decide which are worth a follow-up.
