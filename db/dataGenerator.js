var faker = require('faker');

// console.log(faker.name.findName());
// console.log(faker.internet.email());
// console.dir(faker.helpers.createCard());

var obj = {
  id: 1,
  url: `/listings/1`,
  title: faker.lorem.words(5),
  type: 'Entire Apartment',
  numBeds: 3,
  price: 204,
  numRatings: 287,
  avgStars: 3.4,
  coverImage: `https://picsum.photos/316/210?image=${1}`,
};

console.log(JSON.stringify(obj));