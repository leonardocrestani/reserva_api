import request from 'supertest';
import { app } from '../../../infra/http/app';
import Place from '../../../infra/database/models/Place';
import User from '../../../infra/database/models/User';
import Court from '../../../infra/database/models/Court'
import mongoose from 'mongoose';
import { body } from '../../fixtures/court.json';
import placeBody from '../../fixtures/place.json';
import userBody from '../../fixtures/user.json';

describe('Delete court', () => {

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

    test('Should delete court', async () => {
        const data = body;
        await request(app).post('/api/place').set('Authorization', `Bearer ${token}`).send(placeBody.body);
        const court : any = await request(app).post('/api/court').set('Authorization', `Bearer ${token}`).send(data);
        const response : any = await request(app).delete(`/api/court/${court.body._id}`).set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(204);
        const responseFind : any = await request(app).get(`/api/place/${placeBody.body.name}`).set('Authorization', `Bearer ${token}`);
        expect(responseFind.body.courts.length).toBe(2);
    });

    test('Should get erro when pass incorrect ID', async () => {
        const data = body;
        await request(app).post('/api/place').set('Authorization', `Bearer ${token}`).send(placeBody.body);
        await request(app).post('/api/court').set('Authorization', `Bearer ${token}`).send(data);
        const response : any = await request(app).delete('/api/court/63125b8fa419f258467288f0').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("Quadra nao encontrada");
    });

});