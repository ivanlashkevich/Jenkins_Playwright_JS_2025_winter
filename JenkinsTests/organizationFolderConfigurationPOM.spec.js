import { test, expect } from '../setup/globalHooks';
import { organizationFolderConfiguration, publisherWhiteList } from '../fixtures/configurePageData.json';
import { organizationFolderScan } from '../fixtures/messages.json';

test.beforeEach(async ({ dashboardPage, newJobPage, organizationFolderPage, project }) => {
    await test.step('Creating an Organization Folder', async () => {
        await dashboardPage.clickNewItemMenuOption();
        await newJobPage.fillNewItemName(project.name);
        await newJobPage.selectOrganizationFolder();
        await newJobPage.clickOKButton();
        await organizationFolderPage.clickSaveButton();
        await organizationFolderPage.clickConfigureMenuOption();
    });
});

test.describe('US_06.001 | Organisation folder > Configuration', () => {

    test('TC_06.001.01 | Verify the Organization Folder icon changed from "Metadata Folder Icon" to the "Default Icon"', async ({organizationFolderPage}) => {

        await organizationFolderPage.clickAppearanceButton();
        await organizationFolderPage.selectDefaultIconDropdownMenuItem();
        await organizationFolderPage.clickSaveButton();

        await expect(organizationFolderPage.getFolderIcon).toBeVisible();
    });

    test('TC_06.001.02 | Verify the possibility to set the Organization Folder Repository Source configuration', async ({organizationFolderPage, project}) => {

        await test.step('Setting the Organization Folder configuration', async () => {
            await organizationFolderPage.clickRepositorySourcesAddButton();
            await organizationFolderPage.clickSingleRepositoryDropdownMenuItem();
            await organizationFolderPage.fillRepositoryNameField(project.name);
            await organizationFolderPage.clickSourcesAddButton();
            await organizationFolderPage.clickSingleRepositoryAndBranchDropdownMenuItem();
            await organizationFolderPage.fillSingleBranchNameField(project.newName);
            await organizationFolderPage.fillRepositoryURLField(organizationFolderConfiguration.repositoryURL);
            await organizationFolderPage.clickSaveButton();
            await organizationFolderPage.clickConfigureMenuOption();
        });
        await test.step('Verifying the configuration did not change after being saved', async () => {
            await expect(organizationFolderPage.getRepositoryNameField).toHaveValue(project.name);
            await expect(organizationFolderPage.getSingleBranchNameField).toHaveValue(project.newName);
            await expect(organizationFolderPage.getRepositoryURLField).toHaveValue(organizationFolderConfiguration.repositoryURL);
        });
    });

    test('TC_06.001.03 | Verify the Organization Folder is scanned after configuring the "Projects" settings and saving', async ({organizationFolderPage, project}) => {

        await test.step('Setting the Organization Folder configuration', async () => {
            await organizationFolderPage.clickRepositorySourcesAddButton();
            await organizationFolderPage.clickSingleRepositoryDropdownMenuItem();
            await organizationFolderPage.fillRepositoryNameField(project.name);
            await organizationFolderPage.clickSourcesAddButton();
            await organizationFolderPage.clickSingleRepositoryAndBranchDropdownMenuItem();
            await organizationFolderPage.fillSingleBranchNameField(project.newName);
            await organizationFolderPage.fillRepositoryURLField(organizationFolderConfiguration.repositoryURL);
            await organizationFolderPage.clickSaveButton();
        });
        await test.step('Verifying the Organization Folder was scanned after configuring the "Projects" settings and saving', async () => {
            await expect(organizationFolderPage.getJobHeadline).toHaveText('Scan Organization Folder Log');
            await expect(organizationFolderPage.getJobHeadline).toBeVisible();
            await expect(organizationFolderPage.getSuccessIcon).toBeVisible();
            await expect(organizationFolderPage.getScanOrganizationFolderLog).toContainText(organizationFolderScan.organizationFolderScanned);
        });
    });

    test('TC_06_001.04 | Verify the Publisher white-list of the "Untrusted" section contains all possible options', async ({organizationFolderPage}) => {

        await organizationFolderPage.clickAddPropertyButton();
        await organizationFolderPage.clickUntrustedDropdownMenuItem();
        await organizationFolderPage.getPublisherWhiteListItem.first().waitFor({ state: 'visible' });
        const labelTexts = await organizationFolderPage.retrievePublisherWhiteListItems();
        console.log('Expected Publisher white-list elements:', publisherWhiteList);
        console.log('Displayed Publisher white-list elements:', labelTexts);
        expect(labelTexts).toEqual(publisherWhiteList);
    });
});