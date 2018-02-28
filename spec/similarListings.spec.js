import React from 'react';
import { shallow, mount, render } from 'enzyme'; 
import { shallowToJson } from 'enzyme-to-json';

import SimilarListings from '../client/src/similarListings';
import Listing from '../client/src/listing';

describe('Similar Listings', () => {
  const listing = {
    "id":199,
    "url":"mockUrl",
    "title":"nostrum laboriosam in rerum officiis",
    "type":"Shared Room",
    "numBeds":2,
    "price":810,
    "numRatings":965,
    "avgStars":0.5,
    "thumbnailImage":"mockImageUrl"
  };
  const listings = new Array(4).fill(listing);
  const shallowWrapper = shallow(<SimilarListings listings={listings} />);

  test('renders correctly', () => {
    expect(shallowToJson(shallowWrapper)).toMatchSnapshot();
  })

  test('renders three Listing components', () => {
    expect(shallowWrapper.find(Listing).length).toBe(3);
  }); 
});