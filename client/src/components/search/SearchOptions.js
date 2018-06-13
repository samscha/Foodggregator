import React, { Component } from 'react';

// import { prompt } from '../geoloc/geoLocation';

class SearchOptions extends Component {
  state = {
    geoLocation: {},
    geoLocationChecked: false,
  };

  geoLocationCheckboxClickHandler = _ => {
    if (this.state.geoLocationChecked) return;

    this.setState({ geoLocationChecked: !this.state.geoLocationChecked });
  };

  render() {
    return (
      <input
        className="SearchOptions"
        type="checkbox"
        name="geoLocation"
        checked={this.state.geoLocationChecked}
        value="geoLocationChecked"
        onChange={this.geoLocationCheckboxClickHandler}
      />
    );
  }
}

export default SearchOptions;
