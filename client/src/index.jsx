import React from 'react';
import ReactDom from 'react-dom';
import SimilarListings from './similarListings';
import './styles/app.scss';

// in real life we'll want to make a GET request to the server
// to get the listings data
import listings from '../dummyData';

ReactDom.render(
  <SimilarListings listings={listings} />,
  document.getElementById('app')
);
