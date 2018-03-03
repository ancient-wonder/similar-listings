import listings from '../../db/listing';
import mongoose from 'mongoose';
import Promise from 'bluebird';
mongoose.Promise = Promise;
import testItems from './testData';

describe('DB: Listing model', () => {
  let db, listing;

  async function dropDb() {
    let dbName = db.name;
    if (dbName === 'testdb') {
      await db.dropDatabase();
    } else {
      throw new Error('connected to wrong database in dropDB()');
    }
  }

  beforeAll(() => {
    mongoose.connect('mongodb://localhost/testdb')
    db = mongoose.connection;

    let dbName = db.name;
    if (dbName !== 'testdb') {
      throw new Error('connected to wrong database');
    }
  });

  test('should insert and retrieve multiple items', async function() {
    await listings.insertManyAsync(testItems);
    const expected = [];
    const actual = [];

    for (let item of testItems) {
      let id = item.id;
      let retrieved = await listings.getSimilarListingsAsync(id);

      expected.push(testItems[id].similarListings.map(listing => listing.id))
      actual.push(retrieved.map(listing => listing.id))
    }
    
    expect(expected).toEqual(actual);
  });

  afterAll(async function() {
    try {
      await db.dropCollection('listings');
      console.log('dropped listings collection');
      db.close();
    } catch(error) {
      console.error('error while dropping database', error);
    }
  });

});

