const express = require("express");
const fs = require('fs');

const port = 1111;
const app = express();

app.use(express.static('public'));

app.get('/', function (req, res) {
  const template = fs.readFileSync('./templates/index.html', 'utf8');
  res.send(template);
});

app.listen(port, () => console.log(`The server is listening at http://localhost:${port}`));
