Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    const longText = Cypress._.repeat('Texto longo alternativo !! ', 20)
    
    const data = {
        firstName: 'Rodrigo',
        lastName: 'K. Weber',
        email: 'rodrigo@tesst.com',
        text: longText
    }

    cy.get('#firstName').type(data.firstName)
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)
    cy.get('#open-text-area').type(data.text)
    cy.get('.button').click()
    cy.get('.success').contains('Mensagem enviada com sucesso.')
})