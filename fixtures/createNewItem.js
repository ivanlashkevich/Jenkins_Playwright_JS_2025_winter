import { test } from '@playwright/test';

async function createProject(page, projectName, projectType) {
    await test.step(`Creating a ${projectType}`, async () => {
        await page.getByRole('link', { name: 'New Item' }).click();
        await page.locator('input[name="name"]').fill(projectName);
        if (projectType === "Freestyle project") {
            await page.locator('.hudson_model_FreeStyleProject').click();
        } else if (projectType === "Pipeline") {
            await page.getByRole('radio', { name: 'Pipeline Orchestrates' }).click();
        } else if (projectType === "Folder") {
            await page.locator('.com_cloudbees_hudson_plugins_folder_Folder').click();
        }
        await page.getByRole('button', { name: /OK/ }).click();
        await page.getByRole('button', { name: 'Save' }).click();
        await page.locator('#jenkins-home-link').click();
    });
}

export { createProject };