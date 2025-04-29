import Header from "./Header";

class SearchResultsPage extends Header {

    constructor(page) {
        super(page);
        this.page = page;
        this.getNoMatchesErrorMessage = page.locator('.error').getByText('Nothing seems to match.');
        this.getSearchResults = page.locator('#main-panel ol li a');
        this.getResultLocator = (resultText) => page.locator(`#main-panel ol li a`).getByText(resultText, { exact: true });
    }

    async retrieveDisplayedResults() {
        return await this.getSearchResults.evaluateAll(items =>
            items.map(item => item.textContent.trim())
        );
    }


};

export default SearchResultsPage;