# Cypress Masterclass Notes

## 1. What is Cypress?
- A modern test automation tool for browser-based web applications.
- Built using JavaScript; works with JS or TypeScript.
- Does not rely on Selenium; runs directly in the browser context, ensuring faster execution.
- Open-source and free for automation framework creation.
- Basic workflow: setup → write test → run test → debug.

## 2. Cypress Features
- **Time Travel**: Snapshots every step for easy review in Test Runner.
- **Debuggability**: Identifies exact error lines and screenshots.
- **Automatic Waits**: Commands include built-in waits, customizable if required.
- **Consistent Results**: Runs inside the browser for stable outputs.
- **Reporting**: Generates screenshots and video recordings.
- Supports **E2E**, **Integration**, and **Unit** testing.
- Enables cross-browser and CI/CD integrations.

## 3. Supported Browsers
- Supports Chrome, Edge, Firefox, Electron, Brave, and other Chromium-based browsers.
- Cypress app automatically detects installed supported browsers for selection.

## 4. Prerequisites
- **OS:** Windows 7+ (64-bit), macOS 10.9+, or Linux (Ubuntu 12.04+, Fedora 21+, Debian 8+).
- **Node.js:** v10 or v12+ (npm included).
- **Hardware:** Min 4GB RAM (8GB+ for long runs), 2 CPUs (additional CPU needed if video recording).

## 5. Integrated Development Environments (IDEs)
- IDEs manage and execute projects with features like IntelliSense and code completion.
- Common IDEs: VS Code, IntelliJ, Eclipse.
- Masterclass uses **VS Code**.
- VS Code interface:
  - Activity Bar (Explorer, Search, Source Control)
  - Top Menu
  - Editors (file workspace)
  - Status Bar (bottom).

## 6. Installation and Project Setup
- **Create Folder:** Make a new project folder in VS Code.
- **Initialize Node Project:**  
  `npm init -y` → creates `package.json`.
- **Install Cypress:**  
  `npm install cypress` → adds Cypress dependency to project.
- **Verify Setup:**  
  `npx cypress verify` → ensures installation correctness.
- **Open Cypress App:**  
  `npx cypress open` → creates Cypress project structure (`cypress.config.js`, `cypress/` folder).
- Select E2E testing mode and a browser to launch the Test Runner.

## 7. Creating the First Test
- Test files: placed in `cypress/e2e/` (e.g., `test1.cy.js`).
- Framework: Uses **Mocha** as the test runner.
- Syntax:
  - `describe()` → groups tests.
  - `it()` → defines an individual test.
  - `cy` → main Cypress object for browser commands.
- Common commands:
  - `cy.visit("url")` → opens specified URL.
- Tests auto-rerun on file save due to file watch mode.

## 8. Configuration
- Global configs in `cypress.config.js`.
- E2E test-specific settings under `e2e` section.
- **watchForFileChanges:** true by default; can disable if needed.
- **Timeouts:**
  - Global default: 4000 ms.
  - Override via `defaultCommandTimeout` in config.
  - Command-level timeouts take priority.

## 9. Element Locators and Interaction
- **Selector Playground:** Helps identify unique selectors for use with `cy.get()`.
- **Selectors:**
  - `.` for class
  - `#` for ID
- **Core commands:**
  - `cy.get("locator")` → find element.
  - `cy.contains("text")` → locate by visible text.
  - `.type("text")` → input text or simulate keys (e.g., `{enter}`).
  - `.click()` → perform click.
  - `cy.wait(ms)` → delay for specified time.

## 10. Cypress Test Runner (App)
- Displays test status: Passed, Failed, Skipped.
- Shows test duration and viewport details.
- **Command Log:** Lists all executed steps.
- **App Preview:** Displays live application during test.
- Steps in Command Log show snapshots (Time Travel feature).
- Browser selection available for test execution.
