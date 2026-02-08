# Playwright Locator Refactor & Migration Guide

This guide provides a comprehensive strategy for refactoring legacy locators (XPath, CSS, ID-based) to modern, resilient Playwright best-practice locators.

---

## 1. Analysis Strategy: Auditing & Prioritization
To migrate effectively without breaking the suite, follow this 4-step audit:

1.  **Search Audit**: Use `grep` or VS Code Global Search to count occurrences of `//`, `.`, and `#` within `locator()` calls.
2.  **Categorization by Risk**:
    *   **High Risk**: Absolute XPaths (`/html/body/...`) and index-based selectors (`div[3]`). These fail on almost any UI shift.
    *   **Medium Risk**: Brittle CSS classes (`.btn-primary.large-padding-2`) and generated dynamic IDs (`id="user-1284-ae"`).
    *   **Low Risk**: Stable static IDs or specific text selectors.
3.  **Prioritization**: Start with the **Smoke Test Suite** and **Common Components** (Navbar, Footer, Login).
4.  **Logging**: Create a tracking sheet (or use Jira) to mark Pages as "Audited", "In-Progress", or "Modernized".

---

## 2. Locator Replacement Rules (Strict Mapping)

| Legacy Locator Strategy | Modern Playwright Replacement | Why? |
| :--- | :--- | :--- |
| **Absolute XPath** | `getByRole()` | Follows accessibility tree; most resilient. |
| **Dynamic IDs / Indexes** | `getByTestId()` | Decouples tests from UI logic; dedicated to testing. |
| **CSS Classes (Styling)** | `getByLabel()` / `getByPlaceholder()` | Tests the user interface, not the design code. |
| **Attribute Selectors** | `getByAltText()` / `getByTitle()` | Ensures visual assets are present and accessible. |
| **Complex Logic** | `locator().filter()` | Chains locators logically rather than using complex strings. |

---

## 3. Automated Refactor Approach
Instead of manual edits, use these developer-focused methods:

### A. Regex Search (VS Code)
Find all XPath locators across the project:
`locator\(['"](\/\/|\.\.).*?['"]\)`

### B. Identification of Brittle CSS
Find locators using generic classes:
`locator\(['"]\.[a-zA-Z-_\s]*?['"]\)`

### C. Creating a Locator Utility (Optional)
Centralize common patterns in `utils/LocatorHelper.ts`:
```typescript
export const getSubmitButton = (page: Page) => page.getByRole('button', { name: /submit|save/i });
```

---

## 4. Practical Conversion Examples (20 Real-World Scenarios)

### Buttons & Actions
1.  **❌ Legacy**: `page.locator('//button[@id="submit"]')`
    **✅ Modern**: `page.getByRole('button', { name: 'Submit' })`
2.  **❌ Legacy**: `page.locator('.btn-primary')`
    **✅ Modern**: `page.getByRole('button', { name: 'Save Changes' })`

### Forms & Inputs
3.  **❌ Legacy**: `page.locator('#first_name')`
    **✅ Modern**: `page.getByLabel('First Name')`
4.  **❌ Legacy**: `page.locator('input[placeholder="Enter your email"]')`
    **✅ Modern**: `page.getByPlaceholder('Enter your email')`
5.  **❌ Legacy**: `page.locator('input[type="checkbox"]').nth(2)`
    **✅ Modern**: `page.getByRole('checkbox', { name: 'I agree to terms' })`

### Tables & Lists
6.  **❌ Legacy**: `page.locator('//table/tr[3]/td[2]')`
    **✅ Modern**: `page.getByRole('row', { name: 'John Doe' }).getByRole('cell').nth(1)`
7.  **❌ Legacy**: `page.locator('li.active')`
    **✅ Modern**: `page.getByRole('listitem').filter({ hasText: 'Dashboard' })`

### Navigation & Links
8.  **❌ Legacy**: `page.locator('a[href="/contact"]')`
    **✅ Modern**: `page.getByRole('link', { name: 'Contact Us' })`
9.  **❌ Legacy**: `page.locator('header nav i.fa-home')`
    **✅ Modern**: `page.getByRole('navigation').getByRole('link', { name: 'Home' })`

### Modals & Overlays
10. **❌ Legacy**: `page.locator('.modal-header h2')`
    **✅ Modern**: `page.getByRole('heading', { name: 'Confirm Delete' })`
11. **❌ Legacy**: `page.locator('#close-x')`
    **✅ Modern**: `page.getByRole('button', { name: 'Close' })`

### Images & Assets
12. **❌ Legacy**: `page.locator('img[src*="logo"]')`
    **✅ Modern**: `page.getByAltText('Company Logo')`
13. **❌ Legacy**: `page.locator('span[title="Help"]')`
    **✅ Modern**: `page.getByTitle('Help')`

### Specialized Selectors
14. **❌ Legacy**: `page.locator('//div[contains(@class, "alert-success")]')`
    **✅ Modern**: `page.getByText('Message sent successfully')`
15. **❌ Legacy**: `page.locator('[data-automation-id="user-profile"]')`
    **✅ Modern**: `page.getByTestId('user-profile')`
16. **❌ Legacy**: `page.locator('input:disabled')`
    **✅ Modern**: `page.getByRole('textbox').and(page.locator(':disabled'))`

### Complex Filters
17. **❌ Legacy**: `page.locator('//div[@class="card"][./h3[text()="Gold Package"]]//button')`
    **✅ Modern**: `page.locator('.card').filter({ has: page.getByRole('heading', { name: 'Gold Package' }) }).getByRole('button')`

### Dynamic Content
18. **❌ Legacy**: `page.locator('#item-list > div:last-child')`
    **✅ Modern**: `page.getByRole('listitem').last()`
