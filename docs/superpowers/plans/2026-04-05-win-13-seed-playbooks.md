# WIN-13: Seed Playbook Data into Supabase — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Seed all 7 validated playbooks into Supabase with enriched schema, and create an API route for retrieval.

**Architecture:** Expand the existing `playbooks` table with new columns via migration, define all 7 playbooks as typed TypeScript objects in a seed script, upsert into Supabase, and expose via a POST API route protected by Stripe App signature auth. The playbook data is read-only reference data — no CRUD, just seeding and reading.

**Tech Stack:** Supabase (PostgreSQL), Next.js 15 App Router, TypeScript, Vitest

---

## File Structure

| Action | Path | Responsibility |
|--------|------|---------------|
| Create | `backend/supabase/migrations/003_expand_playbooks_schema.sql` | Add new columns to playbooks table |
| Create | `backend/lib/playbooks/types.ts` | TypeScript types for playbook data |
| Create | `backend/lib/playbooks/data/visa-10.4.ts` | Visa 10.4 playbook structured data |
| Create | `backend/lib/playbooks/data/visa-13.1.ts` | Visa 13.1 playbook structured data |
| Create | `backend/lib/playbooks/data/visa-13.2.ts` | Visa 13.2 playbook structured data |
| Create | `backend/lib/playbooks/data/visa-13.3.ts` | Visa 13.3 playbook structured data |
| Create | `backend/lib/playbooks/data/visa-13.6.ts` | Visa 13.6 playbook structured data |
| Create | `backend/lib/playbooks/data/mastercard-4808.ts` | Mastercard 4808 playbook structured data |
| Create | `backend/lib/playbooks/data/mastercard-4853.ts` | Mastercard 4853 playbook structured data |
| Create | `backend/lib/playbooks/data/index.ts` | Re-exports all playbooks as array |
| Create | `backend/lib/playbooks/index.ts` | getPlaybook() query function |
| Create | `backend/lib/playbooks/__tests__/types.test.ts` | Validates all playbook data against types |
| Create | `backend/lib/playbooks/__tests__/getPlaybook.test.ts` | Tests for getPlaybook() |
| Create | `backend/supabase/seed-playbooks.ts` | Seed script: upserts all playbooks |
| Create | `backend/app/api/playbooks/route.ts` | API route: POST /api/playbooks |
| Create | `backend/app/api/playbooks/__tests__/route.test.ts` | API route tests |

---

### Task 1: Schema Migration

**Files:**
- Create: `backend/supabase/migrations/003_expand_playbooks_schema.sql`

- [ ] **Step 1: Write the migration**

```sql
-- Expand playbooks table with richer columns for WIN-13
-- Adds: category, legacy_code, response_deadline_days, filing_window_days,
--        acquirer_prereview, key_differences

ALTER TABLE playbooks ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE playbooks ADD COLUMN IF NOT EXISTS legacy_code TEXT;
ALTER TABLE playbooks ADD COLUMN IF NOT EXISTS response_deadline_days INTEGER;
ALTER TABLE playbooks ADD COLUMN IF NOT EXISTS filing_window_days INTEGER;
ALTER TABLE playbooks ADD COLUMN IF NOT EXISTS acquirer_prereview TEXT;
ALTER TABLE playbooks ADD COLUMN IF NOT EXISTS key_differences TEXT;
```

- [ ] **Step 2: Apply the migration to Supabase**

Run the SQL in the Supabase dashboard SQL editor or via CLI. Verify the columns exist:

```sql
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'playbooks'
ORDER BY ordinal_position;
```

Expected: all original columns plus `category`, `legacy_code`, `response_deadline_days`, `filing_window_days`, `acquirer_prereview`, `key_differences`.

- [ ] **Step 3: Commit**

```bash
git add backend/supabase/migrations/003_expand_playbooks_schema.sql
git commit -m "feat(backend): add expanded columns to playbooks table (WIN-13)"
```

---

### Task 2: Playbook TypeScript Types

**Files:**
- Create: `backend/lib/playbooks/types.ts`

- [ ] **Step 1: Define the types**

