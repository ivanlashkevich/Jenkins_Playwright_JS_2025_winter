import { test, expect } from '../setup/globalHooks';
import { confirmationMessage_1 } from '../fixtures/deleteProjectData.json';

test.beforeEach(async ({dashboardPage, newJobPage, organizationFolderPage, project}) => {
    await test.step('Creating an Organization Folder', async () => {
        await dashboardPage.clickNewItemMenuOption();
        await newJobPage.fillNewItemName(project.name);
        await newJobPage.selectOrganizationFolder();
        await newJobPage.clickOKButton();
        await organizationFolderPage.clickSaveButton();
    });
});

test.describe('US_06.005 | Organisation folder > Delete Organization Folder', () => {

    test('TC_06.005.01 | Verify the Organization Folder is deleted via the breadcrumb dropdown menu in the header', async ({
        header, dashboardPage, project}) => {

        await header.hoverBreadcrumbsProjectLink(project.name);
        await header.clickBreadcrumbsProjectChevron(project.name);
        await header.clickDeleteOrganizationFolderDropdownMenuItem();
        await dashboardPage.clickYesButton();

        await expect(dashboardPage.getItemLink).toHaveCount(0);
        await expect(dashboardPage.getWelcomeToJenkinsHeadline).toBeVisible();
    });

    test('TC_06.005.02 | Verify the Organization Folder is deleted from the Dashboard page', async ({header, dashboardPage, project}) => {

        await header.clickJenkinsLogo();
        await dashboardPage.hoverJobTitleLink(project.name);
        await dashboardPage.clickJobTableDropdownChevron(project.name);
        await dashboardPage.clickDeleteOrganizationFolderDropdownMenuItem();
        await dashboardPage.clickYesButton();

        await expect(dashboardPage.getItemLink).toHaveCount(0);
        await expect(dashboardPage.getWelcomeToJenkinsHeadline).toBeVisible();
    });

    test('TC_06.005.03 | Verify the Organization Folder is deleted from the Organization Folder page', async ({
        organizationFolderPage, dashboardPage}) => {
        
        await organizationFolderPage.clickDeleteOrganizationFolderMenuOption();
        await organizationFolderPage.clickYesButton();
        
        await expect(dashboardPage.getItemLink).toHaveCount(0);
        await expect(dashboardPage.getWelcomeToJenkinsHeadline).toBeVisible();
    });

    test('TC_06.005.04 | Verify the confirmation modal is displayed when deleting the Organization Folder', async ({
        organizationFolderPage, dashboardPage, project}) => {
        
        await organizationFolderPage.clickDeleteOrganizationFolderMenuOption();
        await expect(organizationFolderPage.getDeletionConfirmationDialogue).toBeVisible();
        await expect(organizationFolderPage.getDeletionConfirmationTitle).toHaveText(confirmationMessage_1.title);
        await expect(organizationFolderPage.getDeletionConfirmationQuestion).toHaveText(`${confirmationMessage_1.question} ‘${project.name}’?`);
        await organizationFolderPage.clickYesButton();

        await expect(dashboardPage.getItemLink).toHaveCount(0);
        await expect(dashboardPage.getWelcomeToJenkinsHeadline).toBeVisible();
    });
});