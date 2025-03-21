describe('template spec', () => {
  beforeEach(() => {
    cy.visit('src/index.html')
    
  })

Cypress._.times(3, () => {
  it('Criar formuário', () => {
    cy.clock()

    const longText = Cypress._.repeat('Texto longo alternativo !! ', 20) // _ é chamado de low dash, e esta dentro de Cypress

    cy.get('#firstName').type('Rodrigo')
    cy.get('#lastName').type('Kunzler Weber')
    cy.get('#email').type('rodrigo@tesst.com')
    cy.get('#open-text-area').type(longText, { delay: 0 })
    cy.get('.button').click()
    cy.get('.success').contains('Mensagem enviada com sucesso.')
    cy.tick(3000)
    cy.get('.success').should('not.be.visible')
  })
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

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product').select('YouTube')
    cy.get('#product').should('have.value', 'youtube')
  })

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product').select(1)
    cy.get('#product').should('have.value', 'blog')
  })  
  
  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get(':nth-child(4) > input').check('feedback').should('be.checked')
  })

  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .each(tipoDeAtendimento => { // pega cada input com tipo radio
        cy.wrap(tipoDeAtendimento) // impacota cada input com tipo radio
          .check()
          .should('be.checked')
      })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'target', '_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'target', '_blank')
      .and('have.attr', 'href', 'privacy.html')
      .invoke('removeAttr', 'target')
      .click()
      
    cy.contains('h1', 'CAC TAT - Política de Privacidade')
      .should('be.visible')
  })

  it('exibe e oculta as mensagens de sucesso e erro usando .invoke()', () => {
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible')
    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible')
  })
  
  it('preenche o campo da área de texto usando o comando invoke', () => {
    cy.get('#open-text-area')
      .invoke('val', 'Um texto qualquer')
      .should('have.value', 'Um texto qualquer')
  })

  it('faz uma requisição HTTP', () => {
    cy.request({
      method: 'GET',
      url: 'https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html'
    }).then((response) => {
      expect(response.status).to.eql(200)
      expect(response.statusText).to.eql('OK')
      expect(response.body).to.contains('CAC TAT')
    })
  })

  it.only('encontre o gato - desafio final', () => {
    cy.get('#cat')
      .invoke('show')
      .should('be.visible')
    cy.get('#title')
      .invoke('text', 'CAT TAT')
      .s
  })
})