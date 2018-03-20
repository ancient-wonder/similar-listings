const pgp = require('pg-promise')();
const queries = require('./SQLscript/postgres');
const config = require('./dbConfig');

const generateData = require('../generateData');

const dataSize = 10000000;

const db = pgp(config.db);
const dbt = pgp(config.dbt);

const insertList = async (start) => {
  const data = [];

  for (let i = start; i < start + 1000; i += 1) {
    data.push(generateData.createObj(i, dataSize));
  }

  const cs = new pgp.helpers.ColumnSet(
    ['id', 'url', 'title', 'type', 'numbeds', 'price', 'numratings', 'avgstars', 'thumbnailimage'],
    { table: 'list' },
  );

  const query = pgp.helpers.insert(data, cs);

  await dbt.none(query)
    .then(() => console.log(`list success stored at ${start + 1000}!`))
    .catch(error => console.log(error));
};

const createListTB = () => {
  dbt.any(queries.createTB)
    .then(() => console.log('table list successfully created'))
    .then(async () => {
      for (let i = 0; i < dataSize; i += 1000) {
        await insertList(i);
      }
    })
    .then(async () => {
      await dbt.any(queries.createIndex)
        .catch(error => console.log(error))
    })
    .then(() => pgp.end())
    .catch(error => console.log(error));
};

const createDB = async () => {
  await db.any(queries.dropDB)
    .then(async () => {
      await db.any(queries.createDB);
      console.log('DB successfully created');
    })
    .catch(error => console.log(error));

  createListTB();
};

createDB();
