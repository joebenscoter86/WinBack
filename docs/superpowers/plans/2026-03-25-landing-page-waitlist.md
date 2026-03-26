# WIN-6: Landing Page with Waitlist Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy WinBack's marketing landing page with email waitlist capture at the root `/` of the Next.js backend.

**Architecture:** Single-page landing site served from the existing Next.js 16 backend. Server component for the page, one client component for the waitlist form, one API route for email capture, and a Supabase migration for the waitlist table. All styling via Tailwind CSS with custom design tokens.

**Tech Stack:** Next.js 16 (App Router), Tailwind CSS 4, Supabase (PostgreSQL), React 19, Vitest

**Spec:** `docs/superpowers/specs/2026-03-25-landing-page-waitlist-design.md`

---

## File Structure

| File | Action | Responsibility |
|------|--------|----------------|
| `app/globals.css` | Modify | Design tokens as CSS custom properties, dark theme, font imports |
| `app/layout.tsx` | Modify | Space Grotesk + Manrope via next/font, SEO metadata |
| `app/page.tsx` | Rewrite | Landing page: navbar, hero, features, comparison, CTA, footer |
| `app/components/waitlist-form.tsx` | Create | Client component: email input, submit, success/error states |
| `app/api/waitlist/route.ts` | Create | POST endpoint: validate email, insert into Supabase |
| `app/api/waitlist/__tests__/route.test.ts` | Create | Tests for waitlist API route |
| `public/logo.png` | Create | Copy WinBack logo from stripe-app/src/assets |
| `supabase/migrations/20260325_create_waitlist.sql` | Create | Waitlist table migration |

---

### Task 1: Supabase Migration for Waitlist Table

**Files:**
- Create: `backend/supabase/migrations/20260325_create_waitlist.sql`

- [ ] **Step 1: Create the migration file**

```sql
create table public.waitlist (
  id uuid default gen_random_uuid() primary key,
  email text not null unique,
  source text default 'landing_page',
  created_at timestamptz default now()
);
```

- [ ] **Step 2: Run the migration against Supabase**

Run: `cd /Users/joeb/Projects/WinBack && npx supabase db push` (if using Supabase CLI) or execute the SQL directly in the Supabase dashboard SQL editor.

Expected: Table `waitlist` created successfully.

- [ ] **Step 3: Verify the table exists**

Run the following SQL in Supabase dashboard or CLI:
```sql
select column_name, data_type, is_nullable from information_schema.columns where table_name = 'waitlist';
```

Expected: 4 columns (id, email, source, created_at) with correct types.

- [ ] **Step 4: Commit**

```bash
git add backend/supabase/migrations/20260325_create_waitlist.sql
git commit -m "feat(backend): add waitlist table migration (WIN-6)"
```

---

### Task 2: Waitlist API Route (TDD)

**Files:**
- Create: `backend/app/api/waitlist/route.ts`
- Create: `backend/app/api/waitlist/__tests__/route.test.ts`
- Reference: `backend/lib/supabase.ts` (existing Supabase client)

- [ ] **Step 1: Write the failing tests**

Create `backend/app/api/waitlist/__tests__/route.test.ts`:

