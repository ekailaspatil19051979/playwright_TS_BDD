# Playwright TypeScript BDD Automation Framework

Welcome to the **Enterprise Automation Framework** documentation. This project is a comprehensive, production-ready test automation solution designed to validate the **Restful Booker API** and **Automation in Testing UI** applications using a unified, data-driven approach.

## 1. Project Overview

### Purpose
The primary goal of this framework is to provide a robust, scalable, and maintainable automated testing solution for both API and UI layers of the application. It ensures high quality by validating critical business flows, regression suites, and end-to-end integration scenarios.

### High-Level Architecture
This framework adopts a **Hybrid Framework** approach, combining **Page Object Model (POM)** for UI interactions and a **Service Object Model** for API requests, all driven by external data sources (JSON, CSV, Excel) and Behavior Driven Development (BDD) scenarios.

### Types of Testing Covered
*   **UI Automation:** Validates the frontend functionality, user interactions, and visual integrity of the [Automation in Testing Online](https://automationintesting.online/) application.
*   **API Automation:** Direct validation of backend services for the [Restful Booker API](https://restful-booker.herokuapp.com/), covering CRUD operations (Create, Update, Get, Delete booking) and Auth Token generation.
*   **End-to-End (E2E) Flows:** Integrated scenarios where API calls set up test data (e.g., create a booking) and UI tests verify the reflection of that data on the frontend, ensuring seamless system integration.

## 2. Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **Playwright** | Core automation engine for reliable, fast, and flaky-resistant browser interactions. |
| **TypeScript** | Ensures type safety, better tooling support, and cleaner code structure. |
| **Playwright Test Runner** | Executes tests with native parallelization, sharding, and fixture support. |
| **Cucumber BDD** | Enables writing tests in Gherkin syntax (Given/When/Then) for better collaboration with non-technical stakeholders. |
| **Playwright APIRequest** | Built-in request context for high-performance API testing without external libraries like Axios/SuperTest. |
| **Log4js** | Structured logging (Log4j style) for detailed execution logs and debugging. |
| **Jenkins / Azure DevOps** | CI/CD pipelines for automated execution, scheduled runs, and reporting. |
| **Docker** | Containerization to run tests in consistent, isolated environments. |
| **Allure Report** | specialized reporting for detailed test execution visualization. |

## 3. Framework Architecture

The framework is built on a modular architecture:

*   **Test Layer:** Contains BDD Feature files (`.feature`) and Step Definitions (`.ts`).
*   **Page/Service Layer:**
    *   **Pages:** Encapsulate UI elements and interactions (POM).
    *   **API Services:** Encapsulate API endpoints and request logic.
*   **Utilities:** Helper functions for Data handling (CSV/Excel readers), Date manipulation, Random data generation (Faker), and Logging.
*   **Config Layer:** Centralized configuration for URLs, Credentials, Browsers, and Environment settings (Dev/QA/Staging).
*   **Reporting:** Generates comprehensive HTML reports, Allure reports, and attaches screenshots/videos for failures.
*   **Parallel Execution:** Leverages Playwright's worker processes to run tests concurrently, drastically reducing execution time.

## 4. Project Folder Structure

```plaintext
playwright-automation
├── feature
│   ├── ui                  # UI related feature files
│   ├── api                 # API related feature files
│   └── e2e                 # End-to-end feature files
├── steps
│   ├── ui                  # Step definitions for UI
│   ├── api                 # Step definitions for API
│   └── common              # Shared step definitions
├── pages                   # Page Object Models (UI)
│   ├── BookingPage.ts
│   └── LoginPage.ts
├── services                # API Service Objects
│   ├── AuthAPI.ts
│   └── BookingAPI.ts
├── fixtures                # Playwright and Cucumber custom fixtures
├── utils                   # Utility functions
│   ├── Logger.ts           # Log4js wrapper
│   ├── CsvReader.ts
│   └── ExcelReader.ts
├── data                    # Test Data
│   ├── json                # Static JSON data files
│   ├── csv                 # Data driven scenarios
│   └── excel               # Complex data sheets
├── configs                 # Environment specific configs
│   ├── .env.dev
│   └── .env.qa
├── reports                 # Generated test reports
├── playwright.config.ts    # Main Playwright configuration
├── cucumber.json           # Cucumber configuration
├── package.json            # Dependencies and scripts
├── Jenkinsfile             # Jenkins pipeline definition
├── azure-pipelines.yml     # Azure DevOps pipeline definition
├── Dockerfile              # Docker image definition
└── docker-compose.yml      # Docker services orchestration
```

---

## 🎯 Modern Locator Strategy

This framework follows **Playwright best practices** for resilient, accessibility-first locators that survive UI refactors and improve test maintainability.

### Locator Priority Hierarchy
1. **`getByRole()`** - Primary choice (accessibility-first, most stable)
2. **`getByLabel()` / `getByPlaceholder()`** - For form inputs
3. **`getByTestId()`** - For elements without semantic roles
4. **`getByText()` / `getByAltText()`** - For content-based selection
5. **CSS Selectors** - Last resort only

### Key Resources
- **[Locator Refactor Guide](LOCATOR_REFACTOR_GUIDE.md)** - Comprehensive migration strategy with 20+ examples
- **[Refactoring Checklist](LOCATOR_REFACTOR_CHECKLIST.md)** - Step-by-step migration process
- **[LocatorHelper](utils/LocatorHelper.ts)** - Reusable locator patterns library
- **[LocatorDebugger](utils/LocatorDebugger.ts)** - Visual debugging utilities
- **[Example Page Object](pages/ExampleModernPage.ts)** - Reference implementation

### Why This Matters
✅ **Stability** - Tests survive UI refactors and styling changes  
✅ **Accessibility** - Locators double as A11y compliance checks  
✅ **Maintainability** - Semantic names make tests self-documenting  
✅ **Performance** - Faster element resolution with role-based queries  

---


## 5. Prerequisites

Before setting up the project, ensure you have the following installed:

*   **Node.js:** v18.0.0 or higher (End-of-Life versions not supported).
*   **NPM:** v9.0.0 or higher.
*   **IDE:** VS Code (Recommended) or WebStorm.
*   **VS Code Extensions:**
    *   Playwright Test for VSCode
    *   Cucumber (Gherkin) Support
    *   ESLint / Prettier
*   **Java (Optional):** Required only if generating Allure reports locally.

## 6. Setup Instructions

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/your-org/playwright-bdd-automation.git
    cd playwright-bdd-automation
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Install Playwright Browsers**
    This downloads the browser binaries (Chromium, Firefox, WebKit) required for testing.
    ```bash
    npx playwright install
    ```

4.  **Environment Configuration**
    Create a `.env` file in the root directory or copy the example:
    ```bash
    cp config/.env.example .env
    ```

## 7. Configuration Management

Configuration is handled via `playwright.config.ts` and environment variables.

*   **`playwright.config.ts`**: Controls global settings like timeouts, retries, reporters, and browser projects.
*   **Environment Files (`.env`)**: Manage sensitive data and environment-specific URLs.
    *   `BASE_URL_UI`: URL for the frontend application.
    *   `BASE_URL_API`: URL for the backend API.
    *   `AUTH_USERNAME`: Test user credentials.
    *   `AUTH_PASSWORD`: Test user password.

To switch environments, you can load different `.env` files using the `dotenv` package in the config, or set the `ENV` variable:
```bash
cross-env ENV=qa npx playwright test
```

## 8. How to Run Tests

### Run All Tests
Executes all feature files in headless mode.
```bash
npx playwright test
# OR if using pure Cucumber runner
npm run test
```

### Run by Tags (Recommended for BDD)
Run tests tagged with specific markers (e.g., `@smoke`, `@regression`, `@api`).
```bash
npx playwright test --grep @smoke
# For Cucumber:
npx cucumber-js --tags "@smoke"
```

### Run Specific Suites
```bash
# UI Tests only
npx playwright test tests/ui

# API Tests only
npx playwright test tests/api
```

### Complex Test Cases
## 🚀 Enterprise Enhancements
The framework includes advanced patterns for production-grade testing:
*   **Global Auth**: Uses `storageState` to share login sessions, reducing test execution time by ~40%.
*   **Visual Regression**: Pixel-perfect layout validation using `toHaveScreenshot`.
*   **Accessibility (A11y)**: Automated WCAG 2.1 scans using `@axe-core/playwright`.
*   **Dynamic Data**: `Faker.js` integration for unique data generation per run.
*   **Network Mocking**: `page.route()` for testing 500/404 server errors without backend reliance.
*   **Structured Logging**: `Winston` logger for detailed execution audits in `reports/logs`.
*   **Performance Audits**: `Lighthouse` integration for monitoring Core Web Vitals.

## 🧪 Test Coverage
*   **UI Tests**: 
    *   Booking flow (Positive & Data Driven)
    *   Contact Us form (Positive & Negative validation with Scenario Outlines)
    *   Admin Dashboard (Login & Inbox management)
*   **API Tests**: Integrated Playwright API Request tests for booking management.
*   **Complex Scenarios**: 
    *   **Data-Driven**: Covering multiple sets of user data using Gherkin `Examples`.
    *   **Form Validation**: Ensuring the contact form rejects invalid email/phone formats.
    *   **State Management**: Logging in to admin and navigating through secure sessions.

### Run in Headed Mode
Opens the browser window to see execution visually.
```bash
npx playwright test --headed
```

### Parallel Execution
Default is configured in `playwright.config.ts`. To override:
```bash
npx playwright test --workers=4
```

## 9. API Automation with Playwright

API tests leverage Playwright's `APIRequestContext` for high performance.

*   **Structure:** API calls are encapsulated in `services/`.
*   **Authentication:**  The `AuthAPI` service handles token generation (`POST /auth`). The token is stored in the test context or a storage state file and injected into subsequent `APIRequest` headers (`Cookie: token=...`).
*   **Validation:** Responses are asserted using Playwright’s built-in `expect` matchers (e.g., `expect(response).toBeOK()`, `expect(json.booking.firstname).toBe('Jim')`).

**Example Flow:**
1.  **Given** I have a valid auth token.
2.  **When** I send a POST request to `/booking` with payload from `data/booking.json`.
3.  **Then** the response status code should be 200.
4.  **And** the response body matches the created booking details.

## 10. Data Driven Testing

The framework supports multiple data formats located in the `data/` directory.

*   **JSON:** Used for request payloads and static configurations.
    *   *Usage:* `import data from '../data/json/bookingData.json';`
*   **CSV/Excel:** Used for iterating through multiple test scenarios (e.g., login with different user roles).
    *   *Usage:* Use the custom `CsvReader` or `ExcelReader` utility in your step definitions to load scenarios dynamically.
    *   *Example:* `const scenarios = CsvReader.read('data/csv/login_scenarios.csv');`

## 11. Reporting

We use a multi-tiered reporting strategy:

1.  **Playwright HTML Report:**
    Auto-generated after each run. Contains trace viewer (time-travel debugging), videos, and screenshots on failure.
    ```bash
    npx playwright show-report
    ```
2.  **Allure Report:**
    Provides historical trend analysis and detailed step-by-step logs.
    ```bash
    npm run allure:generate
    npm run allure:open
    ```
3.  **Console Logs:**
    Log4js outputs detailed execution information to the console and `logs/execution.log` file for debugging runtime issues.

## 12. CI/CD Integration

The framework is CI-ready with configuration files included in the root.

### Jenkins Pipeline (`Jenkinsfile`)
*   **Stages:** Checkout -> Install -> Test (Parallel) -> Archive Artifacts -> Publish Allure Report.
*   **Parameters:** `BROWSER`, `TAGS`, `ENVIRONMENT`.
*   **Cron:** Scheduled nightly runs for regression.

### Azure DevOps (`azure-pipelines.yml`)
*   **Trigger:** On push to `main` or Pull Request.
*   **Pool:** Uses `ubuntu-latest` or self-hosted Windows agents.
*   **Artifacts:** Publishes HTML report and playwight-traces as build artifacts.

## 13. Docker Execution

Ensures consistency by running tests in a containerized environment.

1.  **Build the Docker Image**
    ```bash
    docker build -t playwright-bdd-framework .
    ```

2.  **Run Tests Inside Container**
    ```bash
    docker run -it --rm --ipc=host playwright-bdd-framework
    ```
    *(Note: `--ipc=host` is recommended for high-performance browser execution in Docker)*

3.  **Using Docker Compose**
    Run tests and generate reports mapped to local volume:
    ```bash
    docker-compose up
    ```

## 14. Best Practices

*   **Locators:** Prefer user-facing locators (`getByRole`, `getByText`) over CSS/XPath to ensure tests resemble user behavior and are resilient to DOM changes.
*   **Isolation:** Each test should be independent. Use `test.beforeEach` or BDD `Background` steps to set up state. never rely on state from a previous test.
*   **Data Management:** Do not hardcode test data. Use the `data/` directory or Faker for dynamic data.
*   **Flakiness:** Use auto-waiting assertions (`expect(locator).toBeVisible()`) instead of hard sleeps (`waitForTimeout`).

## 15. Troubleshooting

*   **"Browser not found" error:** Run `npx playwright install` to ensure binaries are present.
*   **Timeouts:** Check network speed or increase the global timeout in `playwright.config.ts`.
*   **Locator Failures:** Use the Playwright Inspector (`npx playwright test --debug`) to verify selectors in the live browser.
*   **CI Fails but Local Passes:** Ensure the CI environment matches local (Node version, OS dependencies). Use Docker to replicate CI locally.

## 16. Contribution Guidelines

1.  **Branching Strategy:** Use `feature/` or `fix/` branches off `main`.
    *   `feature/add-login-tests`
    *   `fix/api-timeout-issue`
2.  **Pull Requests:** must be linked to a Jira/Ticket ID. passing CI checks are mandatory before merge.
3.  **Code Review:** Focus on readability, locator strategy, and reuse of existing steps/pages.
4.  **Format:** Run `npm run lint` before committing.

## 17. FAQ

**Q: Can I run tests in Safari/Firefox?**
A: Yes, use the `--project` flag: `npx playwright test --project=firefox`.

**Q: How do I debug a failing API test?**
A: Check the API response logs in the console or use the Trace Viewer to inspect the network tab.

**Q: Where are the screenshots saved?**
A: Screenshots are attached to the HTML report and found in `test-results/` folder for failed tests.
