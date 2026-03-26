# Waitlist Resend Email Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Send a branded welcome email via Resend when a new signup joins the waitlist.

**Architecture:** The existing `POST /api/waitlist` route inserts into Supabase. We add a Resend client, an HTML email template function, and a best-effort send after successful insert. Email failure never blocks signup.

**Tech Stack:** Resend SDK, Next.js 15 App Router, Vitest

---

## File Map

| Action | Path | Responsibility |
|--------|------|---------------|
| Create | `backend/lib/resend.ts` | Resend client singleton (lazy-init, same pattern as `lib/supabase.ts`) |
| Create | `backend/lib/email/waitlist-welcome.ts` | Returns HTML string for the welcome email |
| Create | `backend/lib/email/__tests__/waitlist-welcome.test.ts` | Tests the email template function |
| Modify | `backend/app/api/waitlist/route.ts` | Add email send after successful insert |
| Modify | `backend/app/api/waitlist/__tests__/route.test.ts` | Add tests for email send behavior |
| Delete | `stitch-landing-page.html` | Remove static mockup |

---

### Task 1: Install Resend and create client

**Files:**
- Modify: `backend/package.json`
- Create: `backend/lib/resend.ts`

- [ ] **Step 1: Install resend package**

```bash
cd backend && npm install resend
```

- [ ] **Step 2: Create the Resend client**

Create `backend/lib/resend.ts`:

```ts
import { Resend } from "resend";

let _resend: Resend | null = null;

/**
 * Lazy-initialized Resend client.
 * Avoids crashes during Next.js build when env vars aren't set.
 */
export function getResend(): Resend {
  if (!_resend) {
    const key = process.env.RESEND_API_KEY;
    if (!key) {
      throw new Error("Missing RESEND_API_KEY");
    }
    _resend = new Resend(key);
  }
  return _resend;
}
```

- [ ] **Step 3: Commit**

```bash
git add backend/package.json backend/package-lock.json backend/lib/resend.ts
git commit -m "feat(backend): add Resend client"
```

---

### Task 2: Create the email template

**Files:**
- Create: `backend/lib/email/waitlist-welcome.ts`
- Create: `backend/lib/email/__tests__/waitlist-welcome.test.ts`

- [ ] **Step 1: Write the failing test**

Create `backend/lib/email/__tests__/waitlist-welcome.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { buildWaitlistWelcomeEmail } from "../waitlist-welcome";

describe("buildWaitlistWelcomeEmail", () => {
  it("returns an object with subject and html", () => {
    const result = buildWaitlistWelcomeEmail();
    expect(result).toHaveProperty("subject");
    expect(result).toHaveProperty("html");
    expect(typeof result.subject).toBe("string");
    expect(typeof result.html).toBe("string");
  });

  it("includes WinBack branding in html", () => {
    const { html } = buildWaitlistWelcomeEmail();
    expect(html).toContain("WinBack");
    expect(html).toContain("You're on the list");
  });

  it("includes the value prop", () => {
    const { html } = buildWaitlistWelcomeEmail();
    expect(html).toContain("$29/month");
  });

  it("does not contain em dashes", () => {
    const { html } = buildWaitlistWelcomeEmail();
    expect(html).not.toContain("\u2014");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
cd backend && npx vitest run lib/email/__tests__/waitlist-welcome.test.ts
```

Expected: FAIL with "Cannot find module" or similar.

- [ ] **Step 3: Write the email template**

Create `backend/lib/email/waitlist-welcome.ts`:

