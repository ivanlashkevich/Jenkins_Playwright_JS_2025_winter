import { test, expect } from '@playwright/test';
import { cleanData } from '../support/cleanData';

const USERNAME = process.env.LOCAL_ADMIN_USERNAME || 'admin';
const PASSWORD = process.env.LOCAL_ADMIN_PASSWORD || 'admin';
const HOST = process.env.LOCAL_HOST || 'localhost';
const PORT = process.env.LOCAL_PORT || 8080;
const loginPageURL = `http://${HOST}:${PORT}/login?from=%2F`;

test.use({ storageState: undefined });

test.describe('US_14.003 | Header > Log out option', () => {

    test('TC_14.003.01 | Verify the "log out" button is visible in the application’s header after the user logs in', async ({page}) => {

        await page.goto(loginPageURL);
        await page.getByRole('textbox', { name: 'Username' }).fill(USERNAME);
        await page.getByRole('textbox', { name: 'Password' }).fill(PASSWORD);
        await page.getByRole('checkbox', { name: 'Keep me signed in' }).check({ force: true });
        await page.getByRole('button', { name: 'Sign in' }).click();

        await expect(page.getByRole('link', { name: 'log out' })).toBeVisible();
    });
});

test.describe('Isolated logout tests', () => {

    test.beforeEach(async ({ page }) => {
        await cleanData();
        await test.step('Logging in to Jenkins', async () => {
            await page.goto(loginPageURL);
            await page.getByRole('textbox', { name: 'Username' }).fill(USERNAME);
            await page.getByRole('textbox', { name: 'Password' }).fill(PASSWORD);
            await page.getByRole('checkbox', { name: 'Keep me signed in' }).check({ force: true });
            await page.getByRole('button', { name: 'Sign in' }).click();
        });
    });

    test('TC_14.003.02 | Verify the "log out" button redirects to the login page and terminates session', async ({page}) => {

        await test.step('Ensuring the "log out" button is visible and clicked', async () => {
            await expect(page.getByRole('link', { name: 'log out' })).toBeVisible();
            await page.getByRole('link', { name: 'log out' }).click();
        });
        await test.step('Confirming redirect to login page', async () => {
            await expect(page).toHaveURL(/login/);
            await expect(page.getByText('Sign in to Jenkins')).toBeVisible();
        });
        await test.step('Attempting to access a protected route, and confirming still on the login page', async () => {
            await page.goto('/');
            await expect(page).toHaveURL(/login/);
            await expect(page.getByRole('button', { name: 'Sign in' })).toBeVisible();
        });
    });

    test('TC_14.003.03 | Verify session cookies are cleared or invalidated after the "log out" button clicked', async ({
        page, context}) => {

        let cookiesBefore, sessionCookieBefore, cookiesAfter, sessionCookieAfter;
        await test.step('Confirming session cookie exists before logout', async () => {
            cookiesBefore = await context.cookies();
            sessionCookieBefore = cookiesBefore.find(c => c.name.includes('JSESSIONID'));
            expect(sessionCookieBefore).toBeDefined();
        });
        await test.step('Log out', async () => {
            await page.getByRole('link', { name: 'log out' }).click();
            await expect(page).toHaveURL(/login/);
        });
        await test.step('Confirming session cookie exists after logout', async () => {
            cookiesAfter = await context.cookies();
            sessionCookieAfter = cookiesAfter.find(c => c.name.includes('JSESSIONID'));
        });
        await test.step('Verifying cookie is either gone or changed', async () => {
            const isCleared = !sessionCookieAfter;
            const isChanged = sessionCookieAfter?.value !== sessionCookieBefore?.value;
            expect(isCleared || isChanged).toBeTruthy();
        });
    });
});