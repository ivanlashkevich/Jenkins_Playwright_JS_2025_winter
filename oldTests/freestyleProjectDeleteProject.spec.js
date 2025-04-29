import { test, expect } from '@playwright/test';
import { cleanData } from '../support/cleanData';
import genData from '../fixtures/genData';

let project;

test.beforeEach(async ({page}) => {
    await cleanData();
    await page.goto('/');
    project = genData.newProject();
    await test.step('Creating a Freestyle project', async () => {
        await page.getByRole('link', { name: 'New Item' }).click();
        await page.getByRole('textbox', { name: 'Enter an item name' }).fill(project.name);
        await page.locator('.hudson_model_FreeStyleProject').click();
        await page.getByRole('button', { name: 'OK' }).click();
        await page.getByRole('button', { name: 'Save' }).click();
    });
});

test.describe('US_01.004 | FreestyleProject > Delete Project', () => {
    
    test('TC_01.004.01 | Verify the Freestyle project is deleted from the Dashboard page', async ({page}) => {

        await page.getByRole('link', { name: 'Dashboard' }).click();
        await page.getByRole('link', { name: project.name, exact: true }).hover();
        await page.getByRole('link', { name: project.name }).getByRole('button').click();
        await page.getByRole('button', { name: 'Delete Project' }).click();
        await page.getByRole('button', { name: 'Yes' }).click();

        await expect(page.getByRole('heading', { name: 'Welcome to Jenkins!' })).toBeVisible();
        await expect(page.locator('.jenkins-table__link')).toHaveCount(0);
    });

    test('TC_01.004.02 | Verify the Freestyle project is deleted from the Project page after deletion cancel', async ({page}) => {

        await page.getByRole('link', { name: 'Delete Project' }).click();
        await page.getByRole('button', { name: 'Cancel' }).click();
        await page.getByRole('link', { name: 'Delete Project' }).click();
        await expect(page.getByRole('button', { name: 'Cancel' })).toBeEnabled();
        await expect(page.getByRole('button', { name: 'Yes' })).toBeEnabled();
        await page.getByRole('button', { name: 'Yes' }).click();

        await expect(page.getByRole('heading', { name: 'Welcome to Jenkins!'} )).toBeVisible();
        await expect(page.locator('.jenkins-table__link')).toHaveCount(0);
    });

    test('TC_01.004.03 | Verify the confirmation message is displayed before deletion', async ({page}) => {
        
        await page.getByRole('link', { name: 'Delete Project' }).click();
        
        await expect(page.locator('.jenkins-dialog')).toBeVisible();
        await expect(page.locator('.jenkins-dialog__title')).toHaveText('Delete Project');
        await expect(page.locator('.jenkins-dialog__contents')).toHaveText(`Delete the Project ‘${project.name}’?`);
    });
});