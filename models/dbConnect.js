const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });

const mongoose = require("mongoose");

//Create and export a function to house the connection:
async function dbConnect() {
  //use mongoose to connect this app to our database on mongoDB using the DB_URL (connection string)
  const url =process.env.DB_URL
  mongoose.connect(
      url,
      {
        useNewUrlParser: true,
      }
  )
  .then(() => {
    console.log("Successfully connected to DB");
  })
  .catch((error) => {
    console.log("Unable to connect to DB");
    console.error(error);
  });
}

module.exports = dbConnect;