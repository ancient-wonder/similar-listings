import React from 'react';
import PropTypes from 'prop-types';
import Listing from './listing';

class SimilarListings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listingsShown: props.listings.slice(0, 3), // MVP: only show 3 listings
    };
  }

  render() {
    return (
      <div className="similar-listings">
        <h1>Similar Listings</h1>
        <div className="similar-listings-ribbon">
          {this.state.listingsShown.map(listing => (
            <div>this represents a single listing</div>
          ))}
        </div>
      </div>
    );
  }
}

SimilarListings.propTypes = {
  listings: PropTypes.array.isRequired,
};

export default SimilarListings;