import { Before, After, BeforeAll, AfterAll, Status } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext, Page } from '@playwright/test';
import { pageFixture } from './pageFixture';
import { logger } from '../utils/Logger';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../configs', '.env.dev') });

import { saveStorageState } from '../utils/authHelper';
import fs from 'fs';

let browser: Browser;
let context: BrowserContext;

BeforeAll(async function () {
    browser = await chromium.launch({
        headless: true,
        args: ['--remote-debugging-port=9222']
    });
    // Ensure storage state is generated
    if (!fs.existsSync('configs/storageState.json')) {
        await saveStorageState();
    }
});


AfterAll(async function () {
    await browser.close();
});

Before(async function ({ pickle }) {
    logger.info(`🎬 Starting Scenario: ${pickle.name}`);
    const isAdmin = pickle.tags.some(tag => tag.name === '@admin');
    const options: any = {
        baseURL: process.env.BASE_URL_UI || 'https://automationintesting.online/'
    };

    if (isAdmin) {
        options.storageState = 'configs/storageState.json';
    }

    context = await browser.newContext(options);
    const page = await context.newPage();
    pageFixture.page = page;
});


After(async function ({ pickle, result }) {
    if (result?.status == Status.FAILED) {
        logger.error(`❌ Scenario Failed: ${pickle.name}`);
        const img = await pageFixture.page.screenshot({ path: `./reports/screenshots/${pickle.name}.png`, type: "png" });
        await this.attach(img, "image/png");
    } else {
        logger.info(`✅ Scenario Passed: ${pickle.name}`);
    }
    await pageFixture.page.close();
    await context.close();
});
