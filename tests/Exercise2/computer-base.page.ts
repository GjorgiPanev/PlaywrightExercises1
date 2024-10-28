import { expect, type Locator, type Page } from '@playwright/test';
//import * as fs from 'fs';
//const locators = JSON.parse(fs.readFileSync('../Playwrightexercises1/tests/fixtures/data/locators.json',"utf-8"));

export class Computer{
    readonly computerPage: Page;
    readonly computerText: Locator;
    readonly addNewComputerButton: Locator;
    readonly computerName: Locator;
    readonly introduced: Locator;
    readonly discountinued: Locator;
    readonly companyName: Locator;
    readonly createComputerButton: Locator;
    readonly verifyComputer: Locator;
    readonly seacrhField: Locator;
    readonly searchButton: Locator;
    readonly searchResult: Locator;

    constructor(page : Page){
        this.computerPage = page;
        this.computerText = page.getByRole('banner');
        this.addNewComputerButton = page.getByRole('link', { name: 'Add a new computer' });
        this.computerName = page.getByLabel('Computer name');
        this.introduced = page.getByLabel('Introduced');
        this.discountinued = page.getByLabel('Discontinued');
        this.companyName = page.getByLabel('Company');
        this.createComputerButton = page.getByRole('button', { name: 'Create this computer' });
        this.verifyComputer = page.locator('#main');
        this.seacrhField = page.getByPlaceholder('Filter by computer name...');
        this.searchButton = page.getByRole('button', { name: 'Filter by name' });
        this.searchResult = page.locator('table tbody tr');
    }

    async goto(){
        await this.computerPage.goto('/');
    }

    async VerifyTheTitle(titlle){
        await expect(this.computerText).toHaveText(titlle);
    }

    async AddNewComputer(){
        await this.addNewComputerButton.click();
    }

    async FillComputerField(name){
        await this.computerName.fill(name);
    }

    async IndroducedField(date1){
        await this.introduced.fill(date1);
    }

    async DiscontinuedField(date2){
        await this.discountinued.fill(date2);
    }

    async SelectCompany(option){
        await this.companyName.selectOption(option);
    }

    async CreateComputer(){
        await this.createComputerButton.click();
    }

    async VerifyTheComputer(compname){
        await expect(this.verifyComputer).toHaveText('Done ! Computer '+ compname +' has been created');
    }

    async CreateComputer2(name2, date3, date4, option2){
        await this.addNewComputerButton.click();
        await this.computerName.fill(name2);
        await this.introduced.fill(date3);
        await this.discountinued.fill(date4);
        await this.companyName.selectOption(option2);
        await this.createComputerButton.click();
    }

    async SearchFill(search){
        await this.seacrhField.fill(search);
    }

    async SearchButton(){
        await this.searchButton.click();
    }
    
    async SearchResults(){
        await this.searchResult.count();
    }
}