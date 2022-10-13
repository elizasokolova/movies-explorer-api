const Movie = require('../models/movie');
const {
  ForbiddenError,
  NotFoundError,
  BadRequestError,
} = require('../errors');
const { errorMessage } = require('../utils');

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((films) => {
      if (films.length === 0) {
        res.send([]);
      } else {
        res.send(films.filter((film) => film.owner.toString() === req.user._id));
      }
    })
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description, image, trailerLink, nameRU, nameEN,
    thumbnail, movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((film) => res.status(201).send(film))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequestError(errorMessage.dataFilmError));
      } else {
        next(error);
      }
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(errorMessage.filmNotFound);
      }
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError(errorMessage.filmDeleteError);
      }
      Movie.deleteOne(movie)
        .then(() => {
          res.send({ message: errorMessage.filmDeleted });
        })
        .catch((error) => next(error));
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new BadRequestError(errorMessage.filmNotFound));
      } else {
        next(error);
      }
    });
};

module.exports = {
  getMovies,
  deleteMovie,
  createMovie,
};
