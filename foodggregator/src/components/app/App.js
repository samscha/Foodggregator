import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../header/Header';
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

        <Search />

        <Separator />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    //
  };
};

export default connect(mapStateToProps, {})(App);
