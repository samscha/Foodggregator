export const FETCH_RESULTS_START = 'FETCH_RESULTS_START';
export const FETCH_RESULTS = 'FETCH_RESULTS';
export const FETCH_RESULTS_FINISH = 'FETCH_RESULTS_FINISH';

export const fetchResults = _ => {
  return dispatch => {
    dispatch({ type: FETCH_RESULTS_START });
    dispatch({ type: FETCH_RESULTS });
    dispatch({ type: FETCH_RESULTS_FINISH });
  };
};
