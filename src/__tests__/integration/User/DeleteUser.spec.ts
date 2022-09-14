import request from 'supertest'
import { app } from '../../../infra/http/app'
import User from '../../../infra/database/models/User'
import mongoose from 'mongoose'
import { body } from '../../fixtures/user.json'

describe('Delete user', () => {
  let token : string

  beforeAll(async () => {
    await User.deleteMany()
    const data = body
    const response : any = await request(app).post('/api/user').send(data)
    token = response.body.access_token
  })

  beforeEach(async () => {
    await User.deleteMany()
  })

  afterAll(async () => {
    await User.deleteMany()
    mongoose.connection.close()
  })

  test('Should delete user', async () => {
    const data = body
    await request(app).post('/api/user').send(data)
    const response : any = await request(app).delete(`/api/user/${data.email}`).set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(204)
  })

  test('Should get error when try to delete user with invalid email', async () => {
    const data = body
    await request(app).post('/api/user').send(data)
    const response : any = await request(app).delete('/api/user/leonardo@hfsdui.it').set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(404)
    expect(response.body.message).toBe('Nao foi possivel encontrar usuario')
  })
})
