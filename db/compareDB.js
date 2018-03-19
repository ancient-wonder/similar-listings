const pgp = require('pg-promise')();
const cassandra = require('cassandra-driver');

let postgresStartTime;
let cassandraStartTime;
let postgresEndTime;
let cassandraEndTime;

const dbp = pgp({
  database: 'similarlistings',
  port: 5432,
});

const dbc = new cassandra.Client({ contactPoints: ['127.0.0.1'] });

const postgresSearch = (query) => {
  postgresStartTime = new Date().getTime();
  dbp.any(query)
    .then((data) => {
      postgresEndTime = new Date().getTime();
      console.log(`postgresDB time cost: ${postgresEndTime - postgresStartTime} ms`);
    })
    .then(() => {
      pgp.end()
    })
    .catch((error) => {
      console.log(error);
    });
};

const cassandraSearch = (query) => {
  cassandraStartTime = new Date().getTime();
  dbc.execute(query)
    .then((data) => {
      // console.log(data);
      cassandraEndTime = new Date().getTime();
      console.log(`cassandraDB time cost: ${cassandraEndTime - cassandraStartTime} ms`);
    })
    .then(() => {
      dbc.shutdown();
    })
    .catch((error) => {
      console.log(error);
    });
};

const compareSingleSearch = async () => {
  const postgresQuery = 'SELECT * FROM list WHERE id=4999;';
  const cassandraQuery = 'SELECT * FROM similarlist.list WHERE id=4999;';
  console.log('Single query search');
  await postgresSearch(postgresQuery);
  await cassandraSearch(cassandraQuery);
};

const compareComplexSearch = async () => {
  const postgresQuery = 'select * from list where ' +
  'numratings>(select numratings from list where id=1)-0.5 and ' +
  'numratings<(select numratings from list where id=1)+0.5 and ' +
  'avgstars=(select avgstars from list where id=1) limit 7;';
  console.log('Complex query search');
  await postgresSearch(postgresQuery);
  // await cassandraSearch(cassandraQuery);
};

const complexCassandraSearch = async () => {
  let numratings;
  let avgstars;
  cassandraStartTime = new Date().getTime();
  const cassandraNumQuery = 'SELECT numratings FROM similarlist.list WHERE id=1;';
  await dbc.execute(cassandraNumQuery)
    .then((data) => { numratings = data.rows[0].numratings; });
  const cassandraAvgQuery = 'SELECT avgstars FROM similarlist.list WHERE id=1;';
  await dbc.execute(cassandraAvgQuery)
    .then((data) => { avgstars = data.rows[0].avgstars; });

  const cassandraQuery = 'select * from similarlist.list where ' +
  `numratings>${numratings - 0.5} and ` +
  `numratings<${numratings + 0.5} and ` +
  `avgstars=${avgstars} limit 7 allow filtering;`;
  await dbc.execute(cassandraQuery)
    .then((data) => {
      cassandraEndTime = new Date().getTime();
      console.log(`cassandraDB time cost: ${cassandraEndTime - cassandraStartTime} ms`);
    })
    .then(() => {
      dbc.shutdown();
    });
};

compareSingleSearch();
compareComplexSearch();
complexCassandraSearch();
