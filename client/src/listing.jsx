import React from 'react';
import PropTypes from 'prop-types';

const Listing = (props) => (
  <div>this is a listing</div>
);

Listing.propTypes = {
  info: PropTypes.object.isRequired,
};

export default Listing;