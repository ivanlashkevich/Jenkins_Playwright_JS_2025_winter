import DashboardPage from './DashboardPage';

class UserPage extends DashboardPage {

    constructor(page) {
        super(page);
        this.page = page;
        this.getDarkThemeOption = page.locator('label').filter({ hasText: /^Dark$/ });
        this.getDefaultThemeOption = page.locator('label').filter({ hasText: /^Default$/ });
        this.getUserPageBody = page.locator('body');
        this.getUserNameField = page.locator('input[name="_.fullName"]');
        this.getUserDescriptionField = page.locator('textarea[name="_.description"]');
        this.getUserDescription = (description ) => page.getByText(description);
        this.getInsensitiveSearchCheckbox = page.locator('[name="insensitiveSearch"]');
    }

    async clickDarkThemeOption() {
        await this.getDarkThemeOption.click();
    }
    
    async clickDefaultThemeOption() {
        await this.getDefaultThemeOption.click();
    }

    async fillUserName(name) {
        await this.getUserNameField.fill(name);
    }

    async fillUserDescription(description) {
        await this.getUserDescriptionField.fill(description);
    }

    async clearUserDescription() {
        await this.getUserDescriptionField.clear();
    }

    typeUserDescription(userDescription) {
        this.getUserDescriptionFieldFromConfig().type(userDescription)
        return this
    }


}

export default UserPage;