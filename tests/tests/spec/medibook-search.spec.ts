import { test, expect} from '../base-test';
import search from '../data/search.json';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
});

test.describe('Medibook Home Page Tests', () => {

    test('Search Doctor by Speciality and City With Results', async ({ homePage, searchPage }) => {
        const { specialty, city } = search.SearchDoctorBySpecialtyAndCity;
        await homePage.searchDoctor(specialty, city);
        await expect(searchPage.searchResults).toBeVisible();
    });

    test('Search Doctor by Speciality and City Without Results', async ({ homePage, searchPage }) => {
        const { specialty, city } = search.SearchWithoutResults;
        await homePage.searchDoctor(specialty, city);
        await expect(searchPage.noResultDiv).toBeVisible();
    });

});