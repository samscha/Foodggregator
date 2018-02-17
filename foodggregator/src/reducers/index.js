import * as actionType from '../actions';

const initialState = {
  results: [],
  isFetchingResults: false,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.FETCH_RESULTS_START:
      return {
        ...state,
        isFetchingResults: true,
      };

    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