19. **❌ Legacy**: `page.locator('input:focus')`
    **✅ Modern**: `page.locator('input').and(page.locator(':focus'))`
20. **❌ Legacy**: `page.locator('.error-msg >> text=Required')`
    **✅ Modern**: `page.getByText('Required').and(page.locator('.error-msg'))`

---

## 5. Framework Level Changes
To support modern locators at scale:

*   **Page Object Model (POM)**: Move from `locator('#id')` to properties that return Playwright locators:
    ```typescript
    get submitBtn() { return this.page.getByRole('button', { name: 'Submit' }); }
    ```
*   **Central test-id Registry (Optional)**: If using `getByTestId`, maintain a list of IDs to ensure consistency between Dev and QA.
*   **BaseComponent Class**: Create a base class for shared components (Header, Sidebar) that uses role-based locators to work across different pages.

---

## 6. Step-by-Step Migration Plan
1.  **Phase 1 (Preparation)**: Configure `testIdAttribute: 'data-testid'` (or your custom attribute) in `playwright.config.ts`.
2.  **Phase 2 (POC)**: Refactor a single low-impact page (e.g., "About Us") to validate the new style.
3.  **Phase 3 (Critical Path)**: Refactor locators in the Login and Checkout flows.
4.  **Phase 4 (Legacy Cleanup)**: Systematically remove XPath/brittle CSS from the remaining pages.

---

## 7. Validation Strategy
*   **Parallel Execution**: Run the refactored branch against the current main branch in CI.
*   **Trace Comparison**: Use Playwright Trace Viewer to ensure the "Target highlighted" in the new locator matches exactly what the old locator was hitting.
*   **Regression Suite**: Ensure no `TimeoutError` occurs, which would indicate a broken locator.

---

## 8. Anti-Patterns to Remove
*   **`page.waitForTimeout(n)`**: Replace with locator-based waiting (e.g., `toBeVisible()`).
*   **Complexity over Clarity**: Avoid `//div/div/span/a`. Use `page.getByRole('link', { name: 'click here' })`.
*   **Indices**: Never use `.nth(3)` if you can use `.filter({ hasText: 'Item Name' })`.

---

## 9. New Locator Standards Document (For PR Reviews)
1.  **Priority 1**: `getByRole` (Ensures Accessibility + Stability).
2.  **Priority 2**: `getByLabel` / `getByPlaceholder` / `getByTestId`.
3.  **Priority 3**: `getByText`.
4.  **Priority 4**: CSS Selectors (Only if role/id is unavailable).
5.  **Strictly Prohibited**: Absolute XPath and nth-child indices.

**Naming Convention**: All locators should be named after their role or function (e.g., `loginButton`, `emailInput`), not their implementation (e.g., `blueButton`, `div3`).

---

## 10. Handling Ambiguity (Mastering Strict Mode)
Playwright locators are "strict" by default. If a locator matches multiple elements, the test will fail. Use these methods to resolve matches:

### A. Using `.filter()`
Narrow down a list by inner text or another locator:
```typescript
// Finds the row containing 'John Doe' and then finds the 'Edit' button within it
page.getByRole('row').filter({ hasText: 'John Doe' }).getByRole('button', { name: 'Edit' });
```

### B. Using `.and()`
Chain two locators that must both match the same element:
```typescript
// Matches a button that has the text 'Confirm' AND a specific CSS class
page.getByRole('button').and(page.locator('.primary-action'));
```

### C. Using `.first()`, `.last()`, or `.nth()`
*Warning: Use sparingly. Filters are preferred.*
```typescript
page.getByRole('listitem').first();
```

---

## 11. Complex Table & Sibling Navigation
Navigation in tables is the most common cause of brittle XPaths. Use the **"Anchor & Scope"** pattern:

| Goal | Modern Strategy |
| :--- | :--- |
| **Cell in specific row** | `page.getByRole('row', { name: 'Order #123' }).getByRole('cell').nth(2)` |
| **Button next to text** | `page.locator('div').filter({ hasText: 'Settings' }).getByRole('switch')` |
| **Footer of a specific card** | `page.locator('.card').filter({ has: page.getByRole('heading', { name: 'Pro' }) }).locator('.card-footer')` |

---

## 12. Handling iFrames & Shadow DOM
Playwright pierces Shadow DOM automatically, but **iFrames** require explicit switching.

### iFrames (e.g., Stripe, Chatbots)
```typescript
// Define the frame once
const stripeFrame = page.frameLocator('iframe[name="stripe-card"]');
// Use it just like a page object
await stripeFrame.getByPlaceholder('Card number').fill('4242...');
```

---

## 13. The A11y-First Checklist
When choosing a locator, ask yourself:
1.  **Is it a Button?** Use `getByRole('button')`. If Playwright can't find it, the `role="button"` or `<button>` tag might be missing (A11y bug!).
2.  **Is it an Input?** Use `getByLabel()`. If it fails, the `<label>` is not correctly linked to the `<input>` via `for/id` (A11y bug!).
3.  **Is it an Image?** Use `getByAltText()`. If missing, the `alt` attribute is empty (A11y bug!).

*By following these standards, your tests act as an automated accessibility monitor.*

---

## 14. Debugging New Locators (Pro Tips)

### A. The `pick selector` tool
Run `npx playwright codegen` and use the "Record" and "Explore" modes to see what Playwright suggests for any element.

### B. Visual Debugging
Execute with `PWDEBUG=1` to open the Playwright Inspector. You can type locators in the console to see them highlight in real-time.

### C. The Console API
Inside the browser console (during a paused test):
```javascript
// Test if your locator works
await playwright.inspect('getByRole("button", { name: "Submit" })')
```
