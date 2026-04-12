# WIN-43: End-to-end integration test for the dispute wizard flow

**Linear:** [WIN-43](https://linear.app/jkbtech/issue/WIN-43/add-end-to-end-integration-test-for-the-full-dispute-wizard-flow)
**Created:** 2026-04-12
**Status:** Design approved, ready for implementation plan

## Context

WIN-19 QA on 2026-04-11 surfaced five latent integration bugs that every unit test missed:

1. `ensureMerchant` wrote columns that didn't exist; merchants table silently empty in dev for weeks
2. Narrative generate route raced its own `ensureMerchant` upsert against the dependent SELECT
3. `GET /api/disputes/[id]` was a Stripe proxy and never wrote a row, so narrative generation failed for fresh disputes
4. `DisputeWorkflow.evidenceFiles` was fetched once on mount; evidence uploads never propagated to the narrative tab
5. `generate-background` caught errors but stripped the raw message, hiding root causes like "missing ANTHROPIC_API_KEY"

All five are sequencing / cross-route bugs. Each route's unit test (with mocked Supabase) passed. A single test that walks the full wizard against a real database would have caught four of the five immediately.

The next ticket on the critical path is **WIN-20 (Stripe Disputes API evidence submission)**. Submission is the single most dangerous code path in the product — `submit: true` on Stripe's Disputes API is irrevocable — and it extends the wizard chain by one more step. Shipping WIN-20 without an integration test means hoping manual QA catches every regression in a flow that keeps growing.

This spec defines a minimum-viable integration test that runs locally and is meant to be run before every backend PR. CI wiring is deferred to a follow-up (WIN-46).

## Goals

- Catch the class of bug surfaced by WIN-19 QA: sequencing, cross-route state dependencies, merchant-scoping drift, silent data-integrity regressions
- Run in a few seconds locally, reliably, with zero internet or API costs
- Leave zero residue in dev Supabase — no collision with hand-testing or other dev work
- Serve as a regression harness that future tickets (WIN-20 first, WIN-21 submission webhook, etc.) can extend
- Document the expected wizard sequence as executable code, not prose

## Non-goals

- CI integration (deferred to WIN-46)
- Real Stripe API behavior coverage (manual QA against Docket sandbox fills this role)
- Claude prompt quality evaluation (WIN-34's job)
- Real auth signature verification (the `withStripeAuth` middleware is covered by its own unit tests)
- Load / performance testing
- Parallel-safe execution (single-user local tool; parallelism matters only if this is wired into CI later)

## Architecture

### Location and run command

```
backend/
  __tests__/
    integration/
      dispute-wizard-flow.test.ts    # the test
      fixtures.ts                    # canned data
      mocks.ts                       # shared vi.mock setups
```

New directory at the backend package root, not colocated with source. Integration tests have different setup needs than unit tests and benefit from living apart.

New npm script in `backend/package.json`:

```json
"test:integration": "vitest run __tests__/integration"
```

The default `npm test` continues to run only unit tests. `npm run test:integration` is an explicit opt-in that developers run manually before opening a backend PR.

A `vitest.integration.config.ts` may be necessary if the existing config excludes the `__tests__/integration` directory or loads a global test setup that interferes. If the existing config already picks up the new directory cleanly, no separate config is needed.

### Mocks

Four targeted module mocks via `vi.mock()`. All mocks are set up in `__tests__/integration/mocks.ts` and imported at the top of the test file so the test body stays focused on the wizard flow.

**1. `@/lib/stripe`** — mock `getDispute`, `normalizeDispute`, `uploadFileToStripe` (and any other Stripe-touching helpers the routes use). All return canned fixture data. No real Stripe calls.

**2. `@anthropic-ai/sdk`** — mock `messages.create` to return a canned narrative response in the shape `NarrativeOutput` expects. The mock also **captures the call arguments** into a test-scoped variable (`capturedAnthropicCalls`) so the test can later inspect what system/user prompt actually got built. This is what makes the WIN-44 trip-wire possible.

**3. `@/lib/stripe-auth`** — mock `withStripeAuth` to bypass signature verification and inject a canned identity (`{ accountId: 'acct_WIN43_TEST', userId: 'usr_WIN43_TEST' }`). Mock `fetchStripeSignature` as a no-op if it's called directly anywhere.

**4. `next/server`** — replace `after()` with `async (promise) => { await promise; }`. The narrative generate route uses `after(runBackgroundGeneration(...))` to fire-and-forget the Claude call, which is a problem in tests because Vitest finishes the test before the background job runs. Replacing `after` to await inline makes the background work part of the request lifecycle for test purposes. This is the single most critical mock; without it the test cannot observe completed narrative generations.

### Database isolation

The test writes to **real dev Supabase** (project `ssnwzgxvugraswghqsvo`), but only under a fake merchant scope that nothing else in dev uses:

- Fake Stripe account ID: `acct_WIN43_TEST`
- Fake user ID: `usr_WIN43_TEST`
- Fake Stripe dispute ID: `du_WIN43_TEST`
- Fake Stripe charge ID: `ch_WIN43_TEST`

Setup and teardown both run:

```sql
DELETE FROM merchants WHERE stripe_account_id = 'acct_WIN43_TEST';
```

All child rows (disputes, evidence_files, narrative_generations) cascade via existing foreign key constraints. If any FK is configured `ON DELETE RESTRICT` instead of `CASCADE`, the implementation plan surfaces that and either (a) adds explicit child deletes, or (b) alters the constraint — whichever is cleaner.

Running the test multiple times in a row is idempotent: setup cleans any leftover state, test runs, teardown cleans again. A crashed test run still gets cleaned on the next invocation because setup always runs first.

The real dev merchant (`acct_1TCiPdEQYvM3XwRz`), all real dev disputes, and all hand-tested data are never touched.

### Fixtures

`fixtures.ts` exports typed constants:

- **`TEST_ACCOUNT_ID`** — `'acct_WIN43_TEST'`
- **`TEST_USER_ID`** — `'usr_WIN43_TEST'`
- **`TEST_DISPUTE_ID`** — `'du_WIN43_TEST'`
- **`TEST_CHARGE_ID`** — `'ch_WIN43_TEST'`
- **`CANNED_STRIPE_DISPUTE`** — a full `Stripe.Dispute` object typed against the Stripe SDK, including `charge` (expanded), `payment_method_details.card.checks` (AVS pass, CVC pass), `charge.outcome`, `charge.payment_method_details.card.three_d_secure` (authenticated), and a realistic reason code of `fraudulent` mapped to Visa 10.4. **This fixture is intentionally WIN-44-ready**: it carries all the Stripe transaction data that WIN-44 will later need to flow into the prompt.
- **`CANNED_NARRATIVE_RESPONSE`** — the Anthropic `messages.create` return shape, containing a parseable JSON narrative in the text block
- **`CANNED_EVIDENCE_FILE_UPLOAD`** — a minimal multipart upload payload for the evidence-files POST route

### Test flow

Single `describe` block with a single `it` that walks the wizard in order. Each step both hits the route AND asserts on DB state. No step is optional.

```
setup:  delete everything under TEST_ACCOUNT_ID

step 1: POST /api/disputes/du_WIN43_TEST
        → assert HTTP 200 with normalized dispute data
        → assert merchants row exists for TEST_ACCOUNT_ID
        → assert disputes row exists with amount != 0 and reason_code == '10.4'
        → assert disputes row has merchant_id matching the merchants row (NOT null)

step 2: GET /api/playbooks/visa/10.4
        → assert HTTP 200 with the visa-10.4 playbook shape
        (no DB write, pure read)

step 3: GET /api/disputes/du_WIN43_TEST/evidence-files
        → assert HTTP 200 with empty array

step 4: POST /api/disputes/du_WIN43_TEST/evidence-files (upload fixture file)
        → assert HTTP 200 with file record
        → assert evidence_files row exists with:
            - dispute_id matching step 1's dispute
            - merchant_id NOT null (the WIN-19 regression check)
            - file_name matching fixture
            - stripe_file_id populated

step 5: PATCH /api/disputes/du_WIN43_TEST with checklist toggle
        → assert HTTP 200
        → assert disputes.checklist_state reflects the toggle

step 6: POST /api/narratives/generate
        → assert HTTP 202 with generation_id
        → because after() is mocked to await inline, background generation
          completes before the response returns
        → assert narrative_generations row exists with status='completed'
        → assert narrative_generations.narrative_output contains the canned narrative text
        → assert disputes.narrative_text equals the canned narrative text
        → assert disputes.narrative_generations_count == 1

step 7: POST /api/narratives/{gen_id}/status
        → assert HTTP 200 with status='completed' and narrative text matching step 6

step 8: inspect captured Anthropic calls
        → assert messages.create was called exactly once
        → assert the user prompt references the evidence file uploaded in step 4
          (looks for the file's checklist_item_key in the prompt text)

step 9: it.todo('WIN-44: assert captured prompt contains AVS/CVC/3DS/authorization data')
        → deliberately encoded as a TODO until WIN-44 lands
        → when WIN-44 is fixed, this flips from todo to a real assertion that checks
          capturedAnthropicCalls[0].user contains 'AVS address check: pass' (or equivalent)
          and similar for CVC and 3D Secure
        → serves as both a trip-wire and a checklist item for WIN-44 acceptance

teardown: delete everything under TEST_ACCOUNT_ID
```

### Calling Next.js route handlers in tests

Vitest can import the route handlers directly — they're just exported `POST`/`GET`/`PATCH` functions wrapped by `withStripeAuth`. The test constructs a `NextRequest` with the right method, path, headers, and body, calls the handler, and inspects the `NextResponse`. Existing unit tests (e.g. `backend/app/api/narratives/__tests__/generate.test.ts`) already use this pattern.

No spinning up a real Next.js server. No HTTP client. The test is as close to a function call as possible.

## Components

### `mocks.ts`

Exports a single function `setupIntegrationMocks()` that:
- Registers all four `vi.mock()` declarations
- Initializes `capturedAnthropicCalls: Array<{ system: string; user: string }>` (exported for test inspection)
- Returns a `cleanup()` function that resets captured state between tests (not strictly needed for a single-test suite but useful if the file grows)

### `fixtures.ts`

Pure exports. No logic. Every value typed against the real source-of-truth type (Stripe SDK types, Anthropic SDK types, our `NarrativeOutput` type).

### `dispute-wizard-flow.test.ts`

Imports mocks and fixtures. Exports nothing. Single `describe` + single `it`. Vitest `beforeAll` runs setup, `afterAll` runs teardown. Each step is a sequential block with descriptive comments so a future reader can follow the flow by eye.

### Helper: `getTestSupabase()`

A thin wrapper in the test file (or a shared util) that returns the same Supabase client the routes use — we don't need a separate test client. Teardown queries run through it.

## Data flow

```
┌─────────────────────────────────────────────────────────────┐
│  Integration Test (backend/__tests__/integration/)          │
│                                                             │
│  1. Setup: DELETE FROM merchants WHERE ... (cascade)        │
│  2. For each wizard step:                                   │
│     ├─ Call route handler directly                          │
│     ├─ Assert HTTP response                                 │
│     └─ Query dev Supabase to assert DB state                │
│  3. Inspect capturedAnthropicCalls (prompt content)         │
│  4. Teardown: DELETE FROM merchants WHERE ... (cascade)     │
└─────────────────────────────────────────────────────────────┘
       │                              │
       │ (real writes under fake      │ (mocked — no network)
       │  test merchant scope)        │
       ▼                              ▼
┌──────────────────────┐    ┌──────────────────────────────┐
│  Dev Supabase        │    │  Mocked:                     │
│  ssnwzgxvugraswghqsvo│    │   - @/lib/stripe             │
│                      │    │   - @anthropic-ai/sdk        │
│  (real writes,       │    │   - @/lib/stripe-auth        │
│   scoped to          │    │   - next/server (after())    │
│   acct_WIN43_TEST)   │    │                              │
└──────────────────────┘    └──────────────────────────────┘
```

## Error handling

The test is allowed to be simple and crash-loud. No retry logic, no soft failures. Any route returning non-2xx, any DB assertion failing, any missing fixture — the test fails with a clear stack.

Teardown runs in `afterAll` regardless of test success or failure, so a mid-test crash still cleans up.

If setup fails (e.g., dev Supabase unreachable), the test fails fast with a message pointing at `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` in `.env.local` — the same env the rest of the backend uses.

## Testing the test

Before calling WIN-43 done:

1. Run `npm run test:integration` on clean main. It should pass.
2. Intentionally revert the WIN-19 fix in `DisputeWorkflow.tsx` — no, that's frontend and doesn't affect this test. Instead, intentionally revert one of the backend fixes from the WIN-19 PR (e.g., comment out the `await` on `ensureMerchant` in the narrative generate route). Rerun. Test should fail at the narrative generate step.
3. Restore the fix. Rerun. Test should pass again.
4. Delete and recreate the fake merchant fresh between runs to confirm idempotence.
5. Commit everything, open PR for WIN-43.

This validates the test actually catches the bug class it claims to catch.

## Known limitations and follow-ups

- **No CI.** Intentional. WIN-46 will wire this into GitHub Actions once the test has been exercised locally for a few backend PRs.
- **Single dispute reason code.** The test covers Visa 10.4 only. Expanding to all five MVP reason codes would be valuable but each adds fixture weight and maintenance cost. A follow-up ticket can extend coverage once the test proves its value. Alternatively, the single-reason-code version is sufficient because the bug class we're catching (sequencing, merchant scoping) is orthogonal to reason code.
- **Mocked Stripe and Anthropic.** This test will never catch bugs in our real Stripe or Claude usage. Those are covered by manual QA against Docket sandbox (Stripe) and WIN-34 prompt evals (Claude).
- **WIN-44 step 9 is a `todo`.** Will fail visibly as `todo` output until WIN-44 lands. Acceptance criterion for WIN-44 includes flipping this to a real assertion.

## Acceptance criteria

- [ ] New file `backend/__tests__/integration/dispute-wizard-flow.test.ts` exists
- [ ] New files `fixtures.ts` and `mocks.ts` in the same directory
- [ ] New npm script `test:integration` in `backend/package.json`
- [ ] Running `npm run test:integration` on clean main passes in < 10 seconds
- [ ] All nine steps of the wizard flow are exercised
- [ ] Every step includes both HTTP assertion and DB state assertion
- [ ] The test is idempotent — running it back-to-back with no reset works
- [ ] Teardown runs on test failure (verified by intentionally failing a step)
- [ ] Step 9 (WIN-44 trip-wire) is present as `it.todo(...)` with a comment pointing at WIN-44
- [ ] WIN-46 ticket is filed referencing this spec
- [ ] This spec is committed to git alongside the implementation

## Open questions

None. All design decisions resolved during brainstorming.
