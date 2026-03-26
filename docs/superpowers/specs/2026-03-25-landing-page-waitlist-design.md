# WIN-6: Landing Page with Waitlist Design Spec

## Overview

Marketing landing page for WinBack deployed at the root `/` of the Next.js backend on Vercel. Dark theme, "Aggressive Advocate" design system. Email waitlist capture stored in Supabase. SEO-optimized for dispute-related keywords. Domain: `winbackpay.com` (canonical in meta tags, Vercel default domain for initial deploy).

## Page Sections

### 1. Navbar
- WinBack logo (left): the recovery arrow logo image from `public/`
- Nav links (right): Comparison, Features, Pricing (smooth-scroll anchors)
- CTA button (far right): "Join Waitlist" (scrolls to waitlist form)
- Sticky on scroll with glassmorphism backdrop blur

### 2. Hero
- **Headline:** "Stop giving away 30% of your recovered revenue."
  - "30%" highlighted in primary green (`#00e475`)
- **Subtext:** "$29/month flat, no success fees. Win back your revenue with our simple dispute submission guide."
- **CTA:** "Join the Waitlist" button with arrow, gradient fill
- **Timeline note:** "Early access opening soon"
- **Right side:** Product visualization (the logo/brand graphic in a styled container)
- Mobile: stacks vertically, headline on top

### 3. Features (3-card grid)
Cards use tonal layering (`#131b2e` on `#0b1326`), 0.75rem border-radius, no borders.

| Card | Icon | Title | Copy |
|------|------|-------|------|
| 1 | Lightning bolt | Direct Stripe Integration | Seamlessly connect your existing payment flow. We monitor, notify, and prepare your defense without manual data entry. |
| 2 | Clipboard | Minute-by-Minute Guidance | Receive aggressive, step-by-step submission templates tailored to the specific reason code of every dispute. |
| 3 | Dollar sign | Zero Hidden Fees | No "success fees," no "revenue shares," no surprises. Just a professional tool for a transparent monthly price. |

Mobile: single column stack.

### 4. Comparison Table
- **Heading:** "WINBACK VS. THE REST"
- **Subtext:** "Why pay more when you already earned it?"

| Service | Pricing | Row Style |
|---------|---------|-----------|
| WinBack | $29/month flat fee | Elevated surface, green left accent, green text |
| Smart Disputes | 30% success fee | Recessed surface, tertiary/red text |
| Chargeflow | 25% success fee | Recessed surface, tertiary/red text |
| DisputeNinja | $499/month | Recessed surface, tertiary/red text |

- **Supporting copy:** "Most services take a cut of your 'recovered' revenue, revenue that was rightfully yours to begin with. We think that's robbery. WinBack charges for the tool, not your hard-earned cash."

