const { userUpdateInfoValidation } = require('./user-validation');
const {
  userCreateValidation,
  loginValidation,
} = require('./auth-validation');
const {
  movieCreationValidation,
  movieIdValidation,
} = require('./movie-validation');

module.exports = {
  movieCreationValidation,
  movieIdValidation,
  userUpdateInfoValidation,
  loginValidation,
  userCreateValidation,
};
