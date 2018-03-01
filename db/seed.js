const { listings, db } = require('./listing');
const mockData = require('./mock-data');

async function seedDb(data) {
  try {
    const results = await listings.insertManyAsync(data);
    console.log(
      'done seeding database:\n',
      `inserted ${results.length} records`
    );
    db.close();
  } catch(error) {
    console.log(
      'error seeding database\n',
      error
    );
    db.close();
  }
}

seedDb(mockData);
