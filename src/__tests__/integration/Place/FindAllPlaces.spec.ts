import request from 'supertest'
import { app } from '../../../infra/http/app'
import Place from '../../../infra/database/models/Place'
import User from '../../../infra/database/models/User'
import Court from '../../../infra/database/models/Court'
import mongoose from 'mongoose'
import { body } from '../../fixtures/place.json'
import userBody from '../../fixtures/user.json'

describe('Find all places', () => {
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

  test.only('Should get all places', async () => {
    const data = body
    await request(app).post('/api/place').set('Authorization', `Bearer ${token}`).send(data)
    await request(app).post('/api/place').set('Authorization', `Bearer ${token}`).send({
      ...data,
      name: 'sports np',
      cnpj: '44.027.321/0001-55',
      courts: [{
        ...body.courts[0],
        place_name: 'sports np'
      },
      {
        ...body.courts[1],
        place_name: 'sports np'
      }]
    })
    const response : any = await request(app).get('/api/place?limit=0&offset=0').set('Authorization', `Bearer ${token}`)
    expect(response.body.places.length).toBeGreaterThan(1)
  })
})
