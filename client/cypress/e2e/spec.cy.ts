describe('My First Test', () => {
  it('finds the content "type"', () => {
// visit le'url
    cy.visit('https://example.cypress.io')

    // click sur type
    cy.contains('type').click()

    // check l'url
    cy.url().should('include', '/commands/actions')
    // get an input, écris dedans
    cy.get('.action-email').type('fake@email.com')

    // verify that the value has been updated
    cy.get('.action-email').should('have.value', 'fake@email.com')
  })
})