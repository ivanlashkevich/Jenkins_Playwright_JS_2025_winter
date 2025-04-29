import { test, expect } from '../setup/globalHooks';

test.describe('US_13.003| User > Config', () => {

    test('TC_13.003.01 | Verify the possibility to choose one of the three color themes on the Appearance page', async ({
        dashboardPage, manageJenkinsPage}) => {

        await dashboardPage.clickManageJenkinsMenuOption();
        await manageJenkinsPage.clickAppearanceLink();

        await expect(manageJenkinsPage.getDarkThemeOption).toBeEnabled();
        await expect(manageJenkinsPage.getDarkSystemThemeOption).toBeEnabled();
        await expect(manageJenkinsPage.getDefaultThemeOption).toBeEnabled();
        await expect(manageJenkinsPage.getThemeSection).toBeVisible();
    });

    test('TC_13.003.02 | Verify the user updates the color theme via the Configure page', async ({dashboardPage, header, userPage}) => {

        await test.step('Updating the color theme', async () => {
            await header.clickUserNameLink();
            await userPage.clickConfigureMenuOption();
            await userPage.clickDarkThemeOption();
            await userPage.clickSaveButton();

            await expect(userPage.getUserPageBody).toHaveCSS('background-color', 'rgb(31, 31, 35)');
        });
        await test.step('Setting the color theme to the default', async () => {
            await userPage.clickConfigureMenuOption();
            await userPage.clickDefaultThemeOption();
            await userPage.clickSaveButton();
        });
    });

    test('TC_13.003.03 | Verify the changed username and added description are displayed on the Status page', async ({
        dashboardPage, header, userPage, project}) => {

        await test.step('Updating username and adding description', async () => {
            await header.clickUserNameLink();
            await userPage.clickConfigureMenuOption();
            await userPage.fillUserName(project.userName);
            await userPage.fillUserDescription(project.description);
            await userPage.clickSaveButton();
        });
        await test.step('Verifying the updated username and the description are visible', async () => {
            await expect(userPage.getJobHeadline).toHaveText(project.userName);
            await expect(userPage.getJobHeadline).toBeVisible();
            await expect(userPage.getUserDescription(project.description)).toHaveText(project.description);
            await expect(userPage.getUserDescription(project.description)).toBeVisible();
        });
        await test.step('Setting the username and the description to the default', async () => {
            await userPage.clickConfigureMenuOption();
            await userPage.fillUserName('admin');
            await userPage.clearUserDescription();
            await userPage.clickSaveButton();
        });
    });
});