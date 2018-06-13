import React from 'react';

import { calcDistBetw } from '../../helpers/calcDistBetw';

import yelpBurst from '../../assets/Yelp_burst_positive_RGB.png';
import genericPicture from '../../assets/generic.jpg';

const Result = props => {
  const place = props.place;
  const location = props.geocode[0].geometry.location;

  return (
    <div className="Result">
      <div className="ResultImg">
        <img
          src={place.yelp ? place.yelp.imgUri : genericPicture}
          alt="place"
        />
      </div>

      <div className="ResultInfo">
        <div className="ResultName">{place.name}</div>
        <div className="ResultDist">{`${calcDistBetw(
          place.googleplace === null
            ? place.yelp.location
            : place.googleplace.location,
          location,
        )} mi`}</div>
        <div className="ResultSources">
          <div
            className="ResultSource__googleplace"
            style={
              place.googleplace === null
                ? { opacity: '0.2', cursor: 'not-allowed' }
                : null
            }
          >
            G
          </div>

          <img
            className="ResultSource__yelp"
            src={yelpBurst}
            alt="yelp-burst"
            style={
              place.yelp === null
                ? { opacity: '0.2', cursor: 'not-allowed' }
                : null
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Result;
