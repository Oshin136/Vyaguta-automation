import { Page } from "@playwright/test";
import { ReminderPage } from "../../../pageObjects/Core/EventsNotices/ReminderPage";

export class ReminderService{
  readonly page: Page;
  readonly reminderPage : ReminderPage;

  constructor(page:Page){
    this.page = page;
    this.reminderPage = new ReminderPage(page);
  }

  async navigateToReminderPage() {
    await this.reminderPage.peopleTab.scrollIntoViewIfNeeded();
    await this.reminderPage.peopleTab.click();
    await this.reminderPage.eventsAndNoticesTab.click();
    // await this.reminderPage.reminderTab.click();
  }

  async createReminder(reminderData:{
    title: string,
    description: string,
    link: string
  }){
      await this.navigateToReminderPage();
      await this.reminderPage.clickAddButton();
      await this.reminderPage.fillReminderForm(reminderData);
      await this.reminderPage.saveReminder();
  }

  async updateReminder(reminderData:{
    title: string,
    description: string,
    link: string
  }){
      await this.navigateToReminderPage();
      await this.reminderPage.selectFirstReminder();
      await this.reminderPage.fillReminderForm(reminderData);
      await this.reminderPage.saveReminder();
  }

  async deleteReminder(){
    await this.navigateToReminderPage();
    await this.reminderPage.deleteReminder();
  }

  async selectPastReminders() {
    await this.navigateToReminderPage();
    await this.reminderPage.selectPastReminders();
  }

  async selectAllReminders() {
    await this.navigateToReminderPage();
    await this.reminderPage.selectAllReminders();
  }

  async verifyReminderCreated(title: string): Promise<boolean> {
    const messageVisible = await this.reminderPage.isSuccessMessageVisible('Reminder created successfully');
    return messageVisible;
  }

  async verifyReminderUpdated(): Promise<boolean> {
    return await this.reminderPage.isSuccessMessageVisible('Reminder updated successfully');
  }

  async verifyReminderDeleted(): Promise<boolean> {
    return await this.reminderPage.isSuccessMessageVisible('Reminder deleted successfully');
  }

  async verifyValidationError(message: string): Promise<boolean> {
    return await this.reminderPage.isValidationMessageVisible(message);
  }

  async verifyRemindersDisplayed(): Promise<boolean> {
    const count = await this.reminderPage.getReminderCount();
    return count > 0;
  }

  async verifyPastRemindersUrl(): Promise<boolean> {
    const url = this.page.url();
    return url.includes('type=past');
  }

  async verifyAllRemindersUrl(): Promise<boolean> {
    const url = this.page.url();
    return url.includes('type=all');
  }
}