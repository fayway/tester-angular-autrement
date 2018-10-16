/// <reference types="Cypress" />

describe('WaterBnb Home', () => {

  beforeEach(() => {
    cy.visit('/');
  });

  it('should load rentals', ()=> {
    cy.title().should('eq', 'WaterBnb')
      .get('[data-testid=login]').should('exist')
      .end();
  });

  it('should not display price and access to details page when not logged in', ()=> {
    cy.get('.mat-h1').should('contain', 'Logements disponibles')
      .get('[data-testid^=rental]').should('have.length', 8)
      .first()
      .within(() => {
        cy.get('[data-testid=price]').should('contain', 'Connectez-vous pour voir le prix')
          .get('[data-testid=book]')
          .click()
          .hash().should('eq', '#/login')
      });
    cy.get('.company')
      .click()
      .get('.mat-h1').should('contain', 'Logements disponibles')
      .end();
  });

  it('should filter by city', () => {
    cy.get('[data-testid^=rental]').should('have.length', 8)
      .get('[type=search]')
      .type('nice')
      .wait(350)
      .get('[data-testid^=rental]').should('have.length', 1)
      .first()
      .within(() => {
        cy.get('[data-testid=city]').should('contain', 'Nice')
          .get('[data-testid=title]').should('contain', 'Très beau studio avec terrasse à 2 pas de la mer')
          .get('[data-testid=image]').should('exist')
          .get('[data-testid=roomsNbr]').should('contain', '1 Ch')
          .get('[data-testid=guestsNbr]').should('contain', '2 Pers')
      });

    cy.get('[type=search]')
      .type('{selectall}{del}')
      .wait(350)
      .get('[data-testid^=rental]').should('have.length', 8)
      .end();
  });

});