```typescript
import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock Supabase before importing the route
vi.mock("@/lib/supabase", () => ({
  supabase: {
    from: vi.fn(),
  },
}));

import { POST } from "../route";
import { supabase } from "@/lib/supabase";

function makeRequest(body: unknown): Request {
  return new Request("http://localhost/api/waitlist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/waitlist", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 200 and inserts a valid email", async () => {
    const mockInsert = vi.fn().mockResolvedValue({ error: null });
    vi.mocked(supabase.from).mockReturnValue({
      insert: mockInsert,
    } as any);

    const res = await POST(makeRequest({ email: "test@example.com" }));
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json).toEqual({ success: true });
    expect(supabase.from).toHaveBeenCalledWith("waitlist");
    expect(mockInsert).toHaveBeenCalledWith({
      email: "test@example.com",
      source: "landing_page",
    });
  });

  it("returns 400 for missing email", async () => {
    const res = await POST(makeRequest({}));
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json).toEqual({ success: false, error: "Invalid email address" });
  });

  it("returns 400 for invalid email format", async () => {
    const res = await POST(makeRequest({ email: "not-an-email" }));
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json).toEqual({ success: false, error: "Invalid email address" });
  });

  it("returns 200 for duplicate email (unique constraint violation)", async () => {
    const mockInsert = vi.fn().mockResolvedValue({
      error: { code: "23505", message: "duplicate key" },
    });
    vi.mocked(supabase.from).mockReturnValue({
      insert: mockInsert,
    } as any);

    const res = await POST(makeRequest({ email: "existing@example.com" }));
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json).toEqual({ success: true });
  });

  it("returns 500 for unexpected Supabase errors", async () => {
    const mockInsert = vi.fn().mockResolvedValue({
      error: { code: "42000", message: "something broke" },
    });
    vi.mocked(supabase.from).mockReturnValue({
      insert: mockInsert,
    } as any);

    const res = await POST(makeRequest({ email: "test@example.com" }));
    const json = await res.json();

    expect(res.status).toBe(500);
    expect(json).toEqual({ success: false, error: "Something went wrong. Please try again." });
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd /Users/joeb/Projects/WinBack/backend && npm test -- app/api/waitlist/__tests__/route.test.ts`

Expected: FAIL because `../route` does not export `POST`.

- [ ] **Step 3: Implement the API route**

Create `backend/app/api/waitlist/route.ts`:

```typescript
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: { email?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid email address" },
      { status: 400 }
    );
  }

  const email = body.email?.trim().toLowerCase();

  if (!email || !EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { success: false, error: "Invalid email address" },
      { status: 400 }
    );
  }

  const { error } = await supabase.from("waitlist").insert({
    email,
    source: "landing_page",
  });

  // Duplicate email: return success (don't reveal it already exists)
  if (error?.code === "23505") {
    return NextResponse.json({ success: true });
  }

  if (error) {
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd /Users/joeb/Projects/WinBack/backend && npm test -- app/api/waitlist/__tests__/route.test.ts`

Expected: All 5 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add backend/app/api/waitlist/route.ts backend/app/api/waitlist/__tests__/route.test.ts
git commit -m "feat(backend): add waitlist API route with tests (WIN-6)"
```

---

### Task 3: Design Tokens and Global Styles

**Files:**
- Modify: `backend/app/globals.css`

- [ ] **Step 1: Replace globals.css with design tokens**

Replace the contents of `backend/app/globals.css` with:

```css
@import "tailwindcss";

:root {
  /* Background & Surfaces */
  --background: #0b1326;
  --surface-dim: #0b1326;
  --surface-container-lowest: #060e20;
  --surface-container-low: #131b2e;
  --surface-container: #171f33;
  --surface-container-high: #222a3d;
  --surface-container-highest: #2d3449;
  --surface-bright: #31394d;

  /* Text */
  --on-surface: #dae2fd;
  --on-surface-variant: #bccabe;
  --outline: #869489;
  --outline-variant: #3d4a41;

  /* Primary (Emerald / Win) */
  --primary: #00e475;
  --primary-container: #00a955;
  --on-primary: #003918;
  --primary-fixed: #62ff96;

  /* Secondary (Blue / Logo accent) */
  --secondary: #4cd6fb;
  --secondary-container: #00b2d6;

  /* Tertiary (Warning / Competitor) */
  --tertiary: #ffb3ae;
  --tertiary-container: #ff5956;

  /* Error */
  --error: #ffb4ab;
  --error-container: #93000a;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--on-surface);
  --color-surface-low: var(--surface-container-low);
  --color-surface: var(--surface-container);
  --color-surface-high: var(--surface-container-high);
  --color-surface-highest: var(--surface-container-highest);
  --color-surface-bright: var(--surface-bright);
  --color-on-surface: var(--on-surface);
  --color-on-surface-variant: var(--on-surface-variant);
  --color-outline: var(--outline);
  --color-primary: var(--primary);
  --color-primary-container: var(--primary-container);
  --color-on-primary: var(--on-primary);
  --color-secondary: var(--secondary);
  --color-tertiary: var(--tertiary);
  --color-tertiary-container: var(--tertiary-container);
  --font-sans: var(--font-manrope);
  --font-display: var(--font-space-grotesk);
}

