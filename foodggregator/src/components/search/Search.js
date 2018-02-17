import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchResults } from '../../actions';

class Search extends Component {
  state = {
    query: '',
    location: '',
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  searchButtonClickedHandler = _ => {
    this.props.fetchResults(this.state);
  };

  render() {
    return (
      <div className="Search">
        <input
          className="SearchQuery"
          type="text"
          name="query"
          value={this.state.query}
          placeholder="Find..."
          onChange={this.handleInputChange}
        />

        <div className="SearchSeparator" />

        <input
          className="SearchLocation"
          type="text"
          name="location"
          value={this.state.location}
          placeholder="In..."
          onChange={this.handleInputChange}
        />

        <div className="SearchSeparator" />

        <div className="SearchButton" onClick={this.searchButtonClickedHandler}>
          &#8629;
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    //
  };
};

export default connect(mapStateToProps, { fetchResults })(Search);
