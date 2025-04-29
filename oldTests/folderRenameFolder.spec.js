import { test, expect } from '@playwright/test';
import { cleanData } from '../support/cleanData';
import genData from '../fixtures/genData';
import { tooltipElement } from '../fixtures/configurePageData.json';

let project;

test.beforeEach(async ({page}) => {
    await cleanData();
    await page.goto('/');
    await page.waitForTimeout(1000);
    project = genData.newProject();
    await test.step('Creating a Folder', async () => {
        await page.getByRole('link', { name: 'New Item' }).click();
        await page.getByRole('textbox', { name: 'Enter an item name' }).fill(project.folderName);
        await page.locator('.com_cloudbees_hudson_plugins_folder_Folder').click();
        await page.getByRole('button', { name: 'OK' }).click();
        await page.getByRole('button', { name: 'Save' }).click();
    });
});

test.describe('US_04.001 | Folder > Rename Folder', () => {

    test('TC_04.001.01 | Verify a Folder is renamed from dropdown menu of the folder-element in the breadcrumb', async ({page}) => {

        await page.getByRole('link', { name: project.folderName, exact: true }).hover();
        await page.getByRole('link', { name: project.folderName, exact: true }).getByRole('button').click();
        await page.locator('.jenkins-dropdown__item:nth-child(5)').click();
        await page.locator('input[name="newName"]').fill(project.longName);
        await page.getByRole('button', { name: 'Rename' }).click();

        await expect(page.locator('#main-panel h1')).toHaveText(project.longName);
        await expect(page.locator('#main-panel h1')).toBeVisible();
        await expect(page).toHaveTitle(`All [${project.longName}] [Jenkins]`);
    });

    test('TC_04.001.02 | Verify a Folder name changes are observed from both Folder and Dashboard pages', async ({page}) => {
        
        await test.step('Renaming the Folder', async () => {
            await page.locator('[href$="rename"]').click();
            await page.reload();
            await page.waitForSelector('input[name="newName"]', { visible: true });
            await page.locator('input[name="newName"]').fill(project.longName);
            await page.getByRole('button', { name: 'Rename' }).click();
        });
        await test.step('Verifying the changes from the Folder page', async () => {
            const headlineLocator = page.locator('#main-panel h1');
            const headlineText = await headlineLocator.textContent();
            expect(headlineText.trim()).toBe(project.longName);
            await expect(headlineLocator).toBeVisible();
            await page.locator('#jenkins-home-link').click();
        });
        await test.step('Verifying the changes from the Dashboard page', async () => {
            const jenkinsTable = await page.locator('.jenkins-table').textContent();
            expect(jenkinsTable).toContain(project.longName);
            await expect(page.getByRole('link', { name: project.longName, exact: true })).toBeVisible();
        });   
    });

    test('TC_04.001.03 | Verify the presence of the "Display Name" hint and its description on the Configure page when clicked', async ({page}) => {

        await page.getByRole('link', { name: 'Configure' }).click();
        await page.locator('.jenkins-help-button').first().hover();

        await expect(page.locator('.tippy-content')).toBeVisible();
        await expect(page.locator('.tippy-content')).toHaveText(tooltipElement.title);

        await page.locator('.jenkins-help-button').first().click();
        await expect(page.locator('.help-area').first()).toBeVisible();
        await expect(page.locator('.help-area').first()).toContainText(tooltipElement.text);
    });

    test('TC_04.001.04 | Verify that the display name when set, is shown on both Folder and Dashboard pages', async ({page}) => {

        let headlineText;
        const headlineLocator = page.locator('#main-panel h1');
        await test.step('Renaming the Folder', async () => {
            await page.getByRole('link', { name: 'Rename' }).click();
            await page.locator('input[name="newName"]').fill(project.longName);
            await page.getByRole('button', { name: 'Rename' }).click();

            headlineText = await headlineLocator.textContent();
            expect(headlineText).toContain(project.longName);
            await expect(headlineLocator).toBeVisible();
        });
        await test.step('Setting the Folder display name', async () => {
            await page.getByRole('link', { name: 'Configure' }).click();
            await page.locator('input[name="_.displayNameOrNull"]').fill(project.name);
            await page.getByRole('button', { name: 'Save' }).click();
        });
        await test.step('Verifying the Folder display name is shown on the Folder page', async () => {
            headlineText = await headlineLocator.textContent();
            expect(headlineText.trim()).toBe(project.name);
            await expect(headlineLocator).toBeVisible();
        });
        await test.step('Verifying the Folder display name is shown on the Dashboard page', async () => {
            await page.getByRole('link', { name: 'Dashboard' }).click();
            await expect(page.locator('.jenkins-table')).toContainText(project.name);
            await expect(page.getByRole('link', { name: project.name, exact: true })).toBeVisible();
        });
    });
});