# Bug Tracking Guide

This document describes the process for finding, reporting, and fixing issues in this project.

---

## 1. Bug Tracking & Automated Testing

**Automated Test Coverage:**  
1. **Add Task:** Verify a new task appears in the DOM after submitting the form.  
2. **Edit Task:** If implemented, simulate editing and check that the task text updates.  
3. **Toggle Complete:** Simulate toggling the checkbox and confirm the completed state and style/class change.  
4. **Delete Task:** Simulate deleting a task and confirm it is removed from state and UI.  
5. **Filtering:** Simulate filter selection and verify only matching tasks are shown.  
6. **Persistence:** Mock or simulate `localStorage` and confirm tasks persist across reloads.

## 2. Bug Scenarios & Fix Strategies

- *Empty Task Added:* Prevent adding tasks with empty input. (Fix: Validate input before saving.)  
- *Duplicate IDs:* Each task must have a unique ID. (Fix: Use a UUID. Test for no duplicate IDs.)  
- *State Not Updating:* Sometimes the task list doesn’t update after an action. (Fix: Always create and return a new updated list instead of mutating the old one. Test immutability.)  
- *localStorage Errors:* App may crash if saved data is invalid. (Fix: Wrap `localStorage` read in try/catch. Test with invalid or missing data.)  
- *UI Not Updating:* Task changes may not display correctly (e.g., strikethrough on completed). (Fix: Apply correct classes or text. Test expected elements and styles appear.)

## 3. Bug Tracking Process

- Log bugs as issues (e.g., in Jira) with reproduction steps, expected vs. actual results, and test case if applicable.  
- Prioritize bugs by severity (Critical, Medium, Low).  
- Create automated regression tests for fixed bugs to prevent them from coming back.

---

_This guide should be updated as the project workflow evolves._