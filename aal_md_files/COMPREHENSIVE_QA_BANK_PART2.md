# Comprehensive QA Bank (Part 2): Advanced Playwright, TypeScript & DevOps

This document contains 100 additional QAs focusing on advanced usage, specialized testing types, and complex architectural patterns.

---

## 🎨 Category 9: Visual & Accessibility Testing (101-115)

101. **How do you perform visual regression testing in Playwright?**
    *   Use `expect(page).toHaveScreenshot()`. Playwright compares the current screen with a golden baseline image.
102. **How do you handle dynamic elements (like timestamps) in visual tests?**
    *   Use the `mask` option: `expect(page).toHaveScreenshot({ mask: [locator] })`. This blacks out the dynamic area.
103. **What is 'Pixelmatch' in the context of Playwright?**
    *   It is the underlying library Playwright uses to compare images and highlight differences in red.
104. **How do you perform accessibility (A11y) testing with Playwright?**
    *   Integrate with `@axe-core/playwright`. You can inject the axe engine and run `new AxeBuilder({ page }).analyze()`.
105. **What is the `threshold` option in visual comparisons?**
    *   It defines the maximum amount of pixel difference allowed (from 0 to 1) before the test is marked as failed.
106. **How do you handle hover states in visual tests?**
    *   Manually trigger the hover `await locator.hover()` before taking the screenshot.
107. **How do you update baseline images for visual tests?**
    *   Run tests with the update flag: `npx playwright test --update-snapshots`.
108. **Can you perform visual testing on a specific element only?**
    *   Yes: `await expect(locator).toHaveScreenshot()`.
109. **How do you handle different screen sizes for visual testing?**
    *   Playwright automatically names snapshots based on the project name (e.g., 'chromium-darwin') and viewport size.
110. **What is 'Color Contrast' testing in A11y?**
    *   A check to ensure text is readable against its background, which Axe-builder catches automatically.
111. **Explain the `fullPage` option in screenshots.**
    *   `page.screenshot({ fullPage: true })` captures the entire scrollable height of the page, not just the viewport.
112. **How do you test 'Alt' text presence for all images?**
    *   Using AxeBuilder, it checks for the `image-alt` rule during the scan.
113. **What is an 'Inaccessible' element?**
    *   An element that cannot be reached via keyboard navigation or read correctly by screen readers.
114. **How do you test for 'Focus' indicators?**
    *   Trigger `Tab` key presses using `page.keyboard.press('Tab')` and verify `expect(locator).toBeFocused()`.
115. **Explain the `maxDiffPixels` configuration.**
    *   A threshold that allows a specific number of pixels to be different before failing, useful for minor rendering variations.

---

## 🔒 Category 10: Network, Security & API Mastery (116-130)

116. **How do you capture networking HAR files?**
    *   Configure it in the context: `browser.newContext({ recordHar: { path: 'results.har' } })`.
117. **Explain the difference between `page.route()` and `page.waitForResponse()`.**
    *   `page.route()` provides a mock or modifies the request/response. `page.waitForResponse()` simply waits for a real network event.
118. **How do you test file downloads?**
    *   `const [download] = await Promise.all([page.waitForEvent('download'), locator.click()]); await download.saveAs('path');`.
119. **How do you verify a response's status code in an API test?**
    *   `expect(response.status()).toBe(201);`.
120. **Can you modify request headers using `page.route()`?**
    *   Yes: `route.continue({ headers: { ...route.request().headers(), 'Authorization': 'token' } });`.
121. **How do you test 'Cross-Origin' (CORS) issues?**
    *   By attempting to fetch a resource from a different domain within the page context and asserting on the failure/success.
122. **What is `request.fetch()` and how is it different from `page.goto()`?**
    *   `request.fetch()` is for pure API calls without a UI. `page.goto()` loads a full web page.
123. **How do you handle SSL certificate errors?**
    *   Set `ignoreHTTPSErrors: true` in the browser context or global config.
