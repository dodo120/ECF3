import { test as base, expect } from '@playwright/test';
import { InscriptionPage } from './pages/inscription-page';
import { HomePage } from './pages/home-page';
import { SearchPage } from './pages/search-page';
import { PractitionersPage } from './pages/practitioners-page';
import { LoginPage } from './pages/login-page';
import { AppointmentsPage } from './pages/appointments-page';

type MyFixtures = {
    inscriptionPage: InscriptionPage;
    homePage: HomePage;
    searchPage: SearchPage;
    practitionersPage: PractitionersPage;
    loginPage: LoginPage;
    appointmentsPage: AppointmentsPage;
};

export const test = base.extend<MyFixtures>({
    inscriptionPage: async ({ page }, use) => {
        const inscriptionPage = new InscriptionPage(page);
        await use(inscriptionPage);
    },
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await use(homePage);
    },
    searchPage: async ({ page }, use) => {
        const searchPage = new SearchPage(page);
        await use(searchPage);
    },
    practitionersPage: async ({ page }, use) => {
        const practitionersPage = new PractitionersPage(page);
        await use(practitionersPage);
    },
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
    appointmentsPage: async ({ page }, use) => {
        const appointmentsPage = new AppointmentsPage(page);
        await use(appointmentsPage);
    }
});

export { expect } from '@playwright/test';