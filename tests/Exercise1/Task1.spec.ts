import { test, expect } from '@playwright/test';

test('Verify the page title', async ({ page }) => {
  await page.goto('https://computer-database.gatling.io/computers');
  await expect(page.getByRole('banner')).toContainText('Computer database');// to have titlle
});