body {
  background: var(--background);
  color: var(--on-surface);
}
```

- [ ] **Step 2: Verify the dev server starts without errors**

Run: `cd /Users/joeb/Projects/WinBack/backend && npm run dev`

Open in browser. Page should render with dark background (`#0b1326`). Stop the dev server after verifying.

- [ ] **Step 3: Commit**

```bash
git add backend/app/globals.css
git commit -m "feat(backend): add design tokens for Aggressive Advocate theme (WIN-6)"
```

---

### Task 4: Layout with Fonts and SEO Metadata

**Files:**
- Modify: `backend/app/layout.tsx`

- [ ] **Step 1: Update layout.tsx with fonts and metadata**

Replace the contents of `backend/app/layout.tsx` with:

```tsx
import type { Metadata } from "next";
import { Space_Grotesk, Manrope } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "WinBack: Stop Giving Away 30% of Your Recovered Revenue",
  description:
    "$29/month flat fee dispute resolution for Stripe merchants. No success fees. Guided playbooks built from 10+ years of issuer-side experience.",
  metadataBase: new URL("https://winbackpay.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "WinBack: Stop Giving Away 30% of Your Recovered Revenue",
    description:
      "$29/month flat fee dispute resolution for Stripe merchants. No success fees.",
    url: "https://winbackpay.com",
    siteName: "WinBack",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WinBack: Stop Giving Away 30% of Your Recovered Revenue",
    description:
      "$29/month flat fee dispute resolution for Stripe merchants. No success fees.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${manrope.variable} antialiased`}
    >
      <body className="min-h-screen bg-background text-on-surface font-sans">
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Verify fonts load correctly**

Run: `cd /Users/joeb/Projects/WinBack/backend && npm run dev`

Open browser, inspect the page. Confirm:
- Body text uses Manrope
- CSS variables `--font-space-grotesk` and `--font-manrope` are set on `<html>`
- Page title in browser tab shows "WinBack: Stop Giving Away 30%..."

Stop the dev server after verifying.

- [ ] **Step 3: Commit**

```bash
git add backend/app/layout.tsx
git commit -m "feat(backend): add Space Grotesk + Manrope fonts and SEO metadata (WIN-6)"
```

---

### Task 5: Copy Logo to Public Directory

**Files:**
- Create: `backend/public/logo.png`

- [ ] **Step 1: Copy the logo from stripe-app assets**

```bash
cp /Users/joeb/Projects/WinBack/stripe-app/src/assets/winback_logo.png /Users/joeb/Projects/WinBack/backend/public/logo.png
```

- [ ] **Step 2: Clean up old default assets**

Remove the default Next.js SVGs that are no longer needed:

```bash
rm /Users/joeb/Projects/WinBack/backend/public/next.svg
rm /Users/joeb/Projects/WinBack/backend/public/vercel.svg
rm /Users/joeb/Projects/WinBack/backend/public/file.svg
rm /Users/joeb/Projects/WinBack/backend/public/globe.svg
rm /Users/joeb/Projects/WinBack/backend/public/window.svg
```

- [ ] **Step 3: Commit**

```bash
git add backend/public/logo.png
git rm backend/public/next.svg backend/public/vercel.svg backend/public/file.svg backend/public/globe.svg backend/public/window.svg
git commit -m "feat(backend): add WinBack logo and remove default assets (WIN-6)"
```

