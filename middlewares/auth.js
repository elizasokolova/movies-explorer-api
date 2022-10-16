const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors');
const {errorMessage} = require('../utils/messages');
const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const { jwt: token } = req.cookies;

  if (!token) {
    throw new UnauthorizedError(errorMessage.authorizationError);
  }

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key');
  } catch (error) {
    next(new UnauthorizedError(errorMessage.authorizationError));
  }

  req.user = payload;
  next();
};

module.exports = auth;
