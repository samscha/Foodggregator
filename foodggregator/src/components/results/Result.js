import React from 'react';

const Result = props => {
  const place = props.place;

  return (
    <div className="Result">
      <div className="ResultName">{place.name}</div>
      <div className="ResultAddress">{place.address}</div>
      <div className="ResultSources">
        {`${place.googleplace === null ? null : 'google place'} ${
          place.yelp === null ? null : 'yelp'
        }`}
      </div>
    </div>
  );
};

export default Result;
