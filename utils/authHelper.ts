import { chromium, BrowserContext } from '@playwright/test';
import * as dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config({ path: 'configs/.env.dev' });

export async function saveStorageState() {
    const storagePath = 'configs/storageState.json';

    // Check if storage state already exists and is not too old (optional)
    // For now, we refresh it if user wants to (or just always for simplicity in this demo)

    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://automationintesting.online/#/admin');
    await page.locator('#username').fill(process.env.AUTH_USERNAME || 'admin');
    await page.locator('#password').fill(process.env.AUTH_PASSWORD || 'password');
    await page.locator('#doLogin').click();

    // Wait for login to complete
    await page.waitForURL('**/admin');
    await page.waitForSelector('#logout');

    await context.storageState({ path: storagePath });
    await browser.close();
    console.log('✅ Storage state saved to ' + storagePath);
}
