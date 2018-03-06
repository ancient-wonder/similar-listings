import mongoose from 'mongoose';
import Promise from 'bluebird';
import testItems from './testData';
import listings from '../../db/listing';

mongoose.Promise = Promise;


describe('DB: Listing model', () => {
  let db;

  beforeAll(() => {
    mongoose.connect('mongodb://localhost/testdb');
    db = mongoose.connection;

    const dbName = db.name;
    if (dbName !== 'testdb') {
      throw new Error('connected to wrong database');
    }
  });

  it('should insert and retrieve multiple items', async () => {
    await listings.insertMany(testItems);
    const expected = [];
    const actual = [];

    await testItems.forEach(async (item) => {
      const { id } = item;
      const retrieved = await listings.getSimilarListingsAsync(id);

      expected.push(testItems[id].similarListings.map(listing => listing.id));
      actual.push(retrieved.map(listing => listing.id));
    });

    expect(expected).toEqual(actual);
  });

  afterAll(async () => {
    try {
      await db.dropCollection('listings');
      db.close();
    } catch (error) {
      console.error('error while dropping database', error);
    }
  });
});
