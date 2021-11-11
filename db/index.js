/* eslint-disable no-plusplus */
const fs = require('fs');

// eslint-disable-next-line import/no-extraneous-dependencies
const faker = require('faker/locale/es');

faker.locale = 'es';

const datasets = [];
const networks = [];

for (let i = 1; i <= 20; i++) {
  const tags = [];
  for (let i = 1; i <= 3; i++) {
    tags.push(faker.lorem.word());
  }
  datasets.push({
    title: `${faker.name.title()}`,
    tags,
    id: i,
    size: null,
  });
}

const data = {
  datasets,
  networks,
};

// eslint-disable-next-line consistent-return
fs.writeFile('db/db.json', JSON.stringify(data, null, 2), (err) => {
  if (err) return console.log(err);
  console.log('Created database at db/db.json');
});
