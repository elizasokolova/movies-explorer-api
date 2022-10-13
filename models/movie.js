const mongoose = require('mongoose');
const { isURL } = require('validator');

const movieSchema = new mongoose.Schema({
  director: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (value) => isURL(value, { protocols: ['http', 'https', 'ftp'], require_protocol: true }),
      message: 'Некорректная ссылка',
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (value) => isURL(value, { protocols: ['http', 'https', 'ftp'], require_protocol: true }),
      message: 'Некорректная ссылка',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (value) => isURL(value, { protocols: ['http', 'https', 'ftp'], require_protocol: true }),
      message: 'Некорректная ссылка',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
