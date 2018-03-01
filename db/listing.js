const mongoose = require('mongoose');
Promise = require('bluebird');
mongoose.Promise = Promise;

mongoose.connect('mongodb://localhost/seabnb');
var db = mongoose.connection;

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

async function getSimilarListings(listingId, callback) {
  try {
    const [{ similarListings }] = await ListingModel.find({ id: listingId });
    callback(null, similarListings);
  } catch(error) {
    callback(error);
  }
}

module.exports.ListingModel = ListingModel;
module.exports.getSimilarListings = Promise.promisify(getSimilarListings);
