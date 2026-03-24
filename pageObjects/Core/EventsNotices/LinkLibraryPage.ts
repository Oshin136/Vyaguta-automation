import {Page, Locator} from "@playwright/test";
export class LinkLibraryPage {
    readonly page: Page;
    readonly peopleTab: Locator;
    readonly eventsAndNoticesTab: Locator;
    readonly linkLibraryTab: Locator;
    readonly addCategoryButton: Locator;
    readonly categoryNameInput: Locator;
    readonly saveCategoryButton: Locator;
    readonly categoryActionsButton: Locator;
    readonly editCategoryButton: Locator;
    readonly deleteCategoryButton: Locator;
    readonly addSubcategoryButton: Locator;
    readonly subcategoryNameInput: Locator;
    // readonly saveSubcategoryButton: Locator;
    readonly accordionOpen: Locator;
    readonly subcategoryActionsButton: Locator;
    // readonly deleteSubcategoryButton: Locator;
    readonly addLinkButton: Locator;
    readonly linkNameInput: Locator;
    readonly linkUrlInput: Locator

    constructor(page: Page) {
        this.page = page;
        this.peopleTab = page
            .locator("#header")
            .getByRole("link", { name: "People", exact: true });
        this.eventsAndNoticesTab = page.getByRole("link", { name: "Events and Notices" });
        this.linkLibraryTab = page.getByRole("link", { name: "Link Library", exact: true });
        this.addCategoryButton = page.getByRole('button', { name: 'Add new category' });
        this.categoryNameInput = page.getByRole('textbox', { name: 'Write the name of the category' });
        this.saveCategoryButton = page.locator(`button[type="submit"]`);
        this.categoryActionsButton = page.locator(`span.vertical-ellipsis > div > svg`).last(); //added category is shown at the end of the list list, so we can use .last() to select it
        this.editCategoryButton = page.locator(`span:has-text("Edit")`);
        this.addSubcategoryButton = page.locator(`span:has-text("Add new sub-category")`);
        this.deleteCategoryButton = page.locator(`li:has-text("Delete")`);
        this.subcategoryNameInput = page.getByRole('textbox', { name: 'Write the name of the sub-category' });
        this.accordionOpen = page.locator('.rst__row').last(); //added category is shown at the end of the list list, so we can use .last() to select it
        this.subcategoryActionsButton = page.locator(`span.vertical-ellipsis > div > svg`).last(); //added subcategory is shown at the end of the list list, so we can use .last() to select it
        // this.deleteSubcategoryButton = page.locator(`li:has-text("Delete")`);
        this.addLinkButton = page.locator(`span:has-text("Add new link")`);
        this.linkNameInput = page.getByRole('textbox', { name: 'Write the name of the link' });
        this.linkUrlInput = page.getByRole('textbox', { name: 'URL link here' });;
    }

    async navigateToLinkLibrary() {
        await this.peopleTab.click();
        await this.eventsAndNoticesTab.click();
        await this.linkLibraryTab.click();
    }

    async addCategory(categoryName: string) {
        await this.addCategoryButton.click();
        await this.categoryNameInput.fill(categoryName);
        await this.saveCategoryButton.click();
    }

    async addSubcategory(subcategoryName: string) {
        // await this.accordionOpen.click();
        await this.categoryActionsButton.click();
        await this.addSubcategoryButton.click();
        await this.subcategoryNameInput.waitFor({ state: 'visible' });
        await this.subcategoryNameInput.fill(subcategoryName);
        await this.saveCategoryButton.click();
    }

    async addLink(linkName: string, linkUrl: string) {
        await this.accordionOpen.scrollIntoViewIfNeeded();
        await this.accordionOpen.waitFor({ state: 'visible' });
        await this.accordionOpen.click();
        await this.accordionOpen.click();
        await this.subcategoryActionsButton.click();
        await this.addLinkButton.scrollIntoViewIfNeeded();
        await this.addLinkButton.waitFor({ state: 'visible' });
        await this.addLinkButton.click();
        await this.linkNameInput.waitFor({ state: 'visible' });
        await this.linkNameInput.fill(linkName);
        await this.linkUrlInput.fill(linkUrl);
        await this.saveCategoryButton.click();
    }

    async editCategory(newName: string) {
        await this.page.waitForTimeout(1000);
        await this.categoryActionsButton.click();
        await this.editCategoryButton.click();
        await this.categoryNameInput.clear();
        await this.categoryNameInput.fill(newName);
        await this.saveCategoryButton.click();
    }

    async deleteCategory() {
        await this.page.waitForTimeout(1000);
        await this.categoryActionsButton.click();
        await this.deleteCategoryButton.click();
        await this.page.getByRole('button', { name: 'Yes, delete' }).click();
    }

    async deleteLink() {
        await this.accordionOpen.scrollIntoViewIfNeeded();
        await this.accordionOpen.waitFor({ state: 'visible' });
        await this.accordionOpen.click();
        // await this.accordionOpen.click();
        await this.subcategoryActionsButton.click();
        await this.page.locator(`li:has-text("Delete")`).click();
        await this.page.getByRole('button', { name: 'Yes, delete' }).click();
    }
}