import request from 'supertest';
import { app } from '../../../infra/http/app';
import Place from '../../../infra/database/models/Place';
import User from '../../../infra/database/models/User';
import Court from '../../../infra/database/models/Court'
import mongoose from 'mongoose';
import { body } from '../../fixtures/court.json';
import placeBody from '../../fixtures/place.json';
import userBody from '../../fixtures/user.json';

describe('Register court', () => {

    let token : string;

    beforeAll(async () => {
        await User.deleteMany();
        const data = userBody.body;
        const response : any = await request(app).post('/api/user').send(data);
        token = response.body.access_token;
    });

    beforeEach(async () => {
        await Court.deleteMany();
        await Place.deleteMany();
    });

    afterAll(async () => {
        await Place.deleteMany();
        await Court.deleteMany();
        await User.deleteMany();
        mongoose.connection.close();
    });

    test('Should register new court', async () => {
        const data = body;
        await request(app).post('/api/place').set('Authorization', `Bearer ${token}`).send(placeBody.body);
        const response : any = await request(app).post('/api/court').set('Authorization', `Bearer ${token}`).send(data);
        expect(response.status).toBe(201);
        expect(response.body.place_name).toBe(`${placeBody.body.name}`);
        expect(response.body.court_name).toBe("Quadra 3");
    });

    test('Should update number of courts in place when registered new court', async () => {
        const data = body;
        await request(app).post('/api/place').set('Authorization', `Bearer ${token}`).send(placeBody.body);
        await request(app).post('/api/court').set('Authorization', `Bearer ${token}`).send(data);
        const response : any = await request(app).get(`/api/place/${placeBody.body.name}`).set('Authorization', `Bearer ${token}`);
        expect(response.body.number_of_courts).toBe(3);
    });

    test('Should get error when trying to register a court already registered in the place', async () => {
        const data = body;
        await request(app).post('/api/place').set('Authorization', `Bearer ${token}`).send(placeBody.body);
        const response : any = await request(app).post('/api/court').set('Authorization', `Bearer ${token}`).send({...data, court_name: "Quadra 1"});
        expect(response.status).toBe(409);
        expect(response.body.message).toBe("Quadra ja existente");
    });

    test('Should get error when trying to register a court in a inexistent place', async () => {
        const data = body;
        await request(app).post('/api/place').set('Authorization', `Bearer ${token}`).send(placeBody.body);
        const response : any = await request(app).post('/api/court').set('Authorization', `Bearer ${token}`).send({...data, place_name: "inexistent place"});
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("Local nao encontrado");
    });

});