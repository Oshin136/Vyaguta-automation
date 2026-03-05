import { Page, Locator } from "@playwright/test";

export class ProfilePage {
    readonly page: Page;
    readonly profileName: Locator;
    readonly profileEmail: Locator;
    readonly profileDepartment: Locator;
    // Add more locators as needed for other fields

    constructor(page: Page) {
        this.page = page;
        this.profileName = page.locator('.font-24.font-bold.mr-8');
        this.profileEmail = page.locator('.break-word').nth(0);
        this.profileDepartment = page.locator('.profile-department, .user-department, [data-testid="profile-department"]');
    }

    async getProfileName() {
        return (await this.profileName.textContent())?.trim() ?? "";
    }
    async getProfileEmail() {
        return (await this.profileEmail.textContent())?.trim() ?? "";
    }
    async getProfileDepartment() {
        return (await this.profileDepartment.textContent())?.trim() ?? "";
    }
    // Add more methods for other fields as needed
}
