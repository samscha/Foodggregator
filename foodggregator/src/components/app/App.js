import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../header/Header';
import Line from './Line';
import Separator from './Separator';
import Search from '../search/Search';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />

        <Separator />
        <Line />
        <Separator />

        <Search history={this.props.history} />

        <Separator />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    search: state.search,
    error: state.error,
  };
};

export default connect(mapStateToProps, {})(App);
