import { test, expect } from '@playwright/test';
import { cleanData } from '../support/cleanData';
import genData from '../fixtures/genData';
import { createUser } from '../fixtures/messages.json';

const USERNAME = process.env.LOCAL_ADMIN_USERNAME || 'admin';
const PASSWORD = process.env.LOCAL_ADMIN_PASSWORD || 'admin';
const HOST = process.env.LOCAL_HOST || 'localhost';
const PORT = process.env.LOCAL_PORT || 8080;
const loginPageURL = `http://${HOST}:${PORT}/login?from=%2F`;
const adminUrl = `http://${HOST}:${PORT}/manage/`;

async function loginAs(page, username, password) {
    await page.goto(loginPageURL);
    await page.getByRole('textbox', { name: 'Username' }).fill(username);
    await page.getByRole('textbox', { name: 'Password' }).fill(password);
    await page.getByRole('checkbox', { name: 'Keep me signed in' }).check({ force: true });
    await page.getByRole('button', { name: 'Sign in' }).click();
}

async function createNewUser(page) {
    const project = genData.newProject();
    await cleanData();
    await page.goto(loginPageURL);
    await loginAs(page, USERNAME, PASSWORD)
    await page.getByRole('link', { name: 'Manage Jenkins' }).click();
    await page.getByRole('link', { name: 'Create/delete/modify users' }).click();
    await page.getByRole('link', { name: 'Create User' }).click();
    await page.locator('[name="username"]').fill(project.userName);
    await page.locator('[name="password1"]').fill(project.userName);
    await page.locator('[name="password2"]').fill(project.userName);
    await page.locator('[name="fullname"]').fill(project.userName);
    await page.locator('[name="email"]').fill(project.email);
    await page.getByRole('button', { name: 'Create User' }).click();
    return project;
}

test.describe('US_13.001 | User > Create new User', () => {

    test('TC_13.001.01 | Verify the created user successfully logs in to Jenkins', async ({page}) => {

        const project = await createNewUser(page);
        await loginAs(page, project.userName, project.userName);

        await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible();
        await expect(page.getByRole('link', { name: project.userName, exact: true })).toBeVisible();
    });

    test('TC_13.001.02 | Verify the user does not have direct Jenkins access to Admin features', async ({page}) => {

        const project = await createNewUser(page);
        await loginAs(page, project.userName, project.userName);

        await expect(page.getByRole('link', { name: 'Manage Jenkins' })).toBeHidden();
        await page.goto(adminUrl);

        await expect(page.locator('h1')).toContainText(createUser.accessDeniedMessage);
        await expect(page.locator('.error')).toContainText(project.userName + " " + createUser.permissionError );
    });

    test('TC_13.001.03 | Verify the possibility for Admin to delete the user', async ({page}) => {

        const project = await createNewUser(page);
        await page.getByRole('row', { name: project.userName }).getByRole('link').nth(2).click();
        await page.getByRole('button', { name: /Yes/ }).click();
        
        await expect(page.locator('#people')).not.toContainText(project.userName);
        await expect(page.locator('#people').getByRole('link', { name: project.userName })).toHaveCount(0);
    });
});