```typescript
export type CardNetwork = "visa" | "mastercard" | "amex" | "discover";

export type PlaybookCategory = "fraud" | "consumer" | "authorization";

export type EvidenceCategory = "mandatory" | "recommended" | "situational";

export type EvidenceContext =
  | "physical_goods"
  | "digital_goods"
  | "services"
  | "all"
  | "amount_discrepancy"
  | "expired_auth"
  | "refund_issued"
  | "refund_disputed"
  | "installment_defense"
  | "ce3";

export interface EvidenceChecklistItem {
  item: string;
  category: EvidenceCategory;
  context: EvidenceContext;
  required: boolean;
  why_matters: string;
  urgency_essential: boolean;
  urgency_order: number | null;
}

export interface CommonMistake {
  mistake: string;
  explanation: string;
}

export interface ProTip {
  tip: string;
}

export interface UrgencyEssentials {
  summary: string;
  ordered_items: string[];
}

export interface PlaybookData {
  network: CardNetwork;
  reason_code: string;
  display_name: string;
  category: PlaybookCategory;
  legacy_code: string | null;
  description: string;
  issuer_evaluation: string;
  acquirer_prereview: string;
  evidence_checklist: EvidenceChecklistItem[];
  common_mistakes: CommonMistake[];
  pro_tips: ProTip[];
  urgency_essentials: UrgencyEssentials;
  narrative_template: string;
  response_deadline_days: number;
  filing_window_days: number;
  key_differences: string | null;
}
```

- [ ] **Step 2: Commit**

```bash
git add backend/lib/playbooks/types.ts
git commit -m "feat(backend): add playbook TypeScript types (WIN-13)"
```

---

### Task 3: Visa 13.1 Playbook Data (Reference Implementation)

This is the reference implementation. All subsequent playbook data files follow this exact pattern.

**Files:**
- Create: `backend/lib/playbooks/data/visa-13.1.ts`

- [ ] **Step 1: Create the playbook data file**

Convert the content from `.taskmaster/docs/playbooks/visa-13.1.md` into the typed structure. The markdown file is the source of truth for content. Map each section to its corresponding field.

