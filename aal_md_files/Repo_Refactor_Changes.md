# Refactoring Plan – Adding Latest Playwright Features

This document explains what refactoring and enhancements would be applied to the existing Playwright + TypeScript BDD repository to align it with modern best practices.

---

## 1. Add Global Setup for Authentication Reuse

### Change Made
Introduce `global-setup.ts` to perform login once and store session state.

```typescript
import { chromium } from '@playwright/test';

async function globalSetup() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(process.env.BASE_URL!);
  await page.fill('#username', process.env.USER!);
  await page.fill('#password', process.env.PASS!);
  await page.click('#login');

  await context.storageState({ path: 'auth.json' });
  await browser.close();
}
export default globalSetup;
```

### Benefit
- Avoid repeated login
- Faster execution
- Stable sessions

---

## 2. Implement Trace on Failure

### Change
Enable tracing in `playwright.config.ts`

```typescript
use: {
  trace: 'retain-on-failure',
  screenshot: 'only-on-failure',
  video: 'retain-on-failure'
}
```

### Benefit
- Easier debugging
- Rich failure artifacts

---

## 3. Introduce APIRequestContext Fixtures

### Change
Add reusable API fixture

```typescript
test.extend({
  api: async ({ request }, use) => {
    await use(request);
  }
});
```

### Benefit
- Clean API testing
- Reusable context

---

## 4. Add Network Interception Utilities

### Change
Create `networkUtil.ts`

```typescript
export async function blockAds(page: Page) {
  await page.route('**/*ads*', r => r.abort());
}
```

### Benefit
- Faster tests
- Controlled environments

---

## 5. Improve Parallel Execution

### Change
Update config:

```typescript
workers: process.env.CI ? 4 : 2
```

### Benefit
- Optimized CI runs

---

## 6. Add Sharding Support

### Change

```bash
npx playwright test --shard=1/3
```

### Benefit
- Distributed execution in CI

---

## 7. Replace Hard Waits

### Change
Remove any `waitForTimeout` and replace with web-first assertions.

```typescript
await expect(locator).toBeVisible();
```

### Benefit
- More stable tests

---

## 8. Component Testing Support

### Change
Add component testing configuration for React/Vue components.

### Benefit
- Unit + UI testing in same tool

---

## 9. Centralized Environment Handling

### Change
Introduce `.env` support and config loader.

### Benefit
- Multiple environments supported

---

## 10. Enhanced Reporters

### Change
Add Allure reporter plugin.

```bash
npx playwright test --reporter=line,allure-playwright
```

### Benefit
- Rich reporting

---

# Summary of Refactoring

| Area | Improvement |
|-----|------------|
| Auth | Storage state reuse |
| Debugging | Trace on failure |
| API | Dedicated fixtures |
| Stability | Web-first assertions |
| CI | Sharding & workers |
| Reporting | Allure integration |
| Maintainability | Utilities and env config |

---

### Final Result

After these changes the repository will:

- Execute faster  
- Be easier to debug  
- Support scalable CI/CD  
- Use the latest Playwright best practices  

---

End of Document
