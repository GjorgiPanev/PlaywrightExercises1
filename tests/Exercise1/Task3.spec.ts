import { test, expect } from '@playwright/test';

test('Verify the number is equal', async ({ page }) => {
  await page.goto('https://computer-database.gatling.io/computers');
  await page.getByPlaceholder('Filter by computer name...').fill('ACE');
  await page.getByRole('button', { name: 'Filter by name' }).click();

  const totalComputer = await page.locator('table tbody tr').count();
  await expect(page.getByText(totalComputer + ' computers found')).toHaveText(totalComputer + ' computers found');
});