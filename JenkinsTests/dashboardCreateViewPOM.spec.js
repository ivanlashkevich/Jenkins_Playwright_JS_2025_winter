import { test, expect } from '../setup/globalHooks';
import myViewsPageData from '../fixtures/myViewsPageData.json';

let projectNames;

test.beforeEach(async ({dashboardPage, newJobPage, basePage, header, project, createProject}) => {
    await createProject(project.name, 'Freestyle project');
    await createProject(project.longName, 'Folder');
});

test.describe('US_16.002 | Dashboard > Create View', async () => {

    test('TC_16.002.01 | Verify the view can be created through entering a name, selecting a type and saving', async ({
        myViewsPage, header, dashboardPage, project}) => {

        await myViewsPage.clickAddNewViewLink();
        await myViewsPage.fillViewName(project.userName);
        await myViewsPage.checkListViewRadio();
        await myViewsPage.clickCreateButton();
        await myViewsPage.clickOKButton();
        await header.clickDashhboardBreadcrumbLink();
        
        await expect(dashboardPage.getViewTab).toContainText(project.userName);
        await expect(dashboardPage.getJobTitleLink(project.userName)).toBeVisible();
    });

    test('TC_16.002.02 | Verify the possibility to add and delete columns while configuring the view', async ({
        myViewsPage, project}) => {

        await myViewsPage.clickAddNewViewLink();
        await myViewsPage.fillViewName(project.userName);
        await myViewsPage.checkListViewRadio();
        await myViewsPage.clickCreateButton();

        projectNames = [project.name, project.longName];
        for (const name of projectNames) {
            await myViewsPage.clickJobCheckbox(name);
        }
        await myViewsPage.clickDeleteStatusColumnButton();
        await myViewsPage.clickAddColumnButton();
        await myViewsPage.selectColumnDropdownOption(myViewsPageData.columnName.projectDescription);
        await myViewsPage.clickOKButton();
        await myViewsPage.clickEditViewMenuOption();

        await expect(myViewsPage.getStatusColumn).toBeHidden();
        await expect(myViewsPage.getProjectDescriptionColumn).toBeVisible();
    });

    test('TC_16.002.03 | Verify that only selected jobs are displayed in the view after it is saved', async ({
        page, myViewsPage, project}) => {
        
        await myViewsPage.clickAddNewViewLink();
        await myViewsPage.fillViewName(project.userName);
        await myViewsPage.checkListViewRadio();
        await myViewsPage.clickCreateButton();
        await myViewsPage.clickJobCheckbox(project.name);
        await myViewsPage.clickOKButton();

        await expect(page).toHaveTitle(`${project.userName} [Jenkins]`);
        await expect(myViewsPage.getJobTitleLink(project.name)).toBeVisible();
        await expect(myViewsPage.getJobTitleLink(project.longName)).toBeHidden();
    });

    test('TC_16.002.04 | Verify that only selected columns are displayed in the saved view', async ({myViewsPage, project}) => {

        await test.step('Creating the view, removing all the columns and adding one column', async () => {
            await myViewsPage.clickAddNewViewLink();
            await myViewsPage.fillViewName(project.userName);
            await myViewsPage.checkListViewRadio();
            await myViewsPage.clickCreateButton();

            projectNames = [project.name, project.longName];
            for (const name of projectNames) {
                await myViewsPage.clickJobCheckbox(name);
            }
            const count = await myViewsPage.getDeleteButton.count();
            for (let i = 0; i < count; i++) {
                await myViewsPage.clickFirstColumnDeleteButton();
            }
            await myViewsPage.clickAddColumnButton();
            await myViewsPage.selectColumnDropdownOption(myViewsPageData.columnName.name_1);
            await myViewsPage.clickOKButton();
        });
        await test.step('Verifying that only selected column is displayed in the saved view', async () => {
            await expect(myViewsPage.getJobTable).toContainText(myViewsPageData.columnName.name_1);
            await expect(myViewsPage.getNameColumnJobTableLink).toBeVisible();

            const hiddenColumns = ['S', 'W', 'Last Success', 'Last Failure', 'Last Duration', 'Build Button', 'Project description'];
            for (const column of hiddenColumns) {
                await expect(myViewsPage.getColumnName(column)).toBeHidden();
            }
        });
    });
});