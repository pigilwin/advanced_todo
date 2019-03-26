describe('All features of complete items', () => {

  beforeEach(() => {

    cy.visit('/');

  });

  it ('Should load the page', () => {

    cy.get('[data-cy="new-item"]');

  });

  it ('Should allow complete items to be created', () => {

    cy.addCompleteItem('Clean the house');

    cy.get('[data-cy="complete-list-holder"]')
      .children()
      .should('have.length', 1);

  });

});