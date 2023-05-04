describe ('login', () => { 
    beforeEach(() => {
        cy.visit('/');
        cy.intercept('GET', '**/photos**').as('getPhotos');
        cy.intercept('POST', '**/user/login').as('login');      
    });
    
    
    it('login com usuário inválido', () => {
        //preencher e submeter form de login
        cy.login('usuarioinvalido', '123');
        //esperar requisição e validar seu status code
        cy.wait('@login').its('response.statusCode').should('be.equal', 401);;
        //validar que a url não mudou
        cy.url()
            .should('be.equal', 'https://alura-fotos.herokuapp.com/#/home');
        //validar mensagem de alerta
        cy.on('window:alert', (msg) => {
            expect(msg).to.be.equal('Invalid user name or password');
        });
    });

    it('login com senha inválida', () => {
        //preencher e submeter form de login
        cy.login('flavio', 'senhainvalida');
        //esperar requisição e validar seu status code
        cy.wait('@login').its('response.statusCode').should('be.equal', 401);;
        //validar que a url não mudou
        cy.url()
            .should('be.equal', 'https://alura-fotos.herokuapp.com/#/home');
        //validar mensagem de alerta
        cy.on('window:alert', (msg) => {
            expect(msg).to.be.equal('Invalid user name or password');
        });
    });

    it('login válido', () => {
        //preencher e submeter form de login
        cy.login(Cypress.env('userName'), Cypress.env('password'));
        //esperar requisições e validar seu status code
        cy.wait('@login').its('response.statusCode').should('be.equal', 200);;
        cy.wait('@getPhotos').its('response.statusCode').should('be.equal', 200);;
        //validar se o usuário está logado
        cy.contains('a', '(Logout)')
            .should('be.visible');
        //validar url da página
        cy.url().should('include', 'user/flavio');
    });
});