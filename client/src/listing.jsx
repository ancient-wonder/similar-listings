import React from 'react';
import PropTypes from 'prop-types';

const Listing = ({info}) => {
  const {
    id,
    url,
    title,
    type,
    numBeds,
    price,
    numRatings,
    avgStars,
    thumbnailImage,
  } = info;

  const additionalDetails = {
    title,
    type,
    numBeds,
    price,
    numRatings,
    avgStars
  };

  return (
  <div className="similar-listing">
    <img src={thumbnailImage} />
    <div className="similar-listing-details">
      put Details component here<br />
      {JSON.stringify(additionalDetails)}<br />
    </div>
  </div>
  )
};

Listing.propTypes = {
  info: PropTypes.object.isRequired,
};

export default Listing;