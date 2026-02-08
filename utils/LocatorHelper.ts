import { Page, Locator } from '@playwright/test';

/**
 * LocatorHelper: Centralized utility for common, reusable locator patterns.
 * This prevents duplication across Page Objects and ensures consistency.
 */
export class LocatorHelper {
    /**
     * Common button patterns with flexible name matching
     */
    static getSubmitButton(page: Page): Locator {
        return page.getByRole('button', { name: /submit|save|confirm/i });
    }

    static getCancelButton(page: Page): Locator {
        return page.getByRole('button', { name: /cancel|close|dismiss/i });
    }

    static getDeleteButton(page: Page): Locator {
        return page.getByRole('button', { name: /delete|remove/i });
    }

    static getEditButton(page: Page): Locator {
        return page.getByRole('button', { name: /edit|modify|update/i });
    }

    /**
     * Navigation elements
     */
    static getNavLink(page: Page, linkName: string): Locator {
        return page.getByRole('navigation').getByRole('link', { name: linkName });
    }

    static getBreadcrumb(page: Page, text: string): Locator {
        return page.getByRole('navigation').getByText(text);
    }

    /**
     * Form elements with semantic labels
     */
    static getEmailInput(page: Page): Locator {
        return page.getByLabel(/email/i).or(page.getByPlaceholder(/email/i));
    }

    static getPasswordInput(page: Page): Locator {
        return page.getByLabel(/password/i).or(page.getByPlaceholder(/password/i));
    }

    static getPhoneInput(page: Page): Locator {
        return page.getByLabel(/phone|mobile|telephone/i).or(page.getByPlaceholder(/phone|mobile/i));
    }

    /**
     * Table navigation using the "Anchor & Scope" pattern
     */
    static getRowByText(page: Page, text: string): Locator {
        return page.getByRole('row').filter({ hasText: text });
    }

    static getCellInRow(page: Page, rowText: string, cellIndex: number): Locator {
        return this.getRowByText(page, rowText).getByRole('cell').nth(cellIndex);
    }

    static getButtonInRow(page: Page, rowText: string, buttonName: string): Locator {
        return this.getRowByText(page, rowText).getByRole('button', { name: buttonName });
    }

    /**
     * Modal/Dialog patterns
     */
    static getModal(page: Page): Locator {
        return page.getByRole('dialog').or(page.locator('[role="dialog"]'));
    }

    static getModalHeading(page: Page, headingText: string): Locator {
        return this.getModal(page).getByRole('heading', { name: headingText });
    }

    static getModalCloseButton(page: Page): Locator {
        return this.getModal(page).getByRole('button', { name: /close|×/i });
    }

    /**
     * Alert/Error message patterns
     */
    static getSuccessMessage(page: Page): Locator {
        return page.getByRole('alert').filter({ hasText: /success|complete|confirmed/i });
    }

    static getErrorMessage(page: Page): Locator {
        return page.getByRole('alert').or(page.locator('.alert-danger, .error, [role="alert"]'));
    }

    /**
     * Card/Section patterns
     */
    static getCardByHeading(page: Page, headingText: string): Locator {
        return page.locator('.card, [class*="card"]').filter({
            has: page.getByRole('heading', { name: headingText })
        });
    }

    static getCardFooter(page: Page, headingText: string): Locator {
        return this.getCardByHeading(page, headingText).locator('.card-footer, [class*="footer"]');
    }

    /**
     * List patterns
     */
    static getListItemByText(page: Page, text: string): Locator {
        return page.getByRole('listitem').filter({ hasText: text });
    }

    /**
     * Checkbox/Radio patterns with labels
     */
    static getCheckboxByLabel(page: Page, labelText: string): Locator {
        return page.getByRole('checkbox', { name: labelText });
    }

    static getRadioByLabel(page: Page, labelText: string): Locator {
        return page.getByRole('radio', { name: labelText });
    }

    /**
     * Dropdown/Select patterns
     */
    static getSelectByLabel(page: Page, labelText: string): Locator {
        return page.getByLabel(labelText);
    }

    static getComboboxByLabel(page: Page, labelText: string): Locator {
        return page.getByRole('combobox', { name: labelText });
    }

    /**
     * Loading/Spinner detection
     */
    static getLoadingSpinner(page: Page): Locator {
        return page.locator('[class*="spinner"], [class*="loading"], [aria-busy="true"]');
    }

    /**
     * Wait for loading to complete
     */
    static async waitForLoadingComplete(page: Page, timeout: number = 10000): Promise<void> {
        await this.getLoadingSpinner(page).waitFor({ state: 'hidden', timeout }).catch(() => {
            // Ignore if spinner doesn't exist
        });
    }
}
