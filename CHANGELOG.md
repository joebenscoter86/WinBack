# Changelog

All notable changes to WinBack will be documented in this file.

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
