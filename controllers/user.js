const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  ConflictError,
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require('../errors');
const {
  SECRET_KEY,
  errorMessage,
} = require('../utils');

const getPersonalData = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send({ email: user.email, name: user.name, id: user._id }))
    .catch((error) => next(error));
};

const updateUser = (req, res, next) => {
  const { email, name } = req.body;

  User.findByIdAndUpdate(req.user._id, { email, name }, {
    new: true,
    runValidators: true,
  })
    .then((updatedUser) => res.send(updatedUser))
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new NotFoundError(errorMessage.userNotFound));
      } else if (error.name === 'ValidationError') {
        next(new BadRequestError(errorMessage.dataNotCorrect));
      } else if (error.code === 11000) {
        next(new ConflictError(errorMessage.emailError));
      } else {
        next(error);
      }
    });
};

const createUser = (req, res, next) => {
  const { email, name, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({ email, name, password: hash }))
    .then(() => res.status(201).send({ email, name }))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequestError(errorMessage.dataNotCorrect));
      } else if (error.code === 11000) {
        next(new ConflictError(errorMessage.emailError));
      } else {
        next(error);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(errorMessage.loginNotCorrect);
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError(errorMessage.loginNotCorrect);
          }
          return user;
        });
    })
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        SECRET_KEY,
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch((error) => next(error));
};

module.exports = {
  getPersonalData,
  createUser,
  updateUser,
  login,
};
