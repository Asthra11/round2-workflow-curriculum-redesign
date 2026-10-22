# Task 1 — Evidence and assumption log

**Scope:** Proposed placement-support query workflow. This is a hypothetical walkthrough, not a direct audit of the college's internal placement-cell process.  
**Prepared:** 21 October 2026  
**Access:** No internal access obtained; no staff contacted and no internal records accessed.

| ID | Category | Statement | Basis | Limitation |
|---|---|---|---|---|
| E1 | Public context | ICFAI Tech public placements page provides placement-related context. | https://www.ifheindia.org/icfai-tech-school-hyderabad/icfaitech-placements | Does not prove internal query-handling steps; record actual page access date before submission. |
| E2 | Personal experience | Student has received placement-related announcements/instructions through college communication channels. | User's own experience; include only if the student can substantiate it. | Does not reveal internal staff workflow. |
| A1 | Assumption | Students may ask about eligibility, deadlines, application status or documents. | Design assumption. | Not measured. |
| A2 | Assumption | Queries could be captured, assigned, reviewed, answered and closed/escalated. | Proposed generic workflow. | Not a claim about actual college practice. |
| H1 | Hypothetical step | Student submits a fictional eligibility question. | Scenario created for this assignment. | Synthetic. |
| S1 | Synthetic tests | Normal, missing-field, duplicate, escalation-boundary and unavailable-role scenarios were exercised in the local prototype. | `tests/test-results.md` | T5 partially verified. |
| M1 | Estimate | Query volume and handling times in the report. | Illustrative scenario. | Not campus measurements. |

## Prototype execution evidence (21 October 2026)
- T1: screenshot showed count increasing to 3 and a new synthetic query.
- T2: Details field was left empty; submission was blocked and count stayed at 3.
- T3: duplicate warning named PS-1005; no new request was created and count stayed at 5.
- T4: user confirmed direct Escalated-to-Resolved transition was blocked; error screenshot not retained.
- T5: “Support unavailable test” was created and assigned to Technical support. A later screenshot showed one escalated query, but available evidence does not link that status to the specific test query.

## Privacy boundary
No real student names, IDs, marks, fees, signatures, credentials, private messages, or identifiable case details were used in the prototype.