124. **How do you test API timeouts?**
    *   By using a mock route that remains 'pending' or returns a response after a long delay using `setTimeout`.
125. **What is a 'Bearer' token and how do you use it in Playwright API tests?**
    *   A standard security token. You pass it in the `extraHTTPHeaders` of the `request` context.
126. **How do you validate a JSON schema of an API response?**
    *   Use a library like `ajv` inside your test to validate `response.json()` against a schema object.
127. **Explain `page.waitForNavigation()`.**
    *   It waits for the URL to change and the page to load, usually used when a click triggers a redirect.
128. **How do you handle websockets in Playwright?**
    *   Use `page.waitForEvent('websocket')` to intercept the connection and monitor `frameSent` or `frameReceived` events.
129. **What is 'Request Interception' for security testing?**
    *   Checking if sensitive data (like passwords) is being sent in plain text or to unauthorized domains by inspecting `request.postData()`.
130. **How do you handle basic auth (username/password popup)?**
    *   Provide credentials in the context: `browser.newContext({ httpCredentials: { username, password } })`.

---

## 🏛️ Category 11: Framework Design Patterns (131-145)

131. **What is the 'Component Object Model'?**
    *   An extension of POM where you create classes for reusable UI components (like a Navbar or DatePicker) instead of whole pages.
132. **Explain the 'Fluent Interface' pattern in POM.**
    *   Methods return `this` (the page object itself), allowing you to chain actions: `await page.fill().click().verify()`.
133. **What is 'Dependency Injection' in Playwright?**
    *   Passing the `page` or `request` instances into Page Object constructors to maintain a single session.
134. **Explain the 'Factory Pattern' for Page Objects.**
    *   A class or function that returns the correct Page Object based on the current URL or application state.
135. **Why use 'Fixtures' instead of 'Base Class' for inheritance?**
    *   Composition over Inheritance. Fixtures avoid the 'Diamond Problem' and allow for more modular, reusable setup code.
136. **What is the 'Builder Pattern' for test data?**
    *   A class that builds complex data objects step-by-step, making tests more readable: `new UserBuilder().withAdminRole().build()`.
137. **How do you implement a 'Service Layer' in automation?**
    *   By creating classes that handle business logic or API interactions, separate from UI Page Objects.
138. **What is 'Static Analysis' and how does it help?**
    *   Using tools like `ESLint` and `Prettier` to find code smells and enforce standards without running the code.
139. **Explain 'Environment Layering'.**
    *   Using a central config to handle URLs and credentials for Dev, Test, and Staging without hardcoding string values.
140. **What is a 'Wrapper' function?**
    *   A function that wraps around Playwright commands to add logging, custom errors, or automatic retries.
141. **How do you handle 'Global Teardown'?**
    *   A script that runs once after all tests finish, used for cleaning up databases or closing external connections.
142. **What is 'Custom Matchers' in Jest/Expect?**
    *   Extending the `expect` library with your own assertions, like `expect(locator).toHaveValidPrice()`.
143. **Explain the 'Strategy Pattern' for multi-platform tests.**
    *   Defining different interaction strategies for Mobile vs Desktop and selecting the right one at runtime.
144. **What is 'Data Provisoning'?**
    *   The process of ensuring a test has the exact data it needs before it starts, often done via direct DB access or API.
145. **Explain the 'State Machine' pattern for complex flows.**
    *   Modeling the UI as a set of states (LoggedOut, Home, Checkout) to ensure the test follows a valid transition.

---

## 🚀 Category 12: Performance & Troubleshooting (146-160)

146. **How do you identify slow tests in Playwright?**
    *   Use the `--debug` mode or view the 'Duration' column in the HTML report.
147. **What is 'Worker' in Playwright and how does it impact performance?**
    *   A worker is a separate OS process. More workers mean more parallel tests, but consume more CPU/RAM.
148. **How do you handle 'Zombie' processes?**
    *   Playwright usually cleans up; in CI, we use `--ipc=host` and proper Docker signal handling to ensure browsers close.
