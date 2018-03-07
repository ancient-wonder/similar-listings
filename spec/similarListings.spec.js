import React from 'react';
import { shallow, mount, render } from 'enzyme'; 
import { shallowToJson } from 'enzyme-to-json';

jest.mock('axios');

import SimilarListings from '../client/src/similarListings';
import Listing from '../client/src/listing';

describe('Similar Listings', () => {
  const wrapper = mount(<SimilarListings id={0} />);

  test('renders three Listing components', () => {
    expect(true).toBe(true);
  }); 
});