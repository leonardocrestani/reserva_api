import request from 'supertest';
import { app } from '../../../infra/http/app';
import Place from '../../../infra/database/models/Place';
import User from '../../../infra/database/models/User';
import Court from '../../../infra/database/models/Court';
import Schedule from '../../../infra/database/models/Schedule';
import mongoose from 'mongoose';
import { body } from '../../fixtures/schedule.json';
import placeBody from '../../fixtures/place.json';
import userBody from '../../fixtures/user.json';

describe('Delete schedule', () => {

    let token : string;

    beforeAll(async () => {
        await User.deleteMany();
        const data = userBody.body;
        const response : any = await request(app).post('/api/user').send(data);
        token = response.body.access_token;
    });

    beforeEach(async () => {
        await Schedule.deleteMany();
        await Court.deleteMany();
        await Place.deleteMany();
    });

    afterAll(async () => {
        await Schedule.deleteMany();
        await Place.deleteMany();
        await Court.deleteMany();
        await User.deleteMany();
        mongoose.connection.close();
    });

    test('Should delete schedule', async () => {
        const data = body;
        await request(app).post('/api/place').set('Authorization', `Bearer ${token}`).send(placeBody.body);
        const schedule : any = await request(app).post('/api/schedule').set('Authorization', `Bearer ${token}`).send(data);
        const response : any = await request(app).delete(`/api/schedule/${schedule.body._id}`).set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(204);
    });

    test('Should get error when trying to delete schedule with inexistent ID', async () => {
        const data = body;
        await request(app).post('/api/place').set('Authorization', `Bearer ${token}`).send(placeBody.body);
        await request(app).post('/api/schedule').set('Authorization', `Bearer ${token}`).send(data);
        const response : any = await request(app).delete('/api/schedule/63139460bbb79931750cee80').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Nao foi possivel excluir horario");
    });

});