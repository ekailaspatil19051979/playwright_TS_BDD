# Locator Refactoring Checklist

Use this checklist when refactoring legacy locators to modern Playwright best practices.

## Pre-Refactoring Audit

- [ ] Run global search for XPath patterns: `locator('//` or `locator("//`
- [ ] Run global search for CSS ID selectors: `locator('#`
- [ ] Run global search for CSS class selectors: `locator('\.`
- [ ] Identify dynamic IDs (e.g., `id="user-1234-abc"`)
- [ ] Document all brittle selectors in a tracking sheet
- [ ] Prioritize by test criticality (Smoke > Regression > Edge Cases)

## Refactoring Process

### For Each Page Object:

- [ ] Open the Page Object file
- [ ] Review each locator property
- [ ] Apply the Locator Priority Hierarchy:
  1. [ ] Can I use `getByRole()`? (Check ARIA roles)
  2. [ ] Can I use `getByLabel()` or `getByPlaceholder()`?
  3. [ ] Can I use `getByTestId()`? (Coordinate with dev team)
  4. [ ] Can I use `getByText()` or `getByAltText()`?
  5. [ ] Last resort: CSS selector with semantic meaning
- [ ] Test the new locator using `LocatorDebugger.highlight()`
- [ ] Verify no strict mode violations (multiple matches)
- [ ] Update the locator property name to be semantic (e.g., `submitButton` not `btn1`)

### For Tables and Lists:

- [ ] Identify the "anchor" text or unique identifier
- [ ] Use `getByRole('row').filter({ hasText: 'anchor' })`
- [ ] Chain with `.getByRole('button')` or `.getByRole('cell')`
- [ ] Avoid `.nth()` unless absolutely necessary
- [ ] Document the table structure in comments

### For Forms:

- [ ] Ensure all inputs have associated `<label>` elements
- [ ] Use `getByLabel()` as the primary strategy
- [ ] Fall back to `getByPlaceholder()` for unlabeled fields
- [ ] Flag missing labels as accessibility bugs
- [ ] Use `getByRole('button', { name: 'Submit' })` for submit buttons

### For Navigation:

- [ ] Use `getByRole('navigation')` to scope to nav area
- [ ] Chain with `getByRole('link', { name: 'Page Name' })`
- [ ] Avoid href-based selectors
- [ ] Test with keyboard navigation (accessibility check)

## Testing Refactored Locators

- [ ] Run the test in headed mode to visually verify
- [ ] Use `PWDEBUG=1` to inspect locators in real-time
- [ ] Run `npx playwright codegen` to validate suggested locators
- [ ] Execute the test 3 times to check for flakiness
- [ ] Review Playwright Trace Viewer to ensure correct element is targeted
- [ ] Run accessibility scan to verify no A11y regressions

## Post-Refactoring Validation

- [ ] All tests pass locally
- [ ] No `strict mode violation` errors
- [ ] No `TimeoutError` on locators
- [ ] Code review completed
- [ ] CI/CD pipeline passes
- [ ] Update documentation with any new patterns discovered
- [ ] Remove old commented-out locators

## Common Pitfalls to Avoid

- [ ] ❌ Don't use absolute XPath (`/html/body/div[3]`)
- [ ] ❌ Don't use styling classes (`.btn-primary-large`)
- [ ] ❌ Don't use generated IDs (`id="user-1234-abc"`)
- [ ] ❌ Don't use `.nth()` when `.filter()` is possible
- [ ] ❌ Don't mix old and new locator styles in the same file
- [ ] ❌ Don't skip the visual verification step

## Success Criteria

- [ ] ✅ All locators use semantic, user-facing attributes
- [ ] ✅ Zero XPath locators remain in the codebase
- [ ] ✅ All form inputs use `getByLabel()` or `getByPlaceholder()`
- [ ] ✅ All buttons use `getByRole('button', { name: '...' })`
- [ ] ✅ Table navigation uses the "Anchor & Scope" pattern
- [ ] ✅ Accessibility score improved or maintained
- [ ] ✅ Test execution time improved or maintained
- [ ] ✅ Zero flaky tests introduced

## Resources

- Playwright Locators Documentation: https://playwright.dev/docs/locators
- ARIA Roles Reference: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles
- `utils/LocatorHelper.ts`: Reusable locator patterns
- `utils/LocatorDebugger.ts`: Debugging utilities
- `LOCATOR_REFACTOR_GUIDE.md`: Comprehensive refactoring guide
