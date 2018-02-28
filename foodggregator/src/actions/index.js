import axios from 'axios';

export const CLEAR_ERRORS = 'CLEAR_ERRORS';

export const FETCH_RESULTS_START = 'FETCH_RESULTS_START';
export const FETCH_RESULTS_SUCCESS = 'FETCH_RESULTS_SUCCESS';
export const FETCH_RESULTS_ERROR = 'FETCH_RESULTS_ERROR';
export const FETCH_RESULTS_FINISH = 'FETCH_RESULTS_FINISH';

export const RESET_RESULTS = 'RESET_RESULTS';
export const RESET_SEARCH = 'RESET_SEARCH';

const SERVER_ADDRESS = 'http://localhost:3030';

export const fetchResults = search => {
  const fetchResultsAPICall = axios.get(
    `${SERVER_ADDRESS}/places?query=${search.query.toLowerCase()}&location=${search.location.toLowerCase()}`,
  );

  return dispatch => {
    dispatch({ type: FETCH_RESULTS_START, payload: search });
    dispatch({ type: CLEAR_ERRORS });

    fetchResultsAPICall
      .then(({ data }) => {
        dispatch({ type: FETCH_RESULTS_SUCCESS, payload: data });
        dispatch({ type: FETCH_RESULTS_FINISH });
      })
      .catch(err => {
        dispatch({ type: FETCH_RESULTS_ERROR, payload: err });
        dispatch({ type: FETCH_RESULTS_FINISH });
      });
  };
};

export const headerClicked = _ => {
  return dispatch => {
    dispatch({ type: RESET_RESULTS });
    dispatch({ type: RESET_SEARCH });
  };
};
