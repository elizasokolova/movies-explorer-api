const validator = require('validator');

const validationURL = (value) => {
  if (validator.isURL(value, { protocols: ['http', 'https', 'ftp'], require_protocol: true })) return value;
  throw new Error('Некорректная ссылка');
};

module.exports = validationURL;
