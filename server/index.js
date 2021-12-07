require('dotenv').config()
const express = require('express');
const cors = require('cors')
const router = require('./Router/router.js');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT;

let corsOptions = {
  origin: 'http://localhost:3000/',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'OPTIONS', 'DELETE'],
  allowedHeaders: ['X=Requested-With', 'Authorization', 'content-type', 'Origin', 'X-Auth-Token'],
  credentials: true,
  optionsSuccessStatus: 200
}


app.use(bodyParser.urlencoded());
app.use(bodyParser.json());


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', `http://localhost:8080`);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  next();
});

// app.use(corsOptions)

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', `http://localhost:3000`);
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization', 'Origin', 'X-Auth-Token');
//   next();

// });

app.use(cors());

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
