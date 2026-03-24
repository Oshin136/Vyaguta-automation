import { Page, Locator } from "@playwright/test";

export class ProfilePage {
    readonly page: Page;
    readonly peopleTab: Locator;
    readonly profileName: Locator;
    readonly profileEmail: Locator;
    readonly profileDepartment: Locator;
    readonly profileEditButton: Locator;
    readonly changeEmploymentStatusButton: Locator;
    readonly changeLeaveIssuerButton: Locator;
    readonly changeTeamManagerButton: Locator;
    readonly changeDesignationButton: Locator;
    readonly employmentStatus: Locator;
    readonly employmentStatusTransitionDate: Locator;
    readonly saveButton: Locator;
    readonly leaveIssuerSelect: Locator;
    readonly updateButton: Locator;
    readonly teamManagerSelect: Locator;
    readonly designationSelect: Locator;
    readonly areaSelect: Locator;
    readonly searchInput: Locator;
    readonly firstSearchResult: Locator;

    constructor(page: Page) {
        this.page = page;
        this.peopleTab = page
            .locator("#header")
            .getByRole("link", { name: "People", exact: true });
        this.profileName = page.locator('.font-24.font-bold.mr-8');
        this.profileEmail = page.locator('.break-word').nth(0);
        this.profileDepartment = page.locator('.profile-department, .user-department, [data-testid="profile-department"]');
        this.profileEditButton = page.getByRole('button', { name: 'Edit' });
        this.changeEmploymentStatusButton = page.getByRole('link', { name: 'Change Employment Status' });
        this.changeLeaveIssuerButton = page.getByRole('link', { name: 'Change Leave Issuer' });
        this.changeTeamManagerButton = page.getByRole('link', { name: 'Change Team Manager' });
        this.changeDesignationButton = page.getByRole('link', { name: 'Change Designation' });
        this.employmentStatus = page.locator('.lf-select__input-container');
        this.employmentStatusTransitionDate = page.getByRole('textbox', { name: 'Pick a Transition Date' }); //same for leave issueer,team manager
        this.saveButton = page.locator(`button[type="submit"]`);
        this.leaveIssuerSelect = page.getByRole('combobox');
        this.updateButton = page.getByRole('button', { name: 'Update' }); //same for leave issueer,team manager
        this.teamManagerSelect = page.getByRole('combobox');

        this.designationSelect = page.getByRole('combobox').first();
        this.areaSelect = page.getByRole('combobox').nth(1);
        this.searchInput = page.locator('[data-cy="search-input"]');
        this.firstSearchResult = page.locator('[data-cy="employee-row"]').first();
        this.changeDesignationButton = page.getByRole('button', { name: 'Change' });
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

    async navigateToEmploymentStatusPage() {
        await this.profileEditButton.click();
        await this.changeEmploymentStatusButton.click();
    }

    async navigateToLeaveIssuerPage() {
        await this.profileEditButton.click();
        await this.changeLeaveIssuerButton.click();
    }

    async navigateToTeamManagerPage() {
        await this.profileEditButton.click();
        await this.changeTeamManagerButton.click();
    }

    async navigateToDesignationPage() {
        await this.profileEditButton.click();
        await this.changeDesignationButton.click();
    }

    async changeEmploymentStatus(status: string, transitionDate: string) {
        await this.navigateToEmploymentStatusPage();
        await this.employmentStatus.click();
        await this.employmentStatus.type(status);
        await this.page.getByRole('option', { name: status }).click();
        await this.employmentStatusTransitionDate.fill(transitionDate);
        await this.saveButton.click();
    }

    async changeLeaveIssuer(leaveIssuer: string, transitionDate: string) {
        await this.navigateToLeaveIssuerPage();
        await this.leaveIssuerSelect.fill(leaveIssuer);
        await this.page.getByRole('option', { name: leaveIssuer }).first().click();
        await this.employmentStatusTransitionDate.fill(transitionDate);
        await this.updateButton.click();
    }

    async changeTeamManager(teamManager: string, transitionDate: string) {
        await this.navigateToTeamManagerPage();
        await this.teamManagerSelect.fill(teamManager);
        await this.page.getByRole('option', { name: teamManager }).first().click();
        await this.employmentStatusTransitionDate.fill(transitionDate);
        await this.updateButton.click();
    }

    async changeDesignation(designation: string, area: string, transitionDate: string) {
        await this.navigateToDesignationPage();
        await this.designationSelect.fill(designation);
        await this.page.getByRole('option', { name: designation, exact: true }).first().click();
        await this.areaSelect.fill(area);
        await this.page.getByRole('option', { name: area, exact: true }).first().click();
        await this.employmentStatusTransitionDate.fill(transitionDate);
        await this.changeDesignationButton.click();
    }

    async searchAndOpenProfile(name: string) {
        await this.searchInput.fill(name);
        await this.searchInput.press('Enter');
        const resultRow = this.page.getByRole('row').filter({ hasText: name }).first();
        await resultRow.waitFor({ state: 'visible' });
        await resultRow.getByText(name).first().click();
        await this.page.waitForLoadState('networkidle');
    }

    async isProfileDisplayed(): Promise<boolean> {
        return await this.profileName.isVisible();
    }
}
