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

describe('Register schedule', () => {
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

  test('Should register new schedule', async () => {
    const data = body
    await request(app).post('/api/place').set('Authorization', `Bearer ${token}`).send(placeBody.body)
    const response : any = await request(app).post('/api/schedule').set('Authorization', `Bearer ${token}`).send(data)
    expect(response.status).toBe(201)
    expect(response.body.place_name).toBe(`${placeBody.body.name}`)
    expect(response.body.court_name).toBe('Quadra 1')
    expect(response.body.responsible_person_email).toBeNull()
    expect(response.body.responsible_person_full_name).toBeNull()
    expect(response.body.responsible_person_id).toBeNull()
  })

  test('Should get error when trying to register new schedule in closed place', async () => {
    const data = { ...body, hour: 23 }
    await request(app).post('/api/place').set('Authorization', `Bearer ${token}`).send(placeBody.body)
    const response : any = await request(app).post('/api/schedule').set('Authorization', `Bearer ${token}`).send(data)
    expect(response.status).toBe(400)
    expect(response.body.message).toBe('Local fechado não é possivel cadastrar horario')
  })

  test('Should get error when trying to register new schedule in an inexistent court in place', async () => {
    const data = { ...body, court_name: 'inexistent name' }
    await request(app).post('/api/place').set('Authorization', `Bearer ${token}`).send(placeBody.body)
    const response : any = await request(app).post('/api/schedule').set('Authorization', `Bearer ${token}`).send(data)
    expect(response.status).toBe(404)
    expect(response.body.message).toBe('Quadra nao encontrada')
  })

  test('Should get error when trying to register new schedule in an inexistent court in place', async () => {
    const data = body
    await request(app).post('/api/place').set('Authorization', `Bearer ${token}`).send(placeBody.body)
    await request(app).post('/api/schedule').set('Authorization', `Bearer ${token}`).send(data)
    const response : any = await request(app).post('/api/schedule').set('Authorization', `Bearer ${token}`).send(data)
    expect(response.status).toBe(409)
    expect(response.body.message).toBe('Horario ja cadastrado')
  })
})
