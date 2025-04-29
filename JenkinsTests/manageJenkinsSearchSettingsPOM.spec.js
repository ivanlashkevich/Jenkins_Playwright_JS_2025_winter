import { test, expect } from '../setup/globalHooks';
import { createProject } from '../fixtures/createNewItem';
import { itemName, searchSettingsResults } from '../fixtures/firstCharacterSearchResultsData';
import { searchSettings } from '../fixtures/messages.json';

let randomProjectName;

test.beforeEach(async ({page, dashboardPage, newJobPage, basePage, header, project}) => {
    randomProjectName = itemName();
    await createProject(page, randomProjectName, 'Freestyle project');
});

test.describe('US_09.001 | Manage Jenkins > Search settings', () => {

    test('TC_09.001.01 | Verify the search suggestion dropdown displays all matches', async ({dashboardPage, manageJenkinsPage}) => {

        await dashboardPage.clickManageJenkinsMenuOption();
        await manageJenkinsPage.clearSearchSettingsField();
        await manageJenkinsPage.typeSearchSettingsQuery(randomProjectName.slice(0, 1));

        const firstChar = randomProjectName.slice(0, 1);
        const expectedResults = searchSettingsResults.results[firstChar];

        const count = await manageJenkinsPage.getSearchSettingsResults.count();
        for (let i = 0; i < count; i++) {
            await expect(manageJenkinsPage.getSearchSettingsResults.nth(i)).toBeVisible();
        }
        
        const actualResults = await manageJenkinsPage.getSearchSettingsResults.evaluateAll(items =>
            items.map(item => item.textContent.trim())
        );
        console.log('Expected Results:', expectedResults);
        console.log('Actual Results:', actualResults);
        expect(actualResults).toEqual(expectedResults);
    });

    test('TC_09.001.02 | Verify the possibility to select the desired item from the search suggestion dropdown', async ({
        dashboardPage, manageJenkinsPage}) => {

        await dashboardPage.clickManageJenkinsMenuOption();
        await manageJenkinsPage.clearSearchSettingsField();
        await manageJenkinsPage.typeSearchSettingsQuery(randomProjectName.slice(0, 1));

        const count = await manageJenkinsPage.getSearchSettingsResults.count();
        const randomIndex = Math.floor(Math.random() * count);
        const linkText = await manageJenkinsPage.getSearchSettingsResults.nth(randomIndex).textContent();
        await manageJenkinsPage.getSearchSettingsResults.nth(randomIndex).click();
        
        await expect(manageJenkinsPage.getPageHeadline).toContainText(linkText);
        await expect(manageJenkinsPage.getPageHeading(linkText)).toBeVisible();
    });

    test('TC_09.001.03 | Verify the display of the corresponding message in the search suggestion dropdown if no matches found', async ({
        dashboardPage, manageJenkinsPage}) => {

        await dashboardPage.clickManageJenkinsMenuOption();
        await manageJenkinsPage.clearSearchSettingsField();
        await manageJenkinsPage.typeSearchSettingsQuery(randomProjectName);
        
        await expect(manageJenkinsPage.getSearchSettingsResultsArea).toHaveText(searchSettings.noResultsError);
        await expect(manageJenkinsPage.getNoResultsMessage).toBeVisible();
    });

    test('TC_09.001.04 | Verify the search field is cleared by pressing the "x" button', async ({dashboardPage, manageJenkinsPage}) => {

        await dashboardPage.clickManageJenkinsMenuOption();
        await manageJenkinsPage.clearSearchSettingsField();
        await manageJenkinsPage.typeSearchSettingsQuery(randomProjectName);
        await expect(manageJenkinsPage.getSearchSettingsField).not.toBeEmpty();
        await manageJenkinsPage.focusSearchSettingsField();
        await manageJenkinsPage.clickSearchSettingsXButton();

        await expect(manageJenkinsPage.getSearchSettingsField).toBeEmpty();
    });
});