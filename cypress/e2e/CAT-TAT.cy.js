describe('template spec', () => {
  beforeEach(() => {
    cy.visit('src/index.html')
    
  })
  it('Criar formuário', () => {
    const longText = Cypress._.repeat('Texto longo alternativo !! ', 20) // _ é chamado de low dash, e esta dentro de Cypress

    cy.get('#firstName').type('Rodrigo')
    cy.get('#lastName').type('Kunzler Weber')
    cy.get('#email').type('rodrigo@tesst.com')
    cy.get('#open-text-area').type(longText, { delay: 0 })
    cy.get('.button').click()
    cy.get('.success').contains('Mensagem enviada com sucesso.')
  })

  it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    const longText = Cypress._.repeat('Texto longo alternativo !! ', 20) // _ é chamado de low dash, e esta dentro de Cypress

    cy.get('#firstName').type('Rodrigo')
    cy.get('#lastName').type('Kunzler Weber')
    cy.get('#email').type('rodrigo-tesst!com')
    cy.get('#open-text-area').type(longText, { delay: 0 })
    cy.get('.button').click()
    cy.get('.error').contains('Valide os campos obrigatórios!')
  })

  it('Validar campo telefone, aceite apenas números', () => {
    // Números válidos
    cy.get('#phone').type('999999999')
    cy.get('#phone').should('have.value', '999999999')

    // Números inválidos
    cy.get('#phone').clear().type('abc')
    cy.get('#phone').should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    const longText = Cypress._.repeat('Texto longo alternativo !! ', 20) // _ é chamado de low dash, e esta dentro de Cypress
    
    cy.get('#firstName').type('Rodrigo')
    cy.get('#lastName').type('Kunzler Weber')
    cy.get('#email').type('rodrigo@tesst.com')
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type(longText, { delay: 0 })
    cy.get('.button').click()
    cy.get('.error').contains('Valide os campos obrigatórios!')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    const longText = Cypress._.repeat('Texto longo alternativo !! ', 20) // _ é chamado de low dash, e esta dentro de Cypress

    cy.get('#firstName').type('Rodrigo').should('have.value', 'Rodrigo')
    cy.get('#lastName').type('Kunzler Weber').should('have.value', 'Kunzler Weber')
    cy.get('#email').type('rodrigo@tesst.com').should('have.value', 'rodrigo@tesst.com')
    cy.get('#phone').type('999999999').should('have.value', '999999999')
    cy.get('#open-text-area').type(longText, { delay: 0 })
    cy.get('.button').click()
    cy.get('.success').contains('Mensagem enviada com sucesso.')

    cy.get('#firstName').clear().should('have.value', '')
    cy.get('#lastName').clear().should('have.value', '')
    cy.get('#email').clear().should('have.value', '')
    cy.get('#phone').clear().should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.get('.button').click()
    cy.get('.error').contains('Valide os campos obrigatórios!')
  })

  it('envia o formuário com sucesso usando um comando customizado', () => {
    const longText = Cypress._.repeat('Texto longo alternativo !! ', 20)

    const data = {
      firstName: 'Rodrigo',
      lastName: 'K. Weber',
      email: 'rodrigo@tesst.com',
      text: longText
    }
    cy.fillMandatoryFieldsAndSubmit(data)
  })
})