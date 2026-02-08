import { Page, Locator } from '@playwright/test';

export class BookingPage {
    readonly page: Page;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly openBookingButton: Locator;
    readonly submitBookingButton: Locator;
    readonly errorMessages: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstNameInput = page.getByPlaceholder('First Name');
        this.lastNameInput = page.getByPlaceholder('Last Name');
        this.openBookingButton = page.getByRole('button', { name: 'Book this room' });
        this.submitBookingButton = page.getByRole('button', { name: 'Book', exact: true });
        this.errorMessages = page.getByRole('alert');
    }

    async goto() {
        await this.page.goto('/');
        // Check if page is 404
        if (await this.page.getByText('404: This page could not be found').isVisible()) {
            throw new Error('Page not found (404)');
        }
    }

    async openBookingForm() {
        await this.openBookingButton.first().click();
    }

    async fillBookingDetails(firstName: string, lastName: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        // Add other fields if necessary
    }

    async submitBooking() {
        await this.submitBookingButton.click();
    }

    async verifyErrors() {
        await this.errorMessages.first().waitFor();
    }
}
