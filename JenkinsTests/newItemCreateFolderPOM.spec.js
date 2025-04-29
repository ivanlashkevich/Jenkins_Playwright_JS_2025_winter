import { test, expect } from '../setup/globalHooks';
import { cleanData } from '../support/cleanData';
import { newItem } from '../fixtures/messages.json';

test.beforeEach(async ({dashboardPage, newJobPage, folderPage, header, project}) => {
    await test.step('Creating a Folder', async () => {
        await dashboardPage.clickNewItemMenuOption();
        await newJobPage.fillNewItemName(project.folderName);
        await newJobPage.selectFolder();
        await newJobPage.clickOKButton();
        await folderPage.fillFolderGeneralDescription(project.description);
        await folderPage.clickSaveButton();
        await header.clickJenkinsLogo();
    });
});

test.describe('US_00.004 | New item > Create Folder', () => {

    test('TC_00.004.01 | Verify a New Folder is created from Dashboard dropdown menu in the top left', async ({
        dashboardPage, newJobPage, folderPage, header, project}) => {

        await test.step('Creating a Folder from Dashboard dropdown menu', async () => {
            await cleanData();
            await header.hoverDashboardBreadcrumbLink();
            await header.clickDashhboardBreadcrumbChevron();
            await header.clickNewItemDropdownOption();
            await newJobPage.fillNewItemName(project.longName);
            await newJobPage.selectFolder();
            await newJobPage.clickOKButton();
            await folderPage.clickSaveButton();
            await header.clickDashhboardBreadcrumbLink();
        });
        await test.step('Verifying the Folder was created', async () => {
            await expect(dashboardPage.getJobTable).toContainText(project.longName);
            await expect(dashboardPage.getJobTitleLink(project.longName)).toBeVisible();
        });
    });

    test('TC_00.004.02 | Verify a New Folder is created from other existing', async ({
        dashboardPage, newJobPage, folderPage, header, project}) => {
        
        await test.step('Creating a new Folder from the existing one', async () => {
            await dashboardPage.clickNewItemMenuOption();
            await newJobPage.fillNewItemName(project.longName);
            await newJobPage.selectFolder();
            await newJobPage.fillCopyFromField(project.folderName.slice(0, 1));
            await newJobPage.selectItemNameFromCopyField(project.folderName);
            await newJobPage.clickOKButton();
            await folderPage.clickSaveButton();
            await header.clickJenkinsLogo();
        });
        await test.step('Verifying both Folders were created', async () => {
            const projectArray = [project.folderName, project.longName];
            for (const element of projectArray) {
                await expect(dashboardPage.getJobTable).toContainText(element);
                await expect(dashboardPage.getJobTitleLink(element)).toBeVisible();
            }
        });
    });

    test('TC_00.004.03 | Verify a New Folder can only be created using a unique name', async ({
        dashboardPage, newJobPage, folderPage, header, project}) => {
        
        await test.step('Attempting to create a Folder with the existing name', async () => {
            await dashboardPage.clickNewItemMenuOption();
            await newJobPage.fillNewItemName(project.folderName);
            await expect(newJobPage.getItemNameInvalidErrorMessage).toHaveText(`${newItem.duplicateNotAllowedMessage} ‘${project.folderName}’`);
            await expect(newJobPage.getItemNameInvalidErrorMessage).toBeVisible();
            await newJobPage.selectFolder();
            await expect(newJobPage.getOKButton).toBeDisabled();
        });
        await test.step('Creating a Folder with a unique name', async () => {
            await newJobPage.fillNewItemName(project.longName);
            await newJobPage.clickOKButton();
            await folderPage.clickSaveButton();
            await header.clickJenkinsLogo();
        });
        await test.step('Verifying the Folder was created', async () => {
            await expect(dashboardPage.getJobTable).toContainText(project.longName);
            await expect(dashboardPage.getJobTitleLink(project.longName)).toBeVisible();
        });
    });
});