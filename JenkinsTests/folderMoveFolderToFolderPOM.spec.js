import { test, expect } from '../setup/globalHooks';
import genData from '../fixtures/genData';

test.beforeEach(async ({dashboardPage, newJobPage, folderPage, header, project, createProject}) => {
    await test.step('Creating two Folders', async () => {
        await createProject(project.name, 'Folder');
        await createProject(project.longName, 'Folder');
    });
});

test.describe('US_04.002 | Folder > Move Folder to Folder', () => {

    test('TC_04.002.01 | Verify the possibility to move one Folder to another from the Folder page', async ({
        page, dashboardPage, folderPage, header, project, baseURL}) => {

        await test.step('Moving one Folder to another', async () => {
            await dashboardPage.clickJobTitleLink(project.name);
            await folderPage.clickMoveMenuOption();
            await folderPage.selectFolderDestination(project.longName);
            await folderPage.clickMoveButton();
        });
        await test.step('Verifying one Folder was moved to another', async () => {
            let expectedURL = `${baseURL}/job/${project.longName}/job/${project.name}/`;
            await expect(page).toHaveURL(expectedURL);
            await page.reload();
            await header.pressBreadcrumbFolderName(project.longName);
            await expect(folderPage.getJobTable).toContainText(project.name);
            await expect(folderPage.getJobTitleLink(project.name)).toBeVisible();
        });
    });

    test('TC_04.002.02 | Verify all possible paths for moving the folder are displayed in the dropdown menu', async ({
        dashboardPage, folderPage, project}) => {

        await expect(dashboardPage.getItemLink).toHaveCount(2);
        await dashboardPage.hoverJobTitleLink(project.name);
        await dashboardPage.clickJobTableDropdownChevron(project.name);
        await dashboardPage.clickMoveDropdownMenuItem();
        await folderPage.clickFolderDestination();

        const optionSelector = await folderPage.getDestinationDropdownOptions.allTextContents();
        ['Jenkins', `Jenkins » ${project.longName}`].forEach(expected => {
            expect(optionSelector).toContain(expected);
        });
    });

    test('TC_04.002.03 | Verify the possibility to see the location of the moved folder in the breadcrumbs', async ({
        dashboardPage, folderPage, header, project}) => {

        await test.step('Moving one Folder to another', async () => {
            await dashboardPage.hoverJobTitleLink(project.name);
            await dashboardPage.clickJobTableDropdownChevron(project.name);
            await dashboardPage.clickMoveDropdownMenuItem();
            await folderPage.clickFolderDestination();
            await folderPage.selectFolderDestination(project.longName);
            await folderPage.clickMoveButton();
        });
        await test.step('Verifying the possibility to see the location of the moved folder in the breadcrumbs', async () => {
            await expect(header.getBreadcrumbBar).toContainText('Dashboard');
            await expect(header.getBreadcrumbBar).toContainText(`${project.longName}`);
            await expect(header.getBreadcrumbBar).toContainText(`${project.name}`);
            await expect(header.getBreadcrumbBar).toBeVisible();
        });
    });

    test('TC_04.002.04 | Verify the absence of the Move section on the Folder page if there is only one Folder on the Dashboard page', async ({
        dashboardPage, folderPage, project}) => {

        await test.step('Verifying the presence of the "Move" section on the Folder page when having more than one Folder', async () => {
            await dashboardPage.clickJobTitleLink(project.name);
            await folderPage.clickMoveMenuOption();
            await expect(folderPage.getJobHeadline).toHaveText('Move');
            await expect(folderPage.getJobHeadline).toBeVisible();
            await expect(folderPage.getMoveButton).toBeEnabled();
            await folderPage.clickDeleteFolderMenuOption();
            await folderPage.clickYesButton();
        });
        await test.step('Verifying the absence of the "Move" section on the Folder page when having one Folder', async () => {
            await expect(dashboardPage.getItemLink).toHaveCount(1);
            await dashboardPage.clickJobTitleLink(project.longName);
            await expect(folderPage.getMoveHeadline).toBeHidden();
            await expect(folderPage.getMoveButton).toBeHidden();
        });
    });
});