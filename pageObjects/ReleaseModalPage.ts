import {Page, Locator} from "@playwright/test";

export class ReleaseModalPage{
    readonly page: Page;
    readonly closeReleaseModal: Locator;

    constructor(page:Page){
      this.page = page;
      // this.closeReleaseModal = page.locator('.releaseNote_module_releaseNoteModal__header_Close__d63012a8');
      this.closeReleaseModal = page.locator(".releaseNote_module_closeIcon__d63012a8");
    }    

}