const express = require('express');

const moviesRouter = express.Router();

const {
  getMovies,
  deleteMovie,
  createMovie,
} = require('../controllers/movie');

const {
  movieIdValidation,
  movieCreationValidation,
} = require('../middlewares/validation/movie-validation');

moviesRouter.get('/', getMovies);
moviesRouter.post('/', movieCreationValidation, createMovie);
moviesRouter.delete('/:movieId', movieIdValidation, deleteMovie);

module.exports = moviesRouter;
