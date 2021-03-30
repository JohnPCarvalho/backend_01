const fs = require("fs").promises;

init();

async function init() {
  await createFiles();
  await getStatesWithMoreOrLessCities(true);
  await getStatesWithMoreOrLessCities(false);
}

async function createFiles() {
  let data = await fs.readFile('./jsonFiles/Estados.json');
  const states = JSON.parse(data);
  
  data = await fs.readFile('./jsonFiles/Cidades.json');
  const cities = JSON.parse(data);

  for (state of states) {
    const stateCities = cities.filter(city => city.Estado === state.ID)
    await fs.writeFile(`./createdFiles/${state.Sigla}.json`, JSON.stringify(stateCities));
  }
}

async function getCitiesCount(uf) {
  let data = await fs.readFile(`./createdFiles/${uf}.json`);
  const cities = JSON.parse(data);
  return cities.length;
}

async function getStatesWithMoreOrLessCities(more) {
  const states = JSON.parse(await fs.readFile("./jsonFiles/Estados.json"));
  const list = [];

  for (state of states) {
    const count = await getCitiesCount(state.Sigla);
    list.push({uf: state.Sigla, count: count});
  }

  list.sort((a, b) => {
    if (a.count < b.count) return 1;
    else if (a.count > b.count) return -1;
    else return 0;
  })

  const result = [];

  if (more) {
    list.slice(0, 5).forEach(item => result.push(item.uf + " - " + item.count));
  } else {
    list.slice(-5).forEach(item => result.push(item.uf + " - " + item.count));
  }
  

  console.log(result)
}