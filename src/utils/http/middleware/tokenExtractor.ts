import { RequestHandler } from 'express';

const tokenExtractor: RequestHandler = (req, _, next) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const token = authorization.substring(7);
    req.token = token;
  }
  next();
};

export default tokenExtractor;
