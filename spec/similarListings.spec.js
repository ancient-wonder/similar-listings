import React from 'react';
import { shallow, mount, render } from 'enzyme'; 

import SimilarListings from '../client/src/similarListings';

test('renders component with props', () => {
  const wrapper = shallow(<SimilarListings testProp="foobar" />);
  expect(wrapper.prop('testProp')).toBe('foobar');
});