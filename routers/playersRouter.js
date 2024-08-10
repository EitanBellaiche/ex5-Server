const { Router } = require('express');
const { playersController } = require('../controllers/playersController.js');

const playersRouter = new Router(); 

playersRouter.get('/', playersController.getPlayers);
playersRouter.post('/add', (req, res, next) => {
    console.log("Received POST request at /api/players/add");
    next();
}, playersController.addPlayer);
playersRouter.delete('/:playerName', playersController.deletePlayer);

module.exports = playersRouter;
