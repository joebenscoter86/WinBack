# WinBack Playbook Library

Reason-code-specific dispute response playbooks. Each playbook is the authoritative source for evidence checklists, issuer evaluation logic, common mistakes, and narrative templates for that dispute type.

---

## Playbook Index

### Visa

| File | Reason Code | Display Name | Category |
|------|-------------|--------------|----------|
| [visa-10.4.md](visa-10.4.md) | 10.4 | Fraud -- Card Not Present | Fraud |
| [visa-13.1.md](visa-13.1.md) | 13.1 | Merchandise / Services Not Received | Consumer |
| [visa-13.2.md](visa-13.2.md) | 13.2 | Cancelled Recurring Transaction | Consumer |
| [visa-13.3.md](visa-13.3.md) | 13.3 | Not as Described or Defective Merchandise/Services | Consumer |
| [visa-13.6-credit-not-processed.md](visa-13.6-credit-not-processed.md) | 13.6 | Credit Not Processed | Consumer |

### Mastercard

| File | Reason Code | Display Name | Category |
|------|-------------|--------------|----------|
| [mastercard-4808.md](mastercard-4808.md) | 4808 | Authorization-Related Dispute | Authorization |
| [mastercard-4853.md](mastercard-4853.md) | 4853 | Cardholder Dispute -- Not as Described / Defective | Consumer |

---

## Playbook Structure

Each playbook follows this schema:

1. **Metadata** -- network, reason code, category
2. **Description** -- plain-English explanation of what the dispute means
3. **Issuer Evaluation** -- what the bank is actually checking, including the precise target for the representment argument
4. **Acquirer Pre-Review** -- universal section on the acquirer gate that filters submissions before the issuer sees them (a common, silent failure point)
5. **Evidence Checklist** -- mandatory, recommended, and situational evidence items
6. **Common Mistakes** -- failure patterns with explanations
7. **Pro Tips** -- insider guidance drawn from issuer-side experience
8. **Urgency Essentials** -- what to prioritize when the deadline is under 5 days
9. **Narrative Template** -- reusable template structure for AI-generated representment letters

---

## Research Sources

The following research documents informed these playbooks and should be consulted when adding new reason codes or updating existing ones:

- [`../Highnote-Dispute-Representment-Investigation.md`](../Highnote-Dispute-Representment-Investigation.md) -- Issuer-side perspective from Highnote's disputes team. Key insights: acquirer pre-review gate, precise issuer logic on consumer disputes, Mastercard 4808 specifics (10% currency conversion allowance), money movement cycle.
- [`../disputes-api-research.md`](../disputes-api-research.md) -- Stripe Disputes API constraints and integration notes
- [`../prd.md`](../prd.md) -- Product requirements (playbook schema, evidence types, AI narrative requirements)

---

## Adding New Playbooks

When adding a reason code:
1. Use the existing playbooks as the template
2. Include the Acquirer Pre-Review section verbatim (with the specific reason code inserted)
3. Write the Issuer Evaluation section from the **issuer's decision logic**, not just a list of what evidence to submit
4. Add a row to the index table above
5. Cross-reference the relevant source document in the Sources section at the bottom of the new playbook