```typescript
import type { PlaybookData } from "../types";

export const visa131: PlaybookData = {
  network: "visa",
  reason_code: "13.1",
  display_name: "Merchandise / Services Not Received",
  category: "consumer",
  legacy_code: "30",
  description:
    "The cardholder claims they paid for goods or services but never received them. This could mean a physical package never arrived, a digital product was never accessible, or a service was never performed. This is one of the most common dispute types and often one of the easiest to win -- if you have delivery proof.",
  issuer_evaluation:
    "The issuer checks: (1) Was there an agreed delivery date, and was it met? (2) Is there carrier confirmation of delivery -- tracking number, delivery scan, signature? (3) Did the cardholder attempt to resolve with the merchant first (required before filing)? (4) Filing window compliance: 120 calendar days from transaction date or expected delivery date (max 540 days from transaction). (5) For late delivery: did the cardholder wait at least 10 days after expected delivery before filing? (6) If no delivery date was specified: at least 15 calendar days must pass before the cardholder can file. The issuer is primarily looking for proof of delivery to the correct address. If you have it, you win. If you don't, the evidence burden shifts heavily in the cardholder's favor.",
  acquirer_prereview:
    "Before your evidence reaches the issuing bank, it passes through your acquirer first. The acquirer reviews the package for completeness and formatting compliance with network rules. If your submission is incomplete or doesn't address the assigned reason code, it gets bounced before the issuer ever sees it. Merchants are rarely notified clearly when this happens -- the submission just fails. Your package must directly address reason code 13.1 (Merchandise/Services Not Received) -- generic transaction records won't clear pre-review. All required documents must be present. Your acquirer may impose an internal deadline shorter than Visa's 30-day window. Getting bounced at the acquirer stage is an automatic loss with no second chance.",
  evidence_checklist: [
    {
      item: "Carrier tracking confirmation with delivery scan",
      category: "mandatory",
      context: "physical_goods",
      required: true,
      why_matters:
        "This is the single most important piece of evidence. A tracking number showing 'delivered' to the correct address wins most cases.",
      urgency_essential: true,
      urgency_order: 1,
    },
    {
      item: "Delivery address verification (matches billing or shipping address on order)",
      category: "mandatory",
      context: "physical_goods",
      required: true,
      why_matters:
        "Proves you shipped to the address the customer provided.",
      urgency_essential: true,
      urgency_order: 2,
    },
    {
      item: "Signed delivery confirmation (for orders over $100)",
      category: "recommended",
      context: "physical_goods",
      required: false,
      why_matters:
        "Signature proof eliminates 'package stolen' claims. Visa gives extra weight to signed delivery.",
      urgency_essential: false,
      urgency_order: null,
    },
    {
      item: "Order confirmation showing agreed delivery date",
      category: "recommended",
      context: "physical_goods",
      required: false,
      why_matters:
        "Establishes the timeline the bank will evaluate against.",
      urgency_essential: true,
      urgency_order: 3,
    },
    {
      item: "Screenshot of order details (items, quantities, shipping method)",
      category: "recommended",
      context: "physical_goods",
      required: false,
      why_matters:
        "Shows exactly what was ordered and how it was shipped.",
      urgency_essential: false,
      urgency_order: null,
    },
    {
      item: "Communication with customer about delivery (emails, chat logs)",
      category: "recommended",
      context: "physical_goods",
      required: false,
      why_matters:
        "Shows you were responsive and proactive.",
      urgency_essential: true,
      urgency_order: 4,
    },
    {
      item: "Access logs showing customer used the product/service (IP address, login timestamps, download confirmation)",
      category: "mandatory",
      context: "digital_goods",
      required: true,
      why_matters:
        "This IS your 'delivery proof' for digital goods.",
      urgency_essential: true,
      urgency_order: 1,
    },
    {
      item: "Email delivery confirmation (license key, download link sent)",
      category: "mandatory",
      context: "digital_goods",
      required: true,
      why_matters:
        "Proves the digital good was delivered to the customer's email.",
      urgency_essential: true,
      urgency_order: 2,
    },
    {
      item: "Terms of service / delivery terms accepted at checkout",
      category: "recommended",
      context: "digital_goods",
      required: false,
      why_matters:
        "Establishes what 'delivery' means for your product.",
      urgency_essential: false,
      urgency_order: null,
    },
  ],
  common_mistakes: [
    {
      mistake: "Processing payment before shipping",
      explanation:
        "If you charge before the item ships, you have no delivery proof for the period between charge and shipment. The cardholder can file immediately.",
    },
    {
      mistake: "No tracking on low-value orders",
      explanation:
        "Merchants skip tracking to save $1-2 on shipping, then lose $50-200 disputes. Always use tracked shipping.",
    },
    {
      mistake: "Shipping to an address different from what the customer provided",
      explanation:
        "If the customer gave Address A and you shipped to Address B (even if B is 'correct'), you lose. Ship to the address on file.",
    },
    {
      mistake: "Assuming 'shipped' equals 'delivered'",
      explanation:
        "A tracking number showing 'in transit' or 'out for delivery' is NOT proof of delivery. You need the final delivery scan.",
    },
    {
      mistake: "Missing the 30-day response window",
      explanation:
        "You have 30 days to respond. Many merchants miss this deadline. Set a reminder.",
    },
    {
      mistake: "Not requiring signature on high-value orders",
      explanation:
        "For orders over $100, delivery confirmation without a signature is weak. The cardholder can claim the package was stolen.",
    },
  ],
  pro_tips: [
    { tip: "Always use tracked shipping with delivery confirmation. This single practice wins most 13.1 disputes." },
    { tip: "For orders over $100, require signature confirmation. The extra $2-3 cost is insurance against a $100+ chargeback." },
    { tip: "Save screenshots of carrier tracking pages -- carriers sometimes purge tracking data after 90-120 days, but the dispute window extends to 120+ days." },
    { tip: "For digital goods, log IP address and timestamps of first access. This is your equivalent of a delivery signature." },
    { tip: "If the customer contacts you about non-delivery, respond immediately and offer to reship or refund. A resolved complaint never becomes a chargeback." },
    { tip: "Pre-shipment: Send shipping confirmation email with tracking number. This proves the customer was informed of shipment." },
  ],
  urgency_essentials: {
    summary: "Delivery proof is what wins this case.",
    ordered_items: [
      "Carrier tracking confirmation showing delivery",
      "Delivery address matches order address",
      "Order confirmation with item details",
      "Any customer communication acknowledging receipt",
    ],
  },
  narrative_template: `The cardholder claims merchandise/services were not received. However, our records confirm delivery was completed as follows:

**Order Details:**
- Order placed: [date]
- Items ordered: [description]
- Shipping address: [address]
- Shipping method: [carrier + service level]

**Delivery Confirmation:**
- Tracking number: [number]
- Carrier: [carrier name]
- Delivery date: [date]
- Delivery status: [status from carrier]
[If signed: Signed by: [name]]

**Additional Context:**
[Any relevant customer communications, access logs for digital goods, or other supporting evidence]

