import { test, expect } from '@playwright/test';
import { cleanData } from '../support/cleanData';
import { cyrillicName } from '../fixtures/newItemName';
import genData from '../fixtures/genData';
import { renameItem } from '../fixtures/messages.json';

let project, randomCyrillicName;

test.beforeEach(async ({page}) => {
    await cleanData();
    await page.goto('/');
    project = genData.newProject();
    randomCyrillicName = cyrillicName();
    await test.step('Creating a Freestyle Project', async () => {
        await page.getByRole('link', { name: 'Create a job' }).click();
        await page.getByRole('textbox', { name: 'Enter an item name' }).fill(project.name);
        await page.locator('.hudson_model_FreeStyleProject').click();
        await page.getByRole('button', { name: 'OK' }).click();
        await page.getByRole('button', { name: 'Save' }).click();
    });
});

test.describe('US_01.002 | FreestyleProject > Rename Project', () => {

    test('TC_01.002.01 | Verify the Freestyle project is renamed from the Dashboard page', async ({page}) => {

        await test.step('Renaming the Freestyle project from the Dashboard page', async () => {
            await page.locator('a[href="/"]:has-text("Dashboard")').click();
            await page.locator(`.jenkins-table__link:has-text("${project.name}")`).hover();
            await page.getByRole('link', { name: project.name }).getByRole('button').click();
            await page.locator('.jenkins-dropdown__item:has-text("Rename")').click();
            await page.locator('input[name="newName"]').fill(project.longName);
            await page.locator('button[name="Submit"]').click();
        });
        await test.step('Verifying the Freestyle project was renamed', async () => {
            await expect(page.locator('h1.job-index-headline')).toHaveText(project.longName);
            await expect(page.locator('h1.job-index-headline')).toBeVisible();
            await page.locator('#jenkins-home-link').click();
            await expect(page.locator(`.jenkins-table__link:has-text("${project.longName}")`)).toHaveText(project.longName);
            await expect(page.locator(`.jenkins-table__link:has-text("${project.longName}")`)).toBeVisible();
        });
    });

    test('TC_01.002.02 | Verify the Freestyle project is renamed from the Project page', async ({page, baseURL}) => {

        await test.step('Renaming the Freestyle project from the Project page', async () => {
            const encodedProjectName = encodeURIComponent(project.name);
            const projectPageURL = `${baseURL}/job/${encodedProjectName}/`;
            await expect(page).toHaveURL(projectPageURL);
            await page.getByRole('link', { name: 'Rename' }).click();
            await page.waitForSelector('input[name="newName"]');
            await page.locator('input[name="newName"]').fill(project.longName);
            await page.getByRole('button', { name: 'Rename' }).click();
        });
        await test.step('Verifying the Freestyle project was renamed', async () => {
            await expect(page.locator('h1.job-index-headline')).toContainText(project.longName);
            await page.locator('#jenkins-home-link').click();
            await expect(page.locator(`.jenkins-table__link:has-text("${project.longName}")`)).toHaveText(project.longName);
            await expect(page.locator(`.jenkins-table__link:has-text("${project.longName}")`)).toBeVisible();
        });        
    });

    test('TC_01.002.03 | Verify the Freestyle project is renamed using Cyrillic', async ({page}) => {

        await test.step('Renaming the Freestyle project using Cyrillic', async () => {
            await page.getByRole('link', { name: 'Rename' }).click();
            await page.locator('input[name="newName"]').fill(randomCyrillicName);
            await expect(page.locator('input[name="newName"]')).toHaveValue(randomCyrillicName);
            await page.getByRole('button', { name: 'Rename' }).click();
        });
        await test.step('Verifying the Freestyle project was renamed', async () => {
            await expect(page.locator('h1.job-index-headline')).toContainText(randomCyrillicName);
            await page.locator('#jenkins-home-link').click();
            await expect(page.locator(`.jenkins-table__link:has-text("${randomCyrillicName}")`)).toHaveText(randomCyrillicName);
            await expect(page.locator(`.jenkins-table__link:has-text("${randomCyrillicName}")`)).toBeVisible();
        });
    });

    test('TC_01.002.04 | Verify the possibility to rename a Freestyle project by overwriting its name', async ({page}) => {
        
        await test.step('Attempting to rename the Freestyle project by overwriting its name', async () => {
            await page.getByRole('link', { name: 'Rename' }).click();
            await page.locator('input[name="newName"]').fill(project.name);
            await expect(page.locator('.warning')).toHaveText(renameItem.sameNameError);
            await page.getByRole('button', { name: 'Rename' }).click();
        });
        await test.step('Verifying the Freestyle project was not renamed', async () => {
            await expect(page.locator('#main-panel')).toContainText(renameItem.renameProcessingError);
            await page.locator('#jenkins-home-link').click();
            await expect(page.locator(`.jenkins-table__link:has-text("${project.name}")`)).toHaveText(project.name);
            await expect(page.locator(`.jenkins-table__link:has-text("${project.name}")`)).toBeVisible();
        });
    });
});