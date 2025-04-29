import Header from './Header';

class BasePage extends Header {

    constructor(page) {
        super(page);
        this.page = page;
        this.getNewItemMenuOption = page.getByRole('link', { name: 'New Item' });
        this.getManageJenkinsMenuOption = page.getByRole('link', { name: 'Manage Jenkins' });
        this.getConfigureMenuOption = page.getByRole('link', { name: /^Configure$/, exact: true })
        this.getRenameMenuOption = page.locator('a[href*="rename"]');
        this.getMoveMenuOption = page.locator('[href$="move"]');
        this.getOKButton = page.getByRole('button', { name: /OK/ });
        this.getSaveButton = page.getByRole('button', { name: /Save/ });
        this.getCancelButton = page.getByRole('button', { name: 'Cancel' });
        this.getYesButton = page.getByRole('button', { name: /Yes/ });
        this.getBreadcrumbsItemTitle = page.locator('.model-link').nth(2);
        this.getRenameButton = page.getByRole('button', { name: 'Rename' });
        this.getMoveButton = page.getByRole('button', { name: 'Move' });
        this.getMainPanel = page.locator('#main-panel');
        this.getJobHeadline = page.locator('#main-panel h1');
        this.getItemTitle = (name) => page.getByRole('heading', { name, exact: true });
        this.getBuildHistoryMenuOption = page.getByRole('link', { name: 'Build History' });
        this.getBuildNowMenuOption = page.getByRole('link', { name: 'Build Now' });
        this.getBuildScheduledTooltipText = page.locator('.tippy-content').getByText('Build scheduled');
        this.getFrameBuildNumber = page.locator('#buildHistory .build-link.display-name').first();
    }

    async clickNewItemMenuOption() {
        await this.getNewItemMenuOption.click();
    }

    async clickManageJenkinsMenuOption() {
        await this.getManageJenkinsMenuOption.click();
    }

    async clickConfigureMenuOption() {
        await this.getConfigureMenuOption.click();
    }
    
    async clickRenameMenuOption() {
        await this.getRenameMenuOption.click();
    }

    async clickMoveMenuOption() {
        await this.getMoveMenuOption.click();
    }

    async clickOKButton() {
        await this.getOKButton.click();
    }    

    async clickSaveButton() {
        await this.getSaveButton.click();
    }

    async clickCancelButton() {
        await this.getCancelButton.click();
    }

    async clickYesButton() {
        await this.getYesButton.click();
    }

    async clickRenameButton() {
        await this.getRenameButton.click();
    }

    async clickMoveButton() {
        await this.getMoveButton.click();
    }

    async clickBuildHistoryMenuOption() {
        await this.getBuildHistoryMenuOption.click();
    }

    async clickBuildNowMenuOption() {
        await this.getBuildNowMenuOption.click();
    }

}

export default BasePage;