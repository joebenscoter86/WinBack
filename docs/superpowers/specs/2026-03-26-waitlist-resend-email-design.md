# Waitlist Email Confirmation via Resend

**Date:** 2026-03-26
**Status:** Design approved

## Problem

The landing page collects waitlist emails into Supabase, but signups get no confirmation. This makes WinBack feel like a dead form. A branded confirmation email turns a silent signup into a moment of trust.

## Solution

Add Resend to the existing waitlist API route. On successful insert, send a branded HTML welcome email from `hello@winbackpay.com`. Best-effort -- email failure does not block signup.

## Changes

### 1. Install `resend` package

Add to `backend/package.json` dependencies.

### 2. Create `backend/lib/resend.ts`

Thin client wrapper, mirrors `lib/supabase.ts` pattern:

```ts
import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);
```

### 3. Create `backend/lib/email/waitlist-welcome.ts`

Function that returns the HTML email string. No React Email or template engine -- just a function returning an HTML string.

**Design:**
- Dark background (#0c1324) matching the landing page
- WinBack wordmark in white at the top
- "You're on the list." headline in the primary cyan (#a4e6ff)
- Short body copy: what WinBack is, what to expect, the $29/mo value prop
- No CTA button needed (nowhere to send them yet)
- Footer with unsubscribe-friendly copy and company name
- Inline CSS only (email client compatibility)
- No em dashes anywhere in the copy

### 4. Update `backend/app/api/waitlist/route.ts`

After successful Supabase insert (and NOT on duplicate 23505):

```
1. Insert into Supabase
2. If insert succeeds (no error), send welcome email via Resend
3. If Resend fails, log the error but still return { success: true }
4. If duplicate (23505), return { success: true } without sending email
```

The email send is fire-and-forget from the user's perspective. We `await` it to catch errors for logging, but the API always returns success if the DB operation succeeded.

### 5. Environment variables

Add to backend `.env` (and Vercel project settings):
- `RESEND_API_KEY` -- Resend API key
- `RESEND_FROM_EMAIL` -- defaults to `hello@winbackpay.com`

### 6. Update tests

Update `backend/app/api/waitlist/__tests__/route.test.ts`:
- Mock `lib/resend` the same way Supabase is mocked
- Verify email is sent on successful insert
- Verify email is NOT sent on duplicate (23505)
- Verify signup succeeds even when Resend throws

### 7. Delete `stitch-landing-page.html`

Remove the static mockup file from the repo root.

## Email Content

**Subject:** You're on the WinBack waitlist

**Body (simplified):**
- WinBack wordmark
- "You're on the list."
- "WinBack is a Stripe App that gives you step-by-step playbooks to win payment disputes. Built on 10+ years of issuer-side experience. $29/month flat -- no success fees, ever."
- "We'll reach out when your spot is ready."
- Footer: "WinBack | winbackpay.com"

## Non-goals

- No double opt-in / email verification flow
- No email sequences or drip campaigns
- No unsubscribe management (single transactional email, not marketing)
- No React Email or template engine -- plain HTML string is sufficient for one template
