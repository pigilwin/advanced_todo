Cypress.Commands.add('addIncompleteItem', (itemValue) => {

  cy.get('[data-cy="new-item"]')
    .type(itemValue)
    .should('have.value',itemValue)
    .trigger('keydown', { keyCode: 13, which: 13 });

});

Cypress.Commands.add('addCompleteItem', (itemValue) => {

  cy.addIncompleteItem(itemValue);

  cy.get('[data-cy="incomplete-list-holder"]')
    .children()
    .last()
    .find('[data-cy="complete-me-checkbox"]')
    .click({
      force: true
    });
});
