import ManageJenkinsPage from "./ManageJenkinsPage";

class SecurityUsersPage extends ManageJenkinsPage {

  constructor(page) {
    super(page);
    this.page = page;
    this.getCreateUserLink = page.getByRole('link', { name: 'Create User' });
    this.getDeleteUserLink = (name) => page.getByRole('row', { name }).getByRole('link').nth(2);
    this.getUsersTable = page.locator('#people');
    this.getUserNameLink = (name) => page.locator('#people').getByRole('link', { name });
  }

  async clickCreateUserLink() {
    await this.getCreateUserLink.click();
  }

  async clickDeleteUserLink(name) {
    await this.getDeleteUserLink(name).click();
  }


};

export default SecurityUsersPage;