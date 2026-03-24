import { Page } from "@playwright/test";
import { EventPage } from "../../../pageObjects/Core/EventsNotices/EventPage";
import { eventSuccessMessages } from "../../../utils/successMessages";
import { eventValidationMessages } from "../../../utils/validationMessages";
import { ToastMessagePage } from "../../../pageObjects/ToastMessagePage";
import { FormValidationPage } from "../../../pageObjects/FormValidationPage";

export class EventService{
  readonly page: Page;
  readonly eventPage : EventPage;
  readonly toastMessagePage: ToastMessagePage;
  readonly formValidationPage: FormValidationPage;

  constructor(page:Page){
    this.page = page;
    this.eventPage = new EventPage(page);
    this.toastMessagePage = new ToastMessagePage(page);
    this.formValidationPage = new FormValidationPage(page);
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
    link: string,
    date: string
  }){
      await this.navigateToEventPage();
      await this.eventPage.clickAddButton();
      await this.eventPage.fillEventForm(eventData);
      await this.eventPage.saveEvent();
  }

  async updateEvent(eventData:{
    title: string,
    description: string,
    link: string,
    date: string
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

  async verifyEventCreated(): Promise<boolean> {
    const messageVisible = await (await this.toastMessagePage.getSuccessMessage()).includes(eventSuccessMessages.create);
    return messageVisible;
  }

  async verifyEventUpdated(): Promise<boolean> {
    const messageVisible = await (await this.toastMessagePage.getSuccessMessage()).includes(eventSuccessMessages.update);
    return messageVisible;
  }

  async verifyEventDeleted(): Promise<boolean> {
    const messageVisible = await (await this.toastMessagePage.getSuccessMessage()).includes(eventSuccessMessages.delete);
    return messageVisible;
  }

  async verifyValidationError(): Promise<boolean> {
    const messageVisible = await (await this.formValidationPage.getFirstValidationError()).includes(eventValidationMessages.title);
    return messageVisible;
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
