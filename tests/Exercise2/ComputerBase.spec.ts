import { test, expect } from '@playwright/test';
import { Computer } from '../Exercise2/computer-base.page';
import * as fs from 'fs';
const data = JSON.parse(fs.readFileSync('../Playwrightexercises1/tests/fixtures/data/addcomputer.json',"utf-8"));
const data2 = JSON.parse(fs.readFileSync('../Playwrightexercises1/tests/fixtures/data/addcomputer2.json',"utf-8"));
const data3 = JSON.parse(fs.readFileSync('../Playwrightexercises1/tests/fixtures/data/search.json',"utf-8"));

test.describe('Test Suite for the second Exercise', () => {
    

    test.beforeEach('Go to the page', async({ page })=>{
        const computerPage = new Computer(page);
        await computerPage.goto();
    });

    test('Verify the Page title', async ({ page }) => {
        const computerPage = new Computer(page);
        await computerPage.VerifyTheTitle(data3.title);
    });

    test('Add New computer and Verify that the computer is added', async ({ page }) => {
        const computerPage = new Computer(page);
        await computerPage.CreateComputer2(data2.computername, data2.introduced, data2.discountinued, data2.company);
        await expect(computerPage.verifyComputer).toContainText('Done ! Computer '+ data2.computername +' has been created');
    });

    test('Verify the number is Equal', async ({ page }) => {
        const computerPage = new Computer(page);
        await computerPage.SearchFill(data3.searchfield);
        await computerPage.SearchButton();
      
        const totalComputer = await computerPage.SearchResults();
        await expect(page.getByText(totalComputer + ' computers found')).toHaveText(totalComputer + ' computers found');
    });

    data.forEach((user) => {

        test(`test ${user.computername} ${user.introduced} ${user.discountinued} ${user.company}`, async ({ page }) => {
            const computerPage = new Computer(page);
            await computerPage.AddNewComputer();
            await computerPage.FillComputerField(user.computername);
            await computerPage.IndroducedField(user.introduced);
            await computerPage.DiscontinuedField(user.discountinued);
            await computerPage.SelectCompany(user.company);
            await computerPage.CreateComputer();
            await expect(computerPage.verifyComputers).toContainText('Done ! Computer '+ user.computername +' has been created');
        });
    });
});