import { test, expect } from '@playwright/test';
import { cleanData } from '../support/cleanData';
import { itemName } from '../fixtures/newItemName';
import genData from '../fixtures/genData';

let newItemName, project;

test.beforeEach(async ({page}) => {
    await cleanData();
    await page.goto('/');
    newItemName = itemName();
    project = genData.newProject();
});

test.describe('US_00.000 | New Item > Create New item', () => {

    test('TC_00.000.01 | Verify a New Item is created using the "Create a job" button', async ({page}) => {

        await test.step('Creating a New Item using the "Create a job" button', async () => {
            await page.getByRole('link', { name: 'Create a job' }).click();
            await page.getByRole('textbox', { name: 'Enter an item name' }).fill(project.name);
            await page.getByRole('radio', { name: 'Freestyle project' }).click();
            await page.getByRole('button', { name: 'OK' }).click();
            await page.getByRole('button', { name: 'Save' }).click();
            await expect(page.getByRole('heading', { name: project.name, exact: true })).toHaveText(project.name);
            await page.getByRole('link', { name: '[Jenkins]Jenkins' }).click();
        });
        await test.step('Verifying the New Item was created', async () => {
            await expect(page.locator('#main-panel')).toContainText(project.name);
            await expect(page.getByRole('link', { name: project.name, exact: true })).toBeVisible();
        });
    });

    test('TC_00.000.02 | Verify a New Item is created from the "New Item" link in the left sidebar', async ({page}) => {

        await test.step('Creating a New Item using the "New Item" link', async () => {
            await page.getByRole('link', { name: 'New Item' }).click();
            await page.getByRole('textbox', { name: 'Enter an item name' }).fill(newItemName);
            await page.getByRole('radio', { name: 'Freestyle project' }).first().click();
            await page.getByRole('button', { name: 'OK' }).click();
            await page.getByRole('button', { name: 'Save' }).click();
            await expect(page.getByRole('heading', { name: newItemName, exact: true })).toHaveText(newItemName);
            await page.getByRole('link', { name: '[Jenkins]Jenkins' }).click();
        });
        await test.step('Verifying the New Item was created', async () => {
            await expect(page.locator('#main-panel')).toContainText(newItemName);
            await expect(page.getByRole('link', { name: newItemName, exact: true })).toBeVisible();
        });
    });

    test('TC_00.000.03 | Verify a New Item is created from the Dashboard dropdown menu', async ({page}) => {
    
            await test.step('Creating a New Item from the Dashboard dropdown menu', async () => {
                await page.getByRole('link', { name: 'Dashboard' }).hover();
                await page.locator('#breadcrumbBar .jenkins-menu-dropdown-chevron').click();
                await page.locator('.jenkins-dropdown__item[href$="newJob"]').click();
                await page.locator('input[name="name"]').fill(newItemName);
                await page.getByRole('radio', { name: 'Freestyle project' }).click();
                await page.getByRole('button', { name: 'OK' }).click();
                await page.getByRole('button', { name: 'Save' }).click();
                await page.getByRole('link', { name: 'Dashboard' }).click();
            });
            await test.step('Verifying the New Item was created', async () => {
                await expect(page.locator('#main-panel')).toContainText(newItemName);
                await expect(page.getByRole('link', { name: newItemName, exact: true })).toBeVisible();
            });
        });

    test('TC_00.000.04 | Verify the New Item can only be created using unique item name', async ({page}) => {

        await test.step('Precondition: creating a New Item', async () => {
            await page.getByRole('link', { name: 'Create a job' }).click();
            await page.getByRole('textbox', { name: 'Enter an item name' }).fill(project.name);
            await page.getByRole('radio', { name: 'Freestyle project' }).click();
            await page.getByRole('button', { name: 'OK' }).click();
            await page.getByRole('button', { name: 'Save' }).click();
            await page.getByRole('link', { name: '[Jenkins]Jenkins' }).click();
        });
        await test.step('Verify the New Item can only be created using unique item name', async () => {
            await page.getByRole('link', { name: 'New Item' }).click();
            await page.getByRole('textbox', { name: 'Enter an item name' }).fill(project.name);
            await expect(page.getByText('» A job already exists with')).toContainText(`» A job already exists with the name ‘${project.name}’`);
            await expect(page.locator('.input-validation-message').nth(1)).toBeVisible();
            await page.getByRole('radio', { name: 'Freestyle project' }).click();
            await expect(page.getByRole('button', { name: 'OK' })).toBeDisabled();
            await page.getByRole('textbox', { name: 'Enter an item name' }).fill(project.newName);
            await page.getByRole('button', { name: 'OK' }).click();
            await page.getByRole('button', { name: 'Save' }).click();
            await page.getByRole('link', { name: 'Dashboard' }).click();
            await expect(page.locator('#main-panel')).toContainText(project.newName);
            await expect(page.getByRole('link', { name: project.newName, exact: true }).nth(0)).toBeVisible();
        });
    });
});