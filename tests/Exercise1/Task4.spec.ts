import { test, expect } from '@playwright/test';
import * as fs from 'fs';
const data = JSON.parse(fs.readFileSync('../PlaywrightExercises1/tests/fixtures/data/addcomputer.json',"utf-8"));


data.forEach((user) => {

    test(`test1 ${user.computername} ${user.introduced} ${user.discountinued} ${user.company}`, async ({ page }) => {
        await page.goto('https://computer-database.gatling.io/computers');
        await page.getByRole('link', { name: 'Add a new computer' }).click();
        await page.getByLabel('Computer name').fill(user.computername);
        await page.getByLabel('Introduced').fill(user.introduced);
        await page.getByLabel('Discontinued').fill(user.discountinued);
        await page.getByLabel('Company').selectOption(user.company);
        await page.getByRole('button', { name: 'Create this computer' }).click();
        await expect(page.locator('[class="alert-message warning"]')).toContainText('Done ! Computer '+ user.computername +' has been created');
        //await expect(page.getByText('Done ! Computer '+ user.computername +' has been created')).toBeVisible();
    });
});