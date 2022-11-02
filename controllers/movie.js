const Movie = require('../models/movie');
const {
  ForbiddenError,
  NotFoundError,
  BadRequestError,
} = require('../errors');
const { errorMessage } = require('../utils/messages');

const getMovies = (req, res, next) => {
  Movie.find({owner: req.user._id})
    .then((movies) => res.send(movies))
    // .then((films) => {
    //   if (films.length === 0) {
    //     res.send([]);
    //   } else {
    //     res.send(films.filter((film) => film.owner.toString() === req.user._id));
    //   }
    // })
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description, image, trailerLink, nameRU, nameEN,
    thumbnail, movieId,
  } = req.body;
  const owner = req.user._id;
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
    owner,
  })
    .then((movie) => res.send(movie))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequestError(errorMessage.dataFilmError));
      } else {
        next(error);
      }
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(errorMessage.filmNotFound);
      }
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError(errorMessage.filmDeleteError);
      }
      Movie.findByIdAndRemove(req.params.movieId)
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
