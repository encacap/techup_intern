describe('Login ', () => {
    it('should return incorrect if wrong email or password', () => {
        cy.visit('http://localhost:3000/')

        cy.get('input[name="email"]')
            .type('fake@email.com')
            .should('have.value', 'fake@email.com')

        cy.get('input[name="password"]')
            .type('fake@email.com')
            .should('have.value', 'fake@email.com')

        cy.get('form').submit()

        cy.contains('Incorrect')
    })

    it('should login successfully', () => {
        cy.visit('http://localhost:3000/')

        cy.get('input[name="email"]')
            .type('tienlv304@gmail.com')
            .should('have.value', 'tienlv304@gmail.com')

        cy.get('input[name="password"]')
            .type('qweqweqwe1')
            .should('have.value', 'qweqweqwe1')

        cy.get('form').submit()

        cy.url().should('match', new RegExp('/todos/220400/all'))
        // cy.contains('Incorrect')
    })

})

describe('register', () => {
    it('should return incorrect if wrong email or password', () => {
        cy.visit('http://localhost:3000/')

        cy.get('input[name="email"]')
            .type('fake@email.com')
            .should('have.value', 'fake@email.com')

        cy.get('input[name="password"]')
            .type('fake@email.com')
            .should('have.value', 'fake@email.com')

        cy.get('form').submit()

        cy.contains('Incorrect')
    })

    it('should login successfully', () => {
        cy.visit('http://localhost:3000/')

        cy.get('input[name="email"]')
            .type('tienlv304@gmail.com')
            .should('have.value', 'tienlv304@gmail.com')

        cy.get('input[name="password"]')
            .type('qweqweqwe1')
            .should('have.value', 'qweqweqwe1')

        cy.get('form').submit()

        cy.url().should('match', new RegExp('/todos/220400/all'))
        // cy.contains('Incorrect')
    })

})