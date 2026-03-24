import {Page} from "@playwright/test";
import { NoticePage } from "../../../pageObjects/Core/EventsNotices/NoticePage";

export class NoticeService{
  readonly page: Page;
  readonly noticePage : NoticePage;

  constructor(page:Page){
    this.page = page;
    this.noticePage = new NoticePage(page);
  }

  async navigateToNoticePage() {
    await this.noticePage.peopleTab.scrollIntoViewIfNeeded();
    await this.noticePage.peopleTab.click();
    await this.noticePage.eventsAndNoticesTab.click();
    await this.noticePage.noticeTab.click();
  }
  
  async createNotice(noticeData:{
    title: string,
    description: string,
    link: string
  }){
      await this.navigateToNoticePage();
      await this.noticePage.clickAddButton();
      await this.noticePage.fillNoticeForm(noticeData);
      await this.noticePage.saveNotice();
  }

  async updateNotice(noticeData:{
    title: string,
    description: string,    
    link: string
    }){
        await this.navigateToNoticePage();
        await this.noticePage.selectFirstNotice();
        await this.noticePage.fillNoticeForm(noticeData);
        await this.noticePage.saveNotice();
  }

  async deleteNotice(){
    await this.navigateToNoticePage();
    await this.noticePage.deleteNotice();
  } 

  async verifyNoticeCreated(title: string): Promise<boolean> {
    const messageVisible = await this.noticePage.isSuccessMessageVisible('Notice created successfully');    
    // const titleVisible = await this.noticePage.isNoticeDisplayed(title);
    return messageVisible;
    }

    async verifyValidationError(message: string): Promise<boolean> {

        return await this.noticePage.isValidationMessageVisible(message);
    }

    async verifyNoticeUpdated(): Promise<boolean> {
        return await this.noticePage.isSuccessMessageVisible('Notice updated successfully');    
    }

    // async verifyNoticeDeleted(): Promise<boolean> {
    //     return await this.noticePage.isSuccessMessageVisible('Notice deleted successfully');    
    // }

    async isNoticeDisplayed(title: string): Promise<boolean> {
        return await this.noticePage.isNoticeDisplayed(title);
    }

    async verifySelectAllNoticesUrl() {
        const currentUrl = this.page.url();
        return currentUrl.includes('referencePeriod=all');
    }

    async verifySelectPastNoticesUrl() {
        const currentUrl = this.page.url();
        return currentUrl.includes('referencePeriod=past');
    }   
}
