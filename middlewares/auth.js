const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors');
const { SECRET_KEY, errorMessage } = require('../utils');

const auth = (req, res, next) => {
  const { jwt: authorization } = req.cookies;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(errorMessage.authorizationError);
  }

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
