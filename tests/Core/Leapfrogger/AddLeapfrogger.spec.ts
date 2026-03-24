import { test, expect, request } from '@playwright/test';
import { AddLeapfroggerService } from '../../../pageServices/Core/Leapfrogger/AddLeapfroggerService';
import { LoginService } from '../../../pageServices/LoginService';
import { fetchTokens } from '../../../utils/authenticate';
import { ReleaseModalService } from '../../../pageServices/ReleaseModalService';
import { generateLeapfroggerData,existingUserData } from '../../../utils/testData';
import { ProfilePage } from '../../../pageObjects/Core/Profile/ProfilePage';
import { FormValidationPage } from '../../../pageObjects/FormValidationPage';
import { leapfroggerValidationMessages } from '../../../utils/validationMessages';
import { ToastMessagePage } from '../../../pageObjects/ToastMessagePage';
import { leapfrogErrorMessages } from '../../../utils/errorMessage';

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

test('Should add a new Leapfrogger @regression', async ({ page }) => {
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

test('Should show each leapfrogger validation message from constants file @negativeCase', async ({ page }) => {
  const addLeapfroggerService = new AddLeapfroggerService(page);
  const formValidationPage = new FormValidationPage(page);

  const expectMessageInErrors = (errors: string[], expectedMessage: string, section: string) => {
    const isPresent = errors.some((message) => message.includes(expectedMessage));
    console.log(`[${section}] comparing expected message: "${expectedMessage}" -> ${isPresent ? 'FOUND' : 'NOT FOUND'}`);

    expect(
      isPresent,
      `Expected validation message "${expectedMessage}". Actual messages: ${errors.join(' | ')}`
    ).toBeTruthy();
  };


  //validating official info level required field messages
  await addLeapfroggerService.leapfroggerPage.clickAddLeapfroggerButton();
  await addLeapfroggerService.officialInfoPage.nextButton.click();

  const officialInfoErrors = await formValidationPage.getAllValidationErrors();
  console.log('Official Info Validation Errors:', officialInfoErrors);
  const officialExpectedMessages = [
    leapfroggerValidationMessages.firstName,
    leapfroggerValidationMessages.lastName,
    leapfroggerValidationMessages.email,
    leapfroggerValidationMessages.department,
    leapfroggerValidationMessages.leaveIssuer,
    leapfroggerValidationMessages.teamManager,
    leapfroggerValidationMessages.workingType,
    leapfroggerValidationMessages.profilePicture,
  ];

  for (const expectedMessage of officialExpectedMessages) {
    expectMessageInErrors(officialInfoErrors, expectedMessage, 'Official Info');
  }


  //validating personal info level required field messages
  await addLeapfroggerService.personalInfoPage.navigateToPersonalInfo();
  await addLeapfroggerService.personalInfoPage.nextButton.click();

  const personalInfoErrors = await formValidationPage.getAllValidationErrors();
  console.log('Personal Info Validation Errors:', personalInfoErrors);
  const personalExpectedMessages = [
    leapfroggerValidationMessages.gender,
    leapfroggerValidationMessages.dateOfBirth,
    leapfroggerValidationMessages.bloodGroup,
    leapfroggerValidationMessages.maritalStatus,
    leapfroggerValidationMessages.personalEmail,
    leapfroggerValidationMessages.phoneNumber,
    leapfroggerValidationMessages.emergencyContactNumber,
    leapfroggerValidationMessages.relationWithEmergencyContact,
    leapfroggerValidationMessages.temporaryAddress,
    leapfroggerValidationMessages.permanentAddress,
    leapfroggerValidationMessages.country,
    leapfroggerValidationMessages.timezone,
  ];

  for (const expectedMessage of personalExpectedMessages) {
    expectMessageInErrors(personalInfoErrors, expectedMessage, 'Personal Info');
  }

  //validating appraiser info level required field messages
  await addLeapfroggerService.appraiserPage.navigateToAppraiserPage();
  await addLeapfroggerService.appraiserPage.saveButton.click();

  const appraiserErrors = await formValidationPage.getAllValidationErrors();
  console.log('Appraiser Info Validation Errors:', appraiserErrors);
  expectMessageInErrors(appraiserErrors, leapfroggerValidationMessages.appraiser, 'Appraiser Info');

});

test('Should not allow to create profile with existing email @negativeCase', async ({ page }) => {
  const addLeapfroggerService = new AddLeapfroggerService(page);
  const formValidationPage = new FormValidationPage(page);
  const toastMessagePage = new ToastMessagePage(page);

  await addLeapfroggerService.leapfroggerPage.clickAddLeapfroggerButton();

  const { officialInfo } = generateLeapfroggerData();
  officialInfo.employeeEmail = existingUserData.employeeEmail;
  const expectedDuplicateMessage = leapfroggerValidationMessages.duplicateEmail;

  await addLeapfroggerService.officialInfoPage.fillOfficialInformation(officialInfo);

  const duplicateEmailToastMessage = await toastMessagePage.getErrorMessage();
  console.log(
    `[Duplicate Case] comparing toast message -> expected: "${expectedDuplicateMessage}", actual: "${duplicateEmailToastMessage}"`
  );
  expect(duplicateEmailToastMessage).toContain(expectedDuplicateMessage);

  const officialInfoErrors = await formValidationPage.getAllValidationErrors();
  const hasDuplicateFormMessage = officialInfoErrors.some((message) => message.includes(expectedDuplicateMessage));
  console.log(
    `[Duplicate Case] comparing form validation message -> expected: "${expectedDuplicateMessage}", actual errors: ${officialInfoErrors.join(' | ')}`
  );

  expect(hasDuplicateFormMessage).toBeTruthy();
  
});

// test('Should not allow to create profile with multiple probation periods @negativeCase', async ({ page }) => {
//   test.setTimeout(60000);

//   const addLeapfroggerService = new AddLeapfroggerService(page);
//   const toastMessagePage = new ToastMessagePage(page);
//   const empStatus = 'Probation';

//   await addLeapfroggerService.leapfroggerPage.clickAddLeapfroggerButton();
//   const { officialInfo, personalInfo, historyInfo } = generateLeapfroggerData();

//   await addLeapfroggerService.officialInfoPage.fillOfficialInformation(officialInfo);
//   await addLeapfroggerService.personalInfoPage.fillPersonalInformation(personalInfo);

//   await addLeapfroggerService.historyPage.newEmploymentStatus(empStatus, historyInfo.employmentStatusStartDate);
//   await addLeapfroggerService.historyPage.newEmploymentStatus(empStatus, historyInfo.employmentStatusStartDate);
//   await addLeapfroggerService.historyPage.addDesignation(historyInfo.designation, historyInfo.area, historyInfo.transitionDate);
//   await addLeapfroggerService.historyPage.nextButton.click();
//   await addLeapfroggerService.appraiserPage.fillAppraisersInformation();

//   const expectedMultipleProbationMessage = leapfrogErrorMessages.multipleProbation;

//   // Start waiting before submit so short-lived toast is not missed.
//   const toastPromise = toastMessagePage.getErrorMessage();

//   // await addLeapfroggerService.appraiserPage.saveButton.click();

//   const multipleProbationToastMessage = await toastPromise;
//   console.log(
//     `[Multiple Probation Case] comparing toast message -> expected: "${expectedMultipleProbationMessage}", actual: "${multipleProbationToastMessage}"`
//   );
//   expect(multipleProbationToastMessage).toContain(expectedMultipleProbationMessage);
// });