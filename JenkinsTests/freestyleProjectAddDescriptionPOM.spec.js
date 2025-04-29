import { test, expect } from '../setup/globalHooks';

test.describe('US_01.001 | FreestyleProject > Add description', () => {

    test('TC_01.001.01 | Verify the possibility to add description when creating the project', async ({dashboardPage, newJobPage, freestyleProjectPage, project}) => {
        
        await test.step('Creating a Freestyle project', async () => {
            await dashboardPage.clickCreateJobLink();
            await newJobPage.fillNewItemName(project.name);
            await newJobPage.selectFreestyleProject();
            await newJobPage.clickOKButton();
            await freestyleProjectPage.fillProjectDescription(project.description);
            await freestyleProjectPage.clickSaveButton();
        });
        await test.step('Verify the description was added to the project', async () => {
            await expect(freestyleProjectPage.getProjectDescription).toBeVisible();
            await expect(freestyleProjectPage.getProjectDescription).toHaveText(project.description);
        });
    });

    test('TC_01.001.02 | Verify the possibility to update an existing description', async ({page, dashboardPage, newJobPage, freestyleProjectPage, header, project}) => {

        await test.step('Creating a Freestyle Project and adding a description', async () => {
            await dashboardPage.clickNewItemMenuOption();
            await newJobPage.fillNewItemName(project.name);
            await newJobPage.selectFreestyleProject();
            await newJobPage.clickOKButton();
            await freestyleProjectPage.fillProjectDescription(project.description);
            await freestyleProjectPage.clickSaveButton();
        });
        await test.step('Modifying an existing description', async () => {
            await expect(freestyleProjectPage.getProjectDescription).toHaveText(project.description);
            await freestyleProjectPage.clickEditDescriptionLink();
            await freestyleProjectPage.fillProjectDescription(project.newDescription);
            await freestyleProjectPage.clickSaveButton();
        });
        await test.step('Verifying the existing description', async () => {
            await expect(freestyleProjectPage.getProjectDescription).toHaveText(project.newDescription);
            await expect(freestyleProjectPage.getProjectDescription).toBeVisible();
        });
    });

    test('TC_01.001.03 | Verify the description is updated via "Configure" dropdown option', async ({dashboardPage, newJobPage, freestyleProjectPage, header, project}) => {

        await test.step('Creating a Freestyle Project and adding a description', async () => {
            await dashboardPage.clickNewItemMenuOption();
            await newJobPage.fillNewItemName(project.name);
            await newJobPage.selectFreestyleProject();
            await newJobPage.clickOKButton();
            await freestyleProjectPage.fillProjectDescription(project.description);
            await freestyleProjectPage.clickSaveButton();
            await expect(freestyleProjectPage.getProjectDescription).toHaveText(project.description);
            await header.clickDashhboardBreadcrumbLink();
        });
        await test.step('Updating a description via "Configure" dropdown option', async () => {
            await dashboardPage.hoverJobTitleLink(project.name);
            await dashboardPage.clickJobTableDropdownChevron(project.name);
            await dashboardPage.clickConfigureDropdownMenuItem();
            await freestyleProjectPage.fillProjectDescription(project.newDescription);
            await freestyleProjectPage.clickSaveButton();
        });    
        await test.step('Verifying a description was updated', async () => {
            await expect(freestyleProjectPage.getProjectDescription).toHaveText(project.newDescription);
            await expect(freestyleProjectPage.getProjectDescription).toBeVisible();
        });  
    });
});