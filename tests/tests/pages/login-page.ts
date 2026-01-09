import { test, expect, Page, Locator} from '@playwright/test';

export class LoginPage {

    readonly emailInput : Locator;
    readonly passwordInput : Locator;
    readonly connexionButton : Locator;

    constructor(public page: Page) {
        this.emailInput = page.locator('#email');
        this.passwordInput = page.locator('#password');
        this.connexionButton = page.locator('button[type="submit"]');
    }

    async login(email: string, password: string) {
        const stepName = `Logging in with email: ${email}`;
        console.log(stepName);
        await test.step(stepName, async () => {
            await this.emailInput.fill(email);
            await this.passwordInput.fill(password);
            await this.connexionButton.click();
        });
    }
}