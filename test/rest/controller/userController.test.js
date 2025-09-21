const request = require('supertest');
const sinon = require('sinon');
const app = require('../../../rest/app');
const { expect } = require('chai');
const userService = require('../../../src/services/userService')

describe('userController', () => {
    describe('POST /register', () => {
        it('Quando cadastro usuário com dados válidos o retorno é 201', async () => {
            const resposta = await request(app)
                .post('/api/users/register')
                .send({
                    name: "ricardo",
                    email: "ricardo@email.com",
                    password: "12345"
                });
                expect(resposta.status).to.equal(201);
        });

        it('Mock: Quando cadastro usuário com dados válidos o retorno é 201', async () => {
            const userServiceMock = sinon.stub(userService, 'registerUser');
            userServiceMock.returns({
                id: 1,
                name: "suednna",
                email: "suednna@email.com"
            });

            const resposta = await request(app)
                .post('/api/users/register')
                .send({
                    name: "suednna",
                    email: "suednna@email.com",
                    password: "12345"
                });

            expect(resposta.status).to.equal(201);
            expect(resposta.body).to.have.property('user');
            expect(resposta.body.user).to.deep.equal({
                id: 1,
                name: "suednna",
                email: "suednna@email.com"
            });

            sinon.restore();
        });
    });

    describe('POST /login', () => {
        it('Quando realizo o login com um usuário existente o retorno é 200', async () => {
            const resposta = await request(app)
                .post('/api/users/login')
                .send({
                    email: "ricardo@email.com",
                    password: "12345"
                });
                expect(resposta.status).to.equal(200);
        });
    });

});