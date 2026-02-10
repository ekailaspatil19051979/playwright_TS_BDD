# Comprehensive QA Bank: Playwright + TypeScript & DevOps (100+ Questions)

This document serves as an exhaustive resource for interview preparation, covering all tools and technologies used in the project.

---

## 🟢 Category 1: Playwright Basics (1-15)

1.  **What are the primary advantages of Playwright over other tools?**
    *   Direct communication with browser engines (CDP), multi-browser/multi-context support, auto-waiting, and native API testing.
2.  **Explain the difference between `page.click()` and `locator.click()`.**
    *   `page.click()` is legacy/string-based. `locator.click()` is modern, uses actionability checks (visible, stable, enabled), and is the recommended approach.
3.  **What are 'Actionability' checks in Playwright?**
    *   Before performing an action, Playwright checks if the element is: Visible, Stable (not animating), Enabled, and Not Obscured.
4.  **How do you handle dropdowns in Playwright?**
    *   Use `selectOption()`. You can select by value, label, or index.
5.  **Explain the `getByRole` locator.**
    *   It locates elements by their ARIA role (button, heading, checkbox), which encourages accessible web design and creates more resilient tests.
6.  **What is the difference between `locator.innerText()` and `locator.textContent()`?**
    *   `innerText` respects CSS styling (e.g., hidden text is not returned). `textContent` returns all text content inside the element.
7.  **How do you handle alerts/dialogs in Playwright?**
    *   Playwright auto-dismisses alerts. To handle them, use `page.on('dialog', dialog => dialog.accept())` before the action triggers the alert.
8.  **How do you perform a drag-and-drop action?**
    *   Use `locator.dragTo(targetLocator)`.
9.  **What is the default timeout in Playwright?**
    *   30 seconds for test execution, but this is configurable in `playwright.config.ts`.
10. **How do you capture a screenshot within a test?**
    *   `await page.screenshot({ path: 'screenshot.png' });`
11. **How do you run tests in headed mode?**
    *   Pass the `--headed` flag: `npx playwright test --headed`.
12. **How can you check if a checkbox is checked?**
    *   `await expect(locator).toBeChecked();`
13. **What is an 'auto-wait' assertion?**
    *   Assertions like `expect(locator).toBeVisible()` will retry until the element appears or the timeout is reached.
14. **How do you scroll to an element?**
    *   Playwright actions (like click) scroll automatically. Manually: `locator.scrollIntoViewIfNeeded()`.
15. **How do you find an element containing specific text?**
    *   `page.getByText('Submit')` or `locator(':has-text("Submit")')`.

---

## 🔵 Category 2: Advanced Playwright (16-30)

16. **Explain 'Browser Context' and why it's useful.**
    *   A context is like an incognito session. You can have multiple contexts (e.g., User A and User B) in a single test without them sharing cookies/cache.
17. **How do you handle multi-tab testing?**
    *   `const [newPage] = await Promise.all([context.waitForEvent('page'), locator.click()]);`
18. **What is 'Storage State'?**
    *   A way to save authentication (cookies/local storage) to a JSON file and reuse it to avoid re-logging in for every test.
19. **How do you mock an API response?**
    *   `await page.route('**/api/data', route => route.fulfill({ status: 200, body: JSON.stringify(myData) }));`
20. **What is the purpose of `page.waitForLoadState('networkidle')`?**
    *   It waits until there are no new network requests for at least 500ms, ensuring the page is fully loaded.
21. **How do you interact with elements inside a Shadow DOM?**
    *   Standard locators in Playwright pierce Shadow DOM by default without any extra steps.
22. **Explain `frameLocator`.**
    *   It allows you to locate elements inside an iFrame: `page.frameLocator('#myFrame').getByRole('button')`.
23. **How do you upload a file?**
    *   `await page.setInputFiles('input[type="file"]', 'myFile.pdf');`
24. **How do you record videos and traces only for failed tests?**
    *   In `playwright.config.ts`, set `video: 'on-first-retry'` and `trace: 'retain-on-failure'`.
25. **What is a 'Global Setup' file?**
    *   A script that runs once before all tests (e.g., to seed a database or generate auth state).
26. **How do you use `expect.toPass()`?**
    *   It's a polling utility that retries a block of code until it passes without throwing an assertion error.
