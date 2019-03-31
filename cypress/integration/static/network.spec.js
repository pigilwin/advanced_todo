describe('Intercept the network requests', () => {

  it ('Should take control of the network', () => {

    cy.server();

    cy.route('https://my-json-server.typicode.com/pigilwin/fakedbserver/todos', [{
      "id": "001",
      "value": "Battle",
      "priority": "L",
      "complete": "N"
    }]);

    cy.visit('/static');

  });

  it ('Should take control of the network using a fixture', () => {

    cy.fixture('items.json').as('itemsJson');

    cy.server();

    cy.route('https://my-json-server.typicode.com/pigilwin/fakedbserver/todos', '@itemsJson');

    cy.visit('/static');

  });
});