const cassandra = require('cassandra-driver');

const generateData = require('./generateData');

const dataSize = 10000000;

let client = new cassandra.Client({ contactPoints: ['127.0.0.1'] });

const insertList = async (start) => {
  const data = [];
  for (let i = start; i < start + 50; i += 1) {
    data.push(generateData.createCassandra(i, dataSize));
  }

  const query = 'INSERT INTO list (id, avgstars, numbeds, numratings, price, similarlist, thumbnailimage, title, type, url) ' +
  'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const queries = [];
  for (let i = 0; i < data.length; i += 1) {
    const obj = {};
    obj.query = query;
    obj.params = data[i];
    queries.push(obj);
  }

  await client.batch(queries, { prepare: true })
    .then(() => {
      console.log(`saved at ${start + 50}!`);
    })
    .catch((error) => {
      console.log(error);
    });
};

const createTB = () => {
  client = new cassandra.Client({ contactPoints: ['127.0.0.1'], keyspace: 'similarlist' });

  const createTableQuery = 'CREATE TABLE list(' +
  'id INT PRIMARY KEY,' +
  'url TEXT,' +
  'title TEXT,' +
  'type TEXT,' +
  'numbeds INT,' +
  'price DOUBLE,' +
  'numratings DOUBLE,' +
  'avgstars DOUBLE,' +
  'thumbnailimage TEXT, ' +
  'similarlist LIST<INT>);';
  client.execute(createTableQuery)
    .then(() => console.log('Table created!'))
    .then(async () => {
      for (let i = 0; i < dataSize; i += 50) {
        await insertList(i);
      }
      console.log('Done la!');
    })
    .then(() => client.shutdown());
};

const createKeyspaceQuery = "CREATE KEYSPACE similarlist WITH replication = {'class':'SimpleStrategy', 'replication_factor' : 1};";
client.execute(createKeyspaceQuery)
  .then(() => console.log('Keyspace created!'))
  .then(() => client.shutdown())
  .then(() => createTB());
