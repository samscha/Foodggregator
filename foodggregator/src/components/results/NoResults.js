import React from 'react';

import Separator from '../app/Separator';
import GoBackToHomeButton from '../buttons/GoBackToHomeButton';

const NoResults = _ => {
  return (
    <div className="NoResults">
      <div className="NoResultsText">no results</div>

      <Separator />

      <GoBackToHomeButton />
    </div>
  );
};

export default NoResults;
