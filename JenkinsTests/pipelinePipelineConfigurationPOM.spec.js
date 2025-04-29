import { test, expect } from '../setup/globalHooks';
import { pipelineConfiguration } from '../fixtures/messages.json';
import { projectRepositoryURL } from '../fixtures/pipelinePageData.json';

test.beforeEach(async ({dashboardPage, newJobPage, project}) => {
    await test.step('Creating a Pipeline project', async () => {
        await dashboardPage.clickNewItemMenuOption();
        await newJobPage.fillNewItemName(project.name);
        await newJobPage.selectPipelineProject();
        await newJobPage.clickOKButton();
    });
});

test.describe('US_02.004 | Pipeline > Pipeline Configuration', () => {

    test('TC_02.004.01 Verify the project is disabled via the Enable/Disable toggle', async ({pipelinePage}) => {

        await pipelinePage.uncheckEnabledProjectToggle();
        await expect(pipelinePage.getDisabledProjectStatus).toBeEnabled();
        await pipelinePage.clickSaveButton();
        
        await expect(pipelinePage.getDisabledProjectWarning).toContainText(pipelineConfiguration.disabledProject);
        await expect(pipelinePage.getDisabledProjectWarning).toHaveCSS('color', 'rgb(254, 130, 10)');
        await expect(pipelinePage.getDisabledProjectWarning).toBeVisible();
    });

    test('TC_02.004.02 Verify the project is enabled after being disabled via the Enable/Disable toggle', async ({pipelinePage}) => {

        await pipelinePage.uncheckEnabledProjectToggle();
        await pipelinePage.clickSaveButton();
        await pipelinePage.clickEnableButton();
        await pipelinePage.clickConfigureMenuOption();

        await expect(pipelinePage.getEnabledProjectStatus).toBeVisible();
        await expect(pipelinePage.getEnabledProjectToggle).toBeChecked();
    });

    test('TC_02.004.03 Verify the choice of the pipeline script directly in Jenkins (using the editor)', async ({pipelinePage}) => {

        await test.step('Choosing the pipeline script directly in Jenkins', async () => {
            await pipelinePage.clickPipelineMenuOption();
            await pipelinePage.selectPipelineScriptDropdownMenuItem();
            await pipelinePage.selectScriptedPipelineDropdownMenuItem();
            await pipelinePage.clickSaveButton();
            await pipelinePage.clickConfigureMenuOption();
            await pipelinePage.clickPipelineMenuOption();
        });
        await test.step('Verifying the choice of the pipeline script directly in Jenkins (using the editor)', async () => {
            await expect(pipelinePage.getDefinitionDropdownMenu).toHaveValue('0');
            await expect(pipelinePage.getDefinitionDropdownMenu).toBeVisible();
        });
    });

    test('TC_02.004.04 Verify the choice of linking the pipeline to a Jenkinsfile stored in source control', async ({pipelinePage}) => {

        await test.step('Linking the pipeline to a Jenkinsfile stored in source control', async () => {
            await pipelinePage.clickPipelineMenuOption();
            await pipelinePage.selectPipelineScriptFromSCMDropdownMenuItem();
            await pipelinePage.selectGitDropdownMenuItem();
            await pipelinePage.fillRepositoryURLField(projectRepositoryURL);
            await pipelinePage.clickSaveButton();
            await pipelinePage.clickConfigureMenuOption();
            await pipelinePage.clickPipelineMenuOption();
        });
        await test.step('Verifying the choice of linking the pipeline to a Jenkinsfile stored in source control', async () => {
            await expect(pipelinePage.getDefinitionDropdownMenu).toHaveValue('1');
            await expect(pipelinePage.getDefinitionDropdownMenu).toBeVisible();
            await expect(pipelinePage.getRepositoryURLField).toHaveValue(projectRepositoryURL);
            await expect(pipelinePage.getRepositoryURLField).toBeVisible();
        });
    });
});