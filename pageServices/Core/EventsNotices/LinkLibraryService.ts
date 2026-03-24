import { Page } from "@playwright/test";
import { LinkLibraryPage } from "../../../pageObjects/Core/EventsNotices/LinkLibraryPage";
import { linkLibrarySuccessMessages } from "../../../utils/successMessages";
import { linkLibraryValidationMessages } from "../../../utils/validationMessages";
import { ToastMessagePage } from "../../../pageObjects/ToastMessagePage";
import { FormValidationPage } from "../../../pageObjects/FormValidationPage";
import { linkLibraryErrorMessages } from "../../../utils/errorMessage";

export class LinkLibraryService {
  readonly page: Page;
  readonly linkLibraryPage: LinkLibraryPage;
  readonly toastMessagePage: ToastMessagePage;
  readonly formValidationPage: FormValidationPage;

  constructor(page: Page) {
    this.page = page;
    this.linkLibraryPage = new LinkLibraryPage(page);
    this.toastMessagePage = new ToastMessagePage(page);
    this.formValidationPage = new FormValidationPage(page);
  }

  async navigateToLinkLibrary() {
    await this.linkLibraryPage.navigateToLinkLibrary();
  }

  async createCategory(categoryName: string) {
    await this.navigateToLinkLibrary();
    await this.linkLibraryPage.addCategory(categoryName);
  }

  async updateCategory(newName: string) {
    // await this.navigateToLinkLibrary();
    await this.linkLibraryPage.editCategory(newName);
  }

  async deleteCategory() {
    // await this.navigateToLinkLibrary();
    await this.linkLibraryPage.deleteCategory();
  }

  async addSubcategory(subcategoryName: string) {
    // Call after createCategory — already on the link library page
    await this.linkLibraryPage.addSubcategory(subcategoryName);
  }

  async addLink(linkName: string, linkUrl: string) {
    // Call after addSubcategory — already on the link library page
    await this.linkLibraryPage.addLink(linkName, linkUrl);
  }

  async deleteLink() {
    await this.linkLibraryPage.deleteLink();
  }

  async verifyCategoryCreated(): Promise<boolean> {
    return (await this.toastMessagePage.getSuccessMessage()).includes(linkLibrarySuccessMessages.createCategory);
  }

  async verifyCategoryUpdated(): Promise<boolean> {
    return (await this.toastMessagePage.getSuccessMessage()).includes(linkLibrarySuccessMessages.updateCategory);
  }

  async verifyCategoryDeleted(): Promise<boolean> {
    return (await this.toastMessagePage.getSuccessMessage()).includes(linkLibrarySuccessMessages.deleteCategory);
  }

//   async verifySubcategoryCreated(): Promise<boolean> {
//     return (await this.toastMessagePage.getSuccessMessage()).includes(linkLibrarySuccessMessages.createSubcategory);
//   }

  async verifyLinkCreated(): Promise<boolean> {
    return (await this.toastMessagePage.getSuccessMessage()).includes(linkLibrarySuccessMessages.createLink);
  }

  async verifyLinkDeleted(): Promise<boolean> {
    return (await this.toastMessagePage.getSuccessMessage()).includes(linkLibrarySuccessMessages.deleteLink);
  }

  async verifyDuplicateCategoryError(): Promise<boolean> {
    const error = await this.toastMessagePage.getErrorMessage();
    return error.includes(linkLibraryErrorMessages.duplicateCategory);
  }

  async verifyInvalidUrlValidationError(): Promise<boolean> {
    const error = await this.formValidationPage.getFirstValidationError();
    return error.includes(linkLibraryValidationMessages.invalidUrl);
  }
}
