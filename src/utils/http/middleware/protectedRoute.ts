import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { authConfig } from '../../../config';

const isNonSensitiveUser = (user: any) => false

const protectedRoute: RequestHandler = (req, res, next) => {
  if (!req.token) {
    return res.status(401).send({ error: 'Not authorized.' });
  }
  if (!authConfig.jwtSecret) {
    throw new Error('No JWT secret found.');
  }
  const decodedToken = jwt.verify(req.token, authConfig.jwtSecret) as Record<
    string,
    unknown
  >;

  if (!isNonSensitiveUser(decodedToken.user)) {
    return res.status(500).send({ error: 'Unable to verify user.' });
  }

  req.user = decodedToken.user;
  return next();
};

export default protectedRoute;
