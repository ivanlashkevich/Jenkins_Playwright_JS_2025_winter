import { test, expect } from '../setup/globalHooks';
import { newItem } from '../fixtures/messages.json';

test.describe('US_00.000 | New Item > Create New item', () => {

    test('TC_00.000.01 | Verify a New Item is created using the "Create a job" button', async ({
        dashboardPage, newJobPage, freestyleProjectPage, header, newItemName}) => {

        await test.step('Creating a New Item using the "Create a job" button', async () => {
            await dashboardPage.clickCreateJobLink();
            await newJobPage.fillNewItemName(newItemName);
            await newJobPage.selectFreestyleProject();
            await newJobPage.clickOKButton();
            await freestyleProjectPage.clickSaveButton();
            await expect(freestyleProjectPage.getItemTitle(newItemName)).toContainText(newItemName);
            await header.clickJenkinsLogo();
        });
        await test.step('Verifying the New Item was created', async () => {
            await expect(dashboardPage.getMainPanel).toContainText(newItemName);
            await expect(dashboardPage.getJobTitleLink(newItemName)).toBeVisible();
        });
    });

    test('TC_00.000.02 | Verify a New Item is created from the "New Item" link in the left sidebar', async ({
        dashboardPage, newJobPage, freestyleProjectPage, header, newItemName}) => {

        await test.step('Creating a New Item using the "New Item" link', async () => {
            await dashboardPage.clickNewItemMenuOption();
            await newJobPage.fillNewItemName(newItemName);
            await newJobPage.selectFreestyleProject();
            await newJobPage.clickOKButton();
            await freestyleProjectPage.clickSaveButton();
            await expect(freestyleProjectPage.getItemTitle(newItemName)).toHaveText(newItemName);
            await header.clickJenkinsLogo();
        });
        await test.step('Verifying the New Item was created', async () => {
            await expect(dashboardPage.getMainPanel).toContainText(newItemName);
            await expect(dashboardPage.getJobTitleLink(newItemName)).toBeVisible();
        });
    });

    test('TC_00.000.03 | Verify a New Item is created from the Dashboard dropdown menu', async ({
        dashboardPage, newJobPage, freestyleProjectPage, header, newItemName}) => {

        await test.step('Creating a New Item from the Dashboard dropdown menu', async () => {
            await header.hoverDashboardBreadcrumbLink();
            await header.clickDashhboardBreadcrumbChevron();
            await header.clickNewItemDropdownOption();
            await newJobPage.fillNewItemName(newItemName);
            await newJobPage.selectFreestyleProject();
            await newJobPage.clickOKButton();
            await freestyleProjectPage.clickSaveButton();
            await header.clickDashhboardBreadcrumbLink();
        });
        await test.step('Verifying the New Item was created', async () => {
            await expect(dashboardPage.getMainPanel).toContainText(newItemName);
            await expect(dashboardPage.getJobTitleLink(newItemName)).toBeVisible();
        });
    });

    test('TC_00.000.04 | Verify the New Item can only be created using unique item name', async ({
        dashboardPage, newJobPage, freestyleProjectPage, header, project}) => {

        await test.step('Precondition: creating a New Item', async () => {
            await dashboardPage.clickCreateJobLink();
            await newJobPage.fillNewItemName(project.name);
            await newJobPage.selectFreestyleProject();
            await newJobPage.clickOKButton();
            await freestyleProjectPage.clickSaveButton();
            await header.clickJenkinsLogo();
        });
        await test.step('Verify the New Item can only be created using unique item name', async () => {
            await dashboardPage.clickNewItemMenuOption();
            await newJobPage.fillNewItemName(project.name);
            await expect(newJobPage.getItemNameInvalidErrorMessage).toContainText(`${newItem.duplicateNotAllowedMessage} ‘${project.name}’`);
            await expect(newJobPage.getItemNameInvalidErrorMessage).toBeVisible();
            await newJobPage.selectFreestyleProject();
            await expect(newJobPage.getOKButton).toBeDisabled();
            await newJobPage.fillNewItemName(project.newName);
            await newJobPage.clickOKButton();
            await freestyleProjectPage.clickSaveButton();
            await header.clickDashhboardBreadcrumbLink();
            await expect(dashboardPage.getMainPanel).toContainText(project.newName);
            await expect(dashboardPage.getJobTitleLink(project.newName)).toBeVisible();
        });
    });
});