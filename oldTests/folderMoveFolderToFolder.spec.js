import { test, expect } from '@playwright/test';
import { cleanData } from '../support/cleanData';
import genData from '../fixtures/genData';
import { createProject } from '../fixtures/createNewItem';

let project;

test.beforeEach(async ({page}) => {
    await cleanData();
    await page.goto('/');
    project = genData.newProject();
    await test.step('Creating two Folders', async () => {
        await createProject(page, project.name, 'Folder');
        await createProject(page, project.longName, 'Folder');
    });
});

test.describe('US_04.002 | Folder > Move Folder to Folder', () => {

    test('TC_04.002.01 | Verify the possibility to move one Folder to another from the Folder page', async ({page, baseURL}) => {

        await test.step('Moving one Folder to another', async () => {
            await page.getByRole('link', { name: project.name, exact: true }).click();
            await page.getByRole('link', { name: 'Move' }).click();
            await page.locator('[name="destination"]').selectOption({ label: `Jenkins » ${project.longName}` });
            await page.getByRole('button', { name: 'Move' }).click();
        });
        await test.step('Verifying one Folder was moved to another', async () => {
            let expectedURL = `${baseURL}/job/${project.longName}/job/${project.name}/`;
            await expect(page).toHaveURL(expectedURL);
            await page.reload();
            await page.locator(':nth-child(3) > .model-link').click();
            await expect(page.locator('.jenkins-table')).toContainText(project.name);
            await expect(page.getByRole('link', { name: project.name, exact: true })).toBeVisible();
        });
    });

    test('TC_04.002.02 | Verify all possible paths for moving the folder are displayed in the dropdown menu', async ({page}) => {

        await expect(page.locator('.jenkins-table__link')).toHaveCount(2);
        await page.getByRole('link', { name: project.name, exact: true }).hover();
        await page.getByRole('link', { name: project.name }).getByRole('button').click();
        await page.getByRole('link', { name: 'Move' }).click();
        await page.locator('[name="destination"]').click();

        const optionSelector = await page.locator('[name="destination"] option').allTextContents();
        ['Jenkins', `Jenkins » ${project.longName}`].forEach(expected => {
            expect(optionSelector).toContain(expected);
        });
    });

    test('TC_04.002.03 | Verify the possibility to see the location of the moved folder in the breadcrumbs', async ({page}) => {

        await test.step('Moving one Folder to another', async () => {
            await page.getByRole('link', { name: project.name, exact: true }).hover();
            await page.getByRole('link', { name: project.name, exact: true }).getByRole('button').click();
            await page.getByRole('link', { name: 'Move' }).click();
            await page.locator('[name="destination"]').click();
            await page.locator('[name="destination"]').selectOption({ label: `Jenkins » ${project.longName}` });
            await page.getByRole('button', { name: 'Move' }).click();
        });
        await test.step('Verifying the possibility to see the location of the moved folder in the breadcrumbs', async () => {
            await expect(page.locator('#breadcrumbBar')).toContainText('Dashboard');
            await expect(page.locator('#breadcrumbBar')).toContainText(`${project.longName}`);
            await expect(page.locator('#breadcrumbBar')).toContainText(`${project.name}`);
            await expect(page.locator('#breadcrumbBar')).toBeVisible();
        });
    });

    test('TC_04.002.04 | Verify the absence of the Move section on the Folder page if there is only one Folder on the Dashboard page', async ({page}) => {

        await test.step('Verifying the presence of the "Move" section on the Folder page when having more than one Folder', async () => {
            await page.getByRole('link', { name: project.name, exact: true }).click();
            await page.getByRole('link', { name: 'Move' }).click();
            await expect(page.locator('#main-panel h1')).toHaveText('Move');
            await expect(page.locator('#main-panel h1')).toBeVisible();
            await expect(page.getByRole('button', { name: 'Move' })).toBeEnabled();
            await page.getByRole('link', { name: 'Delete Folder' }).click();
            await page.getByRole('button', { name: 'Yes' }).click();
        });
        await test.step('Verifying the absence of the "Move" section on the Folder page when having one Folder', async () => {
            await expect(page.locator('.jenkins-table__link')).toHaveCount(1);
            await page.getByRole('link', { name: project.longName, exact: true }).click();
            await expect(page.getByRole('heading', { name: 'Move' })).toBeHidden();
            await expect(page.getByRole('button', { name: 'Move' })).toBeHidden();
        });
    });
});