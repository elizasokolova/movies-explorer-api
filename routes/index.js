const express = require('express');
const auth = require('../middlewares/auth');
const { createUser, login, logout } = require('../controllers/user');
const { userCreateValidation, loginValidation } = require('../middlewares/validation/auth-validation');
const { NotFoundError } = require('../errors');
const moviesRouter = require('./movies-route');
const usersRouter = require('./users-router');

const routers = express.Router();

routers.post('/signup', userCreateValidation, createUser);
routers.post('/signin', loginValidation, login);

routers.use('/users', auth, usersRouter);
routers.use('/movies', auth, moviesRouter);
routers.post('/signout', logout);

routers.use((req, res, next) => {
  next(new NotFoundError('Неправильный путь'));
});

module.exports = routers;
