const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors');
const { SECRET_KEY, errorMessage } = require('../utils');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(errorMessage.authorizationError);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (error) {
    next(new UnauthorizedError(errorMessage.authorizationError));
  }

  req.user = payload;
  next();
};

module.exports = auth;
