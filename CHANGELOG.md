# Changelog

All notable changes to WinBack will be documented in this file.

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
