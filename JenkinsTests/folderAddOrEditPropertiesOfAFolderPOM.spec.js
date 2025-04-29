import { test, expect } from '../setup/globalHooks';
import { propertiesOfFolder } from '../fixtures/configurePageData.json';
import { addEditPropertiesOfFolder } from '../fixtures/messages.json';
import { errorMessageColor } from '../fixtures/newJobPageData.json';

test.beforeEach(async ({dashboardPage, newJobPage, folderPage, header, project}) => {
    await test.step('Creating a Folder', async () => {
        await dashboardPage.clickNewItemMenuOption();
        await newJobPage.fillNewItemName(project.folderName);
        await newJobPage.selectFolder();
        await newJobPage.clickOKButton();
        await folderPage.clickSaveButton();
    });
});

test.describe('US_04.005 | Folder > Add or Edit Properties of a Folder', () => {

    test('TC_04.005.01 | Verify the configured Health metrics and Pipeline Libraries properties of a Folder are saved', async ({folderPage, project}) => {

        await test.step('Adding properties to a Folder', async () => {
            await folderPage.clickConfigureMenuOption();
            await folderPage.clickHealthMetricsButton();
            await folderPage.clickAddMetricButton();
            await folderPage.clickChildItemsWithWorstHealthDropdownMenuItem();
            await folderPage.clickAddButton();
            await folderPage.fillNameField(project.name);
            await folderPage.fillProjectRepositoryField(propertiesOfFolder.repositoryURL);
            await folderPage.clickSaveButton();
        });
        await test.step('Verifying the configured Health metrics and Pipeline Libraries properties of a Folder are saved', async () => {
            await folderPage.clickConfigureMenuOption();
            await folderPage.clickHealthMetricsButton();
            await expect(folderPage.getRecursiveCheckbox).toBeChecked();
            await expect(folderPage.getNameField).toHaveValue(project.name);
            await expect(folderPage.getProjectRepositoryField).toHaveValue(propertiesOfFolder.repositoryURL);
        });
    });

    test('TC_04.005.02 | Verify the mandatory fields of the Pipeline Libraries of a Folder are marked with a red hint', async ({folderPage}) => {

        await folderPage.clickConfigureMenuOption();
        await folderPage.clickPropertiesMenuOption();
        await folderPage.clickAddButton();

        await expect(folderPage.getNameFieldArea).toContainText(addEditPropertiesOfFolder.emptyNameFieldReminder);
        await expect(folderPage.getEmptyNameFieldReminder).toHaveCSS('color', errorMessageColor);
        await expect(folderPage.getEmptyNameFieldReminder).toBeVisible();
        await folderPage.selectLegacySCMDropdownMenuItem();

        await expect(folderPage.getRepositoryURLFieldArea).toContainText(addEditPropertiesOfFolder.emptyRepositoryURLFieldReminder);
        await expect(folderPage.getEmptyRepositoryURLFieldReminder).toHaveCSS('color', errorMessageColor);
        await expect(folderPage.getEmptyRepositoryURLFieldReminder).toBeVisible();
    });

    test('TC_04.005.03 | Verify the appeared section after checking the checkbox "Cache fetched versions on controller for quick retrieval"', async ({folderPage}) => {

        await folderPage.clickConfigureMenuOption();
        await folderPage.clickPropertiesMenuOption();
        await folderPage.clickAddButton();
        await folderPage.checkCacheFetchedVersionsCheckbox();

        await expect(folderPage.getRefreshTimeInMinutesField).toBeEditable();
        await expect(folderPage.getVersionsToExcludeField).toBeEmpty();
        await expect(folderPage.getVersionsToIncludeField).toBeEmpty();
        await expect(folderPage.getForceClearCacheCheckbox).not.toBeChecked();
    });
});