import { chromium } from '@playwright/test';

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('https://automationintesting.online/#/admin');
    await page.waitForSelector('#username', { timeout: 10000 });
    const html = await page.content();
    console.log(html);
    await browser.close();
})();
