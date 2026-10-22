# Task 1 Report — Proposed Placement Support Query Workflow

**Draft version:** 0.2  
**Prepared:** 21 October 2026  
**Status:** Hypothetical walkthrough and local prototype; not an audit of internal college operations.

## 1. Executive summary
This project proposes a lightweight way to capture and track student placement-support queries. The goal is to make query status, responsibility, missing information, and escalation visible. No internal placement-cell access was obtained, so this report does not claim to document the college's actual internal workflow. Public information, assumptions, synthetic prototype tests, and their limitations are kept separate.

## 2. Scope and evidence boundary
**In scope:** hypothetical student query about eligibility or application-status guidance; proposed intake, validation, assignment, review, response, closure and escalation; local prototype; synthetic tests; illustrative effort model.

**Out of scope:** internal records; staff interviews; claims about actual staff procedures or response times; official eligibility decisions; integration with the student portal; real student data.

Public context source: https://www.ifheindia.org/icfai-tech-school-hyderabad/icfaitech-placements. The public page is contextual evidence that placement support is an institutional topic, not proof of the internal query-handling process. Re-open the page and record the actual access date before final submission.

## 3. Current-state map — explicitly hypothetical
The current internal process is **unknown**. This scenario is used to explore the problem, not presented as an observed map.

1. A student has a question about eligibility, a deadline, or an application.
2. The student looks for an official announcement or suitable contact channel.
3. If the answer is unclear, the student submits or asks a query.
4. A responsible role would need to understand the question and check approved information.
5. If information is missing, the student is asked to clarify.
6. The answer is shared; if unresolved, the query is routed to an authorised role.
7. The query is marked complete, with a record of the resolution or answer.

Unknowns include the real intake channel, number of handoffs, queue volume, ownership, average handling time, rework rate, response-time target, escalation policy, and whether any query tracker exists.

## 4. Proposed future-state workflow
1. **Intake:** topic, query details, generated reference, date, and approved response channel.
2. **Validation:** required fields and basic format checks; incomplete submissions receive a clear message.
3. **Duplicate check:** show possible matches for human review; do not automatically discard ambiguous cases.
4. **Assignment:** assign to a responsible role with a due date.
5. **Human review:** authorised staff use official notices/policies; the tool does not infer or decide eligibility.
6. **Status:** New → In review → Waiting for student → Resolved; Escalated is available when a decision or dependency is outside the first role's authority.
7. **Response and closure:** record a resolution summary and source reference; allow reopening if unresolved.
8. **Failure fallback:** if the tool is unavailable, use an institution-approved alternate channel and reconcile the record later. The actual fallback must be approved before production use.

### Required fields
- Generated query reference (not a student ID)
- Topic and short description
- Date/time submitted
- Status and assigned role
- Priority with a documented rule
- Missing information / next action
- Resolution summary and source reference
- Status-change audit events
- Retention/deletion date according to an approved policy

### Approval boundary
The prototype can validate fields, flag exact-text duplicates, and track status. It cannot decide eligibility, promise placement, change official application status, or send official decisions. Only an authorised person may confirm policy-based answers or close escalated decisions.

## 5. Ordinary software vs AI
Ordinary software is sufficient for required-field validation, duplicate matching, status tracking, role assignment, deadlines, and audit events. These rules are deterministic and easier to test.

AI could optionally draft a plain-language summary or classify a query topic, but only after an authorised person reviews it. AI must not determine eligibility, invent policy, expose personal data, or send an unreviewed decision. The initial prototype deliberately uses no AI.

## 6. Synthetic test results
Manual tests were performed against the local prototype on 21 October 2026. These results apply only to the demo.

| Test | Scenario | Observed result | Status |
|---|---|---|---|
| T1 | Normal query with required fields | A synthetic query was created; count increased from 2 to 3 and the form reset. | Passed |
| T2 | Missing required information | Browser blocked submission while Details was empty; count did not increase during the observed attempt. | Passed |
| T3 | Duplicate query | App displayed “Possible duplicate of PS-1005. No new request was created”; total remained 5. | Passed |
| T4 | Escalated query directly set to Resolved | User confirmed the app blocked the direct transition and displayed an explanatory error. | Passed (user-confirmed; screenshot not retained) |
| T5 | Simulated unavailable support role | “Support unavailable test” was created and assigned to Technical support. A later screenshot showed one escalated query overall but did not show the test query identity and Escalated status together. | Partially verified |

T5 is not marked fully passed because available evidence does not prove that the “Support unavailable test” record was the escalated one.

### Limitations discovered
- Required fields use browser-native validation.
- Duplicate detection compares exact topic and details; it does not catch paraphrased duplicates.
- Activity log is in-memory, not tamper-proof, and resets on reload.
- No authentication or production role-based access controls.
- Local demo only; no messages, backend, or college integration.

## 7. Effort model — illustrative, not measured campus data
These values are assumptions used to demonstrate the calculation method, not measurements of the college.

### Illustrative inputs
- Query volume: 40 queries/month (assumption)
- Current manual effort: 12 minutes/query (assumption)
- Proposed handling before review: 6 minutes/query (assumption)
- Human review/support overhead: 3 minutes/query (assumption)
- Monthly maintenance/support: 60 minutes/month (assumption)
- One-time setup effort: 600 minutes (assumption)

### Calculations
- Current effort = 40 × 12 = **480 minutes/month**.
- Proposed recurring effort = 40 × (6 + 3) + 60 = **420 minutes/month**.
- Illustrative recurring net saving = 480 − 420 = **60 minutes/month** after setup.
- First-month total including setup = 420 + 600 = **1,020 minutes**, so first-month net saving = 480 − 1,020 = **−540 minutes**.
- Break-even = 600 / 60 = **10 months**, if all assumptions remain constant.

| Scenario | Volume | Current min/query | Proposed min/query incl. review | Support/month | Current/month | Proposed/month | Net/month |
|---|---:|---:|---:|---:|---:|---:|---:|
| Low benefit | 20 | 8 | 7 | 60 | 160 | 200 | −40 |
| Illustrative base | 40 | 12 | 9 | 60 | 480 | 420 | 60 |
| Higher benefit | 60 | 15 | 8 | 90 | 900 | 570 | 330 |

All values are assumptions. Savings could be zero or negative if volume is lower, review overhead higher, or the current process is already efficient.

## 8. Risks and mitigations
- Incorrect eligibility answer: require human review against official notice and include source/date.
- Privacy leakage: synthetic data for demo; minimise fields; use access control and approved retention in production.
- Duplicate false positives: flag for human review; never auto-delete.
- Unauthorised status change: implement role-based access in production and maintain reliable audit logs.
- Tool outage: approved alternate channel and later reconciliation.
- Unowned queue: accountable role, due date and overdue reporting.
- Overstated benefits: measure a permitted sample before claiming savings.
- Accessibility/exclusion: provide an approved alternative for students unable to use the digital form.

## 9. What could change the design?
If an authorised future observation showed that queries are already handled through a reliable tracker with clear ownership and low rework, the best intervention might be clearer guidance or an FAQ—not a new tracker. If unclear announcements cause most queries, improving announcements may deliver more value than intake software.

## 10. Limitations and conclusion
No internal process was observed; no staff were interviewed; no internal records were accessed. The workflow is hypothetical, the calculations illustrative, and T5 is partially verified. The prototype demonstrates a possible low-complexity design with human approval boundaries. Before deployment, the institution would need to approve ownership, privacy, security, accessibility, retention, and escalation rules.
