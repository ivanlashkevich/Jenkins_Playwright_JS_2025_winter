import DashboardPage from './DashboardPage';

class ManageJenkinsPage extends DashboardPage {

    constructor(page) {
        super(page);
        this.page = page;
        this.getAppearanceLink = page.locator('[href="appearance"]');
        this.getDarkThemeOption = page.locator('label').filter({ hasText: /^Dark$/ });
        this.getDarkSystemThemeOption = page.locator('label').filter({ hasText: 'Dark (System)' });
        this.getDefaultThemeOption = page.locator('label').filter({ hasText: /^Default$/ });
        this.getThemeSection = page.locator('.jenkins-form-item').first();
        this.getSearchSettingsField = page.getByRole('searchbox', { name: 'Search settings' });
        this.getSearchSettingsResults = page.locator('.jenkins-search__results a');
        this.getPageHeadline = page.locator('h1');
        this.getPageHeading = (name) => page.getByRole('heading', { name });
        this.getSearchSettingsResultsArea = page.locator('.jenkins-search__results');
        this.getNoResultsMessage = page.getByText('No results');
        this.getSearchSettingsXButton = page.locator('.jenkins-search__shortcut');
        this.getUsersSectionLink = page.getByRole('link', { name: 'Create/delete/modify users' });
        this.getAdminPermissionError = page.locator('.error');
    }

    async clickAppearanceLink() {
        await this.getAppearanceLink.click();
    }

    async clearSearchSettingsField() {
        await this.getSearchSettingsField.clear();
    }

    async typeSearchSettingsQuery(name) {
        await this.getSearchSettingsField.type(name);
    }

    async focusSearchSettingsField() {
        await this.getSearchSettingsField.focus();
    }

    async clickSearchSettingsXButton() {
        await this.getSearchSettingsXButton.click({ force: true });
    }

    async clickUsersSectionLink() {
        await this.getUsersSectionLink.click();
    }

    
}

export default ManageJenkinsPage;