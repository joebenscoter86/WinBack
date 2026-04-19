# Changelog

All notable changes to WinBack will be documented in this file.

## [0.0.1.5] - 2026-04-18

### Added
- Newly arrived disputes now surface a "New" badge on the dispute list card and a "(N new)" count on the Disputes tab label. The badge clears the first time the merchant opens the dispute in WinBack, so the list always tells the merchant at a glance what needs their attention next. Historical disputes from before this release are treated as already viewed and do not badge. (WIN-26)

## [0.0.1.4] - 2026-04-14

### Added
- Merchants can now contribute their own assertions for narrative-only checklist items (e.g. device fingerprint matches, billing period assertions, refund refusal explanations). Each T-category item shows an inline notes textarea pre-expanded by default, with an explicit Save button so typed content is committed even before navigating away. (WIN-49)
- Per-playbook canned merchant assertions ("narrative_fallback") for all 11 narrative-only checklist items across 5 playbooks (visa-10.4, visa-13.2, visa-13.3, visa-13.6, mastercard-4808, mastercard-4853). When a merchant leaves a notes textarea blank, the AI uses the reason-code-specific canned assertion instead of a generic boilerplate. When the merchant types something, the AI uses their words verbatim. (WIN-49)
- New `NARRATIVE-ONLY ASSERTIONS` block in the AI prompt that walks the playbook's T items, prefers merchant notes when present, and falls back to the canned assertion otherwise. (WIN-49)
- Dev-only `scripts/retarget-test-dispute.ts` helper that rewrites a test dispute's network and reason_code in Supabase so a single real Stripe fraud dispute can be reused for QA across all 5 non-fraud playbooks. Stripe only exposes test tokens for a few dispute reasons, making per-playbook QA otherwise impossible without manual dashboard creation for each one.
- `--reason` flag on `scripts/create-test-dispute.ts` plus documentation of which Stripe test tokens map to which dispute reasons.

### Fixed
- Checklist checkbox state and notes have never persisted across sessions. The PATCH route on `/api/disputes/[disputeId]` was calling `request.clone().text()` after the `withStripeAuth` middleware had already consumed the body stream, throwing `TypeError: unusable` and returning 401. Every PATCH from the day WIN-14 shipped silently failed. The route now uses the body parsed by the middleware via the second handler argument, matching the pattern every other route already uses. (WIN-49)
- The pre-generation evidence summary on the Narrative tab counted T (narrative-only) items as "Not uploaded", which was category-wrong because T items can never have a file. T items are now correctly counted as covered, with a distinct status label of "Notes added" (when the merchant typed something) or "In narrative" (when relying on the per-playbook fallback). (WIN-49)
- The `EvidenceChecklist` component used to unmount on every tab switch (`{currentStep === 'evidence' && ...}` gate), wiping pending notes and checklist state. The component is now kept mounted across tabs so state survives. (WIN-49)
- The dispute GET route now hydrates `checklist_state` and `checklist_notes` from Supabase on load. Previously it only returned `narrative_text` and `evidence_submitted_at`, so even when a save did succeed the next session would show empty checklists. (WIN-49)
- Notes are now saved on every keystroke (no debounce) so racy "type and click Generate immediately" flows can never miss a save. (WIN-49)
- Backend CORS middleware now allows `PATCH` in addition to `GET, POST, OPTIONS`. (WIN-49)

## [0.0.1.3] - 2026-04-13

### Fixed
- Expired disputes (past their response deadline) are now read-only on the dashboard and inside the wizard. Opening an expired dispute shows a critical banner explaining that the deadline has passed, and evidence uploads, narrative generation, and submission are all disabled. The backend rejects write attempts with a 409 before burning an AI generation credit or accepting an upload. (WIN-48)
- Expired disputes no longer show a contradictory "Needs Response" status badge on the dashboard card. Only the red "Expired" badge is displayed. (WIN-48)
- Expired disputes are now sorted to the bottom of the dispute list instead of jumping to the top as the "most overdue" items. (WIN-48)
- Dashboard filter now defaults to "Needs response" on load, and includes a new "Expired" filter option. Expired disputes are excluded from the "Needs response" filter even though Stripe still reports them as needs_response. (WIN-48)

## [0.0.1.2] - 2026-04-12

### Fixed
- Evidence file uploads no longer create placeholder dispute rows with empty reason_code and zero amount when a dispute hasn't been loaded yet. The upload route now returns a clear 409 `dispute_not_loaded` error so the client can fetch the dispute from Stripe first, keeping the database as the source of truth for dispute metadata. (WIN-41)

## [0.0.1.1] - 2026-04-10

### Added
- "Where to find this" guidance for all 62 evidence checklist items across 6 playbooks (visa-13.1, visa-13.2, visa-13.3, visa-13.6, mastercard-4853, mastercard-4808)
- 7 new evidence items from NotebookLM research validation: access/activity logs for digital goods (visa-10.4), billing period and customer email (visa-13.2), refund refusal explanation (visa-13.3, mastercard-4853), cancellation policy disclosure (visa-13.6), Stripe uncategorized field mapping (mastercard-4808)

## [0.0.1.0] - 2026-04-10

### Added
- Persistent deadline countdown timer visible on all dispute workflow tabs (Review, Evidence, Narrative, Submit)
- Hours-level precision in deadline display (e.g., "14d 6h remaining")
- Color-coded urgency badges: green (14+ days), yellow (5-13 days), red (< 5 days)
- "Respond now" label when deadline is urgent (< 5 days)
- Expired deadline detection with "Deadline passed" display

### Changed
- Consolidated deadline display to single persistent timer above tabs (removed duplicate from DisputeOverview)
- Urgency badge in dispute list now shows hours when under 5 days (e.g., "3d 11h left")
- Removed UrgencyBanner from Review tab (replaced by persistent timer)
