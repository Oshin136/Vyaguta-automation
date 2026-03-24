import {Page, Locator} from "@playwright/test";

export class AppraiserPage {
    readonly page: Page;
    readonly appraiserPageNavigator: Locator;
    readonly appraiser: Locator;
    readonly coappraiser: Locator;
    readonly saveButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.appraiserPageNavigator = page.getByText('Appraisers', { exact: true });
        this.appraiser = page.locator('.lf-select__control').nth(0);
        this.coappraiser =page.locator('.lf-select__control').nth(1);
        this.saveButton = page.getByRole('button', { name: 'Save' });
    }

    async navigateToAppraiserPage() {
        await this.appraiserPageNavigator.click();
    }

    async selectAppraiser(appraiser: string) {
        await this.appraiser.click();
        await this.appraiser.type(appraiser);
        await this.page.getByRole('option', { name: appraiser }).click();
    }

    async selectCoappraiser(coappraiser: string) {
        await this.coappraiser.click();
        await this.coappraiser.type(coappraiser);
        await this.page.getByRole('option', { name: coappraiser }).click();
    }

    async fillAppraisersInformation() {
        await this.selectAppraiser('Oshin');
        await this.selectCoappraiser('Oshin');
        await this.saveButton.click();
    }
}