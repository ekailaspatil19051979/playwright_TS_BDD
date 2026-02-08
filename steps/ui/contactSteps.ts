import { Given, When, Then } from '@cucumber/cucumber';
import { pageFixture } from '../../fixtures/pageFixture';
import { ContactPage } from '../../pages/ContactPage';
import { DataFactory } from '../../utils/DataFactory';

let contactPage: ContactPage;

When('I submit the contact form with dynamic data', async function () {
    contactPage = new ContactPage(pageFixture.page);
    const details = DataFactory.getContactDetails();
    await contactPage.submitContactForm({
        name: details.name,
        email: details.email,
        phone: details.phone,
        subject: details.subject,
        message: details.message
    });
    // Store name for verification if needed
    this.dynamicName = details.name;
});

When('I submit the contact form with the following details:', async function (dataTable) {
    contactPage = new ContactPage(pageFixture.page);
    const data = dataTable.rowsHash();
    await contactPage.submitContactForm({
        name: data.name,
        email: data.email,
        phone: data.phone,
        subject: data.subj,
        message: data.msg
    });
});

When('I submit the contact form with {string}, {string}, {string}, {string}, {string}', async function (name, email, phone, subject, message) {
    contactPage = new ContactPage(pageFixture.page);
    await contactPage.submitContactForm({
        name,
        email,
        phone,
        subject,
        message
    });
});

Then('I should see a success message for {string}', async function (name) {
    await contactPage.verifySuccess(name);
});

Then('I should see an error message on the contact form', async function () {
    await contactPage.verifyErrorVisible();
});
