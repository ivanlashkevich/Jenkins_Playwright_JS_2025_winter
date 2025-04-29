import { test, expect } from '../setup/globalHooks';
import { tooltipElement } from '../fixtures/configurePageData.json';

test.beforeEach(async ({dashboardPage, newJobPage, folderPage, project}) => {
    await test.step('Creating a Folder', async () => {
        await dashboardPage.clickNewItemMenuOption();
        await newJobPage.fillNewItemName(project.folderName);
        await newJobPage.selectFolder();
        await newJobPage.clickOKButton();
        await folderPage.clickSaveButton();
    });
});

test.describe('US_04.001 | Folder > Rename Folder', () => {

    test('TC_04.001.01 | Verify a Folder is renamed from dropdown menu of the folder-element in the breadcrumb', async ({page, folderPage, header, project}) => {

        await header.hoverBreadcrumbsProjectLink(project.folderName);
        await header.clickBreadcrumbsProjectChevron(project.folderName);
        await header.clickRenameDropdownMenuItem();
        await folderPage.fillNewName(project.longName);
        await folderPage.clickRenameButton();

        await expect(folderPage.getJobHeadline).toHaveText(project.longName);
        await expect(folderPage.getJobHeadline).toBeVisible();
        await expect(page).toHaveTitle(`All [${project.longName}] [Jenkins]`);
    });

    test('TC_04.001.02 | Verify a Folder name changes are observed from both Folder and Dashboard pages', async ({page, folderPage, header, dashboardPage, project}) => {
        
        await test.step('Renaming the Folder', async () => {
            await folderPage.clickRenameMenuOption();
            await page.reload();
            await page.waitForSelector('input[name="newName"]', { visible: true });
            await folderPage.fillNewName(project.longName);
            await folderPage.clickRenameButton();
        });
        await test.step('Verifying the changes from the Folder page', async () => {
            const headlineText = await folderPage.getJobHeadline.textContent();
            expect(headlineText.trim()).toBe(project.longName);
            await expect(folderPage.getJobHeadline).toBeVisible();
            await header.clickJenkinsLogo();
        });
        await test.step('Verifying the changes from the Dashboard page', async () => {

            const jenkinsTable = await dashboardPage.getJobTable.textContent();
            expect(jenkinsTable).toContain(project.longName);
            await expect(dashboardPage.getJobTitleLink(project.longName)).toBeVisible();
        });   
    });

    test('TC_04.001.03 | Verify the presence of the "Display Name" hint and its description on the Configure page when clicked', async ({folderPage}) => {

        await folderPage.clickConfigureMenuOption();
        await folderPage.hoverDisplayNameHelperButton();

        await expect(folderPage.getHelperButtonTooltipText).toBeVisible();
        await expect(folderPage.getHelperButtonTooltipText).toHaveText(tooltipElement.title);

        await folderPage.clickDisplayNameHelperButton();
        await expect(folderPage.getHelperButtonDescription).toBeVisible();
        await expect(folderPage.getHelperButtonDescription).toContainText(tooltipElement.text);
    });

    test('TC_04.001.04 | Verify that the display name when set, is shown on both Folder and Dashboard pages', async ({page, folderPage, header, dashboardPage, project}) => {
        
        let headlineText;
        await test.step('Renaming the Folder', async () => {
            await folderPage.clickRenameMenuOption();
            await folderPage.fillNewName(project.longName);
            await folderPage.clickRenameButton();

            headlineText = await folderPage.getJobHeadline.textContent();
            expect(headlineText).toContain(project.longName);
            await expect(folderPage.getJobHeadline).toBeVisible();
        });
        await test.step('Setting the Folder display name', async () => {
            await folderPage.clickConfigureMenuOption();
            await folderPage.fillDisplayName(project.name);
            await folderPage.clickSaveButton();
        });
        await test.step('Verifying the Folder display name is shown on the Folder page', async () => {
            headlineText = await folderPage.getJobHeadline.textContent();
            expect(headlineText.trim()).toBe(project.name);
            await expect(folderPage.getJobHeadline).toBeVisible();
        });
        await test.step('Verifying the Folder display name is shown on the Dashboard page', async () => {
            await header.clickDashhboardBreadcrumbLink();
            await expect(dashboardPage.getJobTable).toContainText(project.name);
            await expect(dashboardPage.getJobTitleLink(project.name)).toBeVisible();
        });
    });
});