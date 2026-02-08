import { test } from '@playwright/test';

test('check html', async ({ page }) => {
    await page.goto('https://automationintesting.online/#/admin');
    await page.waitForSelector('#username', { timeout: 10000 });
    const username = await page.locator('#username').evaluate(el => el.outerHTML);
    const password = await page.locator('#password').evaluate(el => el.outerHTML);
    const login = await page.locator('#doLogin').evaluate(el => el.outerHTML);
    console.log('Username HTML:', username);
    console.log('Password HTML:', password);
    console.log('Login HTML:', login);
});
