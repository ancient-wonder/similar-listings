const pgp = require('pg-promise')();

const generateData = require('./generateData');

const dataSize = 10000000;

const db = pgp({
  database: 'postgres',
  port: 5432,
});

const dbt = pgp({
  database: 'similarlistings',
  port: 5432,
});

const insertList = (start) => {
  const data = [];
  for (let i = start; i < start + 1000; i += 1) {
    data.push(generateData.createObj(i));
  }
  const cs = new pgp.helpers.ColumnSet(
    ['id', 'url', 'title', 'type', 'numbeds', 'price', 'numratings', 'avgstars', 'thumbnailimage'],
    { table: 'list' },
  );

  const query = pgp.helpers.insert(data, cs);

  return dbt.none(query)
    .then((data) => {
      console.log(`list success stored at ${start + 1000}!`);
    })
    .catch((error) => {
      console.log(error);
    });
};

const insertSimilarList = (start) => {
  const data = [];
  for (let i = start; i < start + 1000; i += 1) {
    data.push(generateData.getRandomList(i, dataSize));
  }
  const cs = new pgp.helpers.ColumnSet(
    ['id', 'listings'],
    { table: 'similarlist' },
  );

  const query = pgp.helpers.insert(data, cs);

  return dbt.none(query)
    .then((data) => {
      console.log(`similarlist success stored at ${start + 1000}!`);
    })
    .catch((error) => {
      console.log(error);
    });
};

const createListTB = () => {
  dbt.none('CREATE TABLE list(' +
    'id INTEGER PRIMARY KEY,' +
    'url TEXT,' +
    'title TEXT,' +
    'type TEXT,' +
    'numbeds INTEGER,' +
    'price INTEGER,' +
    'numratings DOUBLE PRECISION,' +
    'avgstars DOUBLE PRECISION,' +
    'thumbnailimage TEXT);')
    .then((data) => {
      console.log('list table successfully created');
    })
    .then(async () => {
      for (let i = 0; i < dataSize; i += 1000) {
        await insertList(i);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const createSimilarListTB = () => {
  dbt.none('CREATE TABLE similarlist(' +
    'id INTEGER PRIMARY KEY,' +
    'listings TEXT);')
    .then((data) => {
      console.log('similarlist table successfully created');
    })
    .then(async () => {
      for (let i = 0; i < dataSize; i += 1000) {
        await insertSimilarList(i);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const createDB = () => {
  db.none('CREATE DATABASE similarlistings')
    .then((data) => {
      console.log('successfully created');
    })
    .then(() => {
      createListTB();
    })
    .then(() => {
      createSimilarListTB();
    })
    .catch((error) => {
      console.log(error);
    });
};

createDB();
