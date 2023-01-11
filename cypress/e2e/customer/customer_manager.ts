import { Given,When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("Start to customer page", () => {
  cy.visit('/customer')
});
When("click create button", () => {
  cy.get('.create-btn').click();
});
Then("Visit create page. Url should contain {string}", (link) => {
  cy.url()
    .should('contain', link);
});
Given("create page", () => {
  cy.visit('/customer/create')
});
When("User enter Email {string}.user will recieve a message {string}", (email: string, message: string) => {
  cy.get('#email').type(email);
  cy.get('#email').siblings('.invalid-feedback')
    .children('div').contains(message);
});

When("User enter Phone Number {string}. user will recieve a message {string}", (phoneNumber: string, message: string) => {
  cy.get('#phoneNumber').type(phoneNumber);
  cy.get('#phoneNumber').siblings('.invalid-feedback')
    .children('div').contains(message);
});


When("User enter Bank Account Number {string}. user will recieve a message {string}", (bankAccountNumber: string, message: string) => {
  cy.get('#bankAccountNumber').type(bankAccountNumber);
  cy.get('#bankAccountNumber').siblings('.invalid-feedback')
    .children('div').contains(message);
});
When("User enter First Name {string} & User enter Last Name {string} & User Date Of Birth {string}", (firstName: string, lastName: string, dateOfBirth: string) => {
  cy.get('#firstname').type(firstName);
  cy.get('#lastname').type(lastName);
  cy.get('#dateOfBirth').type(dateOfBirth)
});
When("User click on submit button", () => {
  cy.get('button[type="submit"]').click();
});
Then("user will stay on create page {string}", (url) => {
  cy.url()
    .should('contain', url);
});



Given("user enter to create page", () => {
  cy.wait(1000);
  cy.visit('/customer/create')
});
When("user creates a customer with following data", (dataTable:any) => {
  dataTable.hashes().forEach((row:any) => {
    cy.get('#firstname').type(row.FirstName);
    cy.get('#lastname').type(row.LastName);
    cy.get('#email').type(row.Email);
    cy.get('#phoneNumber').type(row.PhoneNumber);
    cy.get('#dateOfBirth').type(row.DateOfBirth);
    cy.get('#bankAccountNumber').type(row.BankAccountNumber);
    cy.get('button[type="submit"]').click();
  });
});
Then("user can get all customers and filter with below data and get {string} record", (count: number, dataTable: any) => {
  dataTable.hashes().forEach((row: any) => {
    let foundCount = 0;
    cy.get('table tbody tr')
      .each((tr, i) => {
        if (
          tr.find('td.firstname').text().indexOf(row.FirstName) > -1 &&
          tr.find('td.lastname').text().indexOf(row.LastName) > -1 &&
          new Date(tr.find('td.dateOfBirth').text().trim() + ' 00:00:00').getTime() == new Date(row.DateOfBirth + ' 00:00:00').getTime() &&
          tr.find('td.phoneNumber').text().indexOf(row.PhoneNumber) > -1 &&
          tr.find('td.email').text().indexOf(row.Email) > -1 &&
          tr.find('td.bankAccountNumber').text().indexOf(row.BankAccountNumber) > -1
        ) {
          foundCount++;
        }
      })
      .then(() => {
        expect(foundCount).to.equal(+count);
      });
  });
});
When("user creates a customer with following data to test duplicate FirstName,LastName,DateOfBirth error", (dataTable:any) => {
  cy.wait(1000);
  cy.visit('/customer/create')
  dataTable.hashes().forEach((row:any) => {
    cy.get('#firstname').type(row.FirstName);
    cy.get('#lastname').type(row.LastName);
    cy.get('#email').type(row.Email);
    cy.get('#phoneNumber').type(row.PhoneNumber);
    cy.get('#dateOfBirth').type(row.DateOfBirth);
    cy.get('#bankAccountNumber').type(row.BankAccountNumber);
    cy.get('button[type="submit"]').click();
  });
});

When("user creates a customer with following data  to test duplicate email error", (dataTable:any) => {
  cy.wait(1000);
  cy.visit('/customer/create')
  dataTable.hashes().forEach((row:any) => {
    cy.get('#firstname').type(row.FirstName);
    cy.get('#lastname').type(row.LastName);
    cy.get('#email').type(row.Email);
    cy.get('#phoneNumber').type(row.PhoneNumber);
    cy.get('#dateOfBirth').type(row.DateOfBirth);
    cy.get('#bankAccountNumber').type(row.BankAccountNumber);
    cy.get('button[type="submit"]').click();
  });
});
Then("user must see error code {string}", (error: number) => {
  cy.get('form')
    .invoke('attr', 'data-status')
    .should('eq', error);
});
When("user edit customer with new data by email of {string}", (email: string, dataTable:any) => {
  cy.visit('/customer')
  cy.wait(1500);
  cy.contains('table tbody tr td.email', email).siblings('td.actions').children('.btn-update').click();
  dataTable.hashes().forEach((row:any) => {
    cy.get('#firstname').clear().type(row.FirstName);
    cy.get('#lastname').clear().type(row.LastName);
    cy.get('#phoneNumber').clear().type(row.PhoneNumber);
    cy.get('#dateOfBirth').clear().type(row.DateOfBirth);
    cy.get('#bankAccountNumber').clear().type(row.BankAccountNumber);
    cy.get('button[type="submit"]').click();
  });
});

When("user delete customer with email of {string}", (email: string,) => {
  cy.wait(1500);
  cy.contains('table tbody tr td.email', email).siblings('td.actions').children('.btn-remove').click();
});

Then("user must see {string} records in customer list", (count) => {
  cy.get('table tbody tr').should('have.length', count);
});




