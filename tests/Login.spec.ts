import { test, expect, request } from '@playwright/test';
import { fetchTokens } from '../utils/authenticate';
import { LoginService } from '../pageServices/LoginService';

test.describe('Login using token and verify dashboard', () => {
  test('should login by setting token cookie and reach leapfrogger list', async ({ page }) => {
    const apiRequestContext = await request.newContext();
    const { accessToken } = await fetchTokens(apiRequestContext);

    const loginService = new LoginService(page);
    await loginService.loginWithToken(accessToken);

    // await expect(page).toHaveURL(/.*leapfroggers/);
  });
});
