import { Given, When, Then } from '@cucumber/cucumber';
import { pageFixture } from '../../fixtures/pageFixture';
import { LoginPage } from '../../pages/LoginPage';
import { AdminPage } from '../../pages/AdminPage';
import { MessageAPI } from '../../services/MessageAPI';
import { request } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config({ path: 'configs/.env.dev' });

let loginPage: LoginPage;
let adminPage: AdminPage;

Given('I am on the admin login page', async function () {
    loginPage = new LoginPage(pageFixture.page);
    await loginPage.goto();
});

When('I login with valid credentials', async function () {
    await loginPage.login(process.env.AUTH_USERNAME || 'admin', process.env.AUTH_PASSWORD || 'password');
    adminPage = new AdminPage(pageFixture.page);
});

Then('I should see the admin dashboard', async function () {
    await adminPage.verifyDashboardVisible();
});

When('I navigate to the inbox', async function () {
    await adminPage.goToInbox();
});

Then('I should see the message with subject {string}', async function (subject: string) {
    await adminPage.verifyNewMessageExists(subject);
});

Given('I create a message via API with subject {string}', async function (subject: string) {
    const apiRequestContext = await request.newContext();
    const messageApi = new MessageAPI(apiRequestContext);
    await messageApi.createMessage(
        'Hybrid User',
        'hybrid@test.com',
        '01234567890',
        subject,
        'Testing system integration via Playwright Hybrid automation.'
    );
    await apiRequestContext.dispose();
});

When('I login with username {string} and password {string}', async function (username, password) {
    await loginPage.login(username, password);
});

Then('I should see an error message on the login page', async function () {
    await loginPage.verifyError();
});
