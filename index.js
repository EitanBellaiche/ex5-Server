require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs');
const http = require('http');
const app = express();
const server = http.createServer(app);


const port = process.env.PORT || 8081;
const {playersRouter} = require('./routers/players.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'Access-Control-Allow-Methods': "GET, POST, PUT, DELETE",
        'Content-Type': 'application/json'
    });
    next();
});
const imagesDir = path.join(__dirname, 'images');
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
} 

app.use('/api/players', playersRouter);


app.use((req, res) => {
    console.error('Path not found:', req.path);
    res.status(400).send('something is broken!');
});
server.listen(port, () => {
});