# Senior Level Playwright + TypeScript Interview Questions & Answers

This document contains advanced QAs focused on framework architecture, DevOps integration, and scaling strategies, suitable for candidates with 5+ years of experience.

## 1. Architectural Decisions

**Q: Why choose Playwright over Cypress or Selenium?**
"Selenium is legacy; it relies on HTTP communication with WebDrivers which is slow and prone to synchronization issues. Cypress is limited because it runs inside the browser, making cross-tab and multi-context testing difficult. Playwright uses a direct WebSocket connection to the browser (CDP for Chrome, similar protocols for others), allowing for bidirectional communication. This makes it faster, more stable, and allows advanced features like network interception and multi-browser context testing in a single script."

**Q: How do you handle complex data-driven scenarios (e.g., 500+ rows of data)?**
"I use a factory pattern for test data. For 500+ rows, I wouldn't run them sequentially. I'd read the CSV/Excel into a typed array, and then use `test.each` or a loop to generate dynamic tests. To handle the scale, I'd combine this with **Sharding** to run parts of the list across different runners, and I'd implement a 'dry-run' mode that validates the data schema before starting the heavy UI execution."

## 2. Advanced Playwright Features

**Q: How do you use Playwright's `request.context` for hybrid testing?**
"We use it to bypass UI for repetitive tasks. For example, if I'm testing a room booking, I don't need to 'Create User' via the UI every time. I use `request.post('/api/users', ...)` to create the user instantly, extract the token, and then use `browserContext.addCookies()` to set the authentication state. This makes the UI test focus purely on the booking logic, increasing speed and reducing failure points."

**Q: Explaining the 'Trace Viewer' usage in a team environment.**
"When a test fails in Jenkins/Azure, we don't just look at a screenshot. We download the `.zip` trace file. I use `npx playwright show-trace path/to/trace.zip`. This allows me to see the timeline of the test, every console log, every network request/response, and even a DOM snapshot for every step. It’s essentially a 'flight recorder' for automation, and it has reduced our 'Time to Bug' significantly."

## 3. DevOps & Scaling

**Q: How do you manage secrets in your automation framework?**
"We never hardcode secrets. I use `.env` files for local development (which are in `.gitignore`). For CI/CD, I use **Azure Key Vault** or **Jenkins Credentials Provider**. These secrets are injected as environment variables at runtime. In the code, I access them via `process.env.MY_SECRET`, ensuring that sensitive data is never committed to the repository."

**Q: How do you handle 'Flakiness' in a large pipeline?**
"Flakiness is usually a sign of poor synchronization or environmental instability. My approach is: 1. Implement 'Retries' in `playwright.config.ts` (usually 2 retries in CI). 2. Use `expect(locator).toBeVisible()` which has built-in polling. 3. If a test remains flaky, I mark it as `test.fixme()` and analyze the Trace. I also monitor 'Test Trends' in Allure to identify patterns (e.g., tests only failing on WebKit or only failing during high server load)."

## 4. Leadership & Strategy

**Q: How do you demonstrate the ROI of your automation framework?**
"ROI isn't just about 'how many tests we have'. It's about: 1. **Execution Time**: Dropping regression from 5 days to 1 hour. 2. **Defect Leakage**: How many bugs did automation catch before they hit Staging? 3. **Feedback Loop**: Providing devs with results in 10 mins of a PR. I use Allure trends to show these metrics to stakeholders, proving that the framework is a 'Quality Accelerator', not just a cost."
