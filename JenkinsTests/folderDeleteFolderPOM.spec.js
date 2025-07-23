import { test, expect } from '../setup/globalHooks';

test.beforeEach(async ({dashboardPage, newJobPage, folderPage, project}) => {
    await test.step('Creating a folder and a subfolder', async () => {
        await dashboardPage.clickNewItemMenuOption();
        await newJobPage.fillNewItemName(project.folderName);
        await newJobPage.selectFolder();
        await newJobPage.clickOKButton();
        await folderPage.clickSaveButton();
        await folderPage.clickCreateJobLink();
        await newJobPage.fillNewItemName(project.longName);
        await newJobPage.selectFolder();
        await newJobPage.clickOKButton();
        await folderPage.clickSaveButton();
    });
});

test.describe('US 04.003 | Folder > Delete Folder', () => {

    test('TC_04.003.01 | Verify that after deleting a top-level folder, the user is redirected to the DashboardPage', async ({
        page, dashboardPage, folderPage, header, project}) => {

        await header.pressBreadcrumbFolderName();
        await expect(page).toHaveTitle(`All [${project.folderName}] [Jenkins]`);
        await folderPage.clickDeleteFolderMenuOption();
        await folderPage.clickYesButton();

        await expect(dashboardPage.getItemLink).toHaveCount(0);
        await expect(dashboardPage.getWelcomeToJenkinsHeadline).toBeVisible();
        await expect(page).toHaveTitle('Dashboard [Jenkins]');
    });

    test('TC_04.003.02 | Verify that after deleting a subfolder, the user is redirected to the top-level FolderPage', async ({
        page, folderPage, project}) => {

        await expect(folderPage.getJobHeadline).toHaveText(project.longName);
        await expect(folderPage.getJobHeadline).toBeVisible();
        await folderPage.clickDeleteFolderMenuOption();
        await folderPage.clickYesButton();

        await expect(folderPage.getThisFolderIsEmptyHeadline).toBeVisible();
        await expect(page).toHaveTitle(`All [${project.folderName}] [Jenkins]`);
    });

    test('TC_04.003.03 | Verify the user can create a folder and a subfolder with the names of the deleted ones', async ({
        dashboardPage, newJobPage, folderPage, header, project}) => {

        await test.step('Deleting a folder and a subfolder', async () => {
            await expect(folderPage.getJobHeadline).toHaveText(project.longName);
            await header.pressBreadcrumbFolderName();
            await expect(folderPage.getJobHeadline).toHaveText(project.folderName);
            await folderPage.clickDeleteFolderMenuOption();
            await folderPage.clickYesButton();
            await expect(dashboardPage.getItemLink).toHaveCount(0);
            await expect(dashboardPage.getWelcomeToJenkinsHeadline).toBeVisible();
        });
        await test.step('Creating a folder and a subfolder with the names of the deleted ones', async () => {
            await dashboardPage.clickNewItemMenuOption();
            await newJobPage.fillNewItemName(project.folderName);
            await newJobPage.selectFolder();
            await newJobPage.clickOKButton();
            await folderPage.clickSaveButton();
            await folderPage.clickCreateJobLink();
            await newJobPage.fillNewItemName(project.longName);
            await newJobPage.selectFolder();
            await newJobPage.clickOKButton();
            await folderPage.clickSaveButton();
        });
        await test.step('Verifying the names of the deleted and the created folder and a subfolder are the same', async () => {
            await expect(folderPage.getJobHeadline).toHaveText(project.longName);
            await header.pressBreadcrumbFolderName();
            await expect(folderPage.getJobHeadline).toHaveText(project.folderName);
        });
    });
});