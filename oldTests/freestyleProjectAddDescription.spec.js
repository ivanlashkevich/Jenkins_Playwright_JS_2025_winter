import { test, expect } from '@playwright/test';
import { cleanData } from '../support/cleanData';
import { itemName } from '../fixtures/newItemName';
import genData from '../fixtures/genData';

let newItemName, project;

test.beforeEach(async ({page}) => {
    await cleanData();
    await page.goto('/');
    await page.waitForTimeout(1000);
    newItemName = itemName();
    project = genData.newProject();
});

test.describe('US_01.001 | FreestyleProject > Add description', () => {

    test('TC_01.001.01 | Verify the possibility to add description when creating the project', async ({page}) => {
        
        await test.step('Creating a Freestyle project', async () => {
            await page.getByRole('link', { name: 'Create a job' }).click();
            await page.getByRole('textbox', { name: 'Enter an item name' }).fill(project.name);
            await page.getByRole('radio', { name: 'Freestyle project' }).click();
            await page.getByRole('button', { name: 'OK' }).click();
            await page.locator('textarea[name="description"]').fill(project.description);
            await page.getByRole('button', { name: 'Save' }).click(); 
        });
        await test.step('Verify the description was added to the project', async () => {
            await expect(page.locator('#description')).toBeVisible();
            await expect(page.locator('#description')).toHaveText(project.description);
        });
    });

    test('TC_01.001.02 | Verify the possibility to update an existing description', async ({page}) => {

        await test.step('Creating a Freestyle Project and adding a description', async () => {
            await page.getByRole('link', { name: 'New item' }).click();
            await page.getByRole('textbox', { name: 'Enter an item name' }).fill(project.name);
            await page.getByRole('radio', { name: 'Freestyle project' }).click();
            await page.getByRole('button', { name: 'OK' }).click();
            await page.locator('textarea[name="description"]').fill(project.description);
            await page.getByRole('button', { name: 'Save' }).click();
        });
        await test.step('Modifying an existing description', async () => {
            await expect(page.locator('#description')).toHaveText(project.description);
            await page.getByRole('link', { name: 'Edit description' }).click();
            await page.locator('textarea[name="description"]').fill(project.newDescription);
            await page.getByRole('button', { name: 'Save' }).click();
        });
        await test.step('Verifying the existing description', async () => {
            await expect(page.locator('#description')).toHaveText(project.newDescription);
            await expect(page.locator('#description')).toBeVisible();
        });
    });

    test('TC_01.001.03 | Verify the description is updated via "Configure" dropdown option', async ({page}) => {

        await test.step('Creating a Freestyle Project and adding a description', async () => {
            await page.getByRole('link', { name: 'New item' }).click();
            await page.locator('#name').fill(project.name);
            await page.locator('.hudson_model_FreeStyleProject').click();
            await page.locator('#ok-button').click();
            await page.locator('textarea[name="description"]').fill(project.description);
            await page.locator('[name="Submit"]').click();
            await expect(page.locator('#description')).toHaveText(project.description);
            await page.locator('.jenkins-breadcrumbs__list-item').first().click();
        });
        await test.step('Updating a description via "Configure" dropdown option', async () => {
            await page.locator(`.jenkins-table__link:has-text("${project.name}")`).hover();
            await page.getByRole('link', { name: project.name }).getByRole('button').click();
            await page.locator('.jenkins-dropdown__item', { hasText: 'Configure' }).click();
            await page.locator('[name="description"]').fill(project.newDescription);
            await page.locator('[name="Submit"]').click();
        });    
        await test.step('Verifying a description was updated', async () => {
            await expect(page.locator('#description')).toHaveText(project.newDescription);
            await expect(page.locator('#description')).toBeVisible();
        });  
    });
});