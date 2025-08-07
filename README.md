# React To-Do Application

A simple, modern To-Do app built with React. Manage your daily tasks, track progress, and stay organized—all in your browser with localStorage. No backend required.

---

## Features

- Add, edit, and delete tasks (title + optional description)
- Mark tasks as complete or incomplete
- Inline editing for tasks
- Filter tasks by all, active, or completed
- Data persistence using browser localStorage (with safe error handling)
- Responsive, accessible, and clean user interface
- Automated tests for all main user flows and edge cases
- Error handling for empty input, duplicate IDs, and localStorage issues

---

## Technologies Used

- **React** (Functional Components & Hooks)
- **localStorage** for data persistence
- **Jest** & **React Testing Library** for testing
- **CSS Modules** or **styled-components** for styling
- (Optional) **Mermaid** for diagrams in documentation

---

## Installation

1. **Clone the repository:**

   ```bash
   git clone <your-repo-url>
   cd <project-directory>
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm start
   ```

   The app will be accessible at [http://localhost:3000](http://localhost:3000).

---

## Usage Guide

- **Add a Task:** Enter a task title and (optionally) a description, then press Enter or click **Add**.
- **Edit a Task:** Click the edit icon next to a task, modify the fields, and save changes inline.
- **Delete a Task:** Click the delete icon next to a task to remove it.
- **Toggle Complete:** Use the checkbox to mark a task as complete or incomplete.
- **Filter Tasks:** Use the filter buttons (**All**, **Active**, **Completed**) to view tasks by status.
- **Persistence:** Tasks are saved automatically in localStorage and remain after page reloads.
- **Error Handling:** The app prevents empty tasks, ensures unique IDs, and handles localStorage errors gracefully.

---

## Testing

- Run all tests:
  ```bash
  npm test
  ```
- Run with coverage:
  ```bash
  npm run test:coverage
  ```
- Tests cover add, edit, delete, filter, persistence, and error scenarios.

---

## Contribution Guidelines

- Use React functional components and hooks.
- Write modular, clean, and maintainable code.
- Reference documentation in the `docs/` folder for architecture, UI/UX, and testing details.
- Open issues or submit pull requests for bugs, enhancements, or new features.
- Ensure new features are covered by automated tests.

---

## Configuration

- No additional configuration required.
- The app works out-of-the-box after running `npm install`.
- All task data is stored in browser localStorage—no backend server needed.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Contact

- **Project Maintainer:** Amit Agarwala — (amitagarwala303@gmail.com)
- For questions or support, please open an issue in this repository.

---

*Happy tasking!*