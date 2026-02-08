import { Page, Locator, expect } from '@playwright/test';

/**
 * LocatorDebugger: A utility to help verify and debug Playwright locators 
 * during development and refactoring.
 */
export class LocatorDebugger {
    /**
     * Highlights an element on the page for visual verification.
     * Useful for confirming a refactored locator hits the intended target.
     */
    static async highlight(locator: Locator) {
        await locator.evaluate((el) => {
            const originalStyle = el.style.outline;
            el.style.outline = '5px solid #ff00ff'; // Vibrant Magenta
            el.style.backgroundColor = 'rgba(255, 0, 255, 0.2)';
            setTimeout(() => {
                el.style.outline = originalStyle;
                el.style.backgroundColor = '';
            }, 3000);
        });
    }

    /**
     * Logs the full HTML and visibility state of a locator to the console.
     */
    static async inspect(locator: Locator, description: string = 'Locator') {
        const isVisible = await locator.isVisible();
        const count = await locator.count();
        console.log(`--- [DEBUG: ${description}] ---`);
        console.log(`- Count: ${count}`);
        console.log(`- Visible: ${isVisible}`);

        if (count > 0) {
            const html = await locator.first().evaluate(el => el.outerHTML);
            console.log(`- First Match HTML: ${html}`);
        } else {
            console.log(`- WARN: No element found for this locator.`);
        }
        console.log(`----------------------------------`);
    }

    /**
     * Pauses execution if a locator is not found, allowing for manual inspection.
     * Only runs if not in CI.
     */
    static async pauseIfMissing(page: Page, locator: Locator, name: string) {
        if (!process.env.CI) {
            if (!(await locator.isVisible())) {
                console.error(`ERROR: Locator [${name}] not found. Pausing for inspection...`);
                await LocatorDebugger.inspect(locator, name);
                await page.pause();
            }
        }
    }
}
