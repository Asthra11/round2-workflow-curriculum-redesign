# Synthetic acceptance test log

**Execution date:** 21 October 2026  
**Environment:** Local React/Vite prototype in Chrome on Windows.  
**Scope:** Synthetic records only; not the college's internal system.

| ID | Scenario | Actual observed outcome | Status | Evidence note |
|---|---|---|---|---|
| T1 | Normal query | Synthetic query created; count increased from 2 to 3; form reset. | Passed | User screenshot, 21 Oct 2026. |
| T2 | Missing details | Browser blocked submission while Details was empty; count stayed at 3 during observed attempt. | Passed | User screenshot and description. |
| T3 | Duplicate topic/details | Warning “Possible duplicate of PS-1005. No new request was created”; count remained 5. | Passed | User screenshot, 21 Oct 2026. |
| T4 | Escalated -> Resolved | User confirmed direct transition was blocked and explanatory error displayed. | Passed (user-confirmed) | Error screenshot not retained. |
| T5 | Unavailable support role | Query created and assigned to Technical support; one escalated query shown later, but evidence does not connect the status to that exact record. | Partially verified | Do not claim full pass. |

## Prototype limitations
- Required fields use native HTML validation.
- Duplicate detection requires exact matching of topic and details.
- Status/activity records are in page memory.
- No authentication, production authorization, backend, message delivery, or college integration.

## Optional follow-up for T5
Only if convenient, select “Support unavailable test” and capture a single screenshot showing its selected-query title and `Escalated` status together. Do not invent this evidence.
