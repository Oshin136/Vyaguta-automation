import { test,expect, request } from '@playwright/test';
import { fetchTokens } from '../utils/authenticate';
import { LoginService } from '../pageServices/LoginService';
import { EventService } from '../pageServices/EventService';
import { ReleaseModalService } from '../pageServices/ReleaseModalService';
import { validEventData } from '../utils/testData';


test.beforeEach(async ({ page }) => {
  // Authentication setup
  const apiRequestContext = await request.newContext();
  const { accessToken } = await fetchTokens(apiRequestContext);
  
  // Login
  const loginService = new LoginService(page);
  await loginService.loginWithToken(accessToken);
  
  // Close release modal if it appears
  const releaseModalService = new ReleaseModalService(page);
  await releaseModalService.closeReleaseModal();
});

test('Should create an event with valid data',async({page}) => {
  
    const event = new EventService(page);
    await event.createEvent(validEventData);
    await expect(page.getByText(validEventData.title)).toBeVisible();
})