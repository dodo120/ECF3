import { test, expect, Page, Locator} from '@playwright/test';

export class HomePage {

    readonly titleHomePage : Locator;
    readonly searchSpecialtyInput : Locator;
    readonly searchCityInput : Locator;

    constructor(public page: Page) {
        this.titleHomePage = page.locator('#hero-title');
        this.searchSpecialtyInput = page.locator('#search-specialty');
        this.searchCityInput = page.locator('#search-city');
    }

    async searchDoctor(specialty: string, city: string) {
        const stepName = `Searching for a doctor with speciality: ${specialty} in city: ${city}`;
        console.log(stepName);
        await test.step(stepName, async () => {
            await this.searchSpecialtyInput.fill(specialty);
            await this.searchCityInput.fill(city);
            await this.page.keyboard.press('Enter');
        });
    }
}