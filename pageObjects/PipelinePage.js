import BasePage from "./basePage";

class PipelinePage extends BasePage {

    constructor(page) {
        super(page);
        this.page = page;
        this.getPipelineDescriptionField = page.locator('textarea[name="description"]');
        this.getPipelineDescription = page.locator('#description');
        this.getEnabledProjectToggle = page.getByText('DisabledEnabled');
        this.getDisabledProjectStatus = page.getByText('Disabled');
        this.getEnabledProjectStatus = page.getByText('Enabled');
        this.getDisabledProjectWarning = page.locator('#enable-project');
        this.getEnableButton = page.getByRole('button', { name: /Enable/ });
        this.getPipelineMenuOption = page.getByRole('button', { name: 'Pipeline' });
        this.getDefinitionDropdownMenu = page.locator('div').filter({ hasText: /^Pipeline scriptPipeline script from SCM$/ }).getByRole('combobox');
        this.getScriptDropdownMenu = page.locator('.samples > select');
        this.getSCMDropdownMenu = page.locator('div').filter({ hasText: /^NoneGit$/ }).getByRole('combobox');
        this.getRepositoryURLField = page.locator('input[name="_.url"]').first();
        this.getFolderDestination = page.locator('select[name="destination"]');
        this.getDestinationDropdownOptions = page.locator('[name="destination"] option');
    }

    async fillDescriptionField(description) {
        await this.getPipelineDescriptionField.fill(description);
    }

    async uncheckEnabledProjectToggle() {
        await this.getEnabledProjectToggle.uncheck();
    }

    async clickEnableButton() {
        await this.getEnableButton.click();
    }

    async clickPipelineMenuOption() {
        await this.getPipelineMenuOption.click();
    }

    async selectPipelineScriptDropdownMenuItem() {
        await this.getDefinitionDropdownMenu.selectOption({ label: 'Pipeline script' });
    }

    async selectPipelineScriptFromSCMDropdownMenuItem() {
        await this.getDefinitionDropdownMenu.selectOption({ label: 'Pipeline script from SCM' });
    }

    async selectScriptedPipelineDropdownMenuItem() {
        await this.getScriptDropdownMenu.selectOption( { label: 'Scripted Pipeline'});
    }

    async selectGitDropdownMenuItem() {
        await this.getSCMDropdownMenu.selectOption({ label: 'Git' });
    }

    async fillRepositoryURLField(url) {
        await this.getRepositoryURLField.fill(url);
    }

    async clickFolderDestination() {
        await this.getFolderDestination.click();
    }

    async selectFolderDestination(name) {
        await this.getFolderDestination.selectOption({ label: `Jenkins » ${name}` });
    }
    

}

export default PipelinePage;