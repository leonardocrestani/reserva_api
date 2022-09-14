import request from 'supertest'
import { app } from '../../../infra/http/app'
import User from '../../../infra/database/models/User'
import mongoose from 'mongoose'
import { body } from '../../fixtures/user.json'

describe('Register user', () => {
  beforeEach(async () => {
    await User.deleteMany()
  })

  afterAll(async () => {
    await User.deleteMany()
    mongoose.connection.close()
  })

  test('Should register new user', async () => {
    const data = body
    const response : any = await request(app).post('/api/user').send(data)
    expect(response.status).toBe(201)
    expect(response.body.user.email).toBe('leonardo@test.com')
    expect(response.body).toHaveProperty('access_token')
  })

  test('Should get error when trying to register user with invalid CPF', async () => {
    const data = {
      ...body,
      cpf: '312443534643'
    }
    const response : any = await request(app).post('/api/user').send(data)
    expect(response.status).toBe(422)
    expect(response.body.message).toBe('CPF invalido')
  })

  test('Should get error when trying to register a user already registered', async () => {
    const data = body
    await request(app).post('/api/user').send(data)
    const response : any = await request(app).post('/api/user').send(data)
    expect(response.status).toBe(409)
    expect(response.body.message).toBe('Usuario ja cadastrado')
  })
})
