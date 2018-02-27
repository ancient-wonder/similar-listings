import React from 'react';
import PropTypes from 'prop-types';

class SimilarListings extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div testProp={this.props.testProp}>This is the Similar Listings component</div>
    );
  }
}

SimilarListings.propTypes = {
  testProp: PropTypes.string.isRequired,
};

export default SimilarListings;