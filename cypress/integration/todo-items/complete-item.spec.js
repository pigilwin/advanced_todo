describe('All features of complete items', () => {

  it ('Should load the page', () => {

    cy.visit('/');

  });

  it ('Should allow complete items to be created', () => {

    cy.visit('/');

    cy.addCompleteItem('Clean the house');

    cy.get('[data-cy="complete-list-holder"]')
      .children()
      .should('have.length', 1);

  });

});