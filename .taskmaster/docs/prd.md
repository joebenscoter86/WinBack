# PRD: WinBack

**Author:** Joe Benscoter
**Date:** 2026-03-24
**Status:** Draft
**Version:** 1.0
**Taskmaster Optimized:** Yes

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Problem Statement](#problem-statement)
3. [Goals & Success Metrics](#goals--success-metrics)
4. [User Stories](#user-stories)
5. [Functional Requirements](#functional-requirements)
6. [Non-Functional Requirements](#non-functional-requirements)
7. [Technical Considerations](#technical-considerations)
8. [Implementation Roadmap](#implementation-roadmap)
9. [Out of Scope](#out-of-scope)
10. [Open Questions & Risks](#open-questions--risks)
11. [Validation Checkpoints](#validation-checkpoints)
12. [Appendix: Task Breakdown Hints](#appendix-task-breakdown-hints)

---

## Executive Summary

Small Stripe merchants are losing payment disputes at a ~70-80% rate because they lack guidance on what evidence to submit and how to present it. Existing solutions either take 25-30% of recovered amounts (Chargeflow, Stripe Smart Disputes) or cost $499+/month (DisputeNinja). WinBack is a $29/month flat-rate Stripe App that lives inside the Stripe Dashboard and guides merchants through building complete, compelling evidence packages using reason-code-specific playbooks and AI-generated narratives. The merchant keeps every dollar they recover. Target: 100+ paying merchants within 90 days of launch.

---

## Problem Statement

### Current Situation
Small Stripe merchants (Shopify sellers, service businesses, SaaS companies, marketplace sellers) processing 2-15 disputes per month with average transaction sizes of $50-500 have no affordable, effective tools for fighting disputes. When a dispute hits:

1. **Stripe's built-in dispute form** provides minimal guidance — a file upload field and a text box with no context about what issuers evaluate
2. **Stripe Smart Disputes** (auto-enabled AI) only uses internal Stripe data — it cannot access shipping confirmations, customer emails, delivery photos, or contracts. It takes 30% of recovered amounts plus a $15 counter fee
3. **Chargeflow** provides full automation but takes 25% of recovered amounts — not economical for small disputes
4. **DisputeNinja** starts at $499/month — built for enterprise teams with high dispute volumes
5. **Prevention tools** (Disputely, Chargeblast) only prevent disputes, they don't help win existing ones

### User Impact
- **Who is affected:** Small-to-mid Stripe merchants getting 2-15 disputes/month with $50-500 average transaction sizes
- **How they're affected:** Losing disputes they should win because they don't know what evidence to submit, what issuers evaluate, or how to structure a response. They feel powerless and the system feels rigged.
- **Severity:** Critical — merchants are losing real revenue. A merchant with 5 disputes/month averaging $150 loses $750/month unnecessarily. Industry manual win rate is ~20-30%, meaning 70-80% of disputes are lost.

### Business Impact
- **Cost of problem:** For a typical merchant: 5 disputes/month x $150 avg x 75% loss rate = $562.50/month in lost revenue
- **Opportunity cost:** Smart Disputes takes 30% even when merchants win. Merchant recovers $450 but pays $135 in fees. Net: $315 vs potential $450.
- **Strategic importance:** First product in a Stripe App Marketplace micro-SaaS portfolio strategy. Validates the marketplace as a distribution channel (pull distribution vs push).

### Why Solve This Now?
- Stripe recently introduced Smart Disputes with a 30% success fee — merchants are actively frustrated about the pricing model
- The $15 counter fee for merchants who don't use Smart Disputes adds fuel to the fire
- There is fresh anger in Reddit, HN, and merchant communities about these changes
- The Stripe App Marketplace provides built-in distribution (pull, not push) — solving the GTM problem that plagued Docket
- Joe Benscoter has 10+ years of payments experience including the issuer side of dispute evaluation — genuine unfair advantage in building playbooks

---

## Goals & Success Metrics

### Goal 1: Merchant Acquisition
- **Description:** Acquire paying merchants through Stripe App Marketplace
- **Metric:** Number of active paying subscribers
- **Baseline:** 0 (new product)
- **Target:** 10 merchants at 30 days, 50 at 60 days, 100+ at 90 days
- **Timeframe:** 90 days post-launch
- **Measurement Method:** Stripe Billing subscription count + in-app analytics

### Goal 2: Dispute Win Rate Improvement
- **Description:** Prove that merchants using WinBack win significantly more disputes than the industry baseline
- **Metric:** Win rate for disputes submitted through WinBack
- **Baseline:** ~20-30% industry manual win rate for small merchants
- **Target:** 50%+ win rate for disputes submitted through WinBack
- **Timeframe:** Measurable after 60 days (dispute resolution takes 60-75 days)
- **Measurement Method:** In-app outcome tracking via Stripe Disputes API

### Goal 3: Revenue
- **Description:** Generate meaningful MRR from flat-rate subscriptions
- **Metric:** Monthly Recurring Revenue
- **Baseline:** $0
- **Target:** $290 at 30d, $1,450 at 60d, $2,900+ at 90d (follows merchant count)
- **Timeframe:** 90 days
- **Measurement Method:** Stripe Billing dashboard

### Goal 4: Product-Market Fit Signal
- **Description:** Validate that merchants find enough value to stay subscribed
- **Metric:** Monthly churn rate
- **Baseline:** N/A (new product)
- **Target:** <10% monthly churn after first 60 days
- **Timeframe:** 90 days
- **Measurement Method:** Stripe subscription cancellation tracking

---

## User Stories

### Story 1: New Dispute Response

**As a** small Stripe merchant who just received a dispute notification,
**I want to** understand exactly what the cardholder is claiming and what evidence I need to gather,
**So that I can** build a strong evidence package and win the dispute instead of eating the loss.

**Acceptance Criteria:**
- [ ] App shows dispute details: amount, reason code, customer name, transaction date, response deadline
- [ ] Plain English explanation of what the reason code means and what the cardholder is claiming
- [ ] Reason-code-specific evidence checklist with "why this matters" expandable for each item
- [ ] Smart urgency display: countdown timer, color-coded based on time remaining
- [ ] If <5 days remaining, show streamlined "essentials only" checklist
- [ ] Auto-pulls available data from Stripe (transaction details, customer info, payment method)

**Task Breakdown Hint:**
- Task 1.1: Build dispute detail view with Stripe data (~4h)
- Task 1.2: Implement reason code lookup and plain English explanations (~6h)
- Task 1.3: Build evidence checklist component with expandable "why" sections (~6h)
- Task 1.4: Implement smart urgency deadline display (~3h)

**Dependencies:** Stripe App SDK setup, Reason code playbooks

### Story 2: Evidence Upload & AI Narrative

**As a** merchant who has gathered evidence for my dispute,
**I want to** upload my evidence files and get a professionally structured narrative tying it all together,
**So that I can** submit a compelling case without being a payments expert.

**Acceptance Criteria:**
- [ ] Upload interface for each checklist item (drag and drop, file picker)
- [ ] Supports common file types: PDF, PNG, JPG, CSV, email exports
- [ ] AI generates a structured narrative referencing all uploaded evidence
- [ ] Narrative includes reasoning annotations: "This section addresses the issuer's requirement for..."
- [ ] Merchant can review, edit, and approve the narrative before submission
- [ ] Generation limited to 5 attempts per dispute (cost guardrail)
- [ ] Evidence files stored temporarily in Supabase, deleted after submission to Stripe

**Task Breakdown Hint:**
- Task 2.1: Build evidence upload component per checklist item (~6h)
- Task 2.2: Implement temporary file storage in Supabase (~4h)
- Task 2.3: Build Claude API integration for narrative generation (~6h)
- Task 2.4: Build narrative review/edit UI with reasoning annotations (~6h)
- Task 2.5: Implement generation limits per dispute (~2h)

**Dependencies:** Story 1, Claude API backend, Supabase storage

### Story 3: Evidence Submission

**As a** merchant who has reviewed and approved my evidence package,
**I want to** submit everything to Stripe with one click,
**So that I can** feel confident my dispute response is complete and properly formatted.

**Acceptance Criteria:**
- [ ] One-click submission through Stripe Disputes API
- [ ] All evidence files and narrative attached correctly
- [ ] Confirmation screen with expected resolution timeline
- [ ] Dispute status updates to "evidence submitted" in tracking view
- [ ] Never blocks submission even if evidence is incomplete (warn, don't block)

**Task Breakdown Hint:**
- Task 3.1: Implement Stripe Disputes API evidence submission (~6h)
- Task 3.2: Build submission confirmation flow (~3h)
- Task 3.3: Handle submission errors and retries (~3h)

**Dependencies:** Story 2, Stripe Disputes API write permissions

### Story 4: Dispute Tracking Dashboard

**As a** merchant managing multiple disputes,
**I want to** see the status of all my disputes in one place,
**So that I can** track which need attention, which are pending, and my overall win rate.

**Acceptance Criteria:**
- [ ] Dashboard showing all disputes: needs response, evidence submitted, won, lost
- [ ] Filter/sort by status, date, amount
- [ ] Win rate calculation displayed prominently
- [ ] Pattern detection: "You've had 3 'Product Not Received' disputes this month"
- [ ] Deadline alerts for disputes needing attention

**Task Breakdown Hint:**
- Task 4.1: Build dispute list/dashboard view (~6h)
- Task 4.2: Implement dispute outcome tracking via Stripe webhooks (~4h)
- Task 4.3: Build win rate calculation and display (~3h)
- Task 4.4: Implement basic pattern detection (~4h)

**Dependencies:** Story 1, Stripe webhooks

### Story 5: Empty State & Onboarding

**As a** merchant who just installed WinBack but has no active disputes,
**I want to** understand what the app does and feel confident it'll help when a dispute hits,
**So that I** don't uninstall it before I even use it.

**Acceptance Criteria:**
- [ ] Clean "you're all set" message when no disputes exist
- [ ] Brief explanation of what happens when a dispute arrives
- [ ] Promise of notification when a dispute needs attention
- [ ] (Phase 2) Educational content: reason code guides, prevention tips
- [ ] (Phase 2) Historical analysis: "You had X disputes last quarter, here's your pattern"

**Task Breakdown Hint:**
- Task 5.1: Build empty state component with onboarding content (~3h)
- Task 5.2: Implement new dispute notification/badge (~3h)

**Dependencies:** Stripe App SDK setup

### Story 6: Subscription & Billing

**As a** merchant who wants to use WinBack,
**I want to** subscribe for $29/month with a streamlined billing flow,
**So that I can** start using the tool immediately.

**Acceptance Criteria:**
- [ ] Pricing displayed before purchase: $29/month, no success fees, no hidden costs
- [ ] Subscription managed through Stripe App Marketplace billing OR Stripe Billing
- [ ] Free trial period (if supported by marketplace)
- [ ] One-click cancellation from account settings
- [ ] Billing status visible in app

**Task Breakdown Hint:**
- Task 6.1: Research and implement billing (marketplace vs self-managed) (~8h)
- Task 6.2: Build subscription status UI and paywall (~4h)
- Task 6.3: Handle billing edge cases (failed payment, cancellation) (~4h)

**Dependencies:** Stripe App Marketplace billing research

### Story 7: Landing Page & Waitlist

**As a** potential merchant who discovers WinBack before launch,
**I want to** understand the value proposition and join a waitlist,
**So that I** can be notified when the product launches.

**Acceptance Criteria:**
- [ ] Landing page with clear value proposition: "$29/month, no success fees"
- [ ] Comparison to Smart Disputes (30%), Chargeflow (25%), DisputeNinja ($499)
- [ ] Email waitlist signup
- [ ] Mobile responsive
- [ ] SEO-optimized for "how to win Stripe dispute", "Stripe chargeback help"

**Task Breakdown Hint:**
- Task 7.1: Design and build landing page (~8h)
- Task 7.2: Implement email waitlist (Supabase or form provider) (~3h)
- Task 7.3: SEO optimization and meta tags (~2h)

**Dependencies:** None (can be built in parallel with app)

---

## Functional Requirements

### Must Have (P0) — Critical for Launch

#### REQ-001: Stripe App Integration
**Description:** A functional Stripe App that installs from the marketplace, appears in the dashboard sidebar, and can read dispute, charge, and customer data.

**Acceptance Criteria:**
- [ ] App installs from Stripe App Marketplace
- [ ] Appears in Stripe Dashboard sidebar navigation
- [ ] Reads disputes via Stripe Disputes API
- [ ] Reads charges via Stripe Charges API
- [ ] Reads customer info via Stripe Customers API
- [ ] Handles OAuth/authentication for Stripe account access

**Technical Specification:**
- Stripe Apps SDK for frontend (React-based, runs in iframe)
- Backend API on Vercel for server-side logic
- Stripe API permissions: `read_disputes`, `read_charges`, `read_customers`, `write_dispute_evidence`

**Task Breakdown:**
- Scaffold Stripe App project: Small (3h)
- Implement Stripe OAuth and API client: Medium (6h)
- Build sidebar navigation and app shell: Small (3h)
- Test in Stripe Developer Dashboard: Small (2h)

**Dependencies:** Stripe Developer account, App approval (submit early for review)

#### REQ-002: Reason Code Playbooks (5 MVP Codes)
**Description:** Structured playbooks for the top 5 most common dispute reason codes, containing evidence checklists, issuer evaluation criteria, and narrative templates.

**MVP Reason Codes:**
1. Visa 13.1 — Merchandise/Services Not Received
2. Visa 13.2 — Cancelled Recurring Transaction
3. Visa 13.3 — Not as Described or Defective
4. Visa 10.4 — Other Fraud (Card Absent Environment)
5. Mastercard 4853 — Cardholder Dispute (Not as Described)

**Each playbook contains:**
- Plain English explanation of cardholder's claim
- What the issuing bank evaluates when reviewing evidence
- Evidence checklist (mandatory vs helpful items)
- Common mistakes merchants make
- Narrative template structure for AI generation
- Pro tips from issuer-side experience

**Acceptance Criteria:**
- [ ] 5 complete playbooks stored in Supabase
- [ ] Each playbook has been validated by Joe for domain accuracy
- [ ] Evidence checklists are reason-code-specific, not generic
- [ ] "Why this matters" explanations reference actual card network rules

**Task Breakdown:**
- Research Visa Core Rules for reason codes 13.1, 13.2, 13.3, 10.4: Large (12h)
- Research Mastercard Chargeback Guide for 4853: Medium (4h)
- Draft playbook content for each code: Large (15h)
- Joe validates and refines playbooks: Medium (8h — Joe's time)
- Build playbook data model in Supabase: Small (3h)
- Seed playbook data: Small (2h)

**Dependencies:** Card network documentation research (agent workstream)

#### REQ-003: Evidence Upload & Temporary Storage
**Description:** File upload interface that allows merchants to attach evidence files to each checklist item, stored temporarily before submission.

**Acceptance Criteria:**
- [ ] Upload per checklist item (not a single bulk upload)
- [ ] Supports: PDF, PNG, JPG, JPEG, GIF, CSV, TXT (up to 10MB per file)
- [ ] Files stored in Supabase Storage with 30-day auto-deletion
- [ ] Evidence linked to specific dispute and checklist item
- [ ] Merchant can replace or remove uploaded files before submission

**Technical Specification:**
- Supabase Storage bucket with RLS policies per merchant
- 30-day TTL auto-cleanup policy on stored files
- No PCI-scoped data in file storage (cardholder data stays in Stripe)
- Bank statements and sensitive documents: encrypt at rest (Supabase default)

**Task Breakdown:**
- Set up Supabase Storage bucket with policies: Small (3h)
- Build upload component per checklist item: Medium (5h)
- Implement file management (replace, remove): Small (3h)
- Add 30-day auto-deletion cleanup: Small (2h)

**Dependencies:** Supabase project setup

#### REQ-004: AI Narrative Generation with Reasoning
**Description:** Claude API generates a structured dispute response narrative from uploaded evidence, with visible reasoning annotations showing why each section was included.

**Acceptance Criteria:**
- [ ] Generates narrative from: reason code playbook template + uploaded evidence metadata + Stripe transaction data
- [ ] Narrative includes reasoning annotations: "This section addresses [network]'s requirement for [X]"
- [ ] Merchant can review and edit the narrative in a rich text editor
- [ ] Limited to 5 generations per dispute (cost guardrail)
- [ ] Generation completes in <15 seconds

**Technical Specification:**
- Claude API (claude-sonnet-4-6 for cost efficiency, upgrade to opus if quality insufficient)
- Prompt template per reason code, injected with evidence metadata and Stripe data
- Reasoning annotations as inline markers in the narrative
- Backend API route on Vercel handles Claude API calls (Stripe App iframe cannot call external APIs directly)

**Task Breakdown:**
- Design prompt templates per reason code: Medium (6h)
- Build Claude API integration backend route: Medium (5h)
- Build narrative review/edit UI: Medium (6h)
- Implement reasoning annotation display: Small (3h)
- Add generation limit tracking: Small (2h)

**Dependencies:** REQ-002 (playbooks), Claude API key

#### REQ-005: Stripe Disputes API Evidence Submission
**Description:** Submit the complete evidence package (files + narrative) to Stripe through their Disputes API.

**Acceptance Criteria:**
- [ ] Submits evidence files and narrative via Stripe Disputes API
- [ ] Maps evidence to Stripe's expected evidence fields per reason code
- [ ] One-click submission after merchant approves narrative
- [ ] Confirmation screen with expected resolution timeline
- [ ] Handles submission errors gracefully with clear messaging
- [ ] Never blocks submission even if evidence is incomplete

**Technical Specification:**
```
Stripe Disputes API: POST /v1/disputes/{dispute_id}/evidence
Evidence fields per reason code:
- shipping_tracking_number
- shipping_carrier
- shipping_documentation
- customer_communication
- receipt
- service_documentation
- etc.
```

**Task Breakdown:**
- Implement evidence field mapping per reason code: Medium (5h)
- Build submission flow with file attachment: Medium (6h)
- Build confirmation/error UI: Small (3h)
- Handle edge cases (timeout, partial submission): Small (3h)

**Dependencies:** REQ-003 (upload), REQ-004 (narrative)

#### REQ-006: Basic Dispute Tracking
**Description:** Track dispute status and outcomes over time.

**Acceptance Criteria:**
- [ ] Dashboard view: needs response, evidence submitted, won, lost
- [ ] Dispute outcome detected via Stripe webhooks or polling
- [ ] Win rate calculation displayed
- [ ] Deadline visibility for disputes needing attention

**Task Breakdown:**
- Build dispute list view: Medium (5h)
- Implement webhook/polling for outcome updates: Medium (5h)
- Build win rate display: Small (2h)
- Add deadline alerts: Small (2h)

**Dependencies:** REQ-001 (Stripe integration), Webhook endpoint setup

#### REQ-007: Subscription Billing ($29/month)
**Description:** Monthly subscription billing at $29/month flat rate.

**Acceptance Criteria:**
- [ ] $29/month subscription with no per-dispute or success fees
- [ ] Billing handled through Stripe App Marketplace billing (preferred) or Stripe Billing
- [ ] Paywall: app features locked until subscription active
- [ ] Graceful handling of failed payments and cancellation
- [ ] Clear pricing displayed before subscription

**Task Breakdown:**
- Research Stripe App Marketplace billing options: Small (3h)
- Implement chosen billing approach: Medium (6h)
- Build paywall/subscription gate UI: Small (3h)
- Handle billing edge cases: Small (3h)

**Dependencies:** Billing model research

#### REQ-008: Smart Urgency Deadline UX
**Description:** Adapt the dispute response workflow based on time remaining before the response deadline.

**Acceptance Criteria:**
- [ ] 14+ days remaining: Full workflow with complete evidence checklist
- [ ] 5-13 days remaining: Standard workflow with urgency indicators
- [ ] <5 days remaining: Streamlined "essentials only" mode highlighting critical evidence
- [ ] Countdown timer visible on every screen during dispute response
- [ ] Color coding: green (14+), yellow (5-13), red (<5)
- [ ] Never blocks submission regardless of evidence completeness

**Task Breakdown:**
- Implement deadline calculation from Stripe dispute data: Small (2h)
- Build urgency UI components (timer, color coding): Small (3h)
- Create streamlined "essentials only" checklist variant: Small (3h)

**Dependencies:** REQ-001 (dispute data), REQ-002 (playbooks)

### Should Have (P1) — Important, Post-Launch

#### REQ-009: Landing Page with Waitlist
**Description:** Marketing landing page deployed early during build phase to start collecting interested merchants.

**Acceptance Criteria:**
- [ ] Clear value proposition: "$29/month flat, no success fees"
- [ ] Competitive comparison (vs Smart Disputes 30%, Chargeflow 25%, DisputeNinja $499)
- [ ] Email waitlist capture
- [ ] Mobile responsive
- [ ] Deployed on Vercel under project domain

**Task Breakdown:**
- Design and build landing page: Medium (8h)
- Implement waitlist email capture: Small (3h)
- Deploy and configure domain: Small (2h)

**Dependencies:** None (build in parallel)

#### REQ-010: Expanded Reason Code Playbooks
**Description:** Expand from 5 to all major reason codes across Visa, Mastercard, Amex, and Discover.

**Additional codes:**
- Visa: 13.6 (Credit Not Processed), 13.7 (Cancelled Merchandise)
- Mastercard: 4837 (No Cardholder Auth), 4841 (Cancelled Recurring), 4855 (Goods Not Provided)
- Amex: C08, C28, C31, C32
- Discover: Equivalent codes

**Task Breakdown:**
- Research additional network documentation: Large (16h)
- Draft playbooks per code: Large (20h)
- Joe validates: Medium (8h)

**Dependencies:** REQ-002 MVP playbooks validated

#### REQ-011: Win Rate Analytics Dashboard
**Description:** Analytics showing dispute outcomes, patterns, and prevention insights.

**Acceptance Criteria:**
- [ ] Win/loss breakdown by reason code
- [ ] Win rate trend over time
- [ ] Pattern detection: "3 'Product Not Received' disputes this month"
- [ ] Prevention tip suggestions based on patterns

**Dependencies:** REQ-006 (tracking), sufficient dispute volume

#### REQ-012: Email Notifications
**Description:** Email alerts for dispute deadlines and status changes.

**Acceptance Criteria:**
- [ ] New dispute notification
- [ ] Deadline approaching (3 days before)
- [ ] Dispute outcome notification (won/lost)

**Dependencies:** Email service integration

### Nice to Have (P2) — Future Enhancement

#### REQ-013: Evidence Quality Scoring
**Description:** Score the strength of the evidence package before submission.

#### REQ-014: Shipping Carrier Auto-Integration
**Description:** Auto-pull tracking data from USPS, UPS, FedEx.

#### REQ-015: Multi-Merchant Support
**Description:** Support for bookkeepers/agencies managing multiple Stripe accounts.

#### REQ-016: Industry Benchmarking
**Description:** "Your win rate is above/below average for your industry."

---

## Non-Functional Requirements

### Performance
- **Stripe App load time:** < 3 seconds within Stripe Dashboard
- **AI narrative generation:** < 15 seconds
- **Evidence file upload:** < 5 seconds per file (10MB max)
- **Stripe API calls:** < 2 seconds p95

### Security
- **Authentication:** Via Stripe App OAuth (no separate auth system needed)
- **Data Protection:** No PCI-scoped cardholder data stored outside Stripe. Evidence files encrypted at rest in Supabase. 30-day auto-deletion of uploaded evidence.
- **Sensitive documents:** Bank statements and financial documents treated as sensitive — encrypt at rest, strict access controls, auto-deletion
- **API keys:** Claude API key and Stripe secret key stored in environment variables, never client-side

### Scalability
- **Initial load:** 100 merchants, ~500 disputes/month
- **Scale target:** 2,000 merchants, ~10,000 disputes/month
- **Architecture:** Vercel serverless functions auto-scale. Supabase handles concurrent reads/writes.

### Reliability
- **Uptime:** 99.5% (Stripe App users expect availability during business hours)
- **Error handling:** Graceful degradation if Claude API is down (merchant can still upload evidence and submit manually)
- **Data safety:** Evidence files backed up before Stripe submission. No data loss on submission failure.

### Compatibility
- **Platform:** Stripe Dashboard (Chrome, Firefox, Safari, Edge — latest 2 versions)
- **No mobile app:** Stripe Dashboard is desktop-focused
- **Stripe API version:** Use latest stable Stripe API version

---

## Technical Considerations

### System Architecture

```
┌─────────────────────────────────────────────────┐
│              Stripe Dashboard                     │
│  ┌───────────────────────────────────────────┐   │
│  │         WinBack (Stripe App)         │   │
│  │         React + Stripe UI Components       │   │
│  │         Runs in iframe                     │   │
│  └──────────────────┬────────────────────────┘   │
└─────────────────────┼───────────────────────────┘
                      │ HTTPS
                      ▼
┌─────────────────────────────────────────────────┐
│         Vercel (Next.js API Routes)              │
│                                                   │
│  ┌──────────┐  ┌──────────┐  ┌──────────────┐  │
│  │ Dispute   │  │ Evidence │  │ Narrative    │  │
│  │ Handler   │  │ Upload   │  │ Generator    │  │
│  └─────┬─────┘  └────┬─────┘  └──────┬───────┘  │
│        │              │               │           │
└────────┼──────────────┼───────────────┼───────────┘
         │              │               │
    ┌────▼────┐   ┌─────▼─────┐   ┌────▼─────┐
    │ Stripe  │   │ Supabase  │   │ Claude   │
    │ API     │   │ DB +      │   │ API      │
    │         │   │ Storage   │   │          │
    └─────────┘   └───────────┘   └──────────┘
```

**Key Components:**
1. **Stripe App (Frontend):** React app using Stripe UI component library, runs inside Stripe Dashboard iframe. Communicates with Vercel backend via authenticated API calls.
2. **Vercel Backend:** Next.js API routes handle all server-side logic — Stripe API calls, Claude API integration, Supabase operations. Serverless, auto-scales.
3. **Supabase:** PostgreSQL database for playbooks, dispute tracking, user preferences. Supabase Storage for temporary evidence files. Row-level security per merchant.
4. **Claude API:** Narrative generation via backend route. Prompt templates per reason code.
5. **Stripe APIs:** Disputes, Charges, Customers (read), Dispute Evidence (write), Billing.

### Database Schema

```sql
-- Merchants (linked to Stripe account)
CREATE TABLE merchants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_account_id TEXT UNIQUE NOT NULL,
  email TEXT,
  business_name TEXT,
  subscription_status TEXT DEFAULT 'trial',
  subscription_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reason code playbooks
CREATE TABLE playbooks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  network TEXT NOT NULL, -- visa, mastercard, amex, discover
  reason_code TEXT NOT NULL,
  display_name TEXT NOT NULL,
  description TEXT NOT NULL, -- plain English explanation
  issuer_evaluation TEXT NOT NULL, -- what the bank looks at
  evidence_checklist JSONB NOT NULL, -- [{item, required, why_matters}]
  common_mistakes JSONB, -- [{mistake, explanation}]
  narrative_template TEXT NOT NULL, -- prompt template for AI
  pro_tips JSONB, -- [{tip}]
  urgency_essentials JSONB, -- subset of checklist for <5 day deadline
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(network, reason_code)
);

-- Dispute tracking
CREATE TABLE disputes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID REFERENCES merchants(id),
  stripe_dispute_id TEXT UNIQUE NOT NULL,
  stripe_charge_id TEXT,
  amount INTEGER NOT NULL, -- cents
  currency TEXT DEFAULT 'usd',
  reason_code TEXT NOT NULL,
  network TEXT, -- visa, mastercard, etc.
  status TEXT DEFAULT 'needs_response', -- needs_response, evidence_submitted, won, lost, expired
  customer_name TEXT,
  transaction_date TIMESTAMPTZ,
  response_deadline TIMESTAMPTZ,
  evidence_submitted_at TIMESTAMPTZ,
  outcome_at TIMESTAMPTZ,
  narrative_text TEXT, -- final submitted narrative
  narrative_generations_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Evidence files
CREATE TABLE evidence_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dispute_id UUID REFERENCES disputes(id) ON DELETE CASCADE,
  checklist_item_key TEXT NOT NULL, -- maps to playbook checklist item
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL, -- Supabase Storage path
  file_size INTEGER,
  mime_type TEXT,
  uploaded_at TIMESTAMPTZ DEFAULT NOW(),
  submitted_to_stripe BOOLEAN DEFAULT false,
  expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '30 days')
);

CREATE INDEX idx_disputes_merchant ON disputes(merchant_id);
CREATE INDEX idx_disputes_status ON disputes(status);
CREATE INDEX idx_evidence_dispute ON evidence_files(dispute_id);
```

### Technology Stack

- **Frontend:** Stripe Apps SDK (React-based), Stripe UI component library
- **Backend:** Next.js 15+ (App Router) on Vercel
- **Database:** Supabase (PostgreSQL + Storage + Auth + RLS)
- **AI:** Claude API (Anthropic) for narrative generation
- **Billing:** Stripe App Marketplace billing or Stripe Billing API
- **Hosting:** Vercel (serverless, auto-scaling)
- **Monitoring:** Sentry for error tracking, Vercel Analytics

### External Dependencies

1. **Stripe APIs:** Disputes, Charges, Customers, Events/Webhooks, Billing
   - Rate limits: 100 reads/sec, 100 writes/sec per account
   - Failure handling: Queue and retry with exponential backoff

2. **Claude API (Anthropic):**
   - Purpose: Generate dispute response narratives
   - Model: claude-sonnet-4-6 (cost-optimized)
   - Estimated cost: ~$0.05-0.15 per narrative generation
   - Failure handling: Show "AI unavailable" message, allow manual narrative entry

3. **Supabase:**
   - Purpose: Database, file storage, real-time subscriptions
   - Failure handling: Cache critical playbook data, queue file uploads

### AI Cost Modeling

**Assumptions:**
- Average merchant: 5 disputes/month
- Average narrative generations per dispute: 2 (initial + 1 revision)
- Cost per generation (claude-sonnet-4-6): ~$0.08 (input: ~2K tokens, output: ~1K tokens)

**Per merchant/month:** 5 disputes x 2 generations x $0.08 = $0.80
**At 100 merchants:** $80/month AI costs
**At 1,000 merchants:** $800/month AI costs
**At 2,000 merchants:** $1,600/month AI costs

**Worst case (15 disputes, 5 generations each):** 75 x $0.08 = $6.00/merchant/month

**Margin at $29/month:** Even worst case ($6 AI + ~$5 infra), margin is ~$18/merchant/month (62%).

**Cost guardrail:** 5 narrative generations per dispute. Merchant sees "You've used all 5 generations. Please edit the narrative manually or contact support."

---

## Implementation Roadmap

### Phase 0: Project Setup & Research (Week 1, Days 1-3)
**Goal:** Project scaffolding, Stripe App SDK exploration, billing research, start playbook research

**Tasks:**
- Task 0.1: Initialize Next.js project with Stripe Apps SDK: Small (3h)
- Task 0.2: Set up Supabase project with schema: Small (3h)
- Task 0.3: Research Stripe App Marketplace billing model: Small (3h)
- Task 0.4: Research Stripe Apps SDK UI constraints and capabilities: Medium (4h)
- Task 0.5: Research Stripe Disputes API evidence submission format: Small (3h)
- Task 0.6: Deploy landing page with waitlist (parallel): Medium (8h)

**Playbook Research (parallel agent workstream):**
- Task 0.7: Research Visa Core Rules for 13.1, 13.2, 13.3, 10.4: Large (12h)
- Task 0.8: Research Mastercard Chargeback Guide for 4853: Medium (4h)

**Validation Checkpoint:** Stripe App loads in dev mode. Supabase schema deployed. Billing approach decided. Landing page live.

### Phase 1: Core Dispute Flow (Week 1-2, Days 3-10)
**Goal:** Merchant can view disputes, see checklists, upload evidence

**Tasks:**
- Task 1.1: Build Stripe App shell and sidebar navigation: Small (3h)
- Task 1.2: Implement Stripe OAuth and API client for disputes/charges/customers: Medium (6h)
- Task 1.3: Build dispute list view with status indicators: Medium (5h)
- Task 1.4: Build dispute detail view with Stripe data auto-population: Medium (5h)
- Task 1.5: Implement reason code lookup and playbook loading: Medium (4h)
- Task 1.6: Build evidence checklist component with "why this matters" expandables: Medium (6h)
- Task 1.7: Build smart urgency deadline display (timer, color coding, essentials mode): Small (4h)
- Task 1.8: Build evidence upload component per checklist item: Medium (5h)
- Task 1.9: Implement Supabase Storage for temporary evidence files: Small (3h)

**Playbook Research continues in parallel:**
- Task 1.10: Draft playbook content for Visa 13.1: Medium (4h)
- Task 1.11: Draft playbook content for Visa 13.2: Medium (4h)
- Task 1.12: Draft playbook content for Visa 13.3: Medium (4h)
- Task 1.13: Draft playbook content for Visa 10.4: Medium (4h)
- Task 1.14: Draft playbook content for Mastercard 4853: Medium (4h)
- Task 1.15: Joe validates and refines all 5 playbooks: Medium (8h — Joe's time)

**Validation Checkpoint:** Merchant can open app, see disputes with checklists, upload evidence files. Playbooks validated.

### Phase 2: AI Narrative & Submission (Week 2-3, Days 10-17)
**Goal:** AI generates narrative, merchant reviews, submits to Stripe

**Tasks:**
- Task 2.1: Design prompt templates per reason code (tied to playbook narrative_template): Medium (6h)
- Task 2.2: Build Claude API integration backend route: Medium (5h)
- Task 2.3: Build narrative review/edit UI with reasoning annotations: Medium (6h)
- Task 2.4: Implement generation limit tracking (5 per dispute): Small (2h)
- Task 2.5: Implement evidence field mapping per reason code for Stripe API: Medium (5h)
- Task 2.6: Build Stripe Disputes API evidence submission flow: Medium (6h)
- Task 2.7: Build submission confirmation screen: Small (3h)
- Task 2.8: Handle submission errors and edge cases: Small (3h)

**Validation Checkpoint:** Full end-to-end flow works: view dispute → checklist → upload → AI narrative → review → submit to Stripe.

### Phase 3: Tracking, Billing & Polish (Week 3, Days 17-21)
**Goal:** Dispute tracking, billing, empty state, QA

**Tasks:**
- Task 3.1: Implement webhook endpoint for dispute outcome updates: Medium (5h)
- Task 3.2: Build win rate calculation and dashboard display: Small (3h)
- Task 3.3: Build basic pattern detection: Small (4h)
- Task 3.4: Implement subscription billing (per research findings): Medium (6h)
- Task 3.5: Build paywall/subscription gate: Small (3h)
- Task 3.6: Build empty state with onboarding content: Small (3h)
- Task 3.7: Build new dispute notification/badge: Small (3h)
- Task 3.8: End-to-end QA in Stripe test mode: Medium (6h)
- Task 3.9: Prepare Stripe App Marketplace listing (description, screenshots): Small (3h)
- Task 3.10: Submit app for Stripe review: Small (1h)

**Validation Checkpoint:** Complete app ready for marketplace. All features working in test mode. Billing functional. App submitted for review.

### Task Dependencies Visualization

```
Phase 0 (Setup):
  0.1 (Next.js) ──┐
  0.2 (Supabase) ─┤
  0.3 (Billing)   │   All feed into Phase 1
  0.4 (SDK)  ─────┤
  0.5 (API)  ─────┘
  0.6 (Landing) ────── Independent
  0.7-0.8 (Research) ── Feeds into 1.10-1.15 (Playbooks)

Phase 1 (Core Flow):
  0.1 → 1.1 (Shell) → 1.2 (OAuth) → 1.3 (List) → 1.4 (Detail)
  0.2 → 1.9 (Storage) → 1.8 (Upload)
  1.5 (Playbook lookup) depends on 1.10-1.15 (content)
  1.6 (Checklist) depends on 1.5
  1.7 (Urgency) depends on 1.4

Phase 2 (AI & Submit):
  1.5 → 2.1 (Prompts) → 2.2 (Claude API) → 2.3 (Review UI)
  2.4 (Limits) depends on 2.2
  1.8 → 2.5 (Mapping) → 2.6 (Submit) → 2.7 (Confirm)

Phase 3 (Polish):
  2.6 → 3.1 (Webhooks) → 3.2 (Win rate) → 3.3 (Patterns)
  0.3 → 3.4 (Billing) → 3.5 (Paywall)
  3.6-3.7 (Empty/Notification) independent
  All → 3.8 (QA) → 3.9 (Listing) → 3.10 (Submit)

Critical Path: 0.1 → 1.1 → 1.2 → 1.4 → 1.5 → 2.1 → 2.2 → 2.6 → 3.8 → 3.10
```

### Effort Estimation

| Phase | Estimated Hours | Calendar Days |
|-------|----------------|---------------|
| Phase 0: Setup & Research | ~44h (code) + playbook research | Days 1-3 |
| Phase 1: Core Flow | ~49h (code) + ~28h playbooks | Days 3-10 |
| Phase 2: AI & Submit | ~36h | Days 10-17 |
| Phase 3: Polish & Ship | ~37h | Days 17-21 |
| **Total** | **~166h code + ~44h playbooks** | **~3 weeks** |

Note: Many tasks are parallelizable. With AI agent execution, code tasks compress significantly. Playbook research/validation is the serial bottleneck requiring Joe's domain expertise.

---

## Out of Scope

1. **Full automation (submit without merchant review)** — WinBack is a guide, not a black box. Merchant always reviews and approves.
2. **Mobile app** — Stripe Dashboard is desktop-focused. No separate mobile app for MVP.
3. **Multi-merchant/agency support** — Phase 3 feature. MVP is one Stripe account per installation.
4. **Shipping carrier auto-integration** — Phase 3. MVP requires manual tracking number entry.
5. **Prevention-only features** — MVP focuses on winning existing disputes. Prevention insights come in Phase 2-3.
6. **Non-Stripe payment processors** — Stripe only for now. PayPal/Adyen/others are future portfolio expansion.
7. **Shared infrastructure for portfolio apps** — Build WinBack standalone. Don't over-architect for future Stripe apps yet.
8. **Enterprise features** — No team management, no role-based access, no bulk operations.

---

## Open Questions & Risks

### Open Questions

#### Q1: Stripe App Marketplace Billing Model
- **Current Status:** Needs research. Stripe may offer built-in app subscription billing (with revenue share) or require self-managed billing.
- **Options:** (A) Marketplace billing (simpler, Stripe takes a cut), (B) Self-managed Stripe Billing (full control, no cut)
- **Owner:** Research during Phase 0
- **Deadline:** Day 3 (before Phase 1 billing work)
- **Impact:** High — affects billing implementation approach

#### Q2: Stripe Apps SDK UI Constraints
- **Current Status:** Unknown. SDK may limit custom UI components, viewport size, network access from frontend.
- **Options:** (A) Work within SDK constraints, (B) Hybrid: minimal SDK frontend + link to external full app
- **Owner:** Research during Phase 0
- **Deadline:** Day 2 (before starting UI work)
- **Impact:** High — could change entire frontend architecture

#### Q3: Evidence File Handling via Stripe API
- **Current Status:** Need to confirm whether Stripe Disputes API accepts direct file uploads or requires file URLs.
- **Owner:** Research during Phase 0
- **Deadline:** Day 2
- **Impact:** Medium — affects upload/submission flow

#### Q4: Stripe App Review Timeline
- **Current Status:** Unknown. Could be days or weeks.
- **Owner:** Submit early, track progress
- **Deadline:** Submit by end of Phase 2 at latest
- **Impact:** Medium — could delay marketplace launch

#### Q5: Webhook Support in Stripe Apps
- **Current Status:** Need to confirm best approach for detecting new disputes (webhooks vs polling) within the Stripe App framework.
- **Owner:** Research during Phase 0
- **Deadline:** Day 3
- **Impact:** Low — polling is a viable fallback

### Risks & Mitigation

| Risk | Likelihood | Impact | Severity | Mitigation | Contingency |
|------|------------|--------|----------|------------|-------------|
| Stripe App SDK too constrained for needed UX | Medium | High | **Critical** | Research SDK thoroughly in Phase 0 before committing | Hybrid approach: minimal in-dashboard app + link to full external web app |
| Playbook research takes longer than estimated | Medium | High | **High** | Start research Day 1, use AI agents for documentation ingestion | Launch with 3 playbooks instead of 5, add more post-launch |
| Stripe rejects app or review takes months | Low | High | **High** | Submit for review early (Phase 2), maintain communication with Stripe | Offer direct install via Stripe Connect while waiting |
| Claude API quality insufficient for narratives | Low | Medium | **Medium** | Test extensively with real dispute scenarios during development | Upgrade to opus model, or provide template-based narratives as fallback |
| Low marketplace discovery / no organic installs | Medium | Medium | **Medium** | Landing page + content marketing + community engagement started during build | Supplement with direct outreach in merchant communities |
| Merchants churn during quiet months (no disputes) | High | Low | **Medium** | Acceptable per business model — low CAC via marketplace means low-cost re-acquisition | Phase 2: add educational content and prevention insights for ongoing value |

---

## Validation Checkpoints

### Checkpoint 0: End of Phase 0
- [ ] Next.js + Stripe App project scaffolded and loading in dev mode
- [ ] Supabase schema deployed
- [ ] Billing approach decided (marketplace vs self-managed)
- [ ] SDK constraints documented
- [ ] Landing page live with waitlist
- [ ] Playbook research underway

### Checkpoint 1: End of Phase 1
- [ ] Stripe App displays active disputes with reason code context
- [ ] Evidence checklists render correctly per reason code
- [ ] File upload works for each checklist item
- [ ] All 5 playbooks validated by Joe
- [ ] Smart urgency display works correctly

### Checkpoint 2: End of Phase 2
- [ ] AI narrative generates in <15 seconds with reasoning annotations
- [ ] Merchant can review and edit narrative
- [ ] Complete evidence package submits to Stripe successfully
- [ ] End-to-end flow works in test mode

### Checkpoint 3: End of Phase 3 (Ship Ready)
- [ ] Dispute tracking and win rate display functional
- [ ] Billing/subscription working
- [ ] Empty state and onboarding polished
- [ ] QA complete — no critical bugs
- [ ] App submitted for Stripe marketplace review
- [ ] Marketplace listing prepared

---

## Appendix: Task Breakdown Hints

### Parallelizable Workstreams

**Stream A: Stripe App + UI (Phases 0-3)**
All frontend and Stripe integration work. Sequential within stream.

**Stream B: Playbook Research (Phase 0-1)**
Can run entirely in parallel with code work. Agent researches card network documentation, drafts playbooks, Joe validates.

**Stream C: Landing Page & GTM (Phase 0)**
Completely independent. Build and deploy during Phase 0.

**Stream D: AI Integration (Phase 2)**
Claude API prompt design and integration. Depends on playbooks (Stream B).

### Task Count Summary
- Phase 0: 8 tasks
- Phase 1: 15 tasks
- Phase 2: 8 tasks
- Phase 3: 10 tasks
- **Total: 41 tasks**

### Critical Path Tasks
0.1 → 1.1 → 1.2 → 1.4 → 1.5 → 2.1 → 2.2 → 2.6 → 3.8 → 3.10

**Critical path duration:** ~60h code (~2 weeks with focused execution)

---

**End of PRD**

*This PRD is optimized for TaskMaster AI task generation and Linear issue creation. All requirements include task breakdown hints, complexity estimates, and dependency mapping to enable effective agent-driven execution.*
