import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../header/Header';
import Separator from '../app/Separator';
import Result from './Result';
import NoResults from './NoResults';

class Results extends Component {
  state = {
    search: {},
    results: [],
  };

  componentDidMount() {
    this.setState({ search: this.props.search, results: this.props.results });
  }

  // componentWillReceiveProps(nextProps) {
  //   if (this.props.results.length !== nextProps.results)
  //     this.setState({ results: nextProps.results });
  // }

  componentWillReceiveProps(nextProps) {
    // if (this.props.results.length !== nextProps.results.length)
    //   this.setState({ results: nextProps.results });
    // if (this.props.search !== nextProps.search)
    //   this.setState({ search: nextProps.search });
  }

  render() {
    return (
      <div className="Results">
        <Header />

        <Separator />

        <div className="ResultsSearch">
          {/* {Object.keys(this.state.search).length === 0
            ? null
            :  */}
          <div className="ResultsSearch__query">
            {this.state.search.query
              ? this.state.search.query.toLowerCase()
              : null}
          </div>

          <div className="ResultsSearch__separator">
            {this.state.search.query ? '|' : null}
          </div>

          <div className="ResultsSearch__location">
            {this.state.search.location
              ? this.state.search.location.toLowerCase()
              : null}
          </div>
        </div>

        <div className="ResultsSeparator" />

        {this.state.results.map(place => {
          return (
            <div className="ResultsContainer" key={place._id}>
              <Result place={place} />
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
  };
};

export default connect(mapStateToProps, {})(Results);
