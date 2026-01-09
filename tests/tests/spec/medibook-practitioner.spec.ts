import { test, expect} from '../base-test';
import user from '../data/inscription.json';
import search from '../data/search.json';

test.beforeEach(async ({ page, loginPage, homePage, searchPage, practitionersPage }) => {
    await page.goto('/login');
    const { firstName, lastName, email, password } = user.ExistingUser;
    await loginPage.login(email, password);
    await page.waitForURL('/');
    await expect(homePage.titleHomePage).toBeVisible();
    const { specialty, city } = search.SearchDoctorBySpecialtyAndCity;
    await homePage.searchDoctor(specialty, city);
    await expect(searchPage.searchResults).toBeVisible();
    await searchPage.selectFirstPractitioner();
    await expect(practitionersPage.practitionerMainInfo).toBeVisible();
});

test.describe('Medibook Practitioner', () => {

    test('Make an appointment ', async ({ practitionersPage, appointmentsPage }) => {
        await practitionersPage.makeFirstAppointmentAvailable();
        await expect(appointmentsPage.appointmentConfirmationMessage).toBeVisible();
        await expect(appointmentsPage.appointmentConfirmationList).toHaveCount(1);
    });

    

});