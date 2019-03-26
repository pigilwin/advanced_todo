describe("Does the navigation bar does as expected", () => {

  beforeEach(() => {

    cy.visit('/');

  });


  it("Should load the page", () => {

    cy.get('[data-cy="dark-button"]');

  });


  it ('Should allow the application to be switched to dark mode', () => {

    cy.get('[data-cy="dark-button"]')
      .click();

    cy.get('body')
      .should('have.class', 'dark-mode');

    cy.screenshot();

  });

  it ('Should allow the application to be switched to light mode from dark mode', () => {

    cy.get('[data-cy="dark-button"]').click();

    cy.get('[data-cy="light-button"]').click();

    cy.get('body')
      .should('have.class', 'light-mode');

    cy.screenshot();

  });

  it ('Should allow us to wipe the data', () => {

    cy.visit('seed/100');

    cy.get('[data-cy="wipe-data"]').click();

    cy.get('[data-cy="incomplete-list-holder"]')
      .should('not.exist');

    cy.get('[data-cy="complete-list-holder"]')
      .should('not.exist');

  });

});