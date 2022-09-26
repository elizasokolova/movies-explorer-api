const express = require('express');
const auth = require('../middlewares/auth');
const { NotFoundError } = require('../errors');
const moviesRouter = require('./movies-route');
const usersRouter = require('./users-router');
const authRouter = require('./auth-router');

const routers = express.Router();

routers.get('/crash-test', () => setTimeout(() => {
  throw new Error('Сервер сейчас упадёт!');
}, 0));
routers.use(authRouter);
routers.use('/users', auth, usersRouter);
routers.use('/movies', auth, moviesRouter);

routers.use((req, res, next) => {
  next(new NotFoundError('Неправильный путь'));
});

module.exports = routers;
