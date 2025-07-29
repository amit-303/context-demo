# UI/UX Design for React To-Do App

## 1. Layout Overview

- **Header:** App title and (optionally) task count.
- **Main Section:**
  - **Task Input:** Field(s) to add a new task (title, optional description, optional due date/priority).
  - **Task List:**
    - **Active Tasks:** List of incomplete tasks.
    - **Completed Tasks:** Collapsible section for completed tasks.
- **Footer:** (Optional) App info, credits, or links.

---

## 2. Components

### 2.1. Header
- App name/logo (e.g., "To-Do List").
- Remaining tasks count (e.g., "3 tasks left").
- Simple, bold typography.

### 2.2. Task Input
- **Input field** for task title (required).
- **Textarea** for description (optional).
- **Date picker** for due date (optional/advanced).
- **Dropdown** for priority (optional/advanced).
- **Add button** (primary action, visually prominent).
- Responsive: Inputs stack vertically on mobile, horizontally on desktop.

### 2.3. Task List
- **Task Item**:
  - Checkbox to mark complete/incomplete.
  - Task title (bold, clear).
  - Description (smaller, lighter text).
  - Due date/priority badges (if enabled).
  - Edit and Delete icons (show on hover or always visible on mobile).
- **Active Tasks Section:**
  - List of incomplete tasks.
  - Empty state: "No tasks yet! Add your first task."
- **Completed Tasks Section:**
  - Collapsible/expandable.
  - List of completed tasks (dimmed or strikethrough style).
  - Option to clear all completed tasks (optional).

### 2.4. Search & Filter (Optional)
- Search bar above task list.
- Filter dropdowns (by status, priority, due date).

### 2.5. Bulk Actions (Optional)
- Checkbox to select multiple tasks.
- Bulk complete/delete buttons.

---

## 3. Styling Notes & Visual Consistency

- **Color Palette:**
  - Light background (white or very light gray).
  - Primary color for buttons and highlights (e.g., blue or green).
  - Subtle accent color for completed tasks, badges, and hover states.
  - Use neutral grays for borders, text, and backgrounds.
- **Typography:**
  - Clean, sans-serif font (e.g., Inter, Roboto, or system font).
  - Task titles: medium/bold weight.
  - Consistent font sizes across headings and body
- **Spacing:**
  - Padding/margin for touch targets and readability.
  - Consistent spacing (8px or 16px grid).
- **Buttons & Inputs:**
  - Rounded corners (4-8px radius).
  - Clear focus/active states for accessibility.
  - Primary button stands out; secondary actions are more subtle.
- **Task Items:**
  - Hover effect (slight background change or shadow).
  - Completed tasks: strikethrough or faded text.
  - Edit/Delete icons: subtle, but visible on hover.
- **Responsiveness:**
  - Mobile: Stack elements vertically, full-width inputs/buttons.
  - Desktop: Use cards or panels, align items horizontally where space allows.
- **Accessibility:**
  - Sufficient color contrast.
  - Keyboard navigable.
  - ARIA labels for interactive elements.

---

**UX Notes:**  
- Input validation: prevent empty tasks. Show a warning if user tries to add an empty task.  
- Real-time updates: when a task is added/deleted/toggled, the list updates immediately.  
- Clear feedback: after adding or deleting a task, no page reload; the change appears instantly.  
- Accessibility: use semantic HTML (e.g. `<button>`, `<input>`) and labels for screen readers.  
