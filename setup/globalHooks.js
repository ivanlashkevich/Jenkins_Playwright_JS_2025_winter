import { test as base } from '@playwright/test';
import AddUserPage from '../pageObjects/AddUserPage';
import BasePage from '../pageObjects/basePage';
import BuildHistoryPage from '../pageObjects/BuildHistoryPage';
import DashboardPage from '../pageObjects/DashboardPage';
import FreestyleProjectPage from '../pageObjects/FreestyleProjectPage';
import PipelinePage from '../pageObjects/PipelinePage';
import SearchResultsPage from '../pageObjects/SearchResultsPage';
import FolderPage from '../pageObjects/FolderPage';
import Header from '../pageObjects/Header';
import LoginPage from '../pageObjects/LoginPage';
import ManageJenkinsPage from '../pageObjects/ManageJenkinsPage';
import MyViewsPage from '../pageObjects/MyViewsPage';
import NewJobPage from '../pageObjects/NewJobPage';
import OrganizationFolderPage from '../pageObjects/OrganizationFolderPage';
import SecurityUsersPage from '../pageObjects/SecurityUsersPage';
import UserPage from '../pageObjects/UserPage';
import { cleanData } from '../support/cleanData';
import { itemName, cyrillicName } from '../fixtures/newItemName';
import genData from '../fixtures/genData';
import { createProject } from '../fixtures/createNewItem';

export const test = base.extend({
   
    // Define a fixture
    addUserPage: async({ page }, use) => {
        const addUserPage = new AddUserPage(page);
        await use(addUserPage);
    },

    basePage: async({ page }, use) => {
        const basePage = new BasePage(page);
        await use(basePage);
    },
    buildHistoryPage: async({ page }, use) => {
        const buildHistoryPage = new BuildHistoryPage(page);
        await use(buildHistoryPage);
    },
    dashboardPage: async({ page }, use) => {
        const dashboardPage = new DashboardPage(page);
        await cleanData();  // Clear the data before each test
        await page.goto('/');  // Navigate to the base URL
        // await new Promise(resolve => setTimeout(resolve, 1000));
        await use(dashboardPage);
    },
    freestyleProjectPage: async({ page }, use) => {
        const freestyleProjectPage = new FreestyleProjectPage(page);
        await use(freestyleProjectPage);
    },

    pipelinePage: async({ page }, use) => {
        const pipelinePage = new PipelinePage(page);
        await use(pipelinePage);
    },

    searchResultsPage: async({ page }, use) => {
        const searchResultsPage = new SearchResultsPage(page);
        await use(searchResultsPage);
    },

    folderPage: async({ page }, use) => {
        const folderPage = new FolderPage(page);
        await use(folderPage);
    },

    header: async({ page }, use) => {
        const header = new Header(page);
        await use(header);
    },

    loginPage: async({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },

    manageJenkinsPage: async({ page }, use) => {
        const manageJenkinsPage = new ManageJenkinsPage(page);
        await use(manageJenkinsPage);
    },

    myViewsPage: async({ page }, use) => {
        const myViewsPage = new MyViewsPage(page);
        await use(myViewsPage);
    },

    newJobPage: async({ page }, use) => {
        const newJobPage = new NewJobPage(page);
        await use(newJobPage);
    },

    organizationFolderPage: async({ page }, use) => {
        const organizationFolderPage = new OrganizationFolderPage(page);
        await use(organizationFolderPage);
    },

    securityUsersPage: async({ page }, use) => {
        const securityUsersPage = new SecurityUsersPage(page);
        await use(securityUsersPage);
    },

    userPage: async({ page }, use) => {
        const userPage = new UserPage(page);
        await use(userPage);
    },

    // Fixtures for data variables
    newItemName: async ({ }, use) => {
        const name = itemName(); // Assuming this function returns the item name
        await use(name);
    },

    randomCyrillicName: async ({ }, use) => {
        const name = cyrillicName(); // Generate a random Cyrillic name
        await use(name);
    },

    project: async ({ }, use) => {
        const project = genData.newProject(); // Assuming this generates a project name
        await use(project);
    },
    newProject: async ({ }, use) => {
        const newProject = genData.newProject(); // Similarly for a new project
        await use(newProject);
    },
    createProject: async ({ page }, use) => {
        await use((projectName, projectType) => createProject(page, projectName, projectType));
    }
});

export { expect } from '@playwright/test';