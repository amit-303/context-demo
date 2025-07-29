todo-app/
├── package.json / package-lock.json        # Project dependencies and scripts
├── README.md                              # Project overview and usage
├── .gitignore                            # Git ignored files
├── .cursor/
│   └── rules/
│       ├── generate.mdc                  # Generation and documentation guidelines
│       └── workflow.mdc                  # Workflow and formatting rules
├── node_modules/                         # Installed dependencies (auto-generated)
├── public/                               # Static assets and HTML template
├── src/
│   ├── App.js                           # Main app component, state management, localStorage logic
│   ├── TodoList.js                      # Renders a list of tasks (maps to TodoItem)
│   ├── TodoItem.js                      # Displays a single task (checkbox, text, delete)
│   ├── index.js                         # App entry point, renders <App />
│   ├── index.css                        # Global styles
│   ├── App.css                          # App/component-specific styles
│   ├── App.test.js                      # Basic test for <App />
│   ├── setupTests.js                    # Test setup (Jest, React Testing Library)
│   ├── reportWebVitals.js               # Web Vitals reporting (optional)
│   └── logo.svg                         # React logo (default asset)
├── docs/
│   ├── PRD.md                          # Product requirements
│   ├── implementation.md               # Technical/component design
│   ├── ui_ux.md                       # UI/UX guidelines
│   ├── bug_tracking.md                 # Bug tracking and test scenarios
│   └── project_structure.md            # Project folder/file overview