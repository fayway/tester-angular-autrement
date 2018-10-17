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
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (username, password) => {
  cy.request({
      log: false,
      method: 'POST',
      url: 'http://localhost:4200/api/authenticate',
      body: {
        username,
        password
      }
    }
  ).then((response) => {
    const {accessToken, user} = response.body;
    cy.log(`Logged now with ${user.username}`);
    cy.server({
      headers: {
        'x-auth-token': accessToken
      }
    });
  })
});
