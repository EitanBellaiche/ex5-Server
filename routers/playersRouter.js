const { Router } = require('express');
const { playersController } = require('../controllers/playersController.js');

const playersRouter = new Router();

playersRouter.get('/', playersController.getPlayersData);

module.exports = { playersRouter };