import { RequestHandler } from 'express'
import { generalConfig } from '../config'
import { Router } from '../utils/http'

const indexRoute: RequestHandler = (_, res) => {
  res.json({ serviceName: generalConfig.serviceName })
}

const apiRouter = Router()

export { apiRouter, indexRoute }
