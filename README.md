<h1 align="center">Project Jenkins Playwright JS 2025 Winter</h1>

<p align="center">
  <img src="media/jenkins.svg" alt="Jenkins logo" width="100"/>
</p>

Jenkins_Playwright_JS_2025_winter is a personal automation project using Playwright with JavaScript. 
It contains 166 automated tests (organized into 83 POM and 83 non-POM tests) focused on automating the Jenkins user interface.
Jenkins is an automation tool designed for Continuous Integration (CI) and Continuous Deployment (CD). It allows automatic execution of build, testing, and deployment processes whenever code changes are made in the repository.

<br/>

## 📑 Table of Contents

- [📚 Documentation](#-documentation)
  - [Prerequisites](#prerequisites)
  - [🚀 How to run the project](#-how-to-run-the-project)
  - [📖 How to generate Allure report](#-how-to-generate-allure-report)
  - [🧩 Spec structure:](#-spec-structure)
  - [🎲 Faker library](#-faker-library)
  - [🛠️ Features](#️-features)

<br/>

## 📚 Documentation

### Prerequisites

- Chrome browser
- Node.js version 18 or higher → [Download Node.js](https://nodejs.org/en/download)
- NPM
- VSCode
- Jenkins version 2.462.3 → [Download Jenkins 2.462.3](https://github.com/jenkinsci/jenkins/releases/tag/jenkins-2.462.3)

### 🚀 How to run the project

1. Clone the repository to your local folder, e.g., C:\Playwright_Project
2. Open VSCode and navigate to the project folder Jenkins_Playwright_JS_2025_winter
3. Run the command `npm ci` in the VSCode terminal to install all dependencies exactly as specified in `package-lock.json`.
4. Copy the file `.env.example` to the project root and rename it to `.env`. Insert your real credentials into the `.env` file.
5. Run tests using Playwright's test runner:
  - For POM tests:
  ```bash
  npx playwright test JenkinsTests
  ```
  - For non-POM tests:
  ```bash
  npx playwright test oldTests
  ```

Note: Global cleanup is executed before each test.

### 📖 How to generate Allure report

You can manually generate a detailed visual Allure report after running tests.

1. Run tests with Allure reporter enabled:
   - To run all POM tests:
     ```bash
     npm run test:jenkins:allure
     ```
   - To run all non-POM tests:
     ```bash
     npm run test:old:allure
     ```
   - To run a specific spec file:
     ```bash
     npx playwright test JenkinsTests/newItemCreateNewItemPOM.spec.js --reporter=html,allure-playwright
     ```
2. Generate and open the Allure report:
   ```bash
   npm run report:allure
   ```
3. Clean up the Allure test results:
    ```bash
    npm run clean:allure
    ```
> ℹ️ **Note:** Allure report generation is local only and not integrated into CI/CD pipelines.
> The Allure visual report will open automatically in your browser.

### 🧩 Spec structure:

-   Each block `test.describe` is named as a user story
-   Each test `test` is named as a test case

example:
```
test.describe('US_00.000 | New Item > Create New item', () => {

    test('TC_00.000.01 | Verify a New Item is created using the "Create a job" button', async ({page}) => {
        ...
    })
})
```

### 🎲 Faker library

The project utilizes `Faker.js` library for generating random test data. You can find more information here: [Faker.js Documentation](https://v6.fakerjs.dev/guide/)
Import it like this:
`import { faker } from '@faker-js/faker';`

### 🛠️ Features

- Full Jenkins UI test automation
- Organized tests using both Page Object Model (POM) and non-POM approaches
- Randomized data generation using Faker
- Structured, readable test cases
- Global authentication implemented (via global setup) for all tests
- Global cleanup executed before each test
- Extended fixture approach integrated for improved test scalability
- 📊 Local Allure report integration for detailed test reporting (optional, generated manually)