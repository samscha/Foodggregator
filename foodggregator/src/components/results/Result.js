import React from 'react';

const Result = props => {
  console.log(props.result);
  console.log(Object.values(Object.values(props.result)[0])[0]);
  console.log(Object.keys(Object.values(Object.values(props.result)[0])[0])[0]);
  return (
    <div className="Result">
      <div className="ResultName">{Object.keys(props.result)[0]}</div>
      <div className="ResultAddress">
        {Object.keys(Object.values(Object.values(props.result)[0])[0])[0] ===
        'Google Places'
          ? Object.values(Object.values(props.result)[0])[0].formatted_address
          : Object.values(
              Object.values(props.result)[0],
            )[0].location.display_address.join(', ')}
      </div>
    </div>
  );
};

export default Result;
