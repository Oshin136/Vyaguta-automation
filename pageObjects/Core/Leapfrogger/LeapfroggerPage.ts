import {Page, Locator} from "@playwright/test";
export class LeapfroggerPage {
    readonly page: Page;
    readonly peopleTab: Locator;
    readonly addLeapfroggerButton: Locator;
    readonly searchInput: Locator;
    readonly successMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.peopleTab = page
            .locator("#header")
            .getByRole("link", { name: "People", exact: true });
        this.addLeapfroggerButton = page.getByRole('link', { name: 'Add Leapfrogger' });
        this.searchInput = page.locator('[data-cy="search-input"]');
        this.successMessage = page.locator('.toast-message, .success-message, [class*="success"]');

        // this.successToastMessage = page.locator('.Toastify');
    }


async clickAddLeapfroggerButton() {
    await this.peopleTab.click();
    await this.addLeapfroggerButton.click();
}

async searchLeapfrogger(name: string) {
    await this.peopleTab.click();
    await this.searchInput.fill(name);
    await this.page.keyboard.press('Enter');
}

}