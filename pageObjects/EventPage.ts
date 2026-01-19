import { Page, Locator } from "@playwright/test";

export class EventPage {
  readonly page: Page;
  readonly peopleTab: Locator;
  readonly eventsAndNoticesTab: Locator;
  readonly eventTab: Locator;
  readonly addButton: Locator;
  readonly titleInput: Locator;
  readonly descriptionInput: Locator;
  readonly linkInput: Locator;
  readonly saveButton: Locator;
  readonly firstEvent: Locator;
  readonly editEventButton: Locator;
  readonly deleteEventButton: Locator;
  readonly pastEvents: Locator;
  readonly allEvents: Locator;
  readonly successMessage: Locator;
  readonly validationMessage: Locator;
  readonly eventTitle: (title: string) => Locator;

  constructor(page: Page) {
    this.page = page;
    this.peopleTab = page
      .locator("#header")
      .getByRole("link", { name: "People", exact: true }); //used specific due to multiple result for link People
    this.eventsAndNoticesTab = page.getByRole("link", {
      name: "Events and Notices",
    });
    this.eventTab = page.locator('a[href="/events-notices/events"]'); //used specific due to multiple result for link Events
    this.addButton = page.getByRole("link", { name: "Add Event" });
    this.titleInput = page.locator('input[name="name"]'); //get by role, label didn't work
    this.descriptionInput = page.locator("textarea").first();
    this.linkInput = page.locator('input[name="link"]');
    this.saveButton = page.getByRole("button", { name: "Save" });
    this.firstEvent = page.locator('span.verticle-ellipse.cursor-pointer').first();
    this.editEventButton = page.locator('li.overflow-menu__item >> text=Edit event');
    this.deleteEventButton = page.getByText('Delete event').first();
    this.pastEvents = page.getByRole("button", { name: "Past" });
    this.allEvents = page.getByRole("button", { name: "All" });
    this.successMessage = page.locator('.toast-message, .success-message, [class*="success"]');
    this.validationMessage = page.locator('.error-message, .validation-message, [class*="error"]');
    this.eventTitle = (title: string) => page.getByText(title).first();
  }

  async clickAddButton() {
    await this.addButton.click();
  }

  async fillEventForm({
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
  }

  async saveEvent() {
    await this.saveButton.click();
  }

  async selectFirstEvent() {
    // Wait for the success message to disappear before interacting with the event
    await this.page.waitForTimeout(1000);
    
    await this.firstEvent.click();
    
    // Wait for the overflow menu to appear
    await this.page.waitForSelector('.overflow-menu__item', { state: 'visible' });
    
    const editOption = this.page.locator('.overflow-menu__item').filter({ hasText: 'Edit event' });
    await editOption.click({ force: true });
  }

  async deleteEvent() {
    // Wait for the success message to disappear before interacting with the event
    await this.page.waitForTimeout(1000);
    
    await this.firstEvent.click();
    
    // Wait for the menu to appear and click delete with force
    await this.page.waitForSelector('.overflow-menu__item', { state: 'visible' });
    
    const deleteOption = this.page.locator('.overflow-menu__item').filter({ hasText: 'Delete event' });
    await deleteOption.click({ force: true });
    
    // Click the "Yes, delete" button in the dialog
    await this.page.getByRole('button', { name: 'Yes, delete' }).click();
  }

  async selectPastEvents() {
    await this.pastEvents.click();
  }

  async selectAllEvents() {
    await this.allEvents.click();
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

  async isEventDisplayed(title: string): Promise<boolean> {
    return await this.eventTitle(title).isVisible();
  }

  async getEventCount(): Promise<number> {
    const rows = this.page.locator('tbody tr');
    return await rows.count();
  }
}
