import { test, expect } from '@playwright/test';
import { cleanData } from '../support/cleanData';
import { itemName } from '../fixtures/newItemName';
import genData from '../fixtures/genData';
import allkeys from '../fixtures/newJobPageData.json';
import { newItem } from '../fixtures/messages.json';

let newItemName, project, newProject;
const { projectNameInvalid, errorMessageColor } = allkeys;

test.beforeEach(async ({page}) => {
    await cleanData();
    await page.goto('/');
    newItemName = itemName();
    project = genData.newProject();
    newProject = genData.newProject();
});

test.describe('US_00.002 | New Item > Create Pipeline Project', () => {

    test('TC_00.002.01 | Verify the url of the configure page contains the name of the new Pipeline', async ({page, baseURL}) => {
        
        await test.step('Creating a Pipeline project', async() => {
            await page.getByRole('link', { name: 'New Item' }).click();
            await page.getByRole('textbox', { name: 'Enter an item name' }).fill(project.name);
            await page.getByRole('radio', { name: 'Pipeline' }).first().click();
            await page.getByRole('button', { name: 'OK' }).click();
        });
        const encodedProjectName = encodeURIComponent(project.name);
        const configurePageURL = `${baseURL}/job/${encodedProjectName}/configure`;
        await test.step('Verifying the url of the configure page contains the name of the new Pipeline', async () => {
            await expect(page).toHaveURL(configurePageURL);
        });
        await test.step('Verifying the new Pipeline project was created', async() => {
            await page.getByRole('button', { name: 'Save' }).click();
            await page.getByRole('link', { name: '[Jenkins]Jenkins' }).click();
            await expect(page.locator('#main-panel')).toContainText(project.name);
            await expect(page.locator(`a[href="job/${encodedProjectName}/"]`).first()).toBeVisible();
        });
    });

    test('TC_00.002.02 | Verify the Pipeline project name does not contain any special characters', async ({page}) => {

        await test.step('Attempting to create a new Pipeline project containing special characters in its name', async () => {
            await page.getByRole('link', { name: 'New Item' }).click();
            await page.getByRole('textbox', { name: 'Enter an item name' }).fill(projectNameInvalid);
            await expect(page.locator('#itemname-invalid')).toHaveText(newItem.newItemNameInvalidMessage);
            await expect(page.locator('#itemname-invalid')).toHaveCSS('color', errorMessageColor);
        });
        await test.step('Creating a new Pipeline', async() => {
            await page.getByRole('textbox', { name: 'Enter an item name' }).clear();
            await page.getByRole('textbox', { name: 'Enter an item name' }).fill(project.name);
            await page.getByRole('radio', { name: 'Pipeline' }).first().click();
            await page.getByRole('button', { name: 'OK' }).click();
            await page.getByRole('button', { name: 'Save' }).click();
            await page.getByRole('link', { name: 'Dashboard' }).click();
        });
        await test.step('Verifying the Pipeline project was created, not containing any special characters in its name', async () => {
            await expect(page.locator('#main-panel')).toContainText(project.name);
            await expect(page.getByRole('cell', { name: project.name, exact: true }).nth(0)).toBeVisible();
            const projectNameLocator = page.getByRole('link', { name: project.name, exact: true });
            const itemName = await projectNameLocator.innerText();
            expect(itemName).not.toMatch(/[!@#$%^&*[\]\/\\|;:<>,?]/);
        });      
    });

    test('TC_00.002.03 | Verify the possibility to create the Pipeline project with any special characters in its name', async ({page}) => {

        await test.step('Attempting to create a new Pipeline project containing special characters in its name', async () => {
            await page.getByRole('link', { name: 'New Item' }).click();
            await page.getByRole('textbox', { name: 'Enter an item name' }).fill(projectNameInvalid);
            await expect(page.locator('#itemname-invalid')).toHaveText(newItem.newItemNameInvalidMessage);
            await expect(page.locator('#itemname-invalid')).toHaveCSS('color', errorMessageColor);
            await page.getByRole('radio', { name: 'Pipeline' }).first().click();
            await expect(page.getByRole('button', { name: 'OK' })).toBeDisabled();
            await page.getByRole('link', { name: '[Jenkins]Jenkins' }).click();
        });
        await test.step('Verifying the Pipeline project was not created', async () => {
            await expect(page.locator('.jenkins-table__link.model-link.inside')).toHaveCount(0);
            await expect(page.getByRole('heading', { name: 'Welcome to Jenkins!' })).toBeVisible();
        });
    });
});