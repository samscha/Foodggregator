import React, { Component } from 'react';

import Header from '../header/Header';
import Separator from './Separator';
import Search from '../search/Search';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />

        <Separator />

        <Search />
      </div>
    );
  }
}

export default App;
