import { test, expect } from '@playwright/test';
import { cleanData } from '../support/cleanData';
import genData from '../fixtures/genData';
import { pipelineConfiguration } from '../fixtures/messages.json';
import { projectRepositoryURL } from '../fixtures/pipelinePageData.json';

let project;

test.beforeEach(async ({page}) => {
    await cleanData();
    await page.goto('/');
    project = genData.newProject();
    await test.step('Creating a Pipeline project', async () => {
        await page.getByRole('link', { name: 'New Item' }).click();
        await page.locator('input[name="name"]').fill(project.name);
        await page.getByRole('radio', { name: 'Pipeline Orchestrates' }).click();
        await page.getByRole('button', { name: /OK/ }).click();
    });
});

test.describe('US_02.004 | Pipeline > Pipeline Configuration', () => {

    test('TC_02.004.01 Verify the project is disabled via the Enable/Disable toggle', async ({page}) => {

        await page.getByText('DisabledEnabled').uncheck();
        await expect(page.getByText('Disabled')).toBeEnabled();
        await page.getByRole('button', { name: /Save/ }).click();
        
        await expect(page.locator('#enable-project')).toContainText(pipelineConfiguration.disabledProject);
        await expect(page.locator('#enable-project')).toHaveCSS('color', 'rgb(254, 130, 10)');
        await expect(page.locator('#enable-project')).toBeVisible();
    });

    test('TC_02.004.02 Verify the project is enabled after being disabled via the Enable/Disable toggle', async ({page}) => {

        await page.getByText('DisabledEnabled').uncheck();
        await page.getByRole('button', { name: /Save/ }).click();
        await page.getByRole('button', { name: /Enable/ }).click();
        await page.getByRole('link', { name: 'Configure' }).click();

        await expect(page.getByText('Enabled')).toBeVisible();
        await expect(page.getByText('DisabledEnabled')).toBeChecked();
    });

    test('TC_02.004.03 Verify the choice of the pipeline script directly in Jenkins (using the editor)', async ({page}) => {

        await test.step('Choosing the pipeline script directly in Jenkins', async () => {
            await page.getByRole('button', { name: 'Pipeline' }).click();
            await page.locator('div').filter({ hasText: /^Pipeline scriptPipeline script from SCM$/ }).getByRole('combobox').selectOption({ label: 'Pipeline script' });
            await page.locator('.samples > select').selectOption({ label: 'Scripted Pipeline' });
            await page.getByRole('button', { name: /Save/ }).click();
            await page.getByRole('link', { name: 'Configure' }).click();
            await page.getByRole('button', { name: 'Pipeline' }).click();
        });
        await test.step('Verifying the choice of the pipeline script directly in Jenkins (using the editor)', async () => {
            await expect(page.locator('div').filter({ hasText: /^Pipeline scriptPipeline script from SCM$/ }).getByRole('combobox')).toHaveValue('0');
            await expect(page.locator('div').filter({ hasText: /^Pipeline scriptPipeline script from SCM$/ }).getByRole('combobox')).toBeVisible();
        });
    });

    test('TC_02.004.04 Verify the choice of linking the pipeline to a Jenkinsfile stored in source control', async ({page}) => {

        await test.step('Linking the pipeline to a Jenkinsfile stored in source control', async () => {
            await page.getByRole('button', { name: 'Pipeline' }).click();
            await page.locator('div').filter({ hasText: /^Pipeline scriptPipeline script from SCM$/ }).getByRole('combobox').selectOption({ label: 'Pipeline script from SCM' });
            await page.locator('div').filter({ hasText: /^NoneGit$/ }).getByRole('combobox').selectOption({ label: 'Git' });
            await page.locator('input[name="_.url"]').first().fill(projectRepositoryURL);
            await page.getByRole('button', { name: /Save/ }).click();
            await page.getByRole('link', { name: 'Configure' }).click();
            await page.getByRole('button', { name: 'Pipeline' }).click();
        });
        await test.step('Verifying the choice of linking the pipeline to a Jenkinsfile stored in source control', async () => {
            await expect(page.locator('div').filter({ hasText: /^Pipeline scriptPipeline script from SCM$/ }).getByRole('combobox')).toHaveValue('1');
            await expect(page.locator('div').filter({ hasText: /^Pipeline scriptPipeline script from SCM$/ }).getByRole('combobox')).toBeVisible();
            await expect(page.locator('input[name="_.url"]').first()).toHaveValue(projectRepositoryURL);
            await expect(page.locator('input[name="_.url"]').first()).toBeVisible();
        });
    });
});