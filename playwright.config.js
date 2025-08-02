// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  globalSetup: "./setup/global-setup",
  // testDir: './tests',

  /* Run tests in files in parallel */
  // fullyParallel: true,
  fullyParallel: false,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  // retries: process.env.CI ? 2 : 0,
  // retries: 2,

  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 1,
  // workers: 1,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html', 
  // reporter: 'allure-playwright',
  // reporter: [['html', { open: 'always' }]], //always, never and on-failure (default).
  // reporter: [['html', { outputFolder: 'my-report' }]], // report is written into the playwright-report folder in the current working directory. override it using the PLAYWRIGHT_HTML_REPORT
  // reporter: 'dot',
  // reporter: 'list',
  /**
    reporter: [
      ['list'],
      ['json', {  outputFile: 'test-results.json' }]
    ],
  */
  /**
   * custom reports: https://playwright.dev/docs/test-reporters#custom-reporters 
  */
  
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:8080',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    storageState: "./LoginAuthCQ.json",
    screenshot: 'only-on-failure',
    // headless: false,
    // ignoreHTTPSErrors: true,
    // viewport: { width: 1280, height: 720 },
    // video: 'on-first-retry',
  },
    timeout: 15000, //https://playwright.dev/docs/test-timeouts

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  // outputDir: 'test-results/',

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        // viewport: { width: 1280, height: 720 },
      },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});