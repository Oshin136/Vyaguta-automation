import { Page, Locator } from "@playwright/test";

export class ToastMessagePage {
    readonly page: Page;
    readonly successToast: Locator;
    readonly errorToast: Locator;
    readonly infoToast: Locator;

    constructor(page: Page) {
        this.page = page;
        this.successToast = page.locator('.toast-message, .success-message, [class*="success"]');
        this.errorToast = page.locator('.Toastify__toast-body, .Toastify__toast--error, .toast-message, .error-message')
        // this.errorToast = page.locator('.toast-message, .error-message, [class*="error"]');
        this.infoToast = page.locator('.toast-info, .Toastify__toast--info, [data-testid="toast-info"]');
    }

    async getSuccessMessage() {
        await this.successToast.waitFor({ state: 'visible' });
        return (await this.successToast.textContent())?.trim() ?? "";
    }
    async getErrorMessage() {
        await this.errorToast.waitFor({ state: 'visible' });
        return (await this.errorToast.textContent())?.trim() ?? "";
    }

    async getInfoMessage() {
        await this.infoToast.waitFor({ state: 'visible' });
        return (await this.infoToast.textContent())?.trim() ?? "";
    }

     async getAllSuccessMessages() {
            const toastMessages = await this.successToast.all();
            const messages: string[] = [];
            for (const toast of toastMessages) {
                if (await toast.isVisible()) {
                    const text = await toast.textContent();
                    if (text && text.trim()) {
                        messages.push(text.trim());
                    }
                }
            }
            return messages;
        }
}
