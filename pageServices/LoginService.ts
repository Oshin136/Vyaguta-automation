import { Page } from '@playwright/test';

export class LoginService {
  constructor(private page: Page) {}

  async loginWithToken(token: string) {
    await this.page.context().addCookies([
      {
        name: 'accessToken',
        value: token,
        domain: 'qa.vyaguta.lftechnology.com.np',
        path: '/',
        httpOnly: false,
        secure: true,
        sameSite: 'Lax',
      },
    ]);

    await this.page.goto('https://qa.vyaguta.lftechnology.com.np', {
      waitUntil: 'load',
    });
  }
}
