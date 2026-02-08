import { Page, Locator, expect } from '@playwright/test';

export class AdminPage {
    readonly page: Page;
    readonly logoutButton: Locator;
    readonly inboxIcon: Locator;
    readonly roomsLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.logoutButton = page.getByRole('link', { name: 'Logout' });
        this.inboxIcon = page.getByRole('link', { name: /inbox/i });
        this.roomsLink = page.getByRole('link', { name: 'Rooms' });
    }

    async verifyDashboardVisible() {
        await expect(this.logoutButton).toBeVisible();
    }

    async goToInbox() {
        await this.inboxIcon.click();
    }

    async verifyNewMessageExists(subject: string) {
        await expect(this.page.getByText(subject)).toBeVisible();
    }
}
