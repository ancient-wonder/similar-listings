const faker = require('faker');

const settings = {
  dataSize: 1000,
  options: ['Entire Place', 'Shared Room', 'Private Room'],
  thumbnailImage: {
    width: 316,
    height: 210,
  },
};

const getRandomNum = (min, max, decimalPlaces) => {
  decimalPlaces = decimalPlaces || 0;
  const multiplier = Math.pow(10, decimalPlaces);
  const minAdj = min * multiplier;
  const maxAdj = ((max - 1) * multiplier) + 1;

  const randomNumAdj = Math.floor(Math.random() * (maxAdj - minAdj)) + minAdj;
  return randomNumAdj / multiplier;
};

const getRandomList = (index, dataSize) => {
  const obj = {};
  const result = [];
  for (let i = 0; i < 7; i += 1) {
    const num = Math.floor(Math.random() * dataSize);
    if (result.includes(num)) {
      i -= 1;
    } else {
      result.push(num);
    }
  }

  obj.id = index;
  obj.listings = JSON.stringify(result);

  return obj;
};

const createObj = (id) => {
  const obj = {};
  obj.id = id;
  obj.url = `/listings/${id}`;
  obj.title = faker.lorem.words();
  obj.type = settings.options[Math.floor(Math.random() * (settings.options.length - 1))];
  obj.numbeds = getRandomNum(1, 8);
  obj.price = getRandomNum(50, 1000, 2);
  obj.numratings = getRandomNum(1, 5, 1);
  obj.avgstars = getRandomNum(1, 5);
  obj.thumbnailimage = 'https://picsum.photos/' +
                  `${settings.thumbnailImage.width}/` +
                  `${settings.thumbnailImage.height}` +
                  `?image=${id}`;

  return obj;
};

module.exports.createObj = createObj;
module.exports.getRandomList = getRandomList;
