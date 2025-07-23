import BasePage from './basePage';

class NewJobPage extends BasePage {

    constructor(page) {
        super(page);
        this.page = page;
        this.getItemNameField = page.getByRole('textbox', { name: 'Enter an item name' });
        this.getFreeStyleProjectType = page.getByRole('radio', { name: 'Freestyle project' });
        this.getPipelineProjectType = page.getByRole('radio', { name: 'Pipeline' }).first();
        this.getFolderType = page.locator('.com_cloudbees_hudson_plugins_folder_Folder');
        this.getOrganizationFolderType = page.getByRole('radio', { name: 'Organization Folder' });
        this.getItemNameInvalidErrorMessage = page.locator('.input-validation-message:has-text("» A job already exists with the name")');
        this.getUnsafeCharacterErrorMessage = page.locator('#itemname-invalid:has-text("is an unsafe character")');
        this.getCopyFromField = page.getByPlaceholder('Type to autocomplete');
        this.getItemNameFromCopyField = (name) => page.getByRole('listitem').getByText(name);

    }
        
    async fillNewItemName(name) {
        await this.getItemNameField.fill(name);
    }

    async clearItemNameField() {
        await this.getItemNameField.clear();
    }

    async selectFreestyleProject() {
        await this.getFreeStyleProjectType.click();
    }

    async selectPipelineProject() {
        await this.getPipelineProjectType.click();
    }

    async selectFolder() {
        await this.getFolderType.click();
    }

    async selectOrganizationFolder() {
        await this.getOrganizationFolderType.click();
    }

    async fillCopyFromField(name) {
        await this.getCopyFromField.type(name);
    }

    async selectItemNameFromCopyField(name) {
        await this.getItemNameFromCopyField(name).click();
    }
    
};

export default NewJobPage;