27. **How do you handle geolocation or permissions in a test?**
    *   Set them in the browser context: `await browser.newContext({ permissions: ['geolocation'], geolocation: { latitude: 48, longitude: 2 } });`.
28. **Explain the 'Serial' mode for tests.**
    *   Using `test.describe.configure({ mode: 'serial' })` makes tests in a file run one after another, and if one fails, the rest are skipped.
29. **How do you debug using the Playwright Inspector?**
    *   Run tests with `PWDEBUG=1 npx playwright test`.
30. **What is 'SlowMo' and how is it helpful?**
    *   It slows down Playwright operations by a specified amount (ms), making it easier to visually debug what is happening.

---

## 🟡 Category 3: TypeScript for Testers (31-45)

31. **What are the benefits of using TypeScript with Playwright?**
    *   Type safety, autocompletion (IntelliSense), easier refactoring, and catching errors at compile-time rather than runtime.
32. **Explain the difference between `Type` and `Interface`.**
    *   Interfaces are mainly for defining object shapes and support declaration merging. Types are more flexible (unions, tuples).
33. **What is an 'Async/Await' and why is it mandatory in Playwright?**
    *   Playwright actions are asynchronous. `await` ensures the execution stops until the promise (the action) is resolved.
34. **How do you define an optional property in an interface?**
    *   By adding a `?` after the property name (e.g., `userName?: string`).
35. **What is 'Union Type' in TypeScript?**
    *   Allowing a variable to have more than one type: `let result: string | number;`.
36. **How do you handle 'Any' type?**
    *   Avoid it. Use `unknown` if the type isn't known, or define a specific interface to maintain type safety.
37. **What is a 'Generic' in TypeScript?**
    *   A way to create reusable components that work with a variety of types while maintaining type safety (e.g., `Array<string>`).
38. **How do you export and import modules?**
    *   Use `export class MyPage {}` and `import { MyPage } from './pages/MyPage'`.
39. **Explain 'Enum' in TypeScript.**
    *   A set of named constants, useful for environment names or status codes (e.g., `enum Env { Dev, QA, Prod }`).
40. **What is the purpose of `tsconfig.json`?**
    *   It defines the compiler options for the project (target JS version, module resolution, include/exclude paths).
41. **How do you use 'Type Aliases'?**
    *   `type ID = string | number;` allows you to create a custom name for a type combination.
42. **What does `readonly` do in a class?**
    *   It prevents a property from being modified after it is initialized.
43. **How do you cast a type in TypeScript?**
    *   Using `as` syntax: `const val = someVar as string;`.
44. **What is the difference between `null` and `undefined`?**
    *   `undefined` means a variable has been declared but not assigned a value. `null` is an assignment value representing 'nothing'.
45. **What is a 'Decorator'? (Bonus)**
    *   A special kind of declaration that can be attached to a class or method to modify its behavior (common in frameworks like NestJS).

---

## 🥒 Category 4: Cucumber BDD (46-60)

46. **What is Gherkin syntax?**
    *   A business-readable language (Given, When, Then, And) used to describe behavior without implementation details.
47. **What is the purpose of the `World` object in Cucumber?**
    *   It's an isolated context for each scenario, used to share state (like data or the Playwright `page` object) between step definitions.
48. **Explain 'Scenario Outline' and 'Examples'.**
    *   Used for data-driven tests where the same scenario runs multiple times with different data sets from a table.
49. **What are 'Tags' in Cucumber?**
    *   Labels (e.g., `@smoke`, `@regression`) used to filter which scenarios to run.
50. **What is a 'Background' in a feature file?**
    *   Steps that run before every scenario in that feature file (e.g., "Given the user is logged in").
51. **How do you pass parameters from Gherkin to Step Definitions?**
    *   Using placeholders in the Step Definition regex or cucumber expression (e.g., `{string}`, `{int}`).
52. **Explain Cucumber 'Hooks'.**
    *   `Before`, `After`, `BeforeAll`, and `AfterAll` blocks that manage setup and teardown tasks.
53. **What is 'Step Definition'?**
    *   The TypeScript code that maps a Gherkin sentence to specific automation actions.
54. **How do you handle failing a step in Cucumber?**
    *   Simply throw an Error or use an assertion; Cucumber will mark the step and scenario as failed.
55. **Can you run Cucumber tests in parallel?**
    *   Yes, by configuring the `parallel` flag in the cucumber runner or using `playwright-bdd` wrapper.
