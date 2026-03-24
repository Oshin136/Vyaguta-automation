import { Page } from "@playwright/test";
import { ProfilePage } from "../../../pageObjects/Core/Profile/ProfilePage";
import { profileSuccessMessages } from "../../../utils/successMessages";
import { ToastMessagePage } from "../../../pageObjects/ToastMessagePage";
import { FormValidationPage } from "../../../pageObjects/FormValidationPage";

export class ProfileService {
  readonly page: Page;
  readonly profilePage: ProfilePage;
  readonly toastMessagePage: ToastMessagePage;
  readonly formValidationPage: FormValidationPage;

  constructor(page: Page) {
    this.page = page;
    this.profilePage = new ProfilePage(page);
    this.toastMessagePage = new ToastMessagePage(page);
    this.formValidationPage = new FormValidationPage(page);
  }

  async navigateToProfilePage(searchName: string) {
    await this.profilePage.peopleTab.click();
    await this.profilePage.searchAndOpenProfile(searchName);
  }

  async viewProfile(searchName: string) {
    await this.navigateToProfilePage(searchName);
  }

  async changeEmploymentStatus(searchName: string, status: string, transitionDate: string) {
    await this.profilePage.changeEmploymentStatus(status, transitionDate);
  }

  async changeLeaveIssuer(searchName: string, leaveIssuer: string, transitionDate: string) {
    await this.profilePage.changeLeaveIssuer(leaveIssuer, transitionDate);
  }

  async changeTeamManager(searchName: string, teamManager: string, transitionDate: string) {
    await this.profilePage.changeTeamManager(teamManager, transitionDate);
  }

  async changeDesignation(searchName: string, designation: string, area: string, transitionDate: string) {
    await this.profilePage.changeDesignation(designation, area, transitionDate);
  }

  // async verifyProfileName(): Promise<string> {
  //   return await this.profilePage.getProfileName();
  // }

  // async verifyProfileEmail(): Promise<string> {
  //   return await this.profilePage.getProfileEmail();
  // }

  async verifyEmploymentStatusChanged(): Promise<boolean> {
    const message = await this.toastMessagePage.getSuccessMessage();
    return message.includes(profileSuccessMessages.changeEmploymentStatus);
  }

  async verifyLeaveIssuerChanged(): Promise<boolean> {
    const message = await this.toastMessagePage.getSuccessMessage();
    return message.includes(profileSuccessMessages.changeLeaveIssuer);
  }

  async verifyTeamManagerChanged(): Promise<boolean> {
    const message = await this.toastMessagePage.getSuccessMessage();
    return message.includes(profileSuccessMessages.changeTeamManager);
  }

  async verifyDesignationChanged(): Promise<boolean> {
    const message = await this.toastMessagePage.getSuccessMessage();
    return message.includes(profileSuccessMessages.changeDesignation);
  }

  async verifyValidationError(): Promise<boolean> {
    const errors = await this.formValidationPage.getAllValidationErrors();
    return errors.length > 0;
  }
}
