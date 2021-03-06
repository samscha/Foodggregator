import React from 'react';

import { calcDistBetw } from '../../helpers/calcDistBetw';

import yelpBurst from '../../assets/Yelp_burst_positive_RGB.png';
import genericPicture from '../../assets/generic.jpg';

const Result = props => {
  const place = props.place;
  // const location = props.geocode[0].geometry.location;
  const location = props.geocode[0].results[0].geometry.location;

  return (
    <div className="Result">
      <div className="ResultImg">
        <img
          src={place.yelp ? place.yelp.image_url : genericPicture}
          alt="place"
        />
      </div>

      <div className="ResultInfo">
        <div className="ResultName">{place.name}</div>
        <div className="ResultDist">
          {`${calcDistBetw(
            place.googleplaces === undefined
              ? place.yelp.coordinates
              : place.googleplaces.geometry.location,
            location,
          )} mi`}
        </div>
        <div className="ResultSources">
          <a
            href={place.googleplaces ? place.googleplaces.url : null}
            target="_blank"
            style={{ textDecoration: 'none', color: 'black' }}
          >
            <div
              className="ResultSource__googleplace"
              style={
                place.googleplaces === undefined
                  ? { opacity: '0.2', cursor: 'not-allowed' }
                  : null
              }
            >
              G
            </div>
          </a>

          <a href={place.yelp ? place.yelp.url : null} target="_blank">
            <img
              className="ResultSource__yelp"
              src={yelpBurst}
              alt="yelp-burst"
              style={
                place.yelp === undefined
                  ? { opacity: '0.2', cursor: 'not-allowed' }
                  : null
              }
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Result;
