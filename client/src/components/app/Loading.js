import React, { Component } from 'react';
import { connect } from 'react-redux';

class Loading extends Component {
  render() {
    return (
      <div className="Loading">
        <div className="LoadingBar">
          {this.props.isFetchingResults ? '...' : null}
        </div>

        <div className="LoadingError">
          {this.props.error ? this.props.error.message : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isFetchingResults: state.isFetchingResults,
    error: state.error,
  };
};

export default connect(mapStateToProps, {})(Loading);
