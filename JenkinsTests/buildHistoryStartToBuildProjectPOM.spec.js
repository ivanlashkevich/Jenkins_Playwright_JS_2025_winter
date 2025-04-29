import { test, expect } from '../setup/globalHooks';

let projects;

test.beforeEach(async ({dashboardPage, newJobPage, basePage, header, project, createProject}) => {
    await createProject(project.name, 'Freestyle project');
    await createProject(project.longName, 'Pipeline');
    projects = [{ name: project.name, type: 'Freestyle project' }, { name: project.longName, type: 'Pipeline' }];
});

test.describe('US_08.001 | Build history > Start to build a project', () => {

    test('TC_08.001.01 | Verify the build status icon for "Not built" project and pipeline is shown on the "Dashboard" page', async ({
        dashboardPage}) => {
        
        await expect(dashboardPage.getNotBuiltIcons).toHaveCount(2);
        for (const icon of await dashboardPage.getNotBuiltIcons.all()) {
            await expect(icon).toBeVisible();
            await expect(icon).toHaveAttribute('tooltip', 'Not built');
        }
    });

    test('TC_08.001.02 | Verify the possibility for the user to "Schedule a build" from the "Dashboard page"', async ({
        dashboardPage, buildHistoryPage, header}) => {

        for (const item of projects) {
            await test.step(`Scheduling and verifying build for ${item.type}`, async () => {
                await dashboardPage.clicktScheduleBuildForItem(item.name);
                await expect(dashboardPage.getBuildScheduledTooltipText).toBeVisible();
                await dashboardPage.clickBuildHistoryMenuOption();

                const projectNameEncoded = encodeURIComponent(item.name); 
                await expect(buildHistoryPage.getBuildNumber(projectNameEncoded)).toBeVisible();
                await header.clickJenkinsLogo();
            });
        }
    });

    test('TC_08.001.03 | Verify the possibility to trigger a project build from the Project page using "Build Now" option from menu', async ({
        page, dashboardPage, basePage, header}) => {

        for (const item of projects) {
            await test.step(`Triggering and verifying the ${item.type} build from the Project page`, async () => {
                await dashboardPage.pressJobTitleLink(item.name);
                await basePage.clickBuildNowMenuOption();
                await expect(basePage.getBuildScheduledTooltipText).toBeVisible();
                const frameBuildNumberLocator = '#buildHistory .build-link.display-name';
                await page.waitForSelector(frameBuildNumberLocator);
                await expect(basePage.getFrameBuildNumber).toBeVisible();
                await header.clickJenkinsLogo();
            });
        }
    });

    test('TC_08.001.04 | Verify the information about the new build appears on the "Build history" page', async ({
        dashboardPage, buildHistoryPage, project}) => {
        
        await dashboardPage.clicktScheduleBuildForItem(project.name);
        await dashboardPage.clicktScheduleBuildForItem(project.longName);
        await dashboardPage.clickBuildHistoryMenuOption();

        await expect(buildHistoryPage.getBuildNumbers).toHaveCount(2);
        for (const link of await buildHistoryPage.getBuildNumbers.all()) {
            await expect(link).toBeVisible();
        }
    });
});