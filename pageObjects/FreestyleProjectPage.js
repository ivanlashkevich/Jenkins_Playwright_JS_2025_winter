import BasePage from './basePage';

class FreestyleProjectPage extends BasePage {

    constructor(page) {
        super(page);
        this.page = page;
        this.getProjectDescriptionField = page.locator('textarea[name="description"]');
        this.getProjectDescription = page.locator('#description');
        this.getEditDescriptionLink = page.getByRole('link', { name: 'Edit description' });
        this.getNewNameField = page.locator('input[name="newName"]');
        this.getSameNameWarningMessage = page.locator('div.warning');
        this.getProjectDestination = page.locator('select[name="destination"]');
        this.getDeleteProjectMenuOption = page.getByRole('link', { name: 'Delete Project' });
        this.getDeletionConfirmationDialogue = page.locator('.jenkins-dialog');
        this.getDeletionConfirmationTitle = page.locator('.jenkins-dialog__title');
        this.getDeletionConfirmationQuestion = page.locator('.jenkins-dialog__contents');
    }

    async fillProjectDescription(description) {
        await this.getProjectDescriptionField.fill(description);
    }

    async clickEditDescriptionLink() {
        await this.getEditDescriptionLink.click()
    }

    async fillNewName(newName) {
        await this.getNewNameField.fill(newName);
    }

    async selectroProjectDestination(name) {
        await this.getProjectDestination.selectOption({ label: `Jenkins » ${name}` });
    }

    async clickDeleteProjectMenuOption() {
        await this.getDeleteProjectMenuOption.click();
    }

}

export default FreestyleProjectPage;