56. **What is the difference between `And` and `But` steps?**
    *   In code, they are identical to `When` or `Then`. In Gherkin, they improve readability.
57. **How do you handle 'Doc Strings'?**
    *   Triple quotes `"""` used to pass large blocks of text to a step definition.
58. **What is a 'Feature' file?**
    *   A file with `.feature` extension that contains one or more related BDD scenarios.
59. **Explain 'DataTable' in Cucumber.**
    *   A way to pass a list or table of data into a single step definition.
60. **How do you generate a Cucumber HTML report?**
    *   By using a formatter in the `cucumber.json` config (e.g., `"html:reports/cucumber-report.html"`).

---

## 🏗️ Category 5: Jenkins CI/CD (61-70)

61. **What is a `Jenkinsfile`?**
    *   A text file that contains the definition of a Jenkins Pipeline and is checked into source control.
62. **Explain the 'Declarative' vs 'Scripted' pipeline.**
    *   Declarative is newer, uses a strict structure (Pipeline, Agent, Stages), and is easier to read. Scripted uses Groovy.
63. **What is a 'Build Agent' in Jenkins?**
    *   A machine (or container) where the actual test execution takes place, managed by the Jenkins Master.
64. **How do you inject environment variables in Jenkins?**
    *   Using the `environment` block in the Jenkinsfile or the "With Credentials" plugin.
65. **How do you trigger a Jenkins job automatically?**
    *   Using Webhooks (trigger on Git push) or Poll SCM (periodically check Git).
66. **What is the 'Post' section in a Jenkinsfile?**
    *   A block that runs after stages finish, used for cleanup or reporting (Success/Failure/Always).
67. **How do you archive test reports in Jenkins?**
    *   Using the `archiveArtifacts` command to save HTML or Allure reports after the run.
68. **Explain 'Stage' and 'Step' in a pipeline.**
    *   A `Stage` is a major phase (e.g., Install, Test). A `Step` is a single command inside that stage.
69. **How do you handle build failures in a pipeline?**
    *   The pipeline stops by default. You can use `try/catch` or the `post` block to send notifications (Slack/Email).
70. **What is the 'Master/Slave' architecture?**
    *   The Master manages the schedule and UI; Slaves (Agents) do the heavy lifting of running builds/tests.

---

## ☁️ Category 6: Azure DevOps (71-80)

71. **What is `azure-pipelines.yml`?**
    *   The configuration file for Azure DevOps pipelines, similar to a Jenkinsfile.
72. **Explain 'Self-hosted' vs 'Microsoft-hosted' agents.**
    *   Microsoft-hosted are pre-configured VMs. Self-hosted are machines you maintain, often cheaper and faster for large suites.
73. **How do you publish test results in Azure Pipelines?**
    *   Using the `PublishTestResults@2` task to upload JUnit XML files.
74. **What is a 'Variable Group'?**
    *   A way to store and share variables across across multiple pipelines in Azure DevOps.
75. **How do you run tests on a schedule in Azure?**
    *   Using the `schedules` trigger in the YAML file (cron syntax).
76. **How do you use 'Artifacts' in Azure DevOps?**
    *   Tasks like `PublishBuildArtifacts@1` allow you to save reports/logs for later download.
77. **Explain 'Service Connections'.**
    *   Secure ways to connect Azure DevOps to external systems like GitHub, Docker Hub, or Azure resources.
78. **What is a 'Multi-stage' pipeline?**
    *   A pipeline that covers Build, Test, and Deploy phases in one workflow.
79. **How do you use 'Matrix' strategy in Azure?**
    *   It allows you to run the same job with different parameters (e.g., 3 different OS versions) in parallel.
80. **What is 'Azure Key Vault' integration?**
    *   A way to pull secrets directly into your pipeline securely without ever seeing the plaintext value.

---

## 🐳 Category 7: Docker & Containerization (81-90)

81. **Why use Docker for running Playwright tests?**
    *   It guarantees a consistent environment (OS, dependencies, browser versions) across local and CI.
82. **What is a `Dockerfile`?**
    *   A script containing instructions to build a Docker image.
83. **Explain the `mcr.microsoft.com/playwright` image.**
    *   The official image from Microsoft that comes pre-installed with all browsers and system dependencies.
84. **What is `docker-compose`?**
    *   A tool for defining and running multi-container applications (e.g., placing the app and the tests in separate containers).
