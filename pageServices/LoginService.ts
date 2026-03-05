import { Page } from '@playwright/test';

export class LoginService {
  private readonly baseURL: string = 'https://uat.vyaguta.lftechnology.com.np';
  
  constructor(private page: Page) {}

  async loginWithToken(token: string) {
    const domain = new URL(this.baseURL).hostname;

    await this.page.context().addCookies([
      {
        name: 'accessToken',
        value: token,
        domain: domain,
        path: '/',
        httpOnly: false,
        secure: true,
        sameSite: 'Lax',
      },
    ]);

    await this.page.goto(this.baseURL, {
      waitUntil: 'load',
    });
  }
}
