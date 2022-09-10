import request from 'supertest'
import { app } from '../../../infra/http/app'
import Place from '../../../infra/database/models/Place'
import User from '../../../infra/database/models/User'
import Court from '../../../infra/database/models/Court'
import Schedule from '../../../infra/database/models/Schedule'
import mongoose from 'mongoose'
import { body } from '../../fixtures/court.json'
import placeBody from '../../fixtures/place.json'
import userBody from '../../fixtures/user.json'

describe('Update court', () => {
  let token : string

  beforeAll(async () => {
    await User.deleteMany()
    const data = userBody.body
    const response : any = await request(app).post('/api/user').send(data)
    token = response.body.access_token
  })

  beforeEach(async () => {
    await Place.deleteMany()
    await Court.deleteMany()
    await Schedule.deleteMany()
  })

  afterAll(async () => {
    await Place.deleteMany()
    await Court.deleteMany()
    await Schedule.deleteMany()
    await User.deleteMany()
    mongoose.connection.close()
  })

  test('Should update court', async () => {
    const data = body
    await request(app).post('/api/place').set('Authorization', `Bearer ${token}`).send(placeBody.body)
    const court : any = await request(app).post('/api/court').set('Authorization', `Bearer ${token}`).send(data)
    const response : any = await request(app).put(`/api/court/${court.body._id}`).set('Authorization', `Bearer ${token}`).send({ court_name: 'Quadra 3 Areia' })
    expect(response.status).toBe(204)
    const responseFind : any = await request(app).get(`/api/court/${court.body._id}`).set('Authorization', `Bearer ${token}`)
    expect(responseFind.body.court_name).toBe('Quadra 3 Areia')
  })

  test('Should get error when trying to update court name with already registered court name', async () => {
    const data = body
    await request(app).post('/api/place').set('Authorization', `Bearer ${token}`).send(placeBody.body)
    const court : any = await request(app).post('/api/court').set('Authorization', `Bearer ${token}`).send(data)
    const response : any = await request(app).put(`/api/court/${court.body._id}`).set('Authorization', `Bearer ${token}`).send({ court_name: 'Quadra 1' })
    expect(response.status).toBe(409)
    expect(response.body.message).toBe('Quadra ja existente')
  })

  test('Should get error when trying to update court with incorrect ID', async () => {
    const data = body
    await request(app).post('/api/place').set('Authorization', `Bearer ${token}`).send(placeBody.body)
    await request(app).post('/api/court').set('Authorization', `Bearer ${token}`).send(data)
    const response : any = await request(app).put('/api/court/631258680b32ffebd20c5eb5').set('Authorization', `Bearer ${token}`).send({ court_name: 'Quadra 3 Areia' })
    expect(response.status).toBe(404)
    expect(response.body.message).toBe('Quadra nao encontrada')
  })
})
