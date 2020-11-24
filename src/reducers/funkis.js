import { 
  SEND_FUNKIS_APP,
  SET_FUNKIS_TYPE,
  GET_FUNKISAR,
} from '../actions/funkis'

const initialState = {
  loading: false,
  error: {},
  funkisar: [],
}

const funkisReducer = (state = initialState, action) => {
	switch (action.type) {
		case SEND_FUNKIS_APP.BEGIN:
      return {
        ...state,
        loading: true,
      }
		case SEND_FUNKIS_APP.SUCCESS:
			return {
        ...state,
        loading: false,
      }
    case GET_FUNKISAR.BEGIN:
      return {
        ...state,
        loading: true,
      }
    case GET_FUNKISAR.SUCCESS:
      const {payload: {funkisar}} = action;
      return {
        ...state,
        loading: false,
        funkisar,
      }
		default: 
			return state;
	}
}

export default funkisReducer;
