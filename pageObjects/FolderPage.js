import BasePage from './basePage';

class FolderPage extends BasePage {

    constructor(page) {
        super(page);
        this.page = page;
        this.getFolderGeneralDescriptionField = page.locator('[name="_.description"]');
        this.getFolderGeneralDescription = page.locator('#view-message');
        this.getFolderDescriptionField = page.locator('textarea[name="description"]');
        this.getFolderDescription = (description) => page.getByText(description);
        this.getAddDescriptionLink = page.getByRole('link', { name: 'Add description' });
        this.getJobTable = page.locator('.jenkins-table');
        this.getJobTitleLink = (name) => page.getByRole('link', { name, exact: true });
        this.getJobTitleLinkFromJobTable = (name) => page.locator(`.jenkins-table__link:has-text("${name}")`);
        this.getCreateJobLink = page.getByRole('link', { name: 'Create a job' });
        this.getThisFolderIsEmptyHeadline = page.getByText('This folder is empty');
        this.getNewNameField = page.locator('input[name="newName"]');
        this.getJobHeadline = page.locator('#main-panel h1');
        this.getMoveHeadline = page.getByRole('heading', { name: 'Move' });
        this.getDisplayNameHelperButton = page.locator('.jenkins-help-button').first();
        this.getHelperButtonTooltipText = page.locator('.tippy-content');
        this.getHelperButtonDescription = page.locator('.help-area').first();
        this.getDisplayNameField = page.locator('input[name="_.displayNameOrNull"]');
        this.getFolderDestination = page.locator('select[name="destination"]');
        this.getDestinationDropdownOptions = page.locator('[name="destination"] option');
        this.getDeleteFolderMenuOption = page.getByRole('link', { name: 'Delete Folder' });
        this.getHealthMetricsButton = page.locator('.jenkins-button.advanced-button');
        this.getAddMetricButton = page.getByRole('button', { name: 'Add metric' });
        this.getChildItemsWithWorstHealthDropdownMenuItem = page.getByRole('button', { name: 'Child item with worst health' });
        this.getAddButton = page.getByRole('button', { name: 'Add', exact: true });
        this.getNameField = page.locator('input[checkdependson="name"]');
        this.getProjectRepositoryField = page.locator('input[name="_.remote"]');
        this.getRecursiveCheckbox = page.locator('input[name="_.recursive"]');
        this.getPropertiesMenuOption = page.getByRole('button', { name: 'Properties' });
        this.getNameFieldArea = page.getByText('Name? You must enter a name.');
        this.getEmptyNameFieldReminder = page.getByText('You must enter a name.');
        this.getRetrievalMethodDropdownMenu = page.locator('div').filter({ hasText: /^Modern SCMLegacy SCM$/ }).getByRole('combobox');
        this.getRepositoryURLFieldArea = page.getByText('Repository URL? Please enter Git repository.');
        this.getEmptyRepositoryURLFieldReminder = page.getByText('Please enter Git repository.');
        this.getCacheFetchedVersionsCheckbox = page.getByText('Cache fetched versions on controller for quick retrieval');
        this.getRefreshTimeInMinutesField = page.locator('[name="_.refreshTimeMinutes"]');
        this.getVersionsToExcludeField = page.locator('[name="_.excludedVersionsStr"]');
        this.getVersionsToIncludeField = page.locator('[name="_.includedVersionsStr"]');
        this.getForceClearCacheCheckbox = page.locator('[name="_.forceDelete"]');

    }

    async fillFolderGeneralDescription(description) {
        await this.getFolderGeneralDescriptionField.fill(description);
    }
    
    async fillFolderDescription(description) {
        await this.getFolderDescriptionField.fill(description);
    }

    async clickAddDescriptionLink() {
        await this.getAddDescriptionLink.click();
    }

    async clickCreateJobLink() {
        await this.getCreateJobLink.click();
    }

    async fillNewName(newName) {
        await this.getNewNameField.fill(newName);
    }

    async hoverDisplayNameHelperButton() {
        await this.getDisplayNameHelperButton.hover();
    }

    async clickDisplayNameHelperButton() {
        await this.getDisplayNameHelperButton.click();
    }

    async fillDisplayName(name) {
        await this.getDisplayNameField.fill(name);
    }

    async selectFolderDestination(name) {
        await this.getFolderDestination.selectOption({ label: `Jenkins » ${name}` });
    }

    async clickFolderDestination() {
        await this.getFolderDestination.click();
    }

    async clickDeleteFolderMenuOption() {
        await this.getDeleteFolderMenuOption.click();
    }

    async clickHealthMetricsButton() {
        await this.getHealthMetricsButton.click();
    }

    async clickAddMetricButton() {
        await this.getAddMetricButton.click();
    }

    async clickChildItemsWithWorstHealthDropdownMenuItem() {
        await this.getChildItemsWithWorstHealthDropdownMenuItem.click();
    }

    async clickAddButton() {
        await this.getAddButton.click();
    }

    async fillNameField(name) {
        await this.getNameField.fill(name);
    }

    async fillProjectRepositoryField(name) {
        await this.getProjectRepositoryField.fill(name);
    }

    async clickPropertiesMenuOption() {
        await this.getPropertiesMenuOption.click();
    }

    async selectLegacySCMDropdownMenuItem() {
        await this.getRetrievalMethodDropdownMenu.selectOption({ label: 'Legacy SCM' });
    }

    async checkCacheFetchedVersionsCheckbox() {
        await this.getCacheFetchedVersionsCheckbox.click();
    }

    async clickJobTitleLink(name) {
        await this.getJobTitleLink(name).click();
    }

}

export default FolderPage;