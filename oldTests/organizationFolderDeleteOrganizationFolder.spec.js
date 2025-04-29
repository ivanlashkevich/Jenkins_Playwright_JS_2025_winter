import { test, expect } from '@playwright/test';
import { cleanData } from '../support/cleanData';
import genData from '../fixtures/genData';
import { confirmationMessage_1 } from '../fixtures/deleteProjectData.json';

let project;

test.beforeEach(async ({page}) => {
    await cleanData();
    await page.goto('/');
    project = genData.newProject();
    await test.step('Creating an Organization Folder', async () => {
        await page.getByRole('link', { name: 'New Item' }).click();
        await page.locator('input[name="name"]').fill(project.name);
        await page.getByRole('radio', { name: 'Organization Folder' }).click();
        await page.getByRole('button', { name: /OK/ }).click();
        await page.getByRole('button', { name: /Save/ }).click();
    });
});

test.describe('US_06.005 | Organisation folder > Delete Organization Folder', () => {

    test('TC_06.005.01 | Verify the Organization Folder is deleted via the breadcrumb dropdown menu in the header', async ({page}) => {

        await page.locator('#breadcrumbBar [href*="job"]').hover();
        await page.locator('[href*="job"] .jenkins-menu-dropdown-chevron').click();
        await page.getByRole('button', { name: 'Delete Organization Folder' }).click();
        await page.getByRole('button', { name: /Yes/ }).click();
        
        await expect(page.locator('.jenkins-table__link')).toHaveCount(0);
        await expect(page.getByText('Welcome to Jenkins!')).toBeVisible();
    });

    test('TC_06.005.02 | Verify the Organization Folder is deleted from the Dashboard page', async ({page}) => {

        await page.locator('#jenkins-home-link').click();
        await page.getByRole('link', { name: project.name, exact: true }).hover();
        await page.locator('.jenkins-table__link > .jenkins-menu-dropdown-chevron').click();
        await page.getByRole('button', { name: 'Delete Organization Folder' }).click();
        await page.getByRole('button', { name: /Yes/ }).click();

        await expect(page.locator('.jenkins-table__link')).toHaveCount(0);
        await expect(page.getByText('Welcome to Jenkins!')).toBeVisible();
    });

    test('TC_06.005.03 | Verify the Organization Folder is deleted from the Organization Folder page', async ({page}) => {

        await page.getByRole('link', { name: 'Delete Organization Folder' }).click();
        await page.getByRole('button', { name: /Yes/ }).click();

        await expect(page.locator('.jenkins-table__link')).toHaveCount(0);
        await expect(page.getByText('Welcome to Jenkins!')).toBeVisible();
    });

    test('TC_06.005.04 | Verify the confirmation modal is displayed when attempting to delete the Organization Folder', async ({page}) => {

        await page.getByRole('link', { name: 'Delete Organization Folder' }).click();
        await expect(page.locator('.jenkins-dialog')).toBeVisible();
        await expect(page.locator('.jenkins-dialog__title')).toHaveText(confirmationMessage_1.title);
        await expect(page.locator('.jenkins-dialog__contents')).toHaveText(`${confirmationMessage_1.question} ‘${project.name}’?`);
        await page.getByRole('button', { name: /yes/i }).click();

        await expect(page.locator('.jenkins-table__link')).toHaveCount(0);
        await expect(page.getByText('Welcome to Jenkins!')).toBeVisible();
    });
});