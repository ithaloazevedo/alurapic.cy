describe('Buscar fotos e dados', () => {

    it('buscar fotos do usuário flavio', () => {
        cy.request({
            method: 'GET',
            url: 'https://apialurapic.herokuapp.com/flavio/photos'
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).is.not.empty
            expect(response.body).to.have.length(14)
            expect(response.body[0]).to.have.property('description')
            expect(response.body[0].description).to.be.equal('Farol iluminado')
        });
    });

    it('fazer login do usuário flavio', () => {
        //Teste pode falhar pois o endpoint nem sempre está disponível
        cy.request({
            method: 'POST',
            url: 'https://apialurapic.herokuapp.com/user/login',
            body: Cypress.env()
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).is.not.empty
            expect(response.body).to.have.property('id')
            expect(response.body.id).to.be.equal(1)
            expect(response.body).to.have.property('email')
            expect(response.body.email).to.be.equal('flavio@alurapic.com.br')
        });
    });
});

