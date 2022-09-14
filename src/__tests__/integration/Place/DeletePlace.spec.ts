import request from 'supertest'
import { app } from '../../../infra/http/app'
import Place from '../../../infra/database/models/Place'
import User from '../../../infra/database/models/User'
import Court from '../../../infra/database/models/Court'
import mongoose from 'mongoose'
import { body } from '../../fixtures/place.json'
import userBody from '../../fixtures/user.json'

describe('Delete place', () => {
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

  test('Should delete place', async () => {
    const data = body
    await request(app).post('/api/place').set('Authorization', `Bearer ${token}`).send(data)
    const response : any = await request(app).delete(`/api/place/${data.name}`).set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(204)
  })

  test('Should get error when trying to delete inexistent place', async () => {
    const data = body
    await request(app).post('/api/place').set('Authorization', `Bearer ${token}`).send(data)
    const response : any = await request(app).delete('/api/place/teste place').set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(404)
    expect(response.body.message).toBe('Local nao encontrado')
  })
})
