const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  ConflictError,
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require('../errors');
const {errorMessage} = require('../utils/messages');
const { NODE_ENV, JWT_SECRET } = process.env;

const getPersonalData = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError();
      }
      res.send(user);
    })
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
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({ name, email, password: hash }))
    .then((user) => {
      const {_id} = user;
      res.status(201).send({
        _id,
        name,
        email,
      });
    })
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

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key', { expiresIn: '7d' });
      res
        .cookie('jwt', token, {
          maxAge: 360000 * 24 * 7,
          httpOnly: true,
          sameSite: 'none',
          secure: true,
        })
        .send({ token });
    })
    .catch(() => {
      next(new UnauthorizedError());
    });
};

const logout = (req, res) => {
  res.clearCookie('jwt', {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  })
    .send({ message: 'Cookie почищены' })
    .end();
};

module.exports = {
  getPersonalData,
  createUser,
  updateUser,
  login,
  logout,
};
