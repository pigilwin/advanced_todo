describe('Should allow the window to be stubbed', () => {

    it ('Should allow us to override the prompt', () => {

        let alertStub;

        cy.visit('/', {
            onBeforeLoad(win) {
                cy.stub(win,'prompt').returns('Cypress');
                alertStub = cy.stub(win, 'alert').as('alertStub');
            }
        });

        cy.get('[data-cy="prompt-for-stub"]').click().then(() => {
            expect(alertStub.getCall(0)).to.be.calledWith("Hello Cypress");
        });
    });
});