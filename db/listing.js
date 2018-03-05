const mongoose = require('mongoose');
const Promise = require('bluebird');
mongoose.Promise = Promise;

const similarListingSchema = mongoose.Schema({
  id: Number,
  url: String,
  title: String,
  type: String,
  numBeds: Number,
  price: Number,
  numRatings: Number,
  avgStars: Number,
  thumbnailImage: String,
});

const listingSchema = mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },
  similarListings: [similarListingSchema],
});

const ListingModel = mongoose.model('Listing', listingSchema);

const helpers = Promise.promisifyAll({
  getSimilarListings: async function(listingId, callback) {
    try {
      const [{ similarListings }] = await ListingModel.find({ id: listingId });
      callback(null, similarListings);
    } catch(error) {
      callback(error);
    }
  },
  
  insertMany: async function(data, callback) {
    try {
      const results = await ListingModel.insertMany(data);
      callback(null, results);
    } catch(error) {
      callback(error);
    }
  },
});

module.exports = helpers;
