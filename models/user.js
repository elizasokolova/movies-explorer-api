const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => isEmail(value),
      message: 'Неправильный формат почты',
    },
  },
  password: {
    type: String,
    minlength: 4,
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);