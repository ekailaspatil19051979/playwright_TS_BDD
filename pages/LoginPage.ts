import { Page, Locator } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.getByTestId('username');
        this.passwordInput = page.getByTestId('password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
    }

    async goto() {
        await this.page.goto('/#/admin');
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async verifyError() {
        // Semantic check for errors
        await this.page.getByRole('alert').or(this.page.locator('.is-invalid')).first().waitFor();
    }
}
