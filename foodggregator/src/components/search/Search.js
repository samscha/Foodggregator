import React, { Component } from 'react';

class Search extends Component {
  state = {
    query: '',
    location: '',
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
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

        <div className="SearchButton">&#8629;</div>
      </div>
    );
  }
}

export default Search;
