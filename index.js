require('dotenv').config(); 
const express = require('express');
const cors = require('cors'); 
const app = express();

const playersRouter = require('./routers/playersRouter');


const corsOptions = {
  origin: 'https://ex5-server.onrender.com', 
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions)); 

app.use(express.json());

app.use('/api/players', playersRouter);

const port = process.env.PORT || 10000; 
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
