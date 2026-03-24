import { test,expect, request } from '@playwright/test';
import { fetchTokens } from '../../../utils/authenticate';
import { LoginService } from '../../../pageServices/LoginService';
import { ReminderService } from '../../../pageServices/Core/EventsNotices/ReminderService';
import { ReleaseModalService } from '../../../pageServices/ReleaseModalService';
import { validReminderData, invalidReminderData } from '../../../utils/testData';


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

test('Should create a reminder with valid data @positiveCase',async({page}) => {
    const reminder = new ReminderService(page);
    await reminder.createReminder(validReminderData);
    const isVerified = await reminder.verifyReminderCreated(validReminderData.title);
    expect(isVerified).toBeTruthy();
})

test('Should update the created reminder @positiveCase',async({page}) => {
  const reminder = new ReminderService(page);
  // First create a reminder to update
  await reminder.createReminder(validReminderData);
  
  const updatedReminderData = {
    title: 'Updated Reminder Title',
    description: 'This is an updated description for the reminder.', 
    link: 'https://updated-reminder-link.com'
  };
  await reminder.updateReminder(updatedReminderData);
  const isVerified = await reminder.verifyReminderUpdated();
  expect(isVerified).toBeTruthy();
})

test('Should delete the created reminder @positiveCase',async({page}) => {
  const reminder = new ReminderService(page);
  // First create a reminder to delete
  await reminder.createReminder(validReminderData);
  
  await reminder.deleteReminder();
  const isVerified = await reminder.verifyReminderDeleted();
  expect(isVerified).toBeTruthy();
})

test('Regression: Should create, update and delete a reminder @regression', async({page}) => {
  test.slow(); // Mark as slow since it has multiple operations
  
  const reminder = new ReminderService(page);
  
  // Create reminder
  await reminder.createReminder(validReminderData);
  const isCreated = await reminder.verifyReminderCreated(validReminderData.title);
  expect(isCreated).toBeTruthy();
  
  // Update reminder
  const updatedReminderData = {
    title: 'Regression Updated Reminder',
    description: 'This reminder was updated during regression testing.', 
    link: 'https://regression-updated-reminder.com'
  };
  await reminder.updateReminder(updatedReminderData);
  const isUpdated = await reminder.verifyReminderUpdated();
  expect(isUpdated).toBeTruthy();
  
  // Delete reminder
  await reminder.deleteReminder();
  const isDeleted = await reminder.verifyReminderDeleted();
  expect(isDeleted).toBeTruthy();
})

test('Should not create a reminder with invalid data @negativeCase',async({page}) => {
  const reminder = new ReminderService(page);
  await reminder.createReminder(invalidReminderData);
  const isVerified = await reminder.verifyValidationError('Please provide a title');
  expect(isVerified).toBeTruthy();
})

test('Should filter and display past reminders @positiveCase',async({page}) => {
  const reminder = new ReminderService(page);
  await reminder.selectPastReminders();
  const isUrlCorrect = await reminder.verifyPastRemindersUrl();
  expect(isUrlCorrect).toBeTruthy();
});

test('Should filter and display all reminders @positiveCase',async({page}) => {
  const reminder = new ReminderService(page);
  await reminder.selectAllReminders();
  const isUrlCorrect = await reminder.verifyAllRemindersUrl();
  expect(isUrlCorrect).toBeTruthy();
});

