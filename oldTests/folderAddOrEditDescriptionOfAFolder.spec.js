import { test, expect } from '@playwright/test';
import { cleanData } from '../support/cleanData';
import genData from '../fixtures/genData';

let project;

test.beforeEach(async ({page}) => {
    await cleanData();
    await page.goto('/');
    project = genData.newProject();
    await test.step('Creating a Folder', async () => {
        await page.getByRole('link', { name: 'New Item' }).click();
        await page.locator('input[name="name"]').fill(project.folderName);
        await page.getByRole('radio', { name: 'Folder Creates a container' }).click();
        await page.getByRole('button', { name: /OK/ }).click();
        await page.getByRole('button', { name: /Save/ }).click();
    });
});

test.describe('US_04.004 | Folder > Add or Edit Description of a Folder', () => {

    test('TC_04.004.01 | Verify the possibility to view the Folder description before saving it', async ({page}) => {

        await page.getByRole('link', { name: 'Configure' }).click();
        await page.locator('[name="_.description"]').fill(project.description);
        
        await expect(page.locator('[name="_.description"]')).toHaveValue(project.description);
        await expect(page.locator('[name="_.description"]')).toBeVisible();
    });

    test('TC_04.004.02 | Verify the description on the Configure page differs from that on the Folder page', async ({page}) => {

        await test.step('Adding descriptions on the Configure page and on the Folder page', async () => {
            await page.getByRole('link', { name: 'Configure' }).click();
            await page.locator('[name="_.description"]').fill(project.description);
            await expect(page.locator('[name="_.description"]')).toBeVisible();
            await page.getByRole('button', { name: /Save/ }).click();
            await page.getByRole('link', { name: 'Add description' }).click();
            await expect(page.locator('textarea[name="description"]')).toBeEmpty();
            await page.locator('textarea[name="description"]').fill(project.newDescription);
            await page.getByRole('button', { name: /Save/ }).click();
        });
        await test.step('Verifying the descriptions on the Configure page and on the Folder page are different', async () => {
            const initialDescription = await page.locator('#view-message').innerText();
            const newDescription = page.getByText(project.newDescription).innerText();
            expect(initialDescription).not.toEqual(newDescription);
            await expect(page.locator('#view-message')).toBeVisible();
            await expect(page.getByText(project.newDescription)).toBeVisible();
        });
    });

    test('TC_04.004.03 | Verify the Folder description can be edited after saving', async ({page}) => {

        await test.step('Adding a description', async () => {
            await page.getByRole('link', { name: 'Configure' }).click();
            await page.locator('[name="_.description"]').fill(project.description);
            await page.getByRole('button', { name: /Save/ }).click();
            await page.getByRole('link', { name: 'Configure' }).click();
        });
        await test.step('Verifying the Folder description can be edited after saving', async () => {
            await expect(page.locator('[name="_.description"]')).toBeEditable();
            await page.locator('[name="_.description"]').fill(project.newDescription);
            await expect(page.locator('[name="_.description"]')).toHaveValue(project.newDescription);
            await expect(page.locator('[name="_.description"]')).toBeVisible();
        });
    });

    test('TC_04.004.04 | Verify a long text description is displayed both on the Configure page and on the Folder page', async ({page}) => {

        await test.step('Adding a long text description', async () => {
            await page.getByRole('link', { name: 'Configure' }).click();
            await page.locator('[name="_.description"]').fill(project.longDescription);
        });
        await test.step('Verifying a long text description is displayed both on the Configure page and on the Folder page', async () =>{
            await expect(page.locator('[name="_.description"]')).toHaveValue(project.longDescription);
            await expect(page.locator('[name="_.description"]')).toBeVisible();
            await page.getByRole('button', { name: /Save/ }).click();
            await expect(page.locator('#view-message')).toHaveText(project.longDescription);
            await expect(page.locator('#view-message')).toBeVisible();
        });
    });
});