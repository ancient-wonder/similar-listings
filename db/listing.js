const mongoose = require('mongoose');

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
})

const listingSchema = mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },
  similarListings: [similarListingSchema],
});

const ListingModel = mongoose.model('Listing', listingSchema);

module.exports = ListingModel;


// mongoose.connect('mongodb://localhost/seabnb');

// var db = mongoose.connection;

// db.on('error', error => console.log('connection error:', error));
// db.once('open', () => {

// })