149. **Explain the `trace: 'on-all-retries'` setting.**
    *   It captures a trace only when a test fails and is retried, saving disk space while providing debug data for flaky tests.
150. **How do you test site performance (Lighthouse) with Playwright?**
    *   Use the `playwright-lighthouse` plugin to run audits on SEO, Best Practices, and Performance scores.
151. **What causes 'Execution Context Created/Destroyed' errors?**
    *   Usually happens if the page navigates or reloads while a locator is still trying to perform an action.
152. **How do you handle 'Slow' environments (e.g., legacy apps)?**
    *   Increase the global timeout and action timeouts in `playwright.config.ts`.
153. **What is the `page.dispatchEvent()` method?**
    *   It bypasses Playwright’s actionability checks to fire a raw DOM event (like 'click' or 'blur') directly on the element.
154. **How do you find which locator is 'Obscuring' another?**
    *   Look at the Playwright Error log; it explicitly states which element intercepted the pointer events.
155. **Explain 'Parallelism' vs 'Sharding'.**
    *   Parallelism happens on one machine (multiple workers). Sharding happens across multiple machines (multiple CI jobs).
156. **How do you debug tests that pass locally but fail in CI?**
    *   Run CI with `trace: 'on'` and compare the CI trace with a local trace to find timing or environment differences.
157. **What is the `test.slow()` annotation?**
    *   It triples the timeout for a specific test, signaling it is expected to take longer than average.
158. **How do you handle 'Memory Leaks' in long-running suites?**
    *   Ensure each test uses a fresh `BrowserContext` and verify that no large objects are held in global variables.
159. **Explain `page.evaluate()`.**
    *   It lets you run a script in the context of the browser page (e.g., to check `window` variables or trigger JS functions).
160. **How do you check for console errors during a test?**
    *   `page.on('console', msg => { if (msg.type() === 'error') throw new Error(msg.text()); })`.

---

## 📱 Category 13: Mobile & Cross-Browser (161-175)

161. **How do you emulate a mobile device in Playwright?**
    *   Use `devices['iPhone 13']` from `@playwright/test` and spread it into the project configuration.
162. **What is the difference between 'Emulation' and 'Real Device' testing?**
    *   Emulation overrides viewport and user-agent in a desktop browser. Real device testing runs on the actual hardware.
163. **How do you handle 'Touch' events?**
    *   Ensure `hasTouch: true` is set in the context, then use standard `click()` (which triggers touch events if enabled).
164. **Can you run Playwright tests on Safari?**
    *   You run them on 'WebKit', which is the engine powering Safari.
165. **How do you test 'Landscape' vs 'Portrait' mode?**
    *   Set the `viewport` dimensions in the test or project config (e.g., `{ width: 1280, height: 720 }`).
166. **What is the `userAgent` property?**
    *   A string that tells the server which browser and OS is visiting, used to trigger mobile-specific layouts.
167. **How do you handle 'Responsive' design testing?**
    *   Iterate through an array of viewports and run the same test assertions against each.
168. **Explain the `isMobile` context option.**
    *   It tells the browser to act like a mobile device (affects things like scrollbars and meta tags).
169. **How do you test 'Hover' on mobile? (Tricky!)**
    *   Since mobile doesn't have true hover, you test the behavior triggered by a 'Long Press' or first tap.
170. **What is 'Cross-Browser' testing?**
    *   Running the same test logic against Chromium, WebKit, and Firefox to ensure consistent behavior.
171. **How do you handle 'Not Supported' features on specific browsers?**
    *   Use `test.skip(browserName === 'webkit', 'Not supported')` to bypass tests that won't pass due to browser engine limitations.
172. **Explain the `colorScheme` option.**
    *   Allows you to test 'Dark Mode' vs 'Light Mode' UI logic (`colorScheme: 'dark'`).
173. **How do you test 'Offline' mode?**
    *   `await context.setOffline(true);` allows you to verify the app's 'service unavailable' or 'cached' behavior.
