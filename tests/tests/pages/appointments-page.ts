import { test, expect, Page, Locator} from '@playwright/test';

export class AppointmentsPage {

    readonly appointmentConfirmationMessage : Locator;
    readonly appointmentConfirmationList : Locator;

    constructor(public page: Page) {
        this.appointmentConfirmationMessage = page.locator('//div[contains(text(),"Rendez-vous confirmé !")]');
        this.appointmentConfirmationList = page.locator('.appointments-list');
    }

}
