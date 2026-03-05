import {test,expect,request} from '@playwright/test';
import { AddLeapfroggerService } from '../pageServices/AddLeapfroggerService';
import { LoginService } from '../pageServices/LoginService';
import {fetchTokens} from '../utils/authenticate';
import { ReleaseModalService } from '../pageServices/ReleaseModalService';
import { generateLeapfroggerData } from '../utils/testData';
import { ProfilePage } from '../pageObjects/ProfilePage';

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

test('Should add a new Leapfrogger', async ({ page }) => {
  const addLeapfroggerService = new AddLeapfroggerService(page);
  const { officialInfo, personalInfo, historyInfo } = generateLeapfroggerData();
  await addLeapfroggerService.addLeapfrogger(officialInfo, personalInfo, historyInfo);
  const toastText = await addLeapfroggerService.getSuccessMessage();
  expect(toastText).toContain("Employee has been created successfully");

  // Get Leapfrogger ID from URL
  const leapfroggerId = page.url().split('/').pop();

  // Navigate to profile page using ID
  await page.goto(`${process.env.BASE_URL}/leapfroggers/${leapfroggerId}`);
  const profilePage = new ProfilePage(page);
  expect(await profilePage.getProfileName()).toBe(`${officialInfo.firstName} ${officialInfo.middleName} ${officialInfo.lastName}`.trim());
});