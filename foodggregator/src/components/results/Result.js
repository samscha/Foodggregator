import React from 'react';

const Result = props => {
  return <div className="Result">{Object.keys(props.result)[0]}</div>;
};

export default Result;
