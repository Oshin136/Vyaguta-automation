import { LeapfroggerPage } from "../pageObjects/LeapfroggerPage";   
import { Page } from "@playwright/test";
import { PersonalInfoPage } from "../pageObjects/PersonalInfoPage";
import { OfficialInfoPage } from "../pageObjects/OfficialInfoPage";
import { HistoryPage } from "../pageObjects/HistoryPage";
import { AppraiserPage } from "../pageObjects/AppraiserPage";

export class AddLeapfroggerService {
    readonly leapfroggerPage: LeapfroggerPage;
    readonly officialInfoPage: OfficialInfoPage;
    readonly personalInfoPage: PersonalInfoPage;
    readonly historyPage: HistoryPage;
    readonly appraiserPage: AppraiserPage;  
    
    constructor(page: Page) {
        this.leapfroggerPage = new LeapfroggerPage(page);
        this.officialInfoPage = new OfficialInfoPage(page);
        this.personalInfoPage = new PersonalInfoPage(page);
        this.historyPage = new HistoryPage(page);
        this.appraiserPage = new AppraiserPage(page);
    }

    async addLeapfrogger(officialInfo:any, personalInfo:any, historyInfo:any) {
        await this.leapfroggerPage.clickAddLeapfroggerButton();
        await this.officialInfoPage.fillOfficialInformation(officialInfo);
        await this.personalInfoPage.fillPersonalInformation(personalInfo);
        await this.historyPage.fillHistoryInformation(
            { status: historyInfo.employmentStatus, startDate: historyInfo.employmentStatusStartDate },
            { designation: historyInfo.designation, transitionDate: historyInfo.transitionDate },
            { area: historyInfo.area }
        );
        await this.appraiserPage.fillAppraisersInformation();
    }

    async getSuccessMessage() {
        await this.leapfroggerPage.successMessage.waitFor({ state: 'visible' });
        return await this.leapfroggerPage.successMessage.textContent();
    }

}