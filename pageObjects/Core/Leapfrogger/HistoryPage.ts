import {Page, Locator} from "@playwright/test";

export class HistoryPage {
    readonly page: Page;
    readonly addEmploymentStatus: Locator;
    readonly employmentStatus: Locator;
    readonly employmentStatusStartDate: Locator;
    // readonly employmentStatusEndDate: Locator;
    readonly saveStatus: Locator;
    readonly addNewDesignation: Locator;
    readonly designation: Locator;
    readonly area: Locator;
    readonly transitionDate: Locator;
    // readonly saveDesignation: Locator;
    readonly nextButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addEmploymentStatus = page.getByText('Add New Employment Status', { exact: true });
        this.employmentStatus = page.locator('.lf-select__input-container');
        this.employmentStatusStartDate = page.getByRole('textbox', { name: 'Pick a Start Date' });
        // this.employmentStatusEndDate = page.locator('input[name="employmentStatusEndDate"]');
        this.saveStatus = page.getByRole('button', { name: 'Add & Close' });
        this.addNewDesignation = page.getByText('Add New Designation', { exact: true });
        this.designation = page.locator('.lf-select__value-container').nth(0);
        this.area = page.locator('.lf-select__value-container').nth(1);
        this.transitionDate = page.getByRole('textbox', { name: 'Select Date' });
        // this.saveDesignation = page.getByRole('button', { name: 'Save Designation' });
        this.nextButton = page.getByRole('button', { name: 'Next' });
    }

    async newEmploymentStatus(status: string, startDate: string) {
        await this.addEmploymentStatus.click();
        await this.employmentStatus.click();
        await this.employmentStatus.type(status);
        await this.page.getByRole('option', { name: status }).click();
        await this.employmentStatusStartDate.fill(startDate);
        await this.saveStatus.click();
    }

    async addDesignation(designation: string, area: string, transitionDate: string) {
        await this.addNewDesignation.click();
        await this.designation.click();
        await this.designation.type(designation);
        await this.page.getByRole('option', { name: designation, exact: true }).click();
        await this.area.click();
        await this.area.type(area);
        await this.page.getByRole('option', { name: area, exact: true }).click();
        await this.transitionDate.fill(transitionDate);
        await this.saveStatus.click();
    }

    async fillHistoryInformation(employmentInfo:any, designationInfo:any, areaInfo:any) {
        await this.newEmploymentStatus(employmentInfo.status, employmentInfo.startDate);
        await this.addDesignation(designationInfo.designation, areaInfo.area, designationInfo.transitionDate);
        await this.nextButton.click();
    }

}