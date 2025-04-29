import { test, expect } from '../setup/globalHooks';
import { textMessages, cssRequirements } from '../fixtures/headerData.json';
import { projectName, searchResults } from '../fixtures/firstCharacterSearchResultsData';

let randomProjectName;

test.beforeEach(async ({dashboardPage, newJobPage, freestyleProjectPage, header, createProject}) => {
    randomProjectName = projectName();
    await createProject(randomProjectName, 'Freestyle project');
});

test.describe('US_14.002 | Header > Search Box', () => {

    test('TC_14.002.01 | Verify the user can select a suggestion to auto-fill and complete the search', async ({header, freestyleProjectPage, page}) => {

        await header.typeSearchQuery(randomProjectName.slice(0, 1));
        await header.selectSearchQuery(randomProjectName);
        await expect(header.getSearchField).toHaveValue(randomProjectName);
        await page.waitForTimeout(500);
        await header.pressSearchBox();
        await expect(freestyleProjectPage.getJobHeadline).toHaveText(randomProjectName);
        await expect(page).toHaveTitle(`${randomProjectName} [Jenkins]`);
    });

    test('TC_14.002.02 | Verify the display of the corresponding message if no matches found', async ({header, searchResultsPage, project}) => {

        await header.typeSearchQuery(project.userName);
        await header.pressSearchBox();
        await expect(searchResultsPage.getNoMatchesErrorMessage).toHaveText(textMessages.error);
        await expect(searchResultsPage.getNoMatchesErrorMessage).toHaveCSS('color', cssRequirements.error);
        await expect(searchResultsPage.getNoMatchesErrorMessage).toBeVisible();
    });

    test('TC_14.002.03 | Verify that in case of multiple matches the result page displays all matches', async ({header, searchResultsPage}) => {

        const firstChar = randomProjectName.slice(0, 1);
        const expectedResults = searchResults.results[firstChar] || [];
        await header.typeSearchQuery(firstChar);
        await header.pressSearchBox();

        const displayedResults = await searchResultsPage.retrieveDisplayedResults();
        console.log('Expected Results:', expectedResults);
        console.log('Displayed Results:', displayedResults);

        for (const result of expectedResults) {
            await expect(searchResultsPage.getResultLocator(result)).toBeVisible();
        }
        expect(displayedResults.length).toBe(expectedResults.length);
    });

    test('TC_14.002.04 | Verify the search results for Lower and Uppercase characters are the same when insensitive search option is activated', async ({
        header, searchResultsPage, userPage}) =>{

        const firstChar = randomProjectName.slice(0, 1).toLowerCase();
        let  upperCaseExpectedResult, lowerCaseExpectedResult, displayedUpperCaseResult, displayedLowerCaseResult;
        await test.step('Verifying the search results for Uppercase characters are the same', async () => {
            upperCaseExpectedResult = searchResults.results[firstChar.toLowerCase()] || [];
            await header.clickUsernameChevron();
            await header.clickConfigureDropdownMenuItem();
            await expect(userPage.getInsensitiveSearchCheckbox).toBeChecked();
            await header.typeSearchQuery(firstChar.toUpperCase());
            await header.pressSearchBox();

            displayedUpperCaseResult = await searchResultsPage.retrieveDisplayedResults();
            console.log('Expected Uppercase Results:', upperCaseExpectedResult);
            console.log('Displayed Uppercase Results:', displayedUpperCaseResult);
            
            expect(displayedUpperCaseResult.sort()).toEqual(upperCaseExpectedResult.sort());
        });
        await test.step('Verifying the search results for Lowercase characters are the same', async () => {
            lowerCaseExpectedResult = searchResults.results[firstChar] || [];
            await header.clearSearchField();
            await header.typeSearchQuery(firstChar.toLowerCase());
            await header.pressSearchBox();

            displayedLowerCaseResult = await searchResultsPage.retrieveDisplayedResults();
            console.log('Expected Lowercase Results:', lowerCaseExpectedResult);
            console.log('Displayed Lowercase Results:', displayedLowerCaseResult);
            
            expect(displayedLowerCaseResult.sort()).toEqual(lowerCaseExpectedResult.sort());
            expect(displayedUpperCaseResult.sort()).toEqual(displayedLowerCaseResult.sort());
        });
    });
});