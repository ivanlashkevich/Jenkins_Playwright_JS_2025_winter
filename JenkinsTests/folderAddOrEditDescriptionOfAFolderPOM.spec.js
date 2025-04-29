import { test, expect } from '../setup/globalHooks';

test.beforeEach(async ({dashboardPage, newJobPage, folderPage, project}) => {
    await test.step('Creating a Folder', async () => {
        await dashboardPage.clickNewItemMenuOption();
        await newJobPage.fillNewItemName(project.folderName);
        await newJobPage.selectFolder();
        await newJobPage.clickOKButton();
        await folderPage.clickSaveButton();
    });
});

test.describe('US_04.004 | Folder > Add or Edit Description of a Folder', () => {

    test('TC_04.004.01 | Verify the possibility to view the Folder description before saving it', async ({folderPage, project}) => {

        await folderPage.clickConfigureMenuOption();
        await folderPage.fillFolderGeneralDescription(project.description);
        
        await expect(folderPage.getFolderGeneralDescriptionField).toHaveValue(project.description);
        await expect(folderPage.getFolderGeneralDescriptionField).toBeVisible();
    });

    test('TC_04.004.02 | Verify the description on the Configure page differs from that on the Folder page', async ({folderPage, project}) => {

        await test.step('Adding descriptions on the Configure page and on the Folder page', async () => {
            await folderPage.clickConfigureMenuOption();
            await folderPage.fillFolderGeneralDescription(project.description);
            await expect(folderPage.getFolderGeneralDescriptionField).toBeVisible();
            await folderPage.clickSaveButton();
            await folderPage.clickAddDescriptionLink();
            await expect(folderPage.getFolderDescriptionField).toBeEmpty();
            await folderPage.fillFolderDescription(project.newDescription);
            await folderPage.clickSaveButton();
        });
        await test.step('Verifying the descriptions on the Configure page and on the Folder page are different', async () => {
            const initialDescription = await folderPage.getFolderGeneralDescription.innerText();
            const newDescription = await folderPage.getFolderDescription(project.newDescription).innerText();
            expect(initialDescription).not.toEqual(newDescription);
            await expect(folderPage.getFolderGeneralDescription).toBeVisible();
            await expect(folderPage.getFolderDescription(project.newDescription)).toBeVisible();
        });
    });

    test('TC_04.004.03 | Verify the Folder description can be edited after saving', async ({folderPage, project}) => {

        await test.step('Adding a description', async () => {
            await folderPage.clickConfigureMenuOption();
            await folderPage.fillFolderGeneralDescription(project.description);
            await folderPage.clickSaveButton();
            await folderPage.clickConfigureMenuOption();
        });
        await test.step('Verifying the Folder description can be edited after saving', async () => {
            await expect(folderPage.getFolderGeneralDescriptionField).toBeEditable();
            await folderPage.fillFolderGeneralDescription(project.newDescription);
            await expect(folderPage.getFolderGeneralDescriptionField).toHaveValue(project.newDescription);
            await expect(folderPage.getFolderGeneralDescriptionField).toBeVisible();
        });
    });

    test('TC_04.004.04 | Verify a long text description is displayed both on the Configure page and on the Folder page', async ({folderPage, project}) => {

        await test.step('Adding a long text description', async () => {
            await folderPage.clickConfigureMenuOption();
            await folderPage.fillFolderGeneralDescription(project.longDescription);
        });
        await test.step('Verifying a long text description is displayed both on the Configure page and on the Folder page', async () =>{
            await expect(folderPage.getFolderGeneralDescriptionField).toHaveValue(project.longDescription);
            await expect(folderPage.getFolderGeneralDescriptionField).toBeVisible();
            await folderPage.clickSaveButton();
            await expect(folderPage.getFolderGeneralDescription).toHaveText(project.longDescription);
            await expect(folderPage.getFolderGeneralDescription).toBeVisible();
        });
    });
});