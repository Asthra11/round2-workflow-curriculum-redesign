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
## Task 2 - 2030 CSE Curriculum Redesign

**Objective:** Propose a future-ready CSE curriculum aligned with Full-Stack Software Engineering and AI/ML career pathways.

### Deliverables

- `Task2-Curriculum-Redesign/curriculum-baseline.md` - curriculum baseline and scope
- `Task2-Curriculum-Redesign/course-credit-audit.csv` - course and credit audit
- `Task2-Curriculum-Redesign/job-description-comparison.md` - comparison of three employer postings
- `Task2-Curriculum-Redesign/curriculum-redesign-proposal.md` - proposed curriculum changes and five AI exercises
- `Task2-Curriculum-Redesign/course-change-register.md` - existing courses, proposed changes, and credit treatment
- `Task2-Curriculum-Redesign/batch-specific-credit-notes.md` - batch-specific evidence and credit verification notes

### Evidence and limitations

The course-credit audit uses the available programme screenshots and student-provided ERP information. Semester VII contains five registered courses totalling 16 credits. Semester VIII is described as internship-only, with 15 credits used as a provisional estimate pending official verification.

The final degree-credit requirement and the final percentage of credits formally redesigned remain unverified. No unsupported final percentage is claimed.

### Career pathways

- Full-Stack Software Engineer
- AI/ML Engineer

The proposal emphasises practical software development, testing, deployment, machine learning evaluation, responsible AI, and an integrated capstone project.
