import React from 'react';
import PropTypes from 'prop-types';
import Listing from './listing';
import './styles/similarListings.scss';

class SimilarListings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listingsShown: props.listings.slice(0, 3), // MVP: only show 3 listings
    };
  }

  renderListing({id, url, thumbnailImage, title, type, numBeds, price, numRatings, avgStars}) {
    const additionalDetails = {
      title,
      type,
      numBeds,
      price,
      numRatings,
      avgStars,
      thumbnailImage
    };
    
    return (
      <Listing
        key={id}
        id={id}
        url={url}
        thumbnailImage={thumbnailImage}
        additionalDetails={additionalDetails}
      />
    );
  }

  render() {
    return (
      <div className="similar-listings">
        <h1>Similar Listings</h1>
        <div className="similar-listings-ribbon">
          {this.state.listingsShown.map(listing => this.renderListing(listing))}
        </div>
      </div>
    );
  }
}

SimilarListings.propTypes = {
  listings: PropTypes.array.isRequired,
};

export default SimilarListings;