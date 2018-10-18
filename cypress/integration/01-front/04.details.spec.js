/// <reference types="Cypress" />

describe('WaterBnb Home with stubbed api calls', () => {

  beforeEach(() => {
    cy.server();
    cy.route('/api/rentals', 'fixture:front/rentals.json');
    cy.route('/sockjs-node/**', {});
    cy.visit('/');
  });

  it('should display/hide price according to auth state', ()=> {
    cy.get('[data-testid=rental-1]')
      .within(() => {
        cy.get('[data-testid=price]').should('contain', 'Connectez-vous pour voir le prix')
      });

    cy.login('user1', 'pass1');

    cy.get('[data-testid=rental-1]')
      .within(() => {
        cy.get('[data-testid=price]').should('contain', '40')
      });
  });

  it('should redirect to login when not logged in', ()=> {
    cy.get('[data-testid=rental-1]')
      .within(() => {
        cy.get('[data-testid=image]')
          .click()
          .url().should('contain', '/login');
      });
  });

});

