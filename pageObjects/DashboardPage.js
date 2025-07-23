import BasePage from './basePage';

class DashboardPage extends BasePage {
    
    constructor(page) {
        super(page);
        this.page = page;
        this.getCreateJobLink = page.getByRole('link', { name: 'Create a job' });
        this.getJobTable = page.locator('.jenkins-table');
        this.getWelcomeToJenkinsHeadline = page.getByRole('heading', { name: 'Welcome to Jenkins!' });
        this.getItemLink = page.locator('.jenkins-table__link');
        this.getJobTitleLink = (name) => page.getByRole('link', { name, exact: true });
        this.getJobTitleLinkFromJobTable = (name) => page.locator(`.jenkins-table__link:has-text("${name}")`);
        this.getJobTableDropdownChevron = page.locator('.jenkins-table__link > .jenkins-menu-dropdown-chevron');
        this.getJobTableDropdownChevron = (name) => page.getByRole('link', { name, exact: true }).getByRole('button');
        this.getConfigureDropdownMenuItem = page.getByRole('link', { name: 'Configure' });
        this.getRenameDropdownMenuItem = page.locator('.jenkins-dropdown__item:nth-child(6)');
        this.getMoveDropdownMenuItem = page.locator('a[href$="move"]');
        this.getDeleteProjectDropdownMenuItem = page.getByRole('button', { name: 'Delete Project' });
        this.getDeleteOrganizationFolderDropdownMenuItem = page.getByRole('button', { name: 'Delete Organization Folder' });
        this.getNotBuiltIcons = page.locator('tr[id*="job_"] svg[tooltip="Not built"]');
        this.getScheduleBuildForItem = (name) => page.getByRole('link', { name: `Schedule a Build for ${name}` });
        this.getViewTab = page.locator('.tabBar');
    }

    async clickCreateJobLink() {
        await this.getCreateJobLink.click();
    }

    async clickJobTitleLink(name) {
        await this.getJobTitleLink(name).click();
    }

    async pressJobTitleLink(name) {
        await this.getJobTitleLink(name).press('Enter');
    }

    async hoverJobTitleLink(name) {
        await this.getJobTitleLinkFromJobTable(name).hover();
    }

    async clickJobTableDropdownChevron(name) {
        await this.getJobTableDropdownChevron(name).click();
    }

    async clickConfigureDropdownMenuItem() {
        await this.getConfigureDropdownMenuItem.click();
    }

    async clickRenameDropdownMenuItem() {
        await this.getRenameDropdownMenuItem.click();
    }

    async clickMoveDropdownMenuItem() {
        await this.getMoveDropdownMenuItem.click();
    }

    async clickDeleteProjectDropdownMenuItem() {
        await this.getDeleteProjectDropdownMenuItem.click();
    }

    async clickDeleteOrganizationFolderDropdownMenuItem() {
        await this.getDeleteOrganizationFolderDropdownMenuItem.click();
    }

    async clicktScheduleBuildForItem(name) {
        await this.getScheduleBuildForItem(name).click();
    }

}

export default DashboardPage;