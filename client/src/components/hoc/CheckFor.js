import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function CheckFor(ChildComponent) {
  class CheckFor extends Component {
    componentWillMount() {
      // Here, we want to check to see if `this.props.authenticated` is true
      // If it isn't, then redirect the user back to the /signin page
      if (this.props.results.length < 1) this.props.history.push('/');
    }

    render() {
      return (
        <div>{this.props.results.length > 0 ? <ChildComponent /> : null}</div>
      );
    }
  }

  const mapStateToProps = state => {
    return {
      results: state.results,
    };
  };

  return connect(mapStateToProps)(CheckFor);
}
