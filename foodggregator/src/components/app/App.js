import React, { Component } from 'react';

import Header from '../header/Header';
import Search from '../search/Search';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />

        <Search />
      </div>
    );
  }
}

export default App;
