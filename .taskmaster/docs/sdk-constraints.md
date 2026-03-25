# Stripe Apps SDK UI Constraints

> Research output for WIN-4. Informs all frontend implementation decisions.

## Executive Summary

The Stripe Apps SDK runs in a **sandboxed iframe** with no DOM access, no custom HTML/CSS, and no direct external network calls. All UI must be built from Stripe's component library. All external API calls (Claude, Supabase) must go through our Vercel backend, authenticated via `fetchStripeSignature()`.

**Key implication for WinBack:** The "TurboTax for disputes" wizard UX is achievable using ContextView + FocusView + Tabs + Accordion, but we cannot build rich text editing, drag-and-drop, or custom modals. Narrative editing will use a plain TextArea.

---

## Available UI Components

### Views (Root)
| Component | Purpose | Notes |
|-----------|---------|-------|
| **ContextView** | Main app container, renders in dashboard drawer | Required entry point for each viewport |
| **FocusView** | Full-screen overlay for focused tasks | Must be a child of ContextView; use `shown` prop (not conditionals) |
| **SettingsView** | App configuration page | Only for `settings` viewport |
| **SignInView** | Authentication screen | For OAuth flows if needed |

### Layout
| Component | Purpose |
|-----------|---------|
| **Box** | Container with layout props (padding, flex, etc.) |
| **Divider** | Horizontal separator |

### Navigation & Actions
| Component | Purpose | Notes |
|-----------|---------|-------|
| **Button** | Primary actions | Supports `disabled` prop for double-click prevention |
| **ButtonGroup** | Multiple buttons | Collapses to overflow menu when space is tight |
| **Link** | Subtle navigation | |
| **Menu** | Contextual actions | |
| **Tabs** | Section navigation | Good for dispute workflow steps |

### Content Display
| Component | Purpose | Notes |
|-----------|---------|-------|
| **Accordion** | Collapsible sections | Good for evidence checklist items |
| **Badge** | Status indicators | Good for dispute status (needs_response, won, lost) |
| **Banner** | Alerts/notifications | Good for deadline warnings, submission confirmations |
| **Chip** | Value display | |
| **Icon** | Icon graphics | |
| **Img** | Images | Requires `image-src` CSP for external URLs |
| **Inline** | Inline text styling | |
| **List** | Formatted lists | |
| **Spinner** | Loading state | Essential for async operations |
| **Table** | Data rows/columns | Good for dispute list view |
| **Toast** | Temporary notifications | Good for success/error feedback |
| **Tooltip** | Hover context | Good for explaining evidence items |

### Forms
| Component | Purpose | Notes |
|-----------|---------|-------|
| **Checkbox** | Boolean input | For evidence checklist items |
| **DateField** | Date input | |
| **FormFieldGroup** | Group related fields | |
| **Radio** | Exclusive selection | |
| **Select** | Dropdown picker | For reason code selection, filters |
| **Switch** | Boolean toggle | |
| **TextArea** | Multi-line text | For narrative editing (no rich text) |
| **TextField** | Single-line text | |

### Charts
| Component | Purpose |
|-----------|---------|
| **BarChart** | Bar visualization |
| **LineChart** | Line visualization |
| **Sparkline** | Inline mini charts |

---

## Critical Constraints

### 1. Sandboxed iframe — No DOM Access
- App runs in an **invisible, sandboxed iframe** that sends UI updates asynchronously
- **No access to:** localStorage, indexedDB, BroadcastChannel, or any same-origin APIs
- Cannot control React refs or version (Dashboard uses React 17.0.2)
- Cannot stop event propagation (handlers fire asynchronously post-propagation)
- Third-party packages that depend on DOM refs (e.g., react-hook-form) will NOT work

### 2. No Custom HTML or CSS
- Custom styling is **intentionally restricted** for platform consistency and accessibility
- Only exception: `brandColor` and `brandIcon` on ContextView for app branding
- No custom fonts, colors, spacing, or CSS classes
- All layout must use Box component with its built-in props

### 3. No Direct External Network Calls from Frontend
- Frontend **cannot** call Claude API, Supabase, or any external service directly
- Must use `connect-src` in CSP to whitelist our backend URL
- All external calls flow: **Stripe App → Vercel Backend → External Service**
- Current CSP: `connect-src: ["https://winback-api.vercel.app"]`

### 4. Backend Authentication via fetchStripeSignature
- Import: `import { fetchStripeSignature } from '@stripe/ui-extension-sdk/utils'`
- Returns a cryptographic signature containing `user_id` and `account_id`
- Must be sent as `Stripe-Signature` header on every backend request
- Backend verifies using the app's signing secret (`STRIPE_APP_SECRET`)
- **CORS requirement:** Backend must set `Access-Control-Allow-Origin: *` on authenticated endpoints
- Payload field order matters: `{ user_id, account_id }` — order must be exact

