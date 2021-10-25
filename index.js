let mysql = require('mysql');
let connection = mysql.createConnection({
  host: '0.0.0.0',
  password: 'BLUEZONE',
  database: 'bluezone'
})

connection.connect();