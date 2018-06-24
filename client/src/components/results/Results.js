import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../header/Header';
import Separator from '../app/Separator';
import Result from './Result';
import NoResults from './NoResults';

class Results extends Component {
  state = {
    search: {},
    geocode: [],
    results: [],
  };

  componentDidMount() {
    this.setState({
      search: this.props.search,
      geocode: this.props.geocode,
      results: this.props.results,
    });
  }

  renderAddress = _ => {
    return this.state.geocode[0].results[0].address_components[0].long_name;
    // return this.state.geocode[0].address_components[2].long_name.toLowerCase();
  };

  render() {
    return (
      <div className="Results">
        <Header />

        <Separator />

        <div className="ResultsSearch">
          <div className="ResultsSearch__query">
            {this.state.search.query
              ? this.state.search.query.toLowerCase()
              : null}
          </div>

          <div className="ResultsSearch__separator">
            {this.state.search.query ? '|' : null}
          </div>

          <div className="ResultsSearch__location">
            {/* {this.state.geocode.length === 1 ? this.renderAddress() : null} */}
            {this.state.search.location ? this.state.search.location : null}
          </div>
        </div>

        {this.state.results.map(place => {
          return (
            <div className="ResultsContainer" key={place.id}>
              <Result place={place} geocode={this.state.geocode} />
            </div>
          );
        })}

        <Separator />

        {this.state.results.length === 0 ? <NoResults /> : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    results: state.results,
    search: state.search,
    geocode: state.geocode,
  };
};

export default connect(mapStateToProps, {})(Results);
