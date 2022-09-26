const { NODE_ENV, JWT_SECRET } = process.env;
const DEFAULT_SECRET_KEY = 'top-secret-key';
const SECRET_KEY = NODE_ENV === 'production' ? JWT_SECRET : DEFAULT_SECRET_KEY;

module.exports = SECRET_KEY;
