import request from 'supertest';
import { app } from '../../../infra/http/app';
import User from '../../../infra/database/models/User';
import mongoose from 'mongoose';
import { body } from '../../fixtures/user.json';

describe('Find user', () => {

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

    test('Should get user by email', async () => {
        const data = body;
        await request(app).post('/api/user').send(data);
        const response : any = await request(app).get('/api/user/leonardo@test.com').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body.email).toBe("leonardo@test.com");
    });

    test('Should get error when email are incorrect', async () => {
        const data = body;
        await request(app).post('/api/user').send(data);
        const response : any = await request(app).get('/api/user/leonardo@erro.com').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("Usuario nao encontrado");
    });

});