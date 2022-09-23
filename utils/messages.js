const errorMessage = {
  emailError: 'Указанный email уже занят',
  authorizationError: 'Ошибка авторизации',
  unAuthorizationError: 'Необходима авторизация!',
  dataNotCorrect: 'Переданы некорректные данные при обновлении пользователя',
  loginNotCorrect: 'Неправильные почта или пароль',
  dataFilmError: 'Переданы некорректные данные при создании фильма',
  filmDeleteError: 'У вас нет прав для удаления',
  filmDeleted: 'Фильм успешно удален',
  filmNotFound: 'Фильм не найден',
  userNotFound: 'Пользователь не найден',
  wrongRoutError: 'Путь не найден',
  internalServerError: 'Произошла ошибка на сервере',
};

module.exports = {
  errorMessage,
};
