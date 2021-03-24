const express = require('express');
const app = express();
const fs = require('fs');

const port = 3000;

app.get('/', (req, res) => {
  res.send('Hi Johnny');
})

fs.appendFile('teste.txt', 'hahahah', (err) => {
  if (err) throw err;
  console.log('Saved!')
})

app.listen(port, () => {
  console.log (`Example app listening at http://localhost:${port}`);
})