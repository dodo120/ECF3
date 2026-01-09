import { test, expect, Page, Locator} from '@playwright/test';

export class PractitionersPage {

    readonly practitionerMainInfo : Locator;
    readonly firstAppointmentDay : Locator;
    readonly firstAppointmentSlot : Locator;
    readonly buttonBookAppointment : Locator;

    constructor(public page: Page) {
        this.practitionerMainInfo = page.locator('.practitioner-main-info');
        this.firstAppointmentDay = page.locator('//button[contains(@class, "day-btn") and not(contains(@class, "disabled"))]').first();
        this.firstAppointmentSlot = page.locator('.slot-btn').first();
        this.buttonBookAppointment = page.locator('//button[contains(text(),"Confirmer le rendez-vous")]');
    }

    async makeFirstAppointmentAvailable() {
        const stepName = `Making the first available appointment with the practitioner`;
        console.log(stepName);
        await test.step(stepName, async () => {
            await this.firstAppointmentDay.click();
            await this.firstAppointmentSlot.click();
            await this.buttonBookAppointment.click();
        });
    }

    
}