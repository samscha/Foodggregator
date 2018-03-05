import React from 'react';

import { calcDistBetw } from '../../helpers/calcDistBetw';

import yelpBurst from '../../assets/Yelp_burst_positive_RGB.png';

const Result = props => {
  const place = props.place;
  const location = props.geocode[0].geometry.location;

  return (
    <div className="Result">
      <div className="ResultImg">
        <img
          src={
            place.yelp
              ? place.yelp.imgUri
              : 'https://image.flaticon.com/icons/svg/138/138310.svg'
          }
          alt="https://www.flaticon.com/free-icon/store_138310"
        />
      </div>

      <div className="ResultInfo">
        <div className="ResultName">{place.name}</div>
        <div className="ResultAddress">{`${calcDistBetw(
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
