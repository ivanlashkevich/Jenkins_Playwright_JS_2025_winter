import { test, expect } from '@playwright/test';
import { cleanData } from '../support/cleanData';
import gendata from '../fixtures/genData';
import { createProject } from '../fixtures/createNewItem';
import { projectRepositoryURL } from '../fixtures/pipelinePageData.json';

let project;

test.beforeEach(async ({page}) => {
    await cleanData();
    await page.goto('/');
    project = gendata.newProject();
    await createProject(page, project.folderName, 'Folder');
    await createProject(page, project.userName, 'Folder');
    await createProject(page, project.longName, 'Pipeline');
});

test.describe('US_02.006 | Pipeline > Move pipeline', () => {

    test('TC_02.006.01 | Verify the "Move" link appears on the Pipeline page only after a Folder is created', async ({page}) => {

        await test.step('Creating a Pipeline, and verifying the "Move" link is missing', async () => {
            await cleanData();
            await page.getByRole('link', { name: 'New Item' }).click();
            await page.getByRole('textbox', { name: 'Enter an item name' }).fill(project.name);
            await page.getByRole('radio', { name: 'Pipeline' }).first().click();
            await page.getByRole('button', { name: 'OK' }).click();
            await page.getByRole('button', { name: 'Save' }).click();
            await expect(page.getByRole('link', { name: 'Move' })).toBeHidden();
            await page.locator('#jenkins-home-link').click();
        });
        await test.step('Creating a Folder, and verifying the "Move" link appeared', async () => {
            await page.getByRole('link', { name: 'New Item' }).click();
            await page.locator('input[name="name"]').fill(project.longName);
            await page.locator('.com_cloudbees_hudson_plugins_folder_Folder').click();
            await page.getByRole('button', { name: /OK/ }).click();
            await page.getByRole('button', { name: /Save/ }).click();

            await page.locator('#jenkins-home-link').click();
            await page.getByRole('link', { name: project.name, exact: true }).press('Enter');
            await expect(page.getByRole('link', { name: 'Move' })).toBeVisible();
        });
    });

    test('TC_02.006.02 | Verify the possibility to view a list of available target projects in the move dropdown menu', async ({page}) => {

        await page.getByRole('link', { name: project.longName, exact: true }).click();
        await page.getByRole('link', { name: 'Move' }).click();
        await page.locator('[name="destination"]').click();

        await expect(page.locator('[name="destination"] option')).toHaveCount(3);
        const expectedProjects = ['Jenkins', `Jenkins » ${project.folderName}`, `Jenkins » ${project.userName}`];
        const actualProjects = await page.locator('[name="destination"] option').allTextContents();
        
        for (const project of expectedProjects) {
            expect(actualProjects).toContain(project);
        }
    });

    test('TC_02.006.03 | Verify that after the move, the pipeline is transferred to the target project', async ({page}) => {

        await page.getByRole('link', { name: project.longName, exact: true }).click();
        await page.getByRole('link', { name: 'Move' }).click();
        await page.locator('[name="destination"]').click();
        await page.locator('[name="destination"]').selectOption({label: `Jenkins » ${project.folderName}`});
        await page.getByRole('button', { name: 'Move' }).click();
        await page.getByRole('link', { name: project.folderName, exact: true }).press('Enter');

        await expect(page.locator('.jenkins-table')).toContainText(project.longName);
        await expect(page.getByRole('link', { name: project.longName, exact: true })).toBeVisible();
    });

    test('TC_02.006.04 | Verify that after the move is complete, the pipeline retained its configurations and data', async ({page}) => {

        await test.step('Configuring and moving the pipeline to a folder', async () => {
            await page.getByRole('link', { name: project.longName, exact: true }).click();
            await page.getByRole('link', { name: 'Configure' }).click();
            await page.getByRole('button', { name: 'Pipeline' }).click();
            await page.locator('div').filter({ hasText: /^Pipeline scriptPipeline script from SCM$/ }).getByRole('combobox').selectOption({ label: 'Pipeline script from SCM' });
            await page.locator('div').filter({ hasText: /^NoneGit$/ }).getByRole('combobox').selectOption({ label: 'Git' });
            await page.locator('input[name="_.url"]').first().fill(projectRepositoryURL);
            await page.getByRole('button', { name: /Save/ }).click();
            await page.getByRole('link', { name: 'Move' }).click();
            await page.locator('[name="destination"]').click();
            await page.locator('[name="destination"]').selectOption({ label: `Jenkins » ${project.folderName}` });
            await page.getByRole('button', { name: 'Move' }).click();
            await page.getByRole('link', { name: project.folderName, exact: true }).press('Enter');
            await expect(page.locator('.jenkins-table')).toContainText(project.longName);
            await expect(page.getByRole('link', { name: project.longName, exact: true })).toBeVisible();
            await page.getByRole('link', { name: project.longName, exact: true }).click();
            await page.getByRole('link', { name: 'Configure' }).click();
            await page.getByRole('button', { name: 'Pipeline' }).click();
        });
        await test.step('Verifying the pipeline retained its configurations and data', async () => {
            await expect(page.locator('div').filter({ hasText: /^Pipeline scriptPipeline script from SCM$/ }).getByRole('combobox')).toHaveValue('1');
            await expect(page.locator('input[name="_.url"]').first()).toHaveValue(projectRepositoryURL);

        });
    });
});