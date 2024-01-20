// dbConnect.js
const Sequelize = require('sequelize');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });



const sequelize = new Sequelize(process.env.MYSQL_DB_NAME, process.env.MYSQL_DB_USER, process.env.MYSQL_DB_PASSWORD, {
  host: process.env.MYSQL_DB_HOST,
  port: 3306,
  dialect: 'mysql',
});


module.exports = sequelize;