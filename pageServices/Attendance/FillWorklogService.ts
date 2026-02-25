import { Page } from "@playwright/test";
import { FillWorklogPage } from "../../pageObjects/Attendance/FillWorklogPage"; 

export class FillWorklogService {
    readonly page: Page;
    readonly fillWorklogPage: FillWorklogPage;

    constructor(page: Page) {
        this.page = page;
        this.fillWorklogPage = new FillWorklogPage(page);
    }

    async fillWorklog(worklogData: { project: string; task: string; details: string; time: string }) {
        await this.fillWorklogPage.navigateToFillWorklog();
        await this.fillWorklogPage.projectDropdown.click();
        await this.fillWorklogPage.projectOption.fill(worklogData.project);
        await this.fillWorklogPage.projectOption.press('Enter');
        await this.fillWorklogPage.taskDropdown.click();
        await this.fillWorklogPage.taskOption.click();
        await this.fillWorklogPage.detailsTextbox.fill(worklogData.details);
        await this.fillWorklogPage.timeTextbox.fill(worklogData.time);
        await this.fillWorklogPage.submitButton.click();
    }

    async cancelWorklog() {
        // await this.fillWorklogPage.navigateToFillWorklog();
        await this.fillWorklogPage.cancelWorklog();
    }
   
}