Based on the carrier confirmation, the merchandise was delivered to the address provided by the cardholder on [date]. We respectfully request this dispute be resolved in our favor.`,
  response_deadline_days: 30,
  filing_window_days: 120,
  key_differences: null,
};
```

- [ ] **Step 2: Commit**

```bash
git add backend/lib/playbooks/data/visa-13.1.ts
git commit -m "feat(backend): add Visa 13.1 playbook data (WIN-13)"
```

---

### Task 4: Remaining 6 Playbook Data Files

Create one file per playbook following the exact same pattern as Task 3. Each file exports a single `PlaybookData` object. Convert content from the corresponding `.taskmaster/docs/playbooks/*.md` file.

**Files:**
- Create: `backend/lib/playbooks/data/visa-10.4.ts`
- Create: `backend/lib/playbooks/data/visa-13.2.ts`
- Create: `backend/lib/playbooks/data/visa-13.3.ts`
- Create: `backend/lib/playbooks/data/visa-13.6.ts`
- Create: `backend/lib/playbooks/data/mastercard-4808.ts`
- Create: `backend/lib/playbooks/data/mastercard-4853.ts`

- [ ] **Step 1: Create `visa-10.4.ts`**

Convert `.taskmaster/docs/playbooks/visa-10.4.md`. Key details:
- `network: "visa"`, `reason_code: "10.4"`, `category: "fraud"`, `legacy_code: "83"`
- `response_deadline_days: 30`, `filing_window_days: 120`
- CE3.0 evidence items use `context: "ce3"`
- No `key_differences`

- [ ] **Step 2: Create `visa-13.2.ts`**

Convert `.taskmaster/docs/playbooks/visa-13.2.md`. Key details:
- `network: "visa"`, `reason_code: "13.2"`, `category: "consumer"`, `legacy_code: "41"`
- `response_deadline_days: 30`, `filing_window_days: 120`
- Installment defense items use `context: "installment_defense"`
- No `key_differences`

- [ ] **Step 3: Create `visa-13.3.ts`**

Convert `.taskmaster/docs/playbooks/visa-13.3.md`. Key details:
- `network: "visa"`, `reason_code: "13.3"`, `category: "consumer"`, `legacy_code: "53"`
- `response_deadline_days: 30`, `filing_window_days: 120`
- Services evidence items use `context: "services"`
- `key_differences`: Include the Visa 13.3 vs Mastercard 4853 comparison table content (no source attribution)

- [ ] **Step 4: Create `visa-13.6.ts`**

Convert `.taskmaster/docs/playbooks/visa-13.6-credit-not-processed.md`. Key details:
- `network: "visa"`, `reason_code: "13.6"`, `category: "consumer"`, `legacy_code: null`
- `response_deadline_days: 30`, `filing_window_days: 120`
- Two evidence contexts: `"refund_issued"` and `"refund_disputed"`
- No `key_differences`

- [ ] **Step 5: Create `mastercard-4808.ts`**

Convert `.taskmaster/docs/playbooks/mastercard-4808.md`. Key details:
- `network: "mastercard"`, `reason_code: "4808"`, `category: "authorization"`, `legacy_code: null`
- `response_deadline_days: 45`, `filing_window_days: 90`
- Evidence contexts: `"amount_discrepancy"`, `"expired_auth"`, `"all"`
- Include the 10% currency conversion allowance context in `issuer_evaluation`
- No `key_differences`

- [ ] **Step 6: Create `mastercard-4853.ts`**

