import {Page} from "@playwright/test";
import { ApplyAttendancePage } from "../../pageObjects/Attendance/ApplyAttendancePage";

export class ApplyAttendanceService {
    readonly page: Page;
    readonly applyAttendancePage: ApplyAttendancePage;  
    
    constructor(page: Page) {
        this.page = page;
        this.applyAttendancePage = new ApplyAttendancePage(page);
    }   

    async navigateToAttendancePage() {
    await this.applyAttendancePage.attendanceTab.scrollIntoViewIfNeeded();
    await this.applyAttendancePage.attendanceTab.click();
  }
    async applyForOffice() {
        await this.applyAttendancePage.clickFloatingOfficeButton();
    }
    async applyForRemote() {
        await this.applyAttendancePage.clickFloatingRemoteButton();
    }
    // async applyForLeave() {
    //     await this.applyAttendancePage.navigateToAttendanceTab();
    //     await this.applyAttendancePage.clickFloatingLeaveButton();
    // }   
    // async fillWorklog() {
    //     await this.applyAttendancePage.navigateToAttendanceTab();
    //     await this.applyAttendancePage.clickFloatingFillWorklogButton();
    // }

//     async verifyAttendanceApplied(): Promise<boolean> {
//     const toastVisible = await this.applyAttendancePage.isToastMessageVisible();
//     // const titleVisible = await this.applyAttendancePage.successMessage.getByText(title).isVisible();
//     return toastVisible;
//     // && titleVisible;
//   }
}

