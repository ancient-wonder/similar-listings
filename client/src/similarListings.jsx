import React from 'react';
import PropTypes from 'prop-types';
import Promise from 'bluebird';
import axios from 'axios';
import Listing from './listing';
import './styles/similarListings.scss';

const HOST = process.env.HOST;
const PORT = process.env.PORT;

class SimilarListings extends React.Component {
  constructor(props) {
    super(props);

    this.statics = {
      id: props.id,
    };

    this.state = {
      listings: [],
      listingsShown: [],
    };
  }

  componentDidMount() {
    this.getListings()
      .then(() => this.setListings());
  }

  getListings() {
    const url = `http://${HOST}:${PORT}/listings/${this.statics.id}/similar_listings`;
    return new Promise((resolve, reject) => {
      axios.get(url)
        .then(({ data }) => this.setState({ listings: data }))
        .then(() => resolve())
        .catch((error) => {
          reject(error);
        });
    });
  }

  setListings() {
    this.setState({ listingsShown: this.state.listings.slice(0, 3) });
  }

  renderListing({ id, url, thumbnailimage, title, type, numbeds, price, numratings, avgstars }) {
    this.blah = 'blah';
    const additionalDetails = {
      title,
      type,
      numbeds,
      price,
      numratings,
      avgstars,
      thumbnailimage,
    };

    return (
      <Listing
        key={id}
        id={id}
        url={url}
        thumbnailImage={thumbnailimage}
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
  id: PropTypes.number.isRequired,
};

export default SimilarListings;