Convert `.taskmaster/docs/playbooks/mastercard-4853.md`. Key details:
- `network: "mastercard"`, `reason_code: "4853"`, `category: "consumer"`, `legacy_code: null`
- `response_deadline_days: 45`, `filing_window_days: 120`
- Services evidence items use `context: "services"`
- `key_differences`: Include the Visa 13.3 vs Mastercard 4853 comparison (same content as visa-13.3, from the merchant's perspective, no source attribution)

- [ ] **Step 7: Commit all 6 files**

```bash
git add backend/lib/playbooks/data/visa-10.4.ts \
        backend/lib/playbooks/data/visa-13.2.ts \
        backend/lib/playbooks/data/visa-13.3.ts \
        backend/lib/playbooks/data/visa-13.6.ts \
        backend/lib/playbooks/data/mastercard-4808.ts \
        backend/lib/playbooks/data/mastercard-4853.ts
git commit -m "feat(backend): add remaining 6 playbook data files (WIN-13)"
```

---

### Task 5: Playbook Data Index and Validation Test

**Files:**
- Create: `backend/lib/playbooks/data/index.ts`
- Create: `backend/lib/playbooks/__tests__/types.test.ts`

- [ ] **Step 1: Create the index re-export**

```typescript
import { visa104 } from "./visa-10.4";
import { visa131 } from "./visa-13.1";
import { visa132 } from "./visa-13.2";
import { visa133 } from "./visa-13.3";
import { visa136 } from "./visa-13.6";
import { mastercard4808 } from "./mastercard-4808";
import { mastercard4853 } from "./mastercard-4853";
import type { PlaybookData } from "../types";

export const ALL_PLAYBOOKS: PlaybookData[] = [
  visa104,
  visa131,
  visa132,
  visa133,
  visa136,
  mastercard4808,
  mastercard4853,
];
```

- [ ] **Step 2: Write validation test**

This test validates all playbook data objects have complete, consistent data. It catches typos, missing fields, and data quality issues before seeding.

```typescript
import { describe, it, expect } from "vitest";
import { ALL_PLAYBOOKS } from "../data";
import type { PlaybookData, EvidenceChecklistItem } from "../types";

describe("Playbook data validation", () => {
  it("should have exactly 7 playbooks", () => {
    expect(ALL_PLAYBOOKS).toHaveLength(7);
  });

  it("should have unique network + reason_code combinations", () => {
    const keys = ALL_PLAYBOOKS.map((p) => `${p.network}:${p.reason_code}`);
    expect(new Set(keys).size).toBe(keys.length);
  });

  describe.each(ALL_PLAYBOOKS.map((p) => [
    `${p.network} ${p.reason_code}`,
    p,
  ] as [string, PlaybookData]))("%s", (_label, playbook) => {
    it("should have all required text fields non-empty", () => {
      expect(playbook.display_name.length).toBeGreaterThan(0);
      expect(playbook.description.length).toBeGreaterThan(0);
      expect(playbook.issuer_evaluation.length).toBeGreaterThan(0);
      expect(playbook.acquirer_prereview.length).toBeGreaterThan(0);
      expect(playbook.narrative_template.length).toBeGreaterThan(0);
    });

    it("should have valid category", () => {
      expect(["fraud", "consumer", "authorization"]).toContain(
        playbook.category,
      );
    });

    it("should have valid network", () => {
      expect(["visa", "mastercard", "amex", "discover"]).toContain(
        playbook.network,
      );
    });

    it("should have positive deadline and filing window", () => {
      expect(playbook.response_deadline_days).toBeGreaterThan(0);
      expect(playbook.filing_window_days).toBeGreaterThan(0);
    });

    it("should have at least one evidence checklist item", () => {
      expect(playbook.evidence_checklist.length).toBeGreaterThan(0);
    });

    it("should have at least one mandatory evidence item", () => {
      const mandatory = playbook.evidence_checklist.filter(
        (e) => e.category === "mandatory",
      );
      expect(mandatory.length).toBeGreaterThan(0);
    });

    it("should have valid evidence item structure", () => {
      playbook.evidence_checklist.forEach((item: EvidenceChecklistItem) => {
        expect(item.item.length).toBeGreaterThan(0);
        expect(["mandatory", "recommended", "situational"]).toContain(
          item.category,
        );
        expect(typeof item.required).toBe("boolean");
        expect(item.why_matters.length).toBeGreaterThan(0);
        expect(typeof item.urgency_essential).toBe("boolean");
        if (item.urgency_essential) {
          expect(item.urgency_order).toBeGreaterThan(0);
        }
      });
    });

    it("should have urgency essentials with ordered items", () => {
      expect(playbook.urgency_essentials.summary.length).toBeGreaterThan(0);
      expect(
        playbook.urgency_essentials.ordered_items.length,
      ).toBeGreaterThan(0);
    });

    it("should have at least one common mistake", () => {
      expect(playbook.common_mistakes.length).toBeGreaterThan(0);
      playbook.common_mistakes.forEach((m) => {
        expect(m.mistake.length).toBeGreaterThan(0);
        expect(m.explanation.length).toBeGreaterThan(0);
      });
    });

    it("should have at least one pro tip", () => {
      expect(playbook.pro_tips.length).toBeGreaterThan(0);
      playbook.pro_tips.forEach((t) => {
        expect(t.tip.length).toBeGreaterThan(0);
      });
    });

    it("should not contain em dashes", () => {
      const allText = [
        playbook.description,
        playbook.issuer_evaluation,
        playbook.acquirer_prereview,
        playbook.narrative_template,
        ...playbook.evidence_checklist.map((e) => e.item + e.why_matters),
        ...playbook.common_mistakes.map((m) => m.mistake + m.explanation),
        ...playbook.pro_tips.map((t) => t.tip),
        playbook.urgency_essentials.summary,
        ...playbook.urgency_essentials.ordered_items,
      ].join(" ");
      expect(allText).not.toContain("\u2014");
    });

    it("should not reference Highnote", () => {
      const allText = [
        playbook.description,
        playbook.issuer_evaluation,
        playbook.acquirer_prereview,
        playbook.narrative_template,
        playbook.key_differences ?? "",
        ...playbook.evidence_checklist.map((e) => e.item + e.why_matters),
        ...playbook.common_mistakes.map((m) => m.mistake + m.explanation),
        ...playbook.pro_tips.map((t) => t.tip),
      ].join(" ");
      expect(allText.toLowerCase()).not.toContain("highnote");
    });
  });
});
```

- [ ] **Step 3: Run the tests**

Run: `cd backend && npx vitest run lib/playbooks/__tests__/types.test.ts`
Expected: All tests pass (7 playbooks x 11 checks each = 77 assertions)

- [ ] **Step 4: Commit**

```bash
git add backend/lib/playbooks/data/index.ts \
        backend/lib/playbooks/__tests__/types.test.ts
git commit -m "feat(backend): add playbook data index and validation tests (WIN-13)"
```

---

### Task 6: getPlaybook Query Function

**Files:**
- Create: `backend/lib/playbooks/index.ts`
- Create: `backend/lib/playbooks/__tests__/getPlaybook.test.ts`

- [ ] **Step 1: Write the failing test**

```typescript
import { describe, it, expect, vi, beforeEach } from "vitest";

const mockSingle = vi.fn();
const mockEq2 = vi.fn().mockReturnValue({ single: mockSingle });
const mockEq1 = vi.fn().mockReturnValue({ eq: mockEq2 });
const mockSelect = vi.fn().mockReturnValue({ eq: mockEq1 });
const mockFrom = vi.fn().mockReturnValue({ select: mockSelect });

vi.mock("@/lib/supabase", () => ({
  supabase: { from: mockFrom },
}));

import { getPlaybook } from "../index";

describe("getPlaybook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFrom.mockReturnValue({ select: mockSelect });
    mockSelect.mockReturnValue({ eq: mockEq1 });
    mockEq1.mockReturnValue({ eq: mockEq2 });
    mockEq2.mockReturnValue({ single: mockSingle });
  });

  it("should query playbooks table with network and reason_code", async () => {
    mockSingle.mockResolvedValue({ data: { id: "1", network: "visa" }, error: null });

    await getPlaybook("visa", "13.1");

    expect(mockFrom).toHaveBeenCalledWith("playbooks");
    expect(mockSelect).toHaveBeenCalledWith("*");
    expect(mockEq1).toHaveBeenCalledWith("network", "visa");
    expect(mockEq2).toHaveBeenCalledWith("reason_code", "13.1");
  });

  it("should return the playbook data on success", async () => {
    const playbook = { id: "1", network: "visa", reason_code: "13.1", display_name: "Not Received" };
    mockSingle.mockResolvedValue({ data: playbook, error: null });

    const result = await getPlaybook("visa", "13.1");
    expect(result).toEqual(playbook);
  });

  it("should return null when playbook not found", async () => {
    mockSingle.mockResolvedValue({ data: null, error: { code: "PGRST116" } });

    const result = await getPlaybook("visa", "99.9");
    expect(result).toBeNull();
  });

  it("should throw on unexpected database errors", async () => {
    mockSingle.mockResolvedValue({ data: null, error: { code: "42P01", message: "table not found" } });

    await expect(getPlaybook("visa", "13.1")).rejects.toThrow("table not found");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd backend && npx vitest run lib/playbooks/__tests__/getPlaybook.test.ts`
Expected: FAIL - `getPlaybook` not found

- [ ] **Step 3: Write the implementation**

```typescript
import { supabase } from "@/lib/supabase";

export async function getPlaybook(
  network: string,
  reasonCode: string,
): Promise<Record<string, unknown> | null> {
  const { data, error } = await supabase
    .from("playbooks")
    .select("*")
    .eq("network", network)
    .eq("reason_code", reasonCode)
    .single();

  if (error) {
    // PGRST116 = row not found from .single()
    if (error.code === "PGRST116") {
      return null;
    }
    throw new Error(error.message);
  }

  return data;
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd backend && npx vitest run lib/playbooks/__tests__/getPlaybook.test.ts`
Expected: All 4 tests pass

- [ ] **Step 5: Commit**

```bash
git add backend/lib/playbooks/index.ts \
        backend/lib/playbooks/__tests__/getPlaybook.test.ts
git commit -m "feat(backend): add getPlaybook query function (WIN-13)"
```

---

### Task 7: Seed Script

**Files:**
- Create: `backend/supabase/seed-playbooks.ts`

- [ ] **Step 1: Write the seed script**

```typescript
import { createClient } from "@supabase/supabase-js";
import { ALL_PLAYBOOKS } from "../lib/playbooks/data";

async function seed() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
    process.exit(1);
  }

  const supabase = createClient(url, key);

  console.log(`Seeding ${ALL_PLAYBOOKS.length} playbooks...`);

  for (const playbook of ALL_PLAYBOOKS) {
    const row = {
      network: playbook.network,
      reason_code: playbook.reason_code,
      display_name: playbook.display_name,
      category: playbook.category,
      legacy_code: playbook.legacy_code,
      description: playbook.description,
      issuer_evaluation: playbook.issuer_evaluation,
      acquirer_prereview: playbook.acquirer_prereview,
      evidence_checklist: playbook.evidence_checklist,
      common_mistakes: playbook.common_mistakes,
      pro_tips: playbook.pro_tips,
      urgency_essentials: playbook.urgency_essentials,
      narrative_template: playbook.narrative_template,
      response_deadline_days: playbook.response_deadline_days,
      filing_window_days: playbook.filing_window_days,
      key_differences: playbook.key_differences,
    };

    const { error } = await supabase
      .from("playbooks")
      .upsert(row, { onConflict: "network,reason_code" });

    if (error) {
      console.error(
        `Failed to seed ${playbook.network} ${playbook.reason_code}:`,
        error.message,
      );
      process.exit(1);
    }

    console.log(`  Seeded: ${playbook.network} ${playbook.reason_code} -- ${playbook.display_name}`);
  }

  console.log("Done. All playbooks seeded successfully.");
}

seed();
```

- [ ] **Step 2: Add a convenience script to package.json**

Add to `backend/package.json` scripts:

```json
"seed:playbooks": "tsx supabase/seed-playbooks.ts"
```

- [ ] **Step 3: Install tsx as a dev dependency (if not present)**

Run: `cd backend && npm install --save-dev tsx`

- [ ] **Step 4: Run the seed script**

Run: `cd backend && npm run seed:playbooks`
Expected: All 7 playbooks seeded successfully, no errors.

- [ ] **Step 5: Verify in Supabase**

Run this SQL in the Supabase dashboard:

```sql
SELECT network, reason_code, display_name, category, response_deadline_days
FROM playbooks
ORDER BY network, reason_code;
```

Expected: 7 rows with correct data.

- [ ] **Step 6: Run seed script again to verify idempotency**

Run: `cd backend && npm run seed:playbooks`
Expected: Same output, no errors, no duplicates. Running the query above still shows exactly 7 rows.

- [ ] **Step 7: Commit**

```bash
git add backend/supabase/seed-playbooks.ts backend/package.json
git commit -m "feat(backend): add idempotent playbook seed script (WIN-13)"
```

---

### Task 8: API Route

**Files:**
- Create: `backend/app/api/playbooks/route.ts`
- Create: `backend/app/api/playbooks/__tests__/route.test.ts`

- [ ] **Step 1: Write the failing test**

```typescript
import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

const mockGetPlaybook = vi.fn();

vi.mock("@/lib/playbooks", () => ({
  getPlaybook: mockGetPlaybook,
}));

vi.mock("@/lib/stripe-auth", () => ({
  withStripeAuth: (handler: Function) => async (req: NextRequest) => {
    return handler(req, {
      identity: { userId: "usr_test", accountId: "acct_test" },
      body: await req.clone().json(),
    });
  },
}));

vi.mock("@/lib/merchants", () => ({
  ensureMerchant: vi.fn(),
}));

// Dynamic import after mocks
const { POST } = await import("../route");

describe("POST /api/playbooks", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  function makeRequest(body: Record<string, unknown>) {
    return new NextRequest("http://localhost:3000/api/playbooks", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Stripe-Signature": "test" },
      body: JSON.stringify({ user_id: "usr_test", account_id: "acct_test", ...body }),
    });
  }

  it("should return playbook for valid network and reason_code", async () => {
    const playbook = { network: "visa", reason_code: "13.1", display_name: "Not Received" };
    mockGetPlaybook.mockResolvedValue(playbook);

    const res = await POST(makeRequest({ network: "visa", reason_code: "13.1" }));
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.data).toEqual(playbook);
    expect(mockGetPlaybook).toHaveBeenCalledWith("visa", "13.1");
  });

  it("should return 404 when playbook not found", async () => {
    mockGetPlaybook.mockResolvedValue(null);

    const res = await POST(makeRequest({ network: "visa", reason_code: "99.9" }));
    const json = await res.json();

    expect(res.status).toBe(404);
    expect(json.error).toBe("Playbook not found");
  });

  it("should return 400 when network is missing", async () => {
    const res = await POST(makeRequest({ reason_code: "13.1" }));
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.error).toBe("Missing network or reason_code");
  });

  it("should return 400 when reason_code is missing", async () => {
    const res = await POST(makeRequest({ network: "visa" }));
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.error).toBe("Missing network or reason_code");
  });

  it("should return 500 on database error", async () => {
    mockGetPlaybook.mockRejectedValue(new Error("db down"));

    const res = await POST(makeRequest({ network: "visa", reason_code: "13.1" }));
    const json = await res.json();

    expect(res.status).toBe(500);
    expect(json.code).toBe("internal_error");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd backend && npx vitest run app/api/playbooks/__tests__/route.test.ts`
Expected: FAIL - module not found

- [ ] **Step 3: Write the API route**

```typescript
import { NextResponse } from "next/server";
import { withStripeAuth } from "@/lib/stripe-auth";
import { getPlaybook } from "@/lib/playbooks";
import { ensureMerchant } from "@/lib/merchants";

export const POST = withStripeAuth(async (_request, { identity, body }) => {
  const { accountId, userId } = identity;
  const { network, reason_code } = body as { network?: string; reason_code?: string };

  if (!network || !reason_code) {
    return NextResponse.json(
      { error: "Missing network or reason_code", code: "invalid_request" },
      { status: 400 },
    );
  }

  ensureMerchant(accountId, userId);

  try {
    const playbook = await getPlaybook(network, reason_code);

    if (!playbook) {
      return NextResponse.json(
        { error: "Playbook not found", code: "not_found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ data: playbook });
  } catch (err) {
    console.error("Error fetching playbook:", err);
    return NextResponse.json(
      { error: "Internal server error", code: "internal_error" },
      { status: 500 },
    );
  }
});
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd backend && npx vitest run app/api/playbooks/__tests__/route.test.ts`
Expected: All 5 tests pass

- [ ] **Step 5: Run all tests to check for regressions**

Run: `cd backend && npx vitest run`
Expected: All tests pass (existing + new)

- [ ] **Step 6: Commit**

```bash
git add backend/app/api/playbooks/route.ts \
        backend/app/api/playbooks/__tests__/route.test.ts
git commit -m "feat(backend): add POST /api/playbooks API route (WIN-13)"
```

---

### Task 9: Final Verification and Cleanup

- [ ] **Step 1: Run the full test suite**

Run: `cd backend && npx vitest run`
Expected: All tests pass

- [ ] **Step 2: Verify the API route works end-to-end**

If the dev server is running, test with curl (this will fail without a valid Stripe signature, but confirms the route is wired up):

```bash
curl -s -X POST http://localhost:3000/api/playbooks \
  -H "Content-Type: application/json" \
  -d '{"network":"visa","reason_code":"13.1","user_id":"test","account_id":"test"}' | python3 -m json.tool
```

Expected: 401 (no valid Stripe signature) -- confirms the route exists and auth middleware is active.

- [ ] **Step 3: Verify playbook count in Supabase**

```sql
SELECT COUNT(*) FROM playbooks;
-- Expected: 7

SELECT network, reason_code, display_name,
       jsonb_array_length(evidence_checklist) as evidence_items,
       jsonb_array_length(common_mistakes) as mistakes,
       jsonb_array_length(pro_tips) as tips
FROM playbooks
ORDER BY network, reason_code;
```

- [ ] **Step 4: Final commit with any cleanup**

```bash
git add -A
git commit -m "chore(backend): WIN-13 cleanup and verification"
```

- [ ] **Step 5: Update Linear issue status**

Mark WIN-13 as Done in Linear.
