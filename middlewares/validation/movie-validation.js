const { Joi, celebrate } = require('celebrate');
const validationURL = require('./validation-url');

const movieIdValidation = celebrate({
  params: Joi.object({
    movieId: Joi.string().hex().length(24).required(),
  }),
});

const movieCreationValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().custom(validationURL),
    trailerLink: Joi.string().custom(validationURL),
    thumbnail: Joi.string().custom(validationURL),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports = {
  movieCreationValidation,
  movieIdValidation,
};
