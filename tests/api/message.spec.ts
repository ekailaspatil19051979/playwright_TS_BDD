import { test, expect } from '@playwright/test';

test.describe('API Automation - Message/Contact', () => {

    const BASE_URL = 'https://automationintesting.online';

    test('Create Message with missing fields', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/message/`, {
            data: {
                name: "Jim"
                // Missing email, phone, subject, description
            }
        });
        console.log('DEBUG STATUS: ' + response.status());
        expect(response.status()).toBe(400);
    });

    test('Create Message with invalid email', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/message/`, {
            data: {
                name: "Jim Beam",
                email: "invalid-email",
                phone: "01234567890",
                subject: "Inquiry",
                description: "Testing invalid email via API"
            }
        });
        expect(response.status()).toBe(400);
    });

    test('Create Message with short phone number', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/message/`, {
            data: {
                name: "Jim Beam",
                email: "jim@example.com",
                phone: "123", // Too short
                subject: "Inquiry",
                description: "Testing short phone via API"
            }
        });
        expect(response.status()).toBe(400);
    });
});
