import React, { Component } from 'react';
import { connect } from 'react-redux';

class Loading extends Component {
  render() {
    return (
      <div className="Loading">
        {this.props.isFetchingResults ? '...' : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isFetchingResults: state.isFetchingResults,
  };
};

export default connect(mapStateToProps, {})(Loading);
