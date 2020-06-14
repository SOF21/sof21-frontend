import api from '../api/axiosInstance';

export const FETCH_ORCHESTRA_BEGIN   = 'FETCH_ORCHESTRA_BEGIN';
export const FETCH_ORCHESTRA_SUCCESS = 'FETCH_ORCHESTRA_SUCCESS';
export const FETCH_ORCHESTRA_FAILURE = 'FETCH_ORCHESTRA_FAILURE';

export const fetchOrchestraBegin = () => ({
    type: FETCH_ORCHESTRA_BEGIN
});

export const fetchOrchestraSuccess = orchestras => ({
    type: FETCH_ORCHESTRA_SUCCESS,
    payload: orchestras
});

export const fetchOrchestraFailure = error => ({
    type: FETCH_ORCHESTRA_FAILURE,
    payload: { error }
});
//    /orchestra/list_all`,

export function fetchOrchestras() {
    return dispatch => {
      dispatch(fetchOrchestraBegin());
      return api.get(`/orchestra`)
        //.then(handleErrors)
        .then(json => {
          console.log("got this json: " + json.data);
          dispatch(fetchOrchestraSuccess({list: json.data, signup: false}));
          return json.data;
        })
        .catch(error => dispatch(fetchOrchestraFailure(error)));
    };
  }

export function fetchOrchestraFromSignup() {
    return dispatch => {
      dispatch(fetchOrchestraBegin());
      return api.get(`/orchestra_signup`)
        //.then(handleErrors)
        .then(json => {
          console.log("got this json: " + json.data);
          dispatch(fetchOrchestraSuccess({list: json.data, signup: true}));
          return json.data;
        })
        .catch(error => dispatch(fetchOrchestraFailure(error)));
    };
  }
//   // Handle HTTP errors since fetch won't.
//   function handleErrors(response) {
//     if (!response.ok) {
//       throw Error(response.statusText);
//     }
//     return response;
//   }

