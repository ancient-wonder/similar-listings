const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const listings = require('../db/listing');

const app = express();

app.use('/listings/:id', express.static('public'));
app.use(express.static('public'));

app.use(bodyParser.json());

app.get('/listings/:id/similar_listings', async ({ params: { id } }, res) => {
  try {
    const similarListings = await listings.getSimilarListingsAsync(id);
    res.send(similarListings);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

mongoose.connect('mongodb://localhost/seabnb');
app.listen(3003, () => console.log('listening on localhost:3003'));
