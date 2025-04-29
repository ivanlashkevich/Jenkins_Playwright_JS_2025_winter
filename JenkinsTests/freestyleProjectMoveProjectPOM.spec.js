import { test, expect } from "../setup/globalHooks";

let encodedProjectName, encodedFolderName, pageURL;

test.beforeEach(async ({page, dashboardPage, newJobPage, freestyleProjectPage, folderPage, header, project, baseURL}) => {
    encodedProjectName = encodeURIComponent(project.name);
    encodedFolderName = encodeURIComponent(project.longName);
    pageURL = `${baseURL}/job/${encodedFolderName}/job/${encodedProjectName}/`;
    await test.step('Creating a Freestyle ptoject', async () => {
        await dashboardPage.clickNewItemMenuOption();
        await newJobPage.fillNewItemName(project.name);
        await newJobPage.selectFreestyleProject();
        await newJobPage.clickOKButton();
        await freestyleProjectPage.clickSaveButton();
        await header.clickDashhboardBreadcrumbLink();
    });
    await test.step('Creating a Folder', async () => {
        await dashboardPage.clickNewItemMenuOption();
        await newJobPage.fillNewItemName(project.longName);
        await newJobPage.selectFolder();
        await newJobPage.clickOKButton();
        await folderPage.clickSaveButton();
    });
});

test.describe('US_01.006 | FreestyleProject > Move project', () => {

    test('TC_01.006.01 | Verify the Freestyle project is moved to a Folder from the Dashboard page', async ({
        page, dashboardPage, freestyleProjectPage, folderPage, header, project}) => {

        await test.step('Moving the Freestyle project from the Dashboard page', async () => {
            await header.clickJenkinsLogo();
            await dashboardPage.hoverJobTitleLink(project.name);
            await dashboardPage.clickJobTableDropdownChevron(project.name);
            await dashboardPage.clickMoveDropdownMenuItem();
            await freestyleProjectPage.selectroProjectDestination(project.longName);
            await freestyleProjectPage.clickMoveButton();
        });
        await test.step('Verifying the Freestyle project is moved to a Folder', async () => {
            await expect(freestyleProjectPage.getMainPanel).toContainText(`Full project name: ${project.longName}/${project.name}`);
            await expect(page).toHaveURL(pageURL);
            await header.pressBreadcrumbFolderName();
            await expect(folderPage.getItemTitle(project.longName)).toBeVisible();
            await expect(folderPage.getJobTable).toContainText(project.name);
            await expect(folderPage.getJobTitleLinkFromJobTable(project.name)).toBeVisible();
        });
    });

    test('TC_01.006.02 | Verify the Freestyle project is moved to a Folder from the Project page', async ({
        page, dashboardPage, freestyleProjectPage, folderPage, header, project}) => {

        await test.step('Moving the Freestyle project from the Project page', async () => {
            await header.clickJenkinsLogo();
            await dashboardPage.clickJobTitleLink(project.name);
            await freestyleProjectPage.clickMoveMenuOption();
            await freestyleProjectPage.selectroProjectDestination(project.longName);
            await freestyleProjectPage.clickMoveButton();
        });
        await test.step('Verifying the Freestyle project is moved to a Folder', async () => {
            await expect(freestyleProjectPage.getMainPanel).toContainText(`Full project name: ${project.longName}/${project.name}`);
            await expect(page).toHaveURL(pageURL);
            await header.pressBreadcrumbFolderName();
            await expect(folderPage.getJobTitleLink(project.name)).toBeVisible();
        });
    });

    test('TC_01.006.03 | Verify the Freestyle project is moved to one of available Folders', async ({
        page, dashboardPage, newJobPage, freestyleProjectPage, folderPage, header, project}) => {

        await test.step('Creating another Folder', async () => {
            await header.clickJenkinsLogo();
            await dashboardPage.clickNewItemMenuOption();
            await page.reload();
            await page.waitForLoadState('networkidle');
            await newJobPage.fillNewItemName(project.userName);
            await newJobPage.selectFolder();
            await newJobPage.clickOKButton();
            await folderPage.clickSaveButton();
        });
        await test.step('Moving the Freestyle project to another Folder', async () => {
            await header.clickJenkinsLogo();
            await dashboardPage.hoverJobTitleLink(project.name);
            await dashboardPage.clickJobTableDropdownChevron(project.name);
            await dashboardPage.clickMoveDropdownMenuItem();
            await freestyleProjectPage.selectroProjectDestination(project.userName);
            await freestyleProjectPage.clickMoveButton();
        });
        await test.step('Verifying the Freestyle project is moved to another Folder', async () => {
            await expect(freestyleProjectPage.getMainPanel).toContainText(`Full project name: ${project.userName}/${project.name}`);
            await expect(page).toHaveTitle(`${project.name} [${project.userName}] [Jenkins]`);
            await header.pressBreadcrumbFolderName();
            await expect(folderPage.getItemTitle(project.userName)).toBeVisible();
            await expect(folderPage.getJobTable).toContainText(project.name);
            await expect(folderPage.getJobTitleLinkFromJobTable(project.name)).toBeVisible();
        });
    });

    test('TC_01.006.04 | Verify a Freestyle project created from a Folder, is inside this Folder by default', async ({
        page, dashboardPage, newJobPage, freestyleProjectPage, folderPage, header, project}) => {
            
        await test.step('Creating a Freestyle project from a Folder', async () => {
            await folderPage.clickCreateJobLink();
            await page.reload();
            await newJobPage.fillNewItemName(project.newName);
            await newJobPage.selectFreestyleProject();
            await folderPage.clickOKButton();
            await folderPage.clickSaveButton();
        });
        await test.step('Verifying a Freestyle project created from a Folder, is located inside this Folder by default', async () => {
            await expect(freestyleProjectPage.getMainPanel).toContainText(`Full project name: ${project.longName}/${project.newName}`);
            await header.clickDashhboardBreadcrumbLink();
            await page.reload();
            const projectLinkSelector = `.jenkins-table__link:has-text("${project.longName}")`;
            await page.waitForSelector(projectLinkSelector);
            await dashboardPage.pressJobTitleLink(project.longName);
            await expect(folderPage.getItemTitle(project.longName)).toBeVisible();
            await expect(folderPage.getJobTable).toContainText(project.newName);
            await expect(folderPage.getJobTitleLinkFromJobTable(project.newName)).toBeVisible();
        });
    });
});