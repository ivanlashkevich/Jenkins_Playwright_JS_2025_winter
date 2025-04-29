import BasePage from "./basePage";

class BuildHistoryPage extends BasePage {
    
    constructor(page) {
        super(page);
        this.page = page;
        this.getBuildNumber = (name) => page.locator(`[href="/job/${name}/"] + .jenkins-table__badge`);
        this.getBuildNumbers = page.locator('.jenkins-table__badge');
    }

    
}

export default BuildHistoryPage;