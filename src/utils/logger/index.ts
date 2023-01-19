import pino from 'pino'
import fs from 'fs-extra'
import { multistream } from 'pino-multi-stream'
import { generalConfig, loggerConfig } from '../../config'

const { nodeEnv } = generalConfig
const { logLevel, dirPath, logFile } = loggerConfig

const isDevelopment = nodeEnv === 'development'

const createDirIfNotExist = (dirPath: string) => {
  const isDirExists =
    fs.existsSync(dirPath) && fs.lstatSync(dirPath).isDirectory()
  if (!isDirExists) {
    fs.mkdirpSync(dirPath)
  }
}

const createFileStream = () => {
  createDirIfNotExist(dirPath)
  return pino.destination(fs.openSync(`${dirPath}/${logFile}`, 'a'))
}

const getLoggerStreams = () => {
  const fileStream = createFileStream()
  if (!isDevelopment) return fileStream
  return multistream([
    { level: logLevel as pino.Level, stream: process.stdout },
    { level: logLevel as pino.Level, stream: fileStream },
  ])
}

const logger = pino(
  {
    transport: {
      target: 'pino-pretty',
    },
    level: logLevel,
  },
  getLoggerStreams(),
)

export default logger
