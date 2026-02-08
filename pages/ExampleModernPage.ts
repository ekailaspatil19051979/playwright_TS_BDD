import { Page } from '@playwright/test';
import { LocatorHelper } from '../utils/LocatorHelper';

/**
 * Example Page Object demonstrating modern locator best practices.
 * This serves as a reference implementation for the refactoring effort.
 */
export class ExampleModernPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // ============================================
    // BUTTONS - Using getByRole with semantic names
    // ============================================

    get submitButton() {
        return LocatorHelper.getSubmitButton(this.page);
    }

    get cancelButton() {
        return LocatorHelper.getCancelButton(this.page);
    }

    get deleteButton() {
        return LocatorHelper.getDeleteButton(this.page);
    }

    // ============================================
    // FORM INPUTS - Using getByLabel (A11y-first)
    // ============================================

    get emailInput() {
        return this.page.getByLabel('Email Address');
        // Alternative: this.page.getByPlaceholder('Enter your email')
    }

    get passwordInput() {
        return this.page.getByLabel('Password');
    }

    get firstNameInput() {
        return this.page.getByLabel('First Name');
    }

    get agreeCheckbox() {
        return this.page.getByRole('checkbox', { name: 'I agree to the terms' });
    }

    // ============================================
    // NAVIGATION - Scoped to navigation role
    // ============================================

    get homeLink() {
        return LocatorHelper.getNavLink(this.page, 'Home');
    }

    get dashboardLink() {
        return LocatorHelper.getNavLink(this.page, 'Dashboard');
    }

    // ============================================
    // TABLES - Using "Anchor & Scope" pattern
    // ============================================

    getUserRow(userName: string) {
        return LocatorHelper.getRowByText(this.page, userName);
    }

    getEditButtonForUser(userName: string) {
        return LocatorHelper.getButtonInRow(this.page, userName, 'Edit');
    }

    getDeleteButtonForUser(userName: string) {
        return LocatorHelper.getButtonInRow(this.page, userName, 'Delete');
    }

    getUserEmail(userName: string) {
        // Assuming email is in the 2nd cell (index 1)
        return LocatorHelper.getCellInRow(this.page, userName, 1);
    }

    // ============================================
    // MODALS/DIALOGS - Using role="dialog"
    // ============================================

    get confirmationModal() {
        return LocatorHelper.getModal(this.page);
    }

    get confirmationModalHeading() {
        return LocatorHelper.getModalHeading(this.page, 'Confirm Action');
    }

    get modalCloseButton() {
        return LocatorHelper.getModalCloseButton(this.page);
    }

    // ============================================
    // ALERTS/MESSAGES - Using role="alert"
    // ============================================

    get successMessage() {
        return LocatorHelper.getSuccessMessage(this.page);
    }

    get errorMessage() {
        return LocatorHelper.getErrorMessage(this.page);
    }

    // ============================================
    // CARDS - Using filter with heading
    // ============================================

    getPricingCard(planName: string) {
        return LocatorHelper.getCardByHeading(this.page, planName);
    }

    getCardButton(planName: string) {
        return this.getPricingCard(planName).getByRole('button', { name: 'Select Plan' });
    }

    // ============================================
    // COMPLEX FILTERS - Chaining locators
    // ============================================

    getActiveListItem(itemText: string) {
        return this.page.getByRole('listitem')
            .filter({ hasText: itemText })
            .and(this.page.locator('[aria-current="page"]'));
    }

    getDisabledButton(buttonName: string) {
        return this.page.getByRole('button', { name: buttonName })
            .and(this.page.locator(':disabled'));
    }

    // ============================================
    // ACTIONS - Demonstrating best practices
    // ============================================

    async fillLoginForm(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
    }

    async submitForm() {
        await this.submitButton.click();
    }

    async deleteUser(userName: string) {
        await this.getDeleteButtonForUser(userName).click();
        await this.confirmationModalHeading.waitFor();
        await this.confirmationModal.getByRole('button', { name: 'Confirm' }).click();
    }

    async selectPricingPlan(planName: string) {
        await this.getCardButton(planName).click();
    }

    async waitForSuccess() {
        await this.successMessage.waitFor();
    }

    // ============================================
    // ASSERTIONS - Using semantic locators
    // ============================================

    async verifyUserExists(userName: string) {
        await this.getUserRow(userName).waitFor();
    }

    async verifyErrorDisplayed() {
        await this.errorMessage.waitFor();
    }
}