---

### Task 6: Waitlist Form Client Component

**Files:**
- Create: `backend/app/components/waitlist-form.tsx`

- [ ] **Step 1: Create the waitlist form component**

Create `backend/app/components/waitlist-form.tsx`:

```tsx
"use client";

import { useState, FormEvent } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!email.trim()) return;

    setFormState("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();

      if (data.success) {
        setFormState("success");
      } else {
        setFormState("error");
        setErrorMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setFormState("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  }

  if (formState === "success") {
    return (
      <div className="text-center">
        <p className="text-primary text-lg font-semibold font-[family-name:var(--font-space-grotesk)]">
          You're on the list!
        </p>
        <p className="text-on-surface-variant text-sm mt-2">
          We'll be in touch.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="flex-1 bg-surface-highest rounded px-4 py-3.5 text-on-surface placeholder:text-outline text-sm outline-none focus:ring-2 focus:ring-secondary/50 transition-all"
        />
        <button
          type="submit"
          disabled={formState === "submitting"}
          className="bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold px-7 py-3.5 rounded text-sm whitespace-nowrap transition-opacity disabled:opacity-50 hover:opacity-90 cursor-pointer disabled:cursor-not-allowed"
        >
          {formState === "submitting" ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Joining...
            </span>
          ) : (
            "Join Waitlist"
          )}
        </button>
      </div>
      {formState === "error" && (
        <p className="text-tertiary-container text-sm mt-3 text-center">
          {errorMessage}
        </p>
      )}
    </form>
  );
}
```

- [ ] **Step 2: Verify the component compiles**

Run: `cd /Users/joeb/Projects/WinBack/backend && npx tsc --noEmit`

Expected: No type errors.

- [ ] **Step 3: Commit**

```bash
git add backend/app/components/waitlist-form.tsx
git commit -m "feat(backend): add waitlist form client component (WIN-6)"
```

---

### Task 7: Landing Page

**Files:**
- Rewrite: `backend/app/page.tsx`

This is the largest task. The page is a server component that renders all 6 sections. The `WaitlistForm` client component is imported for the CTA section.

- [ ] **Step 1: Replace page.tsx with the landing page**

Replace the contents of `backend/app/page.tsx` with:

