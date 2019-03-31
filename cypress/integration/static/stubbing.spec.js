import SystemInformation from '../../../src/providers/SystemInformation';

describe('It should render the system stats', () => {

  it ('Should show the correct values when promise resolves', () => {

    cy.visit('/');

    cy.get('[data-cy="Name"]').should('to.contain','Advanced Todo');

    cy.get('[data-cy="Status"]').should('to.contain','Active');

  });

  it ('Should show the correct error message when promise rejects', () => {

    cy.visit('/');

    cy.stub(SystemInformation, 'getPageName').rejects(new Error());

    cy.stub(SystemInformation, 'getPageStatus').rejects(new Error());;

    cy.get('[data-cy="Name"]').should('to.contain','Failed');

    cy.get('[data-cy="Status"]').should('to.contain','Failed');

  });

});