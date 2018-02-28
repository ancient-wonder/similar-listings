import React from 'react';
import { shallow, mount, render } from 'enzyme'; 
import { shallowToJson } from 'enzyme-to-json';

import Details from '../client/src/details';

describe('Details', () => {
  const shallowWrapper = shallow(
    <Details
      type="mockType"
      numBeds={3}
      title="mockTitle"
      price={257}
      numRatings={425}
      avgStars={3.6}
    />
  );

  test('creates a div with class "accommodations"', () => {
    expect(shallowWrapper.find('div.accommodations').length).toBe(1);
  });

  test('creates a div with class "listing-title"', () => {
    expect(shallowWrapper.find('div.listing-title').length).toBe(1);
  });

  test('creates a div with class "listing-price"', () => {
    expect(shallowWrapper.find('div.listing-price').length).toBe(1);
  });

  test('creates a div with class "ratings"', () => {
    expect(shallowWrapper.find('div.ratings').length).toBe(1);
  });
});