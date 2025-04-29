import { test, expect } from '@playwright/test';
import { cleanData } from '../support/cleanData';
import { propertiesOfFolder } from '../fixtures/configurePageData.json';
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
        await page.getByRole('button', { name: 'OK' }).click();
        await page.getByRole('button', { name: 'Save' }).click();
    });
});

test.describe('US_04.005 | Folder > Add or Edit Properties of a Folder', () => {

    test('TC_04.005.01 | Verify the configured Health metrics and Pipeline Libraries properties of a Folder are saved', async ({page}) => {

        await page.getByRole('link', { name: 'Configure' }).click();
        await page.locator('.jenkins-button.advanced-button').click();
        await page.getByRole('button', { name: 'Add metric' }).click();
        await page.getByRole('button', { name: 'Child item with worst health' }).click();
        await page.getByRole('button', { name: 'Add', exact: true }).click();
        await page.locator('input[checkdependson="name"]').fill(project.name);
        await page.locator('input[name="_.remote"]').fill(propertiesOfFolder.repositoryURL);
        await page.getByRole('button', { name: 'Save' }).click();

        await page.getByRole('link', { name: 'Configure' }).click();
        await page.locator('.jenkins-button.advanced-button').click();
        await expect(page.locator('input[name="_.recursive"]')).toBeChecked();
        await expect(page.locator('input[checkdependson="name"]')).toHaveValue(project.name);
        await expect(page.locator('input[name="_.remote"]')).toHaveValue(propertiesOfFolder.repositoryURL);
    });

    test('TC_04.005.02 | Verify the mandatory fields of the Pipeline Libraries of a Folder are marked with a red hint', async ({page}) => {

        await page.getByRole('link', { name: 'Configure' }).click();
        await page.getByRole('button', { name: 'Properties' }).click();
        await page.getByRole('button', { name: 'Add', exact: true }).click();

        await expect(page.getByText('Name? You must enter a name.')).toContainText('You must enter a name.');
        await expect(page.getByText('You must enter a name.')).toHaveCSS('color', 'rgb(230, 0, 31)');
        await expect(page.getByText('You must enter a name.')).toBeVisible();
        await page.locator('div').filter({ hasText: /^Modern SCMLegacy SCM$/ }).getByRole('combobox').selectOption({ label: 'Legacy SCM' });

        await expect(page.getByText('Repository URL? Please enter Git repository.')).toContainText('Please enter Git repository.');
        await expect(page.getByText('Please enter Git repository.')).toHaveCSS('color', 'rgb(230, 0, 31)');
        await expect(page.getByText('Please enter Git repository.')).toBeVisible();
    });

    test('TC_04.005.03 | Verify the appeared section after checking the checkbox "Cache fetched versions on controller for quick retrieval"', async ({page}) => {

        await page.getByRole('link', { name: 'Configure' }).click();
        await page.getByRole('button', { name: 'Properties' }).click();
        await page.getByRole('button', { name: 'Add', exact: true }).click();
        await page.getByText('Cache fetched versions on controller for quick retrieval').click();

        await expect(page.locator('[name="_.refreshTimeMinutes"]')).toBeEditable();
        await expect(page.locator('[name="_.excludedVersionsStr"]')).toBeEmpty();
        await expect(page.locator('[name="_.includedVersionsStr"]')).toBeEmpty();
        await expect(page.locator('[name="_.forceDelete"]')).not.toBeChecked();
    });
});