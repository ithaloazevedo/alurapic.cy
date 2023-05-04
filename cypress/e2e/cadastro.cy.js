describe('cadastro', () => {

    beforeEach(() => {
        cy.visit('/');
    });

    it('validar se a url redirecionou para home', () => {
        cy.url().should('include', '/#/home');
    });


    it('verificar mensagens de campos obrigatórios', () => {
        cy.get(':nth-child(1) > ap-vmessage > .text-danger')
            .contains('User name is required!')
            .should('be.visible');
        cy.get(':nth-child(2) > ap-vmessage > .text-danger')
            .contains('Password is required!')
            .should('be.visible');
        cy.get('a').contains('Register now').click();
        cy.contains('button', 'Register').click();

        //Primeiramente, a única mensagem de campo obrigatório que aparece é a de email
        //Email -> 'Email is required!'
        cy.get(':nth-child(1) > ap-vmessage > .text-danger')
            .should('be.visible')
            .contains('Email is required!');

        //As mensagens dos outros campos aparecem após clicar em Register
        //Full name -> 'Full name is required!'
        //User name -> 'User name is required!'
        //Password -> 'Password is required!'
        cy.contains('button', 'Register').click();

        cy.get(':nth-child(2) > ap-vmessage > .text-danger')
            .should('be.visible')
            .contains('Full name is required!');

        cy.get(':nth-child(3) > ap-vmessage > .text-danger')
            .should('be.visible')
            .contains('User name is required!');

        cy.get(':nth-child(4) > ap-vmessage > .text-danger')
            .should('be.visible')
            .contains('Password is required!');

    });

    context('verificar mensagens de campos inválidos', () => {

        beforeEach(() => {
            cy.get('a').contains('Register now').click();
        });


        //Verificar mensagem de email inválido
        it('verificar mensagem de email inválido', () => {
            cy.get(':nth-child(1) > .form-control').type('emailinvalido@');
            cy.contains('button', 'Register').click();
            cy.get(':nth-child(1) > ap-vmessage > .text-danger')
                .should('be.visible')
                .contains('Invalid e-mail');
        });

        //Verificar mensagem de senha com mais 18 caracteres
        it('verificar mensagem de senha com mais de 18 caracteres', () => {
            cy.get(':nth-child(4) > .form-control').type('senhablablblablblablablabllblalbalblablablalbal');
            cy.contains('button', 'Register').click();
            cy.get(':nth-child(4) > ap-vmessage > .text-danger')
                .should('be.visible')
                .contains('Maximun length is 18');
        });

        //Verificar mensagem de senha com menos de 8 caracteres
        it('verificar mensagem de senha com menos de 8 caracteres', () => {
            cy.get(':nth-child(4) > .form-control').type('senha');
            cy.contains('button', 'Register').click();
            cy.get(':nth-child(4) > ap-vmessage > .text-danger')
                .should('be.visible')
                .contains('Mininum length is 8');
        });

        //Verificar mensagem de username invalido com letras maiusculas
        it('verificar mensagem de username invalido com letras maiusculas', () => {
            cy.get(':nth-child(3) > .form-control').type('USUARIO');
            cy.contains('button', 'Register').click();
            cy.get(':nth-child(3) > ap-vmessage > .text-danger')
                .should('be.visible')
                .contains('Must be lower case');
        });
    });
});
