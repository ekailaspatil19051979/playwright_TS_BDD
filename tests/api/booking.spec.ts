import { test, expect } from '@playwright/test';

test.describe('API Automation - Booking', () => {

    const BASE_URL = process.env.BASE_URL_API || 'https://restful-booker.herokuapp.com';

    test('Get Booking Ids', async ({ request }) => {
        const response = await request.get(`${BASE_URL}/booking`);
        expect(response.ok()).toBeTruthy();
        const bookings = await response.json();
        expect(bookings.length).toBeGreaterThan(0);
    });

    test('Create Booking', async ({ request }) => {
        const bookingData = {
            firstname: "Jim",
            lastname: "Brown",
            totalprice: 111,
            depositpaid: true,
            bookingdates: {
                checkin: "2018-01-01",
                checkout: "2019-01-01"
            },
            additionalneeds: "Breakfast"
        };

        const response = await request.post(`${BASE_URL}/booking`, {
            data: bookingData
        });

        expect(response.ok()).toBeTruthy();
        const responseBody = await response.json();
        expect(responseBody.booking.firstname).toBe("Jim");
        expect(responseBody.booking.lastname).toBe("Brown");
    });

    test('Create Booking with missing mandatory fields', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/booking`, {
            data: {
                firstname: "Jim"
                // missing other fields
            }
        });
        // Restful-booker often returns 500 for missing fields, but we expect an error status
        expect(response.status()).toBeGreaterThanOrEqual(400);
    });

    test('Get non-existent Booking ID', async ({ request }) => {
        const response = await request.get(`${BASE_URL}/booking/999999`);
        expect(response.status()).toBe(404);
    });

    test('Create Booking with invalid dates', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/booking`, {
            data: {
                firstname: "Jim",
                lastname: "Brown",
                totalprice: 111,
                depositpaid: true,
                bookingdates: {
                    checkin: "2024-01-01",
                    checkout: "2023-01-01" // Invalid: checkout before checkin
                },
                additionalneeds: "None"
            }
        });
        // API should ideally reject this
        expect(response.ok()).toBeFalsy();
    });
});
