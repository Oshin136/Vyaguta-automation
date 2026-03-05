import { Page, Locator } from "@playwright/test";

export class ToastMessagePage {
    readonly page: Page;
    readonly successToast: Locator;
    // readonly errorToast: Locator;
    readonly infoToast: Locator;

    constructor(page: Page) {
        this.page = page;
        this.successToast = page.locator('.toast-message, .success-message, [class*="success"]');
        // this.errorToast = page.locator('.error-message, .validation-message, [class*="error"]');
        this.infoToast = page.locator('.toast-info, .Toastify__toast--info, [data-testid="toast-info"]');
    }

    async getSuccessMessage() {
        await this.successToast.waitFor({ state: 'visible' });
        return (await this.successToast.textContent())?.trim() ?? "";
    }

    async getInfoMessage() {
        await this.infoToast.waitFor({ state: 'visible' });
        return (await this.infoToast.textContent())?.trim() ?? "";
    }
}
