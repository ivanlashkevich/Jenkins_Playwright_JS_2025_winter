import { test, expect } from '@playwright/test';
import { cleanData } from '../support/cleanData';
import genData from '../fixtures/genData';
import { textMessages, cssRequirements } from '../fixtures/headerData.json';
import { projectName, searchResults } from '../fixtures/firstCharacterSearchResultsData';
import { createProject } from '../fixtures/createNewItem';

let project, randomProjectName;

test.beforeEach(async ({page}) => {
    await cleanData();
    await page.goto('/');
    project = genData.newProject();
    randomProjectName = projectName();
    await createProject(page, randomProjectName, 'Freestyle project');
});

test.describe('US_14.002 | Header > Search Box', () => {

    test('TC_14.002.01 | Verify the user can select a suggestion to auto-fill and complete the search', async ({ page }) => {

        await page.locator('#search-box').type(randomProjectName.slice(0, 1));
        await page.locator('#search-box-completion li').getByText(randomProjectName).click();
        await expect(page.locator('#search-box')).toHaveValue(randomProjectName);
        await page.waitForTimeout(500);
        await page.locator('#search-box').press('Enter');
        await expect(page.locator('#main-panel h1')).toHaveText(randomProjectName);
        await expect(page).toHaveTitle(`${randomProjectName} [Jenkins]`);
    });

    test('TC_14.002.02 | Verify the display of the corresponding message if no matches found', async ({page}) => {

        await page.locator('#search-box').type(project.userName);
        await page.locator('#search-box').press('Enter');
        await expect(page.locator('.error')).toHaveText(textMessages.error);
        await expect(page.locator('.error')).toHaveCSS('color', cssRequirements.error);
        await expect(page.locator('.error').getByText('Nothing seems to match.')).toBeVisible();
    });

    test('TC_14.002.03 | Verify that in case of multiple matches the result page displays all matches', async ({ page }) => {

        const firstChar = randomProjectName.slice(0, 1);
        const expectedResults = searchResults.results[firstChar] || [];
        await page.locator('#search-box').type(firstChar);
        await page.locator('#search-box').press('Enter');

        const displayedResults = await page.locator('#main-panel ol li a').evaluateAll(items =>
            items.map(item => item.textContent.trim())
        );
        console.log('Expected Results:', expectedResults);
        console.log('Displayed Results:', displayedResults);

        for (const result of expectedResults) {
            await expect(page.locator('#main-panel ol li a').getByText(result, { exact: true })).toBeVisible();
        }
        expect(displayedResults.length).toBe(expectedResults.length);
    });

    test('TC_14.002.04 | Verify the search results for Lower and Uppercase characters are the same when insensitive search option is activated', async ({page}) =>{

        const firstChar = randomProjectName.slice(0, 1).toLowerCase();
        let  upperCaseExpectedResult, lowerCaseExpectedResult, displayedUpperCaseResult, displayedLowerCaseResult;
        await test.step('Verifying the search results for Uppercase characters are the same', async () => {
            upperCaseExpectedResult = searchResults.results[firstChar.toLowerCase()] || [];
            await page.locator('#page-header .jenkins-menu-dropdown-chevron').click({force: true});
            await page.getByRole('link', { name: 'Configure' }).last().click();
            await expect(page.locator('[name="insensitiveSearch"]')).toBeChecked();
            await page.locator('#search-box').type(firstChar.toUpperCase());
            await page.locator('#search-box').press('Enter');
            
            displayedUpperCaseResult = await page.locator('#main-panel ol li a').evaluateAll(items =>
                items.map(item => item.textContent.trim())
            );
            console.log('Expected Uppercase Results:', upperCaseExpectedResult);
            console.log('Displayed Uppercase Results:', displayedUpperCaseResult);
            expect(displayedUpperCaseResult.sort()).toEqual(upperCaseExpectedResult.sort());
        });
        await test.step('Verifying the search results for Lowercase characters are the same', async () => {
            lowerCaseExpectedResult = searchResults.results[firstChar] || [];
            await page.locator('#search-box').click();
            await page.keyboard.press('Control+A');
            await page.keyboard.press('Backspace');
            await page.locator('#search-box').type(firstChar.toLowerCase());
            await page.locator('#search-box').press('Enter');

            displayedLowerCaseResult = await page.locator('#main-panel ol li a').evaluateAll(items =>
                items.map(item => item.textContent.trim())
            );
            console.log('Expected Lowercase Results:', lowerCaseExpectedResult);
            console.log('Displayed Lowercase Results:', displayedLowerCaseResult);
            
            expect(displayedLowerCaseResult.sort()).toEqual(lowerCaseExpectedResult.sort());
            expect(displayedUpperCaseResult.sort()).toEqual(displayedLowerCaseResult.sort());
        });
    });
});