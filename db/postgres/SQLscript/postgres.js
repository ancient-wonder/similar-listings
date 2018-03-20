const path = require('path');
const QueryFile = require('pg-promise').QueryFile;

const sql = (file) => {
  const fullpath = path.join(__dirname, file);

  const options = { minify: true };

  const qf = new QueryFile(fullpath, options);

  return qf;
};

module.exports = {
  dropDB: sql('./dropDB.sql'),
  createDB: sql('./createDB.sql'),
  createTB: sql('./createTB.sql'),
  createIndex: sql('./createIndex.sql'),
};
