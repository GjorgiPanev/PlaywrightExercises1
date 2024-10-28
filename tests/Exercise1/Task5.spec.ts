import { test, expect } from '@playwright/test';
import * as fs from 'fs';
const data = JSON.parse(fs.readFileSync('../Playwrightexercises1/tests/fixtures/data/addcomputer.json',"utf-8"));

test.describe('Test Suite for the first Exercise', () => {

    test.beforeEach('Navigate to Login Page', async({ page })=>{
        await page.goto('/');
    })

    test('Verify the page title', async ({ page }) => {
        await expect(page.getByRole('banner')).toHaveText('Computer database');
    });

    test('Add new computer and verify that the computer is added', async ({ page }) => {
        await page.getByRole('link', { name: 'Add a new computer' }).click();
        await page.getByLabel('Computer name').fill('HP2024');
        await page.getByLabel('Introduced').fill('2024-10-05');
        await page.getByLabel('Discontinued').fill('2024-10-15');
        await page.getByLabel('Company').selectOption('4');
        await page.getByRole('button', { name: 'Create this computer' }).click();
        await expect(page.locator('#main')).toContainText('Done ! Computer HP2024 has been created');// to have text
    });

    test('Verify the number is equal', async ({ page }) => {
        await page.getByPlaceholder('Filter by computer name...').fill('ACE');
        await page.getByRole('button', { name: 'Filter by name' }).click();
      
        const totalComputer = await page.locator('table tbody tr').count();
        await expect(page.getByText(totalComputer + ' computers found')).toHaveText(totalComputer + ' computers found');
    });

    data.forEach((user) => {

        test(`test1 ${user.computername} ${user.introduced} ${user.discountinued} ${user.company}`, async ({ page }) => {
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
});

