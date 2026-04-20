# WIN-27: End-to-End QA in Stripe Test Mode

Linear: https://linear.app/jkbtech/issue/WIN-27/end-to-end-qa-in-stripe-test-mode
Status: in progress
Started: 2026-04-19
Tester: Joe
Environment: Dockett test account (acct_1TCiPdEQYvM3XwRz), dev Supabase

## Setup checklist

- [x] Backend dev server running on :3000
- [x] Integration test suite green (5/5)
- [x] `cd stripe-app && stripe apps start` running
- [x] `stripe listen --forward-to localhost:3000/api/webhooks/stripe` running
- [x] `STRIPE_WEBHOOK_SECRET` matches `whsec_` from `stripe listen`
- [x] Merchant row seeded (Dockett test account)
- [x] Playbooks seeded
- [x] 7 disputes prepped (see fixtures below)

## Dispute fixtures

Prepped via `npx tsx backend/scripts/qa-prep-win-27.ts` on 2026-04-19. Amount $1.00 on all.

| Stripe dispute ID | Assigned | Deadline (UTC) | Urgency tier | viewed_at | Role |
|-------------------|----------|----------------|--------------|-----------|------|
| du_1TN5OiEQYvM3XwRz0MRwmnN9 | visa/10.4 | 2026-04-25 | warning (5-13d) | set | Native, keeps Stripe reason `fraudulent`. Full E2E incl real Submit |
| du_1TNnESEQYvM3XwRz35SZQEYY | visa/13.1 | 2026-04-27 | warning | set | Retargeted |
| du_1TO9U0EQYvM3XwRzRBqogiOf | visa/13.2 | 2026-05-09 | **calm (14+d)** | set | Retargeted + deadline future-dated |
| du_1TO9TwEQYvM3XwRzgpMUWDAt | visa/13.3 | 2026-04-28 | warning | set | Retargeted |
| du_1TO9TrEQYvM3XwRzzRMLRRDa | visa/13.6 | 2026-04-22 | **urgent (<5d)** | set | Retargeted + deadline backdated |
| du_1TO9TmEQYvM3XwRzWoTAePpg | mastercard/4808 | 2026-04-28 | warning | set | Retargeted |
| du_1TO9YNEQYvM3XwRzOpvJ1HHU | mastercard/4853 | 2026-04-28 | warning | **null** | Retargeted + new-badge fixture |

Older DB rows (`du_1TMLgL...`, `du_1TLy...`, `du_1TLx...`) remain in the DB but are filtered out of the app list. Leave them alone.

## Playbook coverage matrix

Legend: blank = not tested, ok = pass, fail = bug filed, n/a = skipped, blocked = dep issue

Steps:
- **L**ist: dispute appears in list with correct urgency tier, new-dispute badge, amount
- **D**etail: detail view renders reason code copy, metadata, and correct playbook checklist
- **U**pload: evidence upload works for pdf, png, jpg; files persist; checklist items mark complete
- **N**arrative: AI narrative generates with reasoning annotations referencing uploaded evidence only
- **E**dit: merchant edits persist; regenerate preserves edits-vs-regenerate semantics
- **R**egen feedback: feedback chips record on regenerate (WIN-35), count increments, cap enforced at 5
- **S**ubmit: "Submit to Stripe" performs real submission and returns success (only valid on the native playbook)
- **C**onfirm: post-submit confirmation screen + read-only state on return

| Playbook | L | D | U | N | E | R | S | C | Notes |
|----------|---|---|---|---|---|---|---|---|-------|
| visa/10.4 Fraud (card-absent) |  |  |  |  |  |  |  |  | Use native dispute for **S** |
| visa/13.1 Services not received |  |  |  |  |  |  | n/a | n/a | Retargeted, Submit will fail by design |
| visa/13.2 Cancelled recurring |  |  |  |  |  |  | n/a | n/a | Retargeted |
| visa/13.3 Not as described |  |  |  |  |  |  | n/a | n/a | Retargeted |
| visa/13.6 Credit not processed |  |  |  |  |  |  | n/a | n/a | Retargeted |
| mastercard/4808 Authorization |  |  |  |  |  |  | n/a | n/a | Retargeted |
| mastercard/4853 Cardholder dispute |  |  |  |  |  |  | n/a | n/a | Retargeted |

## Cross-cutting flows

### Urgency tiers
- Deferred: list view reads due_by from Stripe directly (not our DB), so fixture overrides don't propagate. Rely on unit tests for tier rendering; manual QA lands in warning tier only.

### New dispute badge (WIN-26)
- [x] Unseen dispute shows "New" badge in list (du_1TO9YN, 2026-04-19)
- [x] Opening the detail view clears the badge (confirmed on click-through)
- [ ] Badge does not reappear after refresh (spot-check later)
- [ ] Expired or submitted disputes never show the badge (spot-check later)

### Expired disputes (WIN-48)
- [ ] Dispute with due date in the past is read-only
- [ ] Upload, narrative, submit controls all disabled
- [ ] Banner explains why

### Empty state and onboarding (WIN-25)
- [ ] New merchant with zero disputes sees onboarding content
- [ ] Copy is pricing-agnostic per `feedback_pricing_agnostic_copy`
- [ ] CTA leads somewhere sensible
- [ ] State resolves once a dispute appears

### Narrative feedback on regenerate (WIN-35)
- [ ] Feedback chips appear on regenerate click
- [ ] Selected chips + optional note reach the API
- [ ] Stored on narrative_generations row
- [ ] Cap of 5 generations enforced, UI disables further regens after

### Billing (WIN-24 hybrid)
- [ ] Free tier: user can complete one submission, success-fee path engages
- [ ] Paywall: second submission prompts upgrade to Pro
- [ ] Pro subscribe flow: Stripe Checkout round-trips and unlocks submission
- [ ] Pro cancel: subscription cancellation reverts entitlement at period end
- [ ] Webhook `customer.subscription.*` updates merchant row

### Webhook outcome updates (WIN-21)
- [ ] `charge.dispute.funds_withdrawn` updates status
- [ ] `charge.dispute.closed` (won) marks dispute won + updates UI
- [ ] `charge.dispute.closed` (lost) marks lost + updates UI
- [ ] Idempotent on redelivery (no duplicate side effects)

### Narrative-only items (WIN-49)
- [ ] Checklist items flagged as narrative-only surface the merchant input UI
- [ ] Input persists to `checklist_notes`
- [ ] Narrative generation incorporates the note

### Auth middleware (WIN-31)
- [ ] Hitting any API route without a valid Stripe-Signature header returns 401
- [ ] Webhook routes use their own Stripe webhook signature (not app signature)

## Findings log

Format: `YYYY-MM-DD HH:MM | severity | area | finding | linear | fix commit`

Severities: **blocker** (ships no), **major** (noticeable bug), **minor** (polish), **nit** (copy/visual)

| Time | Sev | Area | Finding | Linear | Fix |
|------|-----|------|---------|--------|-----|
|  |  |  |  |  |  |

## Critical bugs (blockers only)

Blockers here must be fixed before WIN-27 closes.

- [ ] (none yet)

## Decisions + deferrals

Non-blocking issues punted to post-launch. Each gets a Linear issue.

- [ ] (none yet)

## Sign-off

- [ ] All 7 playbook rows are ok through step **R**
- [ ] At least one playbook completes steps **S** and **C** against real Stripe
- [ ] All cross-cutting sections ok or explicitly deferred
- [ ] All blockers resolved
- [ ] Move WIN-27 to Done, unblock WIN-28 (Marketplace listing)
