import { Page, Locator, expect } from '@playwright/test';

export class ContactPage {
    readonly page: Page;
    readonly nameInput: Locator;
    readonly emailInput: Locator;
    readonly phoneInput: Locator;
    readonly subjectInput: Locator;
    readonly messageInput: Locator;
    readonly submitButton: Locator;
    readonly successMessage: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.nameInput = page.getByPlaceholder('Name');
        this.emailInput = page.getByPlaceholder('Email');
        this.phoneInput = page.getByPlaceholder('Phone');
        this.subjectInput = page.getByPlaceholder('Subject');
        this.messageInput = page.getByTestId('description');
        this.submitButton = page.getByRole('button', { name: 'Submit' });
        this.successMessage = page.getByRole('heading', { name: /Thanks for getting in touch/i });
        this.errorMessage = page.getByRole('alert');
    }

    async submitContactForm(details: { name: string, email: string, phone: string, subject: string, message: string }) {
        await this.nameInput.fill(details.name);
        await this.emailInput.fill(details.email);
        await this.phoneInput.fill(details.phone);
        await this.subjectInput.fill(details.subject);
        await this.messageInput.fill(details.message);
        await this.submitButton.click();
    }

    async verifySuccess(name: string) {
        await expect(this.successMessage).toBeVisible();
        await expect(this.page.getByText(`Thanks for getting in touch ${name}`)).toBeVisible();
    }

    async verifyErrorVisible() {
        await expect(this.errorMessage).toBeVisible();
    }
}
