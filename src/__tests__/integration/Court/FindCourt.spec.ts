import request from 'supertest'
import { app } from '../../../infra/http/app'
import Place from '../../../infra/database/models/Place'
import User from '../../../infra/database/models/User'
import Court from '../../../infra/database/models/Court'
import mongoose from 'mongoose'
import { body } from '../../fixtures/court.json'
import placeBody from '../../fixtures/place.json'
import userBody from '../../fixtures/user.json'

describe('Find court', () => {
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
  })

  afterAll(async () => {
    await Place.deleteMany()
    await Court.deleteMany()
    await User.deleteMany()
    mongoose.connection.close()
  })

  test('Should get court by id', async () => {
    const data = body
    await request(app).post('/api/place').set('Authorization', `Bearer ${token}`).send(placeBody.body)
    const court : any = await request(app).post('/api/court').set('Authorization', `Bearer ${token}`).send(data)
    const response : any = await request(app).get(`/api/court/${court.body._id}`).set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
    expect(response.body.place_name).toBe(`${placeBody.body.name}`)
    expect(response.body.court_name).toBe('Quadra 3')
  })

  test('Should get error when pass invalid ID', async () => {
    const response : any = await request(app).get('/api/court/89023$dsgGD').set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(422)
    expect(response.body.message).toBe('Formato de ID invalido')
  })

  test('Should get error when pass incorrect ID', async () => {
    const response : any = await request(app).get('/api/court/63111ce0996cab418e3a53f8').set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(404)
    expect(response.body.message).toBe('Quadra nao encontrada')
  })
})
