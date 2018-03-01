const express = require('express');
const bodyParser = require('body-parser');
const {listings, db} = require ('../db/listing');

const app = express();

app.use(express.static('client'));
app.use(bodyParser.json());

app.get('/listings/:id/similar_listings', async function({params: {id}}, res) {
  try {
    const similarListings = await listings.getSimilarListingsAsync(id); 
    res.send(similarListings);
  } catch(error) {
    console.error(error);
    res.status(500).send(error);
  }
});

app.listen(3004, () => console.log('listening on localhost:3004'));