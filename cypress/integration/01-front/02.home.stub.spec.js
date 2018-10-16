/// <reference types="Cypress" />

describe('WaterBnb Home with stubbed api calls', () => {

  beforeEach(() => {
    cy.server();
    cy.route('/api/rentals', 'fixture:front/rentals.json');
    cy.route('/api/rentals?city=aga', 'fixture:front/rental-agadir.json');
    cy.route('/api/rentals?city=marseille', []);
    cy.route('/sockjs-node/**', {});
    cy.visit('/');
  });

  it('should not display price and access to details page when not logged in', ()=> {
    cy.get('[data-testid^=rental]').should('have.length', 2)
      .first()
      .within(() => {
        cy.get('[data-testid=title]').should('contain', 'Très beau studio avec terrasse à 2 pas de la mer')
          .get('[data-testid=city]').should('contain', 'Nice')
          .get('[data-testid=roomsNbr]').should('contain', '1')
          .get('[data-testid=guestsNbr]').should('contain', '2')
          .get('[data-testid=type]').should('contain', 'Logement entier')
          .get('[data-testid=price]').should('contain', 'Connectez-vous pour voir le prix')
      })
      .end();

  });

  it('should filter by city', () => {
    cy.get('[data-testid^=rental]').should('have.length', 2)
      .get('[type=search]')
      .type('aga')
      .wait(350)
      .get('[data-testid^=rental]').should('have.length', 1)
      .first()
      .within(() => {
        cy.get('[data-testid=city]').should('contain', 'Agadir')
      })
      .get('[type=search]')
      .type('{selectall}{del}')
      .type('marseille')
      .wait(350)
      .get('[data-testid^=rental]').should('have.length', 0)
      .end();
  });
});

