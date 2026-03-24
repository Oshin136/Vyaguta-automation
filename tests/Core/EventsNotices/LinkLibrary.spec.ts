import { test, expect, request } from '@playwright/test';
import { fetchTokens } from '../../../utils/authenticate';
import { LoginService } from '../../../pageServices/LoginService';
import { LinkLibraryService } from '../../../pageServices/Core/EventsNotices/LinkLibraryService';
import { ReleaseModalService } from '../../../pageServices/ReleaseModalService';
import {
  validCategoryData,
  invalidCategoryData,
  validSubcategoryData,
  validLinkData,
} from '../../../utils/testData';


test.beforeEach(async ({ page }) => {
  const apiRequestContext = await request.newContext();
  const { accessToken } = await fetchTokens(apiRequestContext);

  const loginService = new LoginService(page);
  await loginService.loginWithToken(accessToken);

  const releaseModalService = new ReleaseModalService(page);
  await releaseModalService.closeReleaseModal();
});

test('Should create a category with valid data @positiveCase', async ({ page }) => {
  const linkLibrary = new LinkLibraryService(page);
  await linkLibrary.createCategory(validCategoryData.name);
  expect(await linkLibrary.verifyCategoryCreated()).toBeTruthy();
});

test('Should update the created category @positiveCase', async ({ page }) => {
  const linkLibrary = new LinkLibraryService(page);
  // Setup: create a category first
  await linkLibrary.createCategory(validCategoryData.name);
  await page.waitForTimeout(5000);

  const updatedName = 'Updated Automation Category';
  await linkLibrary.updateCategory(updatedName);
  expect(await linkLibrary.verifyCategoryUpdated()).toBeTruthy();
});

test('Should delete the created category @positiveCase', async ({ page }) => {
  const linkLibrary = new LinkLibraryService(page);
  // Setup: create a category first
  await linkLibrary.createCategory(validCategoryData.name);
  await page.waitForTimeout(5000);

  await linkLibrary.deleteCategory();
  expect(await linkLibrary.verifyCategoryDeleted()).toBeTruthy();
});

test('Regression: Should create, update and delete a category @regression', async ({ page }) => {
  test.slow();

  const linkLibrary = new LinkLibraryService(page);

  // Create category
  await linkLibrary.createCategory(validCategoryData.name);
  expect(await linkLibrary.verifyCategoryCreated()).toBeTruthy();
  await page.waitForTimeout(5000);

  // Update category
  const updatedName = 'Regression Updated Category';
  await linkLibrary.updateCategory(updatedName);
  expect(await linkLibrary.verifyCategoryUpdated()).toBeTruthy();
  await page.waitForTimeout(5000);

  // Delete category
  await linkLibrary.deleteCategory();
  expect(await linkLibrary.verifyCategoryDeleted()).toBeTruthy();
});

// test('Should not create category with existing name @negativeCase', async ({ page }) => {
//   const linkLibrary = new LinkLibraryService(page);
//     // Setup: create a category first
//     await linkLibrary.createCategory(validCategoryData.name);
//     await page.waitForTimeout(5000);
//     // Try creating another category with the same name
//     await linkLibrary.createCategory(validCategoryData.name);
//     expect(await linkLibrary.verifyDuplicateCategoryError()).toBeTruthy();
// });

// test('Should not create a category with empty name @negativeCase', async ({ page }) => {
//   const linkLibrary = new LinkLibraryService(page);
//   await linkLibrary.createCategory(invalidCategoryData.name);
//   expect(await linkLibrary.verifyValidationError()).toBeTruthy();
// });

test('Should add a subcategory to a category @positiveCase', async ({ page }) => {
  const linkLibrary = new LinkLibraryService(page);
  // Setup: create a category first
  await linkLibrary.createCategory(validCategoryData.name);
  await page.waitForTimeout(5000);

  await linkLibrary.addSubcategory(validSubcategoryData.name);
  expect(await linkLibrary.verifyCategoryCreated()).toBeTruthy();
});

test('Should add a link to a subcategory @positiveCase', async ({ page }) => {
  const linkLibrary = new LinkLibraryService(page);
  // Setup: create category and subcategory first
  await linkLibrary.createCategory(validCategoryData.name);
  await page.waitForTimeout(5000);

  await linkLibrary.addSubcategory(validSubcategoryData.name);
  await page.waitForTimeout(5000);


  await linkLibrary.addLink(validLinkData.name, validLinkData.url);
  expect(await linkLibrary.verifyLinkCreated()).toBeTruthy();
});

test('Should not add a link with invalid URL @negativeCase', async ({ page }) => {
  const linkLibrary = new LinkLibraryService(page);
    // Setup: create category and subcategory first
    await linkLibrary.createCategory(validCategoryData.name);
    await page.waitForTimeout(5000);
    await linkLibrary.addSubcategory(validSubcategoryData.name);
    await page.waitForTimeout(5000);
    // Try adding a link with invalid URL
    await linkLibrary.addLink(validLinkData.name, 'invalid-url');
    expect(await linkLibrary.verifyInvalidUrlValidationError()).toBeTruthy();
});

test('Regression: Should add a category, subcategory and a link to it @regression', async ({ page }) => {
    test.slow();
    const linkLibrary = new LinkLibraryService(page);

    // Create category
    await linkLibrary.createCategory(validCategoryData.name);
    expect(await linkLibrary.verifyCategoryCreated()).toBeTruthy();
    await page.waitForTimeout(5000);

    // Add subcategory
    await linkLibrary.addSubcategory(validSubcategoryData.name);
    expect(await linkLibrary.verifyCategoryCreated()).toBeTruthy();
    await page.waitForTimeout(5000);

    // Add link
    await linkLibrary.addLink(validLinkData.name, validLinkData.url);
    expect(await linkLibrary.verifyLinkCreated()).toBeTruthy();
    await page.waitForTimeout(5000);

    //Delete link
    await linkLibrary.deleteLink();
    expect(await linkLibrary.verifyLinkDeleted()).toBeTruthy();
    await page.waitForTimeout(5000);


    //Delete subcatoegory
    await linkLibrary.deleteCategory();
    expect(await linkLibrary.verifyCategoryDeleted()).toBeTruthy();
    await page.waitForTimeout(5000);

    //Delete category
    await linkLibrary.deleteCategory();
    expect(await linkLibrary.verifyCategoryDeleted()).toBeTruthy();

});
