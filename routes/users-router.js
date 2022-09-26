const express = require('express');
const {
  getPersonalData,
  updateUser,
} = require('../controllers/user');
const { userUpdateInfoValidation } = require('../middlewares/validation');

const usersRouter = express.Router();

usersRouter.patch('/me', userUpdateInfoValidation, updateUser);
usersRouter.get('/me', getPersonalData);

module.exports = usersRouter;
