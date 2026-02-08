# Master Framework Guide: Playwright + TypeScript + Cucumber BDD

This document provides an exhaustive, end-to-end explanation of the modern automation framework implemented in this project. It is designed for senior-level interview preparation, technical audits, and team onboarding.

---

## 1. Project Overview
*   **Purpose**: To provide a scalable, high-performance end-to-end (E2E) automation solution for web applications (UI) and RESTful services (API).
*   **Type**: A **Hybrid BDD Automation Framework** that seamlessly integrates browser interaction with backend validation.
*   **Technology Stack**: Playwright (Engine), TypeScript (Language), Cucumber (BDD), Node.js (Runtime), Faker.js (Data), Axe-core (A11y), Allure (Reporting), Docker, Jenkins, and Azure DevOps (CI/CD).
*   **High-Level Goal**: To ensure 100% test coverage for critical business flows (e.g., Hotel Booking, Admin Management) while maintaining a readable, maintainable, and descriptive test suite.

---

## 2. High Level Architecture
The framework follows a **Modular Layered Architecture** to separate concerns and ensure maintainability:

*   **Behavioral Layer (BDD)**: Feature files written in Gherkin syntax define "What" the application does.
*   **Execution Glue Layer**: Step definitions and Hooks translate business language into technical instructions.
*   **Business Logic Layer (POM)**: Page Object Model classes encapsulate the "How"—the locators and actions specific to each page.
*   **Data & Service Layer**: API Services and Data Factories handle backend interactions and dynamic data generation.
*   **Orchestration Layer**: Playwright Config and CLI scripts manage browser lifecycles, contexts, and environment settings.

---

## 3. Folder Structure Explanation

*   **`feature/`**: Contains `.feature` files. This is the source of truth for test scenarios readable by both QA and business analysts.
*   **`steps/`**: Contains TypeScript step definitions. It acts as the "bridge" between Gherkin and the Page Objects.
*   **`pages/`**: Contains Page Objects. This folder follows the **Page Object Model (POM)** design pattern, keeping locators and page-specific actions isolated.
*   **`fixtures/`**: Contains framework configuration logic like `hooks.ts` (Setup/Teardown) and `pageFixture.ts` (State sharing).
*   **`services/`**: Houses API client classes for direct backend interaction (REST API testing).
*   **`utils/`**: Utility classes for cross-cutting concerns like `Logger.ts` (Winston), `DataFactory.ts` (Faker), and `authHelper.ts` (Session management).
*   **`configs/`**: Stores environment variables (`.env`) and session data (`storageState.json`).
*   **`reports/`**: The output directory for HTML reports, Allure results, screenshots, and execution logs.
*   **`tests/`**: Contains pure Playwright `.spec.ts` files for rapid API sanity or specialized UI checks outside the BDD flow.

---

## 4. Important Files Explanation

*   **`playwright.config.ts`**: 
    *   *What*: The global configuration file.
    *   *Role*: Sets browser types, timeouts, viewport sizes, and parallelization workers.
    *   *Executor*: Read by Playwright CLI at the start of every run.
*   **`hooks.ts`**:
    *   *What*: Lifecycle management script.
    *   *Role*: Initializes the browser, manages `storageState` for authentication, and captures screenshots on failure.
*   **`package.json`**:
    *   *What*: Project manifest.
    *   *Role*: Defines npm scripts (`npm test`) and lists all dependencies.
*   **`DataFactory.ts`**:
    *   *What*: Dynamic data generator.
    *   *Input*: Templates for Names, Emails, Phones.
    *   *Output*: Unique data objects for every test run to prevent data collisions.
*   **`storageState.json`**:
    *   *What*: Authentication session file.
    *   *Role*: Stores cookies and local storage tokens after a successful login to skip the login UI in subsequent tests.

---

## 5. Detailed Execution Flow (Step-by-Step)

1.  **Trigger**: The user or CI triggers `npm test`.
2.  **Configuration**: Playwright reads `playwright.config.ts` to identify the environment and browser settings.
3.  **Global Setup**: If `storageState.json` is missing/expired, `authHelper.ts` is called to perform a one-time login and save the session.
4.  **Cucumber Orchestration**: The Cucumber runner scans `feature/` files and matches them with `steps/`.
5.  **Hooks (BeforeAll)**: Launches the browser engine once for the entire suite.
6.  **Hooks (Before)**: For each scenario, a fresh `BrowserContext` and `Page` are created. If tagged with `@admin`, the `storageState` is injected.
7.  **Step Execution**: 
    *   Step Definition calls a **Page Object** method.
    *   Page Object interacts with the **Browser** via Playwright.
