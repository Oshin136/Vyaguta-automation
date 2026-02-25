import { Page, Locator } from "@playwright/test";

export class ReminderPage {
  readonly page: Page;
  readonly peopleTab: Locator;
  readonly eventsAndNoticesTab: Locator;
//   readonly reminderTab: Locator;
  readonly addButton: Locator;
  readonly titleInput: Locator;
  readonly linkInput: Locator;
  readonly saveButton: Locator;
  readonly firstReminder: Locator;
  readonly editReminderButton: Locator;
  readonly deleteReminderButton: Locator;
  readonly pastReminders: Locator;
  readonly allReminders: Locator;
  readonly successMessage: Locator;
  readonly validationMessage: Locator;
  readonly reminderTitle: (title: string) => Locator;

  constructor(page: Page) {
    this.page = page;
    this.peopleTab = page
      .locator("#header")
      .getByRole("link", { name: "People", exact: true });
   this.eventsAndNoticesTab = page.getByRole("link", {
      name: "Events and Notices",
    });
    // this.reminderTab = page.locator('a[href="/events-notices/reminders"]');
    this.addButton = page.getByRole("link", { name: "Add Reminder" });
    this.titleInput = page.locator('input[name="title"]');
    this.linkInput = page.locator('[name="redirectUrl"]');
    this.saveButton = page.getByRole("button", { name: "Save" });
    this.firstReminder = page.locator('span.verticle-ellipse.cursor-pointer').first();
    this.editReminderButton = page.locator('li.overflow-menu__item >> text=Edit reminder');
    this.deleteReminderButton = page.getByText('Delete reminder').first();
    this.pastReminders = page.getByRole("button", { name: "Past" });
    this.allReminders = page.getByRole("button", { name: "All" });
    this.successMessage = page.locator('.toast-message, .success-message, [class*="success"]');
    this.validationMessage = page.locator('.error-message, .validation-message, [class*="error"]');
    this.reminderTitle = (title: string) => page.getByText(title).first();
  }

  async clickAddButton() {
    await this.addButton.click();
  }

  async fillReminderForm({
    title,
    description,
    link,
  }: {
    title: string;
    description: string;
    link: string;
  }) {
    await this.titleInput.fill(title);
    await this.linkInput.fill(link);
  }

  async saveReminder() {
    await this.saveButton.click();
  }

  async selectFirstReminder() {
    await this.page.waitForTimeout(1000);
    
    await this.firstReminder.click();
    
    await this.page.waitForSelector('.overflow-menu__item', { state: 'visible' });
    
    const editOption = this.page.locator('.overflow-menu__item').filter({ hasText: 'Edit reminder' });
    await editOption.click({ force: true });
  }

  async deleteReminder() {
    await this.page.waitForTimeout(1000);
    
    await this.firstReminder.click();
    
    await this.page.waitForSelector('.overflow-menu__item', { state: 'visible' });
    
    const deleteOption = this.page.locator('.overflow-menu__item').filter({ hasText: 'Delete reminder' });
    await deleteOption.click({ force: true });
    
    await this.page.getByRole('button', { name: 'Yes, delete' }).click();
  }

  async selectPastReminders() {
    await this.pastReminders.click();
  }

  async selectAllReminders() {
    await this.allReminders.click();
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
    const messageLocator = this.page.getByText(message, { exact: true });
    return await messageLocator.isVisible();
  }

  async isReminderDisplayed(title: string): Promise<boolean> {
    return await this.reminderTitle(title).isVisible();
  }

  async getReminderCount(): Promise<number> {
    const rows = this.page.locator('tbody tr');
    return await rows.count();
  }
}