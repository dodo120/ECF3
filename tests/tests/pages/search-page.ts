import { test, expect, Page, Locator} from '@playwright/test';

export class SearchPage {

    readonly searchResults : Locator;
    readonly noResultDiv : Locator;
    readonly practitionerFirstCard : Locator;

    constructor(public page: Page) {
        this.searchResults = page.locator('.search-results');
        this.noResultDiv = page.locator('.no-results');
        this.practitionerFirstCard = page.locator('.practitioner-card').first();
    }

    async selectFirstPractitioner() {
        const stepName = `Selecting the first practitioner from the search results`;
        console.log(stepName);
        await test.step(stepName, async () => {
            await this.practitionerFirstCard.click();
        });
    }

}