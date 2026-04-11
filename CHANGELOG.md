# Changelog

All notable changes to WinBack will be documented in this file.

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
