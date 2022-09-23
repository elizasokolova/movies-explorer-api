const express = require('express');

const crashTestRouter = express.Router();

crashTestRouter.get('', () => setTimeout(() => {
  throw new Error('Сервер сейчас упадёт!');
}, 0));

module.exports = crashTestRouter;
