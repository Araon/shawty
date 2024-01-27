//import express module
const express = require('express');
const dotenv = require('dotenv');
const cors = require("cors");
const sequelize = require('./models/dbConnect');
const errorHandler = require('./middleware/errorHandler');
const requestLogger = require('./middleware/requestLogger');


//create express app 
const app = express();
dotenv.config();
app.use(cors());

app.use(express.json());
app.use(errorHandler);
app.use(requestLogger);

sequelize
    .authenticate()
    .then(() => {
        console.log('Successfully connected to DB.');
    })
    .catch((error) => {
        console.error('Unable to connect to DB:', error.message);
        process.exit(1);
    });

const port = process.env.PORT || 4000;

//create a server
app.listen(port, (req, res) => {
    console.log('server listening at port ' + port);
});

const urlRouter = require('./routes')
app.use(urlRouter);