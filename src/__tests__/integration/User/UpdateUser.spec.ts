import request from 'supertest';
import { app } from '../../../infra/http/app';
import User from '../../../infra/database/models/User';
import mongoose from 'mongoose';
import { body } from '../../fixtures/user.json';

describe('Update user', () => {

    let token : string;

    beforeAll(async () => {
        await User.deleteMany();
        const data = body;
        const response : any = await request(app).post('/api/user').send(data);
        token = response.body.access_token;
    });

    beforeEach(async () => {
        await User.deleteMany();
    });

    afterAll(async () => {
        await User.deleteMany();
        mongoose.connection.close();
    });

    test('Should update user', async () => {
        const data = body;
        await request(app).post('/api/user').send(data);
        const response : any = await request(app).put(`/api/user/${data.email}`).set('Authorization', `Bearer ${token}`).send({first_name: "Claudio", last_name: "Da silva"});
        expect(response.status).toBe(204);
        const updatedUser : any = await request(app).get(`/api/user/${data.email}`).set('Authorization', `Bearer ${token}`);
        expect(updatedUser.body.first_name).toBe('Claudio');
        expect(updatedUser.body.last_name).toBe('Da silva');
    });

    test('Should get error when trying to update user email with an email already registered', async () => {
        const data = body;
        await request(app).post('/api/user').send(data);
        await request(app).post('/api/user').send({...data, email: "test@test.com", cpf: "398.835.070-20"});
        const response : any = await request(app).put(`/api/user/${data.email}`).set('Authorization', `Bearer ${token}`).send({email: "test@test.com"});
        expect(response.status).toBe(409);
        expect(response.body.message).toBe("Email ja cadastrado");
    });

    test('Should get error when trying to update user with invalid CPF', async () => {
        const data = body;
        await request(app).post('/api/user').send(data);
        const response : any = await request(app).put(`/api/user/${data.email}`).set('Authorization', `Bearer ${token}`).send({cpf: "472385645375"});
        expect(response.status).toBe(422);
        expect(response.body.message).toBe("CPF invalido");
    });

});