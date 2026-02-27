import { test, expect, request } from '@playwright/test';
import { fetchTokens } from '../utils/authenticate';
import { LoginService } from '../pageServices/LoginService';
import { HolidayService } from '../pageServices/HolidayService';
import { ReleaseModalService } from '../pageServices/ReleaseModalService';
import { validHolidayData, invalidHolidayData} from '../utils/testData';

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

test('Should create a holiday with valid data @positiveCase', async ({ page }) => {
  const holiday = new HolidayService(page);
  await holiday.createHoliday(validHolidayData);
  const isVerified = await holiday.verifyHolidayCreated(validHolidayData.title);
await page.waitForTimeout(2000);
  expect(isVerified).toBeTruthy();
});

test('Should update the created holiday @positiveCase', async ({ page }) => {
  const holiday = new HolidayService(page);
  await holiday.createHoliday(validHolidayData);
  
  const updatedHolidayData = {
    title: 'Updated Holiday Title',
    description: 'This is an updated description for the holiday.',
    // date: '2026-04-20'
  };
  await holiday.updateHoliday(updatedHolidayData);
  const isVerified = await holiday.verifyHolidayUpdated();
  expect(isVerified).toBeTruthy();
});

test('Should delete the created holiday @positiveCase', async ({ page }) => {
  const holiday = new HolidayService(page);
  await holiday.createHoliday(validHolidayData);
  await holiday.deleteHoliday();
  const isVerified = await holiday.verifyHolidayDeleted();
  expect(isVerified).toBeTruthy();
});

test('Regression: Should create, update and delete a holiday @regression', async ({ page }) => {
  test.slow(); // Mark as slow since it has multiple operations
  
  const holiday = new HolidayService(page);
  // Create holiday
  await holiday.createHoliday(validHolidayData);
  const isCreated = await holiday.verifyHolidayCreated(validHolidayData.title);
  expect(isCreated).toBeTruthy();
  
  // Update holiday
  const updatedHolidayData = {
    title: 'Regression Updated Holiday',
    description: 'This holiday was updated during regression testing.',
    // date: '2026-05-10'
  };
  await holiday.updateHoliday(updatedHolidayData);
  const isUpdated = await holiday.verifyHolidayUpdated();
  expect(isUpdated).toBeTruthy();
  
  // Delete holiday
  await holiday.deleteHoliday();
  const isDeleted = await holiday.verifyHolidayDeleted();
  expect(isDeleted).toBeTruthy();
});

test('Should not create a holiday with invalid data @negativeCase', async ({ page }) => {
  const holiday = new HolidayService(page);
  await holiday.createHoliday(invalidHolidayData);
  const isVerified = await holiday.verifyValidationError('Please provide title');
  expect(isVerified).toBeTruthy();
});

test('Should filter and display past holidays @positiveCase',async({page}) => {
  const holiday = new HolidayService(page);
  await holiday.selectPastHolidays();
  const isUrlCorrect = await holiday.verifyPastHolidaysUrl();
  expect(isUrlCorrect).toBeTruthy();
});

test('Should filter and display all holidays @positiveCase',async({page}) => {
  const holiday = new HolidayService(page);
  await holiday.selectAllHolidays();
  const isUrlCorrect = await holiday.verifyAllHolidaysUrl();
  expect(isUrlCorrect).toBeTruthy();
});




test('Should not create duplicate holiday @negativeCase', async ({ page }) => {
  const holiday = new HolidayService(page);
  
  // Create first holiday
  const firstHolidayData = {
    title: `Unique Holiday ${Date.now()}`,
    description: 'First instance',
  };
  await holiday.createHoliday(firstHolidayData);
  await page.waitForTimeout(1000);
  
  // Try to create duplicate with same title and date
  const duplicateData = {
    ...firstHolidayData,
    description: 'Duplicate attempt'
  };
  await holiday.createHoliday(duplicateData);
  await page.waitForTimeout(1000);
  
  // Should show error or not create
  const errorVisible = await holiday.verifyValidationError('already exists');
});

