import { throws } from 'assert';
import express from 'express';
const app = express();
import { appendFile, read, readFile, write, writeFile } from 'fs';

const port = 3000;

let states = [];
let cities = [];

async function readAndCreate() {
  await readCities();
  await readStates();
  console.log(states);
  console.log(cities);
}

async function readCities () {
  readFile('./jsonFiles/Cidades.json', (err, data) => {
    if (err) throw err;
    cities =  JSON.parse(data);
  });
}

async function readStates() {
  readFile('./jsonFiles/Estados.json', (err, data) => {
    if (err) throw err;
    states = await JSON.parse(data);
  });
}

app.listen(port, () => {
  console.log (`Example app listening at http://localhost:${port}`);
})

readAndCreate();