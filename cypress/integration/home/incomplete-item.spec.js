describe('All features of incomplete items', () => {

  it ('should load the page', () => {

    cy.visit('/');

  });

  it ('should pop up a helpful message for creating items', () => {

    cy.visit('/');


    cy.get('[data-cy="new-item"]').type('some text');

    cy.get();

  });

});