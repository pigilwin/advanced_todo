describe('All features of complete items', () => {

  it ('Should load the page', () => {

    cy.visit('/');

  });

  it ('Should allow complete items to be created', () => {

    cy.visit('/');

    cy.get('[data-cy="new-item"]')
      .type('Clean the house')
      .should('have.value','Clean the house')
      .trigger('keydown', { keyCode: 13, which: 13 });

    cy.get('[data-cy="incomplete-list-holder"]')
      .children()
      .first()
      .find('[data-cy="complete-me-checkbox"]')
      .click({
        force: true
      });

    cy.get('[data-cy="complete-list-holder"]')
      .children()
      .should('have.length', 1);

  });

});