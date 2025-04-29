import { test, expect } from '@playwright/test';
import { cleanData } from '../support/cleanData';
import genData from '../fixtures/genData';

let project;

test.beforeEach(async ({page}) => {
    await cleanData();
    await page.goto('/');
    project = genData.newProject();
});

test.describe('US_13.003| User > Config', () => {

    test('TC_13.003.01 | Verify the possibility to choose one of the three color themes on the Appearance page', async ({page}) => {

        await page.getByRole('link', { name: 'Manage Jenkins' }).click();
        await page.locator('[href="appearance"]').click();
        
        await expect(page.locator('label').filter({ hasText: /^Dark$/ })).toBeEnabled();
        await expect(page.locator('label').filter({ hasText: 'Dark (System)' })).toBeEnabled();
        await expect(page.locator('label').filter({ hasText: /^Default$/ })).toBeEnabled();
        await expect(page.locator('.jenkins-form-item').first()).toBeVisible();
    });

    test('TC_13.003.02 | Verify the user updates the color theme via the Configure page', async ({page}) => {

        await test.step('Updating the color theme', async () => {
            await page.locator('[href*="user"]').click();
            await page.getByRole('link', { name: /^Configure$/, exact: true }).click();
            await page.locator('label').filter({ hasText: /^Dark$/ }).click();
            await page.getByRole('button', { name: /Save/ }).click();

            await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(31, 31, 35)');
        });
        await test.step('Setting the color theme to the default', async () => {
            await page.getByRole('link', { name: /^Configure$/, exact: true }).click();
            await page.locator('label').filter({ hasText: /^Default$/ }).click();
            await page.getByRole('button', { name: /Save/ }).click();
        });
    });

    test('TC_13.003.03 | Verify the changed username and added description are displayed on the Status page', async ({page}) => {

        await test.step('Updating username and adding description', async () => {
            await page.locator('[href*="user"]').click();
            await page.getByRole('link', { name: /^Configure$/, exact: true }).click();
            await page.locator('input[name="_.fullName"]').fill(project.userName);
            await page.locator('textarea[name="_.description"]').fill(project.description);
            await page.getByRole('button', { name: /Save/ }).click();
        });
        await test.step('Verifying the updated username and the description are visible', async () => {
            await expect(page.locator('#main-panel h1')).toHaveText(project.userName);
            await expect(page.locator('#main-panel h1')).toBeVisible();
            await expect(page.getByText(project.description)).toHaveText(project.description);
            await expect(page.getByText(project.description)).toBeVisible();
        });
        await test.step('Setting the username and the description to the default', async () => {
            await page.getByRole('link', { name: /^Configure$/, exact: true }).click();
            await page.locator('input[name="_.fullName"]').fill('admin');
            await page.locator('textarea[name="_.description"]').clear();
            await page.getByRole('button', { name: /Save/ }).click();
        });
    });
});