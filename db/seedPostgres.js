const pgp = require('pg-promise')();

const db = pgp({
  database: 'postgres',
  port: 5432,
});

const dbt = pgp({
  database: 'similarlistings',
  port: 5432,
});

let createTB = () => {
  dbt.none('CREATE TABLE Listings(' +
    'id INTEGER PRIMARY KEY,' +
    'url TEXT,' +
    'title TEXT,' +
    'type TEXT,' +
    'numBeds INTEGER,' +
    'price INTEGER,' +
    'numRatings DOUBLE PRECISION,' +
    'avgStars DOUBLE PRECISION,' +
    'thumbnailImage TEXT,' +
    'list TEXT);')
    .then((data) => {
      console.log('successfully created');
    })
    .catch((error) => {
      console.log(error);
    });
};

let createDB = () => {
  db.none('CREATE DATABASE similarlistings')
    .then((data) => {
      console.log('successfully created');
    })
    .then(() => {
      createTB();
    })
    .catch((error) => {
      console.log(error);
    });
};

createDB();
