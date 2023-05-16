// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import "@4tw/cypress-drag-drop";

Cypress.Commands.add("login", (baseUrl, username, password) => {
  const sentArgs = { username: username, password: password };
  cy.visit(`${baseUrl}/login`);
  cy.get("#user").type(username);
  cy.get("#login").click();
  cy.wait(2000);
  cy.origin("https://id.atlassian.com", { args: sentArgs }, ({ password }) => {
    cy.get("#password").type(password);
    cy.get("#login-submit").click();
  });
});

Cypress.Commands.add("logout", () => {
  cy.get('[data-testid="board-facepile-member"]').click();
  cy.get('[data-testid="profile-link"]').click();
  cy.get('[data-testid="header-member-menu-button"]').click();
  cy.get('[data-testid="account-menu-logout"]').click();
  cy.wait(["@postIngest", "@postBatch"]);
  cy.origin("https://id.atlassian.com", () => {
    cy.get('[data-testid="logout-button"]').click();
  });
});
