# WIN-13: Seed Playbook Data into Supabase

**Date:** 2026-04-05
**Issue:** [WIN-13](https://linear.app/jkbtech/issue/WIN-13/seed-playbook-data-into-supabase)
**Status:** Design approved

## Summary

Convert all 7 validated playbook markdowns into structured JSON and seed them into Supabase. Create an API route for playbook retrieval. Enrich the existing `playbooks` table schema with additional columns to capture the full depth of playbook content. Update the original 5 playbooks to incorporate issuer-side research insights before seeding.

## Scope

- **7 playbooks:** Visa 10.4, 13.1, 13.2, 13.3, 13.6 + Mastercard 4808, 4853
- Schema migration to add new columns
- Seed script (idempotent, re-runnable)
- API route for retrieval
- Playbook markdown updates (incorporate research insights, no source attribution in seeded data)

## Schema Migration

New migration: `003_expand_playbooks_schema.sql`

Adds columns to the existing `playbooks` table:

```sql
ALTER TABLE playbooks ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE playbooks ADD COLUMN IF NOT EXISTS legacy_code TEXT;
ALTER TABLE playbooks ADD COLUMN IF NOT EXISTS response_deadline_days INTEGER;
ALTER TABLE playbooks ADD COLUMN IF NOT EXISTS filing_window_days INTEGER;
ALTER TABLE playbooks ADD COLUMN IF NOT EXISTS acquirer_prereview TEXT;
ALTER TABLE playbooks ADD COLUMN IF NOT EXISTS key_differences TEXT;
```

Existing columns retained and populated with richer structure:
- `display_name` (text) -- already exists
- `description` (text) -- plain English explanation
- `issuer_evaluation` (text) -- what the bank looks at
- `evidence_checklist` (jsonb) -- enriched structure below
- `common_mistakes` (jsonb) -- enriched structure below
- `narrative_template` (text) -- template structure
- `pro_tips` (jsonb) -- enriched structure below
- `urgency_essentials` (jsonb) -- enriched structure below

### JSONB Column Structures

**`evidence_checklist`:**
```json
[
  {
    "item": "Carrier tracking confirmation with delivery scan",
    "category": "mandatory",
    "context": "physical_goods",
    "required": true,
    "why_matters": "This is the single most important piece of evidence. A tracking number showing 'delivered' to the correct address wins most cases.",
    "urgency_essential": true,
    "urgency_order": 1
  }
]
```

- `category`: "mandatory" | "recommended" | "situational"
- `context`: "physical_goods" | "digital_goods" | "services" | "all" | "amount_discrepancy" | "expired_auth" | "refund_issued" | "refund_disputed" | "installment_defense"
- `urgency_essential`: boolean, whether this item appears in the <5 days essentials list
- `urgency_order`: integer, priority order when in urgency mode (null if not essential)

**`common_mistakes`:**
```json
[
  {
    "mistake": "Processing payment before shipping",
    "explanation": "If you charge before the item ships, you have no delivery proof for the period between charge and shipment."
  }
]
```

**`pro_tips`:**
```json
[
  {
    "tip": "Always use tracked shipping with delivery confirmation. This single practice wins most 13.1 disputes."
  }
]
```

**`urgency_essentials`:**
```json
{
  "summary": "Delivery proof is what wins this case.",
  "ordered_items": [
    "Carrier tracking confirmation showing delivery",
    "Delivery address matches order address",
    "Order confirmation with item details",
    "Any customer communication acknowledging receipt"
  ]
}
```

## Seed Script

**Location:** `backend/supabase/seed-playbooks.ts`

- Defines all 7 playbooks as typed objects
- Upserts into Supabase on `(network, reason_code)` unique constraint
- Runnable: `npx tsx backend/supabase/seed-playbooks.ts`
- Idempotent -- safe to re-run without duplicating data
- Requires `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` env vars

Each playbook object maps directly from the markdown file content to the schema columns. No source attribution (no Highnote, no Confluence links) in any seeded data.

## API Route

**Endpoint:** `POST /api/playbooks`

- Protected by Stripe App signature middleware (`withStripeAuth`)
- Request body: `{ network: string, reason_code: string }`
- Success response: `{ data: Playbook }`
- 404 response: `{ error: "Playbook not found", code: "not_found" }`

Follows the existing pattern of POST-based routes with Stripe auth (same as `/api/disputes`).

## Playbook Markdown Updates

Before converting to structured JSON, update the original 5 playbooks to ensure completeness:

1. **Verify all 7 playbooks have consistent sections:** Metadata, Description, Issuer Evaluation, Acquirer Pre-Review, Evidence Checklist, Common Mistakes, Pro Tips, Urgency Essentials, Narrative Template
2. **Incorporate any missing issuer-side research insights** into the existing sections (without attribution)
3. **Ensure the "precise representment target" subsection** exists in all consumer dispute playbooks (13.1, 13.2, 13.3, 13.6, 4853) -- currently only in 13.3 and 4853
4. **Add chargeback lifecycle context** where educationally relevant (how money moves at each stage) -- this helps merchants understand what's happening during the dispute process

## Dependencies

- WIN-2 (Supabase schema) -- done
- WIN-7 (Visa research) -- done
- WIN-8 (Mastercard research) -- done
- WIN-31 (Auth middleware) -- done

## Downstream Consumers

- WIN-12: Dispute Detail View -- fetches playbook to show reason code explanation + game plan
- WIN-14: Evidence Checklist Component -- renders `evidence_checklist` items with categories
- WIN-17: AI Prompt Templates -- uses playbook data as context for narrative generation

## Acceptance Criteria

- [ ] Migration runs cleanly on the existing Supabase schema
- [ ] All 7 playbooks seeded with complete data
- [ ] Seed script is idempotent (re-run produces same result)
- [ ] API route returns correct playbook per network + reason_code
- [ ] Evidence checklists include category, context, required, why_matters, urgency flags
- [ ] Urgency essentials defined with ordered items per playbook
- [ ] No source attribution in any seeded data
- [ ] No em dashes in any seeded content
