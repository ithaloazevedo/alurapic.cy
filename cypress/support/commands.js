// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (user, password) => {
    //validar url
    cy.url().should('be.equal','https://alura-fotos.herokuapp.com/#/home');
    //verificar nav-bar
    cy.get('.navbar-text')
        .should('be.visible')
        .contains('Please, login!');
    //inserir usuário e senha
    cy.get('input[formcontrolname=userName]').type(user);
    cy.get('input[formcontrolname=password]').type(password);
    //clicar no botão de login
    cy.get('button[type="submit"]').click();
});

