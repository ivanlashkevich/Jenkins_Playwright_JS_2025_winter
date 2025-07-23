import { expect, chromium } from '@playwright/test';

async function globalSetup() {
  const browser = await chromium.launch({
    headless: true,
  });
  const context = await browser.newContext();
  const page = await context.newPage();

  const USERNAME = process.env.LOCAL_ADMIN_USERNAME || 'admin';
  const PASSWORD = process.env.LOCAL_ADMIN_PASSWORD || 'admin';
  const HOST = process.env.LOCAL_HOST || 'localhost';
  const PORT = process.env.LOCAL_PORT || 8080;

  await page.goto(`http://${HOST}:${PORT}/login?from=%2F`);
  await page.waitForLoadState('networkidle');
  await page.getByRole('textbox', { name: 'Username' }).fill(USERNAME);
  await page.getByRole('textbox', { name: 'Password' }).fill(PASSWORD);
  await page.getByRole('button', { name: 'Sign in' }).click();

  // await expect(page.getByRole('heading', { name: 'Welcome to Jenkins!' })).toBeVisible();
  await page.context().storageState({ path: './LoginAuthCQ.json' });
  await browser.close();
}

export default globalSetup;