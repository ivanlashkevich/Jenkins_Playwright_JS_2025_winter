import { test, expect } from '@playwright/test';
import { cleanData } from '../support/cleanData';
import genData from '../fixtures/genData';

let project, encodedProjectName, encodedFolderName, pageURL;

test.beforeEach(async ({page, baseURL}) => {
    await cleanData();
    await page.goto('/');   
    project = genData.newProject();
    encodedProjectName = encodeURIComponent(project.name);
    encodedFolderName = encodeURIComponent(project.longName);
    pageURL = `${baseURL}/job/${encodedFolderName}/job/${encodedProjectName}/`;
    await test.step('Creating a Freestyle ptoject', async () => {
        await page.getByRole('link', { name: 'New Item' }).click();
        await page.reload();
        await page.getByRole('textbox', { name: 'Enter an item name' }).fill(project.name);
        await page.locator('.hudson_model_FreeStyleProject').click();
        await page.getByRole('button', { name: 'OK' }).click();
        await page.getByRole('button', { name: 'Save' }).click();
        await page.locator('.jenkins-breadcrumbs__list-item:has-text("Dashboard")').click();
    });
    await test.step('Creating a Folder', async () => {
        await page.getByRole('link', { name: 'New Item' }).click();
        await page.reload();
        await page.getByRole('textbox', { name: 'Enter an item name' }).fill(project.longName);
        await page.locator('.com_cloudbees_hudson_plugins_folder_Folder').click();
        await page.getByRole('button', { name: 'OK' }).click();
        await page.getByRole('button', { name: 'Save' }).click();
    });
});

test.describe('US_01.006 | FreestyleProject > Move project', () => {

    test('TC_01.006.01 | Verify the Freestyle project is moved to a Folder from the Dashboard page', async ({page}) => {

        await test.step('Moving the Freestyle project from the Dashboard page', async () => {
            await page.locator('#jenkins-home-link').click();
            await page.getByRole('link', { name: project.name, exact: true }).hover();
            await page.getByRole('link', { name: project.name }).getByRole('button').click();
            await page.locator('a[href$="move"]').click();
            await page.locator('select[name="destination"]').selectOption({ label: `Jenkins » ${project.longName}` });
            await page.getByRole('button', { name: 'Move' }).click();
        });
        await test.step('Verifying the Freestyle project is moved to a Folder', async () => {
            await expect(page.locator('#main-panel')).toContainText(`Full project name: ${project.longName}/${project.name}`);
            await expect(page).toHaveURL(pageURL);
            await page.locator(':nth-child(3) > .model-link').press('Enter');
            await expect(page.getByRole('heading', { name: project.longName })).toBeVisible();
            await expect(page.locator('.jenkins-table')).toContainText(project.name);
            await expect(page.locator(`.jenkins-table__link:has-text("${project.name}")`)).toBeVisible();
        });
    });

    test('TC_01.006.02 | Verify the Freestyle project is moved to a Folder from the Project page', async ({page}) => {

        await test.step('Moving the Freestyle project from the Project page', async () => {
            await page.locator('#jenkins-home-link').click();
            await page.locator(`.jenkins-table__link:has-text("${project.name}")`).click();
            await page.locator('[href$="move"]').click();
            await page.locator('[name="destination"]').selectOption({ label: `Jenkins » ${project.longName}` });
            await page.getByRole('button', { name: 'Move' }).click();
        });
        await test.step('Verifying the Freestyle project is moved to a Folder', async () => {
            await expect(page.locator('#main-panel')).toContainText(`Full project name: ${project.longName}/${project.name}`);
            await expect(page).toHaveURL(pageURL);
            await page.locator(':nth-child(3) > .model-link').press('Enter');
            await expect(page.getByRole('link', { name: project.name, exact: true })).toBeVisible();
        });
    });

    test('TC_01.006.03 | Verify the Freestyle project is moved to one of available Folders', async ({page}) => {

        await test.step('Creating another Folder', async () => {
            await page.locator('#jenkins-home-link').click();
            await page.getByRole('link', { name: 'New Item' }).click();
            await page.reload();
            await page.waitForLoadState('networkidle');
            await page.getByRole('textbox', { name: 'Enter an item name' }).fill(project.userName);
            await page.locator('.com_cloudbees_hudson_plugins_folder_Folder').click();
            await page.getByRole('button', { name: 'OK' }).click();
            await page.getByRole('button', { name: 'Save' }).click();
        });
        await test.step('Moving the Freestyle project to another Folder', async () => {
            await page.locator('#jenkins-home-link').click();
            await page.locator(`.jenkins-table__link:has-text("${project.name}")`).hover();
            await page.getByRole('link', { name: project.name }).getByRole('button').click();
            await page.locator('[href$="move"]').click();
            await page.locator('[name="destination"]').selectOption({ label: `Jenkins » ${project.userName}` });
            await page.getByRole('button', { name: 'Move' }).click();
        });
        await test.step('Verifying the Freestyle project is moved to another Folder', async () => {
            await expect(page.locator('#main-panel')).toContainText(`Full project name: ${project.userName}/${project.name}`);
            await expect(page).toHaveTitle(`${project.name} [${project.userName}] [Jenkins]`);
            await page.reload();
            await page.locator(':nth-child(3) > .model-link').press('Enter');
            await expect(page.getByRole('heading', { name: project.userName })).toBeVisible();
            await expect(page.locator('.jenkins-table')).toContainText(project.name);
            await expect(page.getByRole('link', { name: project.name, exact: true })).toBeVisible();
        });
    });

    test('TC_01.006.04 | Verify a Freestyle project created from a Folder, is inside this Folder by default', async ({page}) => {
        
        await test.step('Creating a Freestyle project from a Folder', async () => {
            await page.getByRole('link', { name: 'Create a job' }).click();
            await page.locator('[name="name"]').fill(project.newName);
            await page.locator('.hudson_model_FreeStyleProject').click();
            await page.getByRole('button', { name: 'OK' }).click();
            await page.getByRole('button', { name: 'Save' }).click();
        });
        await test.step('Verifying a Freestyle project created from a Folder, is located inside this Folder by default', async () => {
            await expect(page.locator('#main-panel')).toContainText(`Full project name: ${project.longName}/${project.newName}`);
            await page.getByRole('link', { name: 'Dashboard' }).click();
            await page.reload();
            await page.waitForSelector(`.jenkins-table__link:has-text("${project.longName}")`);
            await page.getByRole('link', { name: project.longName, exact: true }).press('Enter');
            await expect(page.getByRole('heading', { name: project.longName })).toBeVisible();
            await expect(page.locator('.jenkins-table')).toContainText(project.newName);
            await expect(page.locator(`.jenkins-table__link:has-text("${project.newName}")`)).toBeVisible();
        });
    });
});