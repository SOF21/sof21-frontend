import {
  FETCH_ORCHESTRA_BEGIN,
  FETCH_ORCHESTRA_SUCCESS,
  FETCH_ORCHESTRA_FAILURE,
} from '../actions/orchestras';

import {
  FETCH_SIGNUPS_BEGIN,
  FETCH_SIGNUPS_SUCCESS,
  FETCH_SIGNUPS_FAILURE,
  FETCH_SIGNUP_ORCHESTRA_BEGIN,
  FETCH_SIGNUP_ORCHESTRA_SUCCESS,
  FETCH_SIGNUP_ORCHESTRA_FAILURE,
} from '../actions/orchestraSignups';


const initialOrchestraState = {
  orchestras: [],
  loading: false,
  error: null,
  signUps: [],
  signupOrchestra: {loading: false, error: null}
};


export default function orchestraReducer(state = { ...initialOrchestraState }, action) {
  switch(action.type) {
    case FETCH_ORCHESTRA_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_ORCHESTRA_SUCCESS:
      return {
        ...state,
        loading: false,
        orchestras: action.payload 
      };

    case FETCH_ORCHESTRA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        orchestras: []
      };

    case FETCH_SIGNUPS_BEGIN: 
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_SIGNUPS_SUCCESS:
      return {
        ...state,
        loading: false,
        signUps: state.signUps.concat(action.payload)
      };

    case FETCH_SIGNUPS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    case FETCH_SIGNUP_ORCHESTRA_BEGIN: 
      return {
        ...state,
        signupOrchestra: {loading: true, error: null},
      };

    case FETCH_SIGNUP_ORCHESTRA_SUCCESS:
      return {
        ...state,
        signupOrchestra: {loading: false, ...action.payload},
      };

    case FETCH_SIGNUP_ORCHESTRA_FAILURE:
      return {
        ...state,
        signupOrchestra: {loading: false, error: action.payload.error},
      };
    
    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}