```tsx
import Image from "next/image";
import { WaitlistForm } from "./components/waitlist-form";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-background/60">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="WinBack" width={32} height={32} />
          <span className="font-[family-name:var(--font-space-grotesk)] font-bold text-lg text-on-surface">
            WinBack
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-8">
          <a href="#comparison" className="text-on-surface-variant text-sm hover:text-on-surface transition-colors">
            Comparison
          </a>
          <a href="#features" className="text-on-surface-variant text-sm hover:text-on-surface transition-colors">
            Features
          </a>
          <a href="#pricing" className="text-on-surface-variant text-sm hover:text-on-surface transition-colors">
            Pricing
          </a>
          <a
            href="#waitlist"
            className="bg-gradient-to-r from-primary to-primary-container text-on-primary font-semibold px-5 py-2 rounded text-sm hover:opacity-90 transition-opacity"
          >
            Join Waitlist
          </a>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20 sm:py-32 flex flex-col sm:flex-row items-center gap-12 sm:gap-16">
      <div className="flex-1">
        <h1 className="font-[family-name:var(--font-space-grotesk)] text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
          Stop giving away{" "}
          <span className="text-primary">30%</span> of your recovered revenue.
        </h1>
        <p className="text-on-surface-variant text-lg sm:text-xl mt-6 leading-relaxed max-w-lg">
          $29/month flat, no success fees. Win back your revenue with our simple
          dispute submission guide.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-start gap-4">
          <a
            href="#waitlist"
            className="bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold px-8 py-4 rounded text-base hover:opacity-90 transition-opacity inline-flex items-center gap-2"
          >
            Join the Waitlist
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="ml-1">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
        <p className="text-outline text-sm mt-4">Early access opening soon</p>
      </div>
      <div className="flex-shrink-0">
        <div className="bg-surface-low rounded-xl p-8 sm:p-12">
          <Image
            src="/logo.png"
            alt="WinBack product"
            width={200}
            height={200}
            className="mx-auto"
          />
          <p className="font-[family-name:var(--font-space-grotesk)] text-on-surface font-bold text-xl text-center mt-4">
            WINBACK
          </p>
          <p className="text-outline text-xs text-center mt-1 tracking-[0.2em] uppercase">
            Safe &bull; Fast &bull; Secure
          </p>
        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-primary">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: "Direct Stripe Integration",
      description:
        "Seamlessly connect your existing payment flow. We monitor, notify, and prepare your defense without manual data entry.",
      accent: "primary",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-secondary">
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: "Minute-by-Minute Guidance",
      description:
        "Receive aggressive, step-by-step submission templates tailored to the specific reason code of every dispute.",
      accent: "secondary",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-primary">
          <path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: "Zero Hidden Fees",
      description:
        'No "success fees," no "revenue shares," no surprises. Just a professional tool for a transparent monthly price.',
      accent: "primary",
    },
  ];

  return (
    <section id="features" className="max-w-6xl mx-auto px-6 py-20">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="bg-surface-low rounded-xl p-8"
          >
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${
                feature.accent === "secondary"
                  ? "bg-secondary/10"
                  : "bg-primary/10"
              }`}
            >
              {feature.icon}
            </div>
            <h3 className="font-[family-name:var(--font-space-grotesk)] text-on-surface font-bold text-lg mb-2">
              {feature.title}
            </h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Comparison() {
  const competitors = [
    { name: "Smart Disputes", pricing: "30% success fee" },
    { name: "Chargeflow", pricing: "25% success fee" },
    { name: "DisputeNinja", pricing: "$499/month" },
  ];

  return (
    <section id="comparison" className="max-w-6xl mx-auto px-6 py-20">
      <h2 className="font-[family-name:var(--font-space-grotesk)] text-on-surface text-3xl sm:text-4xl font-bold text-center mb-2">
        WINBACK VS. THE REST
      </h2>
      <p className="text-outline text-center text-sm mb-10">
        Why pay more when you already earned it?
      </p>

      <div className="flex flex-col gap-2 max-w-2xl mx-auto" id="pricing">
        {/* WinBack row */}
        <div className="bg-surface-high rounded-lg px-6 py-4 flex justify-between items-center border-l-[3px] border-primary">
          <span className="text-primary font-bold font-[family-name:var(--font-space-grotesk)]">
            WinBack
          </span>
          <span className="text-primary font-semibold">$29/month flat fee</span>
        </div>

        {/* Competitor rows */}
        {competitors.map((comp) => (
          <div
            key={comp.name}
            className="bg-surface-low rounded-lg px-6 py-4 flex justify-between items-center"
          >
            <span className="text-tertiary">{comp.name}</span>
            <span className="text-tertiary-container font-semibold">
              {comp.pricing}
            </span>
          </div>
        ))}
      </div>

      <p className="text-outline text-sm text-center mt-8 max-w-xl mx-auto leading-relaxed">
        Most services take a cut of your "recovered" revenue, revenue that was
        rightfully yours to begin with. We think that's robbery. WinBack charges
        for the tool, not your hard-earned cash.
      </p>
    </section>
  );
}