```ts
interface WelcomeEmail {
  subject: string;
  html: string;
}

export function buildWaitlistWelcomeEmail(): WelcomeEmail {
  return {
    subject: "You're on the WinBack waitlist",
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to WinBack</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0c1324; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #0c1324;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 520px; background-color: #191f31; border-radius: 16px; border: 1px solid rgba(164, 230, 255, 0.1);">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 24px 40px;">
              <span style="font-size: 24px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px;">WinBack</span>
            </td>
          </tr>
          <!-- Headline -->
          <tr>
            <td style="padding: 0 40px 16px 40px;">
              <h1 style="margin: 0; font-size: 32px; font-weight: 800; color: #a4e6ff; letter-spacing: -0.5px;">You're on the list.</h1>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding: 0 40px 32px 40px; color: #bbc9cf; font-size: 16px; line-height: 26px;">
              <p style="margin: 0 0 16px 0;">
                WinBack is a Stripe App that gives you step-by-step playbooks to win payment disputes. Built on 10+ years of issuer-side experience.
              </p>
              <p style="margin: 0 0 16px 0;">
                $29/month flat. No success fees, ever. You keep every dollar you recover.
              </p>
              <p style="margin: 0;">
                We'll reach out when your spot is ready.
              </p>
            </td>
          </tr>
          <!-- Divider -->
          <tr>
            <td style="padding: 0 40px;">
              <div style="height: 1px; background-color: rgba(164, 230, 255, 0.1);"></div>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px 40px 40px; color: #859399; font-size: 12px; line-height: 20px;">
              WinBack &bull; winbackpay.com
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
  };
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
cd backend && npx vitest run lib/email/__tests__/waitlist-welcome.test.ts
```

Expected: All 4 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add backend/lib/email/
git commit -m "feat(backend): add branded waitlist welcome email template"
```

---

### Task 3: Wire Resend into the waitlist route

**Files:**
- Modify: `backend/app/api/waitlist/__tests__/route.test.ts`
- Modify: `backend/app/api/waitlist/route.ts`

- [ ] **Step 1: Add email send tests to the existing test file**

Replace the full contents of `backend/app/api/waitlist/__tests__/route.test.ts`:

```ts
import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/supabase", () => ({
  supabase: {
    from: vi.fn(),
  },
}));

vi.mock("@/lib/resend", () => ({
  getResend: vi.fn(),
}));

import { POST } from "../route";
import { supabase } from "@/lib/supabase";
import { getResend } from "@/lib/resend";

