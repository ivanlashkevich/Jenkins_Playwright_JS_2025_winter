import { test, expect } from '../setup/globalHooks';
import { cleanData } from '../support/cleanData';
import { createProject } from '../fixtures/createNewItem';
import { projectRepositoryURL } from '../fixtures/pipelinePageData.json';

test.beforeEach(async ({page, dashboardPage, newJobPage, basePage, header, project}) => {
    await createProject(page, project.folderName, 'Folder');
    await createProject(page, project.userName, 'Folder');
    await createProject(page, project.longName, 'Pipeline');
});

test.describe('US_02.006 | Pipeline > Move pipeline', () => {

    test('TC_02.006.01 | Verify the "Move" link appears on the Pipeline page only after a Folder is created', async ({
        dashboardPage, newJobPage, pipelinePage, header, project}) => {

        await test.step('Creating a Pipeline, and verifying the "Move" link is missing', async () => {
            await cleanData();
            await dashboardPage.clickNewItemMenuOption();
            await newJobPage.fillNewItemName(project.name);
            await newJobPage.selectPipelineProject();
            await newJobPage.clickOKButton();
            await pipelinePage.clickSaveButton();
            await expect(pipelinePage.getMoveMenuOption).toBeHidden();
            await header.clickJenkinsLogo();
        });
        await test.step('Creating a Folder, and verifying the "Move" link appeared', async () => {
            await dashboardPage.clickNewItemMenuOption();
            await newJobPage.fillNewItemName(project.longName);
            await newJobPage.selectFolder();
            await newJobPage.clickOKButton();
            await pipelinePage.clickSaveButton();
            await header.clickJenkinsLogo();
            await dashboardPage.pressJobTitleLink(project.name);
            await expect(pipelinePage.getMoveMenuOption).toBeVisible();
        });
    });

    test('TC_02.006.02 | Verify the possibility to view a list of available target projects in the move dropdown menu', async ({
        dashboardPage, pipelinePage, project}) => {
        
        await dashboardPage.clickJobTitleLink(project.longName);
        await pipelinePage.clickMoveMenuOption();
        await pipelinePage.clickFolderDestination();

        await expect(pipelinePage.getDestinationDropdownOptions).toHaveCount(3);
        const expectedProjects = ['Jenkins', `Jenkins » ${project.folderName}`, `Jenkins » ${project.userName}`];
        const actualProjects = await pipelinePage.getDestinationDropdownOptions.allTextContents();
        
        for (const project of expectedProjects) {
            expect(actualProjects).toContain(project);
        }
    });

    test('TC_02.006.03 | Verify that after the move, the pipeline is transferred to the target project', async ({
        dashboardPage, pipelinePage, header, folderPage, project}) => {

        await dashboardPage.clickJobTitleLink(project.longName);
        await pipelinePage.clickMoveMenuOption();
        await pipelinePage.clickFolderDestination();
        await pipelinePage.selectFolderDestination(project.folderName);
        await pipelinePage.clickMoveButton();
        await header.pressBreadcrumbFolderName(project.folderName);

        await expect(folderPage.getJobTable).toContainText(project.longName);
        await expect(folderPage.getJobTitleLink(project.longName)).toBeVisible();
    });

    test('TC_02.006.04 | Verify that after the move is complete, the pipeline retained its configurations and data', async ({
        dashboardPage, pipelinePage, header, folderPage, project}) => {

        await test.step('Configuring and moving the pipeline to a folder', async () => {
            await dashboardPage.clickJobTitleLink(project.longName);
            await pipelinePage.clickConfigureMenuOption();
            await pipelinePage.clickPipelineMenuOption();
            await pipelinePage.selectPipelineScriptFromSCMDropdownMenuItem();
            await pipelinePage.selectGitDropdownMenuItem();
            await pipelinePage.fillRepositoryURLField(projectRepositoryURL);
            await pipelinePage.clickSaveButton();
            await pipelinePage.clickMoveMenuOption();
            await pipelinePage.clickFolderDestination();
            await pipelinePage.selectFolderDestination(project.folderName);
            await pipelinePage.clickMoveButton();
            await header.pressBreadcrumbFolderName(project.folderName);
            await expect(folderPage.getJobTable).toContainText(project.longName);
            await expect(folderPage.getJobTitleLink(project.longName)).toBeVisible();
            await dashboardPage.clickJobTitleLink(project.longName);
            await pipelinePage.clickConfigureMenuOption();
            await pipelinePage.clickPipelineMenuOption();
        });
        await test.step('Verifying the pipeline retained its configurations and data', async () => {
            await expect(pipelinePage.getDefinitionDropdownMenu).toHaveValue('1');
            await expect(pipelinePage.getRepositoryURLField).toHaveValue(projectRepositoryURL);
        });
    });
});