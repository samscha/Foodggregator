import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../header/Header';
import Separator from '../app/Separator';
import Result from './Result';

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

        <div className="ResultsQuery">
          {Object.keys(this.state.search).length === 0
            ? null
            : `${this.state.search.query} | ${this.state.search.location}`}
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