function CallToAction() {
  return (
    <section id="waitlist" className="max-w-6xl mx-auto px-6 py-20">
      <div className="bg-gradient-to-b from-surface-low to-background rounded-2xl px-8 sm:px-16 py-16 text-center">
        <h2 className="font-[family-name:var(--font-space-grotesk)] text-on-surface text-3xl sm:text-4xl font-bold mb-4">
          Ready to take control?
        </h2>
        <p className="text-on-surface-variant text-base mb-10 max-w-md mx-auto">
          Join the waitlist today for priority onboarding. Be the first to use the
          aggressive toolkit built for merchants, not middlemen.
        </p>

        <WaitlistForm />

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center mt-8">
          <span className="text-outline text-sm flex items-center justify-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-primary">
              <path d="M11.5 3.5L5.5 9.5L2.5 6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            No credit card required
          </span>
          <span className="text-outline text-sm flex items-center justify-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-primary">
              <path d="M11.5 3.5L5.5 9.5L2.5 6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Stripe Verified
          </span>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="max-w-6xl mx-auto px-6 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="WinBack" width={20} height={20} />
          <span className="text-outline text-sm">
            &copy; 2026 WinBack. The Aggressive Advocate for your Revenue.
          </span>
        </div>
        <div className="flex gap-6">
          <a href="#" className="text-outline text-sm hover:text-on-surface transition-colors">
            Terms
          </a>
          <a href="#" className="text-outline text-sm hover:text-on-surface transition-colors">
            Privacy
          </a>
          <a href="#" className="text-outline text-sm hover:text-on-surface transition-colors">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Comparison />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Verify the page renders correctly**

Run: `cd /Users/joeb/Projects/WinBack/backend && npm run dev`

Open browser and verify:
- Dark background, correct colors
- Logo displays in navbar and footer
- All 6 sections render in order
- Nav links scroll to correct sections
- Waitlist form shows input and button
- Mobile responsive (resize browser to test)

Stop the dev server after verifying.

- [ ] **Step 3: Commit**

```bash
git add backend/app/page.tsx
git commit -m "feat(backend): add WinBack landing page (WIN-6)"
```

---

### Task 8: Visual Polish Pass

**Files:**
- Modify: `backend/app/page.tsx` (potentially)
- Modify: `backend/app/globals.css` (potentially)
- Modify: `backend/app/components/waitlist-form.tsx` (potentially)

This task is for refinements after seeing the page rendered in the browser. The previous tasks build the structure; this task polishes it.

- [ ] **Step 1: Run dev server and review the full page**

Run: `cd /Users/joeb/Projects/WinBack/backend && npm run dev`

Check each section against the Stitch mockup. Look for:
- Spacing issues (too tight or too loose)
- Font weight or size adjustments needed
- Color contrast issues
- Mobile responsiveness problems
- Glassmorphism effect on navbar (backdrop blur rendering)
- Gradient CTA buttons rendering correctly
- Tonal surface layering looking right (no harsh transitions)

- [ ] **Step 2: Make adjustments**

Fix any visual issues found in Step 1. Common fixes:
- Adjust padding/margin values
- Tweak font sizes for mobile
- Fix responsive breakpoints
- Adjust opacity or blur values

- [ ] **Step 3: Verify all tests still pass**

Run: `cd /Users/joeb/Projects/WinBack/backend && npm test`

Expected: All tests PASS.

- [ ] **Step 4: Commit**

```bash
git add -A backend/app/
git commit -m "feat(backend): visual polish for landing page (WIN-6)"
```

---

### Task 9: Build Verification and Favicon

**Files:**
- Modify: `backend/app/favicon.ico` (replace with WinBack favicon)

- [ ] **Step 1: Run the production build**

Run: `cd /Users/joeb/Projects/WinBack/backend && npm run build`

Expected: Build succeeds with no errors. Check for any TypeScript or lint warnings.

- [ ] **Step 2: Run all tests**

Run: `cd /Users/joeb/Projects/WinBack/backend && npm test`

Expected: All tests PASS.

- [ ] **Step 3: Test the production build locally**

Run: `cd /Users/joeb/Projects/WinBack/backend && npm start`

Open in browser. Verify the page looks correct with production optimizations (minified CSS, optimized images).

Stop the server after verifying.

- [ ] **Step 4: Commit any remaining changes**

```bash
git add backend/
git commit -m "chore(backend): build verification for landing page (WIN-6)"
```
