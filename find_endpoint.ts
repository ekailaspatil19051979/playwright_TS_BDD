import { chromium } from '@playwright/test';

(async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

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
    await page.fill('#description', 'This is a test message to find the API endpoint.');

    await page.click('button:has-text("Submit"), button:has-text("Send")');
    await page.waitForTimeout(5000);

    await browser.close();
})();
