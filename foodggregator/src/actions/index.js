import axios from 'axios';

export const FETCH_RESULTS_START = 'FETCH_RESULTS_START';
export const FETCH_RESULTS_SUCCESS = 'FETCH_RESULTS_SUCCESS';
export const FETCH_RESULTS_ERROR = 'FETCH_RESULTS_ERROR';
export const FETCH_RESULTS_FINISH = 'FETCH_RESULTS_FINISH';

const SERVER_ADDRESS = 'http://localhost:3030';

export const fetchResults = search => {
  const fetchResultsAPICall = axios.post(`${SERVER_ADDRESS}/places`, search);

  return dispatch => {
    dispatch({ type: FETCH_RESULTS_START });

    fetchResultsAPICall
      .then(({ data }) => {
        dispatch({ type: FETCH_RESULTS_SUCCESS, payload: data });
      })
      .catch(err => {
        dispatch({ type: FETCH_RESULTS_ERROR, payload: err });
      });

    dispatch({ type: FETCH_RESULTS_FINISH });
  };
};
