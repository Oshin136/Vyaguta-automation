import { test,expect, request } from '@playwright/test';
import { fetchTokens } from '../../../utils/authenticate';
import { LoginService } from '../../../pageServices/LoginService';
import { EventService } from '../../../pageServices/Core/EventsNotices/EventService';
import { ReleaseModalService } from '../../../pageServices/ReleaseModalService';
import { validEventData, invalidEventData, pastEventData, generateTodayDate } from '../../../utils/testData';
import { log } from 'console';


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

test('Should create an event with valid data @positiveCase',async({page}) => {
    const event = new EventService(page);
    await event.createEvent(validEventData);
    expect(await event.verifyEventCreated()).toBeTruthy();
});

test('Should update the created event @positiveCase',async({page}) => {
  const event = new EventService(page);
  // First create an event to update
  await event.createEvent(validEventData);
  
  const updatedEventData = {
    title: 'Updated Event Title',
    description: 'This is an updated description for the event.', 
    link: 'https://updated-event-link.com',
    date: generateTodayDate()
  };
  await event.updateEvent(updatedEventData);
  expect(await event.verifyEventUpdated()).toBeTruthy();
})

test('Should delete the created event @positiveCase',async({page}) => {
  const event = new EventService(page);
  // First create an event to delete
  await event.createEvent(validEventData);
  
  await event.deleteEvent();
  expect(await event.verifyEventDeleted()).toBeTruthy();
})

test('Regression: Should create, update and delete an event @regression', async({page}) => {
  test.slow(); // Mark as slow since it has multiple operations
  
  const event = new EventService(page);
  
  // Create event
  await event.createEvent(validEventData);
  expect(await event.verifyEventCreated()).toBeTruthy();

  
  // Update event
  const updatedEventData = {
    title: 'Regression Updated Event',
    description: 'This event was updated during regression testing.', 
    link: 'https://regression-updated-event.com',
    date: generateTodayDate()
  };
  await event.updateEvent(updatedEventData);
  expect(await event.verifyEventUpdated()).toBeTruthy();
  
  // Delete event
  await event.deleteEvent();
  expect(await event.verifyEventDeleted()).toBeTruthy();
})

test('Should not create an event with invalid data @negativeCase',async({page}) => {
  const event = new EventService(page);
  await event.createEvent(invalidEventData);
  expect(await event.verifyValidationError()).toBeTruthy();
})  

test('Should filter and display past events @positiveCase',async({page}) => {
  const event = new EventService(page);
  await event.selectPastEvents();
  const isUrlCorrect = await event.verifyPastEventsUrl();
  expect(isUrlCorrect).toBeTruthy();
});

test('Should filter and display all events @positiveCase',async({page}) => {
  const event = new EventService(page);
  await event.selectAllEvents();
  const isUrlCorrect = await event.verifyAllEventsUrl();
  expect(isUrlCorrect).toBeTruthy();
});


//cannot be tested, once filled past date, the date is automatically changed to current date
// test('Should not allow to create an event with past date @negativeCase',async({page}) => { 
//   test.slow()
//   const event = new EventService(page);
//   log('Attempting to create an event with past date:', pastEventData);
//   await event.createEvent(pastEventData);
// });


