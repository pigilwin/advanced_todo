describe('Generic homepage tests', () => {

  beforeEach(() => {

    cy.visit('/');

  });

  it ('Should load the results when the page is loaded with incomplete items', () => {

    cy.addIncompleteItem('Hello World');

    cy.get('[data-cy="incomplete-list-holder"]')
      .children()
      .should('have.length', 1);

    cy.reload();

    cy.get('[data-cy="incomplete-list-holder"]')
      .children()
      .should('have.length', 1);

  });

  it ('Should load the results when the page is loaded with incomplete items', () => {

    cy.addCompleteItem('Hello World');

    cy.get('[data-cy="complete-list-holder"]')
      .children()
      .should('have.length', 1);

    cy.reload();

    cy.get('[data-cy="complete-list-holder"]')
      .children()
      .should('have.length', 1);

  });

});