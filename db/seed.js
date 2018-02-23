const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const ListingModel = require('./listing');
const data = require('./mock-data');

mongoose.connect('mongodb://localhost/seabnb');
var db = mongoose.connection;

db.on('error', error => console.log('connection error:', error));
db.once('open', () => {
  ListingModel.insertMany(data)
  .then(results => console.log('done seeding database'))
  .catch(error => console.error(error));
});