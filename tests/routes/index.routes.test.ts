import request from '../utils/request'
import { generalConfig } from '../../src/config'

describe('Unknown endpoint', () => {
  it('Responds with 404 for unknown endpoints', async () => {
    await request
      .get('/unknown-endpoint')
      .expect('Content-Type', /json/)
      .expect(404)
  })
})

describe('Index route', () => {
  it('Responds with 200 for index route', async () => {
    const res = await request.get('/')
    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual({ serviceName: generalConfig.serviceName })
  })
})