85. **How do you run a specific command in a container?**
    *   `docker run my-image npx playwright test`.
86. **What is a 'Volume Mount' in Docker?**
    *   Mapping a folder on the host machine to a folder in the container (used to get test reports out of the container).
87. **Explain `--ipc=host`.**
    *   Recommended for Playwright in Docker to prevent Chrome from crashing due to low shared memory.
88. **What is the difference between an Image and a Container?**
    *   An Image is a static blueprint. A Container is a running instance of that blueprint.
89. **How do you reduce Docker image size?**
    *   Using multi-stage builds and 'alpine' base images (though Playwright requires a full Ubuntu/Debian base).
90. **What is `.dockerignore`?**
    *   A file that prevents unnecessary files (like `node_modules`) from being copied into the Docker image build context.

---

## 📊 Category 8: Reporting & Best Practices (91-100)

91. **What makes Allure Report superior to standard HTML reports?**
    *   It provides historical trends, categorization of failures (bug vs. broken), and detailed step-by-step execution graphs.
92. **How do you implement the Page Object Model (POM) correctly?**
    *   One class per page, locators defined as `readonly` properties, and actions defined as public methods.
93. **What is 'DRY' principle in automation?**
    *   "Don't Repeat Yourself". Abstracting common code (like login) into fixtures or utility classes.
94. **Explain 'Atomic Tests'.**
    *   Tests should be small, independent, and test only one thing. They should not depend on the outcome of other tests.
95. **How do you handle dynamic data in assertions?**
    *   Use regex for strings or `expect.closeTo()` for floating-point numbers.
96. **What is 'Hard Assertion' vs 'Soft Assertion'?**
    *   Hard stops the test immediately. Soft (`expect.soft`) logs the error but continues, reporting all failures at the end.
97. **Explain the importance of 'Linting' in a project.**
    *   ESLint catches syntax errors and enforces code style, making the codebase maintainable across a team.
98. **How do you debug 'Network' issues in a test?**
    *   Use the 'Network' tab in Trace Viewer to see if an API returned a 401 or 500 error.
99. **What is 'Sharding'?**
    *   Splitting the test suite into N parts and running each part on a different machine to reduce time.
100. **How do you keep your tests 'Resilient'?**
    *   By avoiding XPath and CSS selectors that depend on the DOM structure, preferring user-facing attributes like role and text.

---

## 🏢 Category 9: Enterprise Features (101-110)

101. **How do you handle visual regression testing for dynamic content?**
    *   I use the `mask` option in `toHaveScreenshot()` to hide dynamic areas like dates or prices before comparison.
102. **Explain how you integrated Winston/Log4js for better traceability.**
    *   I created a singleton `Logger` utility that writes to both the console and a file. It’s connected to Cucumber hooks to log scenario metadata.
103. **What metrics do you track with Lighthouse integration?**
    *   I track Performance, SEO, and Accessibility scores. I set minimum thresholds (e.g., >80) to fail the build if a PR degrades page performance.
104. **How does Faker.js help in parallel test execution?**
    *   It ensures every worker process uses unique email IDs or names, preventing "Duplicate Entry" errors in the database when multiple tests run at once.
105. **What is the difference between `page.screenshot()` and `toHaveScreenshot()`?**
    *   `page.screenshot()` just takes a picture. `toHaveScreenshot()` is an assertion that compares the current view against a saved baseline.
106. **Describe how `storageState` improves CI pipeline speed.**
    *   By logging in once during global-setup and reusing cookies, we avoid hitting the login page for hundreds of tests, reducing overhead by minutes.
107. **What is the purpose of `page.route()` in edge case testing?**
    *   It allows us to intercept network calls and inject 500 Errors or 403 Forbidden responses to verify the UI's error handling logic.
108. **How do you secure secrets in a Playwright project?**
    *   I use `.env` files for local dev and secure CI variables (Jenkins Credentials/Azure Key Vault) injected as environment variables at runtime.
109. **Why use `axe-core` for accessibility testing?**
    *   It’s the industry standard for catching WCAG violations like low contrast, missing ARIA labels, and broken keyboard navigation automatically.
110. **What is 'Sharding' versus 'Parallelism' in Playwright?**
    *   Parallelism runs tests across multiple cores on one machine. Sharding splits the total test count across multiple distinct CI runners/machines.
