let mysql = require('mysql');
let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'PASSWORD',
  database: 'BlueZone'
})

connection.connect();

module.exports = connection;