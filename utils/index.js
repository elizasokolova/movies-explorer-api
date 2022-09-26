const MONGO_URL = require('./mongo-url');
const SECRET_KEY = require('./secret-key');
const {
  errorMessage,
} = require('./messages');

module.exports = {
  errorMessage,
  SECRET_KEY,
  MONGO_URL,
};