function makeRequest(body: unknown): Request {
  return new Request("http://localhost/api/waitlist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

function mockSupabaseInsert(error: { code: string; message: string } | null) {
  const mockInsert = vi.fn().mockResolvedValue({ error });
  vi.mocked(supabase.from).mockReturnValue({ insert: mockInsert } as any);
  return mockInsert;
}

function mockResendSend() {
  const mockSend = vi.fn().mockResolvedValue({ data: { id: "email_123" }, error: null });
  vi.mocked(getResend).mockReturnValue({ emails: { send: mockSend } } as any);
  return mockSend;
}

describe("POST /api/waitlist", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 200 and inserts a valid email", async () => {
    mockSupabaseInsert(null);
    mockResendSend();

    const res = await POST(makeRequest({ email: "test@example.com" }));
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json).toEqual({ success: true });
    expect(supabase.from).toHaveBeenCalledWith("waitlist");
  });

  it("sends welcome email on successful insert", async () => {
    mockSupabaseInsert(null);
    const mockSend = mockResendSend();

    await POST(makeRequest({ email: "test@example.com" }));

    expect(mockSend).toHaveBeenCalledTimes(1);
    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "test@example.com",
        subject: expect.stringContaining("WinBack"),
      })
    );
  });

  it("does NOT send email on duplicate signup", async () => {
    mockSupabaseInsert({ code: "23505", message: "duplicate key" });
    const mockSend = mockResendSend();

    const res = await POST(makeRequest({ email: "existing@example.com" }));
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json).toEqual({ success: true });
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("returns 200 even when Resend fails", async () => {
    mockSupabaseInsert(null);
    const mockSend = vi.fn().mockRejectedValue(new Error("Resend is down"));
    vi.mocked(getResend).mockReturnValue({ emails: { send: mockSend } } as any);

    const res = await POST(makeRequest({ email: "test@example.com" }));
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json).toEqual({ success: true });
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

  it("returns 500 for unexpected Supabase errors", async () => {
    mockSupabaseInsert({ code: "42000", message: "something broke" });
    mockResendSend();

    const res = await POST(makeRequest({ email: "test@example.com" }));
    const json = await res.json();
    expect(res.status).toBe(500);
    expect(json).toEqual({ success: false, error: "Something went wrong. Please try again." });
  });
});
```

- [ ] **Step 2: Run tests to verify the new ones fail**

```bash
cd backend && npx vitest run app/api/waitlist/__tests__/route.test.ts
```

Expected: "sends welcome email on successful insert" FAILS (route doesn't call Resend yet). "returns 200 even when Resend fails" FAILS. Others should pass.

- [ ] **Step 3: Update the waitlist route**

Replace the full contents of `backend/app/api/waitlist/route.ts`:

```ts
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { getResend } from "@/lib/resend";
import { buildWaitlistWelcomeEmail } from "@/lib/email/waitlist-welcome";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "hello@winbackpay.com";

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

  if (error?.code === "23505") {
    return NextResponse.json({ success: true });
  }

  if (error) {
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }

  // Best-effort welcome email -- never block signup
  try {
    const { subject, html } = buildWaitlistWelcomeEmail();
    await getResend().emails.send({
      from: FROM_EMAIL,
      to: email,
      subject,
      html,
    });
  } catch (err) {
    console.error("Failed to send waitlist welcome email:", err);
  }

  return NextResponse.json({ success: true });
}
```

- [ ] **Step 4: Run all tests to verify they pass**

```bash
cd backend && npx vitest run app/api/waitlist/__tests__/route.test.ts
```

Expected: All 7 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add backend/app/api/waitlist/
git commit -m "feat(backend): send branded welcome email on waitlist signup"
```

---

### Task 4: Add env vars and delete static mockup

**Files:**
- Modify: `backend/.env.example` (or `.env.local` if no example file exists)
- Delete: `stitch-landing-page.html`

- [ ] **Step 1: Add env vars to .env.example (if it exists) or document them**

Check if `backend/.env.example` or `backend/.env.local.example` exists. If so, add:

```
RESEND_API_KEY=re_xxxxxxxxxxxx
RESEND_FROM_EMAIL=hello@winbackpay.com
```

If no example file exists, add these to your local `.env.local` (do NOT commit actual keys):

```
RESEND_API_KEY=<your-resend-api-key>
RESEND_FROM_EMAIL=hello@winbackpay.com
```

Also add `RESEND_API_KEY` and `RESEND_FROM_EMAIL` to the Vercel project environment variables.

- [ ] **Step 2: Delete the static landing page mockup**

```bash
rm stitch-landing-page.html
```

- [ ] **Step 3: Run full test suite**

```bash
cd backend && npm test
```

Expected: All tests pass.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: add Resend env vars, remove stitch landing page mockup"
```

---

### Task 5: Manual smoke test

- [ ] **Step 1: Start the dev server**

```bash
cd backend && npm run dev
```

- [ ] **Step 2: Submit the waitlist form with your own email**

Navigate to `http://localhost:3000`, enter your email in the waitlist form, and submit.

- [ ] **Step 3: Verify the email arrives**

Check your inbox for the email from `hello@winbackpay.com`. Verify:
- Subject: "You're on the WinBack waitlist"
- Dark themed HTML renders correctly
- WinBack branding visible
- Copy reads well, no em dashes
- No broken layout in your email client

- [ ] **Step 4: Verify duplicate handling**

Submit the same email again. Confirm:
- The form still shows success
- You do NOT receive a second email

- [ ] **Step 5: Check Supabase**

Verify the email appears once in the `waitlist` table with `source: "landing_page"`.
