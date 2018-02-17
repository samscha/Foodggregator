import * as actionType from '../actions';

const initialState = {
  results: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.FETCH_RESULTS_START:
      console.log('start results');
      return {
        ...state,
      };

    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
