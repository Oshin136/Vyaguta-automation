import {Page, Locator} from "@playwright/test";
import { LoadFnOutput } from "module";

export class OfficialInfoPage {
    readonly page: Page;
    readonly firstName: Locator;
    readonly middleName: Locator;
    readonly lastName: Locator;
    readonly joinDate: Locator;
    readonly recruiteeUrl: Locator;
    readonly employeeEmail: Locator;
    readonly department: Locator;
    readonly leaveIssuer: Locator;
    readonly teamManager: Locator;
    readonly roles: Locator;
    readonly previousExperienceYear: Locator;
    readonly previousExperienceMonth: Locator;
    readonly workingShift: Locator;
    readonly workingType: Locator;
    readonly cvUrl: Locator;
    readonly profilePicture:Locator;
    readonly nextButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstName = page.locator('input[name="firstName"]');
        this.middleName = page.locator('input[name="middleName"]');
        this.lastName = page.locator('input[name="lastName"]');
        this.joinDate = page.getByRole('textbox', { name: 'Select Date' })
        this.recruiteeUrl = page.locator('input[name="recruiteeUrl"]');
        this.employeeEmail = page.locator('[name="username"]');  
        this.department =  page.locator('#react-select-2-input');
        this.leaveIssuer = page.locator('#react-select-3-input');
        this.teamManager = page.locator('#react-select-4-input');
        this.roles = page.locator('#react-select-5-input');
        this.previousExperienceYear = page.locator('[name="pastExperienceYears"]');
        this.previousExperienceMonth = page.locator('[name="pastExperienceMonths"]');
        this.workingType = page.locator('#radio-label__bulb');
        this.workingShift = page.locator('#react-select-6-input');

        this.cvUrl = page.getByRole('textbox', { name: 'ribby.frog/cv' });
        this.profilePicture = page.locator('input[type="file"][accept="image/*"]');
        // this.profilePicture = page.getByText('Click', { exact: tr    ue });
        this.nextButton = page.getByRole('button', { name: 'Next' });
    }

    async fillBasicInformation(){
        await this.firstName.fill('Kenji');
        await this.middleName.fill('Warner');
        await this.lastName.fill('Anderson');
        await this.joinDate.fill('2026-01-01');
        await this.recruiteeUrl.fill('https://recruitee.com/kenjianderson');
        await this.employeeEmail.fill('kenji.anderson@example.com');
    }

    async selectDepartment(department: string) {
        await this.department.click();
        await this.department.type(department);
        await this.page.getByRole('option', { name: department }).click();
    }

    async selectLeaveIssuer(leaveIssuer: string) {
        await this.leaveIssuer.click();
        await this.leaveIssuer.type(leaveIssuer);
        await this.page.getByRole('option', { name: leaveIssuer }).click();
    }

    async selectTeamManager(teamManager: string) {
        await this.teamManager.click();
        await this.teamManager.type(teamManager);
        await this.page.getByRole('option', { name: teamManager }).click();
    }

    async selectRoles(roles: string) {
        await this.roles.click();
        await this.roles.type(roles);
        await this.page.getByRole('option', { name: roles}).click();
    }

    async fillPreviousExperience(year: string, month: string) {

        await this.previousExperienceYear.fill(year);
        await this.previousExperienceMonth.fill(month);
    }

    // async selectWorkingShift(workingShift: string) {
    //     await this.workingShift.click();
    //     await this.workingShift.type(workingShift);
    //     await this.page.getByRole('option', { name: workingShift }).click();
    // }

    async selectWorkingType(workingType: string) {
        // await this.workingType.click();
        await this.page.locator('label', { hasText: workingType }).click();
        // await this.page.getByRole('option', { name: workingType }).check();
    }

    async inputCVUrl(cvUrl: string) {
        await this.cvUrl.fill(cvUrl);
    }

    async uploadProfilePicture(filePath: string) {
        // await this.profilePicture.click();
        // await this.profilePicture.setInputFiles(path.join(__dirname, 'myfile.pdf'));
        await this.profilePicture.setInputFiles(filePath);
    }

    async fillOfficialInformation(info:any) {
        await this.firstName.fill(info.firstName);
        await this.middleName.fill(info.middleName);
        await this.lastName.fill(info.lastName);
        await this.joinDate.fill(info.joinDate);
        await this.recruiteeUrl.fill(info.recruiteeUrl);
        await this.employeeEmail.fill(info.employeeEmail);
        await this.selectDepartment(info.department || 'Engineering');
        await this.selectLeaveIssuer(info.leaveIssuer || 'Oshin');
        await this.selectTeamManager(info.teamManager || 'Rikesh');
        await this.selectRoles(info.roles || 'Default');
        await this.fillPreviousExperience(info.previousExperienceYear, info.previousExperienceMonth);
        await this.selectWorkingType(info.workingType || 'Full Time');
        await this.inputCVUrl(info.cvUrl);
        await this.uploadProfilePicture(info.profilePicture || 'resources/ribby.png');
        await this.nextButton.click();
    }

    
}