let mysql = require('mysql');
let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'host',
  database: 'bluezone'
})

connection.connect();

module.exports = connection;