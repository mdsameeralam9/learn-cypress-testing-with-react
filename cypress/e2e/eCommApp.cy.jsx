describe("e2e testing ", () => {

    beforeEach(() => {
        cy.visit("http://localhost:5173/login")
    });

    it("test with login", () => {
        cy.contain('input[name=email]')
    })
})