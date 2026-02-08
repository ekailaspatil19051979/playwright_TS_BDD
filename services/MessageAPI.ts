import { APIRequestContext, expect } from '@playwright/test';

export class MessageAPI {
    readonly request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async createMessage(name: string, email: string, phone: string, subject: string, message: string) {
        const response = await this.request.post(`https://automationintesting.online/message/`, {
            data: {
                name: name,
                email: email,
                phone: phone,
                subject: subject,
                description: message
            }
        });
        expect(response.status()).toBe(201);
        return await response.json();
    }
}
