describe('Generic homepage tests', () => {

  it ('Should load the results when the page is loaded with incomplete items', () => {

    cy.visit('/');

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

    cy.visit('/');

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


describe('Hooks', () => {

  afterEach(() => {

  });

});