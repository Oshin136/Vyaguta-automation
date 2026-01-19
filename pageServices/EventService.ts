import { Page } from "@playwright/test";
import { EventPage } from "../pageObjects/EventPage";

export class EventService{
  readonly page: Page;
  readonly eventPage : EventPage;

  constructor(page:Page){
    this.page = page;
    this.eventPage = new EventPage(page);
  }

  async navigateToEventPage() {
    await this.eventPage.peopleTab.scrollIntoViewIfNeeded();
    await this.eventPage.peopleTab.click();
    await this.eventPage.eventsAndNoticesTab.click();
    await this.eventPage.eventTab.click();
  }

  async createEvent(eventData:{
    title: string,
    description: string,
    link: string
  }){
      await this.navigateToEventPage();
      await this.eventPage.clickAddButton();
      await this.eventPage.fillEventForm(eventData);
      await this.eventPage.saveEvent();
  }

  async updateEvent(eventData:{
    title: string,
    description: string,
    link: string
  }){
      await this.navigateToEventPage();
      await this.eventPage.selectFirstEvent();
      await this.eventPage.fillEventForm(eventData);
      await this.eventPage.saveEvent();
  }

  async deleteEvent(){
    await this.navigateToEventPage();
    await this.eventPage.deleteEvent();
  }

  async selectPastEvents() {
    await this.navigateToEventPage();
    await this.eventPage.selectPastEvents();
  }

  async selectAllEvents() {
    await this.navigateToEventPage();
    await this.eventPage.selectAllEvents();
  }

  async verifyEventCreated(title: string): Promise<boolean> {
    const messageVisible = await this.eventPage.isSuccessMessageVisible('Event created successfully');
    // const titleVisible = await this.eventPage.isEventDisplayed(title);
    return messageVisible;
    // && titleVisible;
  }

  async verifyEventUpdated(): Promise<boolean> {
    return await this.eventPage.isSuccessMessageVisible('Event updated successfully');
  }

  async verifyEventDeleted(): Promise<boolean> {
    return await this.eventPage.isSuccessMessageVisible('Event deleted successfully');
  }

  async verifyValidationError(message: string): Promise<boolean> {
    return await this.eventPage.isValidationMessageVisible(message);
  }

  async verifyEventsDisplayed(): Promise<boolean> {
    const count = await this.eventPage.getEventCount();
    return count > 0;
  }

  async verifyPastEventsUrl(): Promise<boolean> {
    const url = this.page.url();
    return url.includes('referencePeriod=past');
  }

  async verifyAllEventsUrl(): Promise<boolean> {
    const url = this.page.url();
    return url.includes('referencePeriod=all');
  }
}
