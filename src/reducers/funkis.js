import { 
  SEND_FUNKIS_APP,
  SET_FUNKIS_TYPE,
} from '../actions/funkis'

const initialState = {
  loading: false,
  error: {},
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
		default: 
			return state;
	}
}

export default funkisReducer;
