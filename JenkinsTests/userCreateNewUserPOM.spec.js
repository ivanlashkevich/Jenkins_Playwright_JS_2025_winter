import { test, expect } from '../setup/globalHooks';
import { cleanData } from '../support/cleanData';
import genData from '../fixtures/genData';
import { createUser } from '../fixtures/messages.json';

const USERNAME = process.env.LOCAL_ADMIN_USERNAME || 'admin';
const PASSWORD = process.env.LOCAL_ADMIN_PASSWORD || 'admin';
const HOST = process.env.LOCAL_HOST || 'localhost';
const PORT = process.env.LOCAL_PORT || 8080;
const loginPageURL = `http://${HOST}:${PORT}/login?from=%2F`;
const adminUrl = `http://${HOST}:${PORT}/manage/`;

async function createNewUser(loginPage, dashboardPage, manageJenkinsPage, securityUsersPage, addUserPage, project) {
    await cleanData();
    await loginPage.goto(loginPageURL);
    await loginPage.login(USERNAME, PASSWORD);
    await dashboardPage.clickManageJenkinsMenuOption();
    await manageJenkinsPage.clickUsersSectionLink();
    await securityUsersPage.clickCreateUserLink();
    await addUserPage.createUser(project.userName, project.userName, project.email);
    return project;
}

test.describe('US_13.001 | User > Create new User', () => {

    test('TC_13.001.01 | Verify the created user successfully logs in to Jenkins', async ({
        loginPage, dashboardPage, manageJenkinsPage, securityUsersPage, addUserPage, header, project}) => {

        await createNewUser(loginPage, dashboardPage, manageJenkinsPage, securityUsersPage, addUserPage, project);
        await loginPage.goto(loginPageURL);
        await loginPage.login(project.userName, project.userName);

        await expect(header.getDashboardBreadcrumbLink).toBeVisible();
        await expect(header.getUserName(project.userName)).toBeVisible();
    });

    test('TC_13.001.02 | Verify the user does not have direct Jenkins access to Admin features', async ({
        loginPage, dashboardPage, manageJenkinsPage, securityUsersPage, addUserPage, project}) => {

        await createNewUser(loginPage, dashboardPage, manageJenkinsPage, securityUsersPage, addUserPage, project);
        await loginPage.goto(loginPageURL);
        await loginPage.login(project.userName, project.userName);

        await expect(dashboardPage.getManageJenkinsMenuOption).toBeHidden();
        await loginPage.goto(adminUrl);

        await expect(manageJenkinsPage.getPageHeadline).toContainText(createUser.accessDeniedMessage);
        await expect(manageJenkinsPage.getAdminPermissionError).toContainText(project.userName + " " + createUser.permissionError);
    });

    test('TC_13.001.03 | Verify the possibility for Admin to delete the user', async ({
        loginPage, dashboardPage, manageJenkinsPage, securityUsersPage, addUserPage, project}) => {

        await createNewUser(loginPage, dashboardPage, manageJenkinsPage, securityUsersPage, addUserPage, project);
        await securityUsersPage.clickDeleteUserLink(project.userName);
        await securityUsersPage.clickYesButton();

        await expect(securityUsersPage.getUsersTable).not.toContainText(project.userName);
        await expect(securityUsersPage.getUserNameLink(project.userName)).toHaveCount(0);
    });
});