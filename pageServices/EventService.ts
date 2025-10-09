import { Page } from "@playwright/test";
import { EventPage } from "../pageObjects/EventPage";

export class EventService{
  readonly page: Page;
  readonly eventPage : EventPage;

  constructor(page:Page){
    this.page = page;
    this.eventPage = new EventPage(page);
  }

  async createEvent(eventData:{
    title: string,
    description: string,
    link: string
  }){
      await this.eventPage.navigateToEventPage();
      await this.eventPage.clickAddButton();
      await this.eventPage.fillEventForm(eventData);
      await this.eventPage.saveEvent();
  }
}
