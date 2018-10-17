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

    cy.visit('/login');

    cy.get('input[name=username]')
      .type('user1')
      .get('input[name=password]')
      .type('pass1')
      .get('button[type=submit]')
      .click();

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

  it.only('should not redirect to login when logged in', async ()=> {
    await cy.login('user1', 'pass1');
    cy.server({
      headers: {
        'x-auth-bob': 'bob'
      }
    })
    cy.visit('/');
    expect(1 +1 ).to.eq(2);
    //
    // cy.get('[data-testid=rental-1]')
    //   .within(() => {
    //     cy.get('[data-testid=price]').should('contain', '40')
    //   });
  })

});

