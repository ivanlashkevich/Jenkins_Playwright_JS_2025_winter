import { test, expect } from '../setup/globalHooks';
import { confirmationMessage } from '../fixtures/deleteProjectData.json';

test.beforeEach(async ({dashboardPage, newJobPage, freestyleProjectPage, project}) => {
    await test.step('Creating a Freestyle ptoject', async () => {
        await dashboardPage.clickNewItemMenuOption();
        await newJobPage.fillNewItemName(project.name);
        await newJobPage.selectFreestyleProject();
        await newJobPage.clickOKButton();
        await freestyleProjectPage.clickSaveButton();
    });
});

test.describe('US_01.004 | FreestyleProject > Delete Project', () => {
    
    test('TC_01.004.01 | Verify the Freestyle project is deleted from the Dashboard page', async ({dashboardPage, header, project}) => {

        await header.clickDashhboardBreadcrumbLink();
        await dashboardPage.hoverJobTitleLink(project.name);
        await dashboardPage.clickJobTableDropdownChevron(project.name);
        await dashboardPage.clickDeleteProjectDropdownMenuItem();
        await dashboardPage.clickYesButton();

        await expect(dashboardPage.getWelcomeToJenkinsHeadline).toBeVisible();
        await expect(dashboardPage.getJobTitleLinkFromJobTable()).toHaveCount(0);
    });

    test('TC_01.004.02 | Verify the Freestyle project is deleted from the Project page after deletion cancel', async ({dashboardPage, freestyleProjectPage}) => {

        await freestyleProjectPage.clickDeleteProjectMenuOption();
        await freestyleProjectPage.clickCancelButton();
        await freestyleProjectPage.clickDeleteProjectMenuOption();
        await expect(freestyleProjectPage.getCancelButton).toBeEnabled();
        await expect(freestyleProjectPage.getYesButton).toBeEnabled();
        await freestyleProjectPage.clickYesButton();

        await expect(dashboardPage.getWelcomeToJenkinsHeadline).toBeVisible();
        await expect(dashboardPage.getJobTitleLinkFromJobTable()).toHaveCount(0);
    });

    test('TC_01.004.03 | Verify the confirmation message is displayed before deletion', async ({freestyleProjectPage, project}) => {
        
        await freestyleProjectPage.clickDeleteProjectMenuOption();
        
        await expect(freestyleProjectPage.getDeletionConfirmationDialogue).toBeVisible();
        await expect(freestyleProjectPage.getDeletionConfirmationTitle).toHaveText(confirmationMessage.title);
        await expect(freestyleProjectPage.getDeletionConfirmationQuestion).toHaveText(`${confirmationMessage.question} ‘${project.name}’?`);
    });
});