const pgp = require('pg-promise')();
const config = require('./dbConfig');

const db = pgp(config.dbt);

const searchListings = (id) => {
  const query = 'select * from list where ' +
  `numratings>(select numratings from list where id=${id})-0.5 and ` +
  `numratings<(select numratings from list where id=${id})+0.5 and ` +
  `price>(select price from list where id=${id})-200 and ` +
  `price<(select price from list where id=${id})+200 and ` +
  `type=(select type from list where id=${id}) and ` +
  `avgstars=(select avgstars from list where id=${id}) limit 7;`;
  console.log('Complex query search');

  return db.any(query)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports.searchListings = searchListings;
