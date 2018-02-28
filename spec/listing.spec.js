import React from 'react';
import { shallow, mount, render } from 'enzyme'; 
import { shallowToJson } from 'enzyme-to-json';

import Listing from '../client/src/listing';
import Details from '../client/src/details';

describe('Listing', () => {
  const id = 199;
  const url = "mockUrl";
  const thumbnailImage = "mockImageUrl";
  const additionalDetails = {
    "title":"nostrum laboriosam in rerum officiis",
    "type":"Shared Room",
    "numBeds":2,
    "price":810,
    "numRatings":965,
    "avgStars":0.5,
  };

  const shallowWrapper = shallow(
    <Listing
      id={id}
      url={url}
      thumbnailImage={thumbnailImage}
      additionalDetails={additionalDetails}
    />
  );

  test('renders correctly', () => {
    expect(shallowToJson(shallowWrapper)).toMatchSnapshot();
  });

  test('renders one <img> element', () => {
    expect(shallowWrapper.find('img').length).toBe(1);
  })

  test('renders one Details component', () => {
    expect(shallowWrapper.find(Details).length).toBe(1);
  })
})
