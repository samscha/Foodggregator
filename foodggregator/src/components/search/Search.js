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
    this.props.fetchResults(this.state, this.props.history);
  };

  checkIfReturn = e =>
    e.keyCode === 13 ? this.searchButtonClickedHandler() : null;

  render() {
    return (
      <div className="Search">
        <div className="SearchIsNotFetchingResults">
          <input
            className="SearchQuery"
            type="text"
            name="query"
            value={this.state.query}
            placeholder="Find..."
            onChange={this.handleInputChange}
            onKeyUp={this.checkIfReturn}
            disabled={this.props.isFetchingResults}
          />

          <div className="SearchSeparator" />

          <input
            className="SearchLocation"
            type="text"
            name="location"
            value={this.state.location}
            placeholder="In..."
            onChange={this.handleInputChange}
            onKeyUp={this.checkIfReturn}
            disabled={this.props.isFetchingResults}
          />

          <div className="SearchSeparator" />

          <div
            className="SearchButton"
            onClick={this.searchButtonClickedHandler}
            style={
              this.props.isFetchingResults
                ? {
                    background: 'white',
                    color: 'black',
                    opacity: '0.2',
                    cursor: 'not-allowed',
                  }
                : null
            }
          >
            &#8629;
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isFetchingResults: state.isFetchingResults,
  };
};

export default connect(mapStateToProps, { fetchResults })(Search);
