require('dotenv').config(); 
const express = require('express');
const app = express();

const playersRouter = require('./routers/playersRouter');


app.use(express.json());


app.use('/api/players', playersRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
