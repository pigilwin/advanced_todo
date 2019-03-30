describe('Intercept the network requests', () => {

  it ('Should take control of the network', () => {

    cy.server();

    cy.route('https://my-json-server.typicode.com/pigilwin/fakedbserver/todos', []);

    cy.visit('/static');

  });

});