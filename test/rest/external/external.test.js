const request = require('supertest');
const { expect } = require('chai');


describe('userExternal', () => {
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
});