import { test, expect } from '@playwright/test';
import { cleanData } from '../support/cleanData';
import genData from '../fixtures/genData';
import { organizationFolderConfiguration, publisherWhiteList } from '../fixtures/configurePageData.json';
import { organizationFolderScan } from '../fixtures/messages.json';

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
        await page.getByRole('link', { name: 'Configure', exact: true }).click();
    });
});

test.describe('US_06.001 | Organisation folder > Configuration', () => {

    test('TC_06.001.01 | Verify the Organization Folder icon changed from "Metadata Folder Icon" to the "Default Icon"', async ({page}) => {

        await page.getByRole('button', { name: 'Appearance' }).click();
        await page.locator('section').filter({ hasText: 'Default Icon' }).getByRole('combobox').selectOption({ label: 'Default Icon'});
        await page.getByRole('button', { name: /Save/ }).click();

        await expect(page.locator('[tooltip="Folder"][title="Folder"]')).toBeVisible();
    });

    test('TC_06.001.02 | Verify the possibility to set the Organization Folder Repository Source configuration', async ({page}) => {

        await test.step('Setting the Organization Folder configuration', async () => {
            await page.locator('div').filter({ hasText: /^Repository SourcesAdd$/ }).getByRole('button').click();
            await page.getByRole('button', { name: 'Single repository' }).click();
            await page.locator('input[name="_\\.name"]').first().fill(project.name);
            await page.locator('div').filter({ hasText: /^SourcesAdd$/ }).getByRole('button').click();
            await page.getByRole('button', { name: 'Single repository & branch' }).click();
            await page.locator('input[name="_\\.name"]').nth(1).fill(project.newName);
            await page.locator('[name="_.url"]').first().fill(organizationFolderConfiguration.repositoryURL);
            await page.getByRole('button', { name: /Save/ }).click();
            await page.getByRole('link', { name: 'Configure', exact: true }).click();
        });
        await test.step('Verifying the configuration did not change after being saved', async () => {
            await expect(page.locator('input[name="_\\.name"]').first()).toHaveValue(project.name);
            await expect(page.locator('input[name="_\\.name"]').nth(1)).toHaveValue(project.newName);
            await expect(page.locator('[name="_.url"]').first()).toHaveValue(organizationFolderConfiguration.repositoryURL);
        });
    });

    test('TC_06.001.03 | Verify the Organization Folder is scanned after configuring the "Projects" settings and saving', async ({page}) => {

        await test.step('Setting the Organization Folder configuration', async () => {
            await page.locator('div').filter({ hasText: /^Repository SourcesAdd$/ }).getByRole('button').click();
            await page.getByRole('button', { name: 'Single repository' }).click();
            await page.locator('input[name="_\\.name"]').first().fill(project.name);
            await page.locator('div').filter({ hasText: /^SourcesAdd$/ }).getByRole('button').click();
            await page.getByRole('button', { name: 'Single repository & branch' }).click();
            await page.locator('input[name="_\\.name"]').nth(1).fill(project.newName);
            await page.locator('[name="_.url"]').first().fill(organizationFolderConfiguration.repositoryURL);
            await page.getByRole('button', { name: /Save/ }).click();
        });
        await test.step('Verifying the Organization Folder was scanned after configuring the "Projects" settings and saving', async () => {
            await expect(page.locator('#main-panel h1')).toHaveText('Scan Organization Folder Log');
            await expect(page.locator('#main-panel h1')).toBeVisible();
            await expect(page.locator('[tooltip="Success"][title="Success"]')).toBeVisible();
            await expect(page.locator('pre')).toContainText(organizationFolderScan.organizationFolderScanned);
        });
    });

    test('TC_06_001.04 | Verify the Publisher white-list of the "Untrusted" section contains all possible options', async ({page}) => {

        await page.getByRole('button', { name: 'Add property' }).click();
        await page.getByRole('button', { name: 'Untrusted' }).click();
        await page.locator('.setting-main input[name="publisherWhitelist"] + label.attach-previous').first().waitFor({ state: 'visible' });
        const labelTexts = await page.locator('.setting-main input[name="publisherWhitelist"] + label.attach-previous').evaluateAll(labels =>
            labels.map(label => label.textContent.trim())
        );
        console.log('Expected Publisher white-list elements:', publisherWhiteList);
        console.log('Displayed Publisher white-list elements:', labelTexts);
        expect(labelTexts).toEqual(publisherWhiteList);
    });
});