import {Page} from '@playwright/test';
import { ReleaseModalPage } from '../pageObjects/ReleaseModalPage';

export class ReleaseModalService{
    readonly page: Page;
      readonly releaseModal : ReleaseModalPage;
    
      constructor(page:Page){
        this.page = page;
        this.releaseModal = new ReleaseModalPage(page);
      }

      async closeReleaseModal(){
        this.releaseModal.closeReleaseModal.click();
      }
    
}