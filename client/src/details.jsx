import React from 'react';
import PropTypes from 'prop-types';
import './styles/details.scss';

const Details = ({type, numBeds, title, price, numRatings, avgStars}) => (
  <div className="similar-listing-details">
    <div className="accommodations">
      <span className="listing-type">{type}</span>
      <span> &#183; </span>
      <span className="num-beds">{numBeds} Beds</span>
    </div>
    <div className="listing-title">
      {title}
    </div>
    <div className="listing-price">
      <span className="price">${price}</span><span className="per-night">per night</span>
    </div>
    <div className="ratings">
      <span className="avg-stars">{avgStars} stars</span>
      <span> &#183; </span>
      <span className="num-ratings">{numRatings} reviews</span>
    </div>
  </div>
);

Details.propTypes = {
  type: PropTypes.string.isRequired,
  numBeds: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  numRatings: PropTypes.number.isRequired,
  avgStars: PropTypes.number, // TODO: require or not require?
};

export default Details;
