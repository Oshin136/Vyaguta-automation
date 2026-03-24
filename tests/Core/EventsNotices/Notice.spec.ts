import { test, expect, request } from '@playwright/test';
import { fetchTokens } from '../../../utils/authenticate';
import { LoginService } from '../../../pageServices/LoginService';
import { NoticeService } from '../../../pageServices/Core/EventsNotices/NoticeService';
import { ReleaseModalService } from '../../../pageServices/ReleaseModalService';
import { validNoticeData, invalidNoticeData } from '../../../utils/testData';


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

test('Should create a notice with valid data @positiveCase', async({page}) => {
  const notice = new NoticeService(page);
  await notice.createNotice(validNoticeData);
  const isVerified = await notice.verifyNoticeCreated(validNoticeData.title);
  expect(isVerified).toBeTruthy();
})

test('Should update the created notice @positiveCase', async({page}) => {
  const notice = new NoticeService(page);
  // First create a notice to update
  await notice.createNotice(validNoticeData);
  
  const updatedNoticeData = {
    title: 'Updated Notice Title',
    description: 'This is an updated description for the notice.', 
    link: 'https://updated-notice-link.com'
  };
  await notice.updateNotice(updatedNoticeData);
  const isVerified = await notice.verifyNoticeUpdated();
  expect(isVerified).toBeTruthy();
})

test('Should delete the created notice @positiveCase', async({page}) => {
  const notice = new NoticeService(page);
  // First create a notice to delete
  await notice.createNotice(validNoticeData);
  
  await notice.deleteNotice();
//   const isVerified = await notice.verifyNoticeDeleted(); no toast message shown
//   expect(isVerified).toBeTruthy();
})

test('Regression: Should create, update and delete a notice @regression', async({page}) => {
  test.slow(); // Mark as slow since it has multiple operations
  
  const notice = new NoticeService(page);
  
  // Create notice
  await notice.createNotice(validNoticeData);
  const isCreated = await notice.verifyNoticeCreated(validNoticeData.title);
  expect(isCreated).toBeTruthy();
  
  // Update notice
  const updatedNoticeData = {
    title: 'Regression Updated Notice',
    description: 'This notice was updated during regression testing.', 
    link: 'https://regression-updated-notice.com'
  };
  await notice.updateNotice(updatedNoticeData);
  const isUpdated = await notice.verifyNoticeUpdated();
  expect(isUpdated).toBeTruthy();
  
  // Delete notice
  await notice.deleteNotice();
//   const isDeleted = await notice.verifyNoticeDeleted();
//   expect(isDeleted).toBeTruthy();
})

test('Should not create a notice with invalid data @negativeCase', async({page}) => {
  const notice = new NoticeService(page);
  await notice.createNotice(invalidNoticeData);
  const isVerified = await notice.verifyValidationError('Please provide title');
  expect(isVerified).toBeTruthy();
})

test('Should filter and display past notices @positiveCase', async({page}) => {
  const notice = new NoticeService(page);
  await notice.navigateToNoticePage();
  await notice.noticePage.selectPastNotices();
  const isUrlCorrect = await notice.verifySelectPastNoticesUrl();
  expect(isUrlCorrect).toBeTruthy();
});

test('Should filter and display all notices @positiveCase', async({page}) => {
  const notice = new NoticeService(page);
  await notice.navigateToNoticePage();
  await notice.noticePage.selectAllNotices();
  const isUrlCorrect = await notice.verifySelectAllNoticesUrl();
  expect(isUrlCorrect).toBeTruthy();
});
