import { Page, Locator } from "@playwright/test";

export class FormValidationPage {
    readonly page: Page;
    // Generic locator for all visible validation error messages
    readonly validationError: Locator;

    constructor(page: Page) {
        this.page = page;
        this.validationError = page.locator('.error-block, .validation-message, [class*="error"]');
    }

    async getFirstValidationError() {
        // Returns the first visible validation error message
        const errors = await this.validationError.all();
        for (const error of errors) {
            if (await error.isVisible()) {
                const text = await error.textContent();
                if (text && text.trim()) {
                    return text.trim();
                }
            }
        }
        return "";
    }

    async getAllValidationErrors() {
        // Returns all visible validation error messages as an array
        const errors = await this.validationError.all();
        const messages: string[] = [];
        for (const error of errors) {
            if (await error.isVisible()) {
                const text = await error.textContent();
                if (text && text.trim()) {
                    messages.push(text.trim());
                }
            }
        }
        return messages;
    }

    async getValidationErrorByField(fieldName: string) {
        // Assumes each error message is associated with a field label or aria-describedby
        const error = this.page.locator(`[data-testid="error-${fieldName}"]`);
        if (await error.isVisible()) {
            return (await error.textContent())?.trim() ?? "";
        }
        return "";
    }
}
