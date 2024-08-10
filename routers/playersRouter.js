const {Router} = require('express');
const {playersController} = require('../controllers/playersController.js');

const playersRouter = new Router(); 


playersRouter.post('/addPlayer', playersController.addPlayer);

module.exports = playersRouter;
