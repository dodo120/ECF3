import { test, expect} from '../base-test';
import user from '../data/inscription.json';

test.beforeEach(async ({ page }) => {
    await page.goto('/register');
});

test.describe('Medibook Inscription Tests', () => {

    test('Successful Inscription', async ({ inscriptionPage, homePage, page }) => {
        const { firstName, lastName, email, password } = user.NewUser;
        await inscriptionPage.fillInscriptionForm(firstName, lastName, email, password, password);
        // Wait for navigation to home page after successful inscription
        await page.waitForURL('/');
        await expect(homePage.titleHomePage).toBeVisible();
    });

    test('Inscription with Existing Email', async ({ inscriptionPage }) => {
        const { firstName, lastName, email, password } = user.ExistingUser;
        await inscriptionPage.fillInscriptionForm(firstName, lastName, email, password, password);
        await expect(inscriptionPage.errorMessage).toHaveText('Un compte existe déjà avec cet email');
    });

});