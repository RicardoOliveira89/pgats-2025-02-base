const request = require('supertest');
const { expect } = require('chai');


describe('userController', () => {
    describe('POST /register', () => {
        it('Quando cadastro usuário com dados válidos o retorno é 201', async () => {
            const resposta = await request('http://localhost:3000')
                .post('/api/users/register')
                .send({
                    name: "paulo",
                    email: "paulo@email.com",
                    password: "12345"
                });
                expect(resposta.status).to.equal(201);
        });

        it('Quando cadastro usuário com e-mail já cadastrado o retorno é 400', async () => {
            const resposta = await request('http://localhost:3000')
                .post('/api/users/register')
                .send({
                    name: "paulo",
                    email: "paulo@email.com",
                    password: "12345"
                });
                expect(resposta.status).to.equal(400);
                expect(resposta.body).to.have.property('error', 'Email já cadastrado');
        });
    });

    describe('POST /login', () => {
        it('Quando realizo o login com um usuário existente o retorno é 200', async () => {
            const resposta = await request('http://localhost:3000')
                .post('/api/users/login')
                .send({
                    email: "ricardo@email.com",
                    password: "12345"
                });
                expect(resposta.status).to.equal(401);
                expect(resposta.body).to.have.property('error', 'Credenciais inválidas');
        });

        it('Quando realizo o login com usuário não cadastrado o retorno é 401', async () => {
            const resposta = await request('http://localhost:3000')
                .post('/api/users/login')
                .send({
                    email: "antonio@email.com",
                    password: "12345"
                });
                expect(resposta.status).to.equal(401);
                expect(resposta.body).to.have.property('error', 'Credenciais inválidas');
        });
    });


});