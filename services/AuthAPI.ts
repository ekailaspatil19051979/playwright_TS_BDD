import { APIRequestContext } from '@playwright/test';

export class AuthAPI {
    readonly request: APIRequestContext;
    readonly baseUrl: string;

    constructor(request: APIRequestContext, baseUrl: string) {
        this.request = request;
        this.baseUrl = baseUrl;
    }

    async getToken(username: string, password: string) {
        const response = await this.request.post(`${this.baseUrl}/auth`, {
            data: {
                username: username,
                password: password
            }
        });

        const json = await response.json();
        return json.token;
    }
}