### 5. CTA / Waitlist Form
- **Heading:** "Ready to take control?"
- **Subtext:** "Join the waitlist today for priority onboarding. Be the first to use the aggressive toolkit built for merchants, not middlemen."
- **Form:** Email input + "Join Waitlist" submit button (inline, horizontal on desktop, stacked on mobile)
- **Trust badges:** "No credit card required" and "Stripe Verified"
- **States:**
  - Default: input + button
  - Submitting: button disabled, shows spinner
  - Success: replace form with "You're on the list! We'll be in touch."
  - Error: inline error message below input
  - Duplicate: treat as success (don't reveal email exists)

### 6. Footer
- Logo + "© 2026 WinBack. The Aggressive Advocate for your Revenue."
- Links: Terms of Service, Privacy Policy, Contact
- Minimal, single row on desktop, stacked on mobile

## Visual Design System

All tokens pulled from the Stitch "Aggressive Advocate" design system.

### Colors
| Token | Value | Usage |
|-------|-------|-------|
| background | `#0b1326` | Page background |
| surface_container_low | `#131b2e` | Card backgrounds |
| surface_container | `#171f33` | Elevated sections |
| surface_container_high | `#222a3d` | Active/highlighted rows |
| surface_container_highest | `#2d3449` | Input fields |
| on_surface | `#dae2fd` | Primary text |
| on_surface_variant | `#bccabe` | Secondary text |
| outline | `#869489` | Muted text, timestamps |
| primary | `#00e475` | CTAs, success, "win" states |
| primary_container | `#00a955` | Gradient end for CTAs |
| secondary | `#4cd6fb` | Accents, data highlights |
| tertiary | `#ffb3ae` | Competitor names |
| tertiary_container | `#ff5956` | Competitor pricing |

### Typography
- **Headlines:** Space Grotesk, bold, tight leading
- **Body:** Manrope, regular weight
- **Labels:** Manrope, medium, small caps with letter-spacing for metadata
- Loaded via `next/font/google` for zero layout shift

### Design Rules
- No 1px borders for sectioning. Use tonal surface shifts only.
- CTA buttons: linear gradient from `primary` to `primary_container`, 0.25rem radius
- Cards: 0.75rem radius, tonal layering for depth
- Glassmorphism: `surface_bright` at 60% opacity + 20px backdrop blur for sticky navbar
- No em dashes in any copy

## Technical Architecture

### Files

| File | Purpose |
|------|---------|
| `app/layout.tsx` | Updated: Space Grotesk + Manrope fonts, SEO metadata, dark theme |
| `app/globals.css` | Updated: design tokens as CSS custom properties, dark-only theme |
| `app/page.tsx` | Landing page server component (all sections) |
| `app/components/waitlist-form.tsx` | Client component: email form with submit/success/error states |
| `app/api/waitlist/route.ts` | POST endpoint: validate email, insert into Supabase |
| `public/logo.png` | WinBack logo image |

### SEO Metadata
- **Title:** "WinBack: Stop Giving Away 30% of Your Recovered Revenue"
- **Description:** "$29/month flat fee dispute resolution for Stripe merchants. No success fees. Guided playbooks built from 10+ years of issuer-side experience."
- **Canonical:** `https://winbackpay.com`
- **OG Image:** Placeholder for now, generate later
- **Keywords target:** "how to win Stripe dispute", "Stripe chargeback help", "Stripe dispute response"

### Waitlist API

**Endpoint:** `POST /api/waitlist`

**Request:**
```json
{ "email": "merchant@example.com" }
```

**Validation:**
- Email format check (server-side regex)
- Reject empty or malformed emails
- Return 400 with `{ "success": false, "error": "Invalid email address" }`

**Success path:**
- Insert into Supabase `waitlist` table
- On unique constraint violation (duplicate email), return success anyway
- Return 200 with `{ "success": true }`

**No auth middleware** on this route. It is a public endpoint.

**No rate limiting** for v1. Add if spam becomes an issue.

### Supabase Migration

```sql
create table public.waitlist (
  id uuid default gen_random_uuid() primary key,
  email text not null unique,
  source text default 'landing_page',
  created_at timestamptz default now()
);
```

- No RLS needed. API route uses service role key for server-side inserts only.
- No public access to this table.

### Form Client Component

`app/components/waitlist-form.tsx` is a `"use client"` component handling:
- Email input with client-side validation
- `fetch('POST', '/api/waitlist')` on submit
- Button disabled during submission (double-click prevention)
- Three visual states: default, submitting (spinner), success message
- Error state: inline message below input

### Responsive Breakpoints
- **Desktop (>= 768px):** Full layout as designed
- **Mobile (< 768px):** Single column, hero stacks vertically, feature cards stack, form input/button stack vertically, footer stacks

## Out of Scope
- Light mode / theme toggle
- Blog or additional pages
- Email verification or double opt-in
- Email marketing integration (future)
- OG image generation (future)
- Analytics / tracking pixels (future)
- Rate limiting on waitlist endpoint (future)
- Terms of Service / Privacy Policy page content (placeholder links for now)
