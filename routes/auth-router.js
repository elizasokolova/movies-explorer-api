const express = require('express');
const {
  createUser,
  login,
  logout
} = require('../controllers/user');
const {
  userCreateValidation,
  loginValidation,
} = require('../middlewares/validation');

const authRouter = express.Router();

authRouter.post('/signin', loginValidation, login);
authRouter.post('/signup', userCreateValidation, createUser);
authRouter.post('/signout', logout);

module.exports = authRouter;
