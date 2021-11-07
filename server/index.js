const express = require('express');
const router = require('./Router/router.js');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;


app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(router);



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
