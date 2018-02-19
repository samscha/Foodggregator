import * as actionType from '../actions';

const initialState = {
  results: [],
  isFetchingResults: false,
  error: '',
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.FETCH_RESULTS_START:
      return {
        ...state,
        isFetchingResults: true,
      };

    case actionType.FETCH_RESULTS_SUCCESS:
      // console.log(action.payload);
      return {
        ...state,
        results: action.payload,
      };

    case actionType.FETCH_RESULTS_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case actionType.FETCH_RESULTS_FINISH:
      return {
        ...state,
        isFetchingResults: false,
      };

    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
