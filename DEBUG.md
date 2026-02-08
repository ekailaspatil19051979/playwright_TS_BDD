# Automation Project Lifecycle & Debugging Guide (DEBUG.md)

This document outlines the end-to-end lifecycle of an enterprise automation project, from initial setup to the rigorous process of failure analysis and maintenance. It serves as a standard operating procedure for the team and an interview-ready guide for QA engineers.

---

## 1. Project Creation Phase: Empty to Ready-to-Run
The journey starts with a deliberate architecture choice based on the application's complexity.

1.  **Technology Stack Selection**: Choose the core engine (Playwright/Selenium), Language (TypeScript/Java), and BDD wrapper (Cucumber). 
2.  **Repository Setup**: Initialize the Git repository, configure `.gitignore` (to exclude `node_modules`, `.env`, and `reports`), and define branch protection rules.
3.  **Dependency Management**: Use package managers (`npm`, `maven`, `pip`) to install core libraries, linters, and reporting plugins.
4.  **Folder Structure**: Create a modular hierarchy:
    *   `features/` (Requirements)
    *   `pages/` (POM)
    *   `steps/` (Glue code)
    *   `utils/` (Helpers)
    *   `configs/` (Environments)
5.  **Environment Setup**: Define local, Dev, and QA configurations via `.env` or properties files. Setup Docker containers to ensure "it works on every machine."

---

## 2. Test Development Phase
Automating a new feature is a structured process:

*   **Requirement Analysis**: Read the User Story and identify the "Happy Path" and "Edge Cases."
*   **Feature Writing**: Draft Gherkin scenarios in `.feature` files.
*   **POM Creation**: Create or update Page Object classes. Identify unique, resilient locators (getByRole, getByTestId).
*   **Step Implementation**: Write the TypeScript/Java code that maps Gherkin steps to POM actions.
*   **Data Preparation**: Use Factories (e.g., Faker.js) for dynamic data and JSON/Excel for static data-driven testing.

---

## 3. Execution Flow
Execution is the heart of a "Live" framework:

1.  **Local Run**: Developers run specific tags (`@smoke`) during development.
2.  **CI/CD Trigger**: Code push to `main` triggers a Jenkins or Azure DevOps pipeline.
3.  **Build Phase**: The CI agent installs dependencies and compiles code.
4.  **Parallel Execution**: Tests are distributed across multiple workers or Docker containers to reduce execution time.
5.  **Report Storage**: Results are archived as build artifacts.

---

## 4. Handling Application Changes
When the UI evolves, automation must stay in sync:

*   **Impact Analysis**: Run a subset of tests to identify which locators or flows are broken by the new UI.
*   **Locator Updating**: Update Page Objects using the "Locator Refactor" standard (e.g., migrating from CSS to Role-based).
*   **Scenario Expansion**: Add new Gherkin steps for the new functionality.

---

## 5. Failure Handling Flow
When a test fails, the framework enters "Investigation Mode":

1.  **Detection**: The runner marks the test as `FAILED`.
2.  **Artifact Capture**: Automatically capture screenshots, record videos, and extract console logs at the exact moment of failure.
3.  **Tracing**: Generate a "Trace File" (in Playwright) providing a frame-by-frame snapshot of the DOM and Network requests.
4.  **Reporting**: Failure details are instantly reflected in the Allure/HTML dashboard.

---

## 6. Failure Analysis Process
We follow a 4-Category Root Cause Analysis (RCA):

*   **Type A: Script Issue**: Brittle locator, missing wait condition, or bug in the automation code.
*   **Type B: Application Issue**: A genuine bug in the product.
*   **Type C: Data Issue**: Expired credentials, duplicate user records, or unavailable test data.
*   **Type D: Environment Issue**: Server down, slow network, or CI agent resource exhaustion.

---

## 7. Fix Implementation
1.  **Sandbox Validation**: Reproduce the failure locally in "Headed" mode.
2.  **Code Correction**: Apply the fix (e.g., adding a `waitFor()` or updating a test data factory).
3.  **Local Verification**: Run the exact failing scenario 3 times to ensure stability.
4.  **Peer Review**: Submit a Pull Request (PR) for code review.

---

## 8. Re-Execution Process
*   **Selective Re-Run**: Use tags (e.g., `--tags "@failed"`) to run only the corrected tests.
*   **Regression Suite**: Run the full suite in a pre-production environment to ensure the "Fix" didn't break anything else.
*   **CI Re-Trigger**: The pipeline is re-triggered on the PR branch to validate the fix in the containerized environment.

---

## 9. Reporting After Fixes
*   **Pass Rate Metrics**: Total tests vs. Passed vs. Defect Rate.
*   **Trend Analysis**: Are we failing on the same module repeatedly?
*   **Communication**: Final status is piped to Slack/Teams or updated in a Test Management tool (TestRail/Xray).

---

## 10. Continuous Improvement Cycle
A framework is never "finished":
*   **Optimization**: Identify and remove "Flaky" tests.
*   **Refactoring**: Standardize locators across old pages.
*   **Stability**: Improve error handling and retry mechanisms.
*   **Performance**: Optimize the number of workers to prevent memory bottlenecks.

---

## 11. Real-World Flow Example: Guest Booking
1.  **New Feature**: "Guest Checkout" added to the website.
2.  **Development**: Feature file and `GuestPage` object created.
3.  **Failure**: Test fails because the "Submit" button moved inside a shadowed DOM.
4.  **Analysis**: RCA shows a **Type A (Script Issue)**—the old CSS selector cannot see into the Shadow Root.
5.  **Fix**: Update locator to `page.getByRole('button', { name: 'Purchase' })`.
6.  **Rerun**: Test passes locally and in the Jenkins pipeline.

---

## 12. Best Practices
*   **Logging**: Never use `console.log`. Use structured loggers (Winston/Log4j) with timestamps and severity levels.
*   **Wait Strategy**: Never use `sleep()`. Always wait for element state (visible, clickable).
*   **Version Control**: One feature per branch. Descriptive commit messages.
*   **Atomic Tests**: Each scenario should stand alone and not depend on the previous one's state.
