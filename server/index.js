const express = require('express');
const router = require('./Router/router.js');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;


app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', `http://localhost:3000`);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(router);



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
