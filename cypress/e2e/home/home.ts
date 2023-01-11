import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

When("I visit home page", () => {
  cy.visit('/')
});

Then("Title should {string}, Home link should {string}, Customer link should {string}" , (title,homeLink,customerLink) => {
  cy.title().should('eq', title)
  cy.get('.nav-link.home')
    .invoke('attr', 'href')
    .should('eq', homeLink);
  cy.get('.nav-link.customer')
    .invoke('attr', 'href')
    .should('eq', customerLink);
});
When("click Home link", () => {
  cy.get('.nav-link.home').click();
});

Then("Home click result : Title should {string}, Home link should {string}, Customer link should {string}", (title, homeLink, customerLink) => {
  cy.title().should('eq', title)
  cy.get('.nav-link.home')
    .invoke('attr', 'href')
    .should('eq', homeLink);
  cy.get('.nav-link.customer')
    .invoke('attr', 'href')
    .should('eq', customerLink);
});
When("click Customer link", () => {
  cy.get('.nav-link.customer').click();
});

Then("Url should contain {string}", (customerLink) => {
  cy.url()
    .should('contain', customerLink);
});

