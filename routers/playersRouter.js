const express = require('express');
const router = express.Router();
const { playersController } = require('../controllers/playersController'); 


router.post('/add', (req, res, next) => {
    console.log('Request received at /add'); 
    next();
}, playersController.addPlayer);

module.exports = router;
