import request from 'supertest';
import { app } from '../../../infra/http/app';
import Place from '../../../infra/database/models/Place';
import User from '../../../infra/database/models/User';
import Court from '../../../infra/database/models/Court'
import mongoose from 'mongoose';
import { body } from '../../fixtures/place.json';
import userBody from '../../fixtures/user.json'

describe('Register place', () => {

    let token : string;

    beforeAll(async () => {
        await User.deleteMany();
        const data = userBody.body;
        const response : any = await request(app).post('/api/user').send(data);
        token = response.body.access_token;
    });

    beforeEach(async () => {
        await Place.deleteMany();
        await Court.deleteMany();
    });

    afterAll(async () => {
        await Place.deleteMany();
        await Court.deleteMany();
        await User.deleteMany();
        mongoose.connection.close();
    });

    test('Should register new place', async () => {
        const data = body;
        const response : any = await request(app).post('/api/place').set('Authorization', `Bearer ${token}`).send(data);
        expect(response.status).toBe(201);
        expect(response.body.name).toBe("sports");
        expect(typeof(response.body.address.city_code)).toBe('number')
        expect(response.body.operation_time.days_open.length).toBeGreaterThan(1);
        expect(response.body.courts.length).toBeGreaterThan(1);
    });

    test('Should get error when trying to register a place already registered', async () => {
        const data = body;
        await request(app).post('/api/place').set('Authorization', `Bearer ${token}`).send(data);
        const response : any = await request(app).post('/api/place').set('Authorization', `Bearer ${token}`).send(data);
        expect(response.status).toBe(409);
        expect(response.body.message).toBe("Local ja cadastrado");
    });

    test('Should get error when trying to register a place with invalid CNPJ', async () => {
        const data = {
            ...body,
            cnpj: "00.534.975/0001-00"
        }
        const response : any = await request(app).post('/api/place').set('Authorization', `Bearer ${token}`).send(data);
        expect(response.status).toBe(422);
        expect(response.body.message).toBe("CNPJ invalido");
    });

    test.skip('Should get error when trying to register a place with unexistent CEP', async () => {
        // teste skipped para nao fazer requisicoes a API externa sem necessidade
        const data = {
            ...body,
            address: {
                ...body.address,
                city_code: 95320010
            }
        }
        const response : any = await request(app).post('/api/place').set('Authorization', `Bearer ${token}`).send(data);
        expect(response.status).toBe(422);
        expect(response.body.message).toBe("CEP invalido");
    });

    test('Should get error when trying to register a place with invalid operation time', async () => {
        const data = {
            ...body,
            operation_time: {
                ...body.operation_time,
                close_hour: 30,
                open_hour: -1
            }
        }
        const response : any = await request(app).post('/api/place').set('Authorization', `Bearer ${token}`).send(data);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Horario de funcionamento invalido");
    });

    test('Should get error when trying to register place with invalid days', async () => {
        const data = {
            ...body,
            operation_time: {
                ...body.operation_time,
                days_open: ["diaErrado"]
            }
        }
        const response : any = await request(app).post('/api/place').set('Authorization', `Bearer ${token}`).send(data);
        expect(response.status).toBe(400);
    });

    test('Should get error when trying to register a court in place with different place name', async () => {
        const data = {
            ...body,
            courts: [{
                ...body.courts[0],
                place_name: 'incorrect'
            }
            ]
        }
        const response : any = await request(app).post('/api/place').set('Authorization', `Bearer ${token}`).send(data);
        expect(response.status).toBe(422);
        expect(response.body.message).toBe("Local da quadra invalido");
    });

});