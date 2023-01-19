import { ErrorRequestHandler } from 'express'

const errorHandler: ErrorRequestHandler = (err, _req, res, next) => {
  res
    .status(err.statusCode || 500)
    .json({ message: err.message, code: err.code, data: err.data })
  next(err)
}

export default errorHandler
