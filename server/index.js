const express = require('express')
const mysqlConfig = require ('../config.js');
require('dotenv').config();

const app = express()
const port = 8080
const HOST = '0.0.0.0';

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
