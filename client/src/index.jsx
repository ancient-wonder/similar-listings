import React from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import SimilarListings from './similarListings';
import './styles/app.scss';

const getListingId = (path) => {
  const parts = path.split('/');
  if (parts[1] === 'listings') {
    const id = parseInt(parts[2], 10);
    if (typeof id === 'number' && id >= 0 && id < 200) {
      return id;
    }
  }
  return null;
};

function renderSimilarListings(listingId) {
  const url = `/listings/${listingId}/similar_listings`;
  axios.get(url)
    .then(({ data }) => {
      ReactDom.render(
        <SimilarListings listings={data} />,
        document.getElementById('app'),
      );
    })
    .catch((error) => {
      console.error(error);
    });
}

const listingId = getListingId(window.location.pathname) ||
                  Math.floor(Math.random() * 200);
console.log('listing id shown:', listingId);
renderSimilarListings(listingId);
