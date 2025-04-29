import { test, expect } from '@playwright/test';
import { cleanData } from '../support/cleanData';
import { createProject } from '../fixtures/createNewItem';
import { itemName, searchSettingsResults } from '../fixtures/firstCharacterSearchResultsData';
import { searchSettings } from '../fixtures/messages.json';

let randomProjectName;

test.beforeEach(async ({page}) => {
    await cleanData();
    await page.goto('/');
    randomProjectName = itemName();
    await createProject(page, randomProjectName, 'Freestyle project');
});

test.describe('US_09.001 | Manage Jenkins > Search settings', () => {

    test('TC_09.001.01 | Verify the search suggestion dropdown displays all matches', async ({page}) => {

        await page.getByRole('link', { name: 'Manage Jenkins' }).click();
        await page.getByRole('searchbox', { name: 'Search settings' }).clear();
        await page.getByRole('searchbox', { name: 'Search settings' }).type(randomProjectName.slice(0, 1));

        const firstChar = randomProjectName.slice(0, 1);
        const expectedResults = searchSettingsResults.results[firstChar];

        const resultLinks = page.locator('.jenkins-search__results a');
        const count = await resultLinks.count();
        for (let i = 0; i < count; i++) {
            await expect(resultLinks.nth(i)).toBeVisible();
        }
        
        const actualResults = await page.locator('.jenkins-search__results a').evaluateAll(items =>
            items.map(item => item.textContent.trim())
        );
        console.log('Expected Results:', expectedResults);
        console.log('Actual Results:', actualResults);
        expect(actualResults).toEqual(expectedResults);
    });

    test('TC_09.001.02 | Verify the possibility to select the desired item from the search suggestion dropdown', async ({page}) => {

        await page.getByRole('link', { name: 'Manage Jenkins' }).click();
        await page.getByRole('searchbox', { name: 'Search settings' }).clear();
        await page.getByRole('searchbox', { name: 'Search settings' }).type(randomProjectName.slice(0, 1));

        const resultLink = page.locator('.jenkins-search__results a');
        const count = await resultLink.count();
        const randomIndex = Math.floor(Math.random() * count);
        const linkText = await resultLink.nth(randomIndex).textContent();
        await resultLink.nth(randomIndex).click();
        
        await expect(page.locator('h1')).toContainText(linkText);
        await expect(page.getByRole('heading', { name: linkText })).toBeVisible();
    });

    test('TC_09.001.03 | Verify the display of the corresponding message in the search suggestion dropdown if no matches found', async ({page}) => {

        await page.getByRole('link', { name: 'Manage Jenkins' }).click();
        await page.getByRole('searchbox', { name: 'Search settings' }).clear();
        await page.getByRole('searchbox', { name: 'Search settings' }).type(randomProjectName);

        await expect(page.locator('.jenkins-search__results')).toHaveText(searchSettings.noResultsError);
        await expect(page.getByText('No results')).toBeVisible();
    });

    test('TC_09.001.04 | Verify the search field is cleared by pressing the "x" button', async ({page}) => {

        await page.getByRole('link', { name: 'Manage Jenkins' }).click();
        await page.getByRole('searchbox', { name: 'Search settings' }).clear();
        await page.getByRole('searchbox', { name: 'Search settings' }).type(randomProjectName);
        await expect(page.getByRole('searchbox', { name: 'Search settings' })).not.toBeEmpty();
        await page.getByRole('searchbox', { name: 'Search settings' }).focus();
        await page.locator('.jenkins-search__shortcut').click({ force: true });

        await expect(page.getByRole('searchbox', { name: 'Search settings' })).toBeEmpty();
    });
});