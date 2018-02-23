const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/seabnb');

var db = mongoose.connection;

var listingSchema = mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },

  similarListings: [{
    id: Number,
    url: String,
    title: String,
    type: String,
    numBeds: Number,
    price: Number,
    numRatings: Number,
    avgStars: Number,
    thumbnailImage: String,
  }],
});
