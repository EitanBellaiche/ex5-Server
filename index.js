require('dotenv').config(); 
const express = require('express');
const app = express();

const playersRouter = require('./routers/playersRouter'); 

const port = process.env.PORT || 10000; 


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


app.use('/api/players', playersRouter);


app.use((req, res) => {
    console.error('Path not found:', req.path);
    res.status(400).send('Something is broken!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
