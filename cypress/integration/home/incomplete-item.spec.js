describe('All features of incomplete items', () => {

  it ('should load the page', () => {

    cy.visit('/');

  });

  it ('should pop up a helpful message for creating items', () => {

    cy.visit('/');


    cy.get('[data-cy="new-item"]').type('some text').then(() => {

      cy.get('[data-cy="new-item-help-text"]');

    });

  });

  it ('should show an error message if the incomplete item text is empty', () => {

    cy.visit('/');

    cy.get('[data-cy="new-item"]').trigger('keydown', { keyCode: 13, which: 13 });

    cy.get('[data-cy="error-message-container"]');

  });

  it ('should add an incomplete item', () => {

    cy.visit('/');

    cy.get('[data-cy="new-item"]')
      .type('Clean the house')
      .should('have.value','Clean the house')
      .trigger('keydown', { keyCode: 13, which: 13 });

    cy.get('[data-cy="incomplete-list-holder"]').children().should('have.length', 1);

  });

  it ('should show an error message if duplicate items are trying to be added', () => {

    cy.visit('/');

    for (let i = 0; i < 2; i++) {
      cy.get('[data-cy="new-item"]')
      .type('Clean the house')
      .should('have.value', 'Clean the house')
      .trigger('keydown', {keyCode: 13, which: 13});
    }

    cy.get('[data-cy="error-message-container"]');

  });

  it ('should show an error message if a duplicate complete item is being added', () => {

    cy.visit('/');

    cy.get('[data-cy="new-item"]')
    .type('Clean the house')
    .should('have.value','Clean the house')
    .trigger('keydown', { keyCode: 13, which: 13 });

    cy.get('[data-cy="incomplete-list-holder"]').children().first().find('')

  });


});