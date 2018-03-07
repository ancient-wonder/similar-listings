const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const listings = require('../db/listing');

const app = express();

const PUBLIC_DIR = path.join(__dirname, '../public');

app.use(morgan('dev'));
app.use('/listings/:id', express.static(PUBLIC_DIR));
app.use(express.static(PUBLIC_DIR));
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
