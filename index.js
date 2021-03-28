const fs = require("fs").promises;

createFiles();

async function createFiles() {
  let data = await fs.readFile('./jsonFiles/Estados.json');
  const states = JSON.parse(data);
  
  data = await fs.readFile('./jsonFiles/Cidades.json');
  const cities = JSON.parse(data);

  for (state of states) {
    const stateCities = cities.filter(city => city.Estado === state.ID)
    await fs.writeFile(`./createdFiles/${state.Sigla}.json`, JSON.stringify(stateCities));
  }

  console.log(states);
  console.log(cities);
}

