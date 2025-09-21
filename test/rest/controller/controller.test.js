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

        it('Mock: Quando realizo o login com um usuário existente o retorno é 200', async () => {
            const userServiceMock = sinon.stub(userService, 'authenticate');
            userServiceMock.returns({
                id: 2,
                name: "joão",
                email: "joao@email.com",
                token: "token"
            });

            const resposta = await request(app)
                .post('/api/users/login')
                .send({
                    email: "joao@email.com",
                    password: "12345"
                });

            expect(resposta.status).to.equal(200);
            expect(resposta.body).to.have.property('id', 2);
            expect(resposta.body).to.have.property('name', "joão");
            expect(resposta.body).to.have.property('email', "joao@email.com");
            expect(resposta.body).to.have.property('token', "token");

            sinon.restore();
        });
    });

});

/*
describe('checkoutController', () => {
    describe('POST /checkout', () => {
        it.only('Quando informo produto = 1, quantidade = 1, frete = 10 e método de pagamento cartão de crédito devo receber status 200 e valor final 104.5', async () => {
            const resposta = await request(app)
                .post('/api/checkout')
                .send(
                    {
                        "items": [
                            {
                            "productId": 1,
                            "quantity": 1
                            }
                        ],
                        freight: 10,
                        paymentMethod: "credit_card",
                        cardData: {
                            number: "123456789",
                            name: "ricardo",
                            expiry: "07/32",
                            cvv: "777"
                        }
                    }
                )
                expect(resposta.status).to.equal(200);
                expect(resposta.body).to.have.property('total', 104.5);
        });
    });
});

*/