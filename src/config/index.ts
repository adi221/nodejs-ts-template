import dotenv from 'dotenv'
dotenv.config()

const { env } = process

export const generalConfig = {
  serviceName: env.SERVICE_NAME || 'example-service',
  nodeEnv: env.NODE_ENV,
}

export const serverConfig = {
  servicePort: env.PORT || 8080,
  corsOrigin: env.HTTP_CORS_ORIGIN || '*',
  requestBodySize: env.MAX_REQUEST_BODY_SIZE_KB || '5120',
}

export const loggerConfig = {
  logLevel: env.LOG_LEVEL || 'info',
  dirPath: env.LOG_DIR_PATH || './logs',
  logFile: generalConfig.serviceName,
}

export const authConfig = {
  jwtSecret: env.JWT_SECRET || 'very-secret',
}
