import { test, expect } from '../setup/globalHooks';
import { renameItem } from '../fixtures/messages.json';

test.beforeEach(async ({dashboardPage, newJobPage, freestyleProjectPage, project}) => {
    await test.step('Creating a Freestyle Project', async () => {
        await dashboardPage.clickCreateJobLink();
        await newJobPage.fillNewItemName(project.name);
        await newJobPage.selectFreestyleProject();
        await newJobPage.clickOKButton();
        await freestyleProjectPage.clickSaveButton();
    });
});

test.describe('US_01.002 | FreestyleProject > Rename Project', () => {

    test('TC_01.002.01 | Verify the Freestyle project is renamed from the Dashboard page', async ({page, dashboardPage, freestyleProjectPage, header, project}) => {
        
        test.step('Renaming the Freestyle project from the Dashboard page', async () => {
            await header.clickDashhboardBreadcrumbLink();
            await dashboardPage.hoverJobTitleLink(project.name);
            await dashboardPage.clickJobTableDropdownChevron(project.name);
            await dashboardPage.clickRenameDropdownMenuItem();
            await page.reload();
            await freestyleProjectPage.fillNewName(project.longName);
            await freestyleProjectPage.clickRenameButton();
        });
        await test.step('Verifying the Freestyle project was renamed', async () => {
            await expect(freestyleProjectPage.getItemTitle(project.longName)).toHaveText(project.longName);
            await expect(freestyleProjectPage.getItemTitle(project.longName)).toBeVisible();
            await header.clickJenkinsLogo();
            await expect(dashboardPage.getJobTitleLink(project.longName)).toHaveText(project.longName);
            await expect(dashboardPage.getJobTitleLink(project.longName)).toBeVisible();
        });
    });

    test('TC_01.002.02 | Verify the Freestyle project is renamed from the Project page', async ({page, dashboardPage, freestyleProjectPage, header, project, baseURL}) => {

        await test.step('Renaming the Freestyle project from the Project page', async () => {
            const encodedProjectName = encodeURIComponent(project.name);
            const projectPageURL = `${baseURL}/job/${encodedProjectName}/`;
            await expect(page).toHaveURL(projectPageURL);
            await freestyleProjectPage.clickRenameMenuOption();
            await freestyleProjectPage.fillNewName(project.longName);
            await freestyleProjectPage.clickRenameButton();
        });
        await test.step('Verifying the Freestyle project was renamed', async () => {
            await expect(freestyleProjectPage.getJobHeadline).toContainText(project.longName)
            await header.clickJenkinsLogo();
            await expect(dashboardPage.getJobTitleLink(project.longName)).toHaveText(project.longName);
            await expect(dashboardPage.getJobTitleLink(project.longName)).toBeVisible();
        });        
    });

    test('TC_01.002.03 | Verify the Freestyle project is renamed using Cyrillic', async ({dashboardPage, freestyleProjectPage, header, randomCyrillicName}) => {

        await test.step('Renaming the Freestyle project using Cyrillic', async () => {
            await freestyleProjectPage.clickRenameMenuOption();
            await freestyleProjectPage.fillNewName(randomCyrillicName);
            await expect(freestyleProjectPage.getNewNameField).toHaveValue(randomCyrillicName);
            await freestyleProjectPage.clickRenameButton();
        });
        await test.step('Verifying the Freestyle project was renamed', async () => {
            await expect(freestyleProjectPage.getJobHeadline).toContainText(randomCyrillicName);
            await header.clickJenkinsLogo();
            await expect(dashboardPage.getJobTitleLink(randomCyrillicName)).toHaveText(randomCyrillicName);
            await expect(dashboardPage.getJobTitleLink(randomCyrillicName)).toBeVisible();
        });
    });

    test('TC_01.002.04 | Verify the possibility to rename a Freestyle project by overwriting its name', async ({dashboardPage, freestyleProjectPage, header, project}) => {

        await test.step('Attempting to rename the Freestyle project by overwriting its name', async () => {
            await freestyleProjectPage.clickRenameMenuOption();
            await freestyleProjectPage.fillNewName(project.name);
            await expect(freestyleProjectPage.getSameNameWarningMessage).toHaveText(renameItem.sameNameError);
            await freestyleProjectPage.clickRenameButton();
        });
        await test.step('Verifying the Freestyle project was not renamed', async () => {
            await expect(freestyleProjectPage.getMainPanel).toContainText(renameItem.renameProcessingError);
            await header.clickJenkinsLogo();
            await expect(dashboardPage.getJobTitleLink(project.name)).toHaveText(project.name);
            await expect(dashboardPage.getJobTitleLink(project.name)).toBeVisible();
        });
    });
});