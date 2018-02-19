import React, { Component } from 'react';
import { connect } from 'react-redux';

import Result from './Result';

class Results extends Component {
  state = {
    results: [],
    search: {},
  };

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    if (this.props.results.length !== nextProps.results.length)
      this.setState({ results: nextProps.results });
    if (this.props.search !== nextProps.search)
      this.setState({ search: nextProps.search });
  }

  render() {
    return (
      <div className="Results">
        <div className="ResultsQuery">
          {this.state.search.query === undefined
            ? null
            : `${this.state.search.query} in ${this.state.search.location}`}
        </div>

        <div className="ResultsSeparator" />

        {this.state.results.map(result => {
          return (
            <div
              className="ResultsContainer"
              key={Object.values(Object.values(result)[0][0])[0].id}
            >
              <Result result={result} />
            </div>
          );
        })}
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
