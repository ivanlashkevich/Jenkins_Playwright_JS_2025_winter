import SecurityUsersPage from './SecurityUsersPage';

class AddUserPage extends SecurityUsersPage {

  constructor(page) {
    super(page);
    this.page = page;
    this.getUserName = page.locator('[name="username"]');
    this.getPassword = page.locator('[name="password1"]');
    this.getConfirmPassword = page.locator('[name="password2"]');
    this.getFullName = page.locator('[name="fullname"]');
    this.getEmail = page.locator('[name="email"]');
    this.getCreateUserButton = page.getByRole('button', { name: 'Create User' });

  }

  async fillUserName(username) {
    await this.getUserName.fill(username);
  }

  async fillPassword(password) {
    await this.getPassword.fill(password);
  }

  async fillConfirmPassword(password) {
    await this.getConfirmPassword.fill(password);
  }

  async fillFullName(username) {
    await this.getFullName.fill(username);
  }

  async fillEmail(email) {
    await this.getEmail.fill(email);
  }

  async clickCreateUserButton() {
    await this.getCreateUserButton.click();
  }

  async createUser(username, password, email) {
    await this.fillUserName(username);
    await this.fillPassword(password);
    await this.fillConfirmPassword(password);
    await this.fillFullName(username);
    await this.fillEmail(email);
    await this.clickCreateUserButton();
  }

}

export default AddUserPage;