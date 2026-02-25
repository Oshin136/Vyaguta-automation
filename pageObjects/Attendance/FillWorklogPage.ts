import {Page, Locator} from '@playwright/test';
export class FillWorklogPage {
    readonly page: Page
    readonly projectDropdown: Locator;
    readonly projectOption: Locator;
    readonly taskDropdown: Locator;
    readonly taskOption: Locator;
    readonly detailsTextbox: Locator;
    readonly timeTextbox: Locator;
    readonly submitButton: Locator;
    readonly editButton: Locator;
    readonly reEditButton: Locator;
    readonly cancelButton: Locator;
    readonly reCancelButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.projectDropdown = page.locator('.col-12 > .wrapper > .form-input-wrapper > .css-b62m3t-container > .lf-select__control');      
        this.projectOption = page.locator('#react-select-3-input');
        this.taskDropdown = page.locator('.col-6 > .wrapper > .form-input-wrapper > .css-b62m3t-container > .lf-select__control > .lf-select__value-container > .lf-select__input-container');
        this.taskOption = page.getByText('QA');
        this.detailsTextbox = page.getByRole('textbox', { name: 'Add details here' }).first();
        this.timeTextbox = page.getByRole('textbox', { name: '0h 0m' }).first();
        this.submitButton = page.getByRole('button', { name: 'Submit' });
        this.editButton = page.getByRole('button', { name: 'Edit' });
        this.reEditButton = page.getByRole('button', { name: 'Yes, edit' });
        this.cancelButton = page.getByRole('button', { name: 'Cancel' });
        this.reCancelButton = page.getByRole('button', { name: 'Yes, cancel' });
    }

    async navigateToFillWorklog() {
        await this.page.locator('.heatmap-data-row__box.relative.bg-tertiary-green--80 > a').first().click();
        await this.page.getByRole('button', { name: 'Fill today\'s worklog' }).click();
    }

    // async editWorklog() {
    //     await this.editButton.click();
    //     await this.reEditButton.click();
    // }

    async cancelWorklog() {
        await this.editButton.click();
        await this.reEditButton.click();
        await this.cancelButton.waitFor({ state: 'visible', timeout: 5000 });
        await this.cancelButton.click();
        await this.reCancelButton.waitFor({ state: 'visible', timeout: 5000 });
        await this.reCancelButton.click();
    }
}
