import { Page, Locator } from "@playwright/test";

export class HolidayPage {
  readonly page: Page;
  readonly peopleTab: Locator;
  readonly eventsAndNoticesTab: Locator;
  readonly holidayTab: Locator;
  readonly addButton: Locator;
  readonly titleInput: Locator;
  readonly descriptionInput: Locator;
  readonly datePicker: Locator;
  readonly calendarNextMonth: Locator;
  readonly calendarPrevMonth: Locator;
  readonly allCountryCheckbox: Locator;
  // readonly vietnamCheckbox: Locator;
  readonly saveButton: Locator;
  readonly firstHoliday: Locator;
  readonly editHolidayButton: Locator;
  readonly deleteHolidayButton: Locator;
  readonly pastHolidays: Locator;
  readonly allHolidays: Locator;
  readonly successMessage: Locator;
  readonly validationMessage: Locator;
  readonly holidayTitle: (title: string) => Locator;
  // readonly getCountryCheckbox: (country: string) => Locator;

  constructor(page: Page) {
    this.page = page;
    this.peopleTab = page
      .locator("#header")
      .getByRole("link", { name: "People", exact: true });
    this.eventsAndNoticesTab = page.getByRole("link", { name: "Events and Notices" });
    this.holidayTab = page.getByRole("link", { name: "Holiday" });
    this.addButton = page.getByRole("link", { name: "Add Holiday" });
    this.titleInput = page.locator('input[name="name"]');
    this.descriptionInput = page.locator("textarea").first();
    this.datePicker = page.getByLabel('Select Date');
    this.calendarNextMonth = page.getByRole('button', { name: 'Move forward to switch to the next month.' });
    this.calendarPrevMonth = page.getByRole('button', { name: 'Move backward to switch to the previous month.' });
    this.allCountryCheckbox = page.getByText('All');
    // this.vietnamCheckbox = page.getByText('Vietnam');
    this.saveButton = page.getByRole("button", { name: "Save" });
    this.firstHoliday = page.locator('span.verticle-ellipse.cursor-pointer').first();
    this.editHolidayButton = page.locator('li.overflow-menu__item >> text=Edit holiday');
    this.pastHolidays = page.getByRole("button", { name: "Past" });
    this.allHolidays = page.getByRole("button", { name: "All" });
    this.deleteHolidayButton = page.getByText('Delete holiday').first();
    this.successMessage = page.locator('.toast-message, .success-message, [class*="success"]');
    this.validationMessage = page.locator('.error-message, .validation-message, [class*="error"]');
    this.holidayTitle = (title: string) => page.getByText(title).first();
  }

  async clickAddButton() {
    await this.addButton.click();
  }



  async selectFutureDate(){
      // Open date picker
      await this.datePicker.click();
      await this.calendarNextMonth.click();
      // Click on the 15th day of the month
      const calendarDay = this.page.locator('td[role="button"]:not([aria-disabled="true"])').filter({ hasText: new RegExp(`^${15}$`) }).first();
      await calendarDay.click();
      
  }

  async selectPastDate(){
    // Open date picker
      await this.datePicker.click();
      await this.calendarPrevMonth.click();
      // Click on the 15th day of the month
      const calendarDay = this.page.locator('td[role="button"]:not([aria-disabled="true"])').filter({ hasText: new RegExp(`^${15}$`) }).first();
      await calendarDay.click();
  }

  async fillHolidayForm({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) {
    await this.titleInput.fill(title);
    await this.descriptionInput.fill(description);
    await this.selectFutureDate();
    await this.allCountryCheckbox.click(); // Default to "All" if no country specified
  }

  async updateHolidayForm({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) {
    await this.titleInput.fill(title);
    await this.descriptionInput.fill(description);
  }
  

  async saveHoliday() {
    await this.saveButton.click();
  }

  async selectFirstHoliday() {
    // Wait for the success message to disappear before interacting with the holiday
    await this.page.waitForTimeout(1000);
    
    await this.firstHoliday.click();
    
    // Wait for the overflow menu to appear
    await this.page.waitForSelector('.overflow-menu__item', { state: 'visible' });
    
    const editOption = this.page.locator('.overflow-menu__item').filter({ hasText: 'Edit holiday' });
    await editOption.click({ force: true });
  }

  async deleteHoliday() {
    // Wait for the success message to disappear before interacting with the holiday
    await this.page.waitForTimeout(1000);
    
    await this.firstHoliday.click();
    
    // Wait for the menu to appear and click delete with force
    await this.page.waitForSelector('.overflow-menu__item', { state: 'visible' });
    
    const deleteOption = this.page.locator('.overflow-menu__item').filter({ hasText: 'Delete holiday' });
    await deleteOption.click({ force: true });
    
    // Click the "Yes, delete" button in the dialog
    await this.page.getByRole('button', { name: 'Yes, delete' }).click();
  }

  async selectPastHolidays() {
    await this.pastHolidays.click();
  }

  async selectAllHolidays() {
    await this.allHolidays.click();
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

  async isHolidayDisplayed(title: string): Promise<boolean> {
    return await this.holidayTitle(title).isVisible();
  }

  async getHolidayCount(): Promise<number> {
    const rows = this.page.locator('tbody tr');
    return await rows.count();
  }
}
