import { test, expect, Page, Locator} from '@playwright/test';

export class InscriptionPage {

    readonly firstNameInput : Locator;
    readonly lastNameInput : Locator;
    readonly emailInput : Locator;
    readonly passwordInput : Locator;
    readonly confirmPasswordInput : Locator;
    readonly termsCheckbox : Locator;
    readonly submitButton : Locator;
    readonly errorMessage : Locator;

    constructor(public page: Page) {
        this.firstNameInput = page.locator('#firstName');
        this.lastNameInput = page.locator('#lastName');
        this.emailInput = page.locator('#email');
        this.passwordInput = page.locator('#password');
        this.confirmPasswordInput = page.locator('#confirmPassword');
        this.termsCheckbox = page.locator('input[name="acceptTerms"]');
        this.submitButton = page.locator('button[type="submit"]');
        this.errorMessage = page.locator('div[role="alert"]');
    }

    async fillInscriptionForm(firstName: string, lastName: string, email: string, password: string, confirmPassword: string, termsCheckbox: boolean = true) {
        const stepName = `Filling inscription form with: ${firstName}, ${lastName}, ${email}`;
        console.log(stepName);
        await test.step(stepName, async () => {
            await this.firstNameInput.fill(firstName);
            await this.lastNameInput.fill(lastName);
            await this.emailInput.fill(email);
            await this.passwordInput.fill(password);
            await this.confirmPasswordInput.fill(confirmPassword);
            if (termsCheckbox) {
                await this.termsCheckbox.check();
            } 
            await this.submitButton.click();
        });
    }
}