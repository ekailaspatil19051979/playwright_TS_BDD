import { test } from '@playwright/test';

test('find endpoint', async ({ page }) => {
    page.on('request', request => {
        if (request.method() === 'POST') {
            console.log('POST Request:', request.url());
        }
    });

    await page.goto('https://automationintesting.online/');
    await page.fill('input[placeholder="Name"]', 'Test User');
    await page.fill('input[placeholder="Email"]', 'test@example.com');
    await page.fill('input[placeholder="Phone"]', '01234567890');
    await page.fill('input[placeholder="Subject"]', 'Test Subject');
    // Using a more generic selector if #description fails
    const description = page.locator('#description, textarea');
    await description.first().fill('This is a test message to find the API endpoint.');

    await page.click('button#submitContact');
    await page.waitForTimeout(3000);
});
