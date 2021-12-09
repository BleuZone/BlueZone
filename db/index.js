require('dotenv').config({path: '../.env'})


// console.log('DB_HOST: ', process.env.DB_HOST, 'DB_USER: ', process.env.DB_USER, 'DB_PASSWORD: ', process.env.DB_PASSWORD, 'DB_DATABASE: ', process.env.DB_DATABASE, 'DB_PORT: ', process.env.DB_PORT);

let mysql = require('mysql');
let connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'PASSWORD',
  database: process.env.DB_DATABASE || 'BlueZone',
  port: process.env.DB_PORT
})

// MYSQLDB_USER=root
// MYSQLDB_ROOT_PASSWORD=password
// MYSQLDB_DATABASE=BlueZone
// MYSQLDB_LOCAL_PORT=3307
// MYSQLDB_DOCKER_PORT=3306

connection.connect();

module.exports = connection;
