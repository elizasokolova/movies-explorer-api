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
} = require('../middlewares/validation');

moviesRouter.get('/', getMovies);
moviesRouter.post('/', movieCreationValidation, createMovie);
moviesRouter.delete('/:id', movieIdValidation, deleteMovie);

module.exports = moviesRouter;
