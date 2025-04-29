class Header {
    
    constructor(page) {
        this.page = page;
        this.getJenkinsLogo = page.getByRole('link', { name: '[Jenkins]Jenkins' });
        this.getDashboardBreadcrumbLink = page.getByRole('link', { name: 'Dashboard' });
        this.getDashboardBreadcrumbChevron = page.getByLabel('breadcrumb').getByRole('button');
        this.getNewItemDropdownOption = page.locator('.jenkins-dropdown__item[href$="newJob"]');
        this.getBreadcrumbsProjectLink = (name) => page.getByRole('link', { name, exact: true });
        this.getBreadcrumbFolderName = page.locator(':nth-child(3) > .model-link');
        this.getBreadcrumbBar = page.locator('#breadcrumbBar');
        this.getRenameDropdownMenuItem = page.locator('.jenkins-dropdown__item:nth-child(5)');
        this.getDeleteOrganizationFolderDropdownMenuItem = page.getByRole('button', { name: 'Delete Organization Folder' });
        this.getBreadcrumbsProjectChevron = (name) => page.getByRole('link', { name }).getByRole('button');
        this.getUserNameLink = page.locator('[href*="user"]');
        this.getUserName = (name) => page.getByRole('link', { name, exact: true });
        this.getSearchField = page.locator('#search-box');
        this.getSearchAutoCompletionBox = page.locator('#search-box-completion li');
        this.getSearchQuery = (name) => page.locator('#search-box-completion li').getByText(name);
        this.getUserNameChevron = page.locator('#page-header .jenkins-menu-dropdown-chevron');
        this.getConfigureDropdownMenuItem = page.getByRole('link', { name: 'Configure' }).last();
        this.getLogOutLink = page.getByRole('link', { name: 'log out' });
    }

    async clickJenkinsLogo() {
        await this.getJenkinsLogo.click();
    }

    async hoverDashboardBreadcrumbLink() {
        await this.getDashboardBreadcrumbLink.hover()
    }

    async clickDashhboardBreadcrumbChevron() {
        await this.getDashboardBreadcrumbChevron.click();
    }

    async clickNewItemDropdownOption() {
        await this.getNewItemDropdownOption.click();
    }

    async clickDashhboardBreadcrumbLink() {
        await this.getDashboardBreadcrumbLink.click();
    }

    async pressBreadcrumbFolderName() {
        await this.getBreadcrumbFolderName.press('Enter');
    }

    async clickRenameDropdownMenuItem() {
        await this.getRenameDropdownMenuItem.click();
    }

    async clickDeleteOrganizationFolderDropdownMenuItem() {
        await this.getDeleteOrganizationFolderDropdownMenuItem.click();
    }

    async hoverBreadcrumbsProjectLink(name) {
        await this.getBreadcrumbsProjectLink(name).hover();
    }

    async clickBreadcrumbsProjectChevron(name) {
        await this.getBreadcrumbsProjectChevron(name).click();
    }

    async clickUserNameLink() {
        await this.getUserNameLink.click();
    }

    async typeSearchQuery(name) {
        await this.getSearchField.type(name);
    }

    async selectSearchQuery(name) {
        await this.getSearchQuery(name).click();
    }

    async pressSearchBox() {
        await this.getSearchField.press('Enter');
    }

    async clickUsernameChevron() {
        await this.getUserNameChevron.click({force: true});
    }

    async clickConfigureDropdownMenuItem() {
        await this.getConfigureDropdownMenuItem.click();
    }

    async clearSearchField() {
        await this.getSearchField.click();
        await this.page.keyboard.press('Control+A');
        await this.page.keyboard.press('Backspace');
    }

    async clickLogOutLink() {
        await this.getLogOutLink.click();
    }
}

export default Header;