174. **What is 'Pixel Ratio'?**
    *   High-density displays (Retina) have a `deviceScaleFactor` of 2 or 3. Playwright can emulate this for crisp visual tests.
175. **How do you bypass 'Insecure' site warnings on Firefox?**
    *   Specific Firefox preferences can be set in `launchOptions` within the config file.

---

## 🛠️ Category 14: Tools & Ecosystem (176-190)

176. **What is `npm ci` and why use it in Jenkins?**
    *   It installs exact versions from `package-lock.json`, making builds faster and more predictable than `npm install`.
177. **What is `dotenv` used for?**
    *   To load environment variables from a `.env` file into `process.env`.
178. **What is the function of `Prettier`?**
    *   An opinionated code formatter that ensures consistent code style across the team.
179. **How does `Husky` help in a project?**
    *   It sets up Git Hooks (like `pre-commit`) to run linting or tests before code is allowed to be committed.
180. **Explain `lint-staged`.**
    *   Used with Husky to run linting only on the files that have been changed, saving time.
181. **What is `Allure Commandline`?**
    *   A tool used to process `allure-results` and generate the final `allure-report` website.
182. **Explain the `package-lock.json` file.**
    *   It locks the dependency tree, ensuring every developer and CI runner has the exact same versions of packages.
183. **What is `Faker.js` (dev-faker)?**
    *   A utility for generating massive amounts of fake but realistic data (names, emails, addresses).
184. **What is `Log4js`?**
    *   A logging library used to create structured logs (Info, Error, Debug) that are easier to parse than `console.log`.
185. **Explain 'Semantic Versioning' (SemVer).**
    *   The `Major.Minor.Patch` format for package versions (e.g., `^1.2.3`).
186. **What is the `scripts` section in `package.json`?**
    *   Shortcuts for terminal commands (e.g., `"test": "npx playwright test"`).
187. **How do you use `xlsx` or `csv-parse`?**
    *   To read and parse external test data files for data-driven testing.
188. **What is `ts-node`?**
    *   An execution engine that allows you to run TypeScript files directly without manual compilation to JS.
189. **What is a 'Peer Dependency'?**
    *   A package that your project needs, but expects the user of your project to install.
190. **Explain `npm audit`.**
    *   A command that checks your dependencies for known security vulnerabilities.

---

## 👩‍💻 Category 15: Soft Skills & Team Strategy (191-200)

191. **How do you choose what to automate vs manual test?**
    *   Automate: Repetitive tasks, smoke tests, high-risk flows. Manual: Exploratory, UI/UX feel, one-time features.
192. **How do you handle a massive backlog of failing automation tests?**
    *   Prioritize by P0/Smoke flows. Quarantine flaky tests with `test.fixme()`. Fix, verify, and re-enable.
193. **How do you present automation results to non-technical managers?**
    *   Focus on the 'Pass Rate' trend, 'Time Saved', and 'Critical Bugs' caught by the framework.
194. **Describe the 'Automation Pyramid'.**
    *   A strategy focusing on many low-level Unit tests, fewer Integration tests, and even fewer E2E UI tests.
195. **How do you review an automation PR?**
    *   Check for hardcoded values, proper locator strategy, clean POM structure, and meaningful assertions.
196. **What is 'Shift Left' testing?**
    *   Involving testing earlier in the lifecycle, such as running automation on local branches before merging to main.
197. **How do you keep up with automation trends?**
    *   Reading Playwright release notes, attending webinars, and contributing to community forums.
198. **What is 'Test Debt'?**
    *   The cost of maintaining outdated, slow, or poorly written tests that slow down the development cycle.
199. **How do you handle a developer who says 'It works on my machine'?**
    *   Provide them with the **Playwright Trace** and the **Docker image** to prove the failure in a consistent environment.
200. **Why is 'Naming Convention' important for tests?**
    *   Clear names like `should_allow_booking_with_valid_dates` make it easy to identify failures in large CI reports.
