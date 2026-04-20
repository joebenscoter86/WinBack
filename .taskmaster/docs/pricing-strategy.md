# WinBack Pricing Strategy

> Finalized April 2026 | Based on competitive analysis, NotebookLM deep research (73+ sources), and unit economics modeling

## Pricing Model: Hybrid (Usage-Based Entry + Subscription Upgrade)

### Tier 1: Pay-Per-Win (Acquisition Funnel)

| | |
|---|---|
| **Price** | 15% of recovered amount |
| **Monthly fee** | $0 |
| **When charged** | Only on successful dispute wins |
| **Target** | New merchants, low-volume, first-timers |

- Zero-friction entry point. Merchant pays nothing until they win.
- Undercuts Stripe Smart Disputes (30%) by half.
- Matches CertNode (15%) while delivering superior playbook-driven evidence quality.
- This is the acquisition funnel -- merchants prove value to themselves before upgrading.

### Tier 2: Pro Subscription (Core Revenue)

| | |
|---|---|
| **Price** | $79/month |
| **Annual option** | $59/month billed annually ($708/year) |
| **Success fee** | $0 (unlimited disputes) |
| **Target** | Merchants with recurring disputes (2+/month) |

- Breakeven vs. 15% tier: ~1.1 wins/month at $500 avg, ~1.8 wins/month at $300 avg
- Any merchant with regular chargebacks saves money on Pro
- Signals professional-grade tooling, not a commodity widget
- Still undercuts every competitor at volume (Chargeflow 25%, Stripe 30%)

### Future Consideration: Volume Tier

| | |
|---|---|
| **Price** | $149/month |
| **Target** | High-volume merchants (5+ disputes/month) |
| **Extras** | Priority support, bulk evidence tools |

Not launching with this. Revisit when merchant usage data shows demand.

---

## Competitive Positioning

| Competitor | Model | Price | WinBack Advantage |
|---|---|---|---|
| Stripe Smart Disputes | % of recovery | 30% | Half the price (15%), better evidence quality |
| Chargeflow | % of recovery | 25% | 40% cheaper, merchant stays in control |
| CertNode Reflex | % of recovery | 15% | Same price, superior playbook-driven evidence |
| Disputifier | % + per-order | 20% + $0.05/order | Simpler pricing, no per-order tax |
| DisputeNinja | Sub + per-case | $499/mo+ | Fraction of the cost for SMBs |

**One-liner:** "We charge half what Stripe charges. Or $79 flat and keep everything."

---

## Unit Economics

### Revenue Per Win (Usage Tier)

| Avg Dispute Value | Revenue Per Win |
|---|---|
| $150 | $22.50 |
| $300 | $45.00 |
| $500 | $75.00 |
| $1,000 | $150.00 |

### $10K MRR Model (Blended)

Assumes 55% win rate, 30% of usage merchants active in a given month, 30% upgrade to Pro over time.

| Avg Dispute Value | Total Merchants Needed | Pro Subscribers | Usage Merchants | Gross MRR |
|---|---|---|---|---|
| $300 | ~350 | ~105 @ $79 = $8,295 | ~245 (74 active, 41 wins) = $1,845 | ~$10,140 |
| $500 | ~250 | ~75 @ $79 = $5,925 | ~175 (53 active, 29 wins) = $2,175 | ~$8,100* |

*Adjust to ~300 merchants for clean $10K at $500 avg.

### Stripe Billing Fees

- Processing: 2.9% + $0.30 per transaction
- Stripe Billing: 0.7% of billing volume
- Effective total: ~4.6%
- No marketplace revenue share (Stripe App Marketplace has no built-in billing)

---

## Upgrade Mechanics

### Trigger Point
Immediately after first successful dispute win.

### Upgrade Prompt
> "You just saved $[amount]. At $79/month, you'd keep all of it next time."

### Why Merchants Upgrade
- Breakeven math is obvious after 1-2 wins
- Subscription removes per-win anxiety ("am I giving up too much?")
- Flat fee reframes WinBack as a business tool, not a tax on winnings
- Annual discount ($59/mo) locks in retention

### Who Stays on Usage
- Merchants with rare disputes (1-2/year) -- this is fine, they're still revenue
- Price-sensitive merchants testing the product
- Seasonal businesses with dispute clusters

---

## Key Decisions and Rationale

**Why 15%, not 20%:**
"Half of Stripe" is a one-liner that sells itself. 20% sits in no-man's land -- not the cheapest, not differentiated. 15% matches CertNode while WinBack's playbook quality is the differentiator.

**Why $79, not $29:**
$29 was leaving 60-70% of available value on the table. At $29, merchants upgrade after a single small win and cap their LTV at $348/year. At $79, the upgrade still makes sense for anyone with recurring disputes, but each subscriber generates $948/year -- reaching revenue milestones with half the user base. $79 signals expert tooling; $29 signals commodity.

**Why not flat per-dispute ($10/chargeback):**
Massively underprices high-value disputes. A $10 fee on a $2,000 recovery is absurd unit economics. Percentage-based pricing aligns cost with value, and merchants actually prefer "pay only if you win" psychology over flat per-event fees for rare events.

**Why hybrid, not usage-only:**
Subscription revenue is predictable and bankable. Usage revenue fluctuates monthly. The subscription tier is the MRR engine (~60% of revenue at scale); usage is the growth funnel (~40%). Maximizing upgrade conversion is the key lever for the business.

---

## Implementation Notes

- Stripe Billing supports both flat-rate subscriptions and usage-based pricing natively
- Cannot open Stripe Checkout inside the Stripe Dashboard iframe -- redirect to external page or use Stripe Apps SDK components
- Account ID linking between app install and billing customer must be built manually
- Free trial consideration: offer first dispute free (or first 2 at 15%) before any billing kicks in
