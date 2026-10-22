# Placement Support Query Tracker (Prototype)

**Round 2 · Task 1 · Evidence package v2**  
**Evidence status:** Proposed workflow / hypothetical walkthrough. No direct observation of internal placement-cell operations is claimed.

## Run locally
Requirements: Node.js and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. Build with `npm run build`.

## Demo features
- Required-field checks
- Exact-text duplicate detection
- Query queue and status filter
- Status update demo and escalation guardrail
- In-memory activity log
- Synthetic starter records and reset button

## Testing
Manual test outcomes are in `tests/test-results.md`: T1–T3 passed, T4 user-confirmed, T5 partially verified. Do not upgrade T5 without evidence linking the Escalated status to the exact “Support unavailable test” record.

## Safety and limitations
- Use fictional data only; never enter real student names, IDs, marks, fees, credentials, or private messages.
- This is a local-only demo. State resets on reload.
- Duplicate detection is exact-text matching.
- No authentication, production access control, backend, official eligibility verification, email/SMS, or college integration.
- It does not establish how the actual college handles placement queries.
- Production use requires authorised ownership, privacy/security review, access controls, retention policy, reliable server-side audit logging and accessibility testing.

## Files
- `Task1_Report.md`: report, workflow, estimates, risks and limitations
- `evidence-log.md`: public context, assumptions and observed prototype evidence
- `tests/test-results.md`: manual test log
- `src/`: React prototype source
