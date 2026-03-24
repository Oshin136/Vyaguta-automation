import {Page, Locator} from "@playwright/test";

export class PersonalInfoPage {
    readonly page: Page
    // readonly gender: Locator;
    readonly personalInfoNavigator: Locator;
    readonly dateOfBirth: Locator;
    readonly bloodGroup: Locator;
    readonly maritalStatus: Locator;
    readonly personalEmail: Locator;
    readonly phoneNumber: Locator;
    readonly alternatePhoneNumber: Locator;
    readonly emergencyContactNumber: Locator; 
    readonly relationWithEmergencyContact: Locator;
    readonly temporaryAddress: Locator;
    readonly permanentAddress: Locator;
    readonly country: Locator;
    readonly timezone: Locator;
    readonly githubId: Locator;
    readonly nextButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.personalInfoNavigator = page.getByText('Personal Information', { exact: true });
        this.dateOfBirth = page.getByRole('textbox', { name: 'Select Date' });
        this.bloodGroup = page.locator('.lf-select__input-container').nth(0);
        this.maritalStatus = page.locator('input[name="maritalStatus"]');
        this.personalEmail = page.locator('[name="personalEmail"]');
        this.phoneNumber = page.locator('[name="mobilePhone"]');
        this.alternatePhoneNumber = page.locator('[name="homePhone"]');
        this.emergencyContactNumber = page.locator('[name="emergencyPhone"]');
        this.relationWithEmergencyContact = page.locator('[name="emergencyContactRelationship"]');
        this.temporaryAddress = page.locator('[name="temporaryAddress"]');
        this.permanentAddress = page.locator('[name="permanentAddress"]');
        this.country = page.locator('.lf-select__input-container').nth(1);
        this.timezone = page.locator('.lf-select__input-container').nth(2);
        this.githubId = page.locator('[name="githubId"]');
        this.nextButton = page.getByRole('button', { name: 'Next' });
    }

    async navigateToPersonalInfo() {
        await this.personalInfoNavigator.click();
    }

    async selectGender(gender: string) {
        await this.page.locator('label', { hasText: gender, exact: true }).first().click();
    }

    async selectBloodGroup(bloodGroup: string) {
        await this.bloodGroup.click();
        await this.page.getByRole('option', { name: bloodGroup, exact: true }).click();
    }

    async selectMaritalStatus(maritalStatus: string) {
        await this.page.locator('label', { hasText: maritalStatus }).click();
    }

    async selectCountry(country: string) {
        await this.country.click();
        await this.country.type(country);
        await this.page.getByRole('option', { name: country, exact: true }).first().click();
    }

    async selectTimezone(timezone: string) {
        await this.timezone.click();
        
        await this.timezone.type(timezone);
        await this.page.getByRole('option', { name: timezone, exact: true }).click();
    }


    async fillPersonalInformation(info:any) {
        await this.selectGender(info.gender || 'Female');
        await this.dateOfBirth.fill(info.dateOfBirth);
        await this.selectBloodGroup(info.bloodGroup || 'A+');
        await this.selectMaritalStatus(info.maritalStatus || 'Single');
        await this.personalEmail.fill(info.personalEmail);
        await this.phoneNumber.fill(info.phoneNumber);
        await this.alternatePhoneNumber.fill(info.alternatePhoneNumber);
        await this.emergencyContactNumber.fill(info.emergencyContactNumber);
        await this.relationWithEmergencyContact.fill(info.relationWithEmergencyContact);
        await this.temporaryAddress.fill(info.temporaryAddress);
        await this.permanentAddress.fill(info.permanentAddress);
        await this.selectCountry(info.country || 'India');
        await this.selectTimezone(info.timezone || '+05:30');
        await this.githubId.fill(info.githubId);
        await this.nextButton.click();
    }

}