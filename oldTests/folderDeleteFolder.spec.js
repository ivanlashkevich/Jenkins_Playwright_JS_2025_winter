import { test, expect } from '@playwright/test';
import { cleanData } from '../support/cleanData';
import genData from '../fixtures/genData';

let project;

test.beforeEach(async({page}) => {
    await cleanData();
    await page.goto('/');
    project = genData.newProject();
    await test.step('Creating a Folder and a subfolder', async () => {
        await page.getByRole('link', { name: 'New Item' }).click();
        await page.getByRole('textbox', { name: 'Enter an item name' }).fill(project.folderName);
        await page.getByRole('radio', { name: 'Folder Creates a container' }).click();
        await page.getByRole('button', { name: /OK/ }).click();
        await page.getByRole('button', { name: /Save/ }).click();
        await page.getByRole('link', { name: 'Create a job' }).click();
        await page.getByRole('textbox', { name: 'Enter an item name' }).fill(project.longName);
        await page.getByRole('radio', { name: 'Folder Creates a container' }).click();
        await page.getByRole('button', { name: /OK/ }).click();
        await page.getByRole('button', { name: /Save/ }).click();
    });
});

test.describe('US 04.003 | Folder > Delete Folder', () => {

    test('TC_04.003.01 | Verify that after deleting a top-level folder, the user is redirected to the DashboardPage', async ({page}) => {

        await page.getByRole('link', { name: project.folderName, exact: true }).press('Enter');
        await expect(page).toHaveTitle(`All [${project.folderName}] [Jenkins]`);
        await page.getByRole('link', { name: 'Delete Folder' }).click();
        await page.getByRole('button', { name: /Yes/ }).click();
        
        await expect(page.locator('.jenkins-table__link')).toHaveCount(0);
        await expect(page.getByText('Welcome to Jenkins!')).toBeVisible();
        await expect(page).toHaveTitle('Dashboard [Jenkins]');
    });

    test('TC_04.003.02 | Verify that after deleting a subfolder, the user is redirected to the top-level FolderPage', async ({page}) => {

        await expect(page.locator('#main-panel h1')).toHaveText(project.longName);
        await expect(page.locator('#main-panel h1')).toBeVisible();
        await page.getByRole('link', { name: 'Delete Folder' }).click();
        await page.getByRole('button', { name: /Yes/ }).click();

        await expect(page.getByText('This folder is empty')).toBeVisible();
        await expect(page).toHaveTitle(`All [${project.folderName}] [Jenkins]`);
    });

    test('TC_04.003.03 | Verify the user can create a folder and a subfolder with the names of the deleted ones', async ({page}) => {

        await test.step('Deleting a folder and a subfolder', async () => {
            await expect(page.locator('#main-panel h1')).toHaveText(project.longName);
            await page.getByRole('link', { name: project.folderName, exact: true }).press('Enter');
            await expect(page.locator('#main-panel h1')).toHaveText(project.folderName);
            await page.getByRole('link', { name: 'Delete Folder' }).click();
            await page.getByRole('button', { name: /Yes/ }).click();
            await expect(page.locator('.jenkins-table__link')).toHaveCount(0);
            await expect(page.getByText('Welcome to Jenkins!')).toBeVisible();
        });
        await test.step('Creating a folder and a subfolder with the names of the deleted ones', async () => {
            await page.getByRole('link', { name: 'New Item' }).click();
            await page.getByRole('textbox', { name: 'Enter an item name' }).fill(project.folderName);
            await page.getByRole('radio', { name: 'Folder Creates a container' }).click();
            await page.getByRole('button', { name: /OK/ }).click();
            await page.getByRole('button', { name: /Save/ }).click();
            await page.getByRole('link', { name: 'Create a job' }).click();
            await page.getByRole('textbox', { name: 'Enter an item name' }).fill(project.longName);
            await page.getByRole('radio', { name: 'Folder Creates a container' }).click();
            await page.getByRole('button', { name: /OK/ }).click();
            await page.getByRole('button', { name: /Save/ }).click();
        });
        await test.step('Verifying the names of the deleted and the created folder and a subfolder are the same', async () => {
            await expect(page.locator('#main-panel h1')).toHaveText(project.longName);
            await page.getByRole('link', { name: project.folderName, exact: true }).press('Enter');
            await expect(page.locator('#main-panel h1')).toHaveText(project.folderName);
        });
    });
});