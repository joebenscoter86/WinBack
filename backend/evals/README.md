# Prompt Eval Suite (WIN-34)

Automated quality checks for AI-generated dispute narratives. Catches prompt
regressions before they ship.

## What it checks

For each reason code fixture, the runner generates a narrative and scores it
against seven criteria:

| Criterion             | Fails when                                                              |
|-----------------------|-------------------------------------------------------------------------|
| `no_hallucination`    | `validateHallucinations` strips any referenced evidence key             |
| `evidence_grounding`  | A `"snake_case"` key in the narrative isn't in uploaded files or auto-pull fields |
| `no_fabricated_facts` | An ISO date, dollar amount, or tracking-shaped token isn't in the input |
| `section_coverage`    | Fewer than 2 P1 template sections appear as bolded headers              |
| `annotations_valid`   | Annotations empty, or an annotation's `section` has no matching header  |
| `conciseness`         | Narrative is outside 150-1500 words                                     |
| `tone`                | Narrative contains a banned phrase (e.g. "valued customer")             |

## Running

```bash
# from backend/
set -a && source .env.local && set +a    # loads ANTHROPIC_API_KEY
npm run eval:prompts                     # scored against baseline
npm run eval:prompts -- --only=visa      # filter by fixture id substring
npm run eval:prompts -- --update-baselines   # rewrite baseline snapshots
npm run eval:prompts -- --mock           # fake Claude response (CI-safe, free)
```

A run costs ~$0.20 at Sonnet 4.6 pricing and takes 90-150 seconds. The `--mock`
mode uses a deterministic canned response, exercising the harness without
calling the API — that mode is what runs in `backend-ci.yml` on every PR.

## How regressions are detected

Each fixture's score is written to `baselines/<fixture-id>.json` as a
pass/fail map per criterion. On the next run:

- A **regression** = a criterion that passed in the baseline but fails now.
  Regressions fail the run (exit 1).
- A **pre-existing failure** = a criterion that was already failing in the
  baseline. Visible in output, does **not** fail the run. The baseline is the
  quality floor; crossing it downward is what we gate on.
- `--update-baselines` suppresses the regression gate (we're rewriting the
  floor, not testing against it).

## When to run this

- Before landing any PR that modifies `backend/lib/prompts/**` or
  `backend/lib/narratives/**`.
- When tuning the system prompt or any template.
- When upgrading the Claude model.

Re-snapshot baselines (`--update-baselines`) whenever you intentionally
improve output quality — check the new baselines into git so the next
regression gate starts from the higher floor.

## Known limitations

- **LLM non-determinism.** Run-to-run variance on things like section
  wording can flip a criterion across runs without any code change.
  Treat single-run regressions as signals, not verdicts.
- **Evidence grounding runs light.** The current prompt produces prose
  narratives that rarely use the `"snake_case"` key syntax, so this check
  often reports "0 keys grounded." This is informational — the check still
  catches fabricated keys if the prompt ever emits them.
- **Mock vs live drift.** The mock narrative is hand-crafted to pass every
  criterion; it cannot catch prompt-output regressions, only harness breakage.

## Adding or editing a fixture

1. Drop a new file in `fixtures/<reason-code>.ts` exporting a `Fixture`.
2. Add it to the `fixtures` array in `fixtures/index.ts`.
3. Run `npm run eval:prompts -- --update-baselines` to snapshot.
4. Commit the fixture and its new baseline together.

Evidence keys in `evidence_files` must match keys declared in the matching
prompt template (`backend/lib/prompts/templates/<network>-<reason>.ts`).
