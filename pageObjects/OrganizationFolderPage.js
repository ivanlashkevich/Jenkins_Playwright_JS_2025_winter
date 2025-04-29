import BasePage from "./basePage";

class OrganizationFolderPage extends BasePage {

    constructor(page) {
        super(page);
        this.page = page;
        this.getAppearanceButton = page.getByRole('button', { name: 'Appearance' });
        this.getDefaultIconDropdownMenuItem = page.locator('section').filter({ hasText: 'Default Icon' }).getByRole('combobox');
        this.getFolderIcon = page.locator('[tooltip="Folder"][title="Folder"]');
        this.getRepositorySourcesAddButton = page.locator('div').filter({ hasText: /^Repository SourcesAdd$/ }).getByRole('button');
        this.getSingleRepositoryDropdownMenuItem = page.getByRole('button', { name: 'Single repository' });
        this.getRepositoryNameField = page.locator('input[name="_\\.name"]').first();
        this.getSourcesAddButton = page.locator('div').filter({ hasText: /^SourcesAdd$/ }).getByRole('button');
        this.getSingleRepositoryAndBranchDropdownMenuItem = page.getByRole('button', { name: 'Single repository & branch' });
        this.getSingleBranchNameField = page.locator('input[name="_\\.name"]').nth(1);
        this.getRepositoryURLField = page.locator('[name="_.url"]').first();
        this.getSuccessIcon = page.locator('[tooltip="Success"][title="Success"]');
        this.getScanOrganizationFolderLog = page.locator('pre');
        this.getAddPropertyButton = page.getByRole('button', { name: 'Add property' });
        this.getUntrustedDropdownMenuItem = page.getByRole('button', { name: 'Untrusted' });
        this.getPublisherWhiteListItem = page.locator('.setting-main input[name="publisherWhitelist"] + label.attach-previous');
        this.getDeleteOrganizationFolderMenuOption = page.getByRole('link', { name: 'Delete Organization Folder' });
        this.getDeletionConfirmationDialogue = page.locator('.jenkins-dialog');
        this.getDeletionConfirmationTitle = page.locator('.jenkins-dialog__title');
        this.getDeletionConfirmationQuestion = page.locator('.jenkins-dialog__contents');
    }

    async clickAppearanceButton() {
        await this.getAppearanceButton.click();
    }
    
    async selectDefaultIconDropdownMenuItem() {
        await this.getDefaultIconDropdownMenuItem.selectOption({ label: 'Default Icon'});
    }

    async clickRepositorySourcesAddButton() {
        await this.getRepositorySourcesAddButton.click();
    }

    async clickSingleRepositoryDropdownMenuItem() {
        await this.getSingleRepositoryDropdownMenuItem.click();
    }

    async fillRepositoryNameField(name) {
        await this.getRepositoryNameField.fill(name);
    }

    async clickSourcesAddButton() {
        await this.getSourcesAddButton.click();
    }

    async clickSingleRepositoryAndBranchDropdownMenuItem() {
        await this.getSingleRepositoryAndBranchDropdownMenuItem.click();
    }

    async fillSingleBranchNameField(name) {
        await this.getSingleBranchNameField.fill(name);
    }

    async fillRepositoryURLField(url) {
        await this.getRepositoryURLField.fill(url);
    }

    async clickAddPropertyButton() {
        await this.getAddPropertyButton.click();
    }

    async clickUntrustedDropdownMenuItem() {
        await this.getUntrustedDropdownMenuItem.click();
    }

    async retrievePublisherWhiteListItems() {
        return await this.getPublisherWhiteListItem.evaluateAll(labels =>
            labels.map(label => label.textContent.trim())
        );
    }

    async clickDeleteOrganizationFolderMenuOption() {
        await this.getDeleteOrganizationFolderMenuOption.click();
    }

}

export default OrganizationFolderPage;