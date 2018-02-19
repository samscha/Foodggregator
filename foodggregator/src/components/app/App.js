import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../header/Header';
import Separator from './Separator';
import Search from '../search/Search';
import Results from '../results/Results';

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

        <Search />

        <Separator />

        <Results />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isFetchingResults: state.isFetchingResults,
  };
};

export default connect(mapStateToProps, {})(App);
