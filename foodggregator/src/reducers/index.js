import * as actionType from '../actions';

const initialState = {
  search: {},
  geocode: {},
  results: [],
  isFetchingResults: false,
  error: '',
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.CLEAR_ERRORS:
      return {
        ...state,
        error: '',
      };

    case actionType.FETCH_RESULTS_START:
      return {
        ...state,
        search: action.payload,
        isFetchingResults: true,
      };

    case actionType.FETCH_RESULTS_SUCCESS:
      return {
        ...state,
        geocode: action.payload.splice(0, 1),
        results: action.payload,
      };

    case actionType.FETCH_RESULTS_ERROR:
      return {
        ...state,
        error: action.payload.response.data,
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
