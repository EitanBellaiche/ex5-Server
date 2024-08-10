const express = require('express');
const router = express.Router();
const { playersController } = require('../controllers/playersController');


router.post('/add', playersController.addPlayer);

module.exports = router;
