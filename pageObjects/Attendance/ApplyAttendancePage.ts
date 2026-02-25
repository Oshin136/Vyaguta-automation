import { Page, Locator } from "@playwright/test"; 

export class ApplyAttendancePage {
    readonly page: Page;
    readonly attendanceTab: Locator;
    // readonly heatmapButton: Locator;
    // readonly heatmapOfficeButton: Locator;
    // readonly heatmapRemoteButton: Locator;
    // readonly heatmapLeaveButton: Locator;
    // readonly heatmapFillWorklogButton: Locator;
    readonly floatingOfficeButton: Locator;
    readonly floatingRemoteButton: Locator;
    readonly floatingLeaveButton: Locator;
    readonly floatingFillWorklogButton: Locator;
    readonly successMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.attendanceTab = page.locator('#header').getByRole('link', { name: 'Attendance' });
        // this.heatmapButton = page.locator('.heatmap-data-row__box.relative.bg-tertiary-green--80 > a');
        // this.heatmapOfficeButton = page.getByRole('button', { name: 'OFFICE', exact: true });
        // this.heatmapRemoteButton = page.getByRole('button', { name: 'REMOTE', exact: true });
        // this.heatmapLeaveButton = page.getByRole('button', { name: 'LEAVE', exact: true });
        // this.heatmapFillWorklogButton = page.getByRole('button', { name: 'Fill today\'s worklog' });
        this.floatingOfficeButton = page.getByRole('button', { name: 'I am working from office' });
        this.floatingRemoteButton = page.getByRole('button', { name: 'I am working remotely' });
        this.floatingLeaveButton = page.getByRole('button', { name: 'I am on leave' });
        this.floatingFillWorklogButton = page.getByRole('button', { name: 'Fill today\'s worklog' }).nth(1);
        // this.successMessage = page.locator('.toast-message, .success-message, [class*="success"]');
        this.successMessage = page.locator('p:has-text("Your attendance has been updated.")');

    }

    // async navigateToAttendanceTab() {
    //     await this.attendanceTab.click();
    // }

    // async hoverHeatmapButton() {
    //     await this.heatmapButton.first().hover();
    // }

    // async clickHeatmapOfficeButton() {
    //     await this.heatmapOfficeButton.click();
    // }

    // async clickHeatmapRemoteButton() {
    //     await this.heatmapRemoteButton.click();
    // }   

    // async clickHeatmapLeaveButton() {
    //     await this.heatmapLeaveButton.click();
    // }   

    // async clickHeatmapFillWorklogButton() {
    //     await this.heatmapFillWorklogButton.click();
    // }   

    async clickFloatingOfficeButton() {
        await this.floatingOfficeButton.click();
    }   

    async clickFloatingRemoteButton() {
        await this.floatingRemoteButton.click();
    }   

    async clickFloatingLeaveButton() {
        await this.floatingLeaveButton.click();
    }   

    async clickFloatingFillWorklogButton() {
        await this.floatingFillWorklogButton.click();
    }   
    // async isToastMessageVisible(): Promise<boolean> {
    //     await this.successMessage.waitFor({ state: 'visible', timeout: 5000 });
    //     return await this.successMessage.isVisible();
    // }

}
