import axios from 'axios';

export const CLEAR_ERRORS = 'CLEAR_ERRORS';

export const FETCH_RESULTS_START = 'FETCH_RESULTS_START';
export const FETCH_RESULTS_SUCCESS = 'FETCH_RESULTS_SUCCESS';
export const FETCH_RESULTS_ERROR = 'FETCH_RESULTS_ERROR';
export const FETCH_RESULTS_FINISH = 'FETCH_RESULTS_FINISH';

export const RESET_RESULTS = 'RESET_RESULTS';
export const RESET_SEARCH = 'RESET_SEARCH';
export const RESET_ERROR = 'RESET_ERROR';

const ROOT = '/api';

export const fetchResults = (search, history) => {
  const fetchResultsAPICall = axios.get(
    `${ROOT}/places?query=${search.query
      .toLowerCase()
      .replace(' ', '+')}&location=${search.location
      .toLowerCase()
      .replace(' ', '+')}`,
  );

  return dispatch => {
    dispatch({ type: FETCH_RESULTS_START, payload: search });
    dispatch({ type: CLEAR_ERRORS });

    fetchResultsAPICall
      .then(({ data }) => {
        dispatch({ type: FETCH_RESULTS_SUCCESS, payload: data.data });
        dispatch({ type: FETCH_RESULTS_FINISH });
        history.push('/results');
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
    dispatch({ type: RESET_ERROR });
  };
};
