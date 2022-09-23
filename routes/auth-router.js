const express = require('express');
const {
  createUser,
  login,
} = require('../controllers/user');
const {
  userCreateValidation,
  loginValidation,
} = require('../middlewares/validation');

const authRouter = express.Router();

authRouter.post('/signin', loginValidation, login);
authRouter.post('/signup', userCreateValidation, createUser);

module.exports = authRouter;
