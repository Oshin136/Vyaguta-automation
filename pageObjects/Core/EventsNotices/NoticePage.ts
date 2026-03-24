import {Page, Locator} from '@playwright/test';

export class NoticePage {
    readonly page: Page;
    readonly peopleTab: Locator;
    readonly eventsAndNoticesTab: Locator;
    readonly noticeTab: Locator;
    readonly addButton: Locator;
    readonly titleInput: Locator;
    readonly descriptionInput: Locator;
    readonly linkInput: Locator
    readonly saveButton: Locator;
    readonly firstNotice: Locator;
    readonly editNoticeButton: Locator;
    readonly deleteNoticeButton: Locator
    readonly successMessage: Locator;
    readonly validationMessage: Locator;
    readonly noticeTitle: (title: string) => Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.peopleTab = page
            .locator("#header")
            .getByRole("link", { name: "People", exact: true });
        this.eventsAndNoticesTab = page.getByRole("link", { name: "Events and Notices" });
        this.noticeTab = page.getByRole("link", { name: "Notice", exact: true });
        this.addButton = page.getByRole("link", { name: "Add Notice" });
        this.titleInput = page.locator('input[name="title"]');
        this.descriptionInput = page.locator('textarea[name="description"]').first();
        this.linkInput = page.locator('input[name="redirectUrl"]');
        this.saveButton = page.getByRole("button", { name: "Save" });
        this.firstNotice = page.locator('span.verticle-ellipse.cursor-pointer').first();
        this.editNoticeButton = page.locator('li.overflow-menu__item >> text=Edit notice');
        this.deleteNoticeButton = page.getByText('Delete notice').first();
        this.successMessage = page.locator('.toast-message, .success-message, [class*="success"]');
        this.validationMessage = page.locator('.error-message, .validation-message, [class*="error"]');
        this.noticeTitle = (title: string) => page.getByText(title).first();
    }


async clickAddButton() {
    await this.addButton.click();
}

async fillNoticeForm({
    title,
    description,
    link,
    }: {
    title: string;
    description: string;
    link: string;
    }) {
    await this.titleInput.fill(title);
    await this.descriptionInput.fill(description);
    await this.linkInput.fill(link);
    
    // Wait a bit for form validation
    await this.page.waitForTimeout(500);
}

async saveNotice() {
    // Wait for Save button to be enabled
    await this.saveButton.waitFor({ state: 'visible' });
    await this.page.waitForTimeout(1000); // Wait for form validation to complete
    await this.saveButton.click({ force: true });
}

async deleteNotice() {
    // Wait before interacting to ensure page is stable
    await this.page.waitForTimeout(1000);
    
    await this.firstNotice.click();
    
    // Wait for the overflow menu to appear
    await this.page.waitForSelector('.overflow-menu__item', { state: 'visible' });
    
    const deleteOption = this.page.locator('.overflow-menu__item').filter({ hasText: 'Delete notice' });
    await deleteOption.click({ force: true });
    
    // Wait for the dialog to appear and for the delete button to be enabled
    const yesDeleteButton = this.page.getByRole('button', { name: 'Yes, delete' });
    await yesDeleteButton.waitFor({ state: 'visible', timeout: 3000 });
    await this.page.waitForTimeout(500); // Wait for button to be enabled
    await yesDeleteButton.click({ force: true });
}   

async isSuccessMessageVisible(message: string): Promise<boolean> {
    try {
        const messageLocator = this.page.getByText(message);
        await messageLocator.waitFor({ state: 'visible', timeout: 5000 });
        return true;
    } catch (error) {
        return false;
    }
}

async isValidationMessageVisible(message: string): Promise<boolean> {
    const messageLocator = this.validationMessage.filter({ hasText: message });
    return await messageLocator.isVisible();
}

async isNoticeDisplayed(title: string): Promise<boolean> {
    const noticeLocator = this.noticeTitle(title);
    return await noticeLocator.isVisible();
}

async selectFirstNotice() {
    // Wait for the success message to disappear before interacting with the notice
    await this.page.waitForTimeout(1000);
    await this.firstNotice.click();
    // Wait for the overflow menu to appear
    await this.page.waitForSelector('.overflow-menu__item', { state: 'visible' });
    const editOption = this.page.locator('.overflow-menu__item').filter({ hasText: 'Edit notice' });
    await editOption.click({ force: true });
}

async selectAllNotices() {
    await this.page.getByRole("button", { name: "All" }).click();
}

async selectPastNotices() {
    await this.page.getByRole("button", { name: "Past" }).click();
}   

}