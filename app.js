require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');

const routers = require('./routes');
const { handleError } = require('./errors');
const { MONGO_URL } = require('./utils');
const {
  requestLogger,
  errorLogger,
} = require('./middlewares/logger');

const { PORT = 3001 } = process.env;

const app = express();
mongoose.connect(MONGO_URL, { useNewUrlParser: true });

const options = {
  origin: [
    'http://localhost:3000',
    'http://lizasokol.nomorepartiesxyz.ru',
    'https://lizasokol.nomorepartiesxyz.ru',
  ],
  credentials: true,
};

app.use('*', cors(options));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(requestLogger);

app.use(routers);

app.use(errorLogger);
app.use(errors());
app.use(handleError);

app.listen(PORT, () => {
  // В консоли вывод порта
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
