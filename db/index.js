require('dotenv').config({path: '../.env'})
let mysql = require('mysql');
let connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'PASSWORD',
  database: process.env.DB_DATABASE || 'BlueZone'
})

connection.connect();

module.exports = connection;
