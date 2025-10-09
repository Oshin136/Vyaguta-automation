import { Page, Locator } from "@playwright/test";

export class EventPage {
  readonly page: Page;
  readonly peopleTab: Locator;
  readonly eventsAndNoticesTab: Locator;
  readonly eventTab: Locator;
  readonly addButton: Locator;
  readonly titleInput: Locator;
  // readonly eventDateInput: Locator;
  readonly descriptionInput: Locator;
  readonly linkInput: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.peopleTab = page
      .locator("#header")
      .getByRole("link", { name: "People" }); //used specific due to multiple result for link People
    this.eventsAndNoticesTab = page.getByRole("link", {
      name: "Events and Notices",
    });
    this.eventTab = page.locator('a[href="/events-notices/events"]'); //used specific due to multiple result for link Events
    this.addButton = page.getByRole("link", { name: "Add Event" });
    this.titleInput = page.locator('input[name="name"]'); //get by role, label didn't work
    this.descriptionInput = page.locator("textarea").first();
    this.linkInput = page.locator('input[name="link"]');
    this.saveButton = page.getByRole("button", { name: "Save" });
  }

  async navigateToEventPage() {
    await this.peopleTab.scrollIntoViewIfNeeded();
    await this.peopleTab.click();
    await this.eventsAndNoticesTab.click();
    await this.eventTab.click();
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
}
