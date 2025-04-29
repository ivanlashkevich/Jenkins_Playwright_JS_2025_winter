import { test, expect } from '../setup/globalHooks';
import { newItem } from '../fixtures/messages.json';
import { projectNameInvalid, errorMessageColor } from '../fixtures/newJobPageData.json';

test.describe('US_00.002 | New Item > Create Pipeline Project', () => {

    test('TC_00.002.01 | Verify the url of the configure page contains the name of the new Pipeline', async ({
        page, header, dashboardPage, newJobPage, pipelinePage, project, baseURL}) => {
        
        await test.step('Creating a Pipeline project', async () => {
            await dashboardPage.clickNewItemMenuOption();
            await newJobPage.fillNewItemName(project.name);
            await newJobPage.selectPipelineProject();
            await newJobPage.clickOKButton();
        });
        const encodedProjectName = encodeURIComponent(project.name);
        const configurePageURL = `${baseURL}/job/${encodedProjectName}/configure`;
        await test.step('Verifying the url of the configure page contains the name of the new Pipeline', async () => {
            await expect(page).toHaveURL(configurePageURL);
        });
        await test.step('Verifying the new Pipeline project was created', async () => {
            await pipelinePage.clickSaveButton();
            await header.clickJenkinsLogo();
            await expect(dashboardPage.getMainPanel).toContainText(project.name);
            await expect(dashboardPage.getJobTitleLink(project.name)).toBeVisible();
        });
    });

    test('TC_00.002.02 | Verify the Pipeline project name does not contain any special characters', async ({header, dashboardPage, newJobPage, pipelinePage, project}) => {

        await test.step('Attempting to create a new Pipeline project containing special characters in its name', async () => {
            await dashboardPage.clickNewItemMenuOption();
            await newJobPage.fillNewItemName(projectNameInvalid);
            await expect(newJobPage.getUnsafeCharacterErrorMessage).toHaveText(newItem.newItemNameInvalidMessage)
        });
        await test.step('Creating a new Pipeline', async () => {
            await newJobPage.clearItemNameField();
            await newJobPage.fillNewItemName(project.name);
            await newJobPage.selectPipelineProject();
            await newJobPage.clickOKButton();
            await pipelinePage.clickSaveButton();
            await header.clickDashhboardBreadcrumbLink();
        });
        await test.step('Verifying the Pipeline project was created, not containing any special characters in its name', async () => {
            await expect(dashboardPage.getMainPanel).toContainText(project.name);
            await expect(dashboardPage.getJobTitleLink(project.name)).toBeVisible();
            const projectNameLocator = dashboardPage.getJobTitleLink(project.name);
            const itemName = await projectNameLocator.innerText();
            expect(itemName).not.toMatch(/[!@#$%^&*[\]\/\\|;:<>,?]/);
        });      
    });

    test('TC_00.002.03 | Verify the possibility to create the Pipeline project with any special characters in its name', async ({header, dashboardPage, newJobPage}) => {

        await test.step('Attempting to create a new Pipeline project containing special characters in its name', async () => {
            await dashboardPage.clickNewItemMenuOption();
            await newJobPage.fillNewItemName(projectNameInvalid);
            await expect(newJobPage.getUnsafeCharacterErrorMessage).toHaveText(newItem.newItemNameInvalidMessage);
            await expect(newJobPage.getUnsafeCharacterErrorMessage).toHaveCSS('color', errorMessageColor);
            await newJobPage.selectPipelineProject();
            await expect(newJobPage.getOKButton).toBeDisabled();
            await header.clickJenkinsLogo();
        });
        await test.step('Verifying the Pipeline project was not created', async () => {
            await expect(dashboardPage.getJobTitleLinkFromJobTable()).toHaveCount(0);
            await expect(dashboardPage.getWelcomeToJenkinsHeadline).toBeVisible();
        });
    });
});