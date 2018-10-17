/// <reference types="Cypress" />

describe('Login page', () => {

  beforeEach(() => {
    cy.visit('/login');
  });

  it('should display the page', () => {
    cy.contains('Authentification').should('exist')
      .get('input[name=username]').should('exist')
      .get('input[name=password]').should('exist')
      .get('button[type=submit]').should('exist');
  });

  it('should not be submit-able when username or password are missing', () => {
    cy.get('button[type=submit]').should('be.disabled')
      .get('input[name=username]')
      .type('user')
      .get('button[type=submit]').should('be.disabled')
      .get('input[name=password]')
      .type('pass')
      .get('button[type=submit]').should('be.not.disabled');
  });

  it('should display error message when username or password is incorrect', () => {
    cy.get('input[name=username]')
      .type('homer')
      .get('input[name=password]')
      .type('simpson')
      .get('button[type=submit]')
      .click()
      .get('[data-testid=errorMessage]').should('exist');
  });

  it('should redirect to homepage when logging is successful', () => {
    cy.get('input[name=username]')
      .type('user1')
      .get('input[name=password]')
      .type('pass1')
      .get('button[type=submit]')
      .click()
      .url().should('contain', '/')
      .get('[data-testid=user]').should('contain', 'Saul Goodman')
      .get('[data-testid^=rental]').should('exist')
  });

  it('should redirect to login page when logging out', () => {
    cy.get('input[name=username]')
      .type('user1')
      .get('input[name=password]')
      .type('pass1')
      .get('button[type=submit]')
      .click()
      .url().should('contain', '/rentals')
      .get('[data-testid=user]').should('contain', 'Saul Goodman')
      .get('[data-testid^=rental]').should('exist')
      .get('[data-testid=logout')
      .click()
      .url().should('contain', '/login')
  })

});

