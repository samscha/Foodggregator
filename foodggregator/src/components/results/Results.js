import React, { Component } from 'react';
import { connect } from 'react-redux';

class Results extends Component {
  state = {
    results: [],
  };

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    if (this.props.results.length !== nextProps.results.length)
      this.setState({ results: nextProps.results });
  }

  render() {
    return (
      <div className="Results">
        {this.state.results.map(result => {
          return (
            <div className="Result" key={Object.keys(result)[0]}>
              {Object.keys(result)[0]}
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    results: state.results,
  };
};

export default connect(mapStateToProps, {})(Results);
