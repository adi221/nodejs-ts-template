import request from 'supertest'
import listen from '../../src/httpServer'

export default request(listen())
