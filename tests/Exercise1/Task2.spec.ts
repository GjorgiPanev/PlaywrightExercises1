import { test, expect } from '@playwright/test';

test('Add new computer and verify that the computer is added', async ({ page }) => {
  await page.goto('https://computer-database.gatling.io/computers');
  await page.getByRole('link', { name: 'Add a new computer' }).click();
  await page.getByLabel('Computer name').fill('HP2024');
  await page.getByLabel('Introduced').fill('2024-10-05');
  await page.getByLabel('Discontinued').fill('2024-10-15');
  await page.getByLabel('Company').selectOption('4');
  await page.getByRole('button', { name: 'Create this computer' }).click();
  await expect(page.locator('#main')).toContainText('Done ! Computer HP2024 has been created');// to have text
});