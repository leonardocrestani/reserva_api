import request from 'supertest'
import { app } from '../../../infra/http/app'
import Place from '../../../infra/database/models/Place'
import User from '../../../infra/database/models/User'
import Court from '../../../infra/database/models/Court'
import Schedule from '../../../infra/database/models/Schedule'
import mongoose from 'mongoose'
import { body } from '../../fixtures/place.json'
import userBody from '../../fixtures/user.json'

describe('Update place', () => {
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

  test('Should update place', async () => {
    const data = body
    await request(app).post('/api/place').set('Authorization', `Bearer ${token}`).send(data)
    const response : any = await request(app).put(`/api/place/${data.name}`).set('Authorization', `Bearer ${token}`).send({ cnpj: '75.781.760/0001-82' })
    expect(response.status).toBe(204)
    const responseFind : any = await request(app).get('/api/place/sports').set('Authorization', `Bearer ${token}`)
    expect(responseFind.body.cnpj).toBe('75.781.760/0001-82')
    expect(typeof (responseFind.body.address.city_code)).toBe('number')
    expect(responseFind.body.operation_time.days_open.length).toBeGreaterThan(1)
  })

  test('Should update court and schedule place names when update place name', async () => {
    const data = body
    await request(app).post('/api/place').set('Authorization', `Bearer ${token}`).send(data)
    await request(app).post('/api/schedule').set('Authorization', `Bearer ${token}`).send({ place_name: 'sports', court_name: 'Quadra 1', hour: 20, day: 'Wed' })
    const response : any = await request(app).put(`/api/place/${data.name}`).set('Authorization', `Bearer ${token}`).send({ name: 'sports np' })
    expect(response.status).toBe(204)
    const responseFind : any = await request(app).get('/api/place/sports np').set('Authorization', `Bearer ${token}`)
    expect(responseFind.body.name).toBe('sports np')
    expect(typeof (responseFind.body.address.city_code)).toBe('number')
    expect(responseFind.body.operation_time.days_open.length).toBeGreaterThan(1)
    expect(responseFind.body.courts[0].place_name).toBe('sports np')
    expect(responseFind.body.courts[1].place_name).toBe('sports np')
    expect(responseFind.body.courts[0].schedules[0].place_name).toBe('sports np')
  })

  test('Should get error when trying to update inexistent place', async () => {
    const data = body
    await request(app).post('/api/place').set('Authorization', `Bearer ${token}`).send(data)
    const response : any = await request(app).put('/api/place/inexistent place').set('Authorization', `Bearer ${token}`).send({ name: 'sports np' })
    expect(response.status).toBe(404)
    expect(response.body.message).toBe('Local nao encontrado')
  })

  test('Should get error when trying to update place with invalid CNPJ', async () => {
    const data = body
    await request(app).post('/api/place').set('Authorization', `Bearer ${token}`).send(data)
    const response : any = await request(app).put(`/api/place/${data.name}`).set('Authorization', `Bearer ${token}`).send({ cnpj: '00.399.372/0001-00' })
    expect(response.status).toBe(422)
    expect(response.body.message).toBe('CNPJ invalido')
  })

  test('Should get error when trying to update place with invalid days', async () => {
    const data = body
    await request(app).post('/api/place').set('Authorization', `Bearer ${token}`).send(data)
    const response : any = await request(app).put(`/api/place/${data.name}`).set('Authorization', `Bearer ${token}`).send({ operation_time: { days_open: ['diaInvalido'] } })
    expect(response.status).toBe(400)
  })

  test('Should get error when trying to update place with invalid operation time', async () => {
    const data = body
    await request(app).post('/api/place').set('Authorization', `Bearer ${token}`).send(data)
    const response : any = await request(app).put(`/api/place/${data.name}`).set('Authorization', `Bearer ${token}`).send({ operation_time: { close_hour: 30, open_hour: -1 } })
    expect(response.status).toBe(400)
    expect(response.body.message).toBe('Horario de funcionamento invalido')
  })

  test('Should get error when trying to update place with invalid CEP', async () => {
    const data = body
    await request(app).post('/api/place').set('Authorization', `Bearer ${token}`).send(data)
    const response : any = await request(app).put(`/api/place/${data.name}`).set('Authorization', `Bearer ${token}`).send({ address: { city_code: 95320010 } })
    console.log(response)
    expect(response.status).toBe(422)
    expect(response.body.message).toBe('CEP invalido')
  })
})
