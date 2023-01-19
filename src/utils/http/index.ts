import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import morgan from 'morgan'
import { serverConfig } from '../../config'
import logger from '../logger'
import unknownEndpoint from './middleware/unknownEndpoint'
import errorHandler from './middleware/errorHandler'

const { servicePort, corsOrigin, requestBodySize } = serverConfig

const app = express()
export const mainRouter = express.Router()

export const listen = ({
  port = servicePort,
  bodySize = requestBodySize,
  origin = corsOrigin,
} = {}): http.Server => {
  app.use(cookieParser())
  app.use(bodyParser.json({ limit: `${bodySize}kb` }))
  app.use(express.json())

  const corsOptions: cors.CorsOptions = {}
  if (app.get('env') === 'production') {
    app.use(helmet())
    corsOptions.origin = origin
  }

  app.use(cors(corsOptions))
  app.options('*', cors(corsOptions))
  app.use(morgan('dev'))

  app.use('/', mainRouter)
  app.use(unknownEndpoint)
  app.use(errorHandler)

  return app.listen(port, () => {
    logger.info(`Server listening on port ${port}`)
  })
}

export const Router = express.Router
