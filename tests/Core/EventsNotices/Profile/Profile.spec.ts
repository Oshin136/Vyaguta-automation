import { test, expect, request } from '@playwright/test';
import { fetchTokens } from '../../../../utils/authenticate';
import { LoginService } from '../../../../pageServices/LoginService';
import { ProfileService } from '../../../../pageServices/Core/Profile/ProfileService';
import { ReleaseModalService } from '../../../../pageServices/ReleaseModalService';
import { profileTestData, generateTodayDate } from '../../../../utils/testData';

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


test('Should change employment status @positiveCase', async ({ page }) => {
  const profile = new ProfileService(page);
  await profile.navigateToProfilePage(profileTestData.searchName);
  await profile.changeEmploymentStatus(
    profileTestData.searchName,
    profileTestData.employmentStatus,
    generateTodayDate()
  );
  expect(await profile.verifyEmploymentStatusChanged()).toBeTruthy();
});

test('Should change leave issuer @positiveCase', async ({ page }) => {
  const profile = new ProfileService(page);
  await profile.navigateToProfilePage(profileTestData.searchName);
  await profile.changeLeaveIssuer(
    profileTestData.searchName,
    profileTestData.leaveIssuer,
    generateTodayDate()
  );
  expect(await profile.verifyLeaveIssuerChanged()).toBeTruthy();
});

test('Should change team manager @positiveCase', async ({ page }) => {
  const profile = new ProfileService(page);
  await profile.navigateToProfilePage(profileTestData.searchName);
  await profile.changeTeamManager(
    profileTestData.searchName,
    profileTestData.teamManager,
    generateTodayDate()
  );
  expect(await profile.verifyTeamManagerChanged()).toBeTruthy();
});

test('Should change designation @positiveCase', async ({ page }) => {
  const profile = new ProfileService(page);
  await profile.navigateToProfilePage(profileTestData.searchName);
  await profile.changeDesignation(
    profileTestData.searchName,
    profileTestData.designation,
    profileTestData.area,
    generateTodayDate()
  );
  expect(await profile.verifyDesignationChanged()).toBeTruthy();
});


test('Regression: Should view profile and change employment status, leave issuer, team manager and designation @regression', async ({ page }) => {
  test.slow();

  const profile = new ProfileService(page);
  const today = generateTodayDate();

  await profile.navigateToProfilePage(profileTestData.searchName);
  // Change employment status
  await profile.changeEmploymentStatus(
    profileTestData.searchName,
    profileTestData.employmentStatus,
    today
  );
  expect(await profile.verifyEmploymentStatusChanged()).toBeTruthy();
  await page.waitForTimeout(3000); // Wait for a moment before making the next change

  // Change leave issuer
  await profile.changeLeaveIssuer(
    profileTestData.searchName,
    profileTestData.leaveIssuer,
    today
  );
  expect(await profile.verifyLeaveIssuerChanged()).toBeTruthy();
  await page.waitForTimeout(3000); // Wait for a moment before making the next change

  // Change team manager
  await profile.changeTeamManager(
    profileTestData.searchName,
    profileTestData.teamManager,
    today
  );
  expect(await profile.verifyTeamManagerChanged()).toBeTruthy();
  await page.waitForTimeout(3000); // Wait for a moment before making the next change

  // Change designation
  await profile.changeDesignation(
    profileTestData.searchName,
    profileTestData.designation,
    profileTestData.area,
    today
  );
  expect(await profile.verifyDesignationChanged()).toBeTruthy();
});
