import { test, expect } from '@playwright/test';
import { cleanData } from '../support/cleanData';
import genData from '../fixtures/genData';
import { newItem } from '../fixtures/messages.json';

let project;

test.beforeEach(async({page}) => {
    await cleanData();
    await page.goto('/');
    project = genData.newProject();
    await test.step('Creating a Folder', async () => {
        await page.getByRole('link', { name: 'New Item' }).click();
        await page.locator('input[name="name"]').fill(project.folderName);
        await page.locator('.com_cloudbees_hudson_plugins_folder_Folder').click();
        await page.getByRole('button', { name: /OK/ }).click();
        await page.locator('textarea[name="_.description"]').fill(project.description);
        await page.getByRole('button', { name: /Save/ }).click();
        await page.locator('#jenkins-home-link').click();
    });
});

test.describe('US_00.004 | New item > Create Folder', () => {

    test('TC_00.004.01 | Verify a New Folder is created from Dashboard dropdown menu in the top left', async ({page}) => {

        await test.step('Creating a Folder from Dashboard dropdown menu', async () => {
            await cleanData();
            await page.getByRole('link', { name: 'Dashboard' }).hover();
            await page.locator('#breadcrumbBar .jenkins-menu-dropdown-chevron').click();
            await page.locator('.jenkins-dropdown__item[href$="newJob"]').click();
            await page.locator('input[name="name"]').fill(project.longName);
            await page.locator('.com_cloudbees_hudson_plugins_folder_Folder').click();
            await page.getByRole('button', { name: /OK/ }).click();
            await page.getByRole('button', { name: /Save/ }).click();
            await page.getByRole('link', { name: 'Dashboard' }).click();
        });
        await test.step('Verifying the Folder was created', async () => {
            await expect(page.locator('.jenkins-table')).toContainText(project.longName);
            await expect(page.getByRole('link', { name: project.longName, exact: true })).toBeVisible();
        });
    });

    test('TC_00.004.02 | Verify a New Folder is created from other existing', async ({page}) => {

        await test.step('Creating a new Folder from the existing one', async () => {
            await page.getByRole('link', { name: 'New Item' }).click();
            await page.locator('input[name="name"]').fill(project.longName);
            await page.locator('.com_cloudbees_hudson_plugins_folder_Folder').click();
            await page.getByPlaceholder('Type to autocomplete').type(project.folderName.slice(0, 1));
            await page.getByRole('listitem').getByText(project.folderName).click();
            await page.getByRole('button', { name: /OK/ }).click();
            await page.getByRole('button', { name: /Save/ }).click();
            await page.locator('#jenkins-home-link').click();
        });
        await test.step('Verifying both Folders were created', async () => {
            const projectArray = [project.folderName, project.longName];
            for (const element of projectArray) {
                await expect(page.locator('.jenkins-table')).toContainText(element);
                await expect(page.getByRole('link', { name: element, exact: true })).toBeVisible();
            }
        });
    });

    test('TC_00.004.03 | Verify a New Folder can only be created using a unique name', async ({page}) => {

        await test.step('Attempting to create a Folder with the existing name', async () => {
            await page.getByRole('link', { name: 'New Item' }).click();
            await page.locator('input[name="name"]').fill(project.folderName);
            await expect(page.locator('#itemname-invalid')).toHaveText(`${newItem.duplicateNotAllowedMessage} ‘${project.folderName}’`);
            await expect(page.locator('#itemname-invalid')).toBeVisible();
            await page.locator('.com_cloudbees_hudson_plugins_folder_Folder').click();
            await expect(page.getByRole('button', { name: /OK/ })).toBeDisabled();
        });
        await test.step('Creating a Folder with a unique name', async () => {
            await page.locator('input[name="name"]').fill(project.longName);
            await page.getByRole('button', { name: /OK/ }).click();
            await page.getByRole('button', { name: /Save/ }).click();
            await page.locator('#jenkins-home-link').click();
        });
        await test.step('Verifying the Folder was created', async () => {
            await expect(page.locator('.jenkins-table')).toContainText(project.longName);
            await expect(page.getByRole('link', { name: project.longName, exact: true })).toBeVisible();
        });
    });
});