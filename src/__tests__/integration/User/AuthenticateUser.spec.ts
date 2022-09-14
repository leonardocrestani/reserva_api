import request from 'supertest'
import { app } from '../../../infra/http/app'
import User from '../../../infra/database/models/User'
import mongoose from 'mongoose'
import { body } from '../../fixtures/user.json'

describe('Authenticate user', () => {
  beforeEach(async () => {
    await User.deleteMany()
  })

  afterAll(async () => {
    await User.deleteMany()
    mongoose.connection.close()
  })

  test('Should authenticate user', async () => {
    const data = body
    await request(app).post('/api/user').send(data)
    const response : any = await request(app).post('/api/auth').send({ email: data.email, password: data.password })
    expect(response.status).toBe(200)
    expect(response.body.user).toBe('leonardo@test.com')
    expect(response.body).toHaveProperty('access_token')
  })

  test('Should get an error when pass incorrect email', async () => {
    const data = body
    await request(app).post('/api/user').send(data)
    const response : any = await request(app).post('/api/auth').send({ email: 'emailIncorreto@test.com', password: data.password })
    expect(response.status).toBe(401)
    expect(response.body.message).toBe('Email ou senha incorretos')
  })

  test('Should get an error when pass incorrect password', async () => {
    const data = body
    await request(app).post('/api/user').send(data)
    const response : any = await request(app).post('/api/auth').send({ email: data.email, password: '123incorreta**' })
    expect(response.status).toBe(401)
    expect(response.body.message).toBe('Email ou senha incorretos')
  })
})
