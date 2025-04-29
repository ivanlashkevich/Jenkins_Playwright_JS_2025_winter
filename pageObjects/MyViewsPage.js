import DashboardPage from "../pageObjects/DashboardPage";

class MyViewsPage extends DashboardPage {

  constructor(page) {
    super(page);
    this.page = page;
    this.getAddNewViewLink = page.getByRole('link', { name: 'New View' });
    this.getViewNameField = page.locator('#name');
    this.getListViewRadio = page.locator('[for="hudson.model.ListView"]');
    this.getCreateButton = page.getByRole('button', { name: /Create/ });
    this.getJobCheckbox = (name) => page.locator('.listview-jobs .jenkins-checkbox').getByText(name);
    this.getDeleteStatusColumnButton = page.locator('[descriptorid="hudson.views.StatusColumn"] button[title="Delete"]');
    this.getAddColumnButton = page.getByRole('button', { name: /Add column/ });
    this.getProjectDescriptionColumnDropdownOption = page.getByRole('button', { name: 'Project description' });
    this.getColumnDropdownOption = (columnName) => page.getByRole('button', {name: columnName});
    this.getEditViewMenuOption = page.getByRole('link', { name: 'Edit View' });
    this.getStatusColumn = page.locator('[descriptorid="hudson.views.StatusColumn"]');
    this.getProjectDescriptionColumn = page.locator('[descriptorid="jenkins.branch.DescriptionColumn"]').first();
    this.getDeleteButton = page.locator('button[title="Delete"]');
    this.getNameColumnJobTableLink = page.getByRole('link', { name: 'Name' });
    this.getColumnName = (column) => page.getByRole('columnheader', { name: column, exact: true });
  }

  async clickAddNewViewLink() {
    await this.getAddNewViewLink.click();
  }

  async fillViewName(name) {
    await this.getViewNameField.fill(name);
  }

  async checkListViewRadio() {
    await this.getListViewRadio.check();
  }

  async clickCreateButton() {
    await this.getCreateButton.click();
  }

  async clickJobCheckbox(name) {
    await this.getJobCheckbox(name).click();
  }

  async clickDeleteStatusColumnButton() {
    await this.getDeleteStatusColumnButton.click();
  }

  async clickAddColumnButton() {
    await this.getAddColumnButton.click();
  }

  async selectColumnDropdownOption(columnName) {
    await this.getColumnDropdownOption(columnName).first().click();
  }

  async clickEditViewMenuOption() {
    await this.getEditViewMenuOption.click();
  }

  async clickFirstColumnDeleteButton() {
    await this.getDeleteButton.first().click();
  }

}

export default MyViewsPage;