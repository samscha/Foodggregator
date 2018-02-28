import * as actionType from '../actions';

const initialState = {
  search: {},
  results: [],
  isFetchingResults: false,
  error: '',
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.FETCH_RESULTS_START:
      return {
        ...state,
        search: action.payload,
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

    case actionType.RESET_RESULTS:
      return {
        ...state,
        results: [],
      };

    case actionType.RESET_SEARCH:
      return {
        ...state,
        search: {},
      };

    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