### 5. Serialization Constraints
- All data passed to SDK components must be serializable: strings, numbers, booleans, null, undefined, plain objects, arrays
- Functions become asynchronous when proxied through the iframe boundary
- `Map`, `Set`, circular references cannot be used

### 6. No Rich Text Editing
- No contentEditable, no rich text editor components
- Narrative editing must use **TextArea** (plain text only)
- Workaround: Format narratives with line breaks and structure on the backend; render as plain text in the app

### 7. No Modals (Use FocusView Instead)
- No custom modal/dialog components
- **FocusView** serves as the full-screen overlay for focused tasks
- Must be child of ContextView, controlled via `shown` prop
- Supports `confirmCloseMessages` for unsaved-changes protection
- Has `primaryAction` and `secondaryAction` footer buttons

### 8. File Upload
- No native file upload component in the SDK
- **Stripe's file upload API** (`POST https://files.stripe.com/v1/files`) accepts multipart/form-data
- The app has `file_read` and `file_write` permissions configured
- Evidence files: Upload to Stripe Files API (for submission) and/or our Supabase Storage (for staging)
- Approach: Backend handles file uploads; frontend sends file data to backend which proxies to Stripe/Supabase

### 9. Viewport Dimensions
- **Not explicitly documented** — adapts to the dashboard drawer width
- Drawer view (ContextView): approximately 400-480px wide, full dashboard height with scroll
- FocusView: full-screen overlay
- No responsive breakpoints — single column layout is safest
- Scrolling is handled by the dashboard container

---

## WinBack UX Mapping

| Planned Feature | SDK Solution | Feasible? |
|----------------|-------------|-----------|
| Dispute list dashboard | Table + Badge in drawer.default viewport | Yes |
| Dispute detail with checklist | ContextView + Accordion + Checkbox on payment.detail | Yes |
| Evidence file upload | Backend-proxied upload via fetchStripeSignature | Yes (no drag-and-drop) |
| AI narrative review/edit | TextArea (plain text only) | Yes (no rich text) |
| Step-by-step wizard | Tabs or sequential FocusView screens | Yes |
| Submission confirmation | FocusView with confirmCloseMessages + Banner | Yes |
| Deadline warnings | Banner component + Badge | Yes |
| Loading states | Spinner + conditional rendering | Yes |
| Empty states | Box + Inline text + Icon | Yes |
| Settings/onboarding | SettingsView on settings viewport | Yes |
| Progress indicators | Badge or custom Box layout | Partial (no native progress bar) |

### Blockers & Workarounds

| Blocker | Impact | Workaround |
|---------|--------|------------|
| No drag-and-drop file upload | Can't do intuitive file attachment | Button-triggered file upload via backend |
| No rich text editor | Can't provide WYSIWYG narrative editing | Plain TextArea with structured templates |
| No progress bar component | Can't show wizard progress visually | Use Tabs for step indication, or Badge sequence |
| No custom modals | Can't use popup confirmations | FocusView as full-screen alternative |
| React 17.0.2 | Can't use React 18+ features (Suspense boundaries, useTransition) | Standard async patterns |
| Controlled inputs have lag | Input state updates are async through iframe proxy | Use uncontrolled components where possible |

---

## Viewports We Use

| Viewport | Component | Purpose |
|----------|-----------|---------|
| `stripe.dashboard.payment.detail` | PaymentDisputeView | Main dispute workflow on payment pages |
| `stripe.dashboard.drawer.default` | DisputeListView | Dashboard-wide dispute overview |
| `settings` | AppSettings | App configuration |

### Viewports to Consider Adding
- `stripe.dashboard.customer.detail` — Show dispute history for a customer
- `stripe.dashboard.payment.list` — Badge/indicator on payments with disputes
- `onboarding` — First-time setup wizard

---

## Architecture Confirmation

```
┌─────────────────────────────────────────┐
│ Stripe Dashboard                        │
│  ┌───────────────────────────────────┐  │
│  │ Sandboxed iframe (null origin)    │  │
│  │  - SDK components only            │  │
│  │  - fetchStripeSignature() → sig   │  │
│  │  - fetch(backend, {sig header})   │  │
│  └──────────────┬────────────────────┘  │
│                 │ HTTPS + Stripe-Signature│
└─────────────────┼───────────────────────┘
                  ▼
┌─────────────────────────────────────────┐
│ Vercel Backend (Next.js API Routes)     │
│  - Verify Stripe-Signature             │
│  - CORS: Access-Control-Allow-Origin:* │
│  - Proxy calls to:                     │
│    → Supabase (data + storage)         │
│    → Claude API (narrative generation)  │
│    → Stripe API (dispute submission)    │
└─────────────────────────────────────────┘
```

This confirms the architecture in CLAUDE.md is correct. No changes needed.
