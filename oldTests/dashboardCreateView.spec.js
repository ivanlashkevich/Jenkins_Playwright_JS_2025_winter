import { test, expect } from '@playwright/test';
import { cleanData } from '../support/cleanData';
import { createProject } from '../fixtures/createNewItem';
import genData from '../fixtures/genData';

let project, projectNames;

test.beforeEach(async ({page}) => {
    await cleanData();
    await page.goto('/');
    project = genData.newProject();
    await createProject(page, project.name, 'Freestyle project');
    await createProject(page, project.longName, 'Folder');
});

test.describe('US_16.002 | Dashboard > Create View', async () => {

    test('TC_16.002.01 | Verify the view can be created through entering a name, selecting a type and saving', async ({page}) => {
        await page.getByRole('link', { name: 'New View' }).click();
        await page.locator('#name').fill(project.userName);
        await page.locator('[for="hudson.model.ListView"]').check();
        await page.getByRole('button', { name: /Create/ }).click();
        await page.getByRole('button', { name: /OK/ }).click();
        await page.getByRole('link', { name: /Dashboard/ }).click();

        await expect(page.locator('.tabBar')).toContainText(project.userName);
        await expect(page.getByRole('link', { name: project.userName, exact: true })).toBeVisible();
    });

    test('TC_16.002.02 | Verify the possibility to add and delete columns while configuring the view', async ({page}) => {

        await page.getByRole('link', { name: 'New View' }).click();
        await page.locator('#name').fill(project.userName);
        await page.locator('[for="hudson.model.ListView"]').check();
        await page.getByRole('button', { name: /Create/ }).click();

        projectNames = [project.name, project.longName];
        for (const name of projectNames) {
            await page.locator('.listview-jobs .jenkins-checkbox').getByText(name).click();
        }
        await page.locator('[descriptorid="hudson.views.StatusColumn"] button[title="Delete"]').click();
        await page.getByRole('button', { name: 'Add column' }).click();
        await page.getByRole('button', { name: 'Project description', exact: true }).click();
        await page.getByRole('button', { name: /OK/ }).click();
        await page.getByRole('link', { name: 'Edit View' }).click();

        await expect(page.locator('[descriptorid="hudson.views.StatusColumn"]')).toBeHidden();
        await expect(page.locator('[descriptorid="jenkins.branch.DescriptionColumn"]').first()).toBeVisible();
    });

    test('TC_16.002.03 | Verify that only selected jobs are displayed in the view after it is saved', async ({page}) => {
        
        await page.getByRole('link', { name: 'New View' }).click();
        await page.locator('#name').fill(project.userName);
        await page.locator('[for="hudson.model.ListView"]').check();
        await page.getByRole('button', { name: /Create/ }).click();
        await page.locator('.listview-jobs .jenkins-checkbox').getByText(project.name).click();
        await page.getByRole('button', { name: /OK/ }).click();

        await expect(page).toHaveTitle(`${project.userName} [Jenkins]`);
        await expect(page.getByRole('link', { name: project.name, exact: true })).toBeVisible();
        await expect(page.getByRole('link', { name: project.longName, exact: true })).toBeHidden();
    });

    test('TC_16.002.04 | Verify that only selected columns are displayed in the saved view', async ({page}) => {

        await test.step('Creating the view, removing all the columns and adding one column', async () => {
            await page.getByRole('link', { name: 'New View' }).click();
            await page.locator('#name').fill(project.userName);
            await page.locator('[for="hudson.model.ListView"]').check();
            await page.getByRole('button', { name: /Create/ }).click();

            projectNames = [project.name, project.longName];
            for (const name of projectNames) {
                await page.locator('.listview-jobs .jenkins-checkbox').getByText(name).click();
            }
            const count = await page.locator('button[title="Delete"]').count();
            for (let i = 0; i < count; i++) {
                await page.locator('button[title="Delete"]').first().click();
            }
            await page.getByRole('button', { name: 'Add column' }).click();
            await page.getByRole('button', { name: 'Name' }).first().click();
            await page.getByRole('button', { name: /OK/ }).click();
        });
        await test.step('Verifying that only selected column is displayed in the saved view', async () => {
            await expect(page.locator('.jenkins-table')).toContainText('Name');
            await expect(page.getByRole('link', { name: 'Name' })).toBeVisible();

            const hiddenColumns = ['S', 'W', 'Last Success', 'Last Failure', 'Last Duration', 'Build Button', 'Project description'];
            for (const column of hiddenColumns) {
                await expect(page.getByRole('columnheader', { name: column, exact: true })).toBeHidden();
            }
        });
    });
});