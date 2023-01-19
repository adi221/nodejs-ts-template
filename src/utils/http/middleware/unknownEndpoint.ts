import { RequestHandler } from 'express'

const unknownEndpoint: RequestHandler = (_, res) => {
  res.status(404).send({ error: 'Unknown endpoint.' })
}

export default unknownEndpoint
