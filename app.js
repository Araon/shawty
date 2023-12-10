//import express module
const express = require('express');
const dotenv = require('dotenv');
const cors = require("cors");
const dbConnect = require('./models/dbConnect');



//create express app 
const app = express();
dotenv.config();
app.use(cors());

app.use(express.json());
dbConnect();  

const port = process.env.PORT || 4000;

//create a server
app.listen(port, (req, res) => {
    console.log('server listening at port '+ port);
});

const urlRouter = require('./routes')
app.use(urlRouter);