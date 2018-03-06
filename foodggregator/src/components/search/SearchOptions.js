import React, { Component } from 'react';

class SearchOptions extends Component {
  state = {
    geoLocation: {},
    geoLocationChecked: false,
  };

  checkboxClickHandler = e => {
    const { value } = e.target;
    this.setState({ value: !this.state.value });
  };

  render() {
    return (
      <input
        className="SearchOptions"
        type="checkbox"
        name="geoLocation"
        checked={this.state.geoLocationChecked}
        value="geoLocationChecked"
        onChange={this.checkboxClickHandler}
      />
    );
  }
}

export default SearchOptions;
