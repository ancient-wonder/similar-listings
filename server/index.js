const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const db = require ('../db/listing');

app.use(express.static('client'));
app.use(bodyParser.json());

app.get('/listings/:id/similar_listings', async function({params: {id}}, res) {
  const similarListings = await db.getSimilarListings(id); 
  res.send(similarListings);
});

app.listen(3004, () => console.log('listening on localhost:3004'));