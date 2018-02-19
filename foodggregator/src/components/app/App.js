import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Header from '../header/Header';
import Line from './Line';
import Separator from './Separator';
import Search from '../search/Search';

class App extends Component {
  state = {};

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps);
  }

  render() {
    return (
      <div className="App">
        <Header />

        <Separator />
        <Line />
        <Separator />

        <Search />

        <Separator />

        {this.props.results.length > 0 && this.props.error === '' ? (
          <Redirect to="/results" />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    results: state.results,
    error: state.error,
  };
};

export default connect(mapStateToProps, {})(App);
