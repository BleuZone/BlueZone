require('dotenv').config()
const express = require('express');
const router = require('./Router/router.js');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT;


app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', `http://localhost:3001`);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  next();
});

app.use((req, res, next) => {
  if (req.headers.authorization === process.env.APIKEY) {
    next()
  } else {
    res.status(403).send({error: 'Invalid API Key'})
  }
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(router);



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
