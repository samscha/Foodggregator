import React from 'react';

const Result = props => {
  const name = Object.keys(props.result)[0];
  const data = Object.values(props.result)[0];

  return (
    <div className="Result">
      <div className="ResultName">{name}</div>
      <div className="ResultAddress">
        {Object.keys(data[0])[0] === 'Google Places'
          ? Object.values(data[0])[0].formatted_address
          : Object.values(data[0])[0].location.display_address.join(', ')}
      </div>
    </div>
  );
};

export default Result;
