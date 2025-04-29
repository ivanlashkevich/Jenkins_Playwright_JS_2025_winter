import { test, expect } from '@playwright/test';
import { cleanData } from '../support/cleanData';
import genData from '../fixtures/genData';
import { createProject } from '../fixtures/createNewItem';

let project, projects;

test.beforeEach(async ({page}) => {
    await cleanData();
    await page.goto('/');
    project = genData.newProject();
    await createProject(page, project.name, 'Freestyle project');
    await createProject(page, project.longName, 'Pipeline');
    projects = [{ name: project.name, type: 'Freestyle project' }, { name: project.longName, type: 'Pipeline' }];
});

test.describe('US_08.001 | Build history > Start to build a project', () => {

    test('TC_08.001.01 | Verify the build status icon for "Not built" project and pipeline is shown on the "Dashboard" page', async ({page}) => {
        
        const notBuiltIcons = page.locator('tr[id*="job_"] svg[tooltip="Not built"]');
        await expect(notBuiltIcons).toHaveCount(2);
        for (const icon of await notBuiltIcons.all()) {
            await expect(icon).toBeVisible();
            await expect(icon).toHaveAttribute('tooltip', 'Not built');
        }
    });

    test('TC_08.001.02 | Verify the possibility for the user to "Schedule a build" from the "Dashboard page"', async ({page}) => {

        for (const item of projects) {
            await test.step(`Scheduling and verifying build for ${item.type}`, async () => {
                await page.getByRole('link', { name: `Schedule a Build for ${item.name}` }).click();
                await expect(page.locator('.tippy-content').getByText('Build scheduled')).toBeVisible();
                await page.getByRole('link', { name: 'Build History' }).click();

                const projectNameEncoded = encodeURIComponent(item.name); 
                await expect(page.locator(`[href="/job/${projectNameEncoded}/"] + .jenkins-table__badge`)).toBeVisible();
                await page.locator('#jenkins-home-link').click();
            });
        }
    });

    test('TC_08.001.03 | Verify the possibility to trigger a project build from the Project page using "Build Now" option from menu', async ({page}) => {

        for (const item of projects) {
            await test.step(`Triggering and verifying the ${item.type} build from the Project page`, async () => {
                await page.getByRole('link', { name: item.name, exact: true }).press('Enter');
                await page.getByRole('link', { name: 'Build Now' }).click();
                await expect(page.locator('.tippy-content').getByText('Build scheduled')).toBeVisible();
                await page.waitForSelector('#buildHistory .build-link.display-name');
                await expect(page.locator('#buildHistory .build-link.display-name').first()).toBeVisible();
                await page.locator('#jenkins-home-link').click();
            });
        }
    });

    test('TC_08.001.04 | Verify the information about the new build appears in the "Build history" section on the "Dashboard" page menu', async ({page}) => {

        await page.getByRole('link', { name: `Schedule a Build for ${project.name}` }).click();
        await page.getByRole('link', { name: `Schedule a Build for ${project.longName}` }).click();
        await page.getByRole('link', { name: 'Build History' }).click();

        const jobNumberLinks = page.locator('.jenkins-table__badge');
        await expect(jobNumberLinks).toHaveCount(2);
        for (const link of await jobNumberLinks.all()) {
            await expect(link).toBeVisible();
        }
    });
});