import request from 'supertest'
import { app } from '../../../infra/http/app'
import Place from '../../../infra/database/models/Place'
import User from '../../../infra/database/models/User'
import Court from '../../../infra/database/models/Court'
import Schedule from '../../../infra/database/models/Schedule'
import mongoose from 'mongoose'
import { body } from '../../fixtures/schedule.json'
import placeBody from '../../fixtures/place.json'
import userBody from '../../fixtures/user.json'

describe('Unbook schedule', () => {
  let token : string

  beforeAll(async () => {
    await User.deleteMany()
    const data = userBody.body
    const response : any = await request(app).post('/api/user').send(data)
    token = response.body.access_token
  })

  beforeEach(async () => {
    await Schedule.deleteMany()
    await Court.deleteMany()
    await Place.deleteMany()
  })

  afterAll(async () => {
    await Schedule.deleteMany()
    await Place.deleteMany()
    await Court.deleteMany()
    await User.deleteMany()
    mongoose.connection.close()
  })

  test('Should unbook schedule', async () => {
    const data = body
    await request(app).post('/api/place').set('Authorization', `Bearer ${token}`).send(placeBody.body)
    const schedule : any = await request(app).post('/api/schedule').set('Authorization', `Bearer ${token}`).send(data)
    await request(app).put(`/api/schedule/book/${schedule.body._id}`).set('Authorization', `Bearer ${token}`).send({ responsible_person_email: userBody.body.email })
    const response : any = await request(app).put(`/api/schedule/unbook/${schedule.body._id}`).set('Authorization', `Bearer ${token}`).send()
    expect(response.status).toBe(204)
    const responseFind : any = await request(app).get(`/api/schedule/${schedule.body._id}`).set('Authorization', `Bearer ${token}`)
    expect(responseFind.body.responsible_person_email).toBeNull()
    expect(responseFind.body.responsible_person_full_name).toBeNull()
  })

  /* test('Should get error when trying to book schedule with different responsible person email', async () => {
        const data = body;
        await request(app).post('/api/place').set('Authorization', `Bearer ${token}`).send(placeBody.body);
        const schedule : any = await request(app).post('/api/schedule').set('Authorization', `Bearer ${token}`).send(data);
        await request(app).put(`/api/schedule/book/${schedule.body._id}`).set('Authorization', `Bearer ${token}`).send({responsible_person_email: userBody.body.email});
        const response : any = await request(app).put(`/api/schedule/book/${schedule.body._id}`).set('Authorization', `Bearer ${token}`).send({responsible_person_email: userBody.body.email});
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("Horario nao encontrado");
    }); */

  test('Should get error when trying to unbook unexistent schedule', async () => {
    const data = body
    await request(app).post('/api/place').set('Authorization', `Bearer ${token}`).send(placeBody.body)
    const schedule : any = await request(app).post('/api/schedule').set('Authorization', `Bearer ${token}`).send(data)
    await request(app).put(`/api/schedule/book/${schedule.body._id}`).set('Authorization', `Bearer ${token}`).send({ responsible_person_email: userBody.body.email })
    const response : any = await request(app).put('/api/schedule/unbook/63139460bbb79931750cee80').set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(404)
    expect(response.body.message).toBe('Horario nao encontrado')
  })

  test('Should get error when trying to unbook not booked schedule', async () => {
    const data = body
    await request(app).post('/api/place').set('Authorization', `Bearer ${token}`).send(placeBody.body)
    const schedule : any = await request(app).post('/api/schedule').set('Authorization', `Bearer ${token}`).send(data)
    const response : any = await request(app).put(`/api/schedule/unbook/${schedule.body._id}`).set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(400)
    expect(response.body.message).toBe('Nao e possivel desmarcar horario nao reservado')
  })
})