8.  **Assertion**: The step verifies the outcome (e.g., `expect(page).toHaveURL`).
9.  **Hooks (After)**: If the test fails, a screenshot is taken and attached to the report. The context is closed.
10. **Report Generation**: Raw data is processed into a final HTML/Allure report dashboard.

---

## 6. Data Flow Explanation
Data moves through the framework in three ways:
1.  **Static Data**: Defined in `.env` files for environment URLs and admin credentials.
2.  **Scenario Data**: Passed directly from Gherkin `Scenario Outlines` or `DataTables` into step definitions.
3.  **Dynamic Data**: Generated at runtime by **DataFactory** using Faker.js and passed into the Page Objects.

---

## 7. Integration Flow
*   **API Integration**: We use `APIRequestContext` to setup test data (Create User/Booking) before the UI test starts.
*   **CI/CD Integration**: 
    *   **Jenkins**: A `Jenkinsfile` orchestrates the stages (Install -> Test -> Allure).
    *   **Docker**: The `Dockerfile` ensures the test runs in an identical Linux environment regardless of the local OS.
    *   **Axe-Core**: Integrated into `commonSteps.ts` for automated accessibility audits.

---

## 8. Configuration Management
We use the **Dotenv** library to manage multiple environments. By setting a variable like `ENV=dev`, the framework automatically loads `configs/.env.dev`. This handles switching between local, Staging, and Production environments without changing a single line of code.

---

## 9. Execution Modes
*   **Headless**: Optimized for CI/CD performance (default).
*   **Headed**: Used for local debugging to see browser interaction.
*   **Parallel**: Running multiple features simultaneously across CPU workers.
*   **Sharded**: Splitting tests across multiple physical/virtual machines in a CI pipeline.

---

## 10. Reporting / Output Flow
1.  **Collection**: Metadata and results gathered during execution.
2.  **Snapshotting**: Videos and Trace files captured for failing tests.
3.  **Aggregation**: `cucumber-json` formatter compiles results.
4.  **Finalization**: `allure-playwright` converts results into a trended, graphical dashboard.
5.  **Artifacts**: Reports are zipped and uploaded to Jenkins/Azure for download.

---

## 11. End-to-End Example Scenario: "Booking Lifecycle"
*   **Start**: Gherkin scenario defined in `booking.feature`.
*   **API Setup**: Step definition uses `MessageAPI.ts` to create data.
*   **UI Interaction**: `BookingPage.ts` fills details and clicks "Book".
*   **Validation**: `adminSteps.ts` checks the dashboard.
*   **Error Check**: If a step fails, `hooks.ts` snaps a screenshot.
*   **Finish**: Result is stored in `cucumber-report.json`.

---

## 12. Error Handling Flow
*   **Actionability**: Playwright automatically retries actions (click/fill) for 30s if an element is hidden or moving.
*   **Trace Viewer**: On failure, a full trace (containing network requests, console logs, and DOM snapshots) is generated.
*   **Retry Logic**: Configured in `playwright.config.ts` to retry flaky tests twice in CI mode.

---

## 13. Best Practices Followed
1.  **DRY (Don't Repeat Yourself)**: Common actions (Login/Logout) are moved to global hooks and helpers.
2.  **Isolation**: Every test scenario starts with a clean `BrowserContext` to ensure no side effects.
3.  **Modular Locators**: Using user-facing attributes (`getByRole`) to ensure tests survive UI refactors.
4.  **Singleton Page Fixtures**: Ensuring only one page instance is active per thread.
5.  **Typescript Strictness**: Using interfaces for data objects to catch syntax errors during development.

---

## 14. Locator Master Strategy
To maximize test stability, we follow a strict selection hierarchy:
1.  **Primary**: `getByRole()` (Accessibility-first, most resilient).
2.  **Secondary**: `getByLabel()` or `getByPlaceholder()` (User-interface focused).
3.  **Tertiary**: `getByTestId()` (Development-specific identifiers).
4.  **Avoid**: Absolute XPaths and CSS class-based selectors that depend on styling.
5.  **Optimization**: Using `.filter({ hasText: '...' })` to resolve matches in lists and tables without using fragile indices.
