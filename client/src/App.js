import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from './components/header/Header';
import Line from './components/app/Line';
import Separator from './components/app/Separator';
import Search from './components/search/Search';
import Loading from './components/app/Loading';

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

        <Loading />
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
