import { Page } from "@playwright/test";
import { HolidayPage } from "../../../pageObjects/Core/EventsNotices/HolidayPage";

export class HolidayService {
  readonly page: Page;
  readonly holidayPage: HolidayPage;

  constructor(page: Page) {
    this.page = page;
    this.holidayPage = new HolidayPage(page);
  }

  async navigateToHolidayPage() {
    await this.holidayPage.peopleTab.scrollIntoViewIfNeeded();
    await this.holidayPage.peopleTab.click();
    await this.holidayPage.eventsAndNoticesTab.click();
    await this.holidayPage.holidayTab.click();
  }

  async createHoliday(holidayData: {
    title: string;
    description: string;
  }) {
    await this.navigateToHolidayPage();
    await this.holidayPage.clickAddButton();
    await this.holidayPage.fillHolidayForm(holidayData);
    await this.holidayPage.saveHoliday();
  }

  async updateHoliday(holidayData: {
    title: string;
    description: string;
    // date: string;
  }) {
    await this.holidayPage.selectFirstHoliday();
    await this.holidayPage.updateHolidayForm(holidayData);
    await this.holidayPage.saveHoliday();
  }

  async deleteHoliday() {
    await this.holidayPage.deleteHoliday();
  }

  async selectPastHolidays() {
    await this.navigateToHolidayPage();
    await this.holidayPage.selectPastHolidays();
  }

  async selectAllHolidays() {
    await this.navigateToHolidayPage();
    await this.holidayPage.selectAllHolidays();
  }

  async verifyHolidayCreated(title: string): Promise<boolean> {
    const messageVisible = await this.holidayPage.isSuccessMessageVisible('Holiday created successfully');
    return messageVisible;
  }

  async verifyHolidayUpdated(): Promise<boolean> {
    return await this.holidayPage.isSuccessMessageVisible('Holiday updated successfully');
  }

  async verifyHolidayDeleted(): Promise<boolean> {
    return await this.holidayPage.isSuccessMessageVisible('Holiday deleted successfully');
  }

  async verifyValidationError(message: string): Promise<boolean> {
    return await this.holidayPage.isValidationMessageVisible(message);
  }

  async verifyHolidaysDisplayed(): Promise<boolean> {
    const count = await this.holidayPage.getHolidayCount();
    return count > 0;
  }

  async verifyPastHolidaysUrl(): Promise<boolean> {
    const url = this.page.url();
    return url.includes('referencePeriod=past');
  }

  async verifyAllHolidaysUrl(): Promise<boolean> {
    const url = this.page.url();
    return url.includes('referencePeriod=all');
